import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import {
	$currentUsername,
	$currentPassword,
	$newUsername,
	$newPassword,
	$showCurrentPassword,
	$showNewPassword,
	$isSecureLoginEnabled,
	$secretToken,
	$errorMessage,
	setCurrentUsername,
	setCurrentPassword,
	setNewUsername,
	setNewPassword,
	toggleShowCurrentPassword,
	toggleShowNewPassword,
	toggleSecureLogin,
	setSecretToken,
	generateNewToken,
	confirmAuth,
	confirmSecureLogin,
	$activeSubTab,
	setActiveSubTab,
} from './model'
import RestartPanel from './restart-panel/ui'
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { $theme, $isUltra } from '@/entities/theme/model'

const PanelSettingsTab = () => {
	const { t } = useTranslation()
	const theme = useStore($theme)
	const isUltra = useStore($isUltra)

	const currentUsername = useStore($currentUsername)
	const currentPassword = useStore($currentPassword)
	const newUsername = useStore($newUsername)
	const newPassword = useStore($newPassword)
	const showCurrentPassword = useStore($showCurrentPassword)
	const showNewPassword = useStore($showNewPassword)
	const isSecureLoginEnabled = useStore($isSecureLoginEnabled)
	const secretToken = useStore($secretToken)
	const activeSubTab = useStore($activeSubTab)
	const errorMessage = useStore($errorMessage)

	const getContainerBackground = () => {
		if (theme === 'light') {
			return 'bg-gray-200'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#0D2225]'
		} else {
			return 'bg-[#1a2a44]'
		}
	}

	const getTextColor = () => {
		if (theme === 'light') {
			return 'text-gray-800'
		} else if (theme === 'dark' && isUltra) {
			return 'text-teal-400'
		} else {
			return 'text-white'
		}
	}

	const getTabStyles = (isActive: boolean) => {
		if (isActive) {
			if (theme === 'light') {
				return 'border-teal-500 text-teal-500'
			} else if (theme === 'dark' && isUltra) {
				return 'border-teal-400 text-teal-400'
			} else {
				return 'border-teal-500 text-teal-500'
			}
		} else {
			if (theme === 'light') {
				return 'border-transparent text-gray-600 hover:text-gray-800'
			} else {
				return 'border-transparent text-gray-400 hover:text-gray-300'
			}
		}
	}

	const getInputStyles = () => {
		if (theme === 'light') {
			return 'bg-gray-100 text-gray-800 border-gray-300 focus:ring-teal-500'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#1E2528] text-white border-[#2A3B5A] focus:ring-teal-400'
		} else {
			return 'bg-[#2a3b5a] text-white border-[#3a4b6a] focus:ring-teal-500'
		}
	}

	const getConfirmButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-teal-500 text-white hover:bg-teal-600'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-teal-700 text-white hover:bg-teal-600'
		} else {
			return 'bg-teal-500 text-white hover:bg-teal-600'
		}
	}

	return (
		<div>
			<RestartPanel />
			<div className={`p-6 ${getContainerBackground()} rounded-[20px] m-2`}>
				<div className='flex justify-between items-center mb-6'>
					<div className='flex space-x-6'>
						<button
							className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${getTabStyles(
								activeSubTab === 'General'
							)}`}
							onClick={() => setActiveSubTab('General')}
						>
							{t('general')}
						</button>
						<button
							className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${getTabStyles(
								activeSubTab === 'Authentication'
							)}`}
							onClick={() => setActiveSubTab('Authentication')}
						>
							{t('authentication')}
						</button>
						<button
							className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${getTabStyles(
								activeSubTab === 'Telegram Bot'
							)}`}
							onClick={() => setActiveSubTab('Telegram Bot')}
						>
							{t('telegramBot')}
						</button>
						<button
							className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${getTabStyles(
								activeSubTab === 'Subscription'
							)}`}
							onClick={() => setActiveSubTab('Subscription')}
						>
							{t('subscription')}
						</button>
					</div>
				</div>

				{activeSubTab === 'Authentication' && (
					<div className='px-6'>
						<div className='flex items-center justify-center mb-4'>
							<div className='flex-1 h-px bg-gray-700'></div>
							<h3 className={`text-lg mx-4 ${getTextColor()}`}>{t('admin')}</h3>
							<div className='flex-1 h-px bg-gray-700'></div>
						</div>
						<div className='space-y-3 max-w-md ml-4'>
							<div className='flex items-center'>
								<label className={`text-sm ${getTextColor()} w-32`}>
									{t('currentUsername')}
								</label>
								<input
									type='text'
									placeholder={t('currentUsername')}
									value={currentUsername}
									onChange={e => setCurrentUsername(e.target.value)}
									className={`flex-1 py-2 px-4 rounded-full ${getInputStyles()}`}
								/>
							</div>
							<div className='flex items-center'>
								<label className={`text-sm ${getTextColor()} w-32`}>
									{t('currentPassword')}
								</label>
								<div className='relative flex-1'>
									<input
										type={showCurrentPassword ? 'text' : 'password'}
										placeholder={t('currentPassword')}
										value={currentPassword}
										onChange={e => setCurrentPassword(e.target.value)}
										className={`w-full py-2 px-4 rounded-full ${getInputStyles()}`}
									/>
									<button
										onClick={() => toggleShowCurrentPassword()}
										className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 before:content-[""] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-px before:bg-gray-400'
									>
										{showCurrentPassword ? (
											<EyeSlashIcon className='h-5 w-5' />
										) : (
											<EyeIcon className='h-5 w-5' />
										)}
									</button>
								</div>
							</div>
							<div className='flex items-center'>
								<label
									className={`text-sm ${getTextColor()} w-32 pr-2 text-right`}
								>
									{t('newUsername')}
								</label>
								<input
									type='text'
									placeholder={t('newUsername')}
									value={newUsername}
									onChange={e => setNewUsername(e.target.value)}
									className={`flex-1 py-2 px-4 rounded-full ${getInputStyles()}`}
								/>
							</div>
							<div className='flex items-center'>
								<label
									className={`text-sm ${getTextColor()} w-32 pr-2 text-right`}
								>
									{t('newPassword')}
								</label>
								<div className='relative flex-1'>
									<input
										type={showNewPassword ? 'text' : 'password'}
										placeholder={t('newPassword')}
										value={newPassword}
										onChange={e => setNewPassword(e.target.value)}
										className={`w-full py-2 px-4 rounded-full ${getInputStyles()}`}
									/>
									<button
										onClick={() => toggleShowNewPassword()}
										className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 before:content-[""] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-px before:bg-gray-400'
									>
										{showNewPassword ? (
											<EyeSlashIcon className='h-5 w-5' />
										) : (
											<EyeIcon className='h-5 w-5' />
										)}
									</button>
								</div>
							</div>
							{errorMessage && (
								<div className='text-red-500 text-sm mt-2'>
									{t(errorMessage)}
								</div>
							)}
							<div className='relative left-[130px]'>
								<button
									onClick={() => confirmAuth()}
									className={`py-1 px-4 rounded-full transition-colors duration-200 ${getConfirmButtonStyles()}`}
								>
									{t('confirm')}
								</button>
							</div>
						</div>

						<div className='mt-8'>
							<div className='flex items-center justify-center mb-4'>
								<div className='flex-1 h-px bg-gray-700'></div>
								<h3 className={`text-lg mx-4 ${getTextColor()}`}>
									{t('secretToken')}
								</h3>
								<div className='flex-1 h-px bg-gray-700'></div>
							</div>
							<div className='grid md:grid-cols-[850px_1fr] grid-cols-[200px_1fr] gap-y-4 max-w-md ml-4'>
								<div className='flex flex-col gap-1'>
									<p className={`text-sm ${getTextColor()}`}>
										{t('secureLogin')}
									</p>
									<p className='text-xs text-gray-400'>
										{t('secureLoginDescription')}
									</p>
								</div>

								<div className='flex items-center space-x-4'>
									<label className='relative inline-flex items-center cursor-pointer'>
										<input
											type='checkbox'
											checked={isSecureLoginEnabled}
											onChange={() => toggleSecureLogin(!isSecureLoginEnabled)}
											className='sr-only'
										/>
										<div
											className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center justify-${
												isSecureLoginEnabled ? 'end' : 'start'
											} ${
												isSecureLoginEnabled
													? theme === 'light'
														? 'bg-teal-500'
														: 'bg-teal-500'
													: theme === 'light'
													? 'bg-gray-400'
													: 'bg-gray-600'
											}`}
										>
											<span
												className={`w-5 h-5 bg-white rounded-full flex items-center justify-center transition-transform duration-200`}
											></span>
										</div>
									</label>
									{isSecureLoginEnabled && (
										<button
											onClick={() => generateNewToken()}
											className='text-gray-400 hover:text-gray-300'
											title={t('generateNewToken')}
										>
											<ArrowPathIcon className='h-5 w-5' />
										</button>
									)}
								</div>

								{isSecureLoginEnabled && (
									<>
										<div className='flex flex-col gap-1 justify-start'>
											<p className={`text-sm ${getTextColor()} mt-2`}>
												{t('secretToken')}
											</p>
											<p className='text-xs text-gray-400'>
												{t('secretTokenDescription')}
											</p>
										</div>
										<div className='relative'>
											<input
												type='text'
												value={secretToken}
												onChange={e => setSecretToken(e.target.value)}
												className={`w-[500px] py-4 pl-4 pr-10 rounded-[20px] ${
													theme === 'light'
														? 'bg-gray-300 text-gray-800 border-gray-400'
														: isUltra
														? 'bg-[#1E2528] text-white border-[#2A3B5A]'
														: 'bg-teal-900 text-white border-teal-600'
												} focus:outline-none focus:ring-2 focus:ring-teal-600`}
												readOnly
											/>
											<div className='absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-px bg-gray-400'></div>
											<button
												onClick={() =>
													navigator.clipboard.writeText(secretToken)
												}
												className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
											>
												📋
											</button>
										</div>
									</>
								)}

								{errorMessage && (
									<div className='text-red-500 text-sm mt-2'>
										{t(errorMessage)}
									</div>
								)}
								<div className='flex justify-start'>
									<button
										onClick={() => confirmSecureLogin()}
										className={`py-1 px-4 rounded-full transition-colors duration-200 ${getConfirmButtonStyles()}`}
									>
										{t('confirm')}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeSubTab === 'General' && (
					<div>
						<h3 className={`text-lg font-medium ${getTextColor()} mb-4`}>
							{t('general')}
						</h3>
						<p className={getTextColor()}>{t('generalContent')}</p>
					</div>
				)}
				{activeSubTab === 'Telegram Bot' && (
					<div>
						<h3 className={`text-lg font-medium ${getTextColor()} mb-4`}>
							{t('telegramBot')}
						</h3>
						<p className={getTextColor()}>{t('telegramBotContent')}</p>
					</div>
				)}
				{activeSubTab === 'Subscription' && (
					<div>
						<h3 className={`text-lg font-medium ${getTextColor()} mb-4`}>
							{t('subscription')}
						</h3>
						<p className={getTextColor()}>{t('subscriptionContent')}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default PanelSettingsTab
