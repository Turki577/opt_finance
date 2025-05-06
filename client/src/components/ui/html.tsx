// Inspired by react-html-attrs
// https://github.com/azimgd/react-html-attrs
import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const htmlVariants = cva("", {
  variants: {
    dir: {
      rtl: "direction-rtl",
      ltr: "direction-ltr",
    },
    lang: {
      ar: "lang-ar",
      en: "lang-en",
    },
  },
  defaultVariants: {
    dir: "rtl",
    lang: "ar",
  },
})

export interface HtmlProps
  extends React.HTMLAttributes<HTMLHtmlElement>,
    VariantProps<typeof htmlVariants> {}

const Html = React.forwardRef<HTMLHtmlElement, HtmlProps>(
  ({ className, dir, lang, ...props }, ref) => {
    return (
      <html
        className={cn(htmlVariants({ dir, lang }), className)}
        dir={dir}
        lang={lang}
        ref={ref}
        {...props}
      />
    )
  }
)

Html.displayName = "Html"

export { Html }
