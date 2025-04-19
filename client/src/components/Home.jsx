import React from 'react';
import StartApplication from './StartApplication';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Online Citizenship Application Portal
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Apply for citizenship easily and securely through our online portal. Start your journey towards citizenship today.
          </p>
          
          <div className="flex justify-center mb-16">
            <StartApplication />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Easy Process</h3>
              <p className="text-gray-300">
                Simple and straightforward application process with step-by-step guidance.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
              <p className="text-gray-300">
                Your information is protected with state-of-the-art security measures.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Fast Processing</h3>
              <p className="text-gray-300">
                Track your application status in real-time through your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 