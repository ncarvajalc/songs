import { Inter } from "next/font/google";

interface LayoutProps {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: LayoutProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-14 ${inter.className}`}
    >
      {children}
    </main>
  );
}
