import { createStore, createEvent } from 'effector'

export const setTheme = createEvent<string>()

export const $theme = createStore<string>('dark').on(
	setTheme,
	(_, theme) => theme
)
