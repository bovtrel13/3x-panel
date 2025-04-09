// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Импортируем переводы
import enTranslation from './locales/en/translation.json'
import ruTranslation from './locales/ru/translation.json'
import zhTranslation from './locales/zh/translation.json'

// Инициализация i18next
i18n
	.use(LanguageDetector) // Автоматическое определение языка
	.use(initReactI18next) // Интеграция с React
	.init({
		resources: {
			en: {
				translation: enTranslation,
			},
			ru: {
				translation: ruTranslation,
			},
			zh: {
				translation: zhTranslation,
			},
		},
		lng: 'en', // Принудительно устанавливаем английский как начальный язык
		fallbackLng: 'en', // Язык по умолчанию, если выбранный язык не поддерживается
		interpolation: {
			escapeValue: false, // React уже экранирует значения
		},
	})

export default i18n
