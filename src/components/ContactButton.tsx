export function ContactButton() {
  return (
    <button
      className="relative px-8 py-4 rounded-full font-bold text-white tracking-wide transition-transform hover:scale-105 active:scale-95"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.2), inset 0 4px 10px rgba(255,255,255,0.4)',
        border: '1px solid white',
      }}
    >
      Contact Me
    </button>
  );
}
