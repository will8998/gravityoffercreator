export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black text-white font-[family-name:var(--font-inter)] min-h-screen">
      {children}
    </div>
  );
}
