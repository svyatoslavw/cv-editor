"use client"

import { useAppDispatch, useAppSelector } from "@/app/store"
import { selectCustomizationResume, updateCustomization } from "@/entities/resume"
import { HEADING_SIZES } from "@/shared/lib/constants"
import { TypeHeadingSize } from "@/shared/lib/types"
import { convertValueFromObject } from "@/shared/lib/utils"
import { Button, CustomizeSectionWrapper } from "@/shared/ui"

const headingSizeMap: Record<TypeHeadingSize, string> = {
  "12": "XS",
  "16": "S",
  "20": "M",
  "24": "L",
  "28": "XL"
}

const CustomizeHeadingSize = () => {
  const dispatch = useAppDispatch()
  const {
    heading: { size: sz }
  } = useAppSelector(selectCustomizationResume)

  const onChangeSize = (size: TypeHeadingSize) => {
    dispatch(updateCustomization({ key: "heading", value: { size } }))
  }

  return (
    <CustomizeSectionWrapper heading="Size">
      {HEADING_SIZES.map((size) => (
        <Button
          key={size}
          variant={sz === size ? "default" : "outline"}
          onClick={() => onChangeSize(size)}
        >
          {convertValueFromObject(size, headingSizeMap)}
        </Button>
      ))}
    </CustomizeSectionWrapper>
  )
}

export { CustomizeHeadingSize }
