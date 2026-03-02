/**
 * One-time helper to get a Spotify refresh token.
 *
 * Usage:
 *   1. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET as env vars
 *   2. Run: node get-refresh-token.js
 *   3. Open the URL it prints in your browser
 *   4. After authorizing, you'll be redirected to localhost with a ?code= param
 *   5. Paste the full redirect URL back into the terminal
 *   6. It will print your refresh token -- save it as SPOTIFY_REFRESH_TOKEN
 */

const http = require("http");
const readline = require("readline");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = "user-top-read user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first.");
  process.exit(1);
}

const authUrl =
  `https://accounts.spotify.com/authorize?` +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  }).toString();

console.log("\n1. Open this URL in your browser:\n");
console.log(authUrl);
console.log("\n2. Authorize the app. You'll be redirected to a localhost URL.");
console.log("3. Paste the FULL redirect URL below:\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Redirect URL: ", async (url) => {
  rl.close();

  const code = new URL(url).searchParams.get("code");
  if (!code) {
    console.error("No code found in URL.");
    process.exit(1);
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await res.json();

  if (data.refresh_token) {
    console.log("\nYour refresh token:\n");
    console.log(data.refresh_token);
    console.log("\nSave this as SPOTIFY_REFRESH_TOKEN in your GitHub repo secrets.");
  } else {
    console.error("\nFailed to get refresh token:", data);
  }
});
