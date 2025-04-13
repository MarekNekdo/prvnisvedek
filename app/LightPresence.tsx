import { useEffect, useState } from "react";

export default function LightPresence({ active }: { active: boolean }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (active) {
      setPulse(true);
      const timeout = setTimeout(() => setPulse(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-black py-12">
      <div
        className={`rounded-full transition-all duration-1000 shadow-xl mb-12 ${
          pulse ? "w-48 h-48 bg-white/50 blur-3xl" : "w-36 h-36 bg-white/20 blur-2xl"
        }`}
      ></div>
    </div>
  );
}
