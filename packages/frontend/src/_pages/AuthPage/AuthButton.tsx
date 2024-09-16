import React from "react"

import { cn, getAuthURL } from "@/shared/lib/utils"

interface AuthButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string
  credential: string
}

const AuthButton = React.forwardRef<HTMLAnchorElement, AuthButtonProps>(
  ({ children, text, credential, className, ...props }, ref) => {
    return (
      <a
        {...props}
        ref={ref}
        href={getAuthURL(credential)}
        className={cn(
          "flex w-full items-center justify-center border bg-white py-2 text-foreground transition-all hover:bg-zinc-50 dark:text-background",
          className
        )}
      >
        <span className="flex items-center justify-start gap-3">{children}</span>
      </a>
    )
  }
)
AuthButton.displayName = "AuthButton"

export { AuthButton }
