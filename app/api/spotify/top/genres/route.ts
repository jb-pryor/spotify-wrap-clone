import { NextResponse } from "next/server"
import { spotifyFetch } from "@/lib/spotify"

//not top genres have to derive the from artists genre

export async function GET() {
  const artists = await spotifyFetch(
    "/me/top/artists?limit=50&time_range=long_term"
  )

  const genreCount: Record<string, number> = {}

  artists.items.forEach((artist: any) => {
    artist.genres.forEach((genre: string) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1
    })
  })

  const sortedGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([genre]) => genre)

  return NextResponse.json(sortedGenres)
}
