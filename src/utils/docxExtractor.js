import mammoth from "mammoth";

/**
 * Extract plain text content from an uploaded DOCX file.
 * @param {File} file - DOCX file instance
 * @returns {Promise<{text: string, pageCount: number, wordCount: number}>}
 */
export async function extractTextFromDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const trimmedText = (result.value || "").trim();
    const wordCount = trimmedText ? trimmedText.split(/\s+/).filter(Boolean).length : 0;

    if (!trimmedText || wordCount < 10) {
      throw new Error(
        "Could not extract readable text from this DOCX file. It may be empty or corrupted."
      );
    }

    return {
      text: trimmedText,
      pageCount: Math.ceil(wordCount / 350) || 1,
      wordCount,
    };
  } catch (error) {
    console.error("DOCX Extraction error:", error);
    if (error.message && error.message.includes("Could not extract")) {
      throw error;
    }
    throw new Error(
      "Failed to parse DOCX file. Please ensure it is a valid Word document."
    );
  }
}
