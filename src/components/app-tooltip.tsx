import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { capitalizeFirstLetter } from "@/lib/utils"

interface AppTooltipProps {
  children: React.ReactNode
  content: string
  isCapitalize?: boolean
}

export const AppTooltip = ({
  children,
  content,
  isCapitalize
}: AppTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{isCapitalize ? capitalizeFirstLetter(content) : content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
