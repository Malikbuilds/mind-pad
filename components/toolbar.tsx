"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ComponentRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
    initalData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar = ({
    initalData,
    preview
}: ToolbarProps) => {
    const inputRef = useRef<React.ComponentRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initalData.title);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initalData.title);
            inputRef.current?.focus();
        }, 0);
    };


    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initalData._id,
            title: value || "Untitled"
        });
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if(event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initalData._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        removeIcon({
            id:initalData._id
        })
    }

    return (
        <div className="pl-[54px] group relative text-white">
            {!!initalData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon
                pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initalData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 
                        transition text-muted-foreground text-xs"
                        variant="subtleOutline"
                        size="icon"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!initalData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initalData.icon}
                </p>
            )}
            <div className="opacity-0 group-hover:opacity-100
            flex items-center gap-x-1 py-4">
                {!initalData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button 
                        className="text-muted-foreground text-xs"
                        variant="subtleOutline"
                        size="sm"
                        >
                            <Smile className="h-4 w-4 mr-2"/>
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initalData.coverImage && !preview && (
                    <Button
                    onClick={coverImage.onOpen}
                    className="text-muted-foreground text-xs"
                    variant="subtleOutline"
                    size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2"/>
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize 
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words
                    outline-none text-[#3f3f3f] dark:text-[#CFCFCF] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words
                    outline-none text-[#3f3f3f] dark:text-[#CFCFCF]"
                >
                    {initalData.title}
                </div>
            )}
        </div>
    );
};