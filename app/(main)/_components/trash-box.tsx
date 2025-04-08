"use client";

import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash) as Array<{ _id: string; title: string }>;
    const restore = useMutation(api.documents.restore);

    const handleRestoreSuccess = () => {
        // This forces Convex to refetch the `getTrash` query
        void router.refresh();
    };
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push('/documents/${documentId');
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        console.log("Restoring document ID:", documentId);

        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error:"Failed to restore note."
        });

        promise.then(() => router.refresh());
    };

    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error:"Failed to delete note."
        });

        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg"/>
            </div>
        )
    }

    return (
        <div className="text-sm">
           <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
           </div>
           <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                    key={document._id}
                    role="button"
                    onClick={() => onClick(document._id)}
                    className="text-sm rounded-sm w-full hover:bg-gray-100 dark:hover:bg-white/5 flex
                    items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, document._id as Id<"documents">)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id as Id<"documents">)}>
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground"/>
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
            ))}
           </div>
        </div>
    )
};