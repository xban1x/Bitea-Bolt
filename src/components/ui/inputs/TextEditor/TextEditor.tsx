import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, EditorEvents, JSONContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

import { ControlProps } from "@/types/form";

import { TextEditorToolbar } from "./Toolbar/TextEditorToolbar";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Underline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Link.configure({
    openOnClick: false,
    defaultProtocol: "https",
  }),
];

interface EditorValue {
  html?: string;
  json?: JSONContent;
}

export interface TextEditorInnerProps {
  placeholder?: string;
  onChange?: ({ html, json }: EditorValue) => void;
  customRef?: React.ForwardedRef<TextEditorRef>;
}

const TextEditorInner = ({ placeholder, onChange, customRef }: TextEditorInnerProps) => {
  const contentRef = useRef<JSONContent | null>(null);

  const editor = useEditor({
    extensions: [...extensions, Placeholder.configure({ placeholder })],
    editorProps: {
      attributes: {
        class: "min-h-40 rounded-b-sm p-2 outline-none",
      },
    },
    onUpdate: (event: EditorEvents["update"]) => {
      onChange?.({ json: event.editor.getJSON(), html: event.editor.getHTML() });
    },
    immediatelyRender: false,
  });

  useImperativeHandle(customRef, () => {
    return {
      updateValue: (value: JSONContent | null | undefined) => {
        if (editor) {
          editor.commands.setContent(value || null);
        } else {
          contentRef.current = value || null;
        }
      },
    };
  }, [editor]);

  useEffect(() => {
    if (editor && contentRef.current) {
      editor.commands.setContent(contentRef.current || null);
      contentRef.current = null;
    }
  }, [editor]);

  return (
    <div className="w-full rounded-sm border border-solid border-elevation-outline-2 bg-elevation-background">
      <TextEditorToolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  );
};

export type TextEditorProps = Omit<TextEditorInnerProps, "customRef">;

export interface TextEditorRef {
  updateValue: (value: JSONContent | null | undefined) => void;
}

export const TextEditor = forwardRef(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControlProps<TextEditorProps, TFieldValues, TName>,
    ref?: React.ForwardedRef<TextEditorRef>,
  ) => {
    if ("formControl" in props && props.formControl) {
      const { formControl, ...innerProps } = props;

      return (
        <Controller
          control={formControl.control}
          name={formControl.name}
          render={({ field }) => <TextEditorInner {...innerProps} onChange={field.onChange} customRef={ref} />}
        />
      );
    }

    return <TextEditorInner {...props} customRef={ref} />;
  },
) as <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControlProps<TextEditorProps, TFieldValues, TName> & { ref?: React.ForwardedRef<TextEditorRef> },
) => JSX.Element;
