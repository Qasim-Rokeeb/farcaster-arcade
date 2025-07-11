
# 🧪 Warpcast Arcade — Developer Setup Guide

This guide helps developers set up, run, and customize the Warpcast Arcade project locally.

---

## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/farcaster-minigames.git
cd farcaster-minigames
```

---

### 2. Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Fill in the following values:

```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

> Ensure you're using the **Sepolia** network for Alchemy.

---

### 3. Set Payment Recipient Address

To receive payments for unlocking premium games:

- Open: `src/components/pay-to-play-dialog.tsx`
- Replace the `PAYMENT_RECIPIENT_ADDRESS` constant with your Ethereum wallet address:

```ts
const PAYMENT_RECIPIENT_ADDRESS = "0xYourWalletAddressHere";
```

---

### 4. Install Dependencies

```bash
npm install
```

---

### 5. Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:9002](http://localhost:9002)

---

## 🚀 Deployment Instructions

Deploy using:

- **[Vercel](https://vercel.com/)** – Recommended for Next.js support
- **[Firebase App Hosting](https://firebase.google.com/docs/app-hosting)**

Don’t forget to configure environment variables in your host's dashboard.

---

## 🧱 Tech Stack Overview

| Layer      | Tools                                        |
|------------|----------------------------------------------|
| Frontend   | Next.js, React, TypeScript                   |
| UI/UX      | Tailwind CSS, ShadCN UI                      |
| Web3       | Wagmi, Viem, ConnectKit                      |
| Hosting    | Vercel / Firebase                            |
| Payments   | Direct ERC20 transfers on Ethereum (Sepolia) |

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License
```

