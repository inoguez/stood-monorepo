import Image from 'next/image';
import UsersPage from './@sidebar/page';
import ChatPage from './@chat/page';

export default function Home() {
  return (
    <>
      <UsersPage />
      <ChatPage />
    </>
  );
}
