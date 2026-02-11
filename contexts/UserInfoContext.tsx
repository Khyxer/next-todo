"use client";

import { createContext, useState, useContext, useEffect } from "react";

interface UserInfoContextType {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  userTasks: any[];
  setUserTasks: (userTasks: any[]) => void;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined,
);

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userTasks, setUserTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener datos del usuario
  const refreshUserData = async () => {
    try {
      setIsLoading(true);

      // Llamada para obtener info del usuario
      const userResponse = await fetch("/api/user/me");
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserInfo(userData);
        console.log(userData);
      }

      // Llamada para obtener tareas
      //   const tasksResponse = await fetch("/api/tasks");
      //   if (tasksResponse.ok) {
      //     const tasksData = await tasksResponse.json();
      //     setUserTasks(tasksData);
      //   }
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userTasks,
        setUserTasks,
        isLoading,
        refreshUserData,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo debe usarse dentro de UserInfoProvider");
  }
  return context;
};
