# Mynt - Fashion E-commerce Platform

A modern fashion e-commerce platform inspired by Myntra, built with Next.js 14, MongoDB, and TypeScript.

## Features

- 👔 Multi-category fashion store (Men, Women, Kids, Home, Beauty)
- 🛍️ Product catalog with filters
- 🛒 Shopping bag and wishlist
- 📦 Order management
- 💳 Multiple payment methods
- 🎨 Modern, responsive UI

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Database**: MongoDB Atlas (with Mongoose ODM)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB Atlas account (free tier available)

### Installation

1. Navigate to the mynt folder:
```bash
cd mynt
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Edit `.env` and add your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
mynt/
├── app/
│   ├── admin/            # Admin panel
│   ├── bag/              # Shopping bag
│   ├── checkout/         # Checkout flow
│   ├── product/          # Product details
│   └── components/       # React components
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   ├── models.ts         # Mongoose models
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

## Categories

- **Men**: T-Shirts, Shirts, Jeans, Blazers, Shoes
- **Women**: Dresses, Tops, Kurtas, Sarees, Handbags
- **Kids**: T-Shirts, Dresses, Ethnic Wear
- **Home & Living**: Cushion Covers, Bedsheets, Decor
- **Beauty**: Lipstick, Foundation, Skincare

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## License

MIT
