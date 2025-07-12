export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    
     "accountAssociation": {
    "header": "eyJmaWQiOjg3MjkzNSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFEMDYzMjVEMjExODhEQ2FlMEJFRDMxODQ0ZDg3MjllQ0Y3MDQxRGIifQ",
    "payload": "eyJkb21haW4iOiJmYXJjYXN0ZXItYXJjYWRlLnZlcmNlbC5hcHAifQ",
    "signature": "MHgzMjk1ZDljZjM2YmFkOGM5MTY0MzgyYjhjYzNhMWMyYWYxNTAzOGNmZmVjYTE2NDllNjAyMWRmOGU1MWYxYzZmNGJmMTE2NWIwNzdiYTA1NjRlMTFjZjZiNzkyN2JmMTdlYTU4M2NkZWU3OGRjMjViMWRlNDAwNDQ1MDA1MDFjNTFj"
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

 
