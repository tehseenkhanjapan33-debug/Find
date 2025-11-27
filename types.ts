
import { CampaignObjective, CampaignPlatform, CampaignStatus, Gender } from './constants';

export interface Campaign {
  id: string;
  name: string;
  objective: CampaignObjective;
  platform: CampaignPlatform;
  url: string;
  audience: {
    ageRange: string;
    gender: Gender;
    interests: string[];
  };
  status: CampaignStatus;
  performance: {
    views: number;
    engagements: number;
    leads: number;
    sales: number;
    follows: number;
    blogClicks: number;
  };
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
}

export type NotificationType = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
};
