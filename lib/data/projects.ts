export type Project = {
  slug: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  responsiveness: string | null;
  images: string[] | null;
  externalUrl?: string;
  createdAt?: string;
  lastMod?: string;
};

export const projects: Project[] = [
  {
    slug: 'travel-website',
    name: 'Travel Website',
    description: 'A responsive travel landing page built with Bootstrap.',
    type: "Landing page",
    responsiveness: "100%",
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    images: ['/images/travel/1.jpg', '/images/travel/2.jpg', '/images/travel/3.jpg'],
    externalUrl: 'https://andreinemeti.github.io/travel-website/',
    createdAt: '2018-09-15T00:00:00.000Z',
    lastMod: '2018-09-15T00:00:00.000Z'
  },
  {
    slug: 'watch-store',
    name: 'Watch Store',
    type: "Landing page",
    responsiveness: "100%",
    description: 'E‑commerce storefront concept focused on clean UI.',
    tags: ['HTML5', 'CSS3', 'Bootstrap'],
    images: null,
    externalUrl: 'https://andreinemeti.github.io/watch-store/',
    createdAt: '2018-09-15T00:00:00.000Z',
    lastMod: '2018-09-15T00:00:00.000Z'
  },
  {
    slug: 'weather-app',
    name: 'Weather App',
    type: "Landing page",
    responsiveness: "100%",
    description: 'Small jQuery based weather application.',
    tags: ['HTML5', 'CSS3', 'jQuery', 'JavaScript'],
    images: null,
    externalUrl: 'https://andreinemeti.github.io/Weather-app/',
    createdAt: '2018-09-15T00:00:00.000Z',
    lastMod: '2018-09-15T00:00:00.000Z'
  },
  {
    slug: 'architecture-portfolio',
    name: 'Architecture Portfolio',
    description: 'Minimal portfolio template for an architecture studio.',
    type: "Landing page",
    responsiveness: "100%",
    tags: ['HTML5', 'CSS3'],
    images: null,
    externalUrl: 'https://andreinemeti.github.io/architecture/',
    createdAt: '2018-09-15T00:00:00.000Z',
    lastMod: '2018-09-15T00:00:00.000Z'
  }
];
