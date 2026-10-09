# Eclipse-inspired scroll text reveal

An independent recreation of the large letter-by-letter colour reveal observed on [Eclipse Space](https://www.eclipse.space/). It is not their extracted proprietary source, font or canvas artwork.

Open `index.html` directly in any modern browser. Scroll down slowly and back up. The theme button previews the light reference style or Back Office navy. No installation, build process, external fonts or libraries are required.

## Add to your page

```html
<link rel="stylesheet" href="reveal.css">
<script src="reveal.js" defer></script>

<h2 class="er-text" data-eclipse-reveal>
  Behind every successful application is a well-prepared documentation team.
  Because every detail matters.
</h2>
```

Use a text-only heading or paragraph: inline formatting and line breaks are supported, but do not place interactive controls inside the animated text. Place CTAs and illustrations beside or outside it. Multiple headings work independently.

## What matches the reference

- Large text begins pale and becomes solid progressively, character by character.
- Adjacent characters overlap their colour transitions, creating a soft moving reveal edge.
- Progress follows normal page scrolling and reverses when scrolling upward.
- A short time-based easing smooths mouse-wheel steps without intercepting scrolling.
- The layout uses staggered/indented lines. Eclipse uses a custom display typeface; this demo substitutes locally available condensed fonts, so exact letter shapes vary by device.

The observed text section is in normal document flow, not pinned. This recreation deliberately does not add a sticky 200vh section or copy the site's satellite/video animation.

## Adjust

- Typography: `.er-text` in `reveal.css`; you may use your existing brand font.
- Starting contrast: `--er-muted: .065` (light) or `.13` (dark).
- Soft reveal edge: `wave = .22` in `reveal.js`; larger values overlap more characters.
- Scroll range: the `.85` and `.25` values in the target formula. Default begins when the text's top reaches 85% of the viewport and ends when its bottom reaches 60%.
- Smoothing: `.12` seconds in `Math.exp(-dt / .12)`.

The text stays readable if JavaScript is disabled. Screen readers receive a single unsplit text version. Reduced-motion preferences show all text immediately. No site files in the complete Back Office bundle were changed by this standalone demo.
