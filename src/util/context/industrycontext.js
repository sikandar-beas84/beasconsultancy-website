import { createContext, useContext, useEffect, useState } from "react";
import HomeService from "../service/Home";

const IndustryContext = createContext();

export const IndustryProvider = ({ children }) => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchIndustries = async () => {
      try {
        const res = await HomeService.menuIndustryPage();
        if (mounted) {
          setIndustries(res?.data?.industries?.children || []);
        }
      } catch (err) {
        console.error("Industry menu fetch failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchIndustries();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <IndustryContext.Provider value={{ industries, loading }}>
      {children}
    </IndustryContext.Provider>
  );
};

export const useIndustries = () => useContext(IndustryContext);
