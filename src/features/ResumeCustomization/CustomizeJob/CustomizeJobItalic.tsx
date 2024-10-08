import { useAppDispatch, useAppSelector } from "@/app/store"
import { selectCustomizationResume, updateCustomization } from "@/entities/resume"
import { Button, CustomizeSectionWrapper } from "@/shared/ui"

const CustomizeJobItalic = () => {
  const dispatch = useAppDispatch()
  const {
    job: { isItalic }
  } = useAppSelector(selectCustomizationResume)

  const onChangeIsItalic = (value: boolean) => {
    dispatch(updateCustomization({ key: "job", value: { isItalic: value } }))
  }

  return (
    <CustomizeSectionWrapper heading="Style">
      <Button variant={!isItalic ? "default" : "outline"} onClick={() => onChangeIsItalic(false)}>
        Normal
      </Button>
      <Button
        variant={isItalic ? "default" : "outline"}
        onClick={() => onChangeIsItalic(true)}
        className="italic"
      >
        Italic
      </Button>
    </CustomizeSectionWrapper>
  )
}

export { CustomizeJobItalic }
