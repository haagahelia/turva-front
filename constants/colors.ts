// src/constants/colors.ts
/**
 * Color tokens — update these values to match your prototype.
 * Keep tokens semantic (primary, background, surface...) — use them across the app.
 */
export const COLORS = {
    // Brand
    primary: '#0B5FFF',        // Primary brand color — main call-to-action buttons, Appbar
    primaryVariant: '#084AED', // Darker primary — pressed states, shadows
    accent: '#06B6D4',         // Secondary / accent — FABs, chips

    // Surface / layout
    background: '#FFFFFF',     // App screen background
    surface: '#F8FAFF',        // Cards, sheets
    card: '#FFFFFF',           // Card background (if different)
    border: '#E6E9EE',         // Dividers, thin borders

    // Text
    text: '#0F172A',           // Primary text color
    textSecondary: '#6B7280',  // Secondary captions, placeholders
    placeholder: '#9CA3AF',    // Input placeholder / disabled text

    // Status
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#EF4444',

    // Misc
    muted: '#9CA3AF',
    disabled: '#D1D5DB',
};
