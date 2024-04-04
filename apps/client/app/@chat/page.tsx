import ChatBar from '@/components/ChatBar';
export default function ChatPage() {
  return (
    <div className=' flex-1 flex flex-col items-center justify-end gap-4 p-4  bg-neutral-700 rounded-2xl'>
      Chat
      <div className='w-full'>
        <ChatBar />
      </div>
    </div>
  );
}
