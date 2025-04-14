import { createStore, createEvent, createEffect, createDomain } from 'effector'
import { sample } from 'effector'

const PanelSettingsDomain = createDomain('PanelSettings')

const generateRandomToken = () => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let token = ''
	for (let i = 0; i < 64; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return token
}

export const $currentUsername = PanelSettingsDomain.createStore<string>('')
export const $currentPassword = PanelSettingsDomain.createStore<string>('')
export const $newUsername = PanelSettingsDomain.createStore<string>('')
export const $newPassword = PanelSettingsDomain.createStore<string>('')
export const $showCurrentPassword =
	PanelSettingsDomain.createStore<boolean>(false)
export const $showNewPassword = PanelSettingsDomain.createStore<boolean>(false)
export const $isSecureLoginEnabled =
	PanelSettingsDomain.createStore<boolean>(false)
export const $secretToken = PanelSettingsDomain.createStore<string>('')
export const $activeSubTab = PanelSettingsDomain.createStore<string>('General')
export const $errorMessage = PanelSettingsDomain.createStore<string | null>(
	null
)
export const $isDataConfirmed = PanelSettingsDomain.createStore<boolean>(false)
export const $notification = PanelSettingsDomain.createStore<string | null>(
	null
)

export const setCurrentUsername = PanelSettingsDomain.createEvent<string>()
export const setCurrentPassword = PanelSettingsDomain.createEvent<string>()
export const setNewUsername = PanelSettingsDomain.createEvent<string>()
export const setNewPassword = PanelSettingsDomain.createEvent<string>()
export const toggleShowCurrentPassword = PanelSettingsDomain.createEvent()
export const toggleShowNewPassword = PanelSettingsDomain.createEvent()
export const toggleSecureLogin = PanelSettingsDomain.createEvent<boolean>()
export const setSecretToken = PanelSettingsDomain.createEvent<string>()
export const generateNewToken = PanelSettingsDomain.createEvent()
export const setActiveSubTab = PanelSettingsDomain.createEvent<string>()
export const setErrorMessage = PanelSettingsDomain.createEvent<string | null>()
export const saveData = PanelSettingsDomain.createEvent()
export const setDataConfirmed = PanelSettingsDomain.createEvent<boolean>()
export const confirmAuth = PanelSettingsDomain.createEvent()
export const confirmSecureLogin = PanelSettingsDomain.createEvent()
export const clearNotification = PanelSettingsDomain.createEvent()

export const saveCredentialsFx = PanelSettingsDomain.createEffect<
	{ username: string; password: string },
	void
>(({ username, password }) => {
	localStorage.setItem('currentUsername', username)
	localStorage.setItem('currentPassword', password)
})

export const saveSecureLoginFx = PanelSettingsDomain.createEffect<
	{ isEnabled: boolean; token?: string },
	void
>(({ isEnabled, token }) => {
	localStorage.setItem('isSecureLoginEnabled', JSON.stringify(isEnabled))
	if (isEnabled && token) {
		localStorage.setItem('secretToken', token)
	} else {
		localStorage.removeItem('secretToken')
	}
})

export const saveDataFx = PanelSettingsDomain.createEffect<void, void>(() => {
	// Имитация сохранения данных
})

export const initCredentialsFx = PanelSettingsDomain.createEffect<void, void>(
	() => {
		if (!localStorage.getItem('currentUsername')) {
			localStorage.setItem('currentUsername', 'admin')
			setCurrentUsername('admin')
		}
		if (!localStorage.getItem('currentPassword')) {
			localStorage.setItem('currentPassword', 'admin')
			setCurrentPassword('admin')
		}
	}
)

