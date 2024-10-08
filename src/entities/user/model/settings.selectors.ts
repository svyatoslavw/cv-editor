import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "@/app/store"

export const selectSettingsTheme = createSelector(
  (state: RootState) => state.settings,
  (settings) => settings.theme
)

export const selectSettings = createSelector(
  (state: RootState) => state.settings,
  (settings) => settings
)
