import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppBreadcrumb, GithubButton, ThemeButton } from "./components"
import { cn } from "@/lib/utils"

export const Header = () => {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 animate-slide-down items-center gap-2",
        "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AppBreadcrumb />
      </div>
      <div className="ml-auto flex items-center gap-2 px-4 pr-6">
        <GithubButton />
        <ThemeButton />
      </div>
    </header>
  )
}

// sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border
