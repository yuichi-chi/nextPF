import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yuichi Kumano | Web3 Portfolio',
  description: '「価値の歪み」に気づくエンジニアのポートフォリオサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
} 