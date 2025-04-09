import { createStore, createEvent, createEffect } from 'effector'
import { Log } from '@/entities/log'

const mockLogs: Log[] = Array.from({ length: 1000 }, (_, i) => ({
	id: i,
	ip_address: `183.224.218.${i % 255}`,
	country_code: 'CN',
	phone_number: `+86 29035${i % 1000}`,
	wechat_account: `zhengshou${i % 100}`,
	log_date: new Date(2025, 3, 4, 21, 58, 11 - i).toISOString(),
}))

export const setIpFilter = createEvent<string | null>()
export const setLimit = createEvent<number | 'ALL'>()
export const clearLogsOlderThan30Days = createEvent()
export const clearAllLogs = createEvent()

export const fetchLogsFx = createEffect<void, Log[]>(async () => {
	return mockLogs
})

export const $logs = createStore<Log[]>([]).on(
	fetchLogsFx.doneData,
	(_, logs) => logs
)

export const $ipFilter = createStore<string | null>(null).on(
	setIpFilter,
	(_, filter) => filter
)
export const $limit = createStore<number | 'ALL'>(250).on(
	setLimit,
	(_, limit) => limit
)

$logs.on(clearLogsOlderThan30Days, logs => {
	const thirtyDaysAgo = new Date()
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
	return logs.filter(log => new Date(log.log_date) >= thirtyDaysAgo)
})

$logs.on(clearAllLogs, () => [])
