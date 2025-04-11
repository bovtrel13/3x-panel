import { useStore } from 'effector-react'
import { $isAuthenticated } from '@/services/auth'
import { $theme } from '@/entities/theme/model'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import LoginPage from '@/pages/login'
import PanelPage from '@/pages/panel'
import '../i18n'

const App = () => {
	const isAuthenticated = useStore($isAuthenticated)
	const theme = useStore($theme)

	return (
		<div className={theme === 'ultra' ? 'ultra-theme' : 'dark-theme'}>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							isAuthenticated ? <Navigate to='/panel-page' /> : <LoginPage />
						}
					/>
					<Route
						path='/panel-page'
						element={isAuthenticated ? <PanelPage /> : <Navigate to='/' />}
					/>
				</Routes>
			</Router>
		</div>
	)
}

export default App
