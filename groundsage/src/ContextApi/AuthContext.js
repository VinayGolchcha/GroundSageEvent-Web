import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [eventIds, setEventIds] = useState(() => {
    const saved = localStorage.getItem("eventIds");
    return saved !== null ? JSON.parse(saved) : [];
  });
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(() => {
    const saved = localStorage.getItem("activeEvent");
    return saved !== null ? JSON.parse(saved) : [];
  });
  const [activeEventId, setActiveEventId] = useState(() => {
    const saved = localStorage.getItem("activeEventId");
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [activeEventName, setActiveEventName] = useState(() => {
    const saved = localStorage.getItem("activeEventName");
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [transectionTag, setTransectionTag] = useState(() => {
    const saved = localStorage.getItem("transectionTag");
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [transectionType, setTransectionType] = useState(() => {
    const saved = localStorage.getItem("transectionType");
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [isEmailVerified, setIsEmailVerified] = useState(() => {
    const saved = localStorage.getItem("isEmailVerified");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [lastShopNumber, setLastShopNumber] = useState(() => {
    const saved = localStorage.getItem("lastShopNumber");
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved !== null ? JSON.parse(saved) : null;
  });
  const [shopIds, setShopIds] = useState(() => {
    const saved = localStorage.getItem("shopIds");
    return saved !== null ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isEmailVerified", JSON.stringify(isEmailVerified));
  }, [isEmailVerified]);

  useEffect(() => {
    localStorage.setItem("lastShopNumber", JSON.stringify(lastShopNumber));
  }, [lastShopNumber]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("shopIds", JSON.stringify(shopIds));
  }, [shopIds]);

  useEffect(() => {
    localStorage.setItem("eventIds", JSON.stringify(eventIds));
  }, [eventIds]);

  useEffect(() => {
    localStorage.setItem("activeEvent", JSON.stringify(activeEvent));
  }, [activeEvent]);

  useEffect(() => {
    localStorage.setItem("activeEventId", JSON.stringify(activeEventId));
  }, [activeEventId]);

  useEffect(() => {
    localStorage.setItem("activeEventName", JSON.stringify(activeEventName));
  }, [activeEventName]);

  useEffect(() => {
    localStorage.setItem("transectionTag", JSON.stringify(transectionTag));
  }, [transectionTag]);

  useEffect(() => {
    localStorage.setItem("transectionType", JSON.stringify(transectionType));
  }, [transectionType]);

  const addTransection = async (body) => {
    const newbody = {
      ...body,
      event_id: activeEventId,
      tag: transectionTag,
      type: transectionType,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/transaction/add-transaction`,
        newbody,
        {
          headers: {
            authorization: `${user?.token}`, // Ensure the token format is correct
            Accept: "application/json",
            role_id: user?.role_id,
          },
        }
      );
      toast.success("Transection added successfully", {
        style: {
          // Change font color
          fontSize: "16px", // Change font size
          fontFamily: "Inter", // Change font family
          fontWeight: "600", // Change font weight
          color: "rgb(66, 92, 90)",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    if (!user) return;

    const token = user.token;
    try {
      const response = await fetch(
        `https://groundsageevent-be.onrender.com/api/v1/profile/logout/${user.user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        setIsEmailVerified(false);
        setUser(null);
        setShopIds([]);
        setLastShopNumber(null);
        setActiveEvent([]);
        setActiveEventId(null);
        setActiveEventName(null);
        setTransectionTag(null);
        setTransectionType(null);
        localStorage.clear();
        navigate("/signin");
        console.log("Logout successful");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        activeEventName,
        setActiveEventName,
        isEmailVerified,
        setIsEmailVerified,
        user,
        setUser,
        logout,
        setShopIds,
        setEventIds,
        eventIds,
        setActiveEvent,
        activeEvent,
        events,
        setEvents,
        activeEventId,
        setActiveEventId,
        setLastShopNumber,
        lastShopNumber,
        addTransection,
        transectionTag,
        setTransectionTag,
        transectionType,
        setTransectionType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
