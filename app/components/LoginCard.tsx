//imports
import Link from 'next/link'

function LoginCard () {

  return (
    <>
      <div className='bg-neutral-900 mr-75 ml-75 mt-20 rounded-xl'>
        <div className='flex justify-center text-center'>
          <img src="/spotify.svg" alt="spotify" className='flex-1'/>
          <div className='text-8xl hover:bg-neutral-800 rounded-lg cursor-pointer'>Login to Spotify</div>
        </div>

        <p className='text-center p-2'>
          Don't wait a whole year for your Wrapped access the info her ;{')'}
        </p>
      </div>
    </>
  );
}

export default LoginCard;