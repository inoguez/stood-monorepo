import Pusher from 'pusher-js';

Pusher.logToConsole = true;
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_CLUSTER as string,
});
export default pusher;
