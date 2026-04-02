'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-36 w-full animate-pulse bg-background border border-border rounded-xl"></div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link'
  ];

  return (
    <div className="modern-quill">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Write something amazing...'}
      />
      <style jsx global>{`
        .modern-quill .ql-toolbar.ql-snow {
          border: 1px solid var(--border) !important;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          background: var(--background);
          border-bottom: none !important;
          font-family: inherit;
        }
        .modern-quill .ql-container.ql-snow {
          border: 1px solid var(--border) !important;
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          background: var(--background);
          min-height: 120px;
          font-size: 0.875rem;
          font-family: inherit;
        }
        .modern-quill .ql-editor {
          min-height: 120px;
          color: var(--foreground);
        }
        .modern-quill .ql-editor.ql-blank::before {
          color: var(--muted);
          opacity: 0.5;
          font-style: normal;
        }
        .modern-quill .ql-stroke {
          stroke: var(--muted) !important;
        }
        .modern-quill .ql-fill {
          fill: var(--muted) !important;
        }
        .modern-quill .ql-picker {
          color: var(--foreground) !important;
        }
        .modern-quill .ql-picker-options {
          background: var(--surface) !important;
          border-color: var(--border) !important;
          border-radius: 0.75rem !important;
          box-shadow: var(--shadow-elevated) !important;
        }
      `}</style>
    </div>
  );
}
