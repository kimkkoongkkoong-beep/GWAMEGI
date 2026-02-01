
export interface RuleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TourGuide {
  category: string;
  items: string[];
}

export enum SectionId {
  Home = 'home',
  About = 'about',
  Rules = 'rules',
  Tour = 'tour',
  Map = 'map',
  Signals = 'signals',
  Contact = 'contact'
}
