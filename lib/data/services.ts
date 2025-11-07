export type Service = {
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  images: string[] | null;
  createdAt?: string;
  lastMod?: string;
};

export const projects: Service[] = [
  {
    slug: 'web-development',
    name: 'Web development',
    description: 'Web development services including responsive websites, web applications, and e‑commerce solutions.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    images: ['/images/travel/1.jpg', '/images/travel/2.jpg', '/images/travel/3.jpg'],
    createdAt: '2018-09-15T00:00:00.000Z',
    lastMod: '2018-09-15T00:00:00.000Z'
  },
  {
    slug: 'wireframing-prototyping',
    name: 'Wireframing & Prototyping',
    description: 'Creating wireframes and prototypes to visualize and test design concepts before development.',
    technologies: ['Figma'],
    images: ['/images/services/wireframing.jpg', '/images/services/prototyping.jpg'],
    createdAt: '2018-09-15T00:00:00.000Z',
    lastMod: '2018-09-15T00:00:00.000Z'
  }
];
