# VowFare

Wedding vendor budgeting and booking prototype. Live site: https://kenziemw.github.io/Vow-Fare-Makenzie-Whitman/

## Structure
- `index.html`: page markup only
- `styles.css`: all styling
- `app.js`: screens, budget logic, vendor list
- `monitoring.js`: error capture, page-load timing, usage events
- `data/vendors.js`: **all vendors and prices** (edit here to add or change a vendor)
- `tests/smoke.mjs`: browser smoke tests, run automatically on every push

## Add or change a vendor
Edit `data/vendors.js`, commit, and the CI check runs. No other file needs to change.

## Run the tests locally
```
npm install
npx playwright install chromium
npm test
```

## Monitoring
Add `?debug=1` to the URL to see a live panel of recent events and errors. To send events to a free dashboard, create a site at goatcounter.com and set `goatcounterCode` at the top of `monitoring.js`.
