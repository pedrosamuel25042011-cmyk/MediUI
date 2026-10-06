import React from 'react';
import { PieChart, TrendingUp, Users, BedDouble, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <PieChart className="text-blue-600 w-8 h-8" />
          Dashboard Executivo
        </h1>
        <p className="text-zinc-500 mt-2">Visão geral dos indicadores de desempenho do hospital.</p>
      </header>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
          <div className="text-zinc-500 text-sm font-semibold uppercase mb-2 flex justify-between items-center">
            Ocupação UTI <BedDouble className="w-4 h-4 text-blue-500"/>
          </div>
          <div className="text-3xl font-bold text-slate-800">82%</div>
          <div className="text-sm text-green-600 mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4"/> -2% desde ontem</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
          <div className="text-zinc-500 text-sm font-semibold uppercase mb-2 flex justify-between items-center">
            Pronto Socorro <Users className="w-4 h-4 text-red-500"/>
          </div>
          <div className="text-3xl font-bold text-slate-800">145</div>
          <div className="text-sm text-zinc-500 mt-2">Pacientes atendidos hoje</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
          <div className="text-zinc-500 text-sm font-semibold uppercase mb-2 flex justify-between items-center">
            Tempo Médio Espera <AlertCircle className="w-4 h-4 text-orange-500"/>
          </div>
          <div className="text-3xl font-bold text-slate-800">18 min</div>
          <div className="text-sm text-red-600 mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4"/> +5 min (Alta Demanda)</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
          <div className="text-zinc-500 text-sm font-semibold uppercase mb-2 flex justify-between items-center">
            Faturamento Dia <TrendingUp className="w-4 h-4 text-green-500"/>
          </div>
          <div className="text-3xl font-bold text-slate-800">R$ 1.2M</div>
          <div className="text-sm text-zinc-500 mt-2">Prévia TISS fechada</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico Mock 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 h-80 flex flex-col justify-center items-center">
          <p className="text-zinc-400 font-medium">Área reservada para Gráfico de Atendimentos por Convênio</p>
          <div className="w-3/4 h-32 bg-slate-100 rounded-md mt-4 animate-pulse flex items-end justify-around px-4">
            <div className="w-8 bg-blue-400 h-full rounded-t-sm"></div>
            <div className="w-8 bg-blue-500 h-2/3 rounded-t-sm"></div>
            <div className="w-8 bg-blue-600 h-1/2 rounded-t-sm"></div>
          </div>
        </div>
        
        {/* Gráfico Mock 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 h-80 flex flex-col justify-center items-center">
           <p className="text-zinc-400 font-medium">Área reservada para Curva de Glosas Financeiras</p>
           <div className="w-3/4 h-32 bg-slate-100 rounded-md mt-4 animate-pulse flex items-center justify-center">
              <PieChart className="w-16 h-16 text-slate-300" />
           </div>
        </div>
      </div>
    </div>
  );
}
