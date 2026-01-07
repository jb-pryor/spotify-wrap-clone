"use client"
import { getSpotifyLoginUrl } from "@/lib/spotifyAuth"

export default function SpotifyLoginButton() {
  return (
    <div className="flex justify-center items-center">
      <a
        href={getSpotifyLoginUrl()}
        className="text-white text-7xl hover:bg-neutral-800 transition p-5 rounded-xl font-bold"
      >
        Login with Spotify
      </a>
    </div>
  )
}
