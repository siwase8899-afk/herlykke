export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-alma-bg">
      <div className="max-w-lg mx-auto px-5 py-6">
        {children}
      </div>
    </div>
  );
}
