"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { Navigation } from "./_components/navigation";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";

export const MainLayout = ({ 
    children 
}: {
     children: React.ReactNode 
    }) => {
        const { isAuthenticated, isLoading } = useConvexAuth();

if (isLoading) {
    return (
        <div className="h-screen flex items-center justify-center">
    <Spinner size="lg"/>
  </div>
    );
}

if (!isAuthenticated) {
    return redirect("/");
}

    return (
      <div className="h-screen flex dark:bg-[#1F1F1F]">
        <Navigation />
        <main className="flex-1 h-screen overflow-y-auto">
          <SearchCommand />
          {children}
        </main>
      </div>
    )
  };

export default MainLayout;