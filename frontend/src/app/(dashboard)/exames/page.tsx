'use client';

import React, { useState } from 'react';
import { TestTube, FileText, CheckCircle2, Plus, X, Eye, Printer, Download } from 'lucide-react';

interface Exame {
  id: string;
  paciente: string;
  exame: string;
  data: string;
  status: 'Pronto' | 'Em Análise' | 'Coletando';
  risco: 'Urgente' | 'Normal';
  laudoTexto?: string;
}

export default function ExamesPage() {
  const [exames, setExames] = useState<Exame[]>([
    { 
      id: '1', 
      paciente: 'Felipe Costa', 
      exame: 'Hemograma Completo', 
      data: 'Hoje, 09:15', 
      status: 'Pronto', 
      risco: 'Normal',
      laudoTexto: 'HEMOGRAMA COMPLETO\nHemácias: 4.80 M/uL (Normal)\nHemoglobina: 14.5 g/dL (Normal)\nPlaquetas: 250.000 /mm3\nResultado sem alterações significativas.'
    },
    { 
      id: '2', 
      paciente: 'João S.', 
      exame: 'Raio-X Tórax AP/Perfil', 
      data: 'Hoje, 10:30', 
      status: 'Em Análise', 
      risco: 'Normal',
      laudoTexto: 'Transparência pulmonar conservada. Área cardíaca dentro dos limites da normalidade.'
    },
    { 
      id: '3', 
      paciente: 'Ana Clara V.', 
      exame: 'Troponina / CK-MB', 
      data: 'Hoje, 11:00', 
      status: 'Coletando', 
      risco: 'Urgente',
    },
  ]);

  const [selectedLaudo, setSelectedLaudo] = useState<Exame | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPaciente, setNewPaciente] = useState('');
  const [newExame, setNewExame] = useState('Hemograma Completo');
  const [newRisco, setNewRisco] = useState<'Normal' | 'Urgente'>('Normal');

  const handleUpdateStatus = (id: string, newStatus: Exame['status']) => {
    setExames(exames.map(ex => {
      if (ex.id === id) {
        return {
          ...ex,
          status: newStatus,
          laudoTexto: newStatus === 'Pronto' ? `LAUDO TÉCNICO REGISTRADO\nExame: ${ex.exame}\nPaciente: ${ex.paciente}\nLaudo conclusivo sem alterações críticas.` : ex.laudoTexto,
        };
      }
      return ex;
    }));
  };

  const handleAddExame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaciente) return;

    const newItem: Exame = {
      id: String(Date.now()),
      paciente: newPaciente,
      exame: newExame,
      data: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'Coletando',
      risco: newRisco,
    };

    setExames([newItem, ...exames]);
    setNewPaciente('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <TestTube className="text-blue-600 w-8 h-8" />
            Central de Exames Clínicos
          </h1>
          <p className="text-zinc-500 mt-2">Painel de solicitações laboratoriais e emissão de laudos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
        >
          <Plus className="w-5 h-5"/> Solicitar Novo Exame
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exames.map((ex) => (
          <div key={ex.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition">
             {ex.risco === 'Urgente' && <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>}
             
             <div>
               <div className="flex justify-between items-start mb-3">
                  <div>
                     <h3 className="font-bold text-lg text-slate-800">{ex.exame}</h3>
                     <p className="text-sm text-zinc-500 mt-0.5">Paciente: <strong>{ex.paciente}</strong></p>
                  </div>
                  {ex.status === 'Pronto' ? (
                    <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0"/> 
                  ) : (
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse mt-1 shrink-0"></div>
                  )}
               </div>

               <div className="flex justify-between items-center text-xs border-t border-zinc-100 pt-3 mt-3">
                  <span className="text-zinc-500">Solicitado: {ex.data}</span>
                  <span className={`font-bold px-2 py-0.5 rounded-md ${
                    ex.status === 'Pronto' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                    ex.status === 'Em Análise' ? 'text-blue-700 bg-blue-50 border border-blue-200' :
                    'text-amber-700 bg-amber-50 border border-amber-200'
                  }`}>
                    {ex.status}
                  </span>
               </div>
             </div>

             <div className="mt-4 pt-3 border-t border-zinc-100 space-y-2">
               {ex.status === 'Pronto' ? (
                 <button 
                   onClick={() => setSelectedLaudo(ex)}
                   className="w-full flex justify-center items-center gap-2 bg-slate-800 text-white py-2 rounded-xl hover:bg-slate-700 transition font-medium text-xs shadow"
                 >
                   <Eye className="w-4 h-4"/> Visualizar Laudo PDF
                 </button>
               ) : ex.status === 'Coletando' ? (
                 <button 
                   onClick={() => handleUpdateStatus(ex.id, 'Em Análise')}
                   className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
                 >
                   Iniciar Análise Laboratorial
                 </button>
               ) : (
                 <button 
                   onClick={() => handleUpdateStatus(ex.id, 'Pronto')}
                   className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition"
                 >
                   Emitir Laudo Médico
                 </button>
               )}
             </div>
          </div>
        ))}
      </div>

      {/* Modal Ver Laudo PDF */}
      {selectedLaudo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Laudo do Exame - {selectedLaudo.exame}
              </h3>
              <button onClick={() => setSelectedLaudo(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-zinc-50 border rounded-xl font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
              {selectedLaudo.laudoTexto}
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-zinc-100 rounded-xl hover:bg-zinc-200 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Imprimir
              </button>
              <button 
                onClick={() => setSelectedLaudo(null)}
                className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md"
              >
                Fechar Laudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Solicitar Novo Exame */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Solicitar Exame Laboratorial
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExame} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Paciente</label>
                <input 
                  type="text" 
                  required
                  value={newPaciente}
                  onChange={(e) => setNewPaciente(e.target.value)}
                  placeholder="Nome do paciente..."
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tipo de Exame</label>
                <select 
                  value={newExame}
                  onChange={(e) => setNewExame(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Hemograma Completo">Hemograma Completo</option>
                  <option value="Raio-X Tórax AP/Perfil">Raio-X Tórax AP/Perfil</option>
                  <option value="Troponina / CK-MB">Troponina / CK-MB</option>
                  <option value="Tomografia Computadorizada Crânio">Tomografia Computadorizada Crânio</option>
                  <option value="Ultrassonografia Abdominal">Ultrassonografia Abdominal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Prioridade</label>
                <select 
                  value={newRisco}
                  onChange={(e) => setNewRisco(e.target.value as 'Normal' | 'Urgente')}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Normal">Normal / Eletivo</option>
                  <option value="Urgente">🔴 Urgente (STAT)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 text-sm text-slate-600 bg-slate-100 rounded-lg font-medium hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 text-sm text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 shadow-md"
                >
                  Solicitar Exame
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
