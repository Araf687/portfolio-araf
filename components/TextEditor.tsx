"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { 
  Bold, Italic, List, ListOrdered, 
  Table as TableIcon, Columns, Rows, Trash2 
} from "lucide-react";
import { useEffect } from "react";

interface TiptapEditorProps {
  form: any;
  name: string;
  label?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const btnClass = (active: boolean) => `
    p-2 rounded transition-colors 
    ${active ? "bg-cyan-500/20 text-cyan-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}
  `;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-800 bg-black/40 backdrop-blur-md">
      {/* Formatting */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}>
        <Bold size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}>
        <Italic size={18} />
      </button>

      {/* Lists */}
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}>
        <List size={18} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}>
        <ListOrdered size={18} />
      </button>

      <div className="w-[1px] h-6 bg-gray-800 mx-1 self-center" />

      {/* Table Actions */}
      <button 
        type="button" 
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} 
        className={btnClass(false)}
      >
        <TableIcon size={18} />
      </button>
      
      {editor.isActive("table") && (
        <>
          <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className={btnClass(false)}>
            <Columns size={18} className="rotate-90" />
          </button>
          <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className={btnClass(false)}>
            <Rows size={18} />
          </button>
          <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className={btnClass(false)}>
            <Trash2 size={18} className="text-red-400" />
          </button>
        </>
      )}
    </div>
  );
};

const TiptapEditor = ({ form, name, label }: TiptapEditorProps) => {
  const { setValue, watch } = form;
  const initialValue = watch(name);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialValue,
     immediatelyRender: false, // ✅ VERY IMPORTANT
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[250px] p-4 text-gray-300",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(name, editor.getHTML());
    },
  });

  // Keep editor in sync if form value changes externally
  useEffect(() => {
    if (editor && initialValue !== editor.getHTML()) {
      editor.commands.setContent(initialValue);
    }
  }, [initialValue, editor]);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
      <div className="rounded-xl border border-gray-800 bg-black/20 overflow-hidden focus-within:border-cyan-500/50 transition-all">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .prose table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
          border: 1px solid #374151;
        }
        .prose table td, .prose table th {
          min-width: 1em;
          border: 1px solid #374151;
          padding: 8px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .prose table th {
          background-color: rgba(255, 255, 255, 0.05);
          font-weight: bold;
          text-align: left;
        }
        .prose .selectedCell:after {
          z-index: 2;
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(34, 211, 238, 0.1);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;