"use client"

import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { capitalize } from "@/lib/utils"

interface navMain extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}

export const NavMain = ({ items, ...props }: navMain) => {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={capitalize(item.title)}
                isActive={pathname === item.url}
                onClick={() => setOpenMobile(false)}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{capitalize(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
