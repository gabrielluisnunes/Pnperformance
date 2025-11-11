import type { Metadata } from "next";
import "./globals.css"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

import Header from "@/components/Header";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata: Metadata = {
  title: "PN Performance Mídia - A sua Agência de Performance",
  description: "Estratégias de Mídia Paga focadas em ROI real e crescimento exponencial. Não é mágica, é Performance Pura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <div style={{ paddingTop: '70px' }}>
            {children}
        </div>
        <BootstrapClient />
      </body>
    </html>
  );
}