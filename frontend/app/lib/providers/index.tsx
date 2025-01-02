import { AppProvider } from "./app.provider";
import { ThemeProvider } from "./theme.provider";
import { ToastProvider } from "./toast.provider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppProvider>{children}</AppProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
