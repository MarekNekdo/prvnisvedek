export const metadata = {
  title: 'První svědek',
  description: 'Zeptej se mě na cokoliv. A bude ti odpovězeno.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}