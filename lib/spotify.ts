import { cookies } from "next/headers"

//this is a shared spotify fetch helper. to avoid repeating token logic everywhere

export async function spotifyFetch(endpoint: string) {
  const tokenBe = await cookies()
  const token = tokenBe.get("spotify_access_token")?.value

  if (!token) {
    throw new Error("Not authenticated")
  }

  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Spotify API error")
  }

  return res.json()
}
