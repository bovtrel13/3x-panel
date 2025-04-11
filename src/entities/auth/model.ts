import { createStore, createEvent, createEffect } from 'effector'

export const $isAuthenticated = createStore<boolean>(false)
export const setAuthenticated = createEvent<boolean>()
export const logout = createEvent()

export const loginFx = createEffect(
	({
		username,
		password,
		secretToken,
	}: {
		username: string
		password: string
		secretToken?: string
	}) => {
		const currentUsername = localStorage.getItem('currentUsername') || 'admin'
		const currentPassword = localStorage.getItem('currentPassword') || 'admin'
		const currentSecretToken = localStorage.getItem('secretToken') || ''

		if (
			username === currentUsername &&
			password === currentPassword &&
			(!currentSecretToken || secretToken === currentSecretToken)
		) {
			return true
		}
		throw new Error('Invalid credentials')
	}
)

$isAuthenticated.on(setAuthenticated, (_, isAuthenticated) => isAuthenticated)
$isAuthenticated.on(loginFx.doneData, () => true)
$isAuthenticated.on(logout, () => false)

$isAuthenticated.watch(isAuthenticated => {
	localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
})

const savedAuthState = localStorage.getItem('isAuthenticated')
if (savedAuthState) {
	setAuthenticated(JSON.parse(savedAuthState))
}

export const login = ({
	username,
	password,
	secretToken,
}: {
	username: string
	password: string
	secretToken?: string
}) => {
	return loginFx({ username, password, secretToken })
}
