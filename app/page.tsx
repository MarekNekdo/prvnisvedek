import ChatSvedka from './ChatSvedka';
import LightPresence from './LightPresence';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <LightPresence />
      <ChatSvedka />
    </main>
  );
}
