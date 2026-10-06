'use client';

import React, { useState } from 'react';
import { Receipt, FileSpreadsheet, Printer, Plus, X, CheckCircle2 } from 'lucide-react';

interface BillItem {
  id: string;
  desc: string;
  qtd: number;
  valor_un: number;
  total: number;
}

export default function ContaPacientePage() {
  const [itens, setItens] = useState<BillItem[]>([
    { id: '1', desc: 'Diária UTI Adulto', qtd: 2, valor_un: 1500, total: 3000 },
    { id: '2', desc: 'Ceftriaxona 1g IM', qtd: 4, valor_un: 85, total: 340 },
    { id: '3', desc: 'Taxa de Sala de Cirurgia (Porte 3)', qtd: 1, valor_un: 2100, total: 2100 },
    { id: '4', desc: 'Hemograma Completo', qtd: 1, valor_un: 120, total: 120 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closedSuccess, setClosedSuccess] = useState(false);

  // Form state
  const [newDesc, setNewDesc] = useState('');
  const [newQtd, setNewQtd] = useState(1);
  const [newValor, setNewValor] = useState(150);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc) return;

    const newItem: BillItem = {
      id: String(Date.now()),
      desc: newDesc,
      qtd: Number(newQtd),
      valor_un: Number(newValor),
      total: Number(newQtd) * Number(newValor),
    };

    setItens([...itens, newItem]);
    setNewDesc('');
    setIsModalOpen(false);
  };

  const handleCloseBill = () => {
    setClosedSuccess(true);
  };

  const totalGeral = itens.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Receipt className="text-blue-600 w-8 h-8" />
            Extrato da Conta do Paciente
          </h1>
          <p className="text-zinc-500 mt-2">Fechamento financeiro de despesas hospitalares e procedimentos.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-slate-700 transition shadow-md text-sm"
          >
            <Plus className="w-4 h-4"/> Lançar Item / Taxa
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-zinc-300 text-slate-700 px-4 py-2.5 rounded-xl font-medium hover:bg-zinc-50 transition shadow-sm text-sm"
          >
            <Printer className="w-4 h-4"/> Imprimir Extrato
          </button>
          <button 
            onClick={handleCloseBill}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition shadow-md text-sm"
          >
            <FileSpreadsheet className="w-4 h-4"/> Fechar Conta
          </button>
        </div>
      </header>

      {closedSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Conta do paciente encerrada com sucesso! Fatura pronta para emissão de nota fiscal.
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="bg-slate-800 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
             <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Paciente</div>
             <div className="text-2xl font-bold">Roberto F. Costa</div>
             <div className="text-xs text-slate-300 mt-1">Convênio: Particular (Sem Cobertura Plena) | Prontuário: #884920</div>
           </div>
           <div className="text-left md:text-right">
             <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total Parcial da Conta</div>
             <div className="text-3xl font-extrabold text-emerald-400">R$ {totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
           </div>
        </div>

        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Descrição do Item (Taxa / Medicamento / Diária)</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Qtd</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Valor Unit.</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Total Parcial</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
             {itens.map((i) => (
                <tr key={i.id} className="hover:bg-zinc-50 transition">
                  <td className="p-4 font-medium text-slate-800">{i.desc}</td>
                  <td className="p-4 text-right font-semibold">{i.qtd}</td>
                  <td className="p-4 text-right">R$ {i.valor_un.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                  <td className="p-4 text-right font-bold text-slate-800">R$ {i.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>

      {/* Modal Lançar Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Lançar Item na Conta
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descrição do Item / Procedimento</label>
                <input 
                  type="text" 
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ex: Diária de Enfermaria"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Quantidade</label>
                  <input 
                    type="number" 
                    min="1"
                    value={newQtd}
                    onChange={(e) => setNewQtd(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Valor Unitário (R$)</label>
                  <input 
                    type="number" 
                    value={newValor}
                    onChange={(e) => setNewValor(Number(e.target.value))}
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
                  Adicionar à Conta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
