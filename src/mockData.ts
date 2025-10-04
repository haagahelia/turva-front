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
    title: "Safe Haaga-Helia",
    shortTitle: "Safe HH",
    sections: [
      {
        title: "Overview",
        content: [
          "Welcome to Haaga-Helia University of Applied Sciences",
          "We strive to provide a safe and secure environment for all students and staff",
          "Your safety is our top priority"
        ]
      },
      {
        title: "Emergency Contacts",
        content: [
          "Emergency Services: 112",
          "Security: +358 40 123 4567",
          "Maintenance: +358 40 987 6543"
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
        title: "Personal Responsibility",
        content: [
          "Follow all safety guidelines and protocols",
          "Report any hazards or unsafe conditions immediately",
          "Take care of yourself and others around you"
        ]
      },
      {
        title: "Academic Responsibility",
        content: [
          "Maintain academic integrity",
          "Respect fellow students and staff",
          "Follow campus rules and regulations"
        ]
      }
    ]
  },
  "safety-observation-report": {
    id: "safety-observation-report",
    title: "Safety Observation Report",
    shortTitle: "Safety Report",
    sections: [
      {
        title: "What to Report",
        content: [
          "Unsafe conditions or hazards",
          "Near-miss incidents",
          "Equipment malfunctions",
          "Security concerns"
        ]
      },
      {
        title: "How to Report",
        content: [
          "Use the official reporting system",
          "Provide detailed descriptions",
          "Include photos if safe to take",
          "Follow up if additional information is needed"
        ]
      }
    ]
  },
  "safety-walk": {
    id: "safety-walk",
    title: "Safety Walk: The Safety Walk Checklist",
    shortTitle: "Safety Walk",
    sections: [
      {
        title: "Safety Walk Procedure",
        content: [
          "Conduct regular safety walks in your area",
          "Check for blocked exits and pathways",
          "Verify emergency equipment accessibility",
          "Document any issues found"
        ]
      },
      {
        title: "What to Look For",
        content: [
          "Clear emergency exits",
          "Working fire extinguishers",
          "Proper lighting",
          "Clean and clear walkways"
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
        title: "Initial Response",
        content: [
          "Stay calm and assess the situation",
          "Ensure your own safety first",
          "Call for help if needed",
          "Follow established procedures"
        ]
      },
      {
        title: "Types of Disruptions",
        content: [
          "Fire or evacuation",
          "Medical emergency",
          "Security threat",
          "Weather-related emergency"
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
        title: "Rescue Coordination",
        content: [
          "Emergency response team activation",
          "Clear communication channels",
          "Designated meeting points",
          "Accountability procedures"
        ]
      },
      {
        title: "Your Role",
        content: [
          "Follow evacuation plans",
          "Assist others when safe",
          "Report to designated areas",
          "Follow instructions from authorities"
        ]
      }
    ]
  },
  "evacuation-building": {
    id: "evacuation-building",
    title: "Evacuation from the Building",
    shortTitle: "Building Evacuation",
    sections: [
      {
        title: "Evacuation Signals",
        content: [
          "Fire alarm activation",
          "Visual strobe lights",
          "Public address announcements",
          "Emergency alerts"
        ]
      },
      {
        title: "Evacuation Routes",
        content: [
          "Primary exit routes",
          "Alternative exit routes",
          "Disabled access routes",
          "Assembly points"
        ]
      }
    ]
  },
  "sheltering-indoors-1": {
    id: "sheltering-indoors-1",
    title: "Sheltering in Place",
    shortTitle: "Basic Shelter",
    sections: [
      {
        title: "When to Shelter",
        content: [
          "Severe weather warnings",
          "Air quality concerns",
          "Security threats",
          "Chemical spills"
        ]
      },
      {
        title: "Shelter Locations",
        content: [
          "Designated safe rooms",
          "Interior rooms without windows",
          "Lower floors of buildings",
          "Away from exterior walls"
        ]
      }
    ]
  },
  "sheltering-indoors-2": {
    id: "sheltering-indoors-2",
    title: "Sheltering in Place",
    shortTitle: "Advanced Shelter",
    sections: [
      {
        title: "Extended Shelter Protocol",
        content: [
          "Communication with authorities",
          "Resource management",
          "Group organization",
          "Regular updates"
        ]
      },
      {
        title: "Essential Supplies",
        content: [
          "Water and non-perishable food",
          "First aid supplies",
          "Communication devices",
          "Important documents"
        ]
      }
    ]
  },
  "extreme-violence-situation": {
    id: "extreme-violence-situation",
    title: "Actions in a Dangerous Situation: Threatening Behavior",
    shortTitle: "Violence Response",
    sections: [
      {
        title: "Run, Hide, Fight Protocol",
        content: [
          "RUN: Immediate evacuation if possible",
          "HIDE: Find secure shelter if evacuation impossible",
          "FIGHT: Last resort defense if life is threatened",
          "Report situation to authorities immediately"
        ]
      },
      {
        title: "Warning Signs",
        content: [
          "Aggressive behavior",
          "Threats or intimidation",
          "Unusual weapons or objects",
          "Escalating conflicts"
        ]
      }
    ]
  },
  "risks-own-work": {
    id: "risks-own-work",
    title: "Work Place Safety",
    shortTitle: "Work Risks",
    sections: [
      {
        title: "Risk Assessment",
        content: [
          "Identify potential hazards in your work area",
          "Evaluate risk levels",
          "Implement control measures",
          "Regular review and updates"
        ]
      },
      {
        title: "Common Workplace Risks",
        content: [
          "Slips, trips, and falls",
          "Musculoskeletal injuries",
          "Chemical exposure",
          "Fire and electrical hazards"
        ]
      }
    ]
  },
  "give-feedback": {
    id: "give-feedback",
    title: "Give Feedback",
    shortTitle: "Feedback",
    sections: [
      {
        title: "Feedback Channels",
        content: [
          "Anonymous online reporting system",
          "Direct contact with safety officers",
          "Student union representatives",
          "Staff feedback forms"
        ]
      },
      {
        title: "What Feedback Helps",
        content: [
          "Improvement of safety protocols",
          "Identification of new risks",
          "Training needs assessment",
          "Communication effectiveness"
        ]
      }
    ]
  }
};

// Export array of briefing items for the briefing screen
export const briefingItems = [
  {
    id: "safe-haaga-helia",
    title: "Turvallinen Haaga-Helia",
    shortTitle: "Turvallinen HH"
  },
  {
    id: "act-responsibly",
    title: "Toimi Vastuullisesti",
    shortTitle: "Toimi Vastuullisesti"
  },
  {
    id: "safety-observation-report",
    title: "Turvallisuushavaintoilmoitus",
    shortTitle: "Havaintoilmoitus"
  },
  {
    id: "safety-walk",
    title: "Turvallisuuskävely",
    shortTitle: "Turvallisuuskävely"
  },
  {
    id: "actions-disruptive-situations",
    title: "Toiminta Häiriötilanteessa",
    shortTitle: "Häiriötilanne"
  },
  {
    id: "rescue-plan",
    title: "Pelastussuunnitelma",
    shortTitle: "Pelastussuunnitelma"
  },
  {
    id: "evacuation-building",
    title: "Poistuminen Rakennuksesta",
    shortTitle: "Poistuminen"
  },
  {
    id: "sheltering-indoors-1",
    title: "Sisälle Suojautuminen 1",
    shortTitle: "Suojautuminen 1"
  },
  {
    id: "sheltering-indoors-2",
    title: "Sisälle Suojautuminen 2",
    shortTitle: "Suojautuminen 2"
  },
  {
    id: "extreme-violence-situation",
    title: "Äärimmäinen Väkivaltatilanne",
    shortTitle: "Väkivaltatilanne"
  },
  {
    id: "risks-own-work",
    title: "Oman Työn Riskit",
    shortTitle: "Työn Riskit"
  },
  {
    id: "give-feedback",
    title: "Anna Palautetta",
    shortTitle: "Anna Palautetta"
  }
];