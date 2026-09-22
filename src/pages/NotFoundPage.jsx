import { useEffect } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { PRODUCTS } from "../data/products";
import "./NotFoundPage.css";

// The site is a single-page app, so the server answers 200 for every URL —
// noindex tells search engines this "page" should not be indexed. (A real
// HTTP 404 status can only come from the hosting layer.)
function useNoIndexMeta(description) {
  useEffect(() => {
    const head = document.head;

    let robots = head.querySelector('meta[name="robots"]');
    const createdRobots = !robots;
    const previousRobots = robots?.getAttribute("content") ?? null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, follow");

    const descriptionTag = head.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content") ?? null;
    descriptionTag?.setAttribute("content", description);

    return () => {
      if (createdRobots) robots.remove();
      else if (previousRobots !== null) robots.setAttribute("content", previousRobots);
      if (descriptionTag && previousDescription !== null) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, [description]);
}

export default function NotFoundPage({ kind = "page" }) {
  const isProduct = kind === "product";

  const heading = isProduct ? "No encontramos ese producto" : "Esta página no existe";
  const message = isProduct
    ? "El producto que buscas no existe o su dirección cambió. Estos son los productos que puedes explorar:"
    : "La dirección que abriste no existe o cambió de lugar. Puedes volver al inicio o explorar lo que podemos crear para ti.";
  const description = isProduct
    ? "El producto que buscas no existe en Creative Yarn. Explora nuestros productos personalizados hechos a mano."
    : "La página que buscas no existe en Creative Yarn. Vuelve al inicio o explora nuestros productos personalizados hechos a mano.";

  useDocumentTitle(isProduct ? "Producto no encontrado | Creative Yarn" : "Página no encontrada | Creative Yarn");
  useNoIndexMeta(description);

  return (
    <main id="main-content" className="not-found">
      <div className="container container--narrow">
        <p className="eyebrow">Error 404</p>
        <h1 className="section-title center">{heading}</h1>
        <p className="section-subtitle center">{message}</p>

        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
          <Link to="/#personalizados" className="btn btn-outline">
            Explorar productos
          </Link>
        </div>

        <nav className="not-found__products" aria-label="Productos de Creative Yarn">
          <ul>
            {PRODUCTS.map((product) => (
              <li key={product.slug}>
                <Link to={`/productos/${product.slug}`}>{product.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
