# VoxPrepress — Static site scaffold

This scaffold contains a responsive, bilingual (ENG / SRP) single-page site with sections: Home, Blog, Portfolio and Contact.

Quick start:

```powershell
# open the folder and serve with a static server, e.g. using Python 3
python -m http.server 8000
# then open http://localhost:8000
```

Notes / next steps:
- Replace `you@yourdomain.com` in `index.html` with your real contact email.
- Update the Google Maps query in the iframe `src` to your address.
- Add real portfolio images in `css`/`js` or an `assets/images` folder and update `renderPortfolio()`.
- For real contact form submissions, connect the form to a server endpoint or use a service like Formspree.
