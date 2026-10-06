'use client';

import React, { useState } from 'react';
import { Activity, Clock, AlertCircle, Plus, X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TriagePatient {
  id: string;
  nome: string;
  sintoma: string;
  cor: 'VERMELHO' | 'LARANJA' | 'AMARELO' | 'VERDE' | 'AZUL';
  tempoEspera: string;
}

export default function TriagemPage() {
  const [patients, setPatients] = useState<TriagePatient[]>([
    { id: '1', nome: 'João P. Souza', sintoma: 'Suspeita de Infarto / Parada', cor: 'VERMELHO', tempoEspera: '0 min' },
    { id: '2', nome: 'Ana Clara V.', sintoma: 'Dor abdominal intensa com febre', cor: 'LARANJA', tempoEspera: '4 min' },
    { id: '3', nome: 'Carlos M.', sintoma: 'Cefaleia moderada persistente', cor: 'AMARELO', tempoEspera: '45 min' },
    { id: '4', nome: 'Roberto T.', sintoma: 'Hipertensão com tontura', cor: 'AMARELO', tempoEspera: '55 min' },
    { id: '5', nome: 'Beatriz S.', sintoma: 'Entorse leve no tornozelo', cor: 'VERDE', tempoEspera: '15 min' },
    { id: '6', nome: 'Felipe D.', sintoma: 'Troca de receita médica', cor: 'AZUL', tempoEspera: '110 min' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoSintoma, setNovoSintoma] = useState('');
  const [novaCor, setNovaCor] = useState<TriagePatient['cor']>('AMARELO');

  const handleAddTriage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome) return;

    const newPatient: TriagePatient = {
      id: String(Date.now()),
      nome: novoNome,
      sintoma: novoSintoma || 'Sintomas não especificados',
      cor: novaCor,
      tempoEspera: '0 min',
    };

    setPatients([newPatient, ...patients]);
    setNovoNome('');
    setNovoSintoma('');
    setIsModalOpen(false);
  };

  const handleMoveStatus = (id: string, nextCor: TriagePatient['cor']) => {
    setPatients(patients.map(p => p.id === id ? { ...p, cor: nextCor } : p));
  };

  const handleAttend = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const columns: { cor: TriagePatient['cor']; label: string; maxTime: string; bgHeader: string; border: string }[] = [
    { cor: 'VERMELHO', label: 'Emergência', maxTime: '0 min', bgHeader: 'bg-red-600 text-white', border: 'border-red-300' },
    { cor: 'LARANJA', label: 'Muito Urgente', maxTime: '10 min', bgHeader: 'bg-orange-500 text-white', border: 'border-orange-300' },
    { cor: 'AMARELO', label: 'Urgente', maxTime: '60 min', bgHeader: 'bg-yellow-400 text-slate-900', border: 'border-yellow-300' },
    { cor: 'VERDE', label: 'Pouco Urgente', maxTime: '120 min', bgHeader: 'bg-green-500 text-white', border: 'border-green-300' },
    { cor: 'AZUL', label: 'Não Urgente', maxTime: '240 min', bgHeader: 'bg-blue-500 text-white', border: 'border-blue-300' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-zinc-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Activity className="text-red-500 w-8 h-8" />
            Fila de Triagem (Manchester)
          </h1>
          <p className="text-zinc-500 mt-2">Classificação de risco e priorização clínica em tempo real.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-zinc-500 font-medium">Pacientes na Fila</p>
            <p className="text-3xl font-bold text-slate-800">{patients.length}</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" /> Classificar Paciente
          </button>
        </div>
      </header>

      {/* Grid de Fila Dinâmica */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {columns.map((col) => {
          const colPatients = patients.filter(p => p.cor === col.cor);
          return (
            <div key={col.cor} className={`bg-white rounded-xl shadow-sm border ${col.border} overflow-hidden flex flex-col h-[600px]`}>
              <div className={`${col.bgHeader} p-3 font-bold text-center uppercase tracking-wide text-xs flex justify-between items-center`}>
                <span>{col.label}</span>
                <span className="opacity-90">{col.maxTime}</span>
              </div>

              <div className="p-2 space-y-2 overflow-y-auto flex-1 bg-zinc-50/50">
                {colPatients.map((patient) => (
                  <div key={patient.id} className="bg-white p-3.5 rounded-xl border border-zinc-200 shadow-sm space-y-2 hover:shadow-md transition">
                    <div className="font-bold text-slate-800 text-sm">{patient.nome}</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{patient.sintoma}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 flex items-center gap-1 pt-1 border-t border-zinc-100">
                      <Clock className="w-3 h-3 text-blue-500" /> Aguarda: {patient.tempoEspera}
                    </div>

                    {/* Botões funcionais de controle */}
                    <div className="pt-2 flex items-center justify-between gap-1">
                      <button 
                        onClick={() => handleAttend(patient.id)}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold rounded-md transition flex items-center gap-1"
                        title="Chamar para atendimento"
                      >
                        <CheckCircle2 className="w-3 h-3"/> Atender
                      </button>

                      {col.cor !== 'AZUL' && (
                        <button
                          onClick={() => {
                            const mapCor: Record<string, TriagePatient['cor']> = {
                              VERMELHO: 'LARANJA',
                              LARANJA: 'AMARELO',
                              AMARELO: 'VERDE',
                              VERDE: 'AZUL',
                            };
                            handleMoveStatus(patient.id, mapCor[col.cor]);
                          }}
                          className="px-2 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 text-[11px] rounded-md transition flex items-center gap-0.5"
                          title="Reclassificar nível de risco"
                        >
                          Mudar <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colPatients.length === 0 && (
                  <div className="text-center py-8 text-xs text-zinc-400 italic">Nenhum paciente</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Triagem */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" /> Nova Triagem Manchester
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTriage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Paciente</label>
                <input 
                  type="text" 
                  required
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Nome completo do paciente"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sintomas / Queixa Principal</label>
                <textarea 
                  rows={2}
                  value={novoSintoma}
                  onChange={(e) => setNovoSintoma(e.target.value)}
                  placeholder="Descreva a queixa médica..."
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Classificação de Risco</label>
                <select 
                  value={novaCor}
                  onChange={(e) => setNovaCor(e.target.value as TriagePatient['cor'])}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-semibold focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="VERMELHO" className="text-red-600 font-bold">🔴 VERMELHO - Emergência (0 min)</option>
                  <option value="LARANJA" className="text-orange-600 font-bold">🟠 LARANJA - Muito Urgente (10 min)</option>
                  <option value="AMARELO" className="text-yellow-600 font-bold">🟡 AMARELO - Urgente (60 min)</option>
                  <option value="VERDE" className="text-green-600 font-bold">🟢 VERDE - Pouco Urgente (120 min)</option>
                  <option value="AZUL" className="text-blue-600 font-bold">🔵 AZUL - Não Urgente (240 min)</option>
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
                  className="flex-1 py-2 text-sm text-white bg-red-600 rounded-lg font-medium hover:bg-red-700 shadow-md"
                >
                  Inserir na Fila
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
