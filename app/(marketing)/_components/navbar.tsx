"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import ModeToggle from "@/components/ui/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();

    return (
      <div className={cn(
        "z-50 bg-[var(--background)] dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm",
      )}>
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
            {isLoading &&(
              <Spinner />
            )}
            {!isAuthenticated && !isLoading && (
              <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="bg-background text-foreground hover:bg-muted dark:hover:bg-muted-foreground">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">
                  Get MindPad Free
                </Button>
              </SignInButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <>
              <Button variant={"ghost"} size="sm" asChild className="bg-background text-foreground hover:bg-muted dark:hover:bg-muted-foreground">
                <Link href="/documents">
                Enter MindPad
                </Link>
              </Button>
              <UserButton
              afterSignOutUrl="/"
              />
              </>
            )}
            <ModeToggle />
        </div>
      </div>
    );
  };  