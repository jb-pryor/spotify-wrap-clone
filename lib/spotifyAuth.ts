const scopes = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-private",
].join(" ")

export const getSpotifyLoginUrl = () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: scopes,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}
