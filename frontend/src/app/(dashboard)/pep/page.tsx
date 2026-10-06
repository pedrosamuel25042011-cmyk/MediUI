'use client';

import React, { useState } from 'react';
import { FileText, Save, History, Printer, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface HistoryRecord {
  id: string;
  data: string;
  medico: string;
  especialidade: string;
  texto: string;
}

export default function PepPage() {
  const [activeTab, setActiveTab] = useState<'anamnese' | 'exame_fisico' | 'hd'>('anamnese');
  
  const [anamnese, setAnamnese] = useState('Paciente relata dor de cabeça intensa há 3 dias com episódios de febre leve.');
  const [exameFisico, setExameFisico] = useState('BEG, corado, anictérico, acianótico. PA: 120/80 mmHg, FC: 78 bpm, Temp: 36.8°C.');
  const [cidSearch, setCidSearch] = useState('');
  const [cids, setCids] = useState<string[]>(['R51 - Dor de cabeça', 'R50 - Febre de origem desconhecida']);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [historico, setHistorico] = useState<HistoryRecord[]>([
    {
      id: '1',
      data: '12/08/2026',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      texto: 'Paciente relata dores esporádicas no peito ao realizar esforços físicos. Solicitado ECG e Teste Ergométrico. Prescrito repouso.',
    },
    {
      id: '2',
      data: '05/01/2026',
      medico: 'Dra. Ana Maria',
      especialidade: 'Clínica Médica',
      texto: 'Consulta de rotina. Exames laboratoriais sem alterações significativas. Pressão arterial 120/80.',
    },
  ]);

  const handleSaveEvolution = () => {
    const newRecord: HistoryRecord = {
      id: String(Date.now()),
      data: new Date().toLocaleDateString('pt-BR'),
      medico: 'Dr. Usuário Ativo',
      especialidade: 'Clínica Médica',
      texto: `[Anamnese]: ${anamnese}\n[Exame Físico]: ${exameFisico}\n[CIDs]: ${cids.join(', ')}`,
    };

    setHistorico([newRecord, ...historico]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddCid = () => {
    if (cidSearch.trim()) {
      setCids([...cids, cidSearch.trim()]);
      setCidSearch('');
    }
  };

  const handleRemoveCid = (index: number) => {
    setCids(cids.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-zinc-50 min-h-screen">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <FileText className="text-blue-600 w-6 h-6" />
            Prontuário Eletrônico (PEP)
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium">
            <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-lg">Paciente: João Pereira Santos</span>
            <span className="text-zinc-500">Idade: 45 anos</span>
            <span className="text-red-600 bg-red-100 px-2.5 py-0.5 rounded-md border border-red-200">Alergia: Dipirona</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg text-slate-700 bg-white hover:bg-zinc-100 transition shadow-sm"
          >
             <Printer className="w-4 h-4"/> Imprimir
          </button>
          <button 
            onClick={handleSaveEvolution}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition shadow-md"
          >
             <Save className="w-4 h-4"/> Salvar Evolução
          </button>
        </div>
      </header>

      {savedSuccess && (
        <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Evolução médica gravada com sucesso no histórico do paciente!
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
        {/* Histórico Clínico */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl border border-zinc-200 flex flex-col overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-zinc-200 p-3.5 font-semibold text-slate-700 flex items-center gap-2 text-sm">
            <History className="w-4 h-4 text-blue-600"/> Histórico Clínico ({historico.length})
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {historico.map((item) => (
              <div key={item.id} className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm space-y-1">
                <div className="font-bold text-slate-800 text-xs">{item.data} - {item.medico} ({item.especialidade})</div>
                <p className="text-zinc-600 text-xs whitespace-pre-line leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editor de Evolução */}
        <div className="flex-1 bg-white rounded-xl border border-zinc-200 flex flex-col shadow-sm overflow-hidden">
           <div className="flex border-b border-zinc-200 bg-zinc-50">
             <button 
               onClick={() => setActiveTab('anamnese')} 
               className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'anamnese' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-zinc-500 hover:text-slate-700'}`}
             >
               Anamnese
             </button>
             <button 
               onClick={() => setActiveTab('exame_fisico')} 
               className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'exame_fisico' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-zinc-500 hover:text-slate-700'}`}
             >
               Exame Físico
             </button>
             <button 
               onClick={() => setActiveTab('hd')} 
               className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'hd' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-zinc-500 hover:text-slate-700'}`}
             >
               Hipótese Diagnóstica (CID)
             </button>
           </div>
           
           <div className="p-6 flex-1 flex flex-col">
              {activeTab === 'anamnese' && (
                 <textarea 
                   value={anamnese}
                   onChange={(e) => setAnamnese(e.target.value)}
                   className="w-full h-full p-4 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-slate-700 text-sm"
                   placeholder="Digite a queixa principal e o histórico da moléstia atual..."
                 ></textarea>
              )}
              {activeTab === 'exame_fisico' && (
                 <textarea 
                   value={exameFisico}
                   onChange={(e) => setExameFisico(e.target.value)}
                   className="w-full h-full p-4 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-slate-700 text-sm"
                   placeholder="Descreva o exame físico realizado..."
                 ></textarea>
              )}
              {activeTab === 'hd' && (
                 <div className="space-y-4">
                   <div className="flex gap-2">
                     <input 
                       type="text" 
                       value={cidSearch}
                       onChange={(e) => setCidSearch(e.target.value)}
                       placeholder="Buscar ou adicionar código CID-10..." 
                       className="flex-1 p-2.5 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     />
                     <button 
                       onClick={handleAddCid}
                       className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1"
                     >
                       <Plus className="w-4 h-4" /> Adicionar CID
                     </button>
                   </div>

                   <div className="space-y-2">
                     {cids.map((cid, i) => (
                       <div key={i} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex justify-between items-center text-sm">
                         <span className="font-semibold text-slate-700">{cid}</span>
                         <button onClick={() => handleRemoveCid(i)} className="text-red-500 hover:text-red-700">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                     ))}
                   </div>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
