import { useStore } from 'effector-react'
import { setTheme, $theme } from './model'

const ThemeTab = () => {
	const theme = useStore($theme)

	return (
		<div>
			<h2 className='text-xl mb-4'>Theme</h2>
			<button
				className={`p-2 mr-2 rounded ${
					theme === 'dark' ? 'bg-teal-accent' : 'bg-dark-input'
				}`}
				onClick={() => setTheme('dark')}
			>
				Dark
			</button>
			<button
				className={`p-2 rounded ${
					theme === 'ultra' ? 'bg-teal-accent' : 'bg-dark-input'
				}`}
				onClick={() => setTheme('ultra')}
			>
				Ultra
			</button>
		</div>
	)
}

export default ThemeTab
