"use client"

import { format } from "date-fns"
import { CalendarIcon, CheckIcon, Loader2Icon, PlusIcon, X } from "lucide-react"
import { useFieldArray } from "react-hook-form"

import { useEditResumePersonForm } from "./useEditResumePersonForm"
import { toggleStatus } from "@/entities/resume"
import { PERSONAL_INFORMATION } from "@/shared/lib"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { cn } from "@/shared/lib/utils"
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/shared/ui"

const EditResumePerson = () => {
  const content = useAppSelector((state) => state.resume.person)
  const dispatch = useAppDispatch()
  const { form, functions, state } = useEditResumePersonForm({ content })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "information"
  })

  const informationItems = PERSONAL_INFORMATION.filter(
    (fld) => !fields.some((f) => f.text === fld.title)
  )

  const onCancel = () => {
    dispatch(toggleStatus({ key: "isEditing", content: "person" }))
  }
  return (
    <div className="relative mt-5 flex flex-col gap-5">
      <Form {...form}>
        <form onSubmit={functions.onSubmit}>
          <div className="flex h-[calc(100vh-16rem)] flex-col gap-5 overflow-y-scroll rounded-lg bg-white p-6 shadow-md">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Edit personal details</h2>
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex w-4/5 flex-col gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel />
                          <FormControl>
                            <Input
                              heading="Full name"
                              type="text"
                              name="name"
                              placeholder="Your name"
                              value={field.value}
                              onChange={field.onChange}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="job"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel />
                          <FormControl>
                            <Input
                              heading="Job title"
                              placeholder="Your job"
                              isOptional
                              type="text"
                              name="job"
                              value={field.value}
                              onChange={field.onChange}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="h-20 w-20 rounded-full bg-red-100"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel />
                        <FormControl>
                          <Input
                            heading="Email"
                            placeholder="Your email"
                            type="email"
                            name="email"
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel />
                        <FormControl>
                          <Input
                            type="tel"
                            name="phone"
                            heading="Phone"
                            placeholder="Your phone"
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input
                          heading="Address"
                          type="text"
                          placeholder="Your address"
                          name="address"
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="mb-2 text-2xl font-bold">Personal information</h2>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  name={`information.${index}.text`}
                  render={({ field }) => (
                    <FormItem className="my-3 flex w-2/5 items-center gap-2 space-y-0">
                      <FormControl>
                        {fields[index].value !== "date" ? (
                          <Input {...field} />
                        ) : (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant={"outline"}
                                className={cn(
                                  "w-[calc(100%-2.5rem)] space-y-0 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {/\d/.test(field.value)
                                  ? format(field.value, "PPP")
                                  : format("1900-01-01", "PPP")}

                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)}
                                onSelect={(date) => field.onChange(date?.toISOString())}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      </FormControl>
                      <Button
                        type="button"
                        size={"icon"}
                        variant={"secondary"}
                        onClick={() => remove(index)}
                      >
                        <X color="gray" />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex flex-wrap gap-2">
                {informationItems.map((fld) => (
                  <Button
                    key={fld.value}
                    type="button"
                    size={"sm"}
                    variant={"secondary"}
                    disabled={fields.length >= 8}
                    onClick={() => append({ text: fld.title, value: fld.value })}
                  >
                    <PlusIcon className="mr-2" size={18} />
                    {fld.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 left-0 mt-5 flex w-full items-center justify-end gap-2 rounded-lg bg-white px-6 py-3 shadow-md">
            <Button onClick={onCancel} type="button" variant={"outline"}>
              Cancel
            </Button>
            <Button type="submit">
              {state.isLoading ? (
                <Loader2Icon className="mr-2 animate-spin" size={16} />
              ) : (
                <CheckIcon className="mr-2" size={16} />
              )}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { EditResumePerson }
