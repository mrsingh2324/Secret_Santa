import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  onSnapshot, 
  updateDoc, 
  arrayUnion,
  Timestamp 
} from 'firebase/firestore';

const SantaContext = createContext();

export const useSanta = () => useContext(SantaContext);

export const SantaProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper: Shuffle array
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Helper: Timeout wrapper for Firebase operations
  const withTimeout = (promise, timeoutMs = 10000) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(
          'Firebase operation timed out. Please ensure Firestore is enabled in your Firebase Console at https://console.firebase.google.com/'
        )), timeoutMs)
      )
    ]);
  };

  // Real-time listener for a group
  const fetchGroup = (groupId) => {
    setLoading(true);
    try {
        const docRef = doc(db, "groups", groupId);
        // We do not return the unsubscribe function here because we want the listener to persist
        // while the user is in the app. In a more complex app, we would manage subscriptions better.
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setCurrentGroup({ _id: docSnap.id, ...docSnap.data() });
                setError(null);
            } else {
                setError("Group not found");
                setCurrentGroup(null);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore Error:", err);
            setError(err.message);
            setLoading(false);
        });
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
  };

  const createGroup = async (name, adminPasscode) => {
    setLoading(true);
    try {
      const docRef = await withTimeout(
        addDoc(collection(db, "groups"), {
          name,
          adminPasscode,
          participants: [],
          status: 'open',
          createdAt: Timestamp.now()
        })
      );
      const newGroup = { _id: docRef.id, name, adminPasscode, participants: [], status: 'open' };
      setCurrentGroup(newGroup);
      return newGroup;
    } catch (err) {
      setError("Failed to create group: " + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = async (groupId, data) => {
    try {
      const docRef = doc(db, "groups", groupId);
      const newIdx = Math.random().toString(36).substr(2, 9);
      const participant = {
          _id: newIdx,
          name: data.name,
          email: data.email || "",
          code: data.code, 
          wishlist: data.wishlist || []
      };

      await withTimeout(
        updateDoc(docRef, {
          participants: arrayUnion(participant)
        })
      );
    } catch (err) {
      setError("Failed to join: " + err.message);
      throw err;
    }
  };

  const generateMatches = async (groupId, adminPasscode) => {
    if (currentGroup.adminPasscode !== adminPasscode) {
        throw new Error("Invalid Admin Passcode");
    }
    if (currentGroup.participants.length < 2) {
        throw new Error("Not enough participants!");
    }

    setLoading(true);
    try {
      const docRef = doc(db, "groups", groupId);
      
      let participants = JSON.parse(JSON.stringify(currentGroup.participants));
      let shuffled = shuffle([...participants]);
      
      for (let i = 0; i < shuffled.length; i++) {
        const giver = shuffled[i];
        const receiver = shuffled[(i + 1) % shuffled.length];
        
        const pIndex = participants.findIndex(p => p._id === giver._id);
        participants[pIndex].assignedTo = {
            id: receiver._id,
            name: receiver.name,
            wishlist: receiver.wishlist
        };
      }

      await withTimeout(
        updateDoc(docRef, {
          participants: participants,
          status: 'matched'
        })
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SantaContext.Provider value={{
      currentGroup,
      loading,
      error,
      fetchGroup,
      createGroup,
      addParticipant,
      generateMatches
    }}>
      {children}
    </SantaContext.Provider>
  );
};
export default SantaProvider;
