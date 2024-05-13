import UsersPage from './@sidebar/page';
import ChatPage from './@chat/page';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <>
      <UsersPage />
      <ChatPage />
    </>
  );
}
