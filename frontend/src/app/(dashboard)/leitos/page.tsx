'use client';

import React, { useState } from 'react';
import { BedDouble, CheckCircle2, AlertTriangle, Wrench, UserCheck, X, RefreshCw } from 'lucide-react';

interface Bed {
  id: string;
  nome: string;
  status: 'LIVRE' | 'OCUPADO' | 'HIGIENIZACAO' | 'MANUTENCAO';
  paciente?: string;
  setor: string;
}

export default function LeitosPage() {
  const [beds, setBeds] = useState<Bed[]>([
    { id: '1', nome: 'UTI-01', status: 'OCUPADO', paciente: 'Carlos A. Silva', setor: 'UTI Adulto' },
    { id: '2', nome: 'UTI-02', status: 'LIVRE', setor: 'UTI Adulto' },
    { id: '3', nome: 'UTI-03', status: 'HIGIENIZACAO', setor: 'UTI Adulto' },
    { id: '4', nome: 'UTI-04', status: 'MANUTENCAO', setor: 'UTI Adulto' },
    { id: '5', nome: 'ENF-101', status: 'OCUPADO', paciente: 'Mariana Santos', setor: 'Enfermaria' },
    { id: '6', nome: 'ENF-102', status: 'LIVRE', setor: 'Enfermaria' },
    { id: '7', nome: 'ENF-103', status: 'HIGIENIZACAO', setor: 'Enfermaria' },
    { id: '8', nome: 'ENF-104', status: 'LIVRE', setor: 'Enfermaria' },
  ]);

  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [patientInput, setPatientInput] = useState('');

  const handleUpdateBedStatus = (bedId: string, newStatus: Bed['status'], pacienteName?: string) => {
    setBeds(beds.map(b => {
      if (b.id === bedId) {
        return {
          ...b,
          status: newStatus,
          paciente: newStatus === 'OCUPADO' ? (pacienteName || b.paciente || 'Novo Paciente') : undefined,
        };
      }
      return b;
    }));
    setSelectedBed(null);
    setPatientInput('');
  };

  const utiBeds = beds.filter(b => b.setor === 'UTI Adulto');
  const enfBeds = beds.filter(b => b.setor === 'Enfermaria');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-zinc-50 min-h-screen">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <BedDouble className="text-blue-600 w-8 h-8" />
            Mapa Dinâmico de Leitos
          </h1>
          <p className="text-zinc-500 mt-2">Visão em tempo real da ocupação e status de higienização do hospital.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg">
            Ocupados: {beds.filter(b => b.status === 'OCUPADO').length}/{beds.length}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 bg-green-100 text-green-800 rounded-lg">
            Livres: {beds.filter(b => b.status === 'LIVRE').length}
          </span>
        </div>
      </header>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div><span className="text-xs font-medium text-slate-600">Livre</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-700 rounded"></div><span className="text-xs font-medium text-slate-600">Ocupado</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div><span className="text-xs font-medium text-slate-600">Higienização</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-zinc-200 border border-zinc-300 rounded"></div><span className="text-xs font-medium text-slate-600">Manutenção</span></div>
      </div>

      {/* Setor: UTI Adulto */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Setor: UTI Adulto (Alta Complexidade)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {utiBeds.map(bed => (
            <BedCard key={bed.id} bed={bed} onClick={() => setSelectedBed(bed)} />
          ))}
        </div>
      </section>

      {/* Setor: Enfermaria */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Setor: Enfermaria Geral</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {enfBeds.map(bed => (
            <BedCard key={bed.id} bed={bed} onClick={() => setSelectedBed(bed)} />
          ))}
        </div>
      </section>

      {/* Modal Gerenciar Leito */}
      {selectedBed && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-blue-600" /> Gerenciar Leito: {selectedBed.nome}
              </h3>
              <button onClick={() => setSelectedBed(null)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-zinc-50 border rounded-xl text-sm">
                <p className="text-xs text-zinc-500">Status Atual:</p>
                <p className="font-bold text-slate-800 uppercase">{selectedBed.status}</p>
                {selectedBed.paciente && <p className="text-xs text-blue-600 font-medium mt-1">Paciente: {selectedBed.paciente}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Alterar Status do Leito</label>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleUpdateBedStatus(selectedBed.id, 'LIVRE')}
                    className="p-2.5 bg-green-50 border border-green-200 text-green-800 font-bold rounded-xl text-xs hover:bg-green-100 transition"
                  >
                    Liberação (Livre)
                  </button>

                  <button 
                    onClick={() => handleUpdateBedStatus(selectedBed.id, 'HIGIENIZACAO')}
                    className="p-2.5 bg-yellow-50 border border-yellow-200 text-yellow-800 font-bold rounded-xl text-xs hover:bg-yellow-100 transition"
                  >
                    Enviar p/ Higienização
                  </button>

                  <button 
                    onClick={() => handleUpdateBedStatus(selectedBed.id, 'MANUTENCAO')}
                    className="p-2.5 bg-zinc-100 border border-zinc-200 text-zinc-700 font-bold rounded-xl text-xs hover:bg-zinc-200 transition"
                  >
                    Marcar Manutenção
                  </button>

                  <button 
                    onClick={() => handleUpdateBedStatus(selectedBed.id, 'OCUPADO', patientInput || 'Paciente Internado')}
                    className="p-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-700 transition"
                  >
                    Internar Paciente
                  </button>
                </div>
              </div>

              {selectedBed.status === 'LIVRE' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome do Paciente para Internação</label>
                  <input 
                    type="text" 
                    value={patientInput}
                    onChange={(e) => setPatientInput(e.target.value)}
                    placeholder="Digite o nome do paciente..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BedCard({ bed, onClick }: { bed: Bed; onClick: () => void }) {
  if (bed.status === 'OCUPADO') {
    return (
      <div onClick={onClick} className="bg-slate-800 text-white rounded-xl p-4 shadow-md flex flex-col justify-between h-36 cursor-pointer hover:bg-slate-700 transition relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
        <div className="font-bold text-lg flex justify-between items-center">
          {bed.nome}
          <UserCheck className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Paciente:</div>
          <div className="text-sm font-semibold truncate text-slate-200">{bed.paciente}</div>
        </div>
        <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-700 pt-1">
          <span>Ocupado</span>
          <span className="text-blue-300 underline font-medium">Gerenciar &rarr;</span>
        </div>
      </div>
    );
  }

  if (bed.status === 'LIVRE') {
    return (
      <div onClick={onClick} className="bg-green-50 border border-green-200 text-green-900 rounded-xl p-4 shadow-sm flex flex-col justify-between h-36 cursor-pointer hover:bg-green-100 transition">
        <div className="font-bold text-lg flex justify-between items-start">
          {bed.nome}
          <CheckCircle2 className="text-green-600 w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-green-700">Livre & Preparado</div>
          <div className="text-[10px] text-green-600">Pronto para internação</div>
        </div>
        <div className="text-[10px] text-green-700 font-bold underline text-right">Internar &rarr;</div>
      </div>
    );
  }

  if (bed.status === 'HIGIENIZACAO') {
    return (
      <div onClick={onClick} className="bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-xl p-4 shadow-sm flex flex-col justify-between h-36 cursor-pointer hover:bg-yellow-100 transition">
        <div className="font-bold text-lg flex justify-between items-start">
          {bed.nome}
          <AlertTriangle className="text-yellow-600 w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-yellow-800">Higienização</div>
          <div className="text-[10px] text-yellow-700">Limpeza em andamento</div>
        </div>
        <div className="text-[10px] text-yellow-800 font-bold underline text-right">Liberar &rarr;</div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="bg-zinc-100 border border-zinc-200 text-zinc-600 rounded-xl p-4 shadow-sm flex flex-col justify-between h-36 cursor-pointer hover:bg-zinc-200 transition">
      <div className="font-bold text-lg flex justify-between items-start">
        {bed.nome}
        <Wrench className="text-zinc-500 w-5 h-5" />
      </div>
      <div>
        <div className="text-xs font-bold text-zinc-600">Manutenção</div>
        <div className="text-[10px] text-zinc-500">Bloqueado temporariamente</div>
      </div>
      <div className="text-[10px] text-zinc-600 font-bold underline text-right">Alterar &rarr;</div>
    </div>
  );
}
