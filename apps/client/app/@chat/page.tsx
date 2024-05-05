'use client';
import ChatBar from '@/components/ChatBar';
import Pusher from 'pusher-js';
import { useEffect } from 'react';
export default function ChatPage() {
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('e5cbed802d5be0bca230', {
      cluster: 'us2',
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', function (data: any) {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <div className=' flex-1 flex flex-col items-center justify-end gap-4 p-4  bg-neutral-700 rounded-2xl'>
      Chat
      <div className='w-full'>
        <ChatBar />
      </div>
    </div>
  );
}
