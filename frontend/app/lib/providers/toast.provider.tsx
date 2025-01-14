import * as Toast from "@radix-ui/react-toast";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useState, type ReactNode } from "react";
import { ToastContext, type ShowToastArgs } from "../context/toast.context";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ShowToastArgs>({
    title: "",
    description: "",
  });

  const show = (args: ShowToastArgs) => {
    setOpen(true);
    setContent(args);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <Toast.Provider swipeDirection="right" duration={1500}>
        <Toast.Root asChild open={open} onOpenChange={setOpen}>
          <Card>
            <Flex direction="column" gap="4">
              <Toast.Title>
                <Heading>{content.title}</Heading>
              </Toast.Title>
              <Toast.Description>{content.description}</Toast.Description>
              <Toast.Action asChild altText="Close">
                <Button>Close</Button>
              </Toast.Action>
            </Flex>
          </Card>
        </Toast.Root>
        <Toast.Viewport asChild>
          <Flex
            top="20%"
            width="390px"
            position="fixed"
            maxWidth="100dvw"
            direction="column"
            style={{ zIndex: "100" }}
            left={{ initial: "0", lg: "9" }}
          />
        </Toast.Viewport>
      </Toast.Provider>
      {children}
    </ToastContext.Provider>
  );
}
