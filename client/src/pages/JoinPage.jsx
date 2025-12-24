import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSanta } from '../context/SantaContext';
import ParticipantForm from '../components/ParticipantForm';
import { PartyPopper } from 'lucide-react';

const JoinPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { fetchGroup, currentGroup, addParticipant, error } = useSanta();
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if (groupId) fetchGroup(groupId);
    }, [groupId]);

    const handleJoin = async (data) => {
        try {
            await addParticipant(groupId, data);
            setJoined(true);
        } catch (e) {
            console.error(e);
        }
    };

    if (error) return <div className="text-center text-red-200 mt-10">{error}</div>;
    if (!currentGroup) return <div className="text-center text-white mt-10">Loading snow...</div>;

    if (joined) {
        return (
            <div className="glass-panel p-8 rounded-xl text-center max-w-lg mx-auto animate-fade-in">
                <PartyPopper size={64} className="mx-auto text-santa-gold mb-4" />
                <h2 className="text-3xl font-holiday text-santa-gold">You're In!</h2>
                <p className="text-white/80 my-4">
                    Sit tight! The Admin will shuffle the names soon.
                </p>
                <div className="bg-white/10 p-4 rounded-lg text-sm text-left">
                    <p className="font-bold text-santa-gold mb-2">Next Steps:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>The host will generate matches.</li>
                        <li>You will use your <strong>Secret Code</strong> to reveal your match.</li>
                        <li>Keep the Reveal Link safe!</li>
                    </ul>
                </div>
                <button 
                    onClick={() => navigate(`/reveal/${groupId}`)}
                    className="mt-6 text-white/50 hover:text-white underline text-sm"
                >
                    Go to Reveal Page (Wait here)
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Join {currentGroup.name}</h2>
                <p className="text-white/70">Enter your details to join the exchange.</p>
            </div>

            <ParticipantForm onAdd={handleJoin} isLocked={currentGroup.status === 'matched'} />
            
            {currentGroup.status === 'matched' && (
                 <div className="bg-red-500/20 border border-red-500/50 p-4 rounded text-center text-red-200">
                    Entries are closed! The matches have already been generated.
                 </div>
            )}
        </div>
    );
};

export default JoinPage;
