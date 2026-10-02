# Asset inventory

This inventory covers every file found in `public/raw-assets` on 2026-10-01. The 14 originals remain untouched. The library contains 13 unique copies because two hand-gesture JPGs have the same SHA-256 hash. Every source, destination, dimension, description, suggested use, and confidence is recorded in [`public/assets/manifest.json`](../public/assets/manifest.json).

## Files found and classification

| Source | Dimensions | Library file | What it contains |
| --- | ---: | --- | --- |
| `Frame 11 (1).png` | 2000 × 1880 | `references/temporal-lens-interface-concept.png` | Warm agent/map/indicator/timeline concept |
| `Frame 22.png` | 1188 × 1188 | `brand/illustrated-qingdao-cover.png` | Illustrated Qingdao cover with embedded title and Start Game artwork |
| `nanobanana-edited-2026-04-17T02-28-20-682Z.jpg` | 2304 × 1856 | `references/tablet-city-interface-mockup.jpg` | City interface photographed on a tablet |
| `nanobanana-edited-2026-04-19T06-48-21-411Z.jpg` | 2048 × 2048 | `references/dark-technical-prototype-mockup.jpg` | Earlier dark desktop prototype |
| `nanobanana-edited-2026-04-19T07-19-56-817Z.jpg` | 2048 × 2048 | `ui/interaction-gesture-icon-sheet.jpg` | Touch, keyboard, voice, cursor, and controller illustration sheet |
| `nanobanana-edited-2026-04-19T07-20-56-719Z.jpg` | 2048 × 2048 | **Same file as above** | Exact duplicate; no additional library copy |
| `nanobanana-edited-2026-04-19T07-21-41-095Z.jpg` | 2048 × 2048 | `ui/ai-city-workflow-illustration-sheet.jpg` | AI city process illustration sheet |
| `nanobanana-edited-2026-04-19T07-25-17-255Z.jpg` | 2048 × 2048 | `ui/creative-technology-illustration-sheet.jpg` | AI, XR, drone, and creative tool illustration sheet |
| `nanobanana-edited-2026-04-19T12-37-08-356Z.jpg` | 4096 × 4096 | `references/dark-video-editor-concept-high-resolution.jpg` | Dark video editor concept, high resolution |
| `nanobanana-edited-2026-04-19T12-37-20-754Z.jpg` | 2048 × 2048 | `misc/third-party-branded-migration-map-mockup.jpg` | Relief-map mockup with visible Airbnb branding |
| `nanobanana-edited-2026-04-19T12-40-18-251Z.jpg` | 2048 × 2048 | `maps/bird-migration-relief-map.jpg` | Bird migration relief-map concept without third-party branding |
| `nanobanana-edited-2026-04-19T13-47-07-935Z.jpg` | 2048 × 2048 | `references/warm-video-editor-interface-concept.jpg` | Warm editor interface concept |
| `nanobanana-edited-2026-04-19T13-50-18-234Z.jpg` | 2048 × 2048 | `references/dark-video-editor-concept-variant.jpg` | Alternate dark editor concept |
| `nanobanana-edited-2026-04-19T14-47-24-393Z.jpg` | 2048 × 2048 | `references/agent-debate-decision-concept.jpg` | Agent discussion, city pin, bird journal, and heat map concept |

## Relationship to the portfolio PDF

- The illustrated cover is a direct match for the Qingdao coast and exhibition-entry treatment on PDF pages 1 and 4.
- The warm three-column interface and tablet mockup correspond to the agent/map/indicator/timeline composition on page 4.
- The agent debate and decision concept echoes the city decision composition on page 5.
- The icon sheets reflect the process and technology diagrams on page 2.
- The dark technical prototype and editor concepts reflect the process and post-production material on pages 3 and 5. They are archive references rather than the visual target for the live site.
- The bird migration relief map supports the bird perspective and ecological narrative, but its routes are illustrative. It must not be labeled as observed migration data.

## Recommended placement

### Landing

Use `brand/illustrated-qingdao-cover.png` as a clearly framed piece of original project artwork. Its title, Start Game button, and loading bar are baked into the pixels, so the live title and entry action stay in React. The cover is decorative and has no click target of its own.

### City Temporal Lens

Use the city illustration at the center of `references/temporal-lens-interface-concept.png` only as visual context if it can be framed without presenting its baked-in panels as controls. Keep the map selection, indicators, agent list, and timeline as DOM/React elements. This image is a concept, not geospatial data.

### AI Agents

`references/agent-debate-decision-concept.jpg` and `references/temporal-lens-interface-concept.png` show agent styling and debate composition. They are useful for visual reference; there are no standalone agent portrait files to place directly in live cards.

### Parallel Future

No supplied file depicts three clean, separate 2050 outcomes. The editor concepts show production workflow, not future scenes. Keep the current scene cards as React/CSS artwork until real future-state illustrations are available.

## Resolution, suitability, and gaps

No whole image is below 1188 × 1188. The 1188 px cover may look soft if enlarged across a very wide high-density display. Individual drawings inside the composite icon sheets have much lower effective resolution than the full 2048 px sheet. Avoid cropping them into large icons without review.

Do not publish the Airbnb-branded mockup. The dark technical/editor concepts conflict with the warm atlas interface. All complete interface images are references only: using them as page backgrounds would turn functional controls into static screenshots. Several AI-generated mockups contain small text and illustrative values; these are not verified product data.

Important missing assets: a clean high-resolution Qingdao/Zhongshan Road map illustration without baked-in controls, four separate agent portraits, individual UI icons with transparent backgrounds, and separate ecology/development/balanced 2050 scene illustrations. A real geospatial map layer and licensed/attributed observations are also still needed for later product phases.
