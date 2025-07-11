
# 🧪 Warpcast Arcade — Developer Guide

This guide helps you run Warpcast Arcade locally and add your own games or contributions.

---

## 🛠 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/warpcast-arcade.git
cd warpcast-arcade
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🌐 Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add the required environment variables:

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=yourAlchemyKey
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=yourWalletConnectProjectID
```

Use **Sepolia** or **Base** for development/testing.

---

## ▶ Run Locally

```bash
npm run dev
```

Open your browser at:  
[http://localhost:3000](http://localhost:3000)

---

## 🎮 Add a Game

To add your own game:

1. Create a folder under `src/games/your-game-name`
2. Add your game as a React component
3. Register it in `src/data/games.ts`
4. (Optional) Add Frame logic in `/api/frame-response.ts` if you'd like the game to be shareable as a Farcaster Frame

---

## 💖 Tip / Support Logic

To power the "Tip the Dev" or "Support the Game" button:

- Edit `src/components/support-dialog.tsx`
- Set your preferred tipping methods (e.g. ETH address, $DEGEN tag, or Warpcast link)
- You can integrate on-chain payments, Warpcast call-to-actions, or external donation links

---

## 🚀 Deployment

Use:

- [Vercel](https://vercel.com/) – great for fast Next.js hosting
- [Firebase Hosting](https://firebase.google.com/docs/app-hosting)

Make sure to set your environment variables in your platform's dashboard.

---

## 🤝 Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution rules and project structure.

---
`