import { ReportType } from "./reportContent";

export type ReportInputType = "text" | "textarea" | "select" | "file" | "email" | "number";

export interface LocalizedText {
    en: string;
    fi: string;
}

export interface ReportField {
    name: string;            // key for form state
    label: LocalizedText;    // label in EN and FI
    placeholder?: LocalizedText;
    type: ReportInputType;
    required?: boolean;
    options?: LocalizedText[]; // for select fields
}

// Submit button text same for all reports
export const reportSubmitButtonText: LocalizedText = {
    en: "Submit",
    fi: "Lähetä",
};

export const reportFields: Record<ReportType, ReportField[]> = {
    security: [
        {
            name: "location",
            label: { en: "Location of Incident", fi: "Tapahtumapaikka" },
            placeholder: { en: "e.g., Room 101", fi: "esim. Huone 101" },
            type: "text",
            required: true,
        },
        {
            name: "date",
            label: { en: "Date of Incident", fi: "Tapahtumapäivämäärä" },
            placeholder: { en: "DD-MM-YYYY", fi: "PP-KK-VVVV" },
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: { en: "Description", fi: "Kuvaus" },
            placeholder: { en: "Describe what happened", fi: "Kuvaile tapahtuma" },
            type: "textarea",
            required: true,
        },
        {
            name: "attachment",
            label: { en: "Attach a file (optional)", fi: "Liitä tiedosto (valinnainen)" },
            type: "file",
            required: false,
        },
    ],

    harassment: [
        {
            name: "personInvolved",
            label: { en: "Person Involved", fi: "Osallinen henkilö" },
            placeholder: { en: "Name if known", fi: "Nimi, jos tiedossa" },
            type: "text",
            required: false,
        },
        {
            name: "date",
            label: { en: "Date of Incident", fi: "Tapahtumapäivämäärä" },
            placeholder: { en: "DD-MM-YYYY", fi: "PP-KK-VVVV" },
            type: "text",
            required: true,
        },
        {
            name: "location",
            label: { en: "Location", fi: "Sijainti" },
            placeholder: { en: "e.g., Cafeteria", fi: "esim. Ruokala" },
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: { en: "Description", fi: "Kuvaus" },
            placeholder: { en: "Describe the incident", fi: "Kuvaile tapahtuma" },
            type: "textarea",
            required: true,
        },
        {
            name: "contactPermission",
            label: { en: "May we contact you?", fi: "Voimmeko ottaa yhteyttä?" },
            type: "select",
            options: [
                { en: "Yes", fi: "Kyllä" },
                { en: "No", fi: "Ei" },
            ],
            required: true,
        },
    ],
};
