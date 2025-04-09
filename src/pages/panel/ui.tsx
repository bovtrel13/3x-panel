import { useState } from 'react'
import Sidebar from '@/features/auth/ui'
import ThemeTab from '@/features/theme/ui'
import LogsTab from '@/features/logs/ui'

const PanelPage = () => {
	const [activeTab, setActiveTab] = useState('Theme')

	return (
		<div className='flex h-screen bg-dark-bg text-white'>
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='flex-1 p-4'>
				{activeTab === 'Theme' && <ThemeTab />}
				{activeTab === 'Logs' && <LogsTab />}
				{activeTab === 'Panel Settings' && <PanelSettingsTab />}
			</div>
		</div>
	)
}

const PanelSettingsTab = () => {
	return (
		<div>
			<h2 className='text-xl mb-4'>Panel Settings</h2>
			<div>
				<h3 className='text-lg mb-2'>Authentication</h3>
				<input
					type='text'
					placeholder='Current Username'
					className='w-full p-2 mb-2 rounded bg-dark-input text-white'
				/>
				<input
					type='password'
					placeholder='Current Password'
					className='w-full p-2 mb-2 rounded bg-dark-input text-white'
				/>
				<input
					type='text'
					placeholder='New Username'
					className='w-full p-2 mb-2 rounded bg-dark-input text-white'
				/>
				<input
					type='password'
					placeholder='New Password'
					className='w-full p-2 mb-2 rounded bg-dark-input text-white'
				/>
				<button className='p-2 rounded bg-teal-accent'>Confirm</button>
				<h3 className='text-lg mt-4 mb-2'>Secret Token</h3>
				<label className='flex items-center mb-2'>
					<input type='checkbox' className='mr-2' />
					Secure Login
				</label>
				<input
					type='text'
					placeholder='Secret Token'
					className='w-full p-2 mb-2 rounded bg-dark-input text-white'
				/>
				<button className='p-2 rounded bg-teal-accent'>Confirm</button>
			</div>
		</div>
	)
}

export default PanelPage
