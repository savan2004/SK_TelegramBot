
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Area, Line, ComposedChart
} from 'recharts';
import { PriceData, CPR } from '../types';

interface Props {
  data: PriceData[];
  cpr?: CPR;
  title: string;
  showIndicators?: boolean;
}

const TerminalChart: React.FC<Props> = ({ data, cpr, title, showIndicators = true }) => {
  return (
    <div className="flex-grow flex flex-col bg-[#050506] border border-[#262629] rounded-lg overflow-hidden group">
      <div className="bg-[#1c1c20] px-3 py-1.5 flex justify-between items-center border-b border-[#262629]">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</span>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
      
      <div className="flex-grow min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c1c20" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#52525b" 
              fontSize={8} 
              tickLine={false} 
              axisLine={false} 
              orientation="right" 
              tickFormatter={(v) => v.toFixed(0)} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050506', borderColor: '#262629', borderRadius: '4px', fontSize: '10px' }}
              itemStyle={{ padding: '0px' }}
            />
            
            {showIndicators && cpr && (
              <>
                <ReferenceLine y={cpr.pivot} stroke="#f97316" strokeOpacity={0.4} />
                <Line type="monotone" dataKey="ma20" stroke="#3b82f6" strokeWidth={1} dot={false} strokeOpacity={0.6} />
                <Line type="monotone" dataKey="ma100" stroke="#f43f5e" strokeWidth={1.5} dot={false} strokeOpacity={0.8} />
              </>
            )}

            <Area type="monotone" dataKey="price" stroke="#e2e8f0" strokeWidth={1.5} fillOpacity={0.05} fill="#e2e8f0" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TerminalChart;
