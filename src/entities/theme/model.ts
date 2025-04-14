import { createStore, createEvent, createEffect, createDomain } from 'effector'
import { sample } from 'effector'

const ThemeDomain = createDomain('Theme')

const savedTheme = localStorage.getItem('theme') || 'dark'
export const $theme = ThemeDomain.createStore<string>(savedTheme)
export const setTheme = ThemeDomain.createEvent<string>()

const savedIsUltra = localStorage.getItem('isUltra') === 'true' || false
export const $isUltra = ThemeDomain.createStore<boolean>(savedIsUltra)
export const setIsUltra = ThemeDomain.createEvent<boolean>()

export const saveThemeFx = ThemeDomain.createEffect<string, void>(theme => {
	localStorage.setItem('theme', theme)
})

export const saveIsUltraFx = ThemeDomain.createEffect<boolean, void>(value => {
	localStorage.setItem('isUltra', String(value))
})

$theme.on(setTheme, (_, newTheme) => newTheme)
$isUltra.on(setIsUltra, (_, value) => value)

sample({
	clock: setTheme,
	target: saveThemeFx,
})

sample({
	clock: setIsUltra,
	target: saveIsUltraFx,
})

sample({
	clock: setTheme,
	filter: theme => theme === 'light',
	fn: () => false,
	target: setIsUltra,
})
