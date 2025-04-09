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
} from './model' // Импортируем напрямую из model.ts
import ConfirmationModal from '@/features/confirm-modal'

const LogsTab = () => {
	const logs = useStore($logs)
	const ipFilter = useStore($ipFilter)
	const limit = useStore($limit)
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
		limit === 'ALL' ? filteredLogs : filteredLogs.slice(0, limit as number)

	return (
		<div>
			<h2 className='text-xl mb-4'>Logs</h2>
			{displayedLogs.map(log => (
				<div
					key={log.id}
					className='flex justify-between p-2 mb-2 rounded bg-dark-input'
				>
					<span>
						🌐 IP: 🇨🇳 {log.ip_address}{' '}
						<span
							className={`cursor-pointer ${
								ipFilter === log.ip_address ? 'line-through' : ''
							}`}
							onClick={() =>
								setIpFilter(ipFilter === log.ip_address ? null : log.ip_address)
							}
						>
							👁️
						</span>
					</span>
					<span>📱 Phone: {log.phone_number}</span>
					<span>🌐 Wechat: {log.wechat_account}</span>
					<span>⏰ Date: {new Date(log.log_date).toLocaleString()}</span>
				</div>
			))}
			<div className='mt-4'>
				Load:{' '}
				<span className='cursor-pointer' onClick={() => setLimit(250)}>
					last 250
				</span>{' '}
				<span className='cursor-pointer' onClick={() => setLimit(500)}>
					last 500
				</span>{' '}
				<span className='cursor-pointer' onClick={() => setLimit(1000)}>
					last 1000
				</span>{' '}
				<span className='cursor-pointer' onClick={() => setLimit(3000)}>
					last 3000
				</span>{' '}
				<span className='cursor-pointer' onClick={() => setLimit('ALL')}>
					ALL ({logs.length})
				</span>
			</div>
			<div className='mt-2'>
				<button
					className='p-2 mr-2 rounded bg-gray-500'
					onClick={() => setShowModal('olderThan30Days')}
				>
					Clear all logs older than 30 days
				</button>
				<button
					className='p-2 rounded bg-red-500'
					onClick={() => setShowModal('all')}
				>
					Clear all logs
				</button>
			</div>

			{showModal && (
				<ConfirmationModal
					message={
						showModal === 'olderThan30Days'
							? 'Are you sure you want to clear all logs older than 30 days?'
							: 'Are you sure you want to clear all logs?'
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
		</div>
	)
}

export default LogsTab
