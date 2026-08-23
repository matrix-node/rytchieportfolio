"use client";

import { useState } from "react";

export default function FeedbackWidget() {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-col items-center sm:items-end gap-3 bg-surface-container p-4 rounded-lg border border-outline-variant/50 w-full sm:w-auto">
      <span className="font-label-caps text-label-caps text-on-surface-variant">
        {voted === null ? "Was this helpful?" : voted === "yes" ? "Thanks for the feedback!" : "Sorry about that — noted."}
      </span>
      {voted === null ? (
        <div className="flex gap-2">
          <button
            className="px-4 py-1.5 border border-outline-variant rounded text-on-surface hover:bg-surface-container-highest hover:text-primary transition-colors font-body-sm text-body-sm flex items-center gap-1"
            onClick={() => setVoted("yes")}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">thumb_up</span> Yes
          </button>
          <button
            className="px-4 py-1.5 border border-outline-variant rounded text-on-surface hover:bg-surface-container-highest hover:text-error transition-colors font-body-sm text-body-sm flex items-center gap-1"
            onClick={() => setVoted("no")}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">thumb_down</span> No
          </button>
        </div>
      ) : null}
    </div>
  );
}
