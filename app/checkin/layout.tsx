export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hlk-bg">
      <div className="max-w-lg mx-auto px-6 md:px-8 py-10">
        {children}
      </div>
    </div>
  );
}
