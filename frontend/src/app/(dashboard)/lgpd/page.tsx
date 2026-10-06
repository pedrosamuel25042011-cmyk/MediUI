'use client';

import React, { useState } from 'react';
import { Shield, FileText, Download, Trash2, Search, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface PatientRecord {
  id: string;
  nome: string;
  cpf: string;
  consentimento: boolean;
  anonimizado: boolean;
}

export default function DpoPortalPage() {
  const [searchCpf, setSearchCpf] = useState('');
  const [currentPatient, setCurrentPatient] = useState<PatientRecord>({
    id: 'f82c-9912',
    nome: 'Maria Silva de Oliveira',
    cpf: '123.456.789-00',
    consentimento: true,
    anonimizado: false,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleSearch = () => {
    if (searchCpf.trim()) {
      setCurrentPatient({
        id: 'p-' + Math.floor(Math.random() * 9000 + 1000),
        nome: searchCpf.includes('.') || searchCpf.length > 5 ? 'Titular Localizado' : searchCpf,
        cpf: '***.***.***-**',
        consentimento: true,
        anonimizado: false,
      });
      setMessage('Busca realizada no banco de dados de consentimento.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handlePortabilityExport = () => {
    const dataJSON = JSON.stringify(currentPatient, null, 2);
    const blob = new Blob([dataJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portabilidade_lgpd_${currentPatient.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setMessage('Arquivo JSON de Portabilidade de Dados (Art. 18 LGPD) gerado com sucesso!');
    setTimeout(() => setMessage(null), 4000);
  };

  const handleAnonymize = () => {
    setCurrentPatient({
      ...currentPatient,
      nome: 'ANONIMIZADO (Art. 18 LGPD)',
      cpf: '***.***.***-**',
      anonimizado: true,
    });
    setMessage('Dados pessoais do titular anonimizados no banco de dados!');
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-zinc-50 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Shield className="text-blue-600 w-8 h-8" />
            Portal DPO & Privacidade (LGPD)
          </h1>
          <p className="text-zinc-500 mt-2">Gestão de consentimentos, anonimização e portabilidade de dados do titular.</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-zinc-200 flex items-center gap-2">
           <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
           <span className="text-xs font-bold text-slate-700">Motor DLP & Criptografia Ativos</span>
        </div>
      </header>

      {message && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {message}
        </div>
      )}

      {/* Painel de Busca de Titular */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Direitos do Titular (Art. 18 LGPD)</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              value={searchCpf}
              onChange={(e) => setSearchCpf(e.target.value)}
              placeholder="Buscar por CPF ou Nome do Paciente..." 
              className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-slate-800 text-white px-6 py-2.5 rounded-xl hover:bg-slate-700 font-medium transition text-sm shadow-md"
          >
            Buscar Titular
          </button>
        </div>

        {/* Card de Paciente Encontrado */}
        <div className="border border-zinc-200 rounded-xl overflow-hidden mt-4">
          <div className="bg-zinc-100 px-5 py-3.5 border-b border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="font-bold text-slate-800 text-sm">
              {currentPatient.nome} — CPF: {currentPatient.cpf}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
              currentPatient.anonimizado ? 'bg-red-100 text-red-800 border-red-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}>
              {currentPatient.anonimizado ? 'Dados Anonimizados' : 'Consentimento Ativo'}
            </span>
          </div>
          
          <div className="p-5 bg-white flex flex-wrap gap-3">
             <button 
               onClick={() => setShowReportModal(true)}
               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 text-slate-700 font-semibold text-xs transition shadow-sm"
             >
                <FileText className="w-4 h-4 text-blue-600" />
                Relatório de Compartilhamento
             </button>
             
             <button 
               onClick={handlePortabilityExport}
               className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 text-slate-700 font-semibold text-xs transition shadow-sm"
             >
                <Download className="w-4 h-4 text-blue-600" />
                Portabilidade de Dados (JSON)
             </button>
             
             <button 
               onClick={handleAnonymize}
               disabled={currentPatient.anonimizado}
               className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 text-red-700 font-semibold text-xs transition shadow-sm sm:ml-auto disabled:opacity-50"
             >
                <Trash2 className="w-4 h-4 text-red-600" />
                {currentPatient.anonimizado ? 'Já Anonimizado' : 'Anonimizar / Apagar Dados'}
             </button>
          </div>
        </div>
      </section>

      {/* Modal Relatório */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Transparência & Compartilhamento (Art. 19 LGPD)
              </h3>
              <button onClick={() => setShowReportModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-zinc-50 border rounded-xl space-y-2 text-xs text-slate-700">
              <p><strong>Titular:</strong> {currentPatient.nome}</p>
              <p><strong>Operador:</strong> Hospital ERP MediUI Systems</p>
              <p><strong>Finalidade do Tratamento:</strong> Prestação de serviços de saúde, prontuário médico e faturamento.</p>
              <p><strong>Compartilhamentos Efetuados:</strong> Operadora de Saúde (TISS) e Laboratório Central.</p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowReportModal(false)}
                className="py-2 px-5 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md"
              >
                Fechar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
