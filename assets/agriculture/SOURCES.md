# Plant Health assets

All images are stored locally. No external image requests are needed at runtime.

## Existing TII image

- Hero: `../agriculture.jpg` (2400 × 1799). Reused unchanged from the existing homepage.

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
