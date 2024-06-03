import React, { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
        isEmailVerified,
        setIsEmailVerified,
        user,
        setUser,
        logout,
        setShopIds,
        setLastShopNumber,
        lastShopNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
