# Little Lemon – Table Booking Capstone

A responsive React application for a restaurant table reservation flow. Built with React and Vite.

## Features

- Responsive homepage with navigation, restaurant introduction, and menu highlights.
- Table booking form with date, time, party size, occasion, and customer details.
- Client-side validation for required fields, email format, phone number, and past dates.
- Accessible form labels, validation messages, keyboard-friendly controls, skip link, and semantic landmarks.
- On-screen reservation confirmation.
- Unit tests for required-field validation and successful form submission.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

1. Clone or download this repository.
2. Open the project folder in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Run tests

```bash
npm run test:run
```

## Create a production build

```bash
npm run build
```

## Notes

This is a front-end demonstration. A successful submission displays a confirmation on screen; it does not send reservation data to a restaurant backend or store bookings in a database. Real availability checks and booking persistence would require a backend service.

## Project structure

```text
little-lemon-capstone/
├── public/
├── src/
│   ├── components/
│   │   ├── BookingForm.jsx
│   │   └── BookingForm.test.jsx
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```
