import { useState } from 'react'
import Sidebar from '@/features/sidebar/ui'
import LogsTab from '@/features/logs/ui'
import {
	PanelSettingsTab,
	$isDataConfirmed,
	saveData,
} from '@/features/panel-settings'
import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'

const RestartPanel = () => {
	const { t } = useTranslation()
	const isDataConfirmed = useStore($isDataConfirmed)

	const handleRestart = () => {
		window.location.reload()
	}

	const handleSave = () => {
		if (isDataConfirmed) {
			saveData()
		}
	}

	return (
		<div className='flex items-center p-6 bg-[#1a2a44] rounded-[20px] m-2 mb-3 mt-1 shadow-md'>
			<div className='flex space-x-2'>
				<button
					className={`py-2 px-4 rounded-full text-white text-sm ${
						isDataConfirmed
							? 'bg-gray-500 hover:bg-gray-600'
							: 'bg-gray-700 opacity-50 cursor-not-allowed'
					}`}
					onClick={handleSave}
					disabled={!isDataConfirmed}
				>
					{t('save')}
				</button>
				<button
					className='py-2 px-4 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition-colors'
					onClick={handleRestart}
				>
					{t('restartPanel')}
				</button>
			</div>
			<div className='ml-auto flex items-center bg-[#634f1f] border border-[#c0a34c] rounded-[12px] px-4 py-2'>
				<div className='relative mr-2'>
					<div className='w-4 h-4 bg-[#d4a017] rounded-full flex items-center justify-center'>
						<span className='text-black text-xs font-normal'>!</span>
					</div>
				</div>
				<p className='text-xs text-white'>{t('restartWarning')}</p>
			</div>
		</div>
	)
}

const PanelPage = () => {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState('Panel Settings')

	return (
		<div className='flex h-screen bg-[#152135] text-white'>
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='flex-1 p-4'>
				<RestartPanel />
				{activeTab === 'Theme' && (
					<div>
						<h2 className='text-xl mb-4'>{t('themeSettings')}</h2>
						<p>{t('themeSettingsContent')}</p>
					</div>
				)}
				{activeTab === 'Overview' && (
					<div>
						<h2 className='text-xl mb-4'>{t('overview')}</h2>
						<p>{t('overviewContent')}</p>
					</div>
				)}
				{activeTab === 'Inbounds' && (
					<div>
						<h2 className='text-xl mb-4'>{t('inbounds')}</h2>
						<p>{t('inboundsContent')}</p>
					</div>
				)}
				{activeTab === 'Logs' && <LogsTab />}
				{activeTab === 'Panel Settings' && <PanelSettingsTab />}
				{activeTab === 'Xray Configs' && (
					<div>
						<h2 className='text-xl mb-4'>{t('xrayConfigs')}</h2>
						<p>{t('xrayConfigsContent')}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default PanelPage
