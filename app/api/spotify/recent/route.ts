import { NextResponse } from "next/server"
import { spotifyFetch } from "@/lib/spotify"

export async function GET() {
  const data = await spotifyFetch(
    "/me/player/recently-played?limit=50"
  )

  return NextResponse.json(data.items)
}
