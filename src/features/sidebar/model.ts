import { createStore, createEvent } from 'effector'

export const login = createEvent()
export const logout = createEvent()

export const $isAuthenticated = createStore<boolean>(false)
	.on(login, () => true)
	.on(logout, () => false)
