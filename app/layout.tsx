import "./globals.css";

export const metadata = {
  title: "OMDb Next App",
  description: "Buscador de películas con OMDb y Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex items-center justify-center sm:max-w-6xl mx-auto p-0 sm:p-6">
          {children}
      </body>
    </html>
  );
}