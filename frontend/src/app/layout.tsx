import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MediUI - ERP Hospitalar',
  description: 'Sistema Integrado de Gestão Hospitalar Enterprise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
