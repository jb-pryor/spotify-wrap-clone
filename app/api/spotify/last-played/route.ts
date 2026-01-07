import { NextResponse } from "next/server"
import { spotifyFetch } from "@/lib/spotify"

export async function GET() {
  const data = await spotifyFetch(
    "/me/player/recently-played?limit=1"
  )

  const last = data.items[0]

  return NextResponse.json({
    name: last.track.name,
    artist: last.track.artists[0].name,
    playedAt: last.played_at,
    albumImage: last.track.album.images[0]?.url,
  })
}
