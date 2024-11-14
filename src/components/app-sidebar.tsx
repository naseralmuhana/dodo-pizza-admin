"use client"

import { ComponentProps } from "react"
import Link from "next/link"
import {
  Tag,
  Utensils,
  Pizza,
  Grid,
  Expand,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { LogoSvg } from "@/components/logo-svg"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "categories",
      url: "/categories",
      icon: Tag,
    },
    {
      title: "ingredients",
      url: "/ingredients",
      icon: Utensils,
    },
    {
      title: "products",
      url: "/products",
      icon: Pizza,
    },
    {
      title: "types",
      url: "/types",
      icon: Grid,
    },
    {
      title: "sizes",
      url: "/sizes",
      icon: Expand,
    },
  ],
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="animate-slide-right"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex size-8 items-center justify-center rounded-lg">
                  <LogoSvg />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Dodo pizza</span>
                  <span className="truncate text-xs">Simply Delicious</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="General" />
      </SidebarContent>
      <SidebarFooter>{/* nav user */}</SidebarFooter>
    </Sidebar>
  )
}
