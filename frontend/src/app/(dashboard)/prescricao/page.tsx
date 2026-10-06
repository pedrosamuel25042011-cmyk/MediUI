'use client';

import React, { useState } from 'react';
import { Stethoscope, CheckSquare, Plus, Clock, X, CheckCircle2 } from 'lucide-react';

interface PrescriptionItem {
  id: string;
  med: string;
  freq: string;
  horario: string;
  status: 'pendente' | 'checado';
  enfermeiro?: string;
}

export default function PrescricaoPage() {
  const [items, setItems] = useState<PrescriptionItem[]>([
    { id: '1', med: 'Dipirona Sódica 500mg - 1 comp VO', freq: '6/6 horas', horario: '14:00', status: 'pendente' },
    { id: '2', med: 'Ceftriaxona 1g IM', freq: 'Dose Única', horario: '10:00', status: 'checado', enfermeiro: 'Enf. Maria' },
    { id: '3', med: 'Soro Fisiológico 0.9% 500ml', freq: 'Contínuo (20gts/min)', horario: 'Agora', status: 'checado', enfermeiro: 'Enf. João' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMed, setNewMed] = useState('');
  const [newFreq, setNewFreq] = useState('8/8 horas');
  const [newHorario, setNewHorario] = useState('16:00');

  const handleConfirmAdmin = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status: 'checado', enfermeiro: 'Enf. Usuário Ativo' } : item));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed) return;

    const newItem: PrescriptionItem = {
      id: String(Date.now()),
      med: newMed,
      freq: newFreq,
      horario: newHorario,
      status: 'pendente',
    };

    setItems([...items, newItem]);
    setNewMed('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Stethoscope className="text-blue-600 w-8 h-8" />
            Prescrição Médica & Aprazamento
          </h1>
          <p className="text-zinc-500 mt-2">Visão da equipe de Enfermagem para checagem de medicações.</p>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
         <div className="p-5 border-b border-zinc-200 bg-blue-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Paciente: Ana Clara V. (Leito UTI-01)</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Prescrição gerada por Dr. Carlos Mendes em 12/08/2026 09:30</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition shadow-md"
            >
               <Plus className="w-4 h-4"/> Adicionar Item / medicação
            </button>
         </div>

         <div className="divide-y divide-zinc-200">
            {items.map((p) => (
              <div key={p.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50 transition">
                 <div>
                   <div className="font-bold text-slate-800 text-lg">{p.med}</div>
                   <div className="text-xs text-zinc-600 mt-1 flex flex-wrap items-center gap-2">
                     <span className="bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-300 font-semibold">Aprazamento: {p.freq}</span>
                     <span className="flex items-center gap-1 font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                       <Clock className="w-3.5 h-3.5 text-orange-500"/> Dose: {p.horario}
                     </span>
                   </div>
                 </div>
                 
                 <div>
                    {p.status === 'checado' ? (
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-5 py-2.5 rounded-xl font-bold text-xs border border-emerald-200">
                        <CheckSquare className="w-4 h-4 text-emerald-600"/> Checado ({p.enfermeiro})
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleConfirmAdmin(p.id)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 shadow-md transition transform active:scale-95"
                      >
                        Confirmar Administração
                      </button>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Modal Adicionar Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Adicionar Medicamento à Prescrição
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Medicamento & Dose</label>
                <input 
                  type="text" 
                  required
                  value={newMed}
                  onChange={(e) => setNewMed(e.target.value)}
                  placeholder="Ex: Amoxicilina 500mg VO"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Frequência</label>
                  <input 
                    type="text" 
                    value={newFreq}
                    onChange={(e) => setNewFreq(e.target.value)}
                    placeholder="Ex: 8/8 horas"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horário da Dose</label>
                  <input 
                    type="text" 
                    value={newHorario}
                    onChange={(e) => setNewHorario(e.target.value)}
                    placeholder="Ex: 14:00"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
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
                  Salvar Prescrição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
