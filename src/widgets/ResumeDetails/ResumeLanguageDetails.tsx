import { LanguagesIcon } from "lucide-react"

import { useAppSelector } from "@/app/store"
import { ResumeDetails, selectGeneralResume } from "@/entities/resume"
import { LanguageList } from "@/widgets"

const ResumeLanguageDetails = () => {
  const {
    languages: { items }
  } = useAppSelector(selectGeneralResume)

  return (
    <ResumeDetails
      items={items}
      type="languages"
      Icon={LanguagesIcon}
      render={(items, provided) => (
        <div className="mx-0.5" ref={provided.innerRef} {...provided.droppableProps}>
          <LanguageList languages={items} />
        </div>
      )}
    />
  )
}

export { ResumeLanguageDetails }
