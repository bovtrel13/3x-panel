import { createStore, createEvent, createEffect, createDomain } from 'effector'

const AuthDomain = createDomain('Auth')

export const $isAuthenticated = AuthDomain.createStore<boolean>(false)
export const setAuthenticated = AuthDomain.createEvent<boolean>()
export const logout = AuthDomain.createEvent()

export const loginFx = AuthDomain.createEffect<
	{ username: string; password: string; secretToken?: string },
	boolean,
	Error
>(({ username, password, secretToken }) => {
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
})

export const saveAuthStateFx = AuthDomain.createEffect<boolean, void>(
	isAuthenticated => {
		localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
	}
)

$isAuthenticated
	.on(setAuthenticated, (_, isAuthenticated) => isAuthenticated)
	.on(loginFx.doneData, () => true)
	.on(logout, () => false)

$isAuthenticated.watch(isAuthenticated => {
	saveAuthStateFx(isAuthenticated)
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
