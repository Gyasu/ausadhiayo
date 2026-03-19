# ausadhiayo

A web-based prescription delivery subscription service called **MediRoute**. Patients fill out a guided 5-step form with their personal info, medications, doctor details, and delivery preferences — and we handle the rest.

---

## What It Does

- Collects patient information via a clean, guided 5-step form
- Captures prescription details, prescribing doctor info, and pharmacy transfer data
- Lets patients set their delivery address, frequency, and preferred schedule
- Validates each step inline before proceeding
- Generates a confirmation number on submission

---

## Project Status

> React + Vite frontend — migrated from a single HTML prototype. Backend coming soon.

---

## Requirements

- Node.js 18+
- npm 9+

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gyasu/ausadhiayo.git
cd ausadhiayo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at http://localhost:5173 |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Folder Structure

```
ausadhiayo/
├── index.html                  # Vite HTML entry point
├── vite.config.js              # Vite + React plugin config
├── package.json
├── readme.md
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Root component — layout + submitted state
    ├── index.css               # All global styles
    ├── utils/
    │   ├── formatDate.js       # Date formatting helper
    │   └── validation.js       # Per-step form validation (pure functions)
    └── components/
        ├── Header.jsx          # Sticky top nav with logo + HIPAA badge
        ├── Hero.jsx            # Hero section with feature pills
        ├── Footer.jsx          # Footer with links
        ├── Stepper.jsx         # 5-step progress indicator
        ├── SuccessScreen.jsx   # Confirmation screen shown after submit
        ├── ui/
        │   ├── Field.jsx       # Reusable label + input + error message
        │   ├── RadioCard.jsx   # Styled radio button card
        │   └── SectionDivider.jsx  # Horizontal rule with label
        └── form/
            ├── MultiStepForm.jsx   # Owns all form state and step logic
            ├── FormNav.jsx         # Back / Continue / Submit buttons
            ├── StepPersonal.jsx    # Step 1 — personal info
            ├── StepPrescriptions.jsx  # Step 2 — medications
            ├── StepDoctor.jsx      # Step 3 — doctor & pharmacy
            ├── StepDelivery.jsx    # Step 4 — delivery preferences
            └── StepReview.jsx      # Step 5 — review before submitting
```

---

## Form Fields Collected

| Section | Fields |
|---|---|
| Personal | First/last name, DOB, phone, email, insurance provider, member ID, group number |
| Prescriptions | Medication name, dosage, frequency; drug allergies, medical conditions |
| Doctor | Name, specialty, phone, fax, clinic; current pharmacy name, phone, Rx number |
| Delivery | Street, city, state, ZIP, instructions; delivery frequency, preferred day/time, first delivery date |

---

## Tech Stack

| Layer | Current | Planned |
|---|---|---|
| Frontend | React 18 + Vite | — |
| Styling | Plain CSS (custom properties) | — |
| Backend | None | Node.js + Express |
| Database | None | PostgreSQL |
| Auth | None | Clerk or Auth0 |
| Hosting | TBD | Vercel or Railway |

---

## Roadmap

- [x] Migrate to React + Vite
- [ ] Add backend API (Node.js + Express or Next.js API routes)
- [ ] Connect to database (PostgreSQL or MongoDB)
- [ ] Patient authentication (login / account management)
- [ ] Admin dashboard to view submitted orders
- [ ] Email/SMS confirmation on signup (SendGrid / Twilio)
- [ ] Stripe integration for billing
- [ ] Mobile app (React Native)

---

## Contributing

1. Create a branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit
   ```bash
   git add .
   git commit -m "describe what you changed"
   ```
3. Push and open a Pull Request on GitHub
   ```bash
   git push origin feature/your-feature-name
   ```
4. Tag your collaborator to review before merging

---

## Team

| Name | Role |
|---|---|
| You | Co-founder / Dev |
| Your Friend | Co-founder / Dev |

---

## License

Private — not open source. All rights reserved.