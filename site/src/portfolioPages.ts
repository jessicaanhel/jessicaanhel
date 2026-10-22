// The projects shown in the "Portfolio" menu. Each one has its own case-study page
// under projects/<slug>/, styled like the project itself.
export type PortfolioPage = {
  slug: string
  title: string
  kind: string
  summary: string
  // Folder of the case study on the developer site, when it differs from slug
  caseStudy?: string
  // An idea that is not built yet: shown with a mock demo and no case study
  concept?: boolean
}

export const portfolioPages: PortfolioPage[] = [
  {
    slug: "northline",
    title: "Northline Digital",
    kind: "Website",
    summary: "A marketing site for a small web studio.",
  },
  {
    slug: "polina",
    title: "Polina Berlin",
    kind: "Website",
    summary: "A one-page personal site for a Berlin life manager.",
  },
  {
    slug: "energy",
    title: "Energy trading dashboard",
    kind: "Dashboard",
    summary: "Wind and solar production per hour and over time.",
  },
  {
    slug: "analytics",
    title: "Analytics dashboard",
    kind: "Dashboard",
    summary: "Crypto flows, markets and bank exchange rates in one dark dashboard.",
  },
  {
    slug: "libraries",
    title: "Frontend library",
    kind: "Library",
    summary: "Three React components from the wedding site, made reusable.",
  },
  {
    slug: "shop",
    title: "IT'S me… shop",
    kind: "Online shop",
    summary: "Yoga and pilates apparel: catalogue, cart, favourites and accounts.",
  },
  {
    slug: "invitation",
    title: "Wedding invitation",
    kind: "Website",
    summary: "A phone-first invitation: an envelope that opens, a sliding photo stack, a programme timeline and RSVP.",
    caseStudy: "wedding",
  },
  {
    slug: "wedding",
    title: "Wedding planning panel",
    kind: "Web app",
    summary: "A private panel for the couple and helpers: tasks, budget, guests and roles.",
  },
  {
    slug: "sales-chat",
    title: "AI sales assistant",
    kind: "Concept",
    summary: "A chat on your website that answers questions, suggests products and helps close the sale.",
    concept: true,
  },
]

// The projects that have a case study (concepts do not have one yet)
export const caseStudyPages = portfolioPages.filter((page) => !page.concept)

const caseStudyFolder = (slug: string) => portfolioPages.find((page) => page.slug === slug)?.caseStudy ?? slug

// Link to a case study (relative, so it works on any domain)
export function projectHref(slug: string): string {
  return `./projects/${caseStudyFolder(slug)}/`
}
