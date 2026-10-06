import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redireciona a raiz do site diretamente para a página de Login
  redirect('/login');
}