$currentUsername.on(setCurrentUsername, (_, username) => username)
$currentPassword.on(setCurrentPassword, (_, password) => password)
$newUsername.on(setNewUsername, (_, username) => username)
$newPassword.on(setNewPassword, (_, password) => password)
$showCurrentPassword.on(toggleShowCurrentPassword, state => !state)
$showNewPassword.on(toggleShowNewPassword, state => !state)
$isSecureLoginEnabled.on(toggleSecureLogin, (_, isEnabled) => isEnabled)
$secretToken.on(setSecretToken, (_, token) => token)
$activeSubTab.on(setActiveSubTab, (_, tab) => tab)
$errorMessage.on(setErrorMessage, (_, message) => message)
$isDataConfirmed.on(setDataConfirmed, (_, confirmed) => confirmed)
$notification.on(clearNotification, () => null)

initCredentialsFx()

sample({
	clock: generateNewToken,
	fn: () => generateRandomToken(),
	target: setSecretToken,
})

sample({
	clock: setSecretToken,
	fn: token => token,
	target: PanelSettingsDomain.createEffect((token: string) => {
		localStorage.setItem('secretToken', token)
	}),
})

sample({
	clock: saveData,
	target: saveDataFx,
})

sample({
	clock: saveDataFx.done,
	fn: () => 'Changes saved, restart the panel to apply all changes',
	target: $notification,
})

export const confirmAuthFx = PanelSettingsDomain.createEffect<
	void,
	void,
	Error
>(async () => {
	const currentUsername = $currentUsername.getState()
	const currentPassword = $currentPassword.getState()
	const newUsername = $newUsername.getState()
	const newPassword = $newPassword.getState()

	const storedUsername = localStorage.getItem('currentUsername') || 'admin'
	const storedPassword = localStorage.getItem('currentPassword') || 'admin'

	if (
		currentUsername !== storedUsername ||
		currentPassword !== storedPassword
	) {
		throw new Error('Current username or password is incorrect')
	}

	if (!newUsername || !newPassword) {
		throw new Error('New username and password are required')
	}

	await saveCredentialsFx({ username: newUsername, password: newPassword })
	setCurrentUsername(newUsername)
	setCurrentPassword(newPassword)
	setNewUsername('')
	setNewPassword('')
	setDataConfirmed(true)
})

export const confirmSecureLoginFx = PanelSettingsDomain.createEffect<
	void,
	void,
	Error
>(async () => {
	const isEnabled = $isSecureLoginEnabled.getState()
	const token = $secretToken.getState()

	if (isEnabled && !token) {
		throw new Error('Secret token is required when Secure Login is enabled')
	}

	await saveSecureLoginFx({ isEnabled, token })
	setDataConfirmed(true)
})

sample({
	clock: confirmAuth,
	target: confirmAuthFx,
})

sample({
	clock: confirmAuthFx.done,
	fn: () => 'Press Save button to save actions',
	target: $notification,
})

sample({
	clock: confirmAuthFx.failData,
	fn: error => error.message,
	target: setErrorMessage,
})

sample({
	clock: confirmAuthFx.done,
	fn: () => null,
	target: setErrorMessage,
})

sample({
	clock: confirmSecureLogin,
	target: confirmSecureLoginFx,
})

sample({
	clock: confirmSecureLoginFx.done,
	fn: () => 'Press Save button to save actions',
	target: $notification,
})

sample({
	clock: confirmSecureLoginFx.failData,
	fn: error => error.message,
	target: setErrorMessage,
})

sample({
	clock: confirmSecureLoginFx.done,
	fn: () => null,
	target: setErrorMessage,
})

// Загрузка сохраненных данных
const savedUsername = localStorage.getItem('currentUsername')
const savedPassword = localStorage.getItem('currentPassword')
const savedToken = localStorage.getItem('secretToken')
const savedSecureLogin = localStorage.getItem('isSecureLoginEnabled')

if (savedUsername) {
	setCurrentUsername(savedUsername)
}
if (savedPassword) {
	setCurrentPassword(savedPassword)
}
if (savedToken) {
	setSecretToken(savedToken)
}
if (savedSecureLogin) {
	const isSecureLoginEnabled = JSON.parse(savedSecureLogin)
	toggleSecureLogin(isSecureLoginEnabled)
}
