export interface BriefingItem {
  id: string;
  title: string;
  shortTitle: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export const safetyBriefingData: Record<
  "fi" | "en",
  Record<string, BriefingItem>
> = {
  fi: {
    "safe-haaga-helia": {
      id: "safe-haaga-helia",
      title: "Turvallinen Haaga-Helia",
      shortTitle: "Safe HH",
      sections: [
        {
          title: "Yleiskatsaus",
          content: [
            "Tervetuloa turvallisuusperehdytykselle!",
            "Haaga-Helia tarjoaa turvallisen ja viihtyisän ympäristön opiskeluun ja työskentelyyn.",
            "Turvallisuusperehdytyksen tavoitteena on vahvistaa opiskelijoiden turvallisuusosaamista ja edistää yhteistä turvallisuuskulttuuria."
          ]
        },
        {
          title: "Sisältö",
          content: [
            "Tässä turvallisuusperehdytyksessä saat tietoa näistä turvallisuuteen liittyvistä asioista:",
            "turvallisuuskävely",
            "valmius- ja kriisiryhmä",
            "turvaopas",
            "pelastussuunnitelma",
            "järjestyssäännöt",
            "turvallisuushavaintoilmoitus",
            "poistuminen rakennuksesta",
            "sisälle suojautuminen"
          ]
        }
      ]
    },

    "act-responsibly": {
      id: "act-responsibly",
      title: "Toimi Vastuullisesti",
      shortTitle: "Be Responsible",
      sections: [
        {
          title: "Järjestyssäännöt ja vastuut",
          content: [
            "Tutustu Haaga-Helian järjestyssääntöihin ja noudata niitä.",
            "Järjestyssääntöjen tarkoituksena on varmistaa turvallinen ja esteetön oppimisympäristö.",
            "Rikkomuksista voi seurata kurinpidollisia toimenpiteitä."
          ]
        },
        {
          title: "Hyvät käytänteet opinnoissa",
          content: [
            "Noudata hyviä opintokäytäntöjä ja vältä vilppiä.",
            "Kunnioita opiskeluyhteisön jäseniä ja yhteisiä tiloja.",
            "Tehtävä: Perehdy järjestyssääntöihin ja tutkintosääntöön."
          ]
        }
      ]
    },

    "safety-observation-report": {
      id: "safety-observation-report",
      title: "Turvallisuushavaintoilmoitus",
      shortTitle: "Havaintoilmoitus",
      sections: [
        {
          title: "Miksi havaintoja tehdään?",
          content: [
            "Ilmoitukset auttavat kehittämään turvallisuutta kampuksilla.",
            "Voit ilmoittaa vaaranpaikoista, läheltä piti -tilanteista tai positiivisista havainnoista.",
            "Turvallisuushavainto ei ole valitus, vaan kehitysehdotus."
          ]
        },
        {
          title: "Miten ilmoitan?",
          content: [
            "Tee ilmoitus palveluportaalissa (kirjautuminen vaaditaan).",
            "Kaikki ilmoitukset käsitellään luottamuksellisesti.",
            "Lisätietoa: www.haaga-helia.fi/turvallisuus"
          ]
        }
      ]
    },

    "safety-walk": {
      id: "safety-walk",
      title: "Turvallisuuskävely",
      shortTitle: "Safety Walk",
      sections: [
        {
          title: "Turvallisuuskävelyn tarkoitus",
          content: [
            "Perehdy kampuksesi turvallisuusasioihin.",
            "Opit poistumisreitit, ensiapuvälineiden ja sammuttimien sijainnit.",
            "Harjoittelu vahvistaa valmiutta toimia häiriötilanteissa."
          ]
        },
        {
          title: "Toimintaohjeet",
          content: [
            "Lue turvallisuuskävelyohje opiskelijoille.",
            "Katso oman kampuksesi turvallisuuskävelyvideo.",
            "Osallistu fyysiselle turvallisuuskävelylle tutorien ja opettajien johdolla."
          ]
        }
      ]
    },

    "actions-disruptive-situations": {
      id: "actions-disruptive-situations",
      title: "Toiminta Häiriötilanteissa",
      shortTitle: "Häiriötilanteet",
      sections: [
        {
          title: "Varautuminen",
          content: [
            "Varautuminen ehkäisee kriisitilanteita ja luo edellytykset hallintaan.",
            "Toimintaohjeet käydään läpi ja harjoitellaan säännöllisesti.",
            "Valmius- ja kriisiryhmä huolehtii toiminnasta poikkeustilanteissa."
          ]
        },
        {
          title: "Hätätilanteessa",
          content: [
            "Soita hätänumeroon 112.",
            "Ilmoita turvallisuuspäällikölle tai kriisiryhmälle.",
            "Lataa Suomi 112 -sovellus nopeaa avunsaantia varten."
          ]
        }
      ]
    },

    "rescue-plan": {
      id: "rescue-plan",
      title: "Pelastussuunnitelma",
      shortTitle: "Pelastussuunnitelma",
      sections: [
        {
          title: "Sisältö ja tarkoitus",
          content: [
            "Pelastussuunnitelma kertoo, miten vaaratilanteita ehkäistään ja hallitaan.",
            "Tutustu oman kampuksesi suunnitelmaan ja kokoontumispaikkaan.",
            "Tiedä, miten toimia tulipalon tai onnettomuuden sattuessa."
          ]
        },
        {
          title: "Materiaalit",
          content: [
            "Löydät suunnitelmat SharePointista (kirjautuminen vaaditaan).",
            "Perehdy turvaoppaaseen ja toimintaohjeisiin eri tilanteissa.",
            "Harjoittele poistumista ja kokoontumista vuosittain."
          ]
        }
      ]
    },

    "evacuation-building": {
      id: "evacuation-building",
      title: "Poistuminen Rakennuksesta",
      shortTitle: "Poistuminen",
      sections: [
        {
          title: "Toiminta hätätilanteessa",
          content: [
            "Kun palokello soi, poistu lähintä reittiä pitkin.",
            "Sulje ikkunat ja ovet, älä käytä hissiä.",
            "Siirry kokoontumispaikalle ja noudata ohjeita."
          ]
        },
        {
          title: "Turvalaatikko ja kartat",
          content: [
            "Etsi oman kampuksesi turvalaatikko ja tutustu sisältöön.",
            "Katso poistumisopasteet ja kokoontumispaikat kartasta.",
            "Tee poistumisen turvallisuuskävely kampuksella."
          ]
        }
      ]
    },

    "sheltering-indoors-1": {
      id: "sheltering-indoors-1",
      title: "Sisälle Suojautuminen 1",
      shortTitle: "Suojautuminen 1",
      sections: [
        {
          title: "Milloin suojaudutaan sisälle?",
          content: [
            "Yleisen vaaramerkin tai viranomaisen ohjeen mukaisesti.",
            "Esimerkkejä: tulipalo, kaasuvuoto tai säteilyvaara.",
            "Suojaudu lähimpiin sisätiloihin ja sulje ilmanvaihto."
          ]
        },
        {
          title: "Toimintaohjeet",
          content: [
            "Sulje ovet, ikkunat ja ilmanvaihto.",
            "Kuuntele viranomaistiedotteita.",
            "Vältä puhelimen käyttöä ja odota lisäohjeita."
          ]
        }
      ]
    },

    "sheltering-indoors-2": {
      id: "sheltering-indoors-2",
      title: "Sisälle Suojautuminen 2",
      shortTitle: "Suojautuminen 2",
      sections: [
        {
          title: "Väestönsuoja",
          content: [
            "Väestönsuojat suojaavat säteilyltä, räjähdyksiltä ja paineaalloilta.",
            "Ne otetaan käyttöön viranomaismääräyksellä 72 tunnin sisällä.",
            "Yleinen vaaramerkki kertoo suojautumistarpeesta."
          ]
        },
        {
          title: "Yleinen vaaramerkki",
          content: [
            "Yksi minuutti nouseva ja laskeva äänimerkki.",
            "‘Vaara ohi’ -merkki on tasainen ääni minuutin ajan.",
            "Harjoitusmerkki testataan joka kuun ensimmäisenä maanantaina klo 12."
          ]
        }
      ]
    },

    "extreme-violence-situation": {
      id: "extreme-violence-situation",
      title: "Äärimmäinen Väkivaltatilanne",
      shortTitle: "Väkivaltatilanne",
      sections: [
        {
          title: "Toimintaohjeet",
          content: [
            "Jos kuulet uhasta, ilmoita heti poliisille (112).",
            "Pakene, piiloudu tai hälytä tilanteen mukaan.",
            "Lukitse ovet, sammuta valot ja pysy poissa näkyvistä."
          ]
        },
        {
          title: "Kun kohtaat uhkaavan henkilön",
          content: [
            "Pidä kädet näkyvillä ja säilytä rauhallisuus.",
            "Älä provosoi, vältä äkkinäisiä liikkeitä.",
            "Jos tilanne muuttuu väkivaltaiseksi, soita 112 ja toimi ohjeiden mukaan."
          ]
        }
      ]
    },

    "risks-own-work": {
      id: "risks-own-work",
      title: "Oman Työn Riskit",
      shortTitle: "Työn Riskit",
      sections: [
        {
          title: "Riskien tunnistaminen",
          content: [
            "Tunnista vaarat, uhat ja riskit omassa työssäsi.",
            "Riski = todennäköisyys × vaikutus.",
            "Kirjaa kolme merkittävintä riskiä ja pohdi, miten voit ehkäistä niitä."
          ]
        },
        {
          title: "Esimerkkejä riskeistä",
          content: [
            "Liukastumiset ja kompastumiset.",
            "Kemikaalien käyttö ja sähkötyöt.",
            "Kuormittavat työasennot ja kiire.",
            "Puutteellinen viestintä tai ohjeistus."
          ]
        }
      ]
    }
  },

  // -----------------------------
  //           ENGLISH
  // -----------------------------

  en: {
    "safe-haaga-helia": {
      id: "safe-haaga-helia",
      title: "Safe Haaga-Helia",
      shortTitle: "Safe HH",
      sections: [
        {
          title: "Overview",
          content: [
            "Welcome to the safety orientation!",
            "Haaga-Helia provides a safe and comfortable environment for studying and working.",
            "The aim of this briefing is to strengthen students’ safety awareness and support a shared safety culture."
          ]
        },
        {
          title: "Contents",
          content: [
            "In this safety briefing, you will learn about:",
            "safety walk",
            "preparedness and crisis group",
            "safety guide",
            "rescue plan",
            "code of conduct",
            "safety observation report",
            "evacuation",
            "sheltering indoors"
          ]
        }
      ]
    },

    "act-responsibly": {
      id: "act-responsibly",
      title: "Act Responsibly",
      shortTitle: "Be Responsible",
      sections: [
        {
          title: "Rules and Responsibilities",
          content: [
            "Familiarize yourself with Haaga-Helia’s rules and follow them.",
            "The rules ensure a safe and unobstructed learning environment.",
            "Violations may result in disciplinary action."
          ]
        },
        {
          title: "Good Study Practices",
          content: [
            "Follow good academic practices and avoid misconduct.",
            "Respect members of the study community and shared spaces.",
            "Task: Read the code of conduct and degree regulations."
          ]
        }
      ]
    },

    "safety-observation-report": {
      id: "safety-observation-report",
      title: "Safety Observation Report",
      shortTitle: "Observation Report",
      sections: [
        {
          title: "Why Make Observations?",
          content: [
            "Reports help improve safety on campuses.",
            "You can report hazards, near misses or positive observations.",
            "A safety observation is not a complaint, but a development suggestion."
          ]
        },
        {
          title: "How to Report?",
          content: [
            "Submit a report through the service portal (login required).",
            "All reports are handled confidentially.",
            "More information: www.haaga-helia.fi/safety"
          ]
        }
      ]
    },

    "safety-walk": {
      id: "safety-walk",
      title: "Safety Walk",
      shortTitle: "Safety Walk",
      sections: [
        {
          title: "Purpose of the Safety Walk",
          content: [
            "Learn about safety procedures on your campus.",
            "You will learn evacuation routes, first aid equipment locations, and fire extinguishers.",
            "Practice improves readiness to act in case of disruptions."
          ]
        },
        {
          title: "Instructions",
          content: [
            "Read the safety walk guide for students.",
            "Watch the safety walk video for your campus.",
            "Participate in a physical safety walk with tutors or teachers."
          ]
        }
      ]
    },

    "actions-disruptive-situations": {
      id: "actions-disruptive-situations",
      title: "Actions in Disruptive Situations",
      shortTitle: "Disruptive Situations",
      sections: [
        {
          title: "Preparedness",
          content: [
            "Preparedness prevents crises and supports effective response.",
            "Instructions are reviewed and practiced regularly.",
            "The preparedness and crisis group manages operations during exceptional circumstances."
          ]
        },
        {
          title: "In an Emergency",
          content: [
            "Call the emergency number 112.",
            "Notify the safety manager or crisis group.",
            "Download the 112 Suomi app for faster assistance."
          ]
        }
      ]
    },

    "rescue-plan": {
      id: "rescue-plan",
      title: "Rescue Plan",
      shortTitle: "Rescue Plan",
      sections: [
        {
          title: "Purpose and Content",
          content: [
            "The rescue plan explains how risks are prevented and managed.",
            "Review the rescue plan and assembly point for your campus.",
            "Know how to act in case of fire or an accident."
          ]
        },
        {
          title: "Materials",
          content: [
            "You can find the plans in SharePoint (login required).",
            "Read the safety guide and instructions for different scenarios.",
            "Practice evacuation and assembly annually."
          ]
        }
      ]
    },

    "evacuation-building": {
      id: "evacuation-building",
      title: "Evacuating the Building",
      shortTitle: "Evacuation",
      sections: [
        {
          title: "In an Emergency",
          content: [
            "When the fire alarm sounds, exit using the nearest route.",
            "Close windows and doors, do not use the elevator.",
            "Go to the assembly point and follow instructions."
          ]
        },
        {
          title: "Safety Box and Maps",
          content: [
            "Locate the safety box on your campus and review its contents.",
            "Check evacuation signs and assembly points on the map.",
            "Do an evacuation safety walk on campus."
          ]
        }
      ]
    },

    "sheltering-indoors-1": {
      id: "sheltering-indoors-1",
      title: "Sheltering Indoors 1",
      shortTitle: "Sheltering 1",
      sections: [
        {
          title: "When to Shelter Indoors?",
          content: [
            "Follow the general danger signal or official instructions.",
            "Examples: fire, gas leak, radiation hazard.",
            "Move to the nearest indoor space and shut down ventilation."
          ]
        },
        {
          title: "Instructions",
          content: [
            "Close doors, windows and ventilation.",
            "Listen to official announcements.",
            "Avoid using your phone and wait for further instructions."
          ]
        }
      ]
    },

    "sheltering-indoors-2": {
      id: "sheltering-indoors-2",
      title: "Sheltering Indoors 2",
      shortTitle: "Sheltering 2",
      sections: [
        {
          title: "Civil Defense Shelter",
          content: [
            "Civil defense shelters protect against radiation, explosions and blast waves.",
            "They are activated by official order within 72 hours.",
            "The general danger signal indicates the need to shelter."
          ]
        },
        {
          title: "General Danger Signal",
          content: [
            "A one-minute rising and falling tone.",
            "'All clear' signal is a steady tone for one minute.",
            "A test alarm sounds on the first Monday of each month at 12:00."
          ]
        }
      ]
    },

    "extreme-violence-situation": {
      id: "extreme-violence-situation",
      title: "Extreme Violence Situation",
      shortTitle: "Violence",
      sections: [
        {
          title: "Instructions",
          content: [
            "If you hear about a threat, notify the police immediately (112).",
            "Run, hide or alert depending on the situation.",
            "Lock doors, turn off lights and stay out of sight."
          ]
        },
        {
          title: "When Facing an Aggressive Person",
          content: [
            "Keep your hands visible and stay calm.",
            "Do not provoke or make sudden movements.",
            "If the situation becomes violent, call 112 and follow instructions."
          ]
        }
      ]
    },

    "risks-own-work": {
      id: "risks-own-work",
      title: "Risks in Your Own Work",
      shortTitle: "Work Risks",
      sections: [
        {
          title: "Identifying Risks",
          content: [
            "Identify hazards, threats and risks in your own work.",
            "Risk = probability × impact.",
            "Write down three major risks and consider how to prevent them."
          ]
        },
        {
          title: "Examples of Risks",
          content: [
            "Slips and trips.",
            "Chemical handling and electrical work.",
            "Straining work postures and time pressure.",
            "Lack of communication or guidance."
          ]
        }
      ]
    }
  }
};

// Navigation list (same for both languages)
export const briefingItems = [
  {
    "fi": [
      { "id": "safe-haaga-helia", "title": "Turvallinen Haaga-Helia", "shortTitle": "Turvallinen HH" },
      { "id": "act-responsibly", "title": "Toimi vastuullisesti", "shortTitle": "Vastuullisuus" },
      { "id": "safety-observation-report", "title": "Turvallisuushavainto", "shortTitle": "Havainto" },
      { "id": "safety-walk", "title": "Turvallisuuskävely", "shortTitle": "Turvallisuuskävely" },
      { "id": "actions-disruptive-situations", "title": "Toiminta häiriötilanteissa", "shortTitle": "Häiriöt" },
      { "id": "rescue-plan", "title": "Pelastussuunnitelma", "shortTitle": "Pelastussuunnitelma" },
      { "id": "evacuation-building", "title": "Poistuminen", "shortTitle": "Poistuminen" },
      { "id": "sheltering-indoors-1", "title": "Sisälle suojautuminen 1", "shortTitle": "Suojautuminen 1" },
      { "id": "sheltering-indoors-2", "title": "Sisälle suojautuminen 2", "shortTitle": "Suojautuminen 2" },
      { "id": "extreme-violence-situation", "title": "Äärimmäinen väkivaltatilanne", "shortTitle": "Väkivalta" },
      { "id": "risks-own-work", "title": "Riskit omassa työssä", "shortTitle": "Riskit" }
    ],
    "en": [
      { "id": "safe-haaga-helia", "title": "Safe Haaga-Helia", "shortTitle": "Safe HH" },
      { "id": "act-responsibly", "title": "Act Responsibly", "shortTitle": "Responsible" },
      { "id": "safety-observation-report", "title": "Safety Observation Report", "shortTitle": "Observation" },
      { "id": "safety-wark", "title": "Safety Walk", "shortTitle": "Safety Walk" },
      { "id": "actions-disruptive-situations", "title": "Actions in Disruptive Situations", "shortTitle": "Disruptions" },
      { "id": "rescue-plan", "title": "Rescue Plan", "shortTitle": "Rescue Plan" },
      { "id": "evacuation-building", "title": "Evacuation", "shortTitle": "Evacuation" },
      { "id": "sheltering-indoors-1", "title": "Sheltering Indoors 1", "shortTitle": "Shelter 1" },
      { "id": "sheltering-indoors-2", "title": "Sheltering Indoors 2", "shortTitle": "Shelter 2" },
      { "id": "extreme-violence-situation", "title": "Extreme Violence Situation", "shortTitle": "Violence" },
      { "id": "risks-own-work", "title": "Work Risks", "shortTitle": "Risks" }
    ]
  }

];
