export default function TravelPage() {
  return (
    <>
      <style>{`
        @keyframes ellipsis {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
        }
        .loading-dots::after {
          content: '';
          animation: ellipsis 1.5s infinite;
        }
      `}</style>
      <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
        <p className="text-neutral-400 text-lg tracking-[0.3em] uppercase loading-dots">coming soon</p>
      </div>
    </>
  );
}
