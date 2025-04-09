interface ConfirmModalProps {
	message: string
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-dark-panel p-4 rounded-lg text-white'>
				<p className='mb-4'>{message}</p>
				<div className='flex justify-end'>
					<button className='p-2 mr-2 rounded bg-gray-500' onClick={onCancel}>
						Close
					</button>
					<button className='p-2 rounded bg-red-500' onClick={onConfirm}>
						Clear
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
