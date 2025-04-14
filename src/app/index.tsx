import { useStore } from 'effector-react'
import { $isAuthenticated } from '@/services/auth'
import { $theme, $isUltra } from '@/entities/theme/model'
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
	const isUltra = useStore($isUltra)

	const themeClass =
		theme === 'light' ? 'light-theme' : isUltra ? 'ultra-theme' : 'dark-theme'

	return (
		<div className={themeClass}>
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
