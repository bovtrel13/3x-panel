import { createStore, createEvent } from 'effector'

// Функция для генерации случайного токена
const generateRandomToken = () => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let token = ''
	for (let i = 0; i < 64; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return token
}

// Состояние полей
export const $currentUsername = createStore('')
export const $currentPassword = createStore('')
export const $newUsername = createStore('')
export const $newPassword = createStore('')
export const $showCurrentPassword = createStore(false)
export const $showNewPassword = createStore(false)
export const $isSecureLoginEnabled = createStore(false)
export const $secretToken = createStore('')
export const $activeSubTab = createStore('Authentication')
export const $isDataConfirmed = createStore(false)

// События для изменения состояния
export const setCurrentUsername = createEvent<string>()
export const setCurrentPassword = createEvent<string>()
export const setNewUsername = createEvent<string>()
export const setNewPassword = createEvent<string>()
export const toggleShowCurrentPassword = createEvent()
export const toggleShowNewPassword = createEvent()
export const toggleSecureLogin = createEvent()
export const setSecretToken = createEvent<string>()
export const setActiveSubTab = createEvent<string>()
export const confirmAuth = createEvent()
export const saveData = createEvent()
export const resetConfirmation = createEvent()

// Логика обновления состояния
$currentUsername.on(setCurrentUsername, (_, value) => value)
$currentPassword.on(setCurrentPassword, (_, value) => value)
$newUsername.on(setNewUsername, (_, value) => value)
$newPassword.on(setNewPassword, (_, value) => value)
$showCurrentPassword.on(toggleShowCurrentPassword, state => !state)
$showNewPassword.on(toggleShowNewPassword, state => !state)
$isSecureLoginEnabled.on(toggleSecureLogin, state => !state)
$secretToken.on(setSecretToken, (_, value) => value)
$activeSubTab.on(setActiveSubTab, (_, tab) => tab)
$isDataConfirmed.on(confirmAuth, () => true)
$isDataConfirmed.on(saveData, () => false)
$isDataConfirmed.on(resetConfirmation, () => false)

// Генерация токена при включении Secure Login
$isSecureLoginEnabled.watch(enabled => {
	if (enabled && !$secretToken.getState()) {
		setSecretToken(generateRandomToken())
	}
})

// Логика подтверждения аутентификации
confirmAuth.watch(() => {
	const authData = {
		currentUsername: $currentUsername.getState(),
		currentPassword: $currentPassword.getState(),
		newUsername: $newUsername.getState(),
		newPassword: $newPassword.getState(),
		isSecureLoginEnabled: $isSecureLoginEnabled.getState(),
		secretToken: $secretToken.getState(),
	}
	console.log('Authentication data confirmed:', authData)
})

// Логика сохранения данных
saveData.watch(() => {
	const authData = {
		currentUsername: $currentUsername.getState(),
		currentPassword: $currentPassword.getState(),
		newUsername: $newUsername.getState(),
		newPassword: $newPassword.getState(),
		isSecureLoginEnabled: $isSecureLoginEnabled.getState(),
		secretToken: $secretToken.getState(),
	}
	console.log('Saving data:', authData)
})
