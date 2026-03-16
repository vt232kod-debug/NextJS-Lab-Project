import { Article, User } from '@/app/lib/definitions';

describe('Type definitions', () => {
  it('Article type has correct shape', () => {
    const article: Article = {
      id: 1,
      user_id: 1,
      title: 'Test Article',
      body: 'Test body content',
      created_at: '2024-01-01',
    };

    expect(article.id).toBe(1);
    expect(article.user_id).toBe(1);
    expect(article.title).toBe('Test Article');
    expect(article.body).toBe('Test body content');
    expect(article.created_at).toBe('2024-01-01');
  });

  it('User type has correct shape', () => {
    const user: User = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      password: null,
      image: null,
      created_at: '2024-01-01',
    };

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
    expect(user.password).toBeNull();
    expect(user.image).toBeNull();
  });

  it('User allows nullable name, password, image', () => {
    const user: User = {
      id: 2,
      email: 'user2@example.com',
      name: null,
      password: null,
      image: null,
      created_at: '2024-01-01',
    };

    expect(user.name).toBeNull();
    expect(user.password).toBeNull();
    expect(user.image).toBeNull();
  });
});
