//imports
import Link from 'next/link'
import SpotifyLoginButton from './SpotifyLoginButton';

function LoginCard () {

  return (
    <>
      <div className='bg-neutral-900 mr-75 ml-75 mt-20 rounded-xl'>
        <div className='flex justify-center text-center p-10 gap-10'>
          <img src="/spotify.svg" alt="spotify" className='flex-1'/>
          <SpotifyLoginButton></SpotifyLoginButton>
        </div>

        <p className='text-center p-2'>
          Don't wait a whole year for your Wrapped access the info here ;{')'}
        </p>
      </div>
    </>
  );
}

export default LoginCard;