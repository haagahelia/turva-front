import { ImageSourcePropType } from "react-native";

export type OnboardingStep = {
    key: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    buttonLabel: string;
};

// Available languages
export type Language = "en" | "fi";

export const ONBOARDING_STEPS: Record<Language, OnboardingStep[]> = {
    en: [
        {
            key: "first-step",
            title: "Welcome to TurvaApp!",
            description: "Let's learn about safety, together!",
            image: require("@/assets/images/HH_SafetyCharacters.png"),
            buttonLabel: "Next",
        },
        {
            key: "second-step",
            title: "Learn The Basics",
            description:
                "TurvaApp helps you learn about safety as well as how to apply what you've learned in real life scenarios.",
            image: require("@/assets/images/HH_Rules.png"),
            buttonLabel: "Next",
        },
        {
            key: "third-step",
            title: "Test Your Knowledge",
            description:
                "Learn by completing the safety orientation and test your knowledge with the quiz game TurvallisuusMestari.",
            image: require("@/assets/images/HH_SafetyWalk.png"),
            buttonLabel: "Next",
        },
        {
            key: "fourth-step",
            title: "Report Inappropriate Behavior",
            description:
                "On TurvaApp, it's also possible to send safety observation reports, report inappropriate behavior and much more. So, let's get started!",
            image: require("@/assets/images/HH_SafetyWalk.png"),
            buttonLabel: "Login",
        },
    ],
    fi: [
        {
            key: "first-step",
            title: "Tervetuloa TurvaAppiin!",
            description: "Opitaan turvallisuudesta yhdessä!",
            image: require("@/assets/images/HH_SafetyCharacters.png"),
            buttonLabel: "Seuraava",
        },
        {
            key: "second-step",
            title: "Opi perusteet",
            description:
                "TurvaApp auttaa sinua oppimaan turvallisuudesta sekä soveltamaan opittua käytännön tilanteissa.",
            image: require("@/assets/images/HH_Rules.png"),
            buttonLabel: "Seuraava",
        },
        {
            key: "third-step",
            title: "Testaa tietosi",
            description:
                "Opettele suorittamalla turvallisuusperehdytys ja testaa tietosi TurvallisuusMestari-pelissä.",
            image: require("@/assets/images/HH_SafetyWalk.png"),
            buttonLabel: "Seuraava",
        },
        {
            key: "fourth-step",
            title: "Ilmoita sopimattomasta käytöksestä",
            description:
                "TurvaAppissa voit myös lähettää havaintoraportteja, ilmoittaa sopimattomasta käytöksestä ja paljon muuta. Aloitetaan siis!",
            image: require("@/assets/images/HH_SafetyWalk.png"),
            buttonLabel: "Kirjaudu sisään",
        },
    ],
};
