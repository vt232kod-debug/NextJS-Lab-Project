import NavLink from "@/components/NavLink";
import styles from "@/styles/menu.module.css";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className={styles.subnav}>
        <ul className={styles.submenu}>
          <li>
            <NavLink href="/articles" className={styles.submenuLink} exact>
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink href="/articles/favorite" className={styles.submenuLink}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink href="/articles/create" className={styles.submenuLink}>
              Create
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-4">{children}</div>
    </div>
  );
}
