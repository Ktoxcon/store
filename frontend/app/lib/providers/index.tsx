import { ShoppingCartProvider } from "./shoopping-cart.provider";
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
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </ToastProvider>
    </AppThemeProvider>
  );
}
