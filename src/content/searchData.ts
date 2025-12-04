export interface SearchResult {
    id: string;
    title: string;
    image: string;
    description: string;
    tags: string[];
}

export const searchData: Record<"en" | "fi", SearchResult[]> = {
    en: [
        {
            id: "1",
            title: "Emergency Contacts",
            image:
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
            description:
                "Quick access to crisis team contacts and emergency services for immediate assistance during critical situations.",
            tags: ["Emergency", "Contacts", "Crisis Team"],
        },
        {
            id: "2",
            title: "Campus Safety Rules",
            image:
                "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
            description:
                "Essential safety guidelines and procedures that all students and staff must follow to maintain a secure campus environment.",
            tags: ["Safety", "Guidelines", "Procedures"],
        },
        {
            id: "3",
            title: "Assembly Points",
            image:
                "https://images.unsplash.com/photo-1574263867126-8e5f5b1b1b1b?w=300&h=200&fit=crop",
            description:
                "Designated meeting points where students and staff should gather during emergency evacuations and drills.",
            tags: ["Emergency", "Evacuation", "Meeting Points"],
        },
        {
            id: "4",
            title: "Fire Safety Equipment",
            image:
                "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
            description:
                "Locations of fire extinguishers, emergency exits, and other fire safety equipment across all campus buildings.",
            tags: ["Fire Safety", "Equipment", "Extinguishers"],
        },
        {
            id: "5",
            title: "Defibrillator Locations",
            image:
                "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
            description:
                "AED device locations throughout the campus for medical emergencies.",
            tags: ["Medical", "AED", "Emergency"],
        },
        {
            id: "6",
            title: "Emergency Exits",
            image:
                "https://images.unsplash.com/photo-1574263867126-8e5f5b1b1b1b?w=300&h=200&fit=crop",
            description:
                "Primary and secondary exit routes from all campus buildings, including accessibility information.",
            tags: ["Emergency", "Exits", "Evacuation"],
        },
        {
            id: "7",
            title: "Campus News",
            image:
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop",
            description:
                "Latest safety updates, announcements, and important information affecting the campus community.",
            tags: ["News", "Updates", "Announcements"],
        },
        {
            id: "8",
            title: "Safety Observations",
            image:
                "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
            description:
                "Report safety concerns, hazards, and observations to help maintain campus safety.",
            tags: ["Reporting", "Safety", "Concerns"],
        },
    ],

    fi: [
        {
            id: "1",
            title: "Hätäyhteystiedot",
            image:
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
            description:
                "Nopea pääsy kriisiryhmän yhteystietoihin ja hätänumeroihin kiireellisissä tilanteissa.",
            tags: ["Hätä", "Yhteystiedot", "Kriisiryhmä"],
        },
        {
            id: "2",
            title: "Kampuksen Turvallisuussäännöt",
            image:
                "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
            description:
                "Keskeiset turvallisuusohjeet ja -menettelyt, joita kaikkien opiskelijoiden ja henkilökunnan tulee noudattaa.",
            tags: ["Turvallisuus", "Ohjeet", "Menettelyt"],
        },
        {
            id: "3",
            title: "Kokoontumispaikat",
            image:
                "https://images.unsplash.com/photo-1574263867126-8e5f5b1b1b1b?w=300&h=200&fit=crop",
            description:
                "Määritellyt kokoontumispaikat, joihin opiskelijoiden ja henkilöstön tulee siirtyä hätätilanteissa.",
            tags: ["Hätä", "Evakuointi", "Kokoontuminen"],
        },
        {
            id: "4",
            title: "Paloturvallisuuslaitteet",
            image:
                "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
            description:
                "Sammuttimien, hätäpoistumisteiden ja muun paloturvallisuuskaluston sijainnit kampuksella.",
            tags: ["Paloturvallisuus", "Laitteet", "Sammuttimet"],
        },
        {
            id: "5",
            title: "Defibrillaattorien Sijainnit",
            image:
                "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
            description:
                "AED-laitteiden sijainnit kampuksella lääketieteellisiä hätätilanteita varten.",
            tags: ["Lääketiede", "AED", "Hätä"],
        },
        {
            id: "6",
            title: "Hätäpoistumistiet",
            image:
                "https://images.unsplash.com/photo-1574263867126-8e5f5b1b1b1b?w=300&h=200&fit=crop",
            description:
                "Ensisijaiset ja toissijaiset poistumisreitit rakennuksista, mukaan lukien esteettömyystiedot.",
            tags: ["Hätä", "Poistumistiet", "Evakuointi"],
        },
        {
            id: "7",
            title: "Kampusuutiset",
            image:
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop",
            description:
                "Viimeisimmät turvallisuuspäivitykset, ilmoitukset ja tärkeä kampusyhteisöä koskeva tieto.",
            tags: ["Uutiset", "Päivitykset", "Ilmoitukset"],
        },
        {
            id: "8",
            title: "Turvallisuushavainnot",
            image:
                "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop",
            description:
                "Ilmoita turvallisuushavainnoista ja vaaroista kampuksen turvallisuuden parantamiseksi.",
            tags: ["Ilmoittaminen", "Turvallisuus", "Havainnot"],
        },
    ],
};

// Search header translations
export const searchHeaderText = {
    title: { en: "Haaga-Helia", fi: "Haaga-Helia" },
    placeholder: { en: "Search", fi: "Haku" },
    description: {
        en: "Search for safety info and emergency instructions",
        fi: "Hae turvallisuustietoa ja ohjeita hätätilanteisiin"
    },
};

// Empty state translations
export const emptyStateText = {
    noResults: { en: "No Results Found", fi: "Ei hakutuloksia" },
    tryDifferent: { en: "Try searching with different keywords", fi: "Kokeile hakea eri avainsanoilla" },
};
