"use client";

import { useEffect, useState } from "react";

export interface ReadFileProps {
  /** Path to the text file relative to the public directory, e.g. "/sample.txt" */
  filePath: string;
}

export function ReadFile({ filePath }: ReadFileProps) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFile() {
      try {
        const res = await fetch(filePath);
        if (!res.ok) {
          throw new Error(`Failed to load ${filePath}: ${res.status} ${res.statusText}`);
        }
        const text = await res.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    }

    fetchFile();
  }, [filePath]);

  if (error) {
    return <pre className="text-red-600">Error: {error}</pre>;
  }

  if (content === null) {
    return <pre>Loading...</pre>;
  }

  return (
    <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
      {content}
    </pre>
  );
}
