import * as Icons from "lucide-react"
import { createElement } from "react"

import { AppTooltip } from "@/components/app-tooltip"
import { Button } from "@/components/ui/button"

interface IconButtonProps extends Icons.LucideProps {
  iconName?: keyof typeof Icons
  tooltipContent: string
}

export const IconButton = ({
  iconName,
  tooltipContent,
  ...props
}: IconButtonProps) => {
  const IconComponent = Icons[iconName || "Egg"] as Icons.LucideIcon

  return (
    <AppTooltip content={tooltipContent} isCapitalize>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        {createElement(IconComponent, {
          ...props
        })}
      </Button>
    </AppTooltip>
  )
}
