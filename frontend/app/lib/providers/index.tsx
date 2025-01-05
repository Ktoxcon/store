import { AppProvider } from "./app.provider";
import { AppThemeProvider } from "./theme.provider";
import { ToastProvider } from "./toast.provider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <ToastProvider>
        <AppProvider>{children}</AppProvider>
      </ToastProvider>
    </AppThemeProvider>
  );
}
