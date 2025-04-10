import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'
import {
	$currentUsername,
	$currentPassword,
	$newUsername,
	$newPassword,
	$showCurrentPassword,
	$showNewPassword,
	$isSecureLoginEnabled,
	$secretToken,
	setCurrentUsername,
	setCurrentPassword,
	setNewUsername,
	setNewPassword,
	toggleShowCurrentPassword,
	toggleShowNewPassword,
	toggleSecureLogin,
	setSecretToken,
	confirmAuth,
	$activeSubTab,
	setActiveSubTab,
} from './model'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const PanelSettingsTab = () => {
	const { t } = useTranslation()

	const currentUsername = useStore($currentUsername)
	const currentPassword = useStore($currentPassword)
	const newUsername = useStore($newUsername)
	const newPassword = useStore($newPassword)
	const showCurrentPassword = useStore($showCurrentPassword)
	const showNewPassword = useStore($showNewPassword)
	const isSecureLoginEnabled = useStore($isSecureLoginEnabled)
	const secretToken = useStore($secretToken)
	const activeSubTab = useStore($activeSubTab)

	return (
		<div className='p-6 bg-[#1a2a44] rounded-[20px] m-2'>
			{/* Навигация */}
			<div className='flex justify-between items-center mb-6'>
				<div className='flex space-x-6'>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'General'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('General')}
					>
						{t('general')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Authentication'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Authentication')}
					>
						{t('authentication')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Telegram Bot'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Telegram Bot')}
					>
						{t('telegramBot')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Subscription'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Subscription')}
					>
						{t('subscription')}
					</button>
				</div>
			</div>

			{/* Секция Authentication */}
			{activeSubTab === 'Authentication' && (
				<div className='px-6'>
					{/* Admin Section */}
					<div className='flex items-center justify-center mb-4'>
						<div className='flex-1 h-px bg-gray-700'></div>
						<h3 className='text-lg text-gray-300 mx-4'>{t('admin')}</h3>
						<div className='flex-1 h-px bg-gray-700'></div>
					</div>
					<div className='space-y-3 max-w-md ml-4'>
						<div className='flex items-center'>
							<label className='text-sm text-white w-32'>
								{t('currentUsername')}
							</label>
							<input
								type='text'
								placeholder=''
								value={currentUsername}
								onChange={e => setCurrentUsername(e.target.value)}
								className='flex-1 py-2 px-4 rounded-full bg-[#2a3b5a] text-white border border-[#3a4b6a] focus:outline-none focus:ring-2 focus:ring-teal-500'
							/>
						</div>
						<div className='flex items-center'>
							<label className='text-sm text-white w-32'>
								{t('currentPassword')}
							</label>
							<div className='relative flex-1'>
								<input
									type={showCurrentPassword ? 'text' : 'password'}
									placeholder=''
									value={currentPassword}
									onChange={e => setCurrentPassword(e.target.value)}
									className='w-full py-2 px-4 rounded-full bg-[#2a3b5a] text-white border border-[#3a4b6a] focus:outline-none focus:ring-2 focus:ring-teal-500'
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
							<label className='text-sm text-white w-32 pr-2 text-right'>
								{t('newUsername')}
							</label>
							<input
								type='text'
								placeholder=''
								value={newUsername}
								onChange={e => setNewUsername(e.target.value)}
								className='flex-1 py-2 px-4 rounded-full bg-[#2a3b5a] text-white border border-[#3a4b6a] focus:outline-none focus:ring-2 focus:ring-teal-500'
							/>
						</div>
						<div className='flex items-center'>
							<label className='text-sm text-white w-32 pr-2 text-right'>
								{t('newPassword')}
							</label>
							<div className='relative flex-1'>
								<input
									type={showNewPassword ? 'text' : 'password'}
									placeholder=''
									value={newPassword}
									onChange={e => setNewPassword(e.target.value)}
									className='w-full py-2 px-4 rounded-full bg-[#2a3b5a] text-white border border-[#3a4b6a] focus:outline-none focus:ring-2 focus:ring-teal-500'
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
						<div className='relative left-[130px]'>
							<button
								onClick={() => confirmAuth()}
								className='py-1 px-4 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-200'
							>
								{t('confirm')}
							</button>
						</div>
					</div>

					{/* Secret Token Section */}
					<div className='mt-8'>
						<div className='flex items-center justify-center mb-4'>
							<div className='flex-1 h-px bg-gray-700'></div>
							<h3 className='text-lg text-gray-300 mx-4'>{t('secretToken')}</h3>
							<div className='flex-1 h-px bg-gray-700'></div>
						</div>
						<div className='grid md:grid-cols-[850px_1fr] grid-cols-[200px_1fr] gap-y-4 max-w-md ml-4'>
							{/* Secure Login Row */}
							<div className='flex flex-col gap-1'>
								<p className='text-sm text-white'>{t('secureLogin')}</p>
								<p className='text-xs text-gray-400'>
									{t('secureLoginDescription')}
								</p>
							</div>

							<div className='flex'>
								<label className='relative inline-flex items-center cursor-pointer'>
									<input
										type='checkbox'
										checked={isSecureLoginEnabled}
										onChange={() => toggleSecureLogin()}
										className='sr-only'
									/>
									<div
										className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center justify-${
											isSecureLoginEnabled ? 'end' : 'start'
										} ${isSecureLoginEnabled ? 'bg-teal-500' : 'bg-gray-600'}`}
									>
										<span
											className={`w-5 h-5 bg-white rounded-full flex items-center justify-center transition-transform duration-200`}
										></span>
									</div>
								</label>
							</div>

							{/* Secret Token Row (visible only if enabled) */}
							{isSecureLoginEnabled && (
								<>
									<div className='flex flex-col gap-1 justify-start'>
										<p className='text-sm text-white mt-2'>
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
											className='w-[500px] py-4 pl-4 pr-10 rounded-[20px] bg-teal-900 text-white border border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600'
											readOnly
										/>
										<div className='absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-px bg-gray-400'></div>
										<button
											onClick={() => navigator.clipboard.writeText(secretToken)}
											className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
										>
											📋
										</button>
									</div>
								</>
							)}

							{/* Confirm Button Row */}
							<div className='flex justify-start'>
								<button
									onClick={() => confirmAuth()}
									className='py-1 px-4 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-200'
								>
									{t('confirm')}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Заглушки для остальных вкладок */}
			{activeSubTab === 'General' && (
				<div>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('general')}
					</h3>
					<p className='text-gray-400'>{t('generalContent')}</p>
				</div>
			)}
			{activeSubTab === 'Telegram Bot' && (
				<div>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('telegramBot')}
					</h3>
					<p className='text-gray-400'>{t('telegramBotContent')}</p>
				</div>
			)}
			{activeSubTab === 'Subscription' && (
				<div>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('subscription')}
					</h3>
					<p className='text-gray-400'>{t('subscriptionContent')}</p>
				</div>
			)}
		</div>
	)
}

export default PanelSettingsTab
