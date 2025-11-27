
import React from 'react';
import { Link } from 'react-router-dom';

const StepCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="text-5xl mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="text-center">
      <section className="py-20 sm:py-32">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Launch Your Vision with{' '}
          <span className="text-primary">Free Campaigns</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Effortlessly create, launch, and track your marketing campaigns on major platforms. Get started in minutes, for free.
        </p>
        <div className="mt-10">
          <Link
            to="/signup"
            className="inline-block bg-primary text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-300"
          >
            Create Your First Campaign
          </Link>
        </div>
      </section>

      <section className="py-20 bg-gray-100 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">A simple, streamlined process to get your message out there.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard icon="✍️" title="1. Create" description="Define your campaign objective, select your platform, and set up your target audience with our easy-to-use form." />
            <StepCard icon="🚀" title="2. Launch" description="Submit your campaign. Our system handles the rest, automatically reaching the right people." />
            <StepCard icon="📊" title="3. Track" description="Monitor your campaign's performance in real-time from your personal dashboard. Watch your impact grow." />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
