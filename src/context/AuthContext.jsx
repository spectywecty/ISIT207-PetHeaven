import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const MEMBERS_KEY = "ph_members";
const CURRENT_KEY = "ph_current";

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export function AuthProvider({ children }) {
  const [member, setMember] = useState(() => read(CURRENT_KEY, null));

  useEffect(() => {
    if (member) localStorage.setItem(CURRENT_KEY, JSON.stringify(member));
    else localStorage.removeItem(CURRENT_KEY);
  }, [member]);

  const register = data => {
    const m = {
      fullName: data.fullName,
      email: data.email.trim().toLowerCase(),
      phone: data.phone,
    };
    const others = read(MEMBERS_KEY, []).filter(x => x.email !== m.email);
    localStorage.setItem(MEMBERS_KEY, JSON.stringify([...others, m]));
    setMember(m); // registering also logs the member in
  };

  const login = emailAddress => {
    const found = read(MEMBERS_KEY, []).find(
      x => x.email === emailAddress.trim().toLowerCase()
    );
    if (!found) return false;
    setMember(found);
    return true;
  };

  const logout = () => setMember(null);

  return (
    <AuthContext.Provider value={{ member, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
