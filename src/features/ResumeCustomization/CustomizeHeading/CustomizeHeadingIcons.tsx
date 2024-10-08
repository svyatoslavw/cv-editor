"use client"

import { useAppDispatch, useAppSelector } from "@/app/store"
import { selectCustomizationResume, updateCustomization } from "@/entities/resume"
import { HEADING_ICONS } from "@/shared/lib/constants"
import type { TypeHeadingIcon } from "@/shared/lib/types"
import { Button, CustomizeSectionWrapper } from "@/shared/ui"

const CustomizeHeadingIcons = () => {
  const dispatch = useAppDispatch()
  const {
    heading: { icons }
  } = useAppSelector(selectCustomizationResume)

  const onChangeIcon = (icons: TypeHeadingIcon) => {
    dispatch(updateCustomization({ key: "heading", value: { icons } }))
  }
  return (
    <CustomizeSectionWrapper heading="Icons">
      {HEADING_ICONS.map((icon) => (
        <Button
          key={icon}
          variant={icons === icon ? "default" : "outline"}
          onClick={() => onChangeIcon(icon)}
          className="capitalize"
        >
          {icon}
        </Button>
      ))}
    </CustomizeSectionWrapper>
  )
}

export { CustomizeHeadingIcons }
