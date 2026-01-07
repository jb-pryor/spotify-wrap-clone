import { NextResponse } from "next/server"
import { spotifyFetch } from "@/lib/spotify"

export async function GET() {
  const data = await spotifyFetch(
    "/me/player/recently-played?limit=50"
  )

  const items = data.items
  const random =
    items[Math.floor(Math.random() * items.length)]

  return NextResponse.json({
    name: random.track.name,
    artist: random.track.artists[0].name,
    albumImage: random.track.album.images[0]?.url,
    previewUrl: random.track.preview_url,
  })
}
