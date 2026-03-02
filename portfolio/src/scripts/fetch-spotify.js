const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const MUSIC_JSON_PATH = path.join(__dirname, "..", "content", "music.json");

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function fetchSpotify(endpoint, token) {
  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`Spotify API error (${endpoint}): ${res.status} ${await res.text()}`);
  }

  return res.json();
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error("Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, or SPOTIFY_REFRESH_TOKEN");
    process.exit(1);
  }

  console.log("Refreshing access token...");
  const token = await getAccessToken();

  console.log("Fetching top tracks (short_term)...");
  const tracksData = await fetchSpotify("/me/top/tracks?time_range=medium_term&limit=3", token);

  console.log("Fetching top artists (short_term)...");
  const artistsData = await fetchSpotify("/me/top/artists?time_range=medium_term&limit=3", token);

  console.log("Fetching top track of the year (long_term)...");
  const yearTopData = await fetchSpotify("/me/top/tracks?time_range=long_term&limit=1", token);

  const topTracks = tracksData.items.map((t) => ({
    name: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    albumArt: t.album.images[0]?.url || "",
    spotifyUrl: t.external_urls.spotify,
  }));

  const topArtists = artistsData.items.map((a) => ({
    name: a.name,
    imageUrl: a.images[0]?.url || "",
    spotifyUrl: a.external_urls.spotify,
  }));

  const existing = JSON.parse(fs.readFileSync(MUSIC_JSON_PATH, "utf-8"));

  const yearTop = yearTopData.items[0];
  const featuredSong = yearTop
    ? {
        name: yearTop.name,
        artist: yearTop.artists.map((a) => a.name).join(", "),
        albumArt: yearTop.album.images[0]?.url || "",
        spotifyUrl: yearTop.external_urls.spotify,
      }
    : existing.featuredSong;

  const updated = {
    spotifyProfileUrl: existing.spotifyProfileUrl,
    blurb: existing.blurb,
    featuredSong,
    topTracks,
    topArtists,
  };

  fs.writeFileSync(MUSIC_JSON_PATH, JSON.stringify(updated, null, 2) + "\n");
  console.log("music.json updated successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
