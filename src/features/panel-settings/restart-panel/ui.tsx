import { $isDataConfirmed, saveData } from '@/features/panel-settings'
import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'
import { $theme, $isUltra } from '@/entities/theme/model'

const RestartPanel = () => {
	const { t } = useTranslation()
	const isDataConfirmed = useStore($isDataConfirmed)
	const theme = useStore($theme)
	const isUltra = useStore($isUltra)

	const handleRestart = () => {
		window.location.reload()
	}

	const handleSave = () => {
		if (isDataConfirmed) {
			saveData()
		}
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

	const getSaveButtonStyles = () => {
		if (isDataConfirmed) {
			if (theme === 'light') {
				return 'bg-gray-500 hover:bg-gray-600 text-white'
			} else if (theme === 'dark' && isUltra) {
				return 'bg-[#3A4B6A] hover:bg-[#4A5B7A] text-white'
			} else {
				return 'bg-gray-500 hover:bg-gray-600 text-white'
			}
		} else {
			if (theme === 'light') {
				return 'bg-gray-400 opacity-50 cursor-not-allowed text-gray-200'
			} else {
				return 'bg-gray-700 opacity-50 cursor-not-allowed text-gray-400'
			}
		}
	}

	const getRestartButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-red-400 hover:bg-red-500 text-white'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#5A1E1E] hover:bg-[#6A2727] text-white'
		} else {
			return 'bg-red-500 hover:bg-red-600 text-white'
		}
	}

	const getWarningStyles = () => {
		if (theme === 'light') {
			return 'bg-[#f0d79e] border-[#c0a34c] text-gray-800'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#3A2F1F] border-[#A0833C] text-teal-400'
		} else {
			return 'bg-[#634f1f] border-[#c0a34c] text-white'
		}
	}

	return (
		<div
			className={`flex items-center p-6 ${getContainerBackground()} rounded-[20px] m-2 mb-3 mt-1 shadow-md`}
		>
			<div className='flex space-x-2'>
				<button
					className={`py-2 px-4 rounded-full text-sm ${getSaveButtonStyles()}`}
					onClick={handleSave}
					disabled={!isDataConfirmed}
				>
					{t('save')}
				</button>
				<button
					className={`py-2 px-4 rounded-full text-sm transition-colors ${getRestartButtonStyles()}`}
					onClick={handleRestart}
				>
					{t('restartPanel')}
				</button>
			</div>
			<div
				className={`ml-auto flex items-center ${getWarningStyles()} rounded-[12px] px-4 py-2`}
			>
				<div className='relative mr-2'>
					<div className='w-4 h-4 bg-[#d4a017] rounded-full flex items-center justify-center'>
						<span className='text-black text-xs font-normal'>!</span>
					</div>
				</div>
				<p className='text-xs'>{t('restartWarning')}</p>
			</div>
		</div>
	)
}

export default RestartPanel
