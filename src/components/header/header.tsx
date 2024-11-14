import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppBreadcrumb, GithubButton, ThemeButton } from "./components"

export const Header = () => {
  return (
    <header className="animate-slide-down flex h-16 shrink-0 items-center gap-2">
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
