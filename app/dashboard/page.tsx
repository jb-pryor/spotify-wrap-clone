//imports
 "use client"

import { useEffect, useState } from "react"

type User = {
  username: string
  country: string
  profileImage: string | null
}

type Song = {
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

  const [topSongs, setTopTracks] = useState<Song[]>([])
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [topGenres, setTopGenres] = useState<string[]>([])
  const [lastPlayed, setLastPlayed] = useState<Song | null>(null)
  const [recommendation, setRecommendation] = useState<Song | null>(null)

  const [showArtists, setShowArtists] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showSongs, setShowSongs] = useState(false);


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
        
        <h1 className="text-6xl text-center pt-10 font-bold">Welcome {user.username}</h1>
        <h2 className="text-4xl text-center p-2 pb-10">to Your Spotify Dashboard</h2>

        <div className="flex flex-col gap-2 justify-center items-center text-xl">
          <div className="flex gap-2">
            <div className="bg-neutral-800 p-5 rounded-lg"><span className="pr-5 text-2xl">🇺🇸</span>{user.country}</div>


            <div className="bg-neutral-800 rounded-lg hover:bg-neutral-700 transition ease-linear"><button onClick={() => setShowArtists(true)} className="cursor-pointer p-5"><h2>View Top Artists</h2>
            </button></div>

            <div className="bg-neutral-800 rounded-lg hover:bg-neutral-700 transition ease-linear">
                <button onClick={() => setShowSongs(true)} className="p-5 cursor-pointer"><div className="rounded-lg p-5"><h2>View Top Songs</h2></div></button>
            </div>
            <div className="bg-neutral-800 rounded-lg hover:bg-neutral-700 transition ease-linear">
                <button onClick={() => setShowGenres(true)} className="p-5 cursor-pointer"><div className="rounded-lg p-5"><h2>View Top Genres</h2></div></button>
            </div>
          </div>

          {/*<div className="bg-neutral-800 p-5 rounded-lg">
          🎉 🥳 According to your recent song history you are a partyer loving to dance and have a good time! 🎉🥳
          </div>*/}

          <div className="flex gap-2">
            {recommendation && (<div className="bg-neutral-800 p-5 rounded-lg"><h2>Next Song Recommendation:</h2>{recommendation.name} • {recommendation.artist}</div>)}
            {lastPlayed && ( <div className="bg-neutral-800 p-5 rounded-lg"><h2>Last Song Listened To:</h2>{lastPlayed.name} • {lastPlayed.artist}</div> )}
          </div>



        </div>

      </div>


      {showArtists && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition ease-linear">
          
          <div className="bg-neutral-900 p-6 rounded-lg text-center w-80">
            <h2 className="text-2xl mb-4">Top Artists</h2>

            {topArtists.slice(0, 5).map((artist) => (
              <div key={artist.name} className="py-1">
                {artist.name}
              </div>
            ))}

            <button
              onClick={() => setShowArtists(false)}
              className="mt-4 px-4 py-2 bg-neutral-700 rounded"
            >
              Close
            </button>
          </div>

        </div>
      )}

      {showGenres && (
         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition ease-linear">
          
         <div className="bg-neutral-900 p-6 rounded-lg text-center w-80">
           <h2 className="text-2xl mb-4">Top Genres</h2>

           {topGenres.slice(0, 5).map((genre) => (
             <div key={genre} className="py-1">
               {genre}
             </div>
           ))}

           <button
             onClick={() => setShowGenres(false)}
             className="mt-4 px-4 py-2 bg-neutral-700 rounded"
           >
             Close
           </button>
         </div>

       </div>
      )}


  {showSongs && (
         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition ease-linear">
          
         <div className="bg-neutral-900 p-6 rounded-lg text-center w-80">
           <h2 className="text-2xl mb-4">Top Songs</h2>

           {topSongs.slice(0, 5).map((song) => (
             <div key={song.name} className="py-1">
               {song.name}
               {"     "}
               •
               {"     "}
               {song.artist}
             </div>
           ))}

           <button
             onClick={() => setShowSongs(false)}
             className="mt-4 px-4 py-2 bg-neutral-700 rounded"
           >
             Close
           </button>
         </div>

       </div>
      )}

    </>
  );
}