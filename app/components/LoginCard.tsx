//imports
import Link from 'next/link'
import SpotifyLoginButton from './SpotifyLoginButton';

function LoginCard () {

  return (
    <>
      <div className="bg-neutral-900 mt-20 rounded-xl max-w-lg mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <img src="/spotify.svg" alt="spotify" className='flex-1'/>
          <SpotifyLoginButton></SpotifyLoginButton>
        </div>

        <p className='text-center p-2 text-xl'>
          Don't wait a whole year for your Spotify Wrapped access the info here ;{')'}
        </p>
      </div>
    </>
  );
}

export default LoginCard;