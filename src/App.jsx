import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { LanguageSwitcher } from './components/language-switcher'
import { ThemeToggle } from './components/theme-toggle'

const EMAIL = 'salazarmariana210@gmail.com'
const PHONE = '+52 81 2325 5640'
const PROFILE = '/images/profile.jpg'
const CV_PLACEHOLDER = '/images/cv-mariana.pdf'

function App() {
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const skills = useMemo(() => {
    const groups = t('skills', { returnObjects: true })
    return Object.values(groups)
  }, [t])

  const experiences = t('experience', { returnObjects: true })
  const courses = t('courses', { returnObjects: true })
  const languages = t('education.languages', { returnObjects: true })

  const handleLanguageChange = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage)
    localStorage.setItem('language', nextLanguage)
    document.documentElement.lang = nextLanguage
  }

  return (
    <div className="page">
      <div className="decor decor-one" aria-hidden="true" />
      <div className="decor decor-two" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home">
          <Sparkles size={14} aria-hidden="true" /> Mariana
        </a>
        <nav aria-label={t('header.navLabel')}>
          <a href="#about">{t('header.about')}</a>
          <a href="#experience">{t('header.experience')}</a>
          <a href="#skills">{t('header.skills')}</a>
          <a href="#education">{t('header.education')}</a>
          <a href="#contact">{t('header.contact')}</a>
        </nav>
        <div className="controls">
          <LanguageSwitcher
            t={t}
            language={i18n.language}
            onChange={handleLanguageChange}
          />
          <ThemeToggle
            t={t}
            theme={theme}
            onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </div>
      </header>

      <main id="home">
        <section className="hero section card" aria-labelledby="hero-title">
          <div>
            <Badge>{t('hero.role')}</Badge>
            <h1 id="hero-title">Mariana Lizette Tovar Salazar</h1>
            <p className="lead">{t('hero.summary')}</p>
            <ul className="meta" aria-label={t('hero.detailsLabel')}>
              <li>
                <MapPin size={16} aria-hidden="true" /> {t('hero.location')}
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href={`tel:${PHONE.replace(/\s+/g, '')}`}>{PHONE}</a>
              </li>
            </ul>
            <div className="hero-actions">
              <Button type="button" onClick={() => window.location.assign('#contact')}>
                {t('hero.ctaPrimary')}
              </Button>
              <a className="btn btn-outline" href={CV_PLACEHOLDER}>
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>
          <div className="profile-wrap">
            <img src={PROFILE} alt="Mariana Lizette Tovar Salazar" className="profile" />
          </div>
        </section>

        <section id="about" className="section">
          <h2>{t('section.aboutTitle')}</h2>
          <Card>
            <CardContent>
              <p>{t('about')}</p>
            </CardContent>
          </Card>
        </section>

        <section id="experience" className="section">
          <h2>{t('section.experienceTitle')}</h2>
          <div className="grid two">
            {experiences.map((job) => (
              <Card key={job.title}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.organization}</CardDescription>
                  <Badge>{job.period}</Badge>
                </CardHeader>
                <CardContent>
                  <ul>
                    {job.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h2>{t('section.skillsTitle')}</h2>
          <div className="grid three">
            {skills.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>{t('section.coursesTitle')}</h2>
          <Card>
            <CardContent>
              <ul className="compact-list">
                {courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="education" className="section">
          <h2>{t('section.educationTitle')}</h2>
          <div className="grid two">
            <Card>
              <CardHeader>
                <CardTitle>
                  <GraduationCap size={18} aria-hidden="true" /> {t('education.degree')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('education.school')}</p>
                <p>{t('education.faculty')}</p>
                <Badge>{t('education.period')}</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <BriefcaseBusiness size={18} aria-hidden="true" /> {t('education.languagesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {languages.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contact" className="section">
          <h2>{t('section.contactTitle')}</h2>
          <Card>
            <CardContent>
              <p>{t('contact.text')}</p>
              <div className="hero-actions">
                <a className="btn btn-default" href={`mailto:${EMAIL}`}>
                  {t('contact.email')}
                </a>
                <a className="btn btn-secondary" href={`tel:${PHONE.replace(/\s+/g, '')}`}>
                  {t('contact.phone')}
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer>{t('footer')}</footer>
    </div>
  )
}

export default App
