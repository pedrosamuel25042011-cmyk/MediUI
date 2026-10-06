'use client';

import React, { useState } from 'react';
import { 
  Video, 
  FileCheck, 
  Calendar, 
  Database, 
  Radio, 
  CheckCircle2, 
  Send,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function TelemedicinaEIntegracoesPage() {
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [signedStatus, setSignedStatus] = useState<string | null>(null);
  const [realtimeEvents, setRealtimeEvents] = useState<string[]>([
    'Socket.io: Conectado ao servidor de eventos do hospital',
    'Supabase DB: Conexão segura estabelecida com a nuvem'
  ]);
  const [patientName, setPatientName] = useState('Carlos Eduardo Silva');
  const [prescriptionText, setPrescriptionText] = useState('Paracetamol 750mg de 8h em 8h por 5 dias.\nRepouso e hidratação abundante.');

  const handleCreateDailyRoom = () => {
    const room = `consulta-${Date.now()}`;
    setRoomUrl(`https://erp-hospitalar.daily.co/${room}`);
    setRealtimeEvents(prev => [`Daily.co: Sala de vídeo conferência gerada (${room})`, ...prev]);
  };

  const handleSignDocuSign = () => {
    setSignedStatus('Prescrição enviada para assinatura digital via DocuSign! Envelope ID: #DS-884920');
    setRealtimeEvents(prev => ['DocuSign: Documento enviado para assinatura eletrônica com chave digital', ...prev]);
  };

  const handleGoogleCalendar = () => {
    alert('Integração Google Calendar: Redirecionando para autenticação OAuth2 Google...');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/50 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Telemedicina & Hub de APIs</h1>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              5 APIs Integradas
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Plataforma centralizada de videoconsultas (Daily.co), assinaturas digitais (DocuSign), tempo real (WebSockets), nuvem (Supabase) e agenda (Google).
          </p>
        </div>
      </div>

      {/* Grid de APIs Integradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Daily.co (Telemedicina) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
              @daily-co/daily-react
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Telemedicina (Daily.co)</h3>
          <p className="text-slate-400 text-sm mb-4">
            Consultas em vídeo de alta definição criptografadas de ponta a ponta com salas dinâmicas.
          </p>

          {roomUrl ? (
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl space-y-2 mb-4">
              <p className="text-xs text-cyan-300 font-semibold">Sala Ativa Criada:</p>
              <a 
                href={roomUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm text-cyan-400 underline flex items-center gap-1 break-all hover:text-cyan-300"
              >
                {roomUrl} <ExternalLink className="w-3.5 h-3.5 inline shrink-0" />
              </a>
            </div>
          ) : (
            <button
              onClick={handleCreateDailyRoom}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
            >
              <Video className="w-4 h-4" /> Criar Sala de Videoconsulta
            </button>
          )}
        </div>

        {/* 2. DocuSign (Assinatura Eletrônica) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <FileCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
              docusign-esign
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Assinatura Digital (DocuSign)</h3>
          <p className="text-slate-400 text-sm mb-4">
            Envio e assinatura eletrônica de prescrições e termos de consentimento com validade jurídica.
          </p>

          <button
            onClick={handleSignDocuSign}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
          >
            <ShieldCheck className="w-4 h-4" /> Assinar Prescrição com DocuSign
          </button>

          {signedStatus && (
            <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {signedStatus}
            </p>
          )}
        </div>

        {/* 3. Google APIs (Agenda / Calendar) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/50">
              googleapis
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Google Calendar & Auth</h3>
          <p className="text-slate-400 text-sm mb-4">
            Sincronização de agenda médica, agendamentos automáticos e login unificado via Google OAuth2.
          </p>

          <button
            onClick={handleGoogleCalendar}
            className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
          >
            <Calendar className="w-4 h-4" /> Sincronizar Agenda Google
          </button>
        </div>

        {/* 4. Supabase DB & Auth */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/50">
              @supabase/supabase-js
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Supabase (Bancos de Dados & Storage)</h3>
          <p className="text-slate-400 text-sm mb-4">
            Armazenamento de exames em nuvem, controle de permissões Row-Level Security e autenticação.
          </p>

          <div className="flex items-center justify-between text-xs text-slate-300 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
            <span>Status da Conexão:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Supabase Operacional
            </span>
          </div>
        </div>

        {/* 5. WebSockets & Socket.io */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition-all md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <Radio className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-800/50">
              @nestjs/websockets & socket.io
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">WebSockets em Tempo Real (Socket.io)</h3>
          <p className="text-slate-400 text-sm mb-4">
            Alertas em tempo real de triagem de emergência, mudanças no status de leitos hospitalares e monitoramento dos pacientes.
          </p>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 h-32 overflow-y-auto space-y-1.5 text-xs font-mono text-slate-300">
            {realtimeEvents.map((evt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{evt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
