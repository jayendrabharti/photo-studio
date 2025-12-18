// Type definitions
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images: string[];
  client: string;
  date: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
}

// Data imports
import postsData from '@/lib/data/posts.json';
import portfolioData from '@/lib/data/portfolio.json';
import servicesData from '@/lib/data/services.json';
import testimonialsData from '@/lib/data/testimonials.json';

// Blog post helpers
export function getAllPosts(): BlogPost[] {
  return postsData as BlogPost[];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return postsData.find((post) => post.slug === slug) as BlogPost | undefined;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return postsData.filter((post) => post.category === category) as BlogPost[];
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return postsData.filter((post) => {
    const searchableText = `${post.title} ${post.excerpt} ${post.content} ${post.tags.join(' ')}`.toLowerCase();
    return searchableText.includes(lowercaseQuery);
  }) as BlogPost[];
}

export function getRelatedPosts(currentPostId: string, category: string, limit: number = 3): BlogPost[] {
  return postsData
    .filter((post) => post.id !== currentPostId && post.category === category)
    .slice(0, limit) as BlogPost[];
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return postsData.slice(0, limit) as BlogPost[];
}

export function getAllCategories(): string[] {
  const categories = postsData.map((post) => post.category);
  return Array.from(new Set(categories));
}

export function getAllTags(): string[] {
  const tags = postsData.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
}

// Portfolio helpers
export function getAllProjects(): PortfolioProject[] {
  return portfolioData as PortfolioProject[];
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioData.find((project) => project.slug === slug) as PortfolioProject | undefined;
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  if (category === 'All') {
    return portfolioData as PortfolioProject[];
  }
  return portfolioData.filter((project) => project.category === category) as PortfolioProject[];
}

export function getFeaturedProjects(limit: number = 6): PortfolioProject[] {
  return portfolioData.slice(0, limit) as PortfolioProject[];
}

export function getPortfolioCategories(): string[] {
  const categories = portfolioData.map((project) => project.category);
  return ['All', ...Array.from(new Set(categories))];
}

// Services helpers
export function getAllServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceById(id: string): Service | undefined {
  return servicesData.find((service) => service.id === id) as Service | undefined;
}

// Testimonials helpers
export function getAllTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getTestimonialsByService(service: string): Testimonial[] {
  return testimonialsData.filter((testimonial) => testimonial.service === service) as Testimonial[];
}

// Utility functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function sortByDate<T extends { date: string }>(items: T[], order: 'asc' | 'desc' = 'desc'): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function paginateItems<T>(items: T[], page: number, itemsPerPage: number): {
  items: T[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
