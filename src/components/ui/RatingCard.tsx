'use client';

export default function RatingCard() {
  return (
    <>
      <div className="absolute -left-6 bottom-20 bg-white p-5 rounded-2xl floating">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
            <span className="text-xl">🙏</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">4.9/5</p>
            <p className="text-sm text-muted-foreground">Client Rating</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating {
          animation: floatY 4s ease-in-out infinite;
        }
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </>
  );
}
