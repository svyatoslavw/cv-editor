"use client"

import { ArrowRightIcon, ClipboardListIcon, FilePlus2Icon } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

import { useAppDispatch, useAppSelector } from "@/app/store"
import { createResume, selectResumeSelectedId, useCreateResumeMutation } from "@/entities/resume"
import { CUSTOMIZATION_STATE, GENERAL_STATE } from "@/shared/lib/constants"
import { Button } from "@/shared/ui"
import { ResumeDocument } from "@/widgets"

const HomePage = () => {
  const dispatch = useAppDispatch()
  const resumes = useAppSelector((state) => state.resume.resumes)

  const [mutate, { isLoading }] = useCreateResumeMutation()

  const onSelectResume = (id: string) => {
    dispatch(selectResumeSelectedId({ id }))
  }

  const onCreateResume = async () => {
    const { data } = await mutate({
      customization: JSON.stringify(CUSTOMIZATION_STATE),
      general: JSON.stringify(GENERAL_STATE)
    })

    if (data) {
      dispatch(createResume(data))
      toast.success("Successfully created!")
    }
  }

  return (
    <main className="mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
      <div className="font-rubik mx-auto flex w-full flex-col items-center">
        <h4 className="text-lg font-semibold">Welcome to your Career Tools</h4>
        <h1 className="mt-10 px-4 text-center text-6xl font-extrabold sm:w-full md:w-full lg:w-[450px] xl:w-[550px] 2xl:w-[550px]">
          What do you want to create?
        </h1>
        <div className="mt-16 flex w-full flex-wrap justify-center gap-4">
          <Link
            href="/resume/content"
            className="flex h-40 w-56 cursor-pointer flex-col justify-end gap-2 rounded-[40px] rounded-bl-none border-4 border-gray-300 bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all hover:bg-primary/75"
          >
            <ClipboardListIcon size={44} strokeWidth={1.2} />
            <span>Resume</span>
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-28 grid w-[1280px] place-content-center gap-28">
        <div className="flex flex-col gap-8">
          <div className="flex w-full justify-between">
            <div>
              <h2 className="text-3xl font-semibold">My Resumes</h2>
              <h5 className="text-sm text-neutral-600">
                Your first resume – 100% free, forever, all features, unlimited downloads, yes
                really.
              </h5>
            </div>
            <Button className="gap-1" variant={"link"}>
              View Templates
              <ArrowRightIcon size={16} />
            </Button>
          </div>
          <div className="mb-8 flex w-full flex-wrap gap-3">
            <div
              onClick={onCreateResume}
              className="flex h-64 w-44 cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-neutral-300 transition-all hover:opacity-50"
            >
              <FilePlus2Icon size={44} strokeWidth={1.2} />
            </div>
            {/* <Dialog>
              <DialogTrigger asChild>
                <div className="flex h-64 w-44 cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-neutral-300 transition-all hover:opacity-50">
                  <FilePlus2Icon size={44} strokeWidth={1.2} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-h-[780px] overflow-y-scroll sm:max-w-[1250px]">
                <DialogHeader>
                  <DialogTitle>Resume Templates</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-5 place-content-center gap-5 py-4">
                  {RESUME_TEMPLATES.map((template, index) => (
                    <Link
                      key={template.id}
                      href={"/resume/content"}
                      onClick={() => onSelectResume(template.id)}
                      className="h-80 w-56 cursor-pointer gap-2 overflow-hidden transition-all hover:opacity-50"
                    >
                      <ResumeDocument
                        key={index}
                        customization={template.customization}
                        general={template.general}
                        width={2}
                        height={3}
                        className="h-80"
                        isCard
                      />
                    </Link>
                  ))}
                </div>
              </DialogContent>
            </Dialog> */}

            {resumes.map((resume) => (
              <Link
                key={resume.id}
                href={"/resume/content"}
                onClick={() => onSelectResume(resume.id)}
                className="h-96 w-56 cursor-pointer gap-2 overflow-hidden bg-white shadow transition-all hover:opacity-50"
              >
                <ResumeDocument
                  customization={resume.customization}
                  general={resume.general}
                  width={2}
                  height={3}
                  className="h-96"
                  isCard
                />
              </Link>
            ))}

            {Array.from({ length: 4 - resumes.length }).map((_, index) => (
              <div
                key={index}
                className="h-96 w-56 cursor-pointer gap-2 bg-white shadow transition-all hover:opacity-50"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export { HomePage }
