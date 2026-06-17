import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Globe2,
  Mail,
  Menu,
  MapPin,
  Palette,
  Phone,
  School,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./components/ui/select";
import { LanguageSwitcher } from "./components/language-switcher";
import { ThemeToggle } from "./components/theme-toggle";

const EMAIL = "salazarmariana210@gmail.com";
const PHONE = "+52 81 2325 5640";
const LINKEDIN = "https://www.linkedin.com/in/mariana-salazar-36893229a/";
const PROFILE = "/images/profile.jpg";
const DOCUMENTS = {
  es: "/images/CV_MarianaLizetteTovarSalazar.pdf",
  en: "/images/Resume_MarianaLizetteTovarSalazar.pdf",
};

const SKILL_CARD_META = {
  office: { icon: BriefcaseBusiness, accent: "rose" },
  design: { icon: Palette, accent: "gold" },
  databases: { icon: Database, accent: "violet" },
  data: { icon: BrainCircuit, accent: "sky" },
  strengths: { icon: UsersRound, accent: "mint" },
};

function App() {
  const { t, i18n } = useTranslation();
  const topbarRef = useRef(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [downloadMenuKey, setDownloadMenuKey] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        !topbarRef.current?.contains(event.target) &&
        !event.target.closest("[data-radix-popper-content-wrapper]")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleUserScroll = () => {
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
    };
  }, [isMobileMenuOpen]);

  const skills = useMemo(() => {
    return t("skills", { returnObjects: true });
  }, [t]);

  const programmingSkills = skills.programming;
  const skillCards = useMemo(
    () =>
      Object.entries(SKILL_CARD_META)
        .map(([key, meta]) => ({
          ...meta,
          ...skills[key],
          key,
        }))
        .sort((leftCard, rightCard) => {
          const leftCount = leftCard.items?.length ?? 0;
          const rightCount = rightCard.items?.length ?? 0;

          return leftCount - rightCount;
        }),
    [skills],
  );

  const experiences = t("experience", { returnObjects: true });
  const courses = t("courses", { returnObjects: true });
  const languages = t("education.languages", { returnObjects: true });

  const mapLanguageLevelToProgress = (level) => {
    const normalizedLevel = (level || "").trim().toUpperCase();

    if (!normalizedLevel) return 60;
    if (
      normalizedLevel.includes("NATIVE") ||
      normalizedLevel.includes("NATIVO")
    )
      return 100;
    if (normalizedLevel.includes("C2")) return 95;
    if (normalizedLevel.includes("C1")) return 90;
    if (normalizedLevel.includes("B2")) return 80;
    if (normalizedLevel.includes("B1")) return 68;
    if (normalizedLevel.includes("A2")) return 52;
    if (normalizedLevel.includes("A1")) return 36;
    return 60;
  };

  const formattedLanguages = useMemo(
    () =>
      languages.map((language) => {
        const match = language.match(/^(.*?)\s*\((.*?)\)$/);

        return {
          name: match?.[1] ?? language,
          level: match?.[2] ?? "",
          progress: mapLanguageLevelToProgress(match?.[2] ?? ""),
          raw: language,
        };
      }),
    [languages],
  );
  const formattedCourses = useMemo(
    () =>
      courses.map((course) => {
        const [title, details = ""] = course.split(" — ");
        const providerMatch = details.match(/\(([^)]+)\)\s*$/);
        const provider = providerMatch?.[1] ?? "";
        const period = details.replace(/\s*\([^)]+\)\s*$/, "");

        return {
          title,
          period,
          provider,
          raw: course,
        };
      }),
    [courses],
  );

  const handleLanguageChange = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  const handleDocumentChange = (nextDocument) => {
    const nextUrl = DOCUMENTS[nextDocument] ?? DOCUMENTS.es;

    localStorage.setItem("downloadDocument", nextDocument);
    const anchor = document.createElement("a");
    anchor.href = nextUrl;
    anchor.download = "";
    anchor.click();
    setDownloadMenuKey((currentKey) => currentKey + 1);
  };

  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  const documentOptions = useMemo(
    () => [
      { value: "es", label: t("hero.documentSpanish") },
      { value: "en", label: t("hero.documentEnglish") },
    ],
    [t],
  );

  return (
    <div className="page">
      <div className="decor decor-one" aria-hidden="true" />
      <div className="decor decor-two" aria-hidden="true" />
      <header ref={topbarRef} className="topbar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Sparkles size={14} aria-hidden="true" /> Mariana
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={t("header.navLabel")}
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          {isMobileMenuOpen ? (
            <X size={18} aria-hidden="true" />
          ) : (
            <Menu size={18} aria-hidden="true" />
          )}
        </button>
        <div className={`topbar-panel ${isMobileMenuOpen ? "is-open" : ""}`}>
          <nav
            id="main-navigation"
            className="topbar-nav"
            aria-label={t("header.navLabel")}
          >
            <a href="#about" onClick={handleNavItemClick}>
              {t("header.about")}
            </a>
            <a href="#experience" onClick={handleNavItemClick}>
              {t("header.experience")}
            </a>
            <a href="#skills" onClick={handleNavItemClick}>
              {t("header.skills")}
            </a>
            <a href="#education" onClick={handleNavItemClick}>
              {t("header.education")}
            </a>
            <a href="#contact" onClick={handleNavItemClick}>
              {t("header.contact")}
            </a>
          </nav>
          <div className="controls topbar-controls">
            <LanguageSwitcher
              t={t}
              language={i18n.language}
              onChange={handleLanguageChange}
            />
            <ThemeToggle
              t={t}
              theme={theme}
              onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </div>
        </div>
      </header>

      <main id="home">
        <section
          className="hero hero-card section card"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <Badge>{t("hero.career")}</Badge>
            <div className="hero-mobile-profile" aria-hidden="true">
              <div className="profile-mobile-frame">
                <img
                  src={PROFILE}
                  alt=""
                  className="profile-mobile"
                  decoding="async"
                />
              </div>
            </div>
            <h1 id="hero-title">Mariana Lizette Tovar Salazar</h1>
            <p className="hero-role">{t("hero.role")}</p>
            <p className="lead">{t("hero.summary")}</p>
            <ul className="meta" aria-label={t("hero.detailsLabel")}>
              <li>
                <MapPin size={16} aria-hidden="true" /> {t("hero.location")}
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`}>{PHONE}</a>
              </li>
              <li>
                <img
                  src="/linkedin-icon.svg"
                  alt=""
                  width="16"
                  height="16"
                  aria-hidden="true"
                  style={{ display: "inline-block" }}
                />
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
            <div className="hero-actions">
              <Button
                type="button"
                onClick={() => window.location.assign("#experience")}
              >
                {t("hero.ctaPrimary")}
              </Button>
              <Select
                key={downloadMenuKey}
                onValueChange={handleDocumentChange}
              >
                <SelectTrigger
                  className="btn btn-outline download-menu-trigger"
                  aria-label={t("hero.documentLabel")}
                >
                  <span>{t("hero.ctaSecondary")}</span>
                </SelectTrigger>
                <SelectContent>
                  {documentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="profile-wrap">
            <div className="profile-frame">
              <img
                src={PROFILE}
                alt="Mariana Lizette Tovar Salazar"
                className="profile"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2>{t("section.aboutTitle")}</h2>
          <Card>
            <CardContent>
              <p>{t("about")}</p>
            </CardContent>
          </Card>
        </section>

        <section id="experience" className="section">
          <h2>{t("section.experienceTitle")}</h2>
          <div className="grid one">
            {experiences.map((job) => (
              <Card key={job.title}>
                <CardHeader className="header-rose">
                  <CardTitle className="card-title-rose">{job.title}</CardTitle>
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
          <h2>{t("section.skillsTitle")}</h2>
          <div className="skills-layout">
            <Card className="skills-spotlight">
              <CardHeader className="header-rose">
                <CardTitle className="card-title-rose">
                  <span
                    className="skill-card-icon skill-card-icon-rose"
                    aria-hidden="true"
                  >
                    <Code2 size={18} aria-hidden="true" />
                  </span>
                  {programmingSkills.title}
                </CardTitle>
                <CardDescription>
                  {programmingSkills.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="skill-bars">
                  {programmingSkills.languages.map((item) => (
                    <article key={item.name} className="skill-meter">
                      <div className="skill-meter-header">
                        <div>
                          <strong>{item.name}</strong>
                          <p>{item.detail}</p>
                        </div>
                        <span>{item.level}%</span>
                      </div>
                      <Progress
                        value={item.level}
                        aria-label={`${item.name} ${item.level}%`}
                      />
                    </article>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="skills-library">
              <CardContent className="skills-library-content">
                <div className="skills-cluster-grid">
                  {skillCards.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.key}
                        className={`skills-cluster skills-cluster-${group.accent}`}
                      >
                        <header className="skills-cluster-header">
                          <span
                            className={`skill-card-icon skill-card-icon-${group.accent}`}
                            aria-hidden="true"
                          >
                            <Icon size={18} aria-hidden="true" />
                          </span>
                          <h3>{group.title}</h3>
                        </header>
                        <ul className="skills-cluster-list">
                          {group.items.map((item) => (
                            <li key={item} className="skills-cluster-item">
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>{t("section.coursesTitle")}</h2>
          <Card>
            <CardContent>
              <ul className="course-list">
                {formattedCourses.map((course) => (
                  <li key={course.raw} className="course-item">
                    <div className="course-marker" aria-hidden="true" />
                    <div className="course-copy">
                      <strong>{course.title}</strong>
                      <p>{course.period}</p>
                    </div>
                    <Badge className="course-badge">{course.provider}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="education" className="section">
          <h2>{t("section.educationTitle")}</h2>
          <div className="education-layout">
            <Card className="education-card education-card-main">
              <CardHeader className="header-rose education-header-compact">
                <CardTitle className="card-title-rose education-title-row">
                  <span className="education-title-main">
                    <span
                      className="skill-card-icon skill-card-icon-rose"
                      aria-hidden="true"
                    >
                      <School size={20} aria-hidden="true" />
                    </span>
                    <span className="education-title-text">
                      {t("education.degree")}
                    </span>
                  </span>
                  <Badge className="education-period-badge">
                    {t("education.period")}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="education-content-compact">
                <div className="education-meta-row">
                  <CardDescription className="education-meta">
                    <span>{t("education.faculty")}</span>
                    <span>{t("education.school")}</span>
                  </CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card className="education-card education-card-languages">
              <CardHeader className="header-sky language-header-compact">
                <CardTitle className="card-title-sky">
                  <span
                    className="skill-card-icon skill-card-icon-sky"
                    aria-hidden="true"
                  >
                    <Globe2 size={20} aria-hidden="true" />
                  </span>
                  {t("education.languageLevelsTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="levels-content-compact">
                <ul className="language-grid">
                  {formattedLanguages.map((item) => (
                    <li key={item.raw} className="language-item">
                      <div className="language-item-header">
                        <div className="language-copy">
                          <strong>{item.name}</strong>
                        </div>
                        <Badge className="language-level-chip">
                          {item.level}
                        </Badge>
                      </div>
                      <Progress
                        value={item.progress}
                        aria-label={`${item.name} ${item.level}`}
                        className="language-progress"
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contact" className="section">
          <h2>{t("section.contactTitle")}</h2>
          <Card className="contact-card">
            <CardContent className="contact-content">
              <div className="contact-copy">
                <p>{t("contact.text")}</p>
              </div>
              <div className="contact-grid">
                <a className="contact-method" href={`mailto:${EMAIL}`}>
                  <span className="contact-method-icon" aria-hidden="true">
                    <Mail size={18} aria-hidden="true" />
                  </span>
                  <span className="contact-method-copy">
                    <strong>{t("hero.emailLabel")}</strong>
                    <span>{EMAIL}</span>
                  </span>
                </a>
                <a
                  className="contact-method"
                  href={`tel:${PHONE.replace(/\s+/g, "")}`}
                >
                  <span className="contact-method-icon" aria-hidden="true">
                    <Phone size={18} aria-hidden="true" />
                  </span>
                  <span className="contact-method-copy">
                    <strong>{t("hero.phoneLabel")}</strong>
                    <span>{PHONE}</span>
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer>{t("footer")}</footer>
    </div>
  );
}

export default App;
