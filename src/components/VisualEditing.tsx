"use client";

import { VisualEditing } from "@sanity/visual-editing/react";

export default function VisualEditingOverlay() {
  if (process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING !== "true") {
    return null;
  }

  return <VisualEditing portal={false} />;
}
