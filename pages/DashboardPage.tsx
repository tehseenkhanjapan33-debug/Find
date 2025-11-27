
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import CampaignCard from '../components/CampaignCard';

const DashboardPage: React.FC = () => {
  const { state } = useAppContext();
  const { campaigns } = state;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Campaigns</h1>
        <Link
          to="/create-campaign"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          + Create New Campaign
        </Link>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new campaign.</p>
          <div className="mt-6">
            <Link
              to="/create-campaign"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create Campaign
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
