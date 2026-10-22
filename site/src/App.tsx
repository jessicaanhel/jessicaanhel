import { useState } from "react"
import { caseStudyPages, projectHref } from "./portfolioPages"

// Contact address shown on the site
const EMAIL = "ro.project2020@gmail.com"
const GITHUB_URL = "https://github.com/jessicaanhel"

type IconName = "arrow" | "code" | "globe" | "grid" | "menu" | "spark" | "x"

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-3 3 3 3" />
        <path d="m16 9 3 3-3 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    menu: (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    ),
    spark: (
      <path d="M12 2c.7 5.3 4.7 9.3 10 10-5.3.7-9.3 4.7-10 10-.7-5.3-4.7-9.3-10-10 5.3-.7 9.3-4.7 10-10Z" />
    ),
    x: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

type ProjectType = "Websites" | "Web apps" | "Dashboards" | "Libraries"

// Real projects, drawn in the same illustrated card style as the rest of the page.
// "slug" is the folder of the project's case study in projects/.
const projects: {
  slug: string
  title: string
  type: ProjectType
  description: string
  tech: string[]
  visual: string
}[] = [
  {
    slug: "northline",
    title: "Northline Digital",
    type: "Websites",
    description: "A five-page marketing website for a small web studio, with packages and a contact form.",
    tech: ["React", "Vite", "Tailwind"],
    visual: "northline",
  },
  {
    slug: "polina",
    title: "Polina Berlin",
    type: "Websites",
    description: "A calm one-page site for a Berlin life manager, in plain HTML and CSS with a dark mode.",
    tech: ["HTML", "CSS", "SEO"],
    visual: "polina",
  },
  {
    slug: "energy",
    title: "Energy trading",
    type: "Dashboards",
    description: "Hourly wind and solar production from five parks, for traders, in charts and tables.",
    tech: ["FastAPI", "AWS Lambda", "Next.js"],
    visual: "energy",
  },
  {
    slug: "analytics",
    title: "Analytics dashboard",
    type: "Dashboards",
    description: "Crypto flows, markets and bank exchange rates in one dark dashboard.",
    tech: ["React", "Flask", "Material UI"],
    visual: "analytics",
  },
  {
    slug: "libraries",
    title: "Frontend library",
    type: "Libraries",
    description: "Three React components from the wedding site, made reusable and data-driven.",
    tech: ["React", "TypeScript", "CSS modules"],
    visual: "library",
  },
  {
    slug: "shop",
    title: "IT'S me… shop",
    type: "Web apps",
    description: "An online shop for yoga and pilates clothing, with basket, favourites and accounts.",
    tech: ["Next.js", "Zustand", "Tailwind"],
    visual: "shop",
  },
  {
    slug: "wedding",
    title: "Wedding site & panel",
    type: "Web apps",
    description:
      "A phone-first invitation, and a private planning panel with roles, budget and team boards.",
    tech: ["Next.js", "TypeScript", "Google Sheets"],
    visual: "wedding",
  },
]

const filters: Array<"All" | ProjectType> = ["All", "Websites", "Web apps", "Dashboards", "Libraries"]

