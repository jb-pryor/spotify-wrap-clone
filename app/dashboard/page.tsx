//imports
 "use client"

import { useEffect, useState } from "react"

type User = {
  username: string
  country: string
  profileImage: string | null
}

type Track = {
  name: string
  artist: string
  albumImage?: string
}

type Artist = {
  name: string
  image?: string
}


export default function Home() {

  const [user, setUser] = useState<User | null>(null)

  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [topGenres, setTopGenres] = useState<string[]>([])
  const [lastPlayed, setLastPlayed] = useState<Track | null>(null)
  const [recommendation, setRecommendation] = useState<Track | null>(null)

  useEffect(() => {
    fetch("/api/spotify/me")
      .then((res) => res.json())
      .then(setUser)

    fetch("/api/spotify/top/tracks")
      .then((res) => res.json())
      .then((data) =>
        setTopTracks(
          data.slice(0, 5).map((t: any) => ({
            name: t.name,
            artist: t.artists[0].name,
            albumImage: t.album.images[0]?.url,
          }))
        )
      )

      fetch("/api/spotify/top/artists")
        .then((res) => res.json())
        .then((data) =>
          setTopArtists(
            data.slice(0, 5).map((a: any) => ({
              name: a.name,
              image: a.images[0]?.url,
            }))
          )
        )

    // 🔹 NEW: top genres
    fetch("/api/spotify/top/genres")
      .then((res) => res.json())
      .then(setTopGenres)

    // 🔹 NEW: last song listened to
    fetch("/api/spotify/last-played")
      .then((res) => res.json())
      .then(setLastPlayed)

    // 🔹 NEW: random recommendation
    fetch("/api/spotify/recommendation/random")
      .then((res) => res.json())
      .then(setRecommendation) 
  }, [])

  if (!user) return <p>Loading...</p>

  return (
    <>
      <div className="bg-neutral-900 p-10 m-15 rounded-lg">
        <div className="flex gap-5">
          <div className="flex gap-1">
            {user.profileImage && ( <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full"/> )}
            <div className="text-2xl">@{user.username}</div>
          </div>
          <div className="flex gap-1">
            <div className="text-2xl">TMLA:</div>
            <div className="text-2xl">254</div>
          </div>
        </div>
        
        <h1 className="text-6xl text-center pt-10">Welcome {user.username}</h1>
        <h2 className="text-4xl text-center p-2">to Your Spotify Dashboard</h2>

        <div className="flex flex-col gap-2 justify-center items-center text-xl">
          <div className="flex gap-2">
            <div className="bg-neutral-800 p-5 rounded-lg">{user.country}</div>
            <div className="bg-neutral-800 rounded-lg"><button className="cursor-pointer p-5"><h2>View Top Artists</h2>{topArtists.map((artist) => (
              <div key={artist.name}>{artist.name}</div>
              ))}</button></div>
          </div>

          <div className="flex gap-2">
            <div className="bg-neutral-800 rounded-lg">
              <button className="p-5 cursor-pointer"><h2>View Top Songs</h2>{topTracks.map((track) => (
                <div key={track.name}>
                  {track.name} • {track.artist}
                </div>
                ))}
              </button></div>
            <div className="bg-neutral-800 rounded-lg"><button className="p-5 cursor-pointer"><h2>View Top Genres</h2>{topGenres.join(", ")}</button></div>
          </div>

          <div className="bg-neutral-800 p-5 rounded-lg">
          🎉 🥳 According to your recent song history you are a partyer loving to dance and have a good time! 🎉🥳
          </div>

          <div className="flex gap-2">
            {recommendation && (<div className="bg-neutral-800 p-5 rounded-lg"><h2>Next Song Recommendation</h2>{recommendation.name} • {recommendation.artist}</div>)}
            {lastPlayed && ( <div className="bg-neutral-800 p-5 rounded-lg"><h2>Last Song Listened To:</h2>{lastPlayed.name} • {lastPlayed.artist}</div> )}
          </div>



        </div>

      </div>
    </>
  );
}