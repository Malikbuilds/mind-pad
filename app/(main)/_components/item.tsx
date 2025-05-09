"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, PlusIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";


interface ItemProps {
    id?: Id<"documents">
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {
    const user = useUser();
    const router = useRouter();
    const create = useMutation (api.documents.create);
    const archive = useMutation(api.documents.archive);

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id });

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note."
        });
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untitled", parentDocument: id })
        .then((documentId) => {
            if (!expanded) {
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note.",
        });
    };


    const ChevronIcon = expanded ? ChevronDown : ChevronRight;



    return (
        <div
        onClick={onClick}
        role="button"
        style={{ paddingLeft: `${(level * 12) + 25}px` }}
        className={cn(
            "cursor-pointer group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-[#f0f0f0] dark:hover:bg-[#27272a] flex items-center text-muted-foreground font-medium",
            active && "bg-[#f0f0f0] dark:bg-[#27272a] text-primary",
        )}
        >
            {!!id && (
                <div
                role="button"
                className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                onClick={handleExpand}
                >
                    <ChevronIcon 
                    className="h-4 w-4 shrink-0 text-muted-foreground-50"
                    />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 text-[18px] mr-2">
                    {documentIcon}
                </div>
            ):
            <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
        }
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5
                select-none items-ceneter gap-1 rounded border bg-muted px-1.5
                font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘
                        </span>K
                </kbd>
            )}
            {!!id&&(
            <div className="ml-auto flex items-center gap-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger
                    onClick={(e) => {
                        e.stopPropagation();
                    } }
                    asChild
                    >
                        <div
                        role="button"
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                        >
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                    className="w-60 bg-white text-black dark:bg-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-md rounded-md"
                    align="start"
                    side="right"
                    forceMount
                    >
                        <DropdownMenuItem onClick={onArchive}
                            className="text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                            >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="text-xs text-muted-foreground p-2">
                            Last edited by: {user?.user ? `${user.user.firstName} ${user.user.lastName}` : "Unknown"}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div 
                role="button"
                onClick={onCreate}
                className="ml-auto flex items-center gap-x-2">
                    <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <PlusIcon className="h-4 w-4 text-muted-foreground/50"/>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number}) {
    return (
        <div
        style={{ 
            paddingLeft: level ? '${(level * 12) + 25}px' : "12px"    
        }}
        className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}