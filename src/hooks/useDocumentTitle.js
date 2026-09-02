import { useEffect } from "react";

/**
 * useDocumentTitle — sets the document.title on component mount
 * and updates when title changes.
 *
 * @param {string} title - The title to display
 * @param {boolean} [retainOnUnmount=false] - Whether to keep title after unmount
 */
export function useDocumentTitle(title, retainOnUnmount = false) {
  useEffect(() => {
    if (!title) return;
    const previousTitle = document.title;
    document.title = title;

    return () => {
      if (!retainOnUnmount) {
        document.title = previousTitle;
      }
    };
  }, [title, retainOnUnmount]);
}
