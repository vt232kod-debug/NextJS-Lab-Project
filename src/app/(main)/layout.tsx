import NavLink from "@/components/NavLink";
import styles from "@/styles/menu.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <NavLink href="/" className={styles.logoLink}>
              Articles Hub
            </NavLink>
          </div>
          <ul className={styles.menu}>
            <li>
              <NavLink href="/articles" className={styles.menuLink}>
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink href="/env" className={styles.menuLink} exact>
                Env
              </NavLink>
            </li>
            <li>
              <NavLink href="/profile/settings" className={styles.menuLink} exact>
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink href="/profile/security" className={styles.menuLink} exact>
                Security
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-200">
        © 2026 Articles Hub
      </footer>
    </div>
  );
}
