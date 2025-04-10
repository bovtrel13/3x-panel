import { useTranslation } from 'react-i18next'

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

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-[#1a2a44] p-6 rounded-[20px] text-white'>
				<p className='mb-4'>{message}</p>
				<div className='flex justify-end space-x-4'>
					<button
						className='py-2 px-4 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors'
						onClick={onCancel}
					>
						{t('close')}
					</button>
					<button
						className='py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors'
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
