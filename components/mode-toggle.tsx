"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
const [isMounted, setIsMounted] = React.useState(false);

React.useEffect(() => {
  setIsMounted(true);
}, []);

  if (!isMounted) return null // 🧠 Prevent SSR mismatch

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        {isMounted && resolvedTheme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"
      className="bg-white text-black dark:bg-[#1f1f1f] dark:text-white border border-border">
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle;