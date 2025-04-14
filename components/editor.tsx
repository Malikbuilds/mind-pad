"use client";

import {
    BlockNoteEditor,
    PartialBlock
} from"@blocknote/core";

"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initalContent?: string;
    editable?: boolean;
};

export const CustomEditor = ({
    onChange,
    initalContent,
    editable
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file:File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });
        return response.url;
    };

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initalContent ? JSON.parse(initalContent) as PartialBlock[] : undefined,
    });

    if (editor) {
        editor.onChange(() => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        });
    }

    return (        
    <div className="bg-transparent">
        <BlockNoteView
            editor={editor}
            editable={editable}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            className="!bg-transparent !shadow-none !ring-0"
        />

    </div>
    )
}