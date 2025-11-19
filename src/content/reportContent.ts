export type ReportType = "security" | "harassment";

export interface LocalizedText {
    en: string;
    fi: string;
}

export interface ReportContentItem {
    id: ReportType;
    image: any;
    title: LocalizedText;
    description: LocalizedText;
    description2?: LocalizedText;
    buttonText: LocalizedText;
}


export const reportContent: Record<ReportType, ReportContentItem> = {
    security: {
        id: "security",
        image: require("@/assets/images/HH_FireSafety.png"),
        title: {
            en: "Did a near-miss situation occur, or did you notice something that affects safety at Haaga-Helia?",
            fi: "Sattuiko läheltä piti -tilanne tai huomasitko puutteen, joka vaikuttaa turvallisuuteen Haaga-Heliassa?"
        },
        description: {
            en: "A security report is confidential. When you submit a report, it is forwarded to Haaga-Helia’s Security Manager, who will handle the matter. All reports are responded to.",
            fi: "Turvallisuushavaintoilmoitus on luottamuksellinen. Kun teet ilmoituksen, se menee Haaga-Helian turvallisuuspäällikölle, joka edistää asian selvittämistä. Kaikkiin palautteisiin reagoidaan."
        },
        buttonText: {
            en: "Submit Security Report",
            fi: "Tee turvallisuushavaintoilmoitus"
        }
    },

    harassment: {
        id: "harassment",
        image: require("@/assets/images/HH_SafetyWalk.png"),
        title: {
            en: "If you experience or witness inappropriate conduct, please submit a report.",
            fi: "Jos havaitset tai koet epäasiallista kohtelua, tee ilmoitus."
        },
        description: {
            en: "The report is received by Haaga-Helia’s harassment contact person and is handled confidentially. The case will be addressed according to Haaga-Helia’s Turvaamo reporting and mediation process.",
            fi: "Ilmoituksen vastaanottaa Haaga-Helian häirintäyhdyshenkilö ja se on luottamuksellinen. Tilanne käsitellään Haaga-Helian Turvaamon ilmoitus- ja sovittelumallin mukaisesti."
        },
        description2: {
            en: "Don’t hesitate to get in touch.",
            fi: "Ota matalalla kynnyksellä yhteyttä."
        },
        buttonText: {
            en: "Submit Harassment Report",
            fi: "Tee ilmoitus epäasiallisesta kohtelusta"
        }
    }
} as const;
