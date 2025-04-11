import { useStore } from 'effector-react'
import {
	$displayedLogs,
	$ipFilter,
	setIpFilter,
	setLimit,
	fetchLogsFx,
	clearLogsOlderThan30Days,
	clearAllLogs,
} from './model'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import {
	GlobeAltIcon,
	DevicePhoneMobileIcon,
	ChatBubbleBottomCenterIcon,
	ClockIcon,
	ChevronRightIcon,
	EyeIcon,
	EyeSlashIcon,
} from '@heroicons/react/24/outline'
import ConfirmationModal from '../confirm-modal'
import { $theme, $isUltra } from '@/entities/theme/model'

type SectionKey =
	| 'General'
	| 'Log'
	| 'Protection Shield'
	| 'Basic Routing'
	| 'Reset Default'

const LogsTab = () => {
	const { t } = useTranslation()
	const displayedLogs = useStore($displayedLogs)
	const ipFilter = useStore($ipFilter)
	const theme = useStore($theme)
	const isUltra = useStore($isUltra)
	const [activeSubTab, setActiveSubTab] = useState('Basics')
	const [showModal, setShowModal] = useState<'olderThan30Days' | 'all' | null>(
		null
	)
	const [openSection, setOpenSection] = useState<SectionKey | null>(null)

	useEffect(() => {
		fetchLogsFx()
	}, [])

	const toggleSection = (section: SectionKey) => {
		setOpenSection(prev => (prev === section ? null : section))
	}

	const getFlagUrl = (countryCode: string) => {
		return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
	}

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

	const getLoadButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-gray-300 text-gray-800 hover:bg-gray-400'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#1E2528] text-white hover:bg-[#2A3B5A]'
		} else {
			return 'bg-[#2a3b5a] text-white hover:bg-[#3a4b6a]'
		}
	}

	const getClearOlderButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-gray-500 text-white hover:bg-gray-600'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#3A4B6A] text-white hover:bg-[#4A5B7A]'
		} else {
			return 'bg-[#586274] text-white hover:bg-[#686f7e]'
		}
	}

	const getClearAllButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-red-400 text-white hover:bg-red-500'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#5A1E1E] text-white hover:bg-[#6A2727]'
		} else {
			return 'bg-[#771e1e] text-white hover:bg-[#762727]'
		}
	}

	const getLogRowStyles = () => {
		if (theme === 'light') {
			return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#1E2528] text-white hover:bg-[#2A3B5A]'
		} else {
			return 'bg-[#2a3b5a] text-white hover:bg-[#3a4b6a]'
		}
	}

	const getSectionButtonHoverStyles = () => {
		if (theme === 'light') {
			return 'hover:bg-gray-300'
		} else if (theme === 'dark' && isUltra) {
			return 'hover:bg-[#1E2528]'
		} else {
			return 'hover:bg-[#2a3b5a]'
		}
	}

	return (
		<div
			className={`p-6 ${getContainerBackground()} rounded-[20px] m-2 h-[calc(100vh-4rem)] flex flex-col`}
		>
			<div className='flex justify-between items-center mb-6'>
				<div className='flex space-x-6'>
					{[
						'Basics',
						'Routing Rules',
						'Outbounds',
						'Reverse',
						'DNS',
						'Advanced',
					].map(tab => (
						<button
							key={tab}
							className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${getTabStyles(
								activeSubTab === tab
							)}`}
							onClick={() => setActiveSubTab(tab)}
						>
							{t(tab.toLowerCase().replace(' ', ''))}
						</button>
					))}
				</div>
			</div>

			{activeSubTab === 'Basics' && (
				<div className='flex flex-1 overflow-y-auto pr-2 custom-scrollbar'>
					<div className='w-full'>
						<ul className='space-y-1'>
							{(
								[
									'General',
									'Log',
									'Protection Shield',
									'Basic Routing',
									'Reset Default',
								] as SectionKey[]
							).map(section => (
								<li key={section}>
									<div className='relative'>
										<button
											className={`flex items-center w-full p-2 transition-colors text-sm font-light ${getTextColor()} ${getSectionButtonHoverStyles()} ${
												openSection === section
													? `sticky top-0 ${getContainerBackground()} z-10`
													: ''
											}`}
											onClick={() => toggleSection(section)}
										>
											<ChevronRightIcon
												className={`h-4 w-4 mr-2 transition-transform ${
													openSection === section ? 'rotate-90' : 'rotate-0'
												}`}
											/>
											{t(section.toLowerCase().replace(' ', ''))}
										</button>
										{openSection === section && (
											<div className='pt-2'>
												{section === 'Log' && (
													<>
														<div className='flex items-center justify-center mb-4'>
															<div className='flex-1 h-px bg-gray-700'></div>
															<h3 className={`text-lg mx-4 ${getTextColor()}`}>
																{t('log')}
															</h3>
															<div className='flex-1 h-px bg-gray-700'></div>
														</div>

														<div className='grid grid-cols-4 gap-4 mb-4'>
															<div className='flex items-center'>
																<GlobeAltIcon className='h-5 w-5 text-gray-400 mr-2' />
																<span className={`text-sm ${getTextColor()}`}>
																	{t('ip')}
																</span>
															</div>
															<div className='flex items-center'>
																<DevicePhoneMobileIcon className='h-5 w-5 text-gray-400 mr-2' />
																<span className={`text-sm ${getTextColor()}`}>
																	{t('phoneNumber')}
																</span>
															</div>
															<div className='flex items-center'>
																<ChatBubbleBottomCenterIcon className='h-5 w-5 text-gray-400 mr-2' />
																<span className={`text-sm ${getTextColor()}`}>
																	{t('wechat')}
																</span>
															</div>
															<div className='flex items-center'>
																<ClockIcon className='h-5 w-5 text-gray-400 mr-2' />
																<span className={`text-sm ${getTextColor()}`}>
																	{t('date')}
																</span>
															</div>
														</div>

														<div className='space-y-2'>
															{displayedLogs.map(log => {
																const truncatedIp =
																	log.ip_address.length > 15
																		? log.ip_address.slice(0, 15) + '...'
																		: log.ip_address
																return (
																	<div
																		key={log.id}
																		className={`grid grid-cols-4 gap-4 p-3 rounded-[10px] transition-colors ${getLogRowStyles()}`}
																	>
																		<div className='flex items-center'>
																			<img
																				src={getFlagUrl(log.country_code)}
																				alt={`${log.country_code} flag`}
																				className='h-4 w-6 mr-2'
																			/>
																			<span title={log.ip_address}>
																				{truncatedIp}
																			</span>
																			<button
																				onClick={() =>
																					setIpFilter(
																						ipFilter === log.ip_address
																							? null
																							: log.ip_address
																					)
																				}
																				className='ml-2 text-gray-400 hover:text-gray-300'
																			>
																				{ipFilter === log.ip_address ? (
																					<EyeSlashIcon className='h-5 w-5' />
																				) : (
																					<EyeIcon className='h-5 w-5' />
																				)}
																			</button>
																		</div>
																		<span className='select-text'>
																			{log.phone_number}
																		</span>
																		<span className='select-text'>
																			{log.wechat_account}
																		</span>
																		<span className='select-text'>
																			{new Date(log.log_date).toLocaleString(
																				'en-GB',
																				{
																					day: '2-digit',
																					month: '2-digit',
																					year: 'numeric',
																					hour: '2-digit',
																					minute: '2-digit',
																					second: '2-digit',
																					hour12: false,
																				}
																			)}
																		</span>
																	</div>
																)
															})}
														</div>
													</>
												)}
												{section === 'General' && (
													<div className={`ml-4 ${getTextColor()}`}>
														{t('generalContent')}
													</div>
												)}
												{section === 'Protection Shield' && (
													<div className={`ml-4 ${getTextColor()}`}>
														{t('protectionShieldContent')}
													</div>
												)}
												{section === 'Basic Routing' && (
													<div className={`ml-4 ${getTextColor()}`}>
														{t('basicRoutingContent')}
													</div>
												)}
												{section === 'Reset Default' && (
													<div className={`ml-4 ${getTextColor()}`}>
														{t('resetDefaultContent')}
													</div>
												)}
											</div>
										)}
									</div>
								</li>
							))}
						</ul>
						<div className='flex items-center justify-center mt-4 mb-4'>
							<div className='flex-1 h-px bg-gray-700'></div>
							<h3 className={`text-lg mx-4 ${getTextColor()}`}>{t('load')}</h3>
							<div className='flex-1 h-px bg-gray-700'></div>
						</div>
						<div className='flex gap-5 items-center mt-4 flex-col'>
							<div className='flex space-x-2'>
								<button
									onClick={() => setLimit(250)}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getLoadButtonStyles()}`}
								>
									{t('last250')}
								</button>
								<button
									onClick={() => setLimit(500)}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getLoadButtonStyles()}`}
								>
									{t('last500')}
								</button>
								<button
									onClick={() => setLimit(1000)}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getLoadButtonStyles()}`}
								>
									{t('last1000')}
								</button>
								<button
									onClick={() => setLimit(3000)}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getLoadButtonStyles()}`}
								>
									{t('last3000')}
								</button>
								<button
									onClick={() => setLimit('ALL')}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getLoadButtonStyles()}`}
								>
									{t('all')}
								</button>
							</div>
							<div className='flex space-x-2'>
								<button
									onClick={() => setShowModal('olderThan30Days')}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getClearOlderButtonStyles()}`}
								>
									{t('clearLogsOlderThan30Days')}
								</button>
								<button
									onClick={() => setShowModal('all')}
									className={`px-3 py-1 rounded-[10px] transition-colors ${getClearAllButtonStyles()}`}
								>
									{t('clearAllLogs')}
								</button>
							</div>
						</div>

						{showModal === 'olderThan30Days' && (
							<ConfirmationModal
								message={t('confirmClearLogsOlderThan30Days')}
								onConfirm={() => {
									clearLogsOlderThan30Days()
									setShowModal(null)
								}}
								onCancel={() => setShowModal(null)}
							/>
						)}

						{showModal === 'all' && (
							<ConfirmationModal
								message={t('confirmClearAllLogs')}
								onConfirm={() => {
									clearAllLogs()
									setShowModal(null)
								}}
								onCancel={() => setShowModal(null)}
							/>
						)}
					</div>
				</div>
			)}

			{activeSubTab === 'Routing Rules' && (
				<div className={getTextColor()}>{t('routingRulesContent')}</div>
			)}
			{activeSubTab === 'Outbounds' && (
				<div className={getTextColor()}>{t('outboundsContent')}</div>
			)}
			{activeSubTab === 'Reverse' && (
				<div className={getTextColor()}>{t('reverseContent')}</div>
			)}
			{activeSubTab === 'DNS' && (
				<div className={getTextColor()}>{t('dnsContent')}</div>
			)}
			{activeSubTab === 'Advanced' && (
				<div className={getTextColor()}>{t('advancedContent')}</div>
			)}
		</div>
	)
}

export default LogsTab
