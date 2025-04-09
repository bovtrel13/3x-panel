import { logout } from './model' // Импортируем напрямую из model.ts

interface SidebarProps {
	activeTab: string
	setActiveTab: (tab: string) => void
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
	return (
		<div className='w-48 bg-dark-panel p-4 text-white'>
			<button
				className={`w-full p-2 mb-2 text-left rounded ${
					activeTab === 'Theme' ? 'bg-teal-accent' : ''
				}`}
				onClick={() => setActiveTab('Theme')}
			>
				Theme
			</button>
			<button
				className={`w-full p-2 mb-2 text-left rounded ${
					activeTab === 'Logs' ? 'bg-teal-accent' : ''
				}`}
				onClick={() => setActiveTab('Logs')}
			>
				Logs
			</button>
			<button
				className={`w-full p-2 mb-2 text-left rounded ${
					activeTab === 'Panel Settings' ? 'bg-teal-accent' : ''
				}`}
				onClick={() => setActiveTab('Panel Settings')}
			>
				Panel Settings
			</button>
			<button
				className='w-full p-2 text-left rounded'
				onClick={() => {
					logout()
					window.location.href = '/'
				}}
			>
				Log Out
			</button>
		</div>
	)
}

export default Sidebar
