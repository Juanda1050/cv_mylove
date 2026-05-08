import { Languages } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const LANGUAGE_OPTIONS = [
  { value: 'es', label: 'Español', short: 'ES' },
  { value: 'en', label: 'English', short: 'EN' },
]

export function LanguageSwitcher({ t, language, onChange }) {
  const currentLanguage =
    LANGUAGE_OPTIONS.find((option) => option.value === language) ?? LANGUAGE_OPTIONS[0]

  return (
    <div className="language-switcher">
      <span id="language-switcher-label" className="sr-only">
        {t('header.languageLabel')}
      </span>
      <Select value={currentLanguage.value} onValueChange={onChange}>
        <SelectTrigger
          className="control control-select control-select-compact language-switcher-trigger"
          aria-labelledby="language-switcher-label"
        >
          <span className="control-icon language-switcher-icon" aria-hidden="true">
            <Languages size={14} aria-hidden="true" />
          </span>
          <SelectValue placeholder={t('header.languageLabel')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('header.languageLabel')}</SelectLabel>
            {LANGUAGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="language-switcher-option">
                  <span>{option.label}</span>
                  <span className="language-switcher-short">{option.short}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
