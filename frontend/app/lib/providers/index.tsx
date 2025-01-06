import { ShoppingCartProvider } from "./shoopping-cart.provider";
import { AppThemeProvider } from "./theme.provider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <ShoppingCartProvider>{children}</ShoppingCartProvider>
    </AppThemeProvider>
  );
}
