import { ChevronDown, Languages } from 'lucide-react'

const LANGUAGE_OPTIONS = [
  { value: 'es', label: 'Español', short: 'ES' },
  { value: 'en', label: 'English', short: 'EN' },
]

export function LanguageSwitcher({ t, language, onChange }) {
  const currentLanguage =
    LANGUAGE_OPTIONS.find((option) => option.value === language) ?? LANGUAGE_OPTIONS[0]

  return (
    <div className="language-switcher">
      <label className="control control-select" htmlFor="language-switcher">
        <span className="control-icon" aria-hidden="true">
          <Languages size={16} aria-hidden="true" />
        </span>
        <span className="control-copy">
          <span className="control-label">{t('header.languageLabel')}</span>
          <span className="control-value">{currentLanguage.label}</span>
        </span>
        <span className="control-current" aria-hidden="true">
          {currentLanguage.short}
        </span>
        <span className="control-chevron" aria-hidden="true">
          <ChevronDown size={16} aria-hidden="true" />
        </span>
        <select
          id="language-switcher"
          className="control-native-select"
          value={language}
          onChange={(event) => onChange(event.target.value)}
          aria-label={t('header.languageLabel')}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
