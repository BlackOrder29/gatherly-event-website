# Gatherly — Event Management Website

A responsive event discovery and registration website built with **HTML5, CSS3 and vanilla JavaScript**. This project was created to meet the K Explore – Web Designing task requirements.

## Features

- Responsive landing page for mobile, tablet and desktop screens.
- Event cards with image, name, date, venue, category, price and description.
- Search events by title, category, venue or description.
- Filter events by category.
- Event detail dialog with a registration call-to-action.
- Registration form for name, email, phone number and selected event.
- JavaScript validation with field-level error messages.
- Registration success confirmation.
- Registrations stored in browser `localStorage`.
- Dark/light theme toggle with saved preference.
- Mobile navigation menu.
- Newsletter demo interaction.
- Reduced-motion support and semantic/accessible labels.

## Tech stack

- HTML5
- CSS3 (Grid, Flexbox, media queries, custom properties)
- Vanilla JavaScript (DOM, events, validation, Local Storage)
- Google Fonts and Unsplash image URLs

## Run locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser.

For a smoother development experience, use the **Live Server** extension in Visual Studio Code.

## Project structure

```text
gatherly-event-website/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Registration data

Successful registrations are stored in the browser under the localStorage key:

```js
gatherlyRegistrations
```

This is a frontend demonstration only. Data is saved in the visitor's browser and is not sent to a backend server. The newsletter form is also a demo interaction and does not send email.

## Customisation

Edit the `events` array near the top of `script.js` to add, remove or update event information. Each event has an `id`, `title`, `category`, `date`, `time`, `venue`, `price`, `description`, `image`, `longDescription`, `day` and `month`.

Replace the sample image URLs with your own event images if desired.

## Deploy

### GitHub Pages
1. Create a GitHub repository and upload the project files.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Your deployment URL will appear in the Pages section.

### Netlify
1. Sign in to Netlify.
2. Choose **Add new site → Deploy manually**.
3. Drag the project folder into the deployment area, or connect the GitHub repository.
4. Netlify will provide a public deployment URL.

## Git workflow

```bash
git init
git add .
git commit -m "Build responsive Gatherly event website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Notes

- The event content is sample data for the assignment. Confirm actual event details before using this as a live event platform.
- The website currently has no backend, payment gateway, authentication or server-side registration processing.
