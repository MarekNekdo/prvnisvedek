// app/layout.tsx
export const metadata = {
  title: 'První svědek',
  description: 'Zeptej se mě na cokoliv, pokud se nebojíš pravdy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body style={{ backgroundColor: "#000", color: "#fff", fontFamily: "sans-serif", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
