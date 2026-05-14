# MIG Golf Improvement App 
This version includes:

- MIG Golf logo branding
- Clerk login and sign-up
- Protected dashboard
- Stripe Checkout for MIG Player and MIG Elite subscriptions
- Success/cancel pages

## Environment variables to add in Vercel

Go to:

Vercel → Project → Settings → Environment Variables

Add these:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_APP_URL=https://mig-golf-improvement-app.vercel.app
STRIPE_SECRET_KEY=
STRIPE_PLAYER_PRICE_ID=
STRIPE_ELITE_PRICE_ID=
```

## Stripe setup

Create 2 recurring monthly products in Stripe:

- MIG Player — $9.99/month
- MIG Elite — $29.99/month

Copy each product's recurring Price ID into Vercel:

- MIG Player Price ID → `STRIPE_PLAYER_PRICE_ID`
- MIG Elite Price ID → `STRIPE_ELITE_PRICE_ID`

## Deploy

```bash
npm install
vercel --prod
```
