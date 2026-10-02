# Design system — atlas edition

## Visual idea

An urban ecology atlas with the pacing of an exhibition. The interface uses warm paper, fine rules, editorial type, an illustrated coast, and small labels that feel like map annotations. It follows the user-provided portfolio reference without copying its page compositions or treating its contents as instructions.

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F4EFE4` | Main ground |
| Teal | `#4C989A` | Water and data accents |
| Dark teal | `#285F63` | Primary action and headings |
| Forest | `#617C5D` | Ecology and vegetation |
| Coral | `#D77D67` | Human choices and emphasis |
| Sand | `#D9C49E` | Archive accents |
| Ink | `#252525` | Main text and rules |

The runtime tokens live in `app/globals.css`, alongside matching Tailwind theme colors. Keep contrast readable on both paper and tinted panels.

## Type, spacing, and components

- Use Georgia italic for exhibition questions and section titles, with a plain sans-serif for labels, data, and body copy.
- Keep content in a wide page shell with generous margins. Use thin dividers to create archive-like sections.
- Shared pieces include the site header/footer, eyebrow labels, data provenance tags, section headings, illustrated map, agent cards, indicator rows, and timeline.
- On desktop, the city lens has agents / map / indicators. Tablet keeps two columns and moves indicators below. Mobile stacks map, agents, indicators, then timeline.
- Motion should be slow and purposeful. Honor reduced-motion preferences. The first phase uses only subtle hover feedback.

## Truthful data presentation

`VISUAL PREVIEW` identifies static shell content. Real API values will use `REAL DATA`; deterministic future metrics will use `SIMULATED DATA`; generated dialogue or imagery will use `AI-GENERATED DATA`. Empty collective values remain dashes until Supabase records exist.
