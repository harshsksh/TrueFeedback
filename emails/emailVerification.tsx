import {
    Html, Head, Font, Preview,
    Heading, Row, Section, Text, Button,
} from '@react-email/components';

interface VerificationEmailProps {
    username: string;
    otp: string ;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>

            <Preview>Here&apos;s your verification code: {otp}</Preview>

            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please use the following
                        verification code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        letterSpacing: "8px",
                        color: "#61dafb",
                        textAlign: "center",
                        padding: "20px",
                        backgroundColor: "#f4f4f4",
                        borderRadius: "8px"
                    }}>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text style={{ color: "#666", fontSize: "14px" }}>
                        This code will expire in <strong>10 minutes</strong>.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code, please ignore this email.
                    </Text>
                </Row>
                <Row>
                    <Button
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/verify/${username}`}
                        style={{
                            color: "#ffffff",
                            backgroundColor: "#61dafb",
                            padding: "12px 24px",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            textDecoration: "none",
                            display: "inline-block"
                        }}
                    >
                        Verify here
                    </Button>
                </Row>
            </Section>
        </Html>
    );
}