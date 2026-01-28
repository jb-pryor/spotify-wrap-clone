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
  trackId: string
}

type Artist = {
  name: string
  image?: string
}


function countryCodeToFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return "🏳️";

  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
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
      <div className="bg-neutral-900 p-2 pl-5 pr-5 m-15 rounded-xl">
        <div className="flex gap-5 items-center justify-between w-full">
          <div className="flex gap-1">
            {user.profileImage && ( <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full"/> )}
            <div className="text-3xl pl-2 p-4 ">{user.username}</div>
          </div>
          <div>
            <a href="https://open.spotify.com/" target="_blank"><img src="/spotify.svg" alt="spotify" className='h-28 p-5'/></a>
          </div>
          {/*<div className="flex gap-1">
            <div className="text-2xl">TMLA:</div>
            <div className="text-2xl">254</div>
          </div>*/}
        </div>
        
        {/*<h1 className="text-8xl text-center p-3 font-bold">Welcome {user.username}</h1>*/}
        <h2 className="text-7xl font-bold text-center p-2 pt-10 pb-20">Your Spotify Dashboard:</h2>

        <div className="flex flex-col gap-2 justify-center items-center text-xl">
          <div className="flex gap-2 text-3xl font-bold">
            
            
            


            <div className="bg-neutral-800 rounded-lg hover:bg-neutral-700 transition ease-linear text-blue-300">
              <button onClick={() => setShowArtists(true)} className="p-5 cursor-pointer"><div className="rounded-lg p-5"><img src="/artist.png" alt="Spotify" className="h-24"/><h2>View Top Artists</h2></div></button>
            </div>

            <div className="bg-neutral-800 rounded-lg hover:bg-neutral-700 transition ease-linear text-green-300">
                <button onClick={() => setShowSongs(true)} className="p-5 cursor-pointer"><div className="rounded-lg p-5"><img src="/bestblacksong.png" alt="Spotify" className="h-24"/><h2>View Top Songs</h2></div></button>
            </div>
            <div className="bg-neutral-800 rounded-lg hover:bg-neutral-700 transition ease-linear text-red-300">
                <button onClick={() => setShowGenres(true)} className="p-5 cursor-pointer"><div className="rounded-lg p-5"><img src="/genre.png" alt="Spotify" className="h-24"/><h2>View Top Genres</h2></div></button>
            </div>
          </div>

          {/*<div className="bg-neutral-800 p-5 rounded-lg">
          🎉 🥳 According to your recent song history you are a partyer loving to dance and have a good time! 🎉🥳
          </div>*/}

          <div className="flex gap-2 pb-15">
            {/*recommendation && (<div className="bg-neutral-800 p-5 rounded-lg"><h2>Next Song Recommendation:</h2><div className="pt-2"><span className="text-2xl">{recommendation.name}</span><br /> <span className="font-neutral-100">{recommendation.artist}</span></div> </div>)*/}

            {/*<div className="bg-neutral-800 p-5 rounded-lg h-38 align-center">
              <div className="p-5 text-3xl font-bold">{countryCodeToFlagEmoji(user.country)} {user.country} </div>
            </div>*/}

            <div className="bg-neutral-800 p-5 rounded-lg h-38 text-4xl text-pink-200 font-bold hover:text-pink-100">Next <br /> Song <br /> Rec</div>
            {recommendation && <iframe
              src={`https://open.spotify.com/embed/track/${recommendation.trackId}`}
              width="300"
              height="200"
              allow="encrypted-media"
            /> }
            {/*lastPlayed && ( <div className="bg-neutral-800 p-5 rounded-lg h-38"><h2>Last Song Listened To:</h2>{lastPlayed.name} •{"\n"} {lastPlayed.artist}</div> )*/}
            <div className="bg-neutral-800 p-5 rounded-lg h-38 text-4xl text-yellow-200 font-bold hover:text-yellow-100">Last <br /> Song <br /> Played</div>
            {lastPlayed && <iframe
              src={`https://open.spotify.com/embed/track/${lastPlayed.trackId}`}
              width="300"
              height="200"
              allow="encrypted-media"
            /> }
          </div>



        </div>

      </div>


      {showArtists && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition ease-linear">
          
          <div className="bg-neutral-900 p-6 rounded-lg text-center font-bold">
            {/*<h2 className="text-3xl mb-4">Top Artists</h2>*/}

            {topArtists.slice(0, 5).map((artist) => (
              <div key={artist.name} className="py-1 px-15 text-3xl text-blue-300">
                {artist.name}
              </div>
            ))}

            <button onClick={() => setShowArtists(false)} className="mt-4 px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer text-white">
              Close
            </button>
          </div>

        </div>
      )}

      {showGenres && (
         <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition ease-linear">
          
         <div className="bg-neutral-900 p-6 px-15 rounded-lg text-center text-red-300 font-bold">

           {topGenres.slice(0, 5).map((genre) => (
             <div key={genre} className="py-1 text-3xl">
               {genre}
             </div>
           ))}

           <button
             onClick={() => setShowGenres(false)}
             className="text-white mt-4 px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer"
           >
             Close
           </button>
         </div>

       </div>
      )}


  {showSongs && (
         <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 transition ease-linear">
          
         <div className="bg-neutral-900 px-15 text-green-300 font-bold p-6 rounded-lg text-center ">
           {/*<h2 className="text-2xl mb-4">Top Songs</h2>*/}

           {topSongs.slice(0, 5).map((song) => (
             <div key={song.name} className="py-1 text-3xl">
               {song.name}
               {"     "}
               •
               {"     "}
               {song.artist}
             </div>
           ))}

           <button
             onClick={() => setShowSongs(false)}
             className="text-white mt-4 px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600 cursor-pointer"
           >
             Close
           </button>
         </div>

       </div>
      )}

    </>
  );
}