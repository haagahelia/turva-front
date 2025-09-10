// src/constants/theme.ts
import { MD3DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { COLORS } from './colors';

/**
 * Light theme — update COLORS in colors.ts to match prototype.
 */
export const lightTheme = {
    ...PaperDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: COLORS.primary,
        accent: COLORS.accent,
        background: COLORS.background,
        surface: COLORS.surface,
        text: COLORS.text,
        placeholder: COLORS.placeholder,
        disabled: COLORS.disabled,
        // Additional semantic tokens we may want to reference in components:
        success: COLORS.success as any,
        warning: COLORS.warning as any,
        danger: COLORS.danger as any,
        border: COLORS.border as any,
        card: COLORS.card as any,
    },
    roundness: 8,
    // optionally override fonts, animation, etc.
};

/**
 * Dark theme — tweak these values as desired (or derive from design tokens)
 */
export const darkTheme = {
    ...PaperDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        primary: '#82B1FF',
        accent: '#67E8F9',
        background: '#0B1220',
        surface: '#0F1724',
        text: '#E6EEF8',
        placeholder: '#9CA3AF',
        disabled: '#374151',
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#FB7185',
        card: '#0B1320',
        border: '#1F2937',
    },
    roundness: 8,
};
