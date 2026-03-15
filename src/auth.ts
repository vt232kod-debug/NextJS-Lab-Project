import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { authConfig } from '@/auth.config';
import bcrypt from 'bcryptjs';
import sql from '@/app/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const rows = await sql`
          SELECT id, email, name, image, password
          FROM users
          WHERE email = ${email}
        `;
        const user = rows[0];
        if (!user?.password) return null;

        const valid = await bcrypt.compare(password, user.password as string);
        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.name as string | null,
          email: user.email as string,
          image: user.image as string | null,
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      // For OAuth providers: upsert user in DB so we have a record
      if (account?.provider !== 'credentials' && user.email) {
        try {
          await sql`
            INSERT INTO users (email, name, image)
            VALUES (${user.email}, ${user.name ?? ''}, ${user.image ?? ''})
            ON CONFLICT (email) DO UPDATE
              SET name  = EXCLUDED.name,
                  image = EXCLUDED.image
          `;
        } catch (err) {
          console.error('OAuth upsert error:', err);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token.id) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
});
