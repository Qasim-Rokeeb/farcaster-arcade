# 🎮 Warpcast Arcade

Warpcast Arcade is a lightweight, web-native app that brings classic casual games like Tetris, Sokoban, and Mini Car Racing directly to your browser. Users can play, share, and compete — all without leaving the app.

---

## 🎯 Features

- 🎮 **Classic Games Collection**: A curated selection of timeless arcade and puzzle games.
- 💰 **Play-to-Unlock**: Access premium games by making a small one-time payment with your crypto wallet.
- 🔗 **Web3 Wallet Integration**: Uses ConnectKit and Wagmi for a seamless wallet connection experience.
- 🎨 **Retro-Futuristic UI**: A sleek dark mode interface built with Tailwind CSS and ShadCN UI.
- 🚀 **Serverless Architecture**: All game and payment logic runs directly in the browser, interacting with the Ethereum blockchain.

---

## 🛠️ Tech Stack

| Layer         | Stack                                         |
|---------------|-----------------------------------------------|
| Frontend      | Next.js, React, TypeScript, Tailwind CSS, ShadCN UI |
| Web3 Logic    | Wagmi, Viem, ConnectKit                       |
| Payments      | Direct ERC20 token transfers on-chain         |
| Hosting       | Vercel, Firebase App Hosting, or similar      |

---

## 🧪 Installation & Local Development Guide

Follow these steps to get the project running on your local machine.

### Step 1: Clone the Repository
First, clone this repository to your local machine using git.

```bash
git clone https://github.com/your-username/farcaster-minigames.git
cd farcaster-minigames
```

### Step 2: Set Up Environment Variables
This project requires API keys for wallet connections.

1.  **Create a `.env.local` file** by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
2.  **Get API Keys:**
    *   **Alchemy API Key:** Go to [Alchemy](https://www.alchemy.com/), create a free account, make a new App for the **Sepolia** network, and get your API key.
    *   **WalletConnect Project ID:** Go to [WalletConnect Cloud](https://cloud.walletconnect.com/), create a new project, and copy your Project ID.
3.  **Fill in your `.env.local` file:**
    Open the `.env.local` file and replace the placeholder values with your actual keys. The `NEXT_PUBLIC_` prefix is required by Next.js to expose these variables to the browser.

### Step 3: Configure Your Payment Address
To receive payments for premium games, you must set your own wallet address.

-   Open the file: `src/components/pay-to-play-dialog.tsx`
-   Find the `PAYMENT_RECIPIENT_ADDRESS` constant.
-   Replace the placeholder address (`0x000...`) with your public Ethereum wallet address.

### Step 4: Install Dependencies
Install all the necessary packages using npm.

```bash
npm install
```

### Step 5: Run the Development Server
Now, you can start the local development server.

```bash
npm run dev
```

### Step 6: Open the App
Open your browser and navigate to [http://localhost:9002](http://localhost:9002). You should now see the Warpcast Arcade homepage!

---

## 📦 Deployment

Deploy to [Vercel](https://vercel.com/) or [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) for the best performance and easy setup. Ensure you set your environment variables in your hosting provider's settings.

---

## 📄 License

MIT License
