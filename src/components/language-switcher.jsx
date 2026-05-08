import { Languages } from 'lucide-react'

const LANGUAGE_OPTIONS = [
  { value: 'es', label: 'Español', short: 'ES' },
  { value: 'en', label: 'English', short: 'EN' },
]

export function LanguageSwitcher({ t, language, onChange }) {
  return (
    <div className="language-switcher">
      <label className="control control-select" htmlFor="language-switcher">
        <span className="control-icon" aria-hidden="true">
          <Languages size={16} aria-hidden="true" />
        </span>
        <span className="control-copy">
          <span className="control-label">{t('header.languageLabel')}</span>
          <select
            id="language-switcher"
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
        </span>
        <span className="control-current" aria-hidden="true">
          {LANGUAGE_OPTIONS.find((option) => option.value === language)?.short ?? 'ES'}
        </span>
      </label>
    </div>
  )
}
