import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure pdfjs worker locally via Vite bundled asset
try {
  if (typeof window !== "undefined" && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  }
} catch (e) {
  console.warn("PDF.js worker setup note:", e);
}

/**
 * Extract plain text content page-by-page from an uploaded PDF file.
 * @param {File} file - PDF file instance
 * @returns {Promise<{text: string, pageCount: number, wordCount: number}>}
 */
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item) => item.str)
        .filter(Boolean);
      const pageText = pageStrings.join(" ");
      fullText += pageText + "\n\n";
    }

    const trimmedText = fullText.trim();
    const wordCount = trimmedText ? trimmedText.split(/\s+/).filter(Boolean).length : 0;

    if (!trimmedText || wordCount < 10) {
      throw new Error(
        "Could not extract readable text from this PDF. It may be scanned, image-only, or empty."
      );
    }

    return {
      text: trimmedText,
      pageCount: pdf.numPages,
      wordCount,
    };
  } catch (error) {
    console.error("PDF Extraction error:", error);
    if (error.message && error.message.includes("Could not extract")) {
      throw error;
    }
    throw new Error(
      "Failed to parse PDF file. Please ensure it is a valid, unencrypted text-based PDF."
    );
  }
}
