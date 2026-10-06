'use client';

import React, { useState } from 'react';
import { ScrollText, Lock, Filter, Download, CheckCircle2 } from 'lucide-react';

interface AuditLog {
  id: string;
  data: string;
  user: string;
  endpoint: string;
  action: string;
  ip: string;
  sensivel: boolean;
}

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<AuditLog[]>([
    { id: '1', data: 'Hoje, 11:45:02', user: 'admin_sys', endpoint: '/api/v1/patients/export', action: 'EXPORT', ip: '192.168.0.55', sensivel: true },
    { id: '2', data: 'Hoje, 11:30:15', user: 'carlos.m', endpoint: '/api/v1/encounters/123/clinical-notes', action: 'UPDATE (AES-256)', ip: '10.0.1.2', sensivel: true },
    { id: '3', data: 'Hoje, 10:12:44', user: 'recepcao_ana', endpoint: '/api/v1/beds/status', action: 'UPDATE', ip: '10.0.1.5', sensivel: false },
    { id: '4', data: 'Hoje, 09:00:01', user: 'system_batch', endpoint: '/api/v1/tiss/generate', action: 'SYSTEM_JOB', ip: 'localhost', sensivel: false },
  ]);

  const [filterOnlyRisk, setFilterOnlyRisk] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleExportCSV = () => {
    const csvRows = [
      ['Timestamp', 'User', 'Endpoint', 'Action', 'IP', 'Alto Risco LGPD'],
      ...logs.map(l => [l.data, l.user, l.endpoint, l.action, l.ip, l.sensivel ? 'SIM' : 'NAO'])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `audit_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadMsg('Relatório CSV de Auditoria gerado e baixado!');
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  const filteredLogs = filterOnlyRisk ? logs.filter(l => l.sensivel) : logs;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ScrollText className="text-blue-600 w-8 h-8" />
            Trilha de Auditoria Universal
          </h1>
          <p className="text-zinc-500 mt-2">Log imutável de todas as transações da API (Compliance LGPD/HIPAA).</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setFilterOnlyRisk(!filterOnlyRisk)}
            className={`flex items-center gap-2 border px-4 py-2.5 rounded-xl font-medium text-xs transition shadow-sm ${
              filterOnlyRisk ? 'bg-red-600 text-white border-red-600' : 'bg-white border-zinc-300 text-slate-700 hover:bg-zinc-50'
            }`}
          >
            <Filter className="w-4 h-4"/> {filterOnlyRisk ? 'Exibindo Apenas Alto Risco' : 'Filtrar Alto Risco LGPD'}
          </button>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-xl font-medium text-xs hover:bg-slate-700 transition shadow-md"
          >
            <Download className="w-4 h-4"/> Exportar Log CSV
          </button>
        </div>
      </header>

      {downloadMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {downloadMsg}
        </div>
      )}

      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
        <div className="p-4 border-b border-slate-700 bg-black/40 flex gap-4 text-xs font-mono text-slate-300 items-center">
           <Lock className="w-4 h-4 text-emerald-400 shrink-0" /> AES-256 Crypto Engine Ativo. Banco de Dados Imutável Conectado.
        </div>
        
        <table className="w-full text-left text-xs font-mono text-slate-300">
          <thead className="bg-slate-800/80 uppercase">
            <tr>
              <th className="p-4 font-semibold border-b border-slate-700">Timestamp</th>
              <th className="p-4 font-semibold border-b border-slate-700">User / Actor</th>
              <th className="p-4 font-semibold border-b border-slate-700">Endpoint / Tabela</th>
              <th className="p-4 font-semibold border-b border-slate-700">Ação</th>
              <th className="p-4 font-semibold border-b border-slate-700">IP de Origem</th>
              <th className="p-4 font-semibold border-b border-slate-700 text-center">Risco LGPD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
             {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/80 transition-colors">
                  <td className="p-4 text-emerald-400">{log.data}</td>
                  <td className="p-4 text-blue-300">{log.user}</td>
                  <td className="p-4 text-slate-400 truncate max-w-[200px]">{log.endpoint}</td>
                  <td className="p-4 font-bold text-amber-400">{log.action}</td>
                  <td className="p-4 text-slate-500">{log.ip}</td>
                  <td className="p-4 text-center">
                     {log.sensivel ? (
                        <span className="bg-red-900/50 text-red-400 px-2.5 py-1 rounded-md border border-red-800 font-bold">ALTO RISCO (Sensível)</span>
                     ) : (
                        <span className="text-slate-500">-</span>
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
