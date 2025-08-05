export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  category: 'kings' | 'events' | 'documents' | 'maps' | 'culture' | 'archaeology';
  tags: string[];
  createdDate: Date;
  updatedDate: Date;
  author: string;
  featured: boolean;
  sketchfabId?: string; // For 3D models
  vrContent?: string; // VR content URL
  arContent?: string; // AR content URL
}

export interface King {
  id: string;
  name: string;
  reignPeriod: string;
  birthYear?: number;
  deathYear?: number;
  biography: string;
  achievements: string[];
  imageUrl: string;
  sketchfabId?: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  significance: string;
  relatedKings: string[];
  imageUrl: string;
  location?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'edict' | 'poem' | 'letter' | 'chronicle';
  content: string;
  author?: string;
  year?: number;
  description: string;
  imageUrl?: string;
}