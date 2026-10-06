'use client';

import React, { useState } from 'react';
import { Calendar, UserPlus, Clock, Search, MapPin, CheckCircle2, AlertCircle, X, Plus } from 'lucide-react';

interface Agendamento {
  id: string;
  hora: string;
  paciente: string;
  tipo: string;
  medico: string;
  status: 'Agendado' | 'Aguardando' | 'Em Atendimento' | 'Concluído';
  convenio: string;
  especialidade: string;
}

export default function RecepcaoPage() {
  const [search, setSearch] = useState('');
  const [selectedEsp, setSelectedEsp] = useState('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [newNombre, setNewNombre] = useState('');
  const [newTipo, setNewTipo] = useState('Consulta (Geral)');
  const [newMedico, setNewMedico] = useState('Dr. João Silva');
  const [newHora, setNewHora] = useState('10:00');
  const [newConvenio, setNewConvenio] = useState('Unimed');
  const [newEsp, setNewEsp] = useState('Cardiologia');

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    { id: '1', hora: '08:00', paciente: 'Marta R. Silva', tipo: 'Consulta (Cardio)', medico: 'Dr. João', status: 'Aguardando', convenio: 'Unimed', especialidade: 'Cardiologia' },
    { id: '2', hora: '08:30', paciente: 'Roberto C. Lima', tipo: 'Exame (Raio-X)', medico: 'Dra. Ana', status: 'Em Atendimento', convenio: 'Particular', especialidade: 'Ortopedia' },
    { id: '3', hora: '09:15', paciente: 'Felipe D. Costa', tipo: 'Consulta (Geral)', medico: 'Dr. Pedro', status: 'Agendado', convenio: 'Bradesco', especialidade: 'Geral' },
    { id: '4', hora: '10:00', paciente: 'Juliana P. Mendes', tipo: 'Retorno', medico: 'Dra. Maria', status: 'Agendado', convenio: 'SulAmérica', especialidade: 'Cardiologia' },
  ]);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre) return;

    const newItem: Agendamento = {
      id: String(Date.now()),
      hora: newHora,
      paciente: newNombre,
      tipo: newTipo,
      medico: newMedico,
      status: 'Aguardando',
      convenio: newConvenio,
      especialidade: newEsp,
    };

    setAgendamentos([newItem, ...agendamentos]);
    setNewNombre('');
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id: string, newStatus: Agendamento['status']) => {
    setAgendamentos(agendamentos.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const filtered = agendamentos.filter(item => {
    const matchSearch = item.paciente.toLowerCase().includes(search.toLowerCase()) ||
                        item.medico.toLowerCase().includes(search.toLowerCase());
    const matchEsp = selectedEsp === 'Todas' || item.especialidade === selectedEsp;
    return matchSearch && matchEsp;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Calendar className="text-blue-600 w-8 h-8" />
            Recepção & Agendamento
          </h1>
          <p className="text-zinc-500 mt-2">Check-in de pacientes e controle de agenda eletiva.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
        >
          <UserPlus className="w-5 h-5"/> Novo Paciente (Ficha)
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendário Lateral */}
        <div className="w-full lg:w-1/4 bg-white border border-zinc-200 rounded-xl p-5 shadow-sm flex flex-col">
          <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600"/> Filtrar Especialidade
          </h3>
          <div className="space-y-3 mb-6">
             {['Todas', 'Cardiologia', 'Ortopedia', 'Geral'].map((esp) => (
                <label key={esp} className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                  <input 
                    type="radio" 
                    name="esp" 
                    checked={selectedEsp === esp}
                    onChange={() => setSelectedEsp(esp)}
                    className="text-blue-600 focus:ring-blue-500" 
                  /> 
                  {esp}
                </label>
             ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-auto">
             <p className="text-blue-800 text-xs font-bold uppercase tracking-wider">Resumo do Dia</p>
             <p className="text-blue-600 text-3xl font-extrabold mt-1">{filtered.length}</p>
             <p className="text-blue-700 text-xs">Pacientes Listados</p>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div className="flex-1 bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-zinc-400" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Localizar paciente por nome ou médico..." 
                  className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {filtered.map((item) => (
                <div key={item.id} className="border border-zinc-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-50 transition">
                   <div className="flex items-center gap-4">
                      <div className="bg-slate-100 text-slate-800 font-mono font-bold px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-blue-600"/> {item.hora}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-lg">{item.paciente}</div>
                        <div className="text-sm text-zinc-500">{item.tipo} - {item.medico} ({item.convenio})</div>
                      </div>
                   </div>

                   {/* Botões funcionais de Ação */}
                   <div className="flex items-center gap-2 flex-wrap">
                      {item.status === 'Agendado' && (
                        <button 
                          onClick={() => handleUpdateStatus(item.id, 'Aguardando')}
                          className="px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg font-semibold text-xs hover:bg-orange-100 transition"
                        >
                          Fazer Check-in
                        </button>
                      )}
                      {item.status === 'Aguardando' && (
                        <button 
                          onClick={() => handleUpdateStatus(item.id, 'Em Atendimento')}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:bg-blue-700 transition"
                        >
                          Chamar Paciente
                        </button>
                      )}
                      {item.status === 'Em Atendimento' && (
                        <button 
                          onClick={() => handleUpdateStatus(item.id, 'Concluído')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs hover:bg-emerald-700 transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5"/> Concluir Atendimento
                        </button>
                      )}
                      {item.status === 'Concluído' && (
                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5"/> Atendido
                        </span>
                      )}
                   </div>
                </div>
             ))}

             {filtered.length === 0 && (
                <div className="p-12 text-center text-zinc-400">Nenhum paciente encontrado.</div>
             )}
          </div>
        </div>
      </div>

      {/* Modal Novo Paciente */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" /> Cadastrar Novo Paciente
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Ex: Ana Maria Souza"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horário</label>
                  <input 
                    type="time" 
                    value={newHora}
                    onChange={(e) => setNewHora(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Convênio</label>
                  <select 
                    value={newConvenio}
                    onChange={(e) => setNewConvenio(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Unimed">Unimed</option>
                    <option value="Bradesco">Bradesco</option>
                    <option value="SulAmérica">SulAmérica</option>
                    <option value="Particular">Particular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Especialidade</label>
                <select 
                  value={newEsp}
                  onChange={(e) => setNewEsp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Geral">Geral</option>
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
                  Salvar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
