export enum ComplexityLevel {
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export enum Industry {
  AI_ML = 'AI & Machine Learning',
  WEB_APP = 'Web Application',
  CYBERSECURITY = 'Cybersecurity',
  BLOCKCHAIN = 'Blockchain & Web3',
  IOT = 'Internet of Things (IoT)',
  AR_VR = 'AR / VR / Metaverse',
  DATA_ANALYTICS = 'Data & Analytics',
  FINTECH = 'FinTech',
  HEALTHCARE = 'Healthcare',
  E_COMMERCE = 'E-Commerce',
  ED_TECH = 'EdTech',
  SOCIAL = 'Social & Collaboration',
  CLOUD_INFRA = 'Cloud & Infrastructure',
  EMBEDDED = 'Embedded Systems',
  DEVOPS = 'DevOps & Automation'
}

export interface ProjectIdea {
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  targetUsers: string[]; 
  features: string[];
  techStack: string[];
  toolsAndAI: string[]; 
  implementationSteps: string[];
  userExperienceTips: string[];
  limitations: string[]; 
  risks: string[]; 
  security: string[]; 
  complexity: string;
  realWorldImpact: string;
}

export interface GeneratorOptions {
  industry: Industry;
  complexity: ComplexityLevel;
  focusArea: string; 
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  options: GeneratorOptions;
  ideas: ProjectIdea[];
}