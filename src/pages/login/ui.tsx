import { useState, useEffect } from 'react'
import { login } from '@/features/sidebar'
import { useStore } from 'effector-react'
import { setTheme, $theme } from '@/features/theme'
import {
	EyeIcon,
	EyeSlashIcon,
	UserIcon,
	LockClosedIcon,
	KeyIcon,
	ChevronDownIcon,
	SunIcon,
	CheckIcon,
} from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

const shakeAnimation = `
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`

const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [secretToken, setSecretToken] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showSecretToken, setShowSecretToken] = useState(false)
	const [selectedLanguage, setSelectedLanguage] = useState('English')
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
	const theme = useStore($theme)
	const [isUltra, setIsUltra] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)

	const { t, i18n } = useTranslation()

	useEffect(() => {
		const savedLanguage = localStorage.getItem('selectedLanguage')
		if (savedLanguage) {
			i18n.changeLanguage(savedLanguage)
			const languageName =
				languages.find(lang => getLanguageCode(lang) === savedLanguage) ||
				'English'
			setSelectedLanguage(languageName)
		}
	}, [i18n])

	const handleLogin = () => {
		if (!username || !password) {
			if (!username) setUsernameError(true)
			if (!password) setPasswordError(true)
			setTimeout(() => {
				setUsernameError(false)
				setPasswordError(false)
			}, 2000)
			console.log('Username and password are required')
			return
		}
		console.log('Logging in...')
		login()
	}

	const getFlagUrl = (language: string) => {
		switch (language) {
			case 'English':
				return 'https://flagcdn.com/w20/us.png'
			case 'Russian':
				return 'https://flagcdn.com/w20/ru.png'
			case 'Chinese':
				return 'https://flagcdn.com/w20/cn.png'
			default:
				return 'https://flagcdn.com/w20/us.png'
		}
	}

	const getLanguageCode = (language: string) => {
		switch (language) {
			case 'English':
				return 'en'
			case 'Russian':
				return 'ru'
			case 'Chinese':
				return 'zh'
			default:
				return 'en'
		}
	}

	const languages = ['English', 'Russian', 'Chinese']

	const handleLanguageSelect = (language: string) => {
		setSelectedLanguage(language)
		const langCode = getLanguageCode(language)
		i18n.changeLanguage(langCode)
		localStorage.setItem('selectedLanguage', langCode)
		setIsLanguageDropdownOpen(false)
	}

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
	}

	const toggleUltra = () => {
		setIsUltra(!isUltra)
	}

	const getFormBackground = () => {
		if (theme === 'light') {
			return isUltra ? 'bg-gray-300' : 'bg-white'
		} else {
			return isUltra ? 'bg-[#1a2742]' : 'bg-[#1d2c4a]'
		}
	}

	const getTextColor = () => {
		return theme === 'light' ? 'text-black' : 'text-white'
	}

	const getUltraTextColor = () => {
		if (theme === 'light') {
			return isUltra ? 'text-teal-600' : 'text-gray-800'
		} else {
			return isUltra ? 'text-teal-accent' : 'text-white'
		}
	}

	return (
		<div
			className={`flex items-center justify-center h-screen ${
				theme === 'light' ? 'bg-gray-100' : 'bg-dark-bg'
			}`}
			style={{
				backgroundImage:
					theme === 'light'
						? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23e5e7eb' fill-opacity='1' d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23e5e7eb' fill-opacity='0.8' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,112C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`
						: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%231a2a44' fill-opacity='1' d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%231a2a44' fill-opacity='0.8' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,112C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
				backgroundColor: theme === 'light' ? '#f3f4f6' : '#0f1c2e',
				backgroundSize: 'cover',
				backgroundPosition: 'bottom',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<style>{shakeAnimation}</style>
			<div
				className={`px-10 pb-6 rounded-3xl w-1/3 ${getFormBackground()} ${getTextColor()}`}
			>
				<h2 className='text-3xl font-bold text-center mb-4 pb-6 pt-8 tracking-wide'>
					{t('hello')}
				</h2>
				<div className='mb-4 relative'>
					<input
						type='text'
						placeholder={t('username')}
						value={username}
						onChange={e => setUsername(e.target.value)}
						className={`w-full rounded-full placeholder:text-sm pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-teal-accent ${
							theme === 'light'
								? 'bg-gray-200 text-black'
								: 'bg-dark-input text-white'
						} ${usernameError ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
					/>
					<UserIcon
						className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
							theme === 'light' ? 'text-gray-600' : 'text-gray-400'
						}`}
					/>
				</div>
				<div className='mb-4 relative'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder={t('password')}
						value={password}
						onChange={e => setPassword(e.target.value)}
						className={`w-full rounded-full pl-12 pr-12 py-4 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-teal-accent ${
							theme === 'light'
								? 'bg-gray-200 text-black'
								: 'bg-dark-input text-white'
						} ${passwordError ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
					/>
					<LockClosedIcon
						className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
							theme === 'light' ? 'text-gray-600' : 'text-gray-400'
						}`}
					/>
					<button
						onClick={() => setShowPassword(!showPassword)}
						className={`absolute right-4 top-1/2 transform -translate-y-1/2 before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-px ${
							theme === 'light'
								? 'text-gray-600 before:bg-gray-400'
								: 'text-gray-400 before:bg-gray-divider'
						}`}
					>
						{showPassword ? (
							<EyeSlashIcon className='h-5 w-5' />
						) : (
							<EyeIcon className='h-5 w-5' />
						)}
					</button>
				</div>
				<div className='mb-4 relative'>
					<input
						type={showSecretToken ? 'text' : 'password'}
						placeholder={t('secretToken')}
						value={secretToken}
						onChange={e => setSecretToken(e.target.value)}
						className={`w-full rounded-full pl-12 pr-12 py-4 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-teal-accent ${
							theme === 'light'
								? 'bg-gray-200 text-black'
								: 'bg-dark-input text-white'
						}`}
					/>
					<KeyIcon
						className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
							theme === 'light' ? 'text-gray-600' : 'text-gray-400'
						}`}
					/>
					<button
						onClick={() => setShowSecretToken(!showSecretToken)}
						className={`absolute right-4 top-1/2 transform -translate-y-1/2 before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-px ${
							theme === 'light'
								? 'text-gray-600 before:bg-gray-400'
								: 'text-gray-400 before:bg-gray-divider'
						}`}
					>
						{showSecretToken ? (
							<EyeSlashIcon className='h-5 w-5' />
						) : (
							<EyeIcon className='h-5 w-5' />
						)}
					</button>
				</div>
				<button
					onClick={handleLogin}
					className={`w-full p-2 rounded-full min-h-12 transition-colors border-2 ${
						theme === 'light'
							? 'bg-teal-600 text-white hover:bg-teal-500 border-teal-700'
							: 'bg-teal-800 text-white hover:bg-teal-700 border-teal-900'
					}`}
				>
					{t('logIn')}
				</button>
				<div className='mt-4 flex flex-col gap-6 items-center'>
					<div className='relative w-60'>
						<div
							className={`py-2 pl-10 pr-8 rounded-full flex items-center justify-between cursor-pointer ${
								theme === 'light'
									? 'bg-gray-300 text-black'
									: 'bg-dark-input text-white'
							}`}
							onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
						>
							<div className='flex items-center'>
								<img
									src={getFlagUrl(selectedLanguage)}
									alt='Flag'
									className='h-4 w-6 mr-2'
								/>
								<span>{selectedLanguage}</span>
							</div>
							<ChevronDownIcon
								className={`h-5 w-5 transition-transform duration-300 ${
									isLanguageDropdownOpen ? 'rotate-180' : 'rotate-0'
								} ${theme === 'light' ? 'text-gray-600' : 'text-white'}`}
							/>
						</div>
						<div
							className={`absolute top-full left-0 w-full mt-1 z-10 rounded-2xl overflow-hidden transition-all duration-300 ${
								theme === 'light' ? 'bg-gray-300' : 'bg-dark-input'
							} ${
								isLanguageDropdownOpen
									? 'max-h-40 opacity-100'
									: 'max-h-0 opacity-0'
							}`}
						>
							{languages.map(language => (
								<div
									key={language}
									className={`py-2 px-4 flex items-center cursor-pointer rounded-2xl ${
										theme === 'light'
											? 'hover:bg-gray-400'
											: 'hover:bg-gray-700'
									}`}
									onClick={() => handleLanguageSelect(language)}
								>
									<img
										src={getFlagUrl(language)}
										alt={`${language} flag`}
										className='h-4 w-6 mr-2'
									/>
									<span
										className={theme === 'light' ? 'text-black' : 'text-white'}
									>
										{language}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className='flex items-center space-x-6 py-4'>
						<div className='flex items-center space-x-2'>
							<SunIcon
								className={`h-5 w-5 cursor-pointer ${
									theme === 'light' ? 'text-yellow-400' : 'text-gray-400'
								}`}
								onClick={toggleTheme}
							/>
							<div
								className='relative w-7 h-3.5 rounded-full cursor-pointer'
								style={{
									background:
										theme === 'light'
											? 'linear-gradient(to right, #d1d5db 0%, #a3a3a3 100%)'
											: 'linear-gradient(to right, #4b5563 0%, #00c4b4 100%)',
								}}
								onClick={toggleTheme}
							>
								<div
									className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full transition-all duration-300 shadow-md ${
										theme === 'light' ? 'left-0.5' : 'left-3.5'
									}`}
								/>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<div
								className={`relative w-4 h-4 rounded-md cursor-pointer border-2 transition-all duration-200 ${
									isUltra
										? 'bg-teal-500 border-teal-500 shadow-lg shadow-teal-500/50'
										: theme === 'light'
										? 'bg-gray-200 border-gray-400 hover:border-teal-400'
										: 'bg-gray-700 border-gray-500 hover:border-teal-600'
								}`}
								onClick={toggleUltra}
							>
								{isUltra && (
									<CheckIcon className='h-3 w-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
								)}
							</div>
							<span className={`text-sm ${getUltraTextColor()}`}>
								{t('ultra')}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
