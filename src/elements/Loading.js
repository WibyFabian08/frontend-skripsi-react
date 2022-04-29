import React from 'react';

const Loading = () => {
    return (
        <div class="flex items-center justify-center flex-col h-screen">
        <div
          class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span class="visually-hidden hidden">Loading...</span>
        </div>
        <div className="mt-2 text-gray-300">
          Loading...
        </div>
      </div>
    )
}

export default Loading;