import { useState } from 'react'
import Sidebar from '@/features/sidebar/ui'
import LogsTab from '@/features/logs/ui'

const PanelPage = () => {
	const [activeTab, setActiveTab] = useState('Panel Settings')

	return (
		<div className='flex h-screen bg-dark-bg text-white'>
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='flex-1 p-4'>
				{activeTab === 'Theme' && (
					<div>
						<h2 className='text-xl mb-4'>Theme Settings</h2>
						<p>Theme settings will be here.</p>
					</div>
				)}
				{activeTab === 'Overview' && (
					<div>
						<h2 className='text-xl mb-4'>Overview</h2>
						<p>Overview content will be here.</p>
					</div>
				)}
				{activeTab === 'Inbounds' && (
					<div>
						<h2 className='text-xl mb-4'>Inbounds</h2>
						<p>Inbounds content will be here.</p>
					</div>
				)}
				{activeTab === 'Logs' && <LogsTab />}
				{activeTab === 'Panel Settings' && <PanelSettingsTab />}
				{activeTab === 'Xray Configs' && (
					<div>
						<h2 className='text-xl mb-4'>Xray Configs</h2>
						<p>Xray Configs content will be here.</p>
					</div>
				)}
				{activeTab === 'Log Out' && (
					<div>
						<h2 className='text-xl mb-4'>Log Out</h2>
						<p>You have been logged out.</p>
					</div>
				)}
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
