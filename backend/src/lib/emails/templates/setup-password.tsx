import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Tailwind,
  Text,
} from "@react-email/components";

type SetupPasswordEmailTemplateProps = {
  body: string;
  name: string;
  email: string;
  title: string;
  setupLink: string;
};

export function SetupPasswordEmailTemplate({
  body,
  name,
  email,
  title,
  setupLink,
}: Readonly<SetupPasswordEmailTemplateProps>) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                {title}
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello <strong>{name}</strong>,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                {body}
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                <Button>
                  <Link href={setupLink}>Set Up Password</Link>
                </Button>
              </Text>

              <Text>Best Regards,</Text>
              <Text>The Store Team.</Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This recovery email was intended for{" "}
                <span className="text-black">{email}</span>. If you were not
                expecting this invitation, you can ignore this email. If you are
                concerned about your account&apos;s safety, please reply to this
                email to get in touch with us.
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </Tailwind>
  );
}
