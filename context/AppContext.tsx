
import React, { createContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { Campaign, User, NotificationType } from '../types';
import { CampaignStatus } from '../constants';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  campaigns: Campaign[];
  notifications: NotificationType[];
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_CAMPAIGN'; payload: Campaign }
  | { type: 'UPDATE_CAMPAIGN_STATUS'; payload: { id: string; status: CampaignStatus } }
  | { type: 'UPDATE_CAMPAIGN_PERFORMANCE'; payload: { id: string } }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<NotificationType, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: number };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  campaigns: [],
  notifications: [],
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    case 'ADD_CAMPAIGN':
      return { ...state, campaigns: [action.payload, ...state.campaigns] };
    case 'UPDATE_CAMPAIGN_STATUS':
      return {
        ...state,
        campaigns: state.campaigns.map(c =>
          c.id === action.payload.id ? { ...c, status: action.payload.status } : c
        ),
      };
    case 'UPDATE_CAMPAIGN_PERFORMANCE':
        return {
            ...state,
            campaigns: state.campaigns.map(c =>
                c.id === action.payload.id ? { ...c, performance: {
                    views: c.performance.views + Math.floor(Math.random() * 100),
                    engagements: c.performance.engagements + Math.floor(Math.random() * 10),
                    leads: c.performance.leads + Math.floor(Math.random() * 2),
                    sales: c.performance.sales + (c.objective === 'Sales' ? Math.floor(Math.random() * 1) : 0),
                    follows: c.performance.follows + (c.objective === 'Follows' ? Math.floor(Math.random() * 5) : 0),
                    blogClicks: c.performance.blogClicks + (c.objective === 'Blog Promotion' ? Math.floor(Math.random() * 20) : 0),
                }} : c
            ),
        };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, { ...action.payload, id: Date.now() }] };
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  login: (email: string) => void;
  logout: () => void;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'status' | 'performance' | 'createdAt'>) => void;
}>({
  state: initialState,
  dispatch: () => null,
  login: () => {},
  logout: () => {},
  addCampaign: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (email: string) => {
    const user: User = { id: 'user-123', email };
    dispatch({ type: 'LOGIN', payload: user });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Welcome back, ${email}!`, type: 'success' } });
  };
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'You have been logged out.', type: 'info' } });
  };

  const addCampaign = useCallback((campaignData: Omit<Campaign, 'id' | 'status' | 'performance' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `campaign-${Date.now()}`,
      status: CampaignStatus.Pending,
      performance: { views: 0, engagements: 0, leads: 0, sales: 0, follows: 0, blogClicks: 0 },
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_CAMPAIGN', payload: newCampaign });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Campaign created successfully!', type: 'success' } });

    setTimeout(() => {
        dispatch({ type: 'UPDATE_CAMPAIGN_STATUS', payload: { id: newCampaign.id, status: CampaignStatus.Active }});
        dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Campaign "${newCampaign.name}" is now active!`, type: 'info' } });
    }, 5000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        state.campaigns.forEach(c => {
            if(c.status === CampaignStatus.Active) {
                dispatch({ type: 'UPDATE_CAMPAIGN_PERFORMANCE', payload: { id: c.id }});
            }
        })
    }, 3000);

    return () => clearInterval(interval);
  }, [state.campaigns]);

  return (
    <AppContext.Provider value={{ state, dispatch, login, logout, addCampaign }}>
      {children}
    </AppContext.Provider>
  );
};
