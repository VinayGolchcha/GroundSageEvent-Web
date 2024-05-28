import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [shopIds, setShopIds] = useState([]);
  const [eventIds , setEventIds] = useState([]);
  const [events , setEvents] = useState([]);
  const [activeEvent , setActiveEvent] = useState([]);
  const [activeEventId ,setActiveEventId] = useState(null);



  const logout = async () => {
    console.log(user);
    const token = user.token; // Set your token here
    try {
      const response = await fetch(`https://groundsageevent-be.onrender.com/api/v1/profile/logout/${user.user_id}`, {
        method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,}
      });

      if (response.ok) {
        setIsEmailVerified(false);
        setUser(null);
        console.log('Logout successful');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isEmailVerified, setIsEmailVerified, user, setUser, logout,setShopIds , setEventIds , eventIds ,setActiveEvent , activeEvent , events , setEvents , activeEventId , setActiveEventId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
