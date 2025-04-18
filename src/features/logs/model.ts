import { createDomain, combine, sample } from 'effector'
import { Log } from '@/services/log'

const LogsDomain = createDomain('Logs')

export const setIpFilter = LogsDomain.createEvent<string | null>()
export const setLimit = LogsDomain.createEvent<number | 'ALL'>()
export const clearLogsOlderThan30Days = LogsDomain.createEvent()
export const clearAllLogs = LogsDomain.createEvent()

export const fetchLogsFx = LogsDomain.createEffect<void, Log[], Error>(
	async () => {
		const mockLogs: Log[] = Array.from({ length: 1000 }, (_, i) => ({
			id: i,
			ip_address:
				i % 2 === 0
					? `183.224.218.${i % 255}`
					: `250e:391:9012:7b30:15cb:fea0:c07e:${i % 1000}`,
			country_code: 'CN',
			phone_number: `+86 29035${i % 1000}`,
			wechat_account: `zhengshou${i % 100}`,
			log_date: new Date(2025, 3, 4, 21, 58, 11 - i).toISOString(),
		}))
		return mockLogs
	}
)

export const clearLogsOlderThan30DaysFx = LogsDomain.createEffect<
	void,
	Log[],
	Error
>(async () => {
	const thirtyDaysAgo = new Date()
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
	const mockLogs: Log[] = Array.from({ length: 1000 }, (_, i) => ({
		id: i,
		ip_address:
			i % 2 === 0
				? `183.224.218.${i % 255}`
				: `250e:391:9012:7b30:15cb:fea0:c07e:${i % 1000}`,
		country_code: 'CN',
		phone_number: `+86 29035${i % 1000}`,
		wechat_account: `zhengshou${i % 100}`,
		log_date: new Date(2025, 3, 4, 21, 58, 11 - i).toISOString(),
	}))
	return mockLogs.filter(log => new Date(log.log_date) >= thirtyDaysAgo)
})

export const clearAllLogsFx = LogsDomain.createEffect<void, Log[], Error>(
	async () => {
		return []
	}
)

export const saveIpFilterFx = LogsDomain.createEffect<string | null, void>(
	filter => {
		localStorage.setItem('ipFilter', JSON.stringify(filter))
	}
)

export const saveLimitFx = LogsDomain.createEffect<number | 'ALL', void>(
	limit => {
		localStorage.setItem('limit', JSON.stringify(limit))
	}
)

export const $logs = LogsDomain.createStore<Log[]>([])
	.on(fetchLogsFx.doneData, (_, logs) => logs)
	.on(clearLogsOlderThan30DaysFx.doneData, (_, logs) => logs)
	.on(clearAllLogsFx.doneData, () => [])

export const $ipFilter = LogsDomain.createStore<string | null>(
	JSON.parse(localStorage.getItem('ipFilter') || 'null')
).on(setIpFilter, (_, filter) => filter)

export const $limit = LogsDomain.createStore<number | 'ALL'>(
	JSON.parse(localStorage.getItem('limit') || '250')
).on(setLimit, (_, limit) => limit)

export const $filteredLogs = combine($logs, $ipFilter, (logs, ipFilter) => {
	if (!ipFilter) return logs
	return logs.filter(log => log.ip_address === ipFilter)
})

export const $displayedLogs = combine(
	$filteredLogs,
	$limit,
	(filteredLogs, limit) => {
		if (limit === 'ALL') return filteredLogs
		return filteredLogs.slice(0, limit)
	}
)

sample({
	clock: setIpFilter,
	target: saveIpFilterFx,
})

sample({
	clock: setLimit,
	target: saveLimitFx,
})

sample({
	clock: clearLogsOlderThan30Days,
	target: clearLogsOlderThan30DaysFx,
})

sample({
	clock: clearAllLogs,
	target: clearAllLogsFx,
})
