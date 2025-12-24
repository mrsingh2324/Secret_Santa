import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSanta } from '../context/SantaContext';
import confetti from 'canvas-confetti';
import { Gift, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const RevealPage = () => {
    const { groupId } = useParams();
    const { fetchGroup, currentGroup, loading, error } = useSanta();
    const [selectedId, setSelectedId] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [match, setMatch] = useState(null);
    const [revealing, setRevealing] = useState(false);

    useEffect(() => {
        if (groupId) fetchGroup(groupId);
    }, [groupId]);

    const handleReveal = async (e) => {
        e.preventDefault();
        
        if (!selectedId) {
            alert("Please select your name first!");
            return;
        }
        
        if (!secretCode.trim()) {
            alert("Please enter your secret code!");
            return;
        }

        setRevealing(true);

        try {
            // Find participant in local data
            const participant = currentGroup.participants.find(p => p._id === selectedId);
            
            if (!participant) {
                alert("Participant not found.");
                setRevealing(false);
                return;
            }

            // Client-side code verification
            if (participant.code !== secretCode.trim()) {
                alert("Incorrect Code! Try again.");
                setRevealing(false);
                setSecretCode(''); // Clear the input
                return;
            }

            if (!participant.assignedTo) {
                 alert("Matches haven't been generated yet! Ask the Admin.");
                 setRevealing(false);
                 return;
            }

            // Success
            setMatch({
                matchName: participant.assignedTo.name,
                matchWishlist: participant.assignedTo.wishlist || []
            });
            
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#D42426', '#165B33', '#F8B229']
            });
            
        } catch (e) {
            console.error(e);
            alert("Something went wrong.");
        } finally {
            setRevealing(false);
        }
    };

    if (loading && !currentGroup) return <div className="text-center text-white p-10">Loading snow...</div>;
    if (error) return <div className="text-center text-red-200 p-10">{error}</div>;
    if (!currentGroup) return <div className="text-center text-white p-10">Group not found.</div>;

    if (match) {
        return (
            <div className="text-center space-y-6 animate-fade-in glass-panel p-8 rounded-xl max-w-2xl mx-auto mt-10">
                <h2 className="text-3xl font-holiday text-santa-gold">You are the Secret Santa for...</h2>
                
                <div className="bg-white text-santa-red p-8 rounded-full w-64 h-64 mx-auto flex flex-col items-center justify-center shadow-2xl border-4 border-santa-gold transform hover:rotate-2 transition-transform">
                    <h3 className="text-4xl font-bold mb-2">{match.matchName}</h3>
                    <Gift size={48} className="text-santa-green animate-bounce" />
                </div>

                <div className="bg-black/20 p-6 rounded-xl text-left">
                    <h4 className="text-lg font-bold text-santa-gold mb-2">Their Wishlist:</h4>
                    <ul className="list-disc list-inside space-y-2 text-white/90">
                        {match.matchWishlist.length > 0 ? (
                            match.matchWishlist.map((w, i) => <li key={i}>{w}</li>)
                        ) : (
                            <li className="italic opacity-50">No preferences listed. Surprise them!</li>
                        )}
                    </ul>
                </div>
                
                <button onClick={() => setMatch(null)} className="text-white/60 hover:text-white underline">
                    Back
                </button>
            </div>
        );
    }

    // Selection View
    return (
        <div className="space-y-6 text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-white">Who are you?</h2>
            <p className="text-white/70 text-sm">Find your name and enter your secret code to reveal your match!</p>
            
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {currentGroup.participants.map(p => (
                    <button
                        key={p._id}
                        type="button"
                        onClick={() => {
                            setSelectedId(p._id);
                            setSecretCode(''); // Clear code when switching participants
                        }}
                        className={`p-3 rounded-lg text-left transition-all flex items-center justify-between group ${
                            selectedId === p._id 
                            ? 'bg-santa-gold text-santa-red font-bold shadow-lg scale-102' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                        <span>{p.name}</span>
                        {selectedId === p._id && <Gift size={16} className="animate-pulse"/>}
                    </button>
                ))}
            </div>

            <form onSubmit={handleReveal} className="space-y-4 mt-6">
                <div className="glass-panel p-4 rounded-xl text-left">
                    <label className="block text-santa-gold font-bold text-sm mb-2 uppercase tracking-wider">
                        🔐 Enter Your Secret Code
                    </label>
                    <input 
                        type="password"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        className="w-full p-4 rounded-xl bg-white/90 text-santa-green focus:outline-none focus:ring-2 focus:ring-santa-gold border-2 border-transparent focus:border-santa-gold transition-all"
                        placeholder="Your secret code..."
                        disabled={!selectedId || revealing}
                        autoComplete="off"
                    />
                    {!selectedId && (
                        <p className="text-white/50 text-xs mt-2 italic">
                            ↑ Select your name first
                        </p>
                    )}
                </div>
                
                <button 
                    type="submit"
                    disabled={!selectedId || !secretCode.trim() || revealing}
                    className="w-full bg-santa-red border-2 border-dashed border-santa-gold hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase tracking-widest font-holiday"
                >
                    {revealing ? 'Unwrapping...' : 'Reveal My Match! 🎁'}
                </button>
            </form>
            
            <Link to="/" className="inline-block mt-8 text-white/50 text-xs hover:text-white flex items-center justify-center gap-1">
                <Home size={12}/> create new group
            </Link>
        </div>
    );
};

export default RevealPage;
