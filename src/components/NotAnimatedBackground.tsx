'use client';

export default function NotAnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <div className="relative w-full h-full">
      </div>
    </div>
  );
}