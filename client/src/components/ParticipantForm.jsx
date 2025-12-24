import React, { useState } from 'react';
import { Plus, Gift } from 'lucide-react';

const ParticipantForm = ({ onAdd, isLocked }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [wishlist, setWishlist] = useState(['', '', '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    
    // Filter empty wishes
    const validWishes = wishlist.filter(w => w.trim());
    
    if (!code) {
        alert("Please set a secret code!");
        return;
    }

    onAdd({ name, email, wishlist: validWishes, code });
    setName('');
    setEmail('');
    setCode('');
    setWishlist(['', '', '']);
  };

  const handleWishChange = (index, value) => {
    const newWishes = [...wishlist];
    newWishes[index] = value;
    setWishlist(newWishes);
  };

  if (isLocked) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 glass-panel p-6 rounded-xl relative">
      <h3 className="text-xl font-bold flex items-center gap-2 text-santa-gold font-holiday tracking-wider">
        <Plus size={24} /> {isLocked ? 'Start Exchange' : 'Join the Fun'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg input-field text-santa-green placeholder:text-gray-500/70 focus:outline-none"
          required
        />
        <input 
          type="email" 
          placeholder="Email (Optional)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg input-field text-santa-green placeholder:text-gray-500/70 focus:outline-none"
        />
      </div>

      <div className="bg-white/20 p-3 rounded-lg border border-santa-gold/30 my-4">
        <label className="block text-santa-gold font-bold text-xs mb-1 uppercase tracking-wider">Create a Secret Code</label>
        <input 
          type="text" 
          placeholder="e.g. 1234" 
          value={code} 
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 rounded-lg input-field text-santa-green placeholder:text-gray-500/70 focus:outline-none font-mono text-center tracking-widest text-lg"
          required
        />
        <p className="text-white/60 text-xs mt-1 text-center"> ⚠️ Remember this! You need it to see your match!</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-semibold opacity-90 flex items-center gap-2 text-santa-gold"><Gift size={16}/> 3 Gift Ideas (Wishlist)</label>
        {wishlist.map((wish, idx) => (
            <input 
              key={idx}
              type="text" 
              placeholder={`Gift Idea #${idx + 1}`}
              value={wish}
              onChange={(e) => handleWishChange(idx, e.target.value)}
              className="w-full p-3 rounded-lg input-field text-santa-green placeholder:text-gray-500/70 text-sm focus:outline-none"
            />
        ))}
      </div>

      <button 
        type="submit" 
        className="w-full btn-primary font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide"
      >
        Join Group
      </button>
    </form>
  );
};

export default ParticipantForm;
