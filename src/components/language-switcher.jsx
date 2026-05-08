import { Languages } from 'lucide-react'

export function LanguageSwitcher({ t, language, onChange }) {
  return (
    <label className="control" htmlFor="language-switcher">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{t('header.languageLabel')}</span>
      <select
        id="language-switcher"
        value={language}
        onChange={(event) => onChange(event.target.value)}
        aria-label={t('header.languageLabel')}
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </label>
  )
}
