'use client';

import React, { useState } from 'react';
import { Pill, Search, AlertTriangle, Plus, X, Edit3, CheckCircle2 } from 'lucide-react';

interface Medicamento {
  id: string;
  nome: string;
  lote: string;
  validade: string;
  estoque: number;
  minimo: number;
  status: 'normal' | 'critico' | 'controlado';
}

export default function FarmaciaPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
  const [newStock, setNewStock] = useState<number>(0);

  // Form states
  const [newNome, setNewNome] = useState('');
  const [newLote, setNewLote] = useState('L' + Math.floor(Math.random() * 9000 + 1000));
  const [newValidade, setNewValidade] = useState('12/2026');
  const [newEstoque, setNewEstoque] = useState(100);
  const [newMinimo, setNewMinimo] = useState(50);
  const [newStatus, setNewStatus] = useState<Medicamento['status']>('normal');

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    { id: '1', nome: 'Dipirona Sódica 500mg', lote: 'L2309', validade: '10/2027', estoque: 1450, minimo: 500, status: 'normal' },
    { id: '2', nome: 'Ceftriaxona 1g IM', lote: 'C9911', validade: '12/2026', estoque: 45, minimo: 100, status: 'critico' },
    { id: '3', nome: 'Morfina 10mg/ml', lote: 'M0012', validade: '05/2027', estoque: 120, minimo: 50, status: 'controlado' },
    { id: '4', nome: 'Soro Fisiológico 0.9% 500ml', lote: 'S1122', validade: '01/2028', estoque: 5000, minimo: 2000, status: 'normal' },
  ]);

  const handleAddMedicamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNome) return;

    const newMed: Medicamento = {
      id: String(Date.now()),
      nome: newNome,
      lote: newLote,
      validade: newValidade,
      estoque: Number(newEstoque),
      minimo: Number(newMinimo),
      status: newStatus,
    };

    setMedicamentos([newMed, ...medicamentos]);
    setNewNome('');
    setIsModalOpen(false);
  };

  const handleUpdateStock = () => {
    if (!selectedMed) return;
    setMedicamentos(medicamentos.map(m => {
      if (m.id === selectedMed.id) {
        const updatedEstoque = Number(newStock);
        const updatedStatus = updatedEstoque < m.minimo ? 'critico' : m.status === 'controlado' ? 'controlado' : 'normal';
        return { ...m, estoque: updatedEstoque, status: updatedStatus };
      }
      return m;
    }));
    setSelectedMed(null);
  };

  const filtered = medicamentos.filter(med => {
    const matchSearch = med.nome.toLowerCase().includes(search.toLowerCase()) || med.lote.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'TODOS' || med.status === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const criticalMed = medicamentos.find(m => m.estoque < m.minimo);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-zinc-50 min-h-screen space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Pill className="text-blue-600 w-8 h-8" />
            Farmácia & Estoque Central
          </h1>
          <p className="text-zinc-500 mt-2">Controle de dispensação, lotes e validade.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-slate-700 transition shadow-md"
        >
          <Plus className="w-5 h-5"/> Novo Medicamento
        </button>
      </header>

      {/* Alerta de Estoque Mínimo */}
      {criticalMed && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl flex items-start gap-3 shadow-sm">
          <AlertTriangle className="text-orange-500 w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-orange-800 font-bold text-sm">Alerta de Estoque Crítico</h3>
            <p className="text-orange-700 text-xs mt-0.5">
              O medicamento <strong>{criticalMed.nome}</strong> atingiu o limite mínimo ({criticalMed.estoque} unidades disponíveis). Solicite reposição imediata.
            </p>
          </div>
        </div>
      )}

      {/* Tabela de Medicamentos */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="p-4 border-b border-zinc-200 flex flex-col md:flex-row gap-4 bg-zinc-50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por princípio ativo ou código de lote..." 
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-zinc-300 rounded-xl px-4 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TODOS">Todos os Status</option>
            <option value="CRITICO">Estoque Crítico</option>
            <option value="CONTROLADO">Medicamentos Controlados</option>
            <option value="NORMAL">Estável</option>
          </select>
        </div>
        
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-800 text-zinc-100 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Princípio Ativo</th>
              <th className="p-4 font-semibold">Lote / Validade</th>
              <th className="p-4 font-semibold text-right">Qtd Atual</th>
              <th className="p-4 font-semibold text-right">Estoque Mín.</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {filtered.map((med) => (
              <tr key={med.id} className="hover:bg-zinc-50 transition">
                <td className="p-4 font-semibold text-slate-800">{med.nome}</td>
                <td className="p-4">{med.lote} <br/><span className="text-xs text-zinc-400">Val: {med.validade}</span></td>
                <td className={`p-4 text-right font-bold ${med.estoque < med.minimo ? 'text-red-600' : 'text-slate-700'}`}>{med.estoque}</td>
                <td className="p-4 text-right">{med.minimo}</td>
                <td className="p-4">
                  {med.status === 'normal' && <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-md text-xs font-bold">ESTÁVEL</span>}
                  {med.status === 'critico' && <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-md text-xs font-bold">CRÍTICO</span>}
                  {med.status === 'controlado' && <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-md text-xs font-bold">CONTROLE ESP.</span>}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => { setSelectedMed(med); setNewStock(med.estoque); }}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-xs bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1 mx-auto"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Ajustar Estoque
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Ajustar Estoque */}
      {selectedMed && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800">Ajustar Estoque: {selectedMed.nome}</h3>
              <button onClick={() => setSelectedBed(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" onClick={() => setSelectedMed(null)} />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase">Nova Quantidade em Estoque</label>
              <input 
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-xl text-lg font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setSelectedMed(null)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleUpdateStock}
                  className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md"
                >
                  Salvar Ajuste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Medicamento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" /> Cadastrar Medicamento
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedicamento} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome / Princípio Ativo</label>
                <input 
                  type="text" 
                  required
                  value={newNome}
                  onChange={(e) => setNewNome(e.target.value)}
                  placeholder="Ex: Paracetamol 750mg"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Qtd Estoque</label>
                  <input 
                    type="number" 
                    value={newEstoque}
                    onChange={(e) => setNewEstoque(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estoque Mínimo</label>
                  <input 
                    type="number" 
                    value={newMinimo}
                    onChange={(e) => setNewMinimo(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Categoria de Controle</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Medicamento['status'])}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="normal">Estável / Normal</option>
                  <option value="controlado">Medicamento Controlado (Portaria 344)</option>
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
                  Cadastrar Medicamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
