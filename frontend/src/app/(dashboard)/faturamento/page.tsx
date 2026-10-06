'use client';

import React, { useState } from 'react';
import { Calculator, Download, Check, XCircle, Plus, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface Guia {
  id: string;
  convenio: string;
  paciente: string;
  valor: number;
  status: 'aprovado' | 'analise' | 'glosado';
}

export default function FaturamentoPage() {
  const [guias, setGuias] = useState<Guia[]>([
    { id: 'TISS-00124', convenio: 'Bradesco Saúde', paciente: 'Ana Clara Souza', valor: 12450, status: 'aprovado' },
    { id: 'TISS-00125', convenio: 'Amil', paciente: 'João M. Santos', valor: 890, status: 'analise' },
    { id: 'TISS-00126', convenio: 'Unimed', paciente: 'Roberto F. Costa', valor: 3200, status: 'glosado' },
    { id: 'TISS-00127', convenio: 'SulAmérica', paciente: 'Mariana P. Mendes', valor: 5400, status: 'aprovado' },
  ]);

  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleExportXML = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<ans:mensagemTISS xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas">
  <cabecalho>
    <identificacaoTransacao>
      <tipoTransacao>ENVIO_LOTE_GUIAS</tipoTransacao>
      <sequencialTransacao>${Date.now()}</sequencialTransacao>
      <dataRegistroTransacao>${new Date().toISOString()}</dataRegistroTransacao>
    </identificacaoTransacao>
  </cabecalho>
  <prestadorParaOperadora>
    <loteGuias>
      <numeroLote>${Math.floor(Math.random() * 900000 + 100000)}</numeroLote>
      <guiasTISS>
        ${guias.map(g => `<guia><id>${g.id}</id><paciente>${g.paciente}</paciente><valor>${g.valor}</valor></guia>`).join('\n        ')}
      </guiasTISS>
    </loteGuias>
  </prestadorParaOperadora>
</ans:mensagemTISS>`;

    const blob = new Blob([xmlContent], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lote_tiss_${Date.now()}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportMessage('Lote TISS XML exportado e baixado com sucesso!');
    setTimeout(() => setExportMessage(null), 4000);
  };

  const handleApproveGuia = (id: string) => {
    setGuias(guias.map(g => g.id === id ? { ...g, status: 'aprovado' } : g));
  };

  const totalFaturado = guias.filter(g => g.status === 'aprovado').reduce((acc, g) => acc + g.valor, 0);
  const totalGlosado = guias.filter(g => g.status === 'glosado').reduce((acc, g) => acc + g.valor, 0);
  const emAnaliseCount = guias.filter(g => g.status === 'analise').length;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-zinc-50 min-h-screen space-y-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Calculator className="text-blue-600 w-8 h-8" />
            Faturamento (TISS / SUS)
          </h1>
          <p className="text-zinc-500 mt-2">Gestão de Guias de Convênio, Glosas e Arquivos XML Padrão ANS.</p>
        </div>
        <button 
          onClick={handleExportXML}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
        >
          <Download className="w-5 h-5"/> Exportar Lote XML (TISS)
        </button>
      </header>

      {exportMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {exportMessage}
        </div>
      )}

      {/* Cards de Faturamento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 border-l-4 border-l-blue-500">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Faturado / Aprovado</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">R$ {totalFaturado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 border-l-4 border-l-amber-500">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Em Análise (Auditoria)</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">{emAnaliseCount} Guias</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 border-l-4 border-l-red-500">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Glosas Aplicadas</div>
          <div className="text-3xl font-extrabold text-red-600 mt-2">R$ {totalGlosado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 bg-slate-800 flex justify-between items-center">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-400" /> Guias de Convênio Geradas
          </h2>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold border-b">ID Guia</th>
              <th className="p-4 font-semibold border-b">Convênio</th>
              <th className="p-4 font-semibold border-b">Paciente</th>
              <th className="p-4 font-semibold border-b text-right">Valor Total</th>
              <th className="p-4 font-semibold border-b text-center">Status</th>
              <th className="p-4 font-semibold border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {guias.map((g) => (
              <tr key={g.id} className="hover:bg-zinc-50 transition">
                <td className="p-4 font-mono font-bold text-slate-800">{g.id}</td>
                <td className="p-4 font-medium">{g.convenio}</td>
                <td className="p-4 font-medium">{g.paciente}</td>
                <td className="p-4 text-right font-bold text-slate-800">R$ {g.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="p-4 text-center">
                   {g.status === 'aprovado' && <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200"><Check className="w-3 h-3"/> APROVADO</span>}
                   {g.status === 'analise' && <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">EM ANÁLISE</span>}
                   {g.status === 'glosado' && <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs font-bold border border-red-200"><XCircle className="w-3 h-3"/> GLOSA</span>}
                </td>
                <td className="p-4 text-center">
                  {g.status !== 'aprovado' && (
                    <button 
                      onClick={() => handleApproveGuia(g.id)}
                      className="text-xs bg-emerald-600 text-white font-semibold px-3 py-1 rounded-lg hover:bg-emerald-700 transition"
                    >
                      Aprovar Guia
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
