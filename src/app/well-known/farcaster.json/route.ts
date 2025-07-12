export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "",
      payload: "",
      signature:
        "",
    },
    frame: {
      version: "1",
      name: "Farcaster Arcade",
      iconUrl: `https://farcaster-arcade.vercel.app//icon.png`,
      homeUrl: `https://farcaster-arcade.vercel.app/`,
      imageUrl: `https://farcaster-arcade.vercel.app/frames/hello/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `https://farcaster-arcade.vercel.app//splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `https://farcaster-arcade.vercel.app//api/webhook`,
    },
  };

  return Response.json(config);
}