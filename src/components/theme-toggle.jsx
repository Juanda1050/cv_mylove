import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ t, theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="control control-button"
      onClick={onToggle}
      aria-label={t('header.themeLabel')}
      title={t('header.themeLabel')}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
      <span>{isDark ? t('header.light') : t('header.dark')}</span>
    </button>
  )
}
