# Tee and Tee World Unique Beauty

Website for Tee and Tee World Unique Beauty, a barber (first floor) and beauty (second floor) salon at Fence Bus Stop, Ayetoro-Itele Road, Ota, Ogun State, Nigeria.

Visitors browse the services and gallery, then prepare a booking request that opens in WhatsApp. A request is not a confirmed appointment until the salon replies. There are no online payments.

## Project structure

```
index.html                page shell, metadata and structured data
css/tailwind.css          generated utility styles (do not edit by hand)
css/styles.css            custom styles: buttons, directory sign, glows, accessibility
js/app.js                 the compiled site (React). Content lives here, see below
js/enhancements.js        small add-ons: scroll reveal, scroll cue, glows, safe links
assets/images/            all salon photos and the logo
assets/                   favicon, apple-touch-icon and the social-sharing image
netlify.toml              Netlify settings (no build step, security headers)
.nojekyll                 lets GitHub Pages serve the files as they are
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

**GitHub Pages:** push to GitHub, then Settings > Pages > Deploy from a branch > `main` / root.

**Netlify:** New site > Import from Git > pick the repository. Leave the build command empty and set the publish directory to `.` (the repository root).

All paths are relative, so the site also works under a sub-path such as `https://username.github.io/repository-name/`.

## Editing content

`js/app.js` is compiled and minified, so edit it with find and replace. Search for these exact strings:

| To change | Search for |
| --- | --- |
| WhatsApp number (digits only) | `2347013178030` |
| Phone number as displayed | `+234 701 317 8030` |
| Address | `Fence Bus Stop, Ayetoro-Itele Road` |
| Google Maps link | `maps.google.com/?cid=` |
| Barber services list | `Skin Fade & Shape-Up` |
| Beauty services list | `Makeup & Gele","Wigs & Braids"` |
| Opening hours text | `Please contact the salon to confirm availability.` |

To replace a photo, overwrite the file in `assets/images/` using the same file name. Photos should be about 720 px wide JPEGs.

## Still to do after the first deploy

1. Add the live address to `index.html` inside `<head>`, using the real domain, so shared links show the logo preview:

```html
<link rel="canonical" href="https://YOUR-DOMAIN/">
<meta property="og:url" content="https://YOUR-DOMAIN/">
<meta property="og:image" content="https://YOUR-DOMAIN/assets/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="https://YOUR-DOMAIN/assets/og-image.jpg">
```

2. Salon owner to confirm: opening hours, service prices, the official business name (the site says "Tee and Tee World Unique Beauty", the Google listing says "Tee & Tee World Unique Beauty & Hair Palace"), and that Spa & Facial is offered.