function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "northline") {
    return (
      <div className="visual visual-northline">
        <div className="browser-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="north-content">
          <span>NORTHLINE</span>
          <div className="building">
            <b />
            <b />
            <b />
            <b />
          </div>
          <strong>
            WEBSITES FOR
            <br />
            LOCAL BUSINESS
          </strong>
          <small>Home · Services · Work · Contact</small>
        </div>
      </div>
    )
  }
  if (visual === "shop") {
    return (
      <div className="visual visual-pulse">
        <div className="phone-shell">
          <div className="phone-top">
            <span>IT'S me…</span>
            <i />
          </div>
          <small>Basket total</small>
          <strong>€134.00</strong>
          <div className="shop-tiles">
            <i />
            <i />
            <i />
          </div>
          <div className="pulse-cards">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    )
  }
  if (visual === "wedding") {
    return (
      <div className="visual visual-atlas">
        <div className="atlas-copy">
          <span>12.06.2027 / TUSCANY</span>
          <strong>
            Save
            <br />
            the date.
          </strong>
        </div>
        <div className="atlas-phone">
          <div className="atlas-sky" />
          <div className="atlas-info">
            <small>Villa Colletto</small>
            <b>Angela &amp; Simon</b>
            <span>RSVP · Schedule · Where to stay</span>
          </div>
        </div>
      </div>
    )
  }
  if (visual === "library") {
    return (
      <div className="visual visual-relay">
        <div className="chat-card">
          <div className="chat-title">
            <i>{"</>"}</i>
            <span>
              <b>anhel-frontend-library</b>
              <small>3 components</small>
            </span>
          </div>
          <p className="message received code">import {"{ VideoEntry }"}</p>
          <p className="message received code">import {"{ FramedPhotoStack }"}</p>
          <p className="message sent code">import {"{ ScheduleTimeline }"}</p>
          <p className="message received short">
            Type check passed. <b>6 tests green →</b>
          </p>
        </div>
      </div>
    )
  }
  if (visual === "energy" || visual === "analytics") {
    const isEnergy = visual === "energy"
    return (
      <div className={isEnergy ? "visual visual-orbit" : "visual visual-orbit alt"}>
        <div className="dash-nav">
          <b>{isEnergy ? "E" : "A"}</b>
          <i />
          <i />
          <i />
        </div>
        <div className="dash-main">
          <div className="dash-head">
            <span>{isEnergy ? "Production" : "Markets"}</span>
            <small>{isEnergy ? "Per hour" : "Live"}</small>
          </div>
          <div className="metrics">
            <p>
              <small>{isEnergy ? "Wind" : "Crypto flows"}</small>
              <b>{isEnergy ? "412 MWh" : "$84.2M"}</b>
              <em>{isEnergy ? "avg" : "+8.7%"}</em>
            </p>
            <p>
              <small>{isEnergy ? "Solar" : "EUR / USD"}</small>
              <b>{isEnergy ? "268 MWh" : "1.084"}</b>
              <em>{isEnergy ? "avg" : "+0.2%"}</em>
            </p>
          </div>
          <div className="bars">
            {(isEnergy
              ? [35, 52, 43, 70, 61, 82, 72, 91, 78, 96, 86, 100]
              : [60, 48, 72, 55, 80, 66, 90, 74, 58, 85, 70, 95]
            ).map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  // Polina Berlin: an editorial page between two orbits
  return (
    <div className="visual visual-native">
      <div className="native-orbit orbit-one" />
      <div className="native-orbit orbit-two" />
      <div className="editorial-page">
        <span>Berlin · Life manager</span>
        <strong>
          Polina
          <br />
          Berlin
        </strong>
        <small>Identity, presence and personal direction.</small>
      </div>
    </div>
  )
}

export default function App() {
  const [filter, setFilter] = useState<"All" | ProjectType>("All")
  const [menuOpen, setMenuOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const visibleProjects = projects.filter(
    (project) => filter === "All" || project.type === filter,
  )

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a
          className="brand"
          href="#top"
          aria-label="jessicaanhel, home"
        >
          <span>JA</span> jessicaanhel
        </a>
        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          <div
            className={portfolioOpen ? "nav-dropdown open" : "nav-dropdown"}
            onMouseEnter={() => setPortfolioOpen(true)}
            onMouseLeave={() => setPortfolioOpen(false)}
          >
            <button
              className="nav-dropdown-toggle"
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              aria-expanded={portfolioOpen}
              aria-controls="portfolio-menu"
            >
              Portfolio <Icon name="arrow" />
            </button>
            <ul id="portfolio-menu" className="nav-dropdown-menu">
              {caseStudyPages.map((page) => (
                <li key={page.slug}>
                  <a href={projectHref(page.slug)}>{page.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Work
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <a className="nav-cta" href={`mailto:${EMAIL}`}>
            Let’s talk <Icon name="arrow" />
          </a>
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-kicker">
            <span />
            <p>
              Software engineer
              <br />
              Frontend · Backend · Cloud
            </p>
          </div>
          <h1>
            I design &amp; build
            <br />
            <em>digital products</em>
            <br />
            that feel <span className="underline">effortless.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              I’m a software engineer. I build React and Next.js
              frontends, Python APIs on AWS, and dashboards that make data easy
              to read.
            </p>
            <a
              href="#work"
              className="circle-link"
              aria-label="Explore selected work"
            >
              <Icon name="arrow" />
            </a>
          </div>
          <div className="hero-stamp">
            <Icon name="code" />
            <span>DESIGN · BUILD · SHIP ·</span>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-intro">
            <span className="eyebrow">01 / Selected work</span>
            <h2>
              Projects with
              <br />
              <em>purpose.</em>
            </h2>
          </div>
          <div className="filters" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                className={filter === item ? "active" : ""}
                key={item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className="project-card" key={project.slug}>
                <a href={projectHref(project.slug)} aria-label={`${project.title}: read the case study`}>
                  <ProjectVisual visual={project.visual} />
                </a>
                <div className="project-meta">
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.description}</p>
                  <ul>
                    {project.tech.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className="project-link" href={projectHref(project.slug)}>
                    Case study <Icon name="arrow" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-label">
            <span className="eyebrow">02 / What kind of engineer</span>
            <Icon name="spark" />
          </div>
          <div className="about-content">
            <h2>
              One developer.
              <br />
              <em>End-to-end</em> thinking.
            </h2>
            <p className="about-lead">
              I work on both sides of the screen: the interface people touch,
              and the API, data and deployment behind it.
            </p>
            <div className="services">
              <article>
                <span>01</span>
                <Icon name="globe" />
                <h3>Frontend</h3>
                <p>
                  React, Next.js and TypeScript. Responsive, phone-first
                  interfaces and reusable components.
                </p>
              </article>
              <article>
                <span>02</span>
                <Icon name="grid" />
                <h3>Backend &amp; cloud</h3>
                <p>
                  Python with FastAPI and Flask, serverless on AWS Lambda, S3
                  and DynamoDB. Roles, logins and APIs.
                </p>
              </article>
              <article>
                <span>03</span>
                <Icon name="code" />
                <h3>Data &amp; dashboards</h3>
                <p>
                  Charts and tables people can act on, from CSV files, live
                  APIs or a Google Sheet.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="future-section">
          <div className="future-copy">
            <span className="eyebrow">The road ahead</span>
            <h2>
              Going
              <br />
              <em>native.</em>
            </h2>
            <p>
              iOS and Android are next. I’m expanding my craft to build
              considered, native mobile experiences from the ground up.
            </p>
          </div>
          <div className="future-art" aria-hidden="true">
            <span className="future-ring ring-a" />
            <span className="future-ring ring-b" />
            <div className="future-device device-a">
              <b>iOS</b>
              <span>soon</span>
            </div>
            <div className="future-device device-b">
              <Icon name="spark" />
              <b>Android</b>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span className="eyebrow">03 / Start a project</span>
          <div className="contact-main">
            <h2>
              Have an idea?
              <br />
              <em>Let’s make it real.</em>
            </h2>
            <a href={`mailto:${EMAIL}`} className="contact-button">
              {EMAIL} <Icon name="arrow" />
            </a>
          </div>
          <div className="contact-footer">
            <p>
              Open to new roles
              <br />
              and freelance projects.
            </p>
            <div>
              <a href={GITHUB_URL} rel="noopener">
                GitHub
              </a>
            </div>
            <span>© {new Date().getFullYear()} jessicaanhel</span>
          </div>
        </section>
      </main>
    </div>
  )
}
