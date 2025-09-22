
# 🎮 Warpcast Arcade

**Warpcast Arcade** is a free, open-source gaming platform built for Farcaster Frames. Play retro-style classics like Tetris, Sokoban, and Mini Car Racing — right inside the Warpcast feed.

---

## ✨ Features

- 🕹 **Frame-Playable Games** – No redirects or installs. Play instantly inside Warpcast.
- 🌐 **Wallet Ready** – Connect seamlessly via WalletConnect + Wagmi.
- 🎨 **Retro UI** – Built with Tailwind CSS and ShadCN UI in full dark mode.
- 💻 **Open Source & Customizable** – Easily fork, deploy, and add your own games.
- 💖 **Community Supported** – Enjoy it for free, or [Tip the Dev](#-support)

---

## 🚀 Live Demo

Try it on Warpcast:  
👉 [https://warpcast-arcade.vercel.app](https://warpcast-arcade.vercel.app)

---

## 🧱 Built With

| Layer      | Stack                                        |
|------------|----------------------------------------------|
| Framework  | Next.js, React, TypeScript                   |
| Styling    | Tailwind CSS, ShadCN UI                      |
| Web3       | Wagmi, Viem, ConnectKit                      |
| Hosting    | Vercel / Firebase                            |
| Frames     | Frame HTML + Farcaster Open Frames Spec      |

---

## 🛠 Developer Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/warpcast-arcade.git
cd warpcast-arcade
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

```bash
cp .env.example .env.local
```

Add the required keys:

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=yourAlchemyKey
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=yourWalletConnectProjectID
```

Use **Sepolia** or **Base** for development/testing.

### 4. Run Locally

```bash
npm run dev
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🎮 How to Add a Game

1. Create a folder in `src/games/your-game-name`
2. Build your game as a React component
3. Add your game to `src/data/games.ts` (title, slug, image, etc.)
4. (Optional) Add Frame logic to `/api/frame-response.ts` for shareable casting

Game Requirements:
- Max size: 600×600px (Frame-safe)
- No external login or tracking
- Self-contained (offline-friendly if possible)

---

## 💖 Support

Enjoying the arcade? You can keep it alive by supporting the project!

- [🫡 Tip the Dev on Warpcast](https://warpcast.com/~/channel/warpcast-arcade)
- Send ETH or $DEGEN directly
- Share the project, remix it, or add your own game!

---

## 🤝 Contributing

### How You Can Help

- 🎮 Submit a new Frame-compatible game
- 🖌 Improve UI/UX or add animations
- 🐛 Fix bugs or improve performance
- 📚 Update docs or examples

### Before You Submit a Pull Request

- [ ] Game runs with `npm run dev`
- [ ] Registered in `src/data/games.ts`
- [ ] Frame response added (if needed)
- [ ] Responsive layout and dark mode tested
- [ ] Linted (`npm run lint`)
- [ ] Screenshots or GIF included (if UI-related)

Join the community:  
👉 [Warpcast Arcade Channel](https://warpcast.com/~/channel/warpcast-arcade)

---

## 📄 License

MIT License — free to use, fork, and remix with attribution.

---


## 📄 License

MIT License — free to use, fork, and remix with attribution.

---

## 💬 Final Notes

Warpcast Arcade is for the culture — let’s build the most fun, decentralized arcade on the internet 🕹️✨
```

---

