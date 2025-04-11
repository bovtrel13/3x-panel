import { createStore, createEvent } from 'effector'

const savedTheme = localStorage.getItem('theme') || 'dark'
export const $theme = createStore<string>(savedTheme)
export const setTheme = createEvent<string>()
$theme.on(setTheme, (_, newTheme) => {
	localStorage.setItem('theme', newTheme)
	return newTheme
})

const savedIsUltra = localStorage.getItem('isUltra') === 'true' || false
export const $isUltra = createStore<boolean>(savedIsUltra)
export const setIsUltra = createEvent<boolean>()
$isUltra.on(setIsUltra, (_, value) => {
	localStorage.setItem('isUltra', String(value))
	return value
})

$theme.watch(theme => {
	if (theme === 'light') {
		setIsUltra(false)
	}
})
