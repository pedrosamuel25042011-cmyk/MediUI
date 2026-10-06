'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, Activity, BedDouble, LayoutDashboard, LogOut, 
  FileText, Pill, Calendar, Stethoscope, TestTube, 
  Calculator, Receipt, ScrollText, PieChart, Video 
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuSections = [
    {
      title: "Gestão",
      links: [
        { href: '/dashboard', label: 'Dashboard Executivo', icon: PieChart },
      ]
    },
    {
      title: "Atendimento & Clínico",
      links: [
        { href: '/recepcao', label: 'Recepção (Check-in)', icon: Calendar },
        { href: '/triagem', label: 'Fila de Triagem', icon: Activity },
        { href: '/pep', label: 'Prontuário (PEP)', icon: FileText },
        { href: '/prescricao', label: 'Prescrição & Enferm.', icon: Stethoscope },
        { href: '/telemedicina', label: 'Telemedicina & APIs', icon: Video },
      ]
    },
    {
      title: "Operacional & Internação",
      links: [
        { href: '/leitos', label: 'Mapa de Leitos', icon: BedDouble },
        { href: '/farmacia', label: 'Farmácia & Estoque', icon: Pill },
        { href: '/exames', label: 'Central de Exames', icon: TestTube },
      ]
    },
    {
      title: "Financeiro",
      links: [
        { href: '/faturamento', label: 'Faturamento TISS', icon: Calculator },
        { href: '/conta-paciente', label: 'Conta do Paciente', icon: Receipt },
      ]
    },
    {
      title: "Segurança (LGPD)",
      links: [
        { href: '/lgpd', label: 'Portal DPO', icon: Shield },
        { href: '/auditoria', label: 'Trilha de Auditoria', icon: ScrollText },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar Lateral */}
      <aside className="w-72 bg-slate-800 text-zinc-300 flex flex-col shadow-xl z-10 flex-shrink-0">
        <div className="p-6 border-b border-slate-700 bg-slate-900 flex items-center gap-3">
          <LayoutDashboard className="text-blue-500 w-6 h-6" />
          <span className="font-bold text-white text-lg tracking-wide">MediUI</span>
        </div>
        
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">{section.title}</div>
              <div className="space-y-1">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm ${
                        isActive 
                          ? 'bg-blue-600 text-white font-medium shadow-md' 
                          : 'hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-900">
          <div className="flex items-center gap-3 px-3 mb-4">
             <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-sm">
                Dr
             </div>
             <div>
               <div className="text-sm font-medium text-white">Usuário Ativo</div>
               <div className="text-xs text-slate-400">Diretor Clínico</div>
             </div>
          </div>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-slate-700 rounded-md transition-colors w-full text-sm">
            <LogOut className="w-4 h-4" />
            Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}

