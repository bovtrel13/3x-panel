import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'
import { $theme, $isUltra } from '@/entities/theme/model'

interface ConfirmationModalProps {
	message: string
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmationModal = ({
	message,
	onConfirm,
	onCancel,
}: ConfirmationModalProps) => {
	const { t } = useTranslation()
	const theme = useStore($theme)
	const isUltra = useStore($isUltra)

	const getModalBackground = () => {
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

	const getCloseButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-gray-500 text-white hover:bg-gray-600'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#3A4B6A] text-white hover:bg-[#4A5B7A]'
		} else {
			return 'bg-gray-500 text-white hover:bg-gray-600'
		}
	}

	const getClearButtonStyles = () => {
		if (theme === 'light') {
			return 'bg-red-400 text-white hover:bg-red-500'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#5A1E1E] text-white hover:bg-[#6A2727]'
		} else {
			return 'bg-red-500 text-white hover:bg-red-600'
		}
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div
				className={`p-6 rounded-[20px] ${getModalBackground()} ${getTextColor()}`}
			>
				<p className='mb-4'>{message}</p>
				<div className='flex justify-end space-x-4'>
					<button
						className={`py-2 px-4 rounded-full transition-colors ${getCloseButtonStyles()}`}
						onClick={onCancel}
					>
						{t('close')}
					</button>
					<button
						className={`py-2 px-4 rounded-full transition-colors ${getClearButtonStyles()}`}
						onClick={onConfirm}
					>
						{t('clear')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationModal
