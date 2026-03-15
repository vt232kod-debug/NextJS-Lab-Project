export type Article = {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
};

export type User = {
  id: number;
  email: string;
  name: string | null;
  password: string | null;
  image: string | null;
  created_at: string;
};
