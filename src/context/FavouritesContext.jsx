import { createContext, useContext, useState, useEffect } from "react";

const KEY = "ph_favs";
const FavouritesContext = createContext({ ids: [], toggle: () => {}, isFav: () => false });

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
};

export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* storage unavailable */ }
  }, [ids]);

  const toggle = id =>
    setIds(cur => (cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]));
  const isFav = id => ids.includes(id);

  return (
    <FavouritesContext.Provider value={{ ids, toggle, isFav }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
