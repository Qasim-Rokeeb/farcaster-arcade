
# 🤝 Contributing to Warpcast Arcade

Thank you for your interest in contributing to **Warpcast Arcade**!  
This project thrives with community-driven games, design ideas, and smart on-chain experiments.

---

## 🧩 How You Can Contribute

- 🎮 Add a new Frame-compatible mini-game
- 🧠 Improve existing game logic or UX
- 🐛 Fix bugs or clean up code
- 🧱 Refactor or optimize components
- 🎨 Improve the UI or animations
- 📚 Enhance documentation
- 📤 Share your fork or remix publicly

---

## 📁 Key Project Structure

| Path | Purpose |
|------|---------|
| `src/games/` | All mini-game components live here |
| `src/components/` | Shared UI and support components |
| `src/data/games.ts` | Game metadata and routing config |
| `/api/frame-response.ts` | Serverless Frame logic for sharing and actions |

---

## 🎮 Game Contribution Checklist

Before submitting a game:

- [ ] Game fits within a 600×600px frame
- [ ] Game uses local assets or base64 where possible
- [ ] Game has no external logins or trackers
- [ ] You've tested responsiveness and dark mode
- [ ] Game is registered in `src/data/games.ts`
- [ ] (Optional) You added a Frame-compatible interaction in `/api/frame-response.ts`

---

## 🛠 Dev Tips

- Use `npm run dev` for local testing
- Use `npm run lint` before pushing code
- Keep dependencies minimal — most logic should run in the browser without extra setup
- Keep UI consistent with the rest of the arcade (Tailwind + ShadCN UI)

---

## 📸 Game Previews (Recommended)

If your game is visual, please include:

- A screenshot (JPEG/PNG)
- Or a short GIF demo
- Or a link to a live preview

Add it in your PR or commit message.

---

## ✅ Before You Submit a Pull Request

- [ ] Your code runs locally without breaking existing games
- [ ] You've written clean, readable code
- [ ] You've explained the purpose of your contribution in the PR description
- [ ] You've added screenshots or a clear summary for visual/UI changes

---

## 💬 Join the Community

Feel free to connect, ask questions, or drop feedback in the official Warpcast channel:

👉 [https://warpcast.com/~/channel/warpcast-arcade](https://warpcast.com/~/channel/warpcast-arcade)

---

Thanks for helping build the future of Web3 gaming — one Frame at a time 🕹✨
```
