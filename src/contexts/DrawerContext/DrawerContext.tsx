import * as React from 'react';

interface DrawerContextProps {
  open: boolean;
  setOpenDrawer: () => void;
}

const DrawerContext = React.createContext<DrawerContextProps | undefined>(
  undefined
);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  const setOpenDrawer = () => setOpen((prev) => !prev);

  return (
    <DrawerContext.Provider value={{ open, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
