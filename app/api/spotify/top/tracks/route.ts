import { NextResponse } from "next/server"
import { spotifyFetch } from "@/lib/spotify"

export async function GET() {
  const data = await spotifyFetch(
    "/me/top/tracks?limit=50&time_range=long_term"
  )

  return NextResponse.json(data.items)
}
