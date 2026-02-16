import { Suspense } from "react";
import FavoriteArticle from "@/components/FavoriteArticle";
import ArticleLoader from "@/components/ArticleLoader";

const FAVORITE_IDS = [1, 2, 3];

export default function FavoritePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Favorite Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FAVORITE_IDS.map((id) => (
          <Suspense key={id} fallback={<ArticleLoader />}>
            <FavoriteArticle id={id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
