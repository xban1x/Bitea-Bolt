import { Editor } from "@tiptap/react";

import { HyperlinkAction } from "@/components/ui/inputs/TextEditor/Toolbar/HyperlinkAction";
import { TextAlignSelect } from "@/components/ui/inputs/TextEditor/Toolbar/TextAlignSelect";
import { TextColorSelect } from "@/components/ui/inputs/TextEditor/Toolbar/TextColorSelect";
import { TextHighlightSelect } from "@/components/ui/inputs/TextEditor/Toolbar/TextHighlightSelect";
import { TextListActions } from "@/components/ui/inputs/TextEditor/Toolbar/TextListActions";
import { TextMarksActions } from "@/components/ui/inputs/TextEditor/Toolbar/TextMarksActions";
import { TextStyleSelect } from "@/components/ui/inputs/TextEditor/Toolbar/TextStyleSelect";

interface Props {
  editor: Editor | null;
}

export const TextEditorToolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-x-7 gap-y-1 border-b border-solid border-elevation-outline-2 p-2">
      <div className="flex flex-wrap gap-1">
        <div className="flex items-center gap-1">
          <TextStyleSelect editor={editor} />
          <TextAlignSelect editor={editor} />
        </div>
        <div className="flex items-center gap-1">
          <TextColorSelect editor={editor} />
          <TextHighlightSelect editor={editor} />
        </div>
      </div>

      <TextMarksActions editor={editor} />

      <TextListActions editor={editor} />

      <HyperlinkAction editor={editor} />
    </div>
  );
};
