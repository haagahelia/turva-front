export interface BriefingItem {
  id: string;
  title: string;
  shortTitle: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export const safetyBriefingData: Record<string, BriefingItem> = {
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
  },

  
};

// Array for screen navigation
export const briefingItems = [
  { id: "safe-haaga-helia", title: "Turvallinen Haaga-Helia", shortTitle: "Safe HH" },
  { id: "act-responsibly", title: "Toimi Vastuullisesti", shortTitle: "Be Responsible" },
  { id: "safety-observation-report", title: "Turvallisuushavaintoilmoitus", shortTitle: "Havaintoilmoitus" },
  { id: "safety-walk", title: "Turvallisuuskävely", shortTitle: "Safety Walk" },
  { id: "actions-disruptive-situations", title: "Toiminta Häiriötilanteissa", shortTitle: "Häiriötilanteet" },
  { id: "rescue-plan", title: "Pelastussuunnitelma", shortTitle: "Pelastussuunnitelma" },
  { id: "evacuation-building", title: "Poistuminen Rakennuksesta", shortTitle: "Poistuminen" },
  { id: "sheltering-indoors-1", title: "Sisälle Suojautuminen 1", shortTitle: "Suojautuminen 1" },
  { id: "sheltering-indoors-2", title: "Sisälle Suojautuminen 2", shortTitle: "Suojautuminen 2" },
  { id: "extreme-violence-situation", title: "Äärimmäinen Väkivaltatilanne", shortTitle: "Väkivaltatilanne" },
  { id: "risks-own-work", title: "Oman Työn Riskit", shortTitle: "Työn Riskit" },
  
];
