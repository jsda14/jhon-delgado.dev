import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLocale = 'es-CO' | 'en';

interface LocaleContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getLocaleFromPath = (): SupportedLocale => {
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      return 'en';
    }
    return 'es-CO'; // default
  };

  const [locale, setLocaleState] = useState<SupportedLocale>(getLocaleFromPath);

  useEffect(() => {
    // Redirigir la raíz '/' a '/es' para normalizar la ruta
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      window.history.replaceState(null, '', `/es${window.location.hash}`);
      setLocaleState('es-CO');
    }
  }, []);

  useEffect(() => {
    // Sincronizar el estado cuando el usuario navegue hacia atrás/adelante en el historial
    const handlePopState = () => {
      setLocaleState(getLocaleFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    
    // Cambiar la ruta manteniendo el hash de ancla (ej: /es#proyectos)
    const hash = window.location.hash;
    const newPath = newLocale === 'en' ? `/en${hash}` : `/es${hash}`;
    
    window.history.pushState(null, '', newPath);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale debe ser usado dentro de un LocaleProvider');
  }
  return context;
};
