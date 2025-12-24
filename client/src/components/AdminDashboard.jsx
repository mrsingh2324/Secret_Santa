import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSanta } from '../context/SantaContext';
import ParticipantForm from './ParticipantForm';
import { User, CheckCircle, Gift, Loader } from 'lucide-react';

const AdminDashboard = () => {
  const { groupId } = useParams();
  const { currentGroup, addParticipant, generateMatches, fetchGroup, loading, error } = useSanta();
  
  useEffect(() => {
    if (groupId && (!currentGroup || currentGroup._id !== groupId)) {
        fetchGroup(groupId);
    }
  }, [groupId]);

  if (loading && !currentGroup) return <div className="text-white text-center mt-10"><Loader className="animate-spin inline"/> Loading Group...</div>;
  if (error) return <div className="text-red-200 text-center mt-10">{error}</div>;
  if (!currentGroup) return <div className="text-white text-center mt-10">Group not found.</div>;

  const handleAddParticipant = async (data) => {
    await addParticipant(currentGroup._id, data);
  };

  const handleMatch = async () => {
    if (confirm("Are you sure? This will lock the group and generate matches.")) {
        await generateMatches(currentGroup._id, currentGroup.adminPasscode);
    }
  };

  const isLocked = currentGroup?.status === 'matched';

  return (
    <div className="space-y-6">
      <div className="bg-white/10 p-4 rounded-xl text-center">
        <h2 className="text-3xl font-holiday text-santa-gold">{currentGroup.name}</h2>
        <div className="my-4 space-y-2">
            <div className="bg-black/20 p-3 rounded-lg border border-santa-gold/30">
                <label className="text-xs text-santa-gold uppercase tracking-wider font-bold">Invite Link to Share</label>
                <code className="block bg-black/20 p-2 rounded select-all text-white/90 mt-1 cursor-pointer hover:bg-black/40 transition-colors"
                   onClick={(e) => {
                       navigator.clipboard.writeText(`${window.location.origin}/join/${currentGroup._id}`);
                       alert("Copied Invite Link!");
                   }}>
                    {window.location.origin}/join/{currentGroup._id}
                </code>
            </div>
        </div>
        <p className="text-xs mt-2 opacity-60">Admin Passcode: {currentGroup.adminPasscode}</p>
      </div>

      <details className="cursor-pointer group">
          <summary className="text-white/50 text-sm hover:text-white transition-colors mb-2">Admin Override: Manually Add Participant</summary>
          <ParticipantForm onAdd={handleAddParticipant} isLocked={isLocked} />
      </details>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <User size={20}/> Participants ({currentGroup.participants.length})
            </h3>
            <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">Real-time Sync Active</span>
        </div>
        
        {currentGroup.participants.length === 0 && (
            <p className="text-white/50 italic text-center py-4">No participants yet. Add some elves!</p>
        )}

        <div className="grid gap-2">
            {currentGroup.participants.map((p) => (
                <div key={p._id} className="bg-white/80 text-santa-green p-3 rounded flex items-center justify-between">
                    <div>
                        <div className="font-bold flex items-center gap-2">
                            {p.name}
                            <span className="bg-santa-gold text-santa-red text-xs px-2 py-0.5 rounded-full font-mono">{p.code}</span>
                        </div>
                        <div className="text-xs opacity-80">{p.email}</div>
                    </div>
                    {p.assignedTo && <Gift className="text-santa-red" size={20} />}
                </div>
            ))}
        </div>
      </div>

      {!isLocked && currentGroup.participants.length >= 2 && (
          <button 
            onClick={handleMatch}
            disabled={loading}
            className="w-full btn-primary font-bold py-4 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            {loading ? <Loader className="animate-spin"/> : <Gift size={28}/>} Generate Matches
          </button>
      )}

      {isLocked && (
          <div className="bg-santa-green/20 border border-santa-green p-4 rounded-xl text-center text-green-200">
              <CheckCircle className="inline-block mb-2" size={32} />
              <h3 className="text-xl font-bold">Matches Generated!</h3>
              <p>The Secret Santa has been assigned. Send the link to everyone!</p>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;
