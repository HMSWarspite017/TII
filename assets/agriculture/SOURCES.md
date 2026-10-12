# Plant Health assets

All images are stored locally. No external image requests are needed at runtime.

## Existing TII image

- Previous hero: `../agriculture.jpg` (2400 × 1799). Retained for its existing uses elsewhere; no longer used on this page.

## User-provided brochure

Source: 宣传册(1).pdf, page 4, supplied by the website owner.
Extracted from the page's native 2480 × 3366 raster, then cropped without upscaling:

- `brochure-laboratory.jpg`: laboratory / microscope illustration, crop (194, 1638, 572, 2100).
- `brochure-seedlings.jpg`: propagation tray illustration, crop (1356, 895, 1744, 1375).
- `brochure-drone.jpg`: field drone illustration, crop (194, 2279, 581, 2749).

These are identified as brochure illustrations in the page caption and alt text;
they are not presented as documentary photographs of TII facilities.
No complete brochure pages are published. Page 3 informs the six plant-health
principles; page 4 informs the six capabilities. Copy is condensed and bilingual.

## Crop photographs

Downloaded at 1000px width from Pexels on 2026-09-30, JPEG quality parameter 88.
Used as general crop illustrations, not as photographs of TII-owned farms.
License: https://www.pexels.com/license/

- `rice.jpg` — Luo Chris: https://www.pexels.com/photo/rice-paddy-in-close-up-photography-13074941/
- `durian.jpg` — Jess Ho: https://www.pexels.com/photo/close-up-of-a-green-fruit-on-a-tree-branch-17910516/
- `mango.jpg` — Mohan Nannapaneni: https://www.pexels.com/photo/close-up-of-fruit-on-tree-6206290/
- `coffee.jpg` — Sergiu Iacob: https://www.pexels.com/photo/a-close-up-shot-of-a-coffea-plant-6152431/

Each download uses `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1000&q=88`.

## Plant Health refinement — 2026-10-12

- Hero: `plant-health-hero.webp`, 1536 × 1024, generated using the built-in image_gen tool and encoded as WebP (quality 88). General illustrative scene, not a photograph of a TII-owned facility.
- Prompt: Refined editorial photograph of healthy tomato plants in a modern growing environment, simple trellis supports and discreet drip irrigation, natural leaf texture and green/ripening tomatoes, soft morning daylight, restrained forest/sage/earth palette, central crop-safe composition; no people, text, logos, aerial fields or technology overlays.
- Our Approach vignette and seven journey illustrations: original inline SVG, with schematic plant/root/bud/flower/fruit progression. Labels and explanations are selectable bilingual HTML using the existing data-zh/data-en language switch. Illustrations are conceptual, not crop-specific technical diagrams.

## Integrated Our Approach study — 2026-10-12

- `plant-health-study.svg`: original vector botanical study, drawn for the unified Our Approach composition. Organic leaves, fine venation, a shared soil horizon and branching roots connect the header to the six principles. The cropped study is decorative and schematic; it contains no embedded text. CSS controls its crop, fading mask and low contrast behind content.
- The previous standalone seedling vignette is removed from Our Approach. The Plant Health Journey illustrations and Hero image are retained.
