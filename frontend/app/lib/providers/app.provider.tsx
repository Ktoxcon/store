import { ApplicationContext } from "../context/app.context";

export function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApplicationContext.Provider value={{}}>
      {children}
    </ApplicationContext.Provider>
  );
}
