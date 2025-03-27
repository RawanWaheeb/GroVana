





import { createContext, useState, useEffect } from "react";

export const userContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(null);  
  
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);  
    }
  }, []);  

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken); 
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); 

  function Logout() {
    setToken(null);  
    localStorage.removeItem("accessToken");  

    window.dispatchEvent(new Event("authChange")); 

    setTimeout(() => {
      window.location.replace("/login");  
    }, 100); 
  }

  return (
    <userContext.Provider value={{ token, setToken, Logout }}>
      {children}
    </userContext.Provider>
  );
}




