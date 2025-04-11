import { createStore, createEvent } from 'effector'

const generateRandomToken = () => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let token = ''
	for (let i = 0; i < 64; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return token
}

export const $currentUsername = createStore<string>('admin')
export const $currentPassword = createStore<string>('admin')
export const $newUsername = createStore<string>('')
export const $newPassword = createStore<string>('')
export const $showCurrentPassword = createStore<boolean>(false)
export const $showNewPassword = createStore<boolean>(false)
export const $isSecureLoginEnabled = createStore<boolean>(false)
export const $secretToken = createStore<string>('')
export const $activeSubTab = createStore<string>('General')
export const $errorMessage = createStore<string | null>(null)
export const $isDataConfirmed = createStore<boolean>(false)

export const setCurrentUsername = createEvent<string>()
export const setCurrentPassword = createEvent<string>()
export const setNewUsername = createEvent<string>()
export const setNewPassword = createEvent<string>()
export const toggleShowCurrentPassword = createEvent()
export const toggleShowNewPassword = createEvent()
export const toggleSecureLogin = createEvent<boolean>()
export const setSecretToken = createEvent<string>()
export const generateNewToken = createEvent()
export const setActiveSubTab = createEvent<string>()
export const setErrorMessage = createEvent<string | null>()
export const saveData = createEvent()
export const setDataConfirmed = createEvent<boolean>()

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

generateNewToken.watch(() => {
	const newToken = generateRandomToken()
	setSecretToken(newToken)
	localStorage.setItem('secretToken', newToken)
})

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
	if (isSecureLoginEnabled && !savedToken) {
		toggleSecureLogin(false)
		localStorage.setItem('isSecureLoginEnabled', JSON.stringify(false))
	} else {
		toggleSecureLogin(isSecureLoginEnabled)
	}
}

$isSecureLoginEnabled.watch(isEnabled => {
	localStorage.setItem('isSecureLoginEnabled', JSON.stringify(isEnabled))
})

export const confirmAuth = () => {
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
		setErrorMessage('Current username or password is incorrect')
		return
	}

	if (!newUsername || !newPassword) {
		setErrorMessage('New username and password are required')
		return
	}

	setCurrentUsername(newUsername)
	setCurrentPassword(newPassword)
	localStorage.setItem('currentUsername', newUsername)
	localStorage.setItem('currentPassword', newPassword)

	setNewUsername('')
	setNewPassword('')

	setErrorMessage(null)
	setDataConfirmed(true)
}

export const confirmSecureLogin = () => {
	const isEnabled = $isSecureLoginEnabled.getState()
	const token = $secretToken.getState()

	if (isEnabled && !token) {
		setErrorMessage('Secret token is required when Secure Login is enabled')
		return
	}

	localStorage.setItem('isSecureLoginEnabled', JSON.stringify(isEnabled))
	if (isEnabled && token) {
		localStorage.setItem('secretToken', token)
	} else {
		localStorage.removeItem('secretToken')
		setSecretToken('')
	}

	setErrorMessage(null)
	setDataConfirmed(true)
}

saveData.watch(() => {
	setDataConfirmed(false)
})
