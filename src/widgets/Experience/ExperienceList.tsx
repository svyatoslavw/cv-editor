"use client"
import { selectItem, toggleState } from "@/entities/resume"
import type { IExperience } from "@/shared/lib"
import { useAppDispatch } from "@/shared/lib/store"
import React from "react"
import { ExperienceItem } from "./ExperienceItem"

const ExperienceList = React.memo(function List({
  experience = []
}: {
  experience: IExperience[]
}) {
  const dispatch = useAppDispatch()

  const onEditChange = (experienceId: string) => {
    dispatch(selectItem({ id: experienceId, key: "experience" }))
    dispatch(toggleState({ key: "isEditing", content: "experience" }))
  }

  return experience.map((experience: IExperience, index: number) => (
    <ExperienceItem
      key={experience.id}
      index={index}
      experience={experience}
      onEditChange={() => onEditChange(experience.id)}
    />
  ))
})

export { ExperienceList }
