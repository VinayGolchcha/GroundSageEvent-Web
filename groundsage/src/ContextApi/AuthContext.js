import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();
const safeJSONParse = (value, defaultValue) => {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return defaultValue;
  }
};
const AuthProvider = ({ children }) => {
  const [eventIds, setEventIds] = useState(() => safeJSONParse(localStorage.getItem("eventIds"), []));
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(() => safeJSONParse(localStorage.getItem("activeEvent"), []));
  const [activeEventId, setActiveEventId] = useState(() => safeJSONParse(localStorage.getItem("activeEventId"), null));
  const [activeEventName, setActiveEventName] = useState(() => safeJSONParse(localStorage.getItem("activeEventName"), null));
  const [transectionTag, setTransectionTag] = useState(() => safeJSONParse(localStorage.getItem("transectionTag"), null));
  const [transectionType, setTransectionType] = useState(() => safeJSONParse(localStorage.getItem("transectionType"), null));
  const [isEmailVerified, setIsEmailVerified] = useState(() => safeJSONParse(localStorage.getItem("isEmailVerified"), false));
  const [lastShopNumber, setLastShopNumber] = useState(() => safeJSONParse(localStorage.getItem("lastShopNumber"), null));
  const [user, setUser] = useState(() => safeJSONParse(localStorage.getItem("user"), null));
  const [shopIds, setShopIds] = useState(() => safeJSONParse(localStorage.getItem("shopIds"), []));
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
