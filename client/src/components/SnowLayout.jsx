import React from 'react';
import { Snowflake } from 'lucide-react';

const SnowLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-santa-red text-snow-white font-sans relative overflow-hidden">
      {/* Decorative Snowflakes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <Snowflake 
            key={i} 
            className="absolute animate-pulse" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 20}px`
            }} 
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
            <h1 className="text-5xl font-holiday text-santa-gold drop-shadow-md">
                Secret Santa
            </h1>
        </header>
        <main className="max-w-2xl mx-auto glass-panel rounded-xl p-8 shadow-2xl border border-white/20 relative z-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SnowLayout;
