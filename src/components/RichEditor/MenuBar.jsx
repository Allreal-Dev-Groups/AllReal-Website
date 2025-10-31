// components/TiptapRichEditor/MenuBar.js
"use client";

import React, { useCallback, useMemo } from "react";
import ToolbarButton from "./ToolbarButton";

// Icons from lucide-react
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  CodeXml,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Undo,
  Redo,
  Eraser,
  Rows3,
  Columns2,
  Minus,
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "lucide-react";

/**
 * --- MenuBar (Toolbar) ---
 */
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const handleSetLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const handleInsertImage = useCallback(() => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const buttons = useMemo(
    () => [
      [
        {
          icon: Bold,
          command: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
          title: "Bold",
        },
        {
          icon: Italic,
          command: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
          title: "Italic",
        },
        {
          icon: Strikethrough,
          command: () => editor.chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
          title: "Strike",
        },
        {
          icon: Code,
          command: () => editor.chain().focus().toggleCode().run(),
          isActive: editor.isActive("code"),
          title: "Inline Code",
        },
        {
          icon: CodeXml,
          command: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: editor.isActive("codeBlock"),
          title: "Code Block",
        },
      ],
      [
        {
          icon: Heading1,
          command: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: editor.isActive("heading", { level: 1 }),
          title: "H1",
        },
        {
          icon: Heading2,
          command: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.isActive("heading", { level: 2 }),
          title: "H2",
        },
        {
          icon: Heading3,
          command: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editor.isActive("heading", { level: 3 }),
          title: "H3",
        },
        {
          icon: Quote,
          command: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
          title: "Blockquote",
        },
      ],[
        {
          icon: AlignLeft,
          command: () => editor.chain().focus().setTextAlign('left').run(),
          isActive: editor.isActive({ textAlign: 'left' }),
          title: "Align Left",
        },
        {
          icon: AlignCenter,
          command: () => editor.chain().focus().setTextAlign('center').run(),
          isActive: editor.isActive({ textAlign: 'center' }),
          title: "Align Center",
        },
        {
          icon: AlignRight,
          command: () => editor.chain().focus().setTextAlign('right').run(),
          isActive: editor.isActive({ textAlign: 'right' }),
          title: "Align Right",
        },
        {
          icon: AlignJustify,
          command: () => editor.chain().focus().setTextAlign('justify').run(),
          isActive: editor.isActive({ textAlign: 'justify' }),
          title: "Align Justify",
        },
      ],
      [
        {
          icon: List,
          command: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
          title: "Unordered List",
        },
        {
          icon: ListOrdered,
          command: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
          title: "Ordered List",
        },
      ],
      [
        {
          icon: LinkIcon,
          command: handleSetLink,
          isActive: editor.isActive("link"),
          title: "Link",
        },
        {
          icon: ImageIcon,
          command: handleInsertImage,
          isActive: editor.isActive("image"),
          title: "Image",
        },
        // {
        //   icon: TableIcon,
        //   command: () =>
        //     editor
        //       .chain()
        //       .focus()
        //       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        //       .run(),
        //   isActive: editor.isActive("table"),
        //   title: "Table",
        // },
      ],
      [
        {
          icon: Undo,
          command: () => editor.chain().focus().undo().run(),
          title: "Undo",
          disabled: !editor.can().undo(),
        },
        {
          icon: Redo,
          command: () => editor.chain().focus().redo().run(),
          title: "Redo",
          disabled: !editor.can().redo(),
        },
        {
          icon: Eraser,
          command: () =>
            editor.chain().focus().clearNodes().unsetAllMarks().run(),
          title: "Clear Formatting",
        },
      ],
    ],
    [editor, handleSetLink, handleInsertImage]
  );

  const tableButtons = useMemo(
    () => [
      {
        icon: Rows3,
        command: () => editor.chain().focus().addRowAfter().run(),
        title: "Add Row",
      },
      {
        icon: Columns2,
        command: () => editor.chain().focus().addColumnAfter().run(),
        title: "Add Column",
      },
      {
        icon: Minus,
        command: () => editor.chain().focus().deleteRow().run(),
        title: "Delete Row",
      },
      {
        icon: Minus,
        command: () => editor.chain().focus().deleteColumn().run(),
        title: "Delete Column",
      },
      {
        icon: Trash2,
        command: () => editor.chain().focus().deleteTable().run(),
        title: "Delete Table",
      },
    ],
    [editor]
  );

  return (
    <div className="p-3 bg-gray-50 border-b border-gray-200 rounded-t-xl sticky top-0 z-10 shadow-sm">
      <div className="flex flex-wrap items-center">
        {buttons.map((group, i) => (
          <div
            key={i}
            className="flex gap-1 items-center mr-4 my-1 border-r pr-4 last:border-r-0"
          >
            {group.map((btn, j) => (
              <ToolbarButton
                key={j}
                icon={btn.icon}
                onClick={btn.command}
                isActive={btn.isActive}
                title={btn.title}
                disabled={btn.disabled || false}
              />
            ))}
          </div>
        ))}

        {editor.isActive("table") && (
          <div className="flex gap-1 items-center mr-4 my-1 border-r pr-4 border-amber-300 bg-amber-50 rounded-lg p-1 shadow-inner">
            <span className="text-sm font-semibold text-amber-700 mr-2 hidden sm:block">
              TABLE TOOLS:
            </span>
            {tableButtons.map((btn, idx) => (
              <ToolbarButton
                key={`table-${idx}`}
                icon={btn.icon}
                onClick={btn.command}
                isActive={false}
                title={btn.title}
                disabled={!editor.can().run()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;