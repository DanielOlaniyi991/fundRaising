import "./globals.css";
import "@Coronation-ArchTouch/cor-ui/styles.css";
import "@Coronation-ArchTouch/cor-ui/fonts.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
