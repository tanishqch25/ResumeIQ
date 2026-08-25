import React, { useState, useRef, useCallback, useId } from "react";
import { Button } from "../shared/Button";

/**
 * DropZone — drag-and-drop file upload.
 *
 * [21ST_COMPONENT_SLOT: FILE_UPLOAD] — hand-built fallback.
 * Native HTML5 drag events + <input type="file">.
 * Supports PDF and DOCX, max 10MB.
 * Keyboard operable via Enter/Space on the dropzone div.
 */

const ACCEPTED_TYPES  = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const ACCEPTED_EXT    = [".pdf", ".docx"];
const MAX_SIZE_BYTES  = 10 * 1024 * 1024; // 10MB

function formatBytes(bytes) {
  if (bytes < 1024)             return `${bytes} B`;
  if (bytes < 1024 * 1024)     return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function DropZone({ onFileSelected }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile]         = useState(null);
  const [error, setError]       = useState(null);
  const inputRef = useRef(null);
  const dropId   = useId();

  const validate = useCallback((f) => {
    if (!ACCEPTED_TYPES.includes(f.type) && !ACCEPTED_EXT.some(e => f.name.toLowerCase().endsWith(e))) {
      return "Only PDF and DOCX files are accepted.";
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File is too large (${formatBytes(f.size)}). Maximum size is 10 MB.`;
    }
    return null;
  }, []);

  const accept = useCallback((f) => {
    const err = validate(f);
    if (err) { setError(err); setFile(null); return; }
    setError(null);
    setFile(f);
    onFileSelected?.(f);
  }, [validate, onFileSelected]);

  const onDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); };
  const onDragOver  = (e) => { e.preventDefault(); e.stopPropagation(); };
  const onDrop      = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) accept(dropped);
  };

  const onInputChange = (e) => {
    const f = e.target.files[0];
    if (f) accept(f);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    onFileSelected?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        id={dropId}
        accept={ACCEPTED_EXT.join(",")}
        className="sr-only"
        onChange={onInputChange}
        aria-label="Upload resume file"
      />

      {!file ? (
        /* ── Dropzone idle/drag-over state ── */
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop your resume here or press Enter to choose a file"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onKeyDown={handleKeyDown}
          onClick={() => inputRef.current?.click()}
          className={[
            "dropzone-transition cursor-pointer",
            "flex flex-col items-center justify-center",
            "border-2 border-dashed rounded-xl px-8 py-16 text-center",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            dragging
              ? "border-accent bg-soft-green"
              : "border-border bg-surface hover:border-accent/60 hover:bg-soft-green/30",
          ].join(" ")}
        >
          <div className={`mb-4 transition-colors duration-150 ${dragging ? "text-accent" : "text-border"}`}>
            <UploadCloudIcon />
          </div>
          <p className="text-h3 font-medium text-text mb-1">
            {dragging ? "Release to upload" : "Drop your resume here"}
          </p>
          <p className="text-sm text-muted mb-5">
            or{" "}
            <span className="text-secondary font-medium underline-offset-2 hover:underline">
              choose a file
            </span>
          </p>
          <p className="text-caption text-muted">PDF or DOCX &middot; Up to 10 MB</p>
        </div>
      ) : (
        /* ── File selected state ── */
        <div className="border border-border rounded-xl bg-surface shadow-card p-5 animate-fade-in animate-fill-both">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-soft-green rounded-lg flex items-center justify-center text-accent shrink-0">
              <FileIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{file.name}</p>
              <p className="text-caption text-muted mt-0.5">{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={removeFile}
              className="shrink-0 p-1.5 rounded text-muted hover:text-warning hover:bg-warning-bg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Remove ${file.name}`}
            >
              <XIcon />
            </button>
          </div>
          {/* Ready indicator */}
          <div className="mt-3 flex items-center gap-2 text-caption text-accent">
            <CheckIcon />
            Ready to analyze
          </div>
        </div>
      )}

      {/* Inline validation error */}
      {error && (
        <div role="alert" className="mt-3 flex items-center gap-2 text-sm text-warning">
          <AlertIcon />
          {error}
        </div>
      )}
    </div>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M32 34c4.4 0 8-3.6 8-8a7.98 7.98 0 00-6.5-7.86A11 11 0 0012 22a7 7 0 001 13.97" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 30l4-4 4 4M24 26v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 3a1 1 0 011-1h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 4v4M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
