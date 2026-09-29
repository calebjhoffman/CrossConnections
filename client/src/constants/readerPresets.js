export const APP_FONTS = {
  inter: {
    label: 'Inter',
    fontFamily: '"Inter", system-ui, sans-serif',
  },

  atkinson: {
    label: 'Atkinson Hyperlegible',
    fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif',
  },

  literata: {
    label: 'Literata',
    fontFamily: '"Literata", Georgia, serif',
  },

  system: {
    label: 'System',
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
}

export const DEFAULT_APP_FONT_KEY = 'inter'

export const READER_PRESETS = {
  default: {
    label: 'Default',
    description: 'Balanced spacing for everyday reading.',
    fontSize: 18,
    lineHeight: 1.85,
    letterSpacing: 0,
    paragraphSpacing: 16,
  },

  large_print: {
    label: 'Large Print',
    description: 'Larger text with generous spacing.',
    fontSize: 22,
    lineHeight: 1.95,
    letterSpacing: 0.2,
    paragraphSpacing: 20,
  },

  dyslexia_friendly: {
    label: 'Dyslexia Friendly',
    description: 'More spacing and clearer letter separation.',
    fontSize: 20,
    lineHeight: 2,
    letterSpacing: 0.45,
    paragraphSpacing: 22,
  },

  high_comfort: {
    label: 'High Comfort',
    description: 'Soft, spacious reading for longer sessions.',
    fontSize: 20,
    lineHeight: 2.05,
    letterSpacing: 0.15,
    paragraphSpacing: 24,
  },
}

export const DEFAULT_READER_PRESET_KEY = 'default'