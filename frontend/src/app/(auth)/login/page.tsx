'use client';
import React from 'react';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden border border-zinc-200">
        
        {/* Lado Esquerdo - Branding/Imagem */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-slate-800 p-12 text-zinc-50 relative">
          <div className="absolute inset-0 bg-blue-900 opacity-20"></div> {/* Overlay discreto */}
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">MediUI</h1>
            <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
              Gestão Hospitalar Enterprise integrada, segura e inteligente.
            </p>
            <div className="flex items-center space-x-2 text-sm text-zinc-400">
              <Lock size={16} />
              <span>Ambiente Seguro - Restrito a Profissionais</span>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Acesso ao Sistema</h2>
            <p className="text-zinc-500 mb-8 text-sm">Insira suas credenciais institucionais para continuar.</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                  E-mail ou Matrícula
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="block w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-md text-sm shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                    placeholder="voce@hospital.com.br"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="block w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-md text-sm shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-zinc-600">
                    Lembrar-me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <Link
                href="/leitos"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 transition-colors mt-6"
              >
                Entrar no Sistema
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
