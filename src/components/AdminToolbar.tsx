"use client";

import { useIsPresentationTool } from "@sanity/visual-editing/react";
import Link from "next/link";
import { useState } from "react";

export default function AdminToolbar() {
  const isPresentation = useIsPresentationTool();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show toolbar if inside Sanity Presentation
  if (isPresentation) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div className="relative">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-foreground text-white rounded-full p-3 shadow-lg hover:bg-foreground/90 transition-all"
          aria-label="Admin menu"
          title="Admin Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute bottom-14 right-0 bg-white rounded-xl shadow-xl border border-sand-dark p-2 min-w-[200px]">
            <div className="text-xs text-muted px-3 py-1.5 font-medium uppercase tracking-wide">
              Admin
            </div>
            <Link
              href="/studio"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-sand transition-colors text-foreground"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Open CMS Studio
            </Link>
            <div className="border-t border-sand-dark my-1" />
            <Link
              href="/api/draft?secret=&slug=/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-sand transition-colors text-foreground"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Mode
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
