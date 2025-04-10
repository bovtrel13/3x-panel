import { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import {
	$logs,
	$ipFilter,
	$limit,
	setIpFilter,
	setLimit,
	fetchLogsFx,
	clearLogsOlderThan30Days,
	clearAllLogs,
} from './model'
import ConfirmationModal from '@/features/confirm-modal'
import {
	GlobeAltIcon,
	DevicePhoneMobileIcon,
	ChatBubbleBottomCenterIcon,
	ClockIcon,
	EyeIcon,
	EyeSlashIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

const LogsTab = () => {
	const { t } = useTranslation()
	const logs = useStore($logs)
	const ipFilter = useStore($ipFilter)
	const limit = useStore($limit)
	const [activeSubTab, setActiveSubTab] = useState('Basics')
	const [activeSideTab, setActiveSideTab] = useState('Log')
	const [showModal, setShowModal] = useState<'olderThan30Days' | 'all' | null>(
		null
	)

	useEffect(() => {
		fetchLogsFx()
	}, [])

	const filteredLogs = ipFilter
		? logs.filter(log => log.ip_address === ipFilter)
		: logs

	const displayedLogs =
		limit === 'ALL' ? filteredLogs : filteredLogs.slice(0, limit)

	const getFlagUrl = (countryCode: string) => {
		return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
	}

	return (
		<div className='p-6 bg-[#1a2a44] rounded-[20px] m-2 h-[calc(90vh-4rem)] flex flex-col'>
			<div className='flex justify-between items-center mb-6'>
				<div className='flex space-x-6'>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Basics'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Basics')}
					>
						{t('basics')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Routing Rules'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Routing Rules')}
					>
						{t('routingRules')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Outbounds'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Outbounds')}
					>
						{t('outbounds')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Reverse'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Reverse')}
					>
						{t('reverse')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'DNS'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('DNS')}
					>
						{t('dns')}
					</button>
					<button
						className={`text-sm pb-2 border-b-2 transition-colors duration-200 ${
							activeSubTab === 'Advanced'
								? 'border-teal-500 text-teal-500'
								: 'border-transparent text-gray-400 hover:text-gray-300'
						}`}
						onClick={() => setActiveSubTab('Advanced')}
					>
						{t('advanced')}
					</button>
				</div>
			</div>

			{activeSubTab === 'Basics' && (
				<div className='flex flex-1 overflow-hidden'>
					<div className='w-64 pr-4'>
						<ul className='space-y-2'>
							<li>
								<button
									className={`flex items-center w-full p-2 rounded-[10px] transition-colors ${
										activeSideTab === 'General'
											? 'bg-teal-500 text-white'
											: 'text-gray-400 hover:bg-[#2a3b5a]'
									}`}
									onClick={() => setActiveSideTab('General')}
								>
									<ChevronRightIcon
										className={`h-5 w-5 mr-2 transition-transform ${
											activeSideTab === 'General' ? 'rotate-90' : 'rotate-0'
										}`}
									/>
									{t('general')}
								</button>
							</li>
							<li>
								<button
									className={`flex items-center w-full p-2 rounded-[10px] transition-colors ${
										activeSideTab === 'Log'
											? 'bg-teal-500 text-white'
											: 'text-gray-400 hover:bg-[#2a3b5a]'
									}`}
									onClick={() => setActiveSideTab('Log')}
								>
									<ChevronRightIcon
										className={`h-5 w-5 mr-2 transition-transform ${
											activeSideTab === 'Log' ? 'rotate-90' : 'rotate-0'
										}`}
									/>
									{t('log')}
								</button>
							</li>
							<li>
								<button
									className={`flex items-center w-full p-2 rounded-[10px] transition-colors ${
										activeSideTab === 'Protection Shield'
											? 'bg-teal-500 text-white'
											: 'text-gray-400 hover:bg-[#2a3b5a]'
									}`}
									onClick={() => setActiveSideTab('Protection Shield')}
								>
									<ChevronRightIcon
										className={`h-5 w-5 mr-2 transition-transform ${
											activeSideTab === 'Protection Shield'
												? 'rotate-90'
												: 'rotate-0'
										}`}
									/>
									{t('protectionShield')}
								</button>
							</li>
							<li>
								<button
									className={`flex items-center w-full p-2 rounded-[10px] transition-colors ${
										activeSideTab === 'Basic Routing'
											? 'bg-teal-500 text-white'
											: 'text-gray-400 hover:bg-[#2a3b5a]'
									}`}
									onClick={() => setActiveSideTab('Basic Routing')}
								>
									<ChevronRightIcon
										className={`h-5 w-5 mr-2 transition-transform ${
											activeSideTab === 'Basic Routing'
												? 'rotate-90'
												: 'rotate-0'
										}`}
									/>
									{t('basicRouting')}
								</button>
							</li>
							<li>
								<button
									className={`flex items-center w-full p-2 rounded-[10px] transition-colors ${
										activeSideTab === 'Reset to Default'
											? 'bg-teal-500 text-white'
											: 'text-gray-400 hover:bg-[#2a3b5a]'
									}`}
									onClick={() => setActiveSideTab('Reset to Default')}
								>
									<ChevronRightIcon
										className={`h-5 w-5 mr-2 transition-transform ${
											activeSideTab === 'Reset to Default'
												? 'rotate-90'
												: 'rotate-0'
										}`}
									/>
									{t('resetToDefault')}
								</button>
							</li>
						</ul>
					</div>

					<div className='flex-1 overflow-y-auto px-6'>
						{activeSideTab === 'Log' && (
							<>
								<div className='flex items-center justify-center mb-4'>
									<div className='flex-1 h-px bg-gray-700'></div>
									<h3 className='text-lg text-gray-300 mx-4'>{t('log')}</h3>
									<div className='flex-1 h-px bg-gray-700'></div>
								</div>

								<div className='grid grid-cols-4 gap-4 mb-4'>
									<div className='flex items-center'>
										<GlobeAltIcon className='h-5 w-5 text-gray-400 mr-2' />
										<span className='text-sm text-white'>{t('ip')}</span>
									</div>
									<div className='flex items-center'>
										<DevicePhoneMobileIcon className='h-5 w-5 text-gray-400 mr-2' />
										<span className='text-sm text-white'>
											{t('phoneNumber')}
										</span>
									</div>
									<div className='flex items-center'>
										<ChatBubbleBottomCenterIcon className='h-5 w-5 text-gray-400 mr-2' />
										<span className='text-sm text-white'>{t('wechat')}</span>
									</div>
									<div className='flex items-center'>
										<ClockIcon className='h-5 w-5 text-gray-400 mr-2' />
										<span className='text-sm text-white'>{t('date')}</span>
									</div>
								</div>

								<div className='space-y-2'>
									{displayedLogs.map(log => (
										<div
											key={log.id}
											className='grid grid-cols-4 gap-4 p-3 rounded-[10px] bg-[#2a3b5a] text-white hover:bg-[#3a4b6a] transition-colors'
										>
											<div className='flex items-center w-10'>
												<img
													src={getFlagUrl(log.country_code)}
													alt={`${log.country_code} flag`}
													className='h-4 w-6 mr-2'
												/>
												<span className=''>{log.ip_address}</span>
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
											<span className='select-text'>{log.phone_number}</span>
											<span className='select-text'>{log.wechat_account}</span>
											<span className='select-text'>
												{new Date(log.log_date).toLocaleString('en-GB', {
													day: '2-digit',
													month: '2-digit',
													year: 'numeric',
													hour: '2-digit',
													minute: '2-digit',
													second: '2-digit',
													hour12: false,
												})}
											</span>
										</div>
									))}
								</div>

								<div className='mt-6'>
									<div className='flex items-center justify-center mb-4'>
										<div className='flex-1 h-px bg-gray-700'></div>
										<h3 className='text-lg text-gray-300 mx-4'>{t('load')}</h3>
										<div className='flex-1 h-px bg-gray-700'></div>
									</div>
									<div className='flex justify-center space-x-4'>
										<span
											className={`cursor-pointer text-gray-400 hover:text-teal-500 ${
												limit === 250 ? 'text-teal-500' : ''
											}`}
											onClick={() => setLimit(250)}
										>
											{t('last250')}
										</span>
										<span
											className={`cursor-pointer text-gray-400 hover:text-teal-500 ${
												limit === 500 ? 'text-teal-500' : ''
											}`}
											onClick={() => setLimit(500)}
										>
											{t('last500')}
										</span>
										<span
											className={`cursor-pointer text-gray-400 hover:text-teal-500 ${
												limit === 1000 ? 'text-teal-500' : ''
											}`}
											onClick={() => setLimit(1000)}
										>
											{t('last1000')}
										</span>
										<span
											className={`cursor-pointer text-gray-400 hover:text-teal-500 ${
												limit === 3000 ? 'text-teal-500' : ''
											}`}
											onClick={() => setLimit(3000)}
										>
											{t('last3000')}
										</span>
										<span
											className={`cursor-pointer text-gray-400 hover:text-teal-500 ${
												limit === 'ALL' ? 'text-teal-500' : ''
											}`}
											onClick={() => setLimit('ALL')}
										>
											{t('all')} ({logs.length})
										</span>
									</div>
								</div>

								<div className='mt-4 flex justify-center space-x-4'>
									<button
										className='py-2 px-4 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors'
										onClick={() => setShowModal('olderThan30Days')}
									>
										{t('clearLogsOlderThan30Days')}
									</button>
									<button
										className='py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors'
										onClick={() => setShowModal('all')}
									>
										{t('clearAllLogs')}
									</button>
								</div>

								{showModal && (
									<ConfirmationModal
										message={
											showModal === 'olderThan30Days'
												? t('confirmClearLogsOlderThan30Days')
												: t('confirmClearAllLogs')
										}
										onConfirm={() => {
											if (showModal === 'olderThan30Days') {
												clearLogsOlderThan30Days()
											} else {
												clearAllLogs()
											}
											setShowModal(null)
										}}
										onCancel={() => setShowModal(null)}
									/>
								)}
							</>
						)}

						{activeSideTab === 'General' && (
							<div>
								<h3 className='text-lg font-medium text-white mb-4'>
									{t('general')}
								</h3>
								<p className='text-gray-400'>{t('generalContent')}</p>
							</div>
						)}
						{activeSideTab === 'Protection Shield' && (
							<div>
								<h3 className='text-lg font-medium text-white mb-4'>
									{t('protectionShield')}
								</h3>
								<p className='text-gray-400'>{t('protectionShieldContent')}</p>
							</div>
						)}
						{activeSideTab === 'Basic Routing' && (
							<div>
								<h3 className='text-lg font-medium text-white mb-4'>
									{t('basicRouting')}
								</h3>
								<p className='text-gray-400'>{t('basicRoutingContent')}</p>
							</div>
						)}
						{activeSideTab === 'Reset to Default' && (
							<div>
								<h3 className='text-lg font-medium text-white mb-4'>
									{t('resetToDefault')}
								</h3>
								<p className='text-gray-400'>{t('resetToDefaultContent')}</p>
							</div>
						)}
					</div>
				</div>
			)}

			{activeSubTab === 'Routing Rules' && (
				<div className='flex-1 overflow-y-auto px-6'>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('routingRules')}
					</h3>
					<p className='text-gray-400'>{t('routingRulesContent')}</p>
				</div>
			)}
			{activeSubTab === 'Outbounds' && (
				<div className='flex-1 overflow-y-auto px-6'>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('outbounds')}
					</h3>
					<p className='text-gray-400'>{t('outboundsContent')}</p>
				</div>
			)}
			{activeSubTab === 'Reverse' && (
				<div className='flex-1 overflow-y-auto px-6'>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('reverse')}
					</h3>
					<p className='text-gray-400'>{t('reverseContent')}</p>
				</div>
			)}
			{activeSubTab === 'DNS' && (
				<div className='flex-1 overflow-y-auto px-6'>
					<h3 className='text-lg font-medium text-white mb-4'>{t('dns')}</h3>
					<p className='text-gray-400'>{t('dnsContent')}</p>
				</div>
			)}
			{activeSubTab === 'Advanced' && (
				<div className='flex-1 overflow-y-auto px-6'>
					<h3 className='text-lg font-medium text-white mb-4'>
						{t('advanced')}
					</h3>
					<p className='text-gray-400'>{t('advancedContent')}</p>
				</div>
			)}
		</div>
	)
}

export default LogsTab
