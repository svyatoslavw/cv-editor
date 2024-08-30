import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import type {
  DeleteItemAction,
  IInitialStateResume,
  ReorderItemsAction,
  SelectItemAction,
  UpdateContentAction,
  UpdateDetailsAction,
  UpdateItemAction
} from "./resume.types"
import { IPersonInfo, IPersonLink, TSectionItem, TSectionKey } from "@/shared/lib"
import {
  createResumeItemHelper,
  isDate,
  reorderArray,
  updateResumeItemDetailsHelper
} from "@/shared/lib/utils"

const initialState: IInitialStateResume = {
  isFirstLoading: true,
  isNameTyped: true,
  visibleBlocks: [],
  person: {
    name: "",
    job: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    information: [],
    links: []
  },
  projects: {
    items: [],
    selected: null
  },
  education: {
    items: [],
    selected: null
  },
  experience: {
    items: [],
    selected: null
  },
  skills: {
    items: [],
    selected: null
  },
  languages: {
    items: [],
    selected: null
  },
  certificates: {
    items: [],
    selected: null
  }
}

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    toggleSectionVisibility: (state, action: PayloadAction<TSectionKey>) => {
      if (state.visibleBlocks.includes(action.payload)) {
        state.visibleBlocks = state.visibleBlocks.filter((key) => key !== action.payload)
      } else {
        state.visibleBlocks.push(action.payload)
      }
    },
    selectItem: (state, action: PayloadAction<SelectItemAction>) => {
      const { id, key } = action.payload
      const item = state[key].items.find((it) => it.id === id)
      if (item) state[key].selected = item
    },
    reorderItems: (state, action: PayloadAction<ReorderItemsAction>) => {
      const { key, from, to } = action.payload
      reorderArray(state[key].items as TSectionItem[], from, to)
    },
    createResumeItem: (state, action: PayloadAction<UpdateItemAction>) => {
      const { key, item } = action.payload
      createResumeItemHelper(state[key].items, item)
    },

    deleteResumeItem: (state, action: PayloadAction<DeleteItemAction>) => {
      ;(state[action.payload.key].items as TSectionItem[]) = state[action.payload.key].items.filter(
        (item) => item.id !== action.payload.id
      )
    },
    updateResumeItemDetails: (state, action: PayloadAction<UpdateDetailsAction>) => {
      const { key, field, value } = action.payload
      updateResumeItemDetailsHelper(
        state[key].items as TSectionItem[],
        state[key].selected?.id ?? null,
        field,
        value
      )
    },
    updatePersonalDetails: (state, action: PayloadAction<UpdateContentAction>) => {
      const { key, value } = action.payload
      if (isDate(value)) {
        state.person.date = value.toISOString()
      } else if (key === "information") {
        state.person.information = value as IPersonInfo[]
      } else if (key === "links") {
        state.person.links = value as IPersonLink[]
      } else {
        state.person[key] = value as string
      }
    },
    hideIsFirstLoading: (state) => {
      state.isFirstLoading = false
    },
    hideIsNameTyped: (state) => {
      state.isNameTyped = false
    }
  }
})

export const {
  updatePersonalDetails,
  createResumeItem,
  deleteResumeItem,
  updateResumeItemDetails,
  selectItem,
  reorderItems,
  toggleSectionVisibility,
  hideIsFirstLoading,
  hideIsNameTyped
} = resumeSlice.actions
