// components/TiptapRichEditor/ToolbarButton.js
"use client";

import React from "react";

/**
 * --- Toolbar Button ---
 */
const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive, // The prop is still passed but no longer used for styling
  title,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    title={title}
    disabled={disabled}
    className="p-2 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100"
  >
    <Icon className="w-5 h-5" />
  </button>
);

export default ToolbarButton;