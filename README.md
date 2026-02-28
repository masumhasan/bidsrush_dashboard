# BidsRush Dashboard

A complete, professional Next.js 14 dashboard application for a bidding/auction platform called "BidsRush".

## 🚀 Features

- **Dashboard Home Page**: Overview with key statistics, recent bids table, and featured auctions
- **Active Auctions Page**: Browse all active auctions with search and filter functionality
- **My Bids Page**: View all user bids with filtering by status (Won, Active, Lost)
- **Won Auctions Page**: See all auctions that were successfully won
- **Settings Page**: User profile, security, and notification preferences
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS with a professional dark sidebar and light content area
- **TypeScript**: Fully typed for type safety and better development experience

## 📊 Dashboard Sections

### Home Page (/)
- **Stats Cards**: Display key metrics:
  - Total Bids (248)
  - Active Auctions (12)
  - Won Auctions (34)
  - Total Spent ($12,480)
- **Recent Bids Table**: Shows latest bids with status indicators
- **Featured Auctions**: Grid of active auction cards

### Active Auctions (/auctions)
- Grid view of all 12 active auctions
- Search functionality by item name
- Filter by category
- Sort options (by time, bid amount, number of bids)
- Auction cards with item image, current bid, time remaining, total bids, and "Place Bid" button

### My Bids (/bids)
- Table view of all user bids
- Filter by status: Won, Active, Lost
- Statistics cards showing bid counts
- Bid summary with total amount, average bid, and win rate

### Won Auctions (/won)
- Grid view of all won auctions
- Summary statistics
- Details for each won auction

### Settings (/settings)
- **Profile Tab**: Update name, email, phone, bio, and profile picture
- **Security Tab**: Change password, enable 2FA, manage active sessions
- **Notifications Tab**: Email notification preferences

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 📦 Installation

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
src/
├── app/
│   ├── auctions/page.tsx      # Active Auctions page
│   ├── bids/page.tsx          # My Bids page
│   ├── settings/page.tsx      # Settings page
│   ├── won/page.tsx           # Won Auctions page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home/Dashboard
├── components/
│   ├── AuctionCard.tsx        # Auction card
│   ├── Header.tsx             # Top header
│   ├── RecentBidsTable.tsx    # Recent bids table
│   ├── Sidebar.tsx            # Navigation
│   └── StatCard.tsx           # Stats card
├── lib/
│   └── mockData.ts            # Mock data
└── types/
    └── index.ts               # Type definitions
```

## 📋 Mock Data

- 12 Active Auctions with various item types
- 8 User Bids with different statuses
- User Profile with avatar
- Dashboard Statistics

## 🎨 UI/UX Features

- Dark sidebar with light content area
- Color-coded status badges (green/blue/red)
- Interactive hover effects
- Responsive grid layout (1-4 columns)
- Professional styling with Tailwind CSS

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

Deploy on Vercel (recommended):
1. Push to GitHub
2. Connect to Vercel
3. Deploy

---

**Built with ❤️ using Next.js 14 and Tailwind CSS**
