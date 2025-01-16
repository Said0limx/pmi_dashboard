'use client';
import { Detector } from 'react-detect-offline';

const NetworkStatusProvider = ({ children }) => {
  return (
    <div>
      <Detector
        render={({ online }) =>
          online ? (
            children
          ) : (
            <div className='fixed inset-0 w-full h-full flex items-center justify-center bg-white'>
              <div className='text-center'>
                <p className='text-6xl mb-3'>It seems like you are offline.</p>
                <span className='text-3xl text-gray-600'>
                  Please check your internet connection.
                </span>
              </div>
            </div>
          )
        }
      />
    </div>
  );
};

export default NetworkStatusProvider;
