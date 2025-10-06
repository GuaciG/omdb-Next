import { Suspense } from "react";
import FavoritesClient from "./FavoriteClient";


export default function FavoritesPage() {
  return (
    <Suspense fallback={<p>Loading favorites...</p>}>
      <FavoritesClient />
    </Suspense>
  );
}

