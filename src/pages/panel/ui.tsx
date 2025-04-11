import { useState } from 'react'
import Sidebar from '@/features/sidebar/ui'
import LogsTab from '@/features/logs/ui'
import { PanelSettingsTab } from '@/features/panel-settings'
import { useTranslation } from 'react-i18next'
import { useStore } from 'effector-react'
import { $theme, $isUltra } from '@/entities/theme/model'

const PanelPage = () => {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState('Panel Settings')
	const theme = useStore($theme)
	const isUltra = useStore($isUltra)

	const getPageBackground = () => {
		if (theme === 'light') {
			return 'bg-gray-300'
		} else if (theme === 'dark' && isUltra) {
			return 'bg-[#0A1A1D]'
		} else {
			return 'bg-[#152135]'
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

	return (
		<div className={`flex h-screen ${getPageBackground()} ${getTextColor()}`}>
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className='flex-1 p-4'>
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
