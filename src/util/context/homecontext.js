import { createContext, useContext, useEffect, useState } from "react";
import HomeService from "../service/Home";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchHome = async () => {
      try {
        const res = await HomeService.homePage();
        if (mounted) setHomeData(res?.data || {});
      } catch (err) {
        console.error("Home data fetch failed", err);
        if (mounted) setHomeData({});
      }finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHome();
  }, []);

  return (
    <HomeContext.Provider value={{ homeData, loading  }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
