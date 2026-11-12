// src/components/PortfolioActions.jsx
import React, { useState } from "react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

export default function PortfolioActions({ portfolio, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="more"
      >
        <MoreVertical className="w-4 h-4 text-gray-600" />
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50"
        >
          <button
            onClick={() => {
              setOpen(false);
              onEdit(portfolio);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" /> ویرایش
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete(portfolio);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" /> حذف
          </button>
        </div>
      )}
    </div>
  );
}
