import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSanta } from '../context/SantaContext';
import { Users, ArrowRight } from 'lucide-react';

const HomePage = () => {
    const [groupName, setGroupName] = useState('');
    const [passcode, setPasscode] = useState('');
    const { createGroup } = useSanta();
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const group = await createGroup(groupName, passcode);
            navigate(`/admin/${group._id}`);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="text-center space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Start a New Exchange</h2>
                <p className="text-white/70">Create a group, invite friends, and let the magic happen.</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-6 text-left glass-panel p-6 rounded-xl">
                <div>
                    <label className="block text-santa-gold font-bold text-sm mb-2 uppercase tracking-wider">Group Name</label>
                    <input 
                        type="text" 
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full p-4 rounded-xl input-field text-santa-green focus:outline-none"
                        placeholder="e.g. The Office Party"
                        required
                    />
                </div>
                <div>
                    <label className="block text-santa-gold font-bold text-sm mb-2 uppercase tracking-wider">Admin Passcode (Secure your group)</label>
                    <input 
                        type="text" 
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full p-4 rounded-xl input-field text-santa-green focus:outline-none"
                        placeholder="Secret123"
                        required
                    />
                </div>
                
                <button 
                    type="submit"
                    className="w-full btn-primary font-bold py-4 px-6 rounded-xl text-xl shadow-lg flex items-center justify-center gap-2"
                >
                    Create Group <ArrowRight size={24}/>
                </button>
            </form>

            <div className="pt-8 border-t border-white/10">
                <p className="text-white/50 text-sm">Have a link? Just open it directly to see your match.</p>
            </div>
        </div>
    );
};

export default HomePage;
