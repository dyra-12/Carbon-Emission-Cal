
# Carbon Emission Calculator

Live Demo: [https://carbon-emission-calculator-lilac.vercel.app/](https://carbon-emission-calculator-lilac.vercel.app/)

## Overview

The Carbon Emission Calculator is a web application that helps users estimate the CO₂ emissions produced by their vehicle trips. It supports both electric and petrol vehicles, allowing users to input relevant data and instantly see their carbon footprint.

## Features

- Calculate CO₂ emissions for Electric Vehicles (EV) and Petrol Vehicles
- User-friendly interface with real-time validation and error messages
- Customizable input for distance, energy/fuel consumption, and charging efficiency
- Responsive design, works on desktop and mobile

## How It Works

1. Select your vehicle type (Electric or Petrol)
2. Enter the distance traveled
3. For EVs: enter energy consumption (kWh/km) and charging efficiency (%)
4. For Petrol: enter fuel efficiency (km/L)
5. Click "Calculate Emissions" to see your estimated CO₂ output

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/dyra-12/Carbon-Emission-Cal.git
cd Carbon-Emission-Cal
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/components/EmissionsCalculator.tsx` – Main calculator component
- `app/page.tsx` – Home page
- `lib/utils.ts` – Utility functions

## License

MIT
