"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import ProjectIcon from "@/public/projects-icon.svg";
import BookIcon from "@/public/book.svg";
import DocIcon from "@/public/doc.svg";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

const Heading = () => {
  const { isAuthenticated, isLoading} = useConvexAuth ();
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
        Your
        <span className="inline-block mx-2 align-middle">
        <Image src="/wiki-icon.svg" alt="Book Icon" width={40} height={40} />
        </span>
        Ideas,
        <span className="inline-block mx-2 align-middle">
        <Image src="/docs-icon.svg" alt="Doc Icon" width={40} height={40} />
        </span>
        Docs, & <br />
        Projects. Together.
        <span className="inline-block mx-2 align-middle">
          <Image src="/projects-icon.svg" alt="target" width={40} height={40} />
        </span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl text-muted-foreground">
        Mindpad is the connected workspace where <br /> better, faster work happens.
      </h3>
      {isLoading && (
      <div className="w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
        Enter Mindpad
        <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>)}
      {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
              <Button>
                Get Mindpad Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </SignInButton>
          )}
        </div>
      );
    }

export default Heading;