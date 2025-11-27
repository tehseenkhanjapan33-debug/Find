
import React from 'react';
import { Campaign } from '../types';
import { CampaignStatus } from '../constants';

const StatusBadge = ({ status }: { status: CampaignStatus }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
    const statusClasses = {
        [CampaignStatus.Active]: "bg-green-100 text-green-800",
        [CampaignStatus.Pending]: "bg-yellow-100 text-yellow-800 animate-pulse",
        [CampaignStatus.Completed]: "bg-gray-100 text-gray-800",
    };
    return (
        <span className={`${baseClasses} ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

const Metric = ({ label, value }: { label: string; value: number }) => (
    <div className="text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
);

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { name, status, platform, objective, performance, createdAt, audience } = campaign;
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Objective: <span className="font-medium text-gray-700">{objective}</span> on <span className="font-medium text-gray-700">{platform}</span>
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-700 mb-4">Performance</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                <Metric label="Views" value={performance.views} />
                <Metric label="Engagements" value={performance.engagements} />
                <Metric label="Leads" value={performance.leads} />
                <Metric label="Sales" value={performance.sales} />
                <Metric label="Follows" value={performance.follows} />
                <Metric label="Blog Clicks" value={performance.blogClicks} />
            </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <p>Created: {new Date(createdAt).toLocaleString()}</p>
                <div className="flex gap-2 items-center">
                    <span className="font-semibold">Audience:</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{audience.ageRange}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{audience.gender}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded truncate max-w-xs" title={audience.interests.join(', ')}>{audience.interests.join(', ')}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
