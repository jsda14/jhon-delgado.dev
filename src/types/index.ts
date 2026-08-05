export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  highlights?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

export interface TechSkill {
  id: string;
  name: string;
  iconName?: string; // Corresponds to Lucide icons
  category: 'frontend' | 'backend-ai' | 'cloud' | 'practices';
  level: number; // 0-100 percentage or rating
}
