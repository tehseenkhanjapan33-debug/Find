
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { CampaignObjective, CampaignPlatform, Gender, AgeRanges } from '../constants';
import { suggestInterests } from '../services/geminiService';

const CreateCampaignPage: React.FC = () => {
    const { addCampaign } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [objective, setObjective] = useState<CampaignObjective>(CampaignObjective.Views);
    const [platform, setPlatform] = useState<CampaignPlatform>(CampaignPlatform.Instagram);
    const [url, setUrl] = useState('');
    const [ageRange, setAgeRange] = useState(AgeRanges[0]);
    const [gender, setGender] = useState<Gender>(Gender.All);
    const [interests, setInterests] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleSuggestInterests = async () => {
        setIsSuggesting(true);
        try {
            const suggested = await suggestInterests(objective, platform, name);
            setInterests(suggested);
        } catch (error) {
            console.error("Failed to suggest interests:", error);
            // Optionally, show a notification to the user
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCampaign({
            name,
            objective,
            platform,
            url,
            audience: {
                ageRange,
                gender,
                interests: interests.split(',').map(i => i.trim()).filter(Boolean),
            },
        });
        navigate('/dashboard');
    };
    
    const isBlogPlatform = platform === CampaignPlatform.BlogURL;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a New Campaign</h1>
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
                
                {/* Campaign Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Campaign Details</h2>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="objective" className="block text-sm font-medium text-gray-700">Objective</label>
                            <select id="objective" value={objective} onChange={e => setObjective(e.target.value as CampaignObjective)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm">
                                {Object.values(CampaignObjective).map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
                            <select id="platform" value={platform} onChange={e => setPlatform(e.target.value as CampaignPlatform)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm">
                                {Object.values(CampaignPlatform).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">{isBlogPlatform ? 'Blog URL' : 'Media/Link URL'}</label>
                        <input type="url" id="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/your-content" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                </div>

                {/* Audience Targeting */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Audience Targeting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">Age Range</label>
                            <select id="ageRange" value={ageRange} onChange={e => setAgeRange(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm">
                                {AgeRanges.map(age => <option key={age} value={age}>{age}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select id="gender" value={gender} onChange={e => setGender(e.target.value as Gender)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm">
                                {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests</label>
                        <textarea id="interests" value={interests} onChange={e => setInterests(e.target.value)} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" placeholder="e.g., Hiking, Digital Marketing, Coffee"></textarea>
                        <div className="mt-2 flex justify-end">
                            <button type="button" onClick={handleSuggestInterests} disabled={isSuggesting} className="text-sm font-medium text-primary hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSuggesting ? 'Generating...' : '✨ Suggest with AI'}
                            </button>
                        </div>
                         <p className="mt-1 text-xs text-gray-500">Separate interests with a comma.</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <button type="button" onClick={() => navigate('/dashboard')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Launch Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCampaignPage;
