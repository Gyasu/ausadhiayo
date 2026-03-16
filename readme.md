# ausadhiayo 💊

A web-based prescription delivery subscription service. Patients fill out a multi-step form with their personal info, medications, doctor details, and delivery preferences — and we handle the rest.

---

## What It Does

- Collects patient information via a clean, guided 5-step form
- Captures prescription details, prescribing doctor info, and pharmacy transfer data
- Lets patients set their delivery address, frequency, and preferred schedule
- Generates a confirmation number on submission

---

## Project Status

> 🚧 Currently in prototype stage — built as a single HTML file. Planned migration to React + backend coming soon.

---

## Running It Locally

No install needed for the prototype. Just:

1. Clone the repo
   ```bash
   git clone https://github.com/YOUR_USERNAME/ausadhiayo.git
   cd ausadhiayo
   ```
2. Open `index.html` in your browser
   ```bash
   open index.html        # macOS
   start index.html       # Windows
   ```

That's it.

---

## Folder Structure

```
ausadhiayo/
├── index.html          # Main prototype (single-file app)
├── README.md           # You're reading it
├── .gitignore          # Ignores node_modules, .env, etc.
├── design/             # Mockups, color palette, font decisions
│   └── notes.md
└── docs/
    └── form-fields.md  # Documents every form field and why we collect it
```

---

## Form Fields Collected

| Section | Fields |
|---|---|
| Personal | Name, DOB, phone, email, insurance info |
| Prescriptions | Medication name, dosage, frequency, allergies, conditions |
| Doctor | Name, specialty, phone, fax, clinic, pharmacy, Rx number |
| Delivery | Address, frequency, preferred day/time, first delivery date |

---

## Roadmap

- [ ] Migrate to React + Next.js
- [ ] Add backend API (Node.js + Express or Next.js API routes)
- [ ] Connect to database (PostgreSQL or MongoDB)
- [ ] Patient authentication (login / account management)
- [ ] Admin dashboard to view submitted orders
- [ ] Email/SMS confirmation on signup (SendGrid / Twilio)
- [ ] Stripe integration for billing
- [ ] Mobile app (React Native)

---

## Tech Stack

| Layer | Current | Planned |
|---|---|---|
| Frontend | HTML / CSS / JS | React + Next.js |
| Backend | None | Node.js + Express |
| Database | None | PostgreSQL |
| Auth | None | Clerk or Auth0 |
| Hosting | TBD | Vercel or Railway |

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