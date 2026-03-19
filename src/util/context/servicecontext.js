import { createContext, useContext, useEffect, useState } from "react";
import HomeService from "../service/Home";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchServices = async () => {
      try {
        const res = await HomeService.menuServicePage();
        if (mounted) {
          setServices(res?.data?.services?.children || []);
        }
      } catch (err) {
        console.error("Service menu fetch failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchServices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ServiceContext.Provider value={{ services, loading }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);