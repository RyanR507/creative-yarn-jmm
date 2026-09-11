import { useEffect } from "react";

// Sets document.title for pages reached via client-side navigation (the
// policy hub and individual policy pages) — a full page load already gets
// its title from index.html, but React Router doesn't reload the document
// when moving between routes, so those pages set their own.
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    if (title) document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
