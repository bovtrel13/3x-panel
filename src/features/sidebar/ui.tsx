import { logout } from '@/entities/auth'
import {
	SunIcon,
	DocumentTextIcon,
	CogIcon,
	ArrowRightOnRectangleIcon,
	ChartBarIcon,
	InboxIcon,
	CodeBracketIcon,
	ChevronDownIcon,
	LightBulbIcon,
	CheckIcon,
	ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'
import { useState } from 'react'
import { setTheme, $theme, $isUltra, setIsUltra } from '@/entities/theme/model'

interface SidebarProps {
	activeTab: string
	setActiveTab: (tab: string) => void
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
	const { t } = useTranslation()
	const theme = useStore($theme)
	const isUltra = useStore($isUltra)
	const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)

	const toggleTheme = (newTheme: string) => {
		setTheme(newTheme)
	}

	const toggleUltra = () => {
		if (theme === 'dark') {
			setIsUltra(!isUltra)
		}
	}

	const getSidebarBackground = () => {
		if (theme === 'light') {
			return 'bg-gray-100'
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
			return 'text-gray-300'
		}
	}

	const getThemeButtonHoverStyles = () => {
		if (theme === 'light') {
			return 'hover:bg-gray-300'
		} else if (theme === 'dark' && isUltra) {
			return 'hover:bg-[#1E2528]'
		} else {
			return 'hover:bg-[#2A3B5A]'
		}
	}

	const getButtonStyles = (isActive: boolean) => {
		if (isActive) {
			if (theme === 'light') {
				return 'bg-teal-500 text-white'
			} else if (theme === 'dark' && isUltra) {
				return 'bg-teal-700 text-white'
			} else {
				return 'bg-teal-600 text-white'
			}
		} else {
			if (theme === 'light') {
				return 'hover:bg-gray-300 text-gray-600'
			} else {
				return 'hover:bg-gray-700 text-gray-300'
			}
		}
	}

	return (
		<div
			className={`w-48 ${getSidebarBackground()} p-4 h-screen flex flex-col`}
		>
			<div className='mb-2'>
				<div
					className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${getThemeButtonHoverStyles()} ${getTextColor()}`}
					onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
				>
					<LightBulbIcon className={`h-5 w-5 ${getTextColor()}`} />
					<span className='text-sm font-normal'>{t('theme')}</span>
					<ChevronDownIcon
						className={`h-3 w-3 ml-auto transition-transform duration-300 ${
							isThemeDropdownOpen ? 'rotate-180' : 'rotate-0'
						} ${getTextColor()}`}
					/>
				</div>
				<div
					className={`mt-1 rounded-lg overflow-hidden transition-all duration-300 ${
						isThemeDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<div className='flex items-center justify-center pr-10 gap-2 p-2'>
						<SunIcon
							className={`h-5 w-5 ${
								theme === 'light' ? 'text-yellow-400' : 'text-gray-400'
							}`}
						/>
						<div
							className='relative w-7 h-3.5 rounded-full cursor-pointer'
							style={{
								background:
									theme === 'light'
										? 'linear-gradient(to right, #d1d5db 0%, #a3a3a3 100%)'
										: 'linear-gradient(to right, #4b5563 0%, #00c4b4 100%)',
							}}
							onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
						>
							<div
								className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full transition-all duration-300 shadow-md ${
									theme === 'light' ? 'left-0.5' : 'left-3.5'
								}`}
							/>
						</div>
					</div>
					{theme === 'dark' && (
						<div className='flex items-center justify-center pr-10 space-x-2 p-2'>
							<span
								className={`text-sm ${
									isUltra ? 'text-teal-500' : 'text-gray-400'
								}`}
							>
								{t('ultra')}
							</span>
							<div
								className={`relative w-4 h-4 rounded-md cursor-pointer border-2 transition-all duration-200 ${
									isUltra
										? 'bg-teal-500 border-teal-500 shadow-lg'
										: 'bg-gray-700 border-gray-500 hover:border-teal-600'
								}`}
								onClick={toggleUltra}
							>
								{isUltra && (
									<CheckIcon className='h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			<button
				className={`w-full p-3 mb-2 text-left rounded-lg flex items-center space-x-3 transition-colors duration-200 ${getButtonStyles(
					activeTab === 'Logs'
				)}`}
				onClick={() => setActiveTab('Logs')}
			>
				<ChartBarIcon className='h-5 w-5' />
				<span className='text-sm font-normal'>{t('logs')}</span>
			</button>

			<button
				className={`w-full p-3 mb-2 text-left rounded-lg flex items-center space-x-3 transition-colors duration-200 ${getButtonStyles(
					activeTab === 'Overview'
				)}`}
				onClick={() => setActiveTab('Overview')}
			>
				<ChatBubbleBottomCenterIcon className='h-5 w-5' />
				<span className='text-sm font-normal'>{t('overview')}</span>
			</button>

			<button
				className={`w-full p-3 mb-2 text-left rounded-lg flex items-center space-x-3 transition-colors duration-200 ${getButtonStyles(
					activeTab === 'Inbounds'
				)}`}
				onClick={() => setActiveTab('Inbounds')}
			>
				<InboxIcon className='h-5 w-5' />
				<span className='text-sm font-normal'>{t('inbounds')}</span>
			</button>

			<button
				className={`w-full p-3 mb-2 text-left rounded-lg flex items-center space-x-3 transition-colors duration-200 ${getButtonStyles(
					activeTab === 'Panel Settings'
				)}`}
				onClick={() => setActiveTab('Panel Settings')}
			>
				<CogIcon className='h-5 w-5' />
				<span className='text-sm font-normal'>{t('panelSettings')}</span>
			</button>

			<button
				className={`w-full p-3 mb-2 text-left rounded-lg flex items-center space-x-3 transition-colors duration-200 ${getButtonStyles(
					activeTab === 'Xray Configs'
				)}`}
				onClick={() => setActiveTab('Xray Configs')}
			>
				<CodeBracketIcon className='h-5 w-5' />
				<span className='text-sm font-normal'>{t('xrayConfigs')}</span>
			</button>

			<button
				className={`w-full p-3 mb-2 text-left rounded-lg flex items-center space-x-3 transition-colors duration-200 ${getButtonStyles(
					activeTab === 'Log Out'
				)}`}
				onClick={() => {
					logout()
					window.location.href = '/'
				}}
			>
				<ArrowRightOnRectangleIcon className='h-5 w-5' />
				<span className='text-sm font-normal'>{t('logOut')}</span>
			</button>
		</div>
	)
}

export default Sidebar
