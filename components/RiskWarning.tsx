
import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  onAccept: () => void;
}

const RiskWarning: React.FC<Props> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#141417] border border-[#262629] max-w-lg w-full rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-amber-500/20 p-3 rounded-full">
            <AlertTriangle className="text-amber-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Market Risk Warning</h2>
        </div>
        
        <div className="space-y-4 text-gray-300 mb-8 leading-relaxed">
          <p>
            Trading in equity derivatives (Options) carries significant risk and may lead to loss of entire capital.
          </p>
          <p className="font-semibold text-white">
            SEBI Warning: 9 out of 10 individual traders in equity futures and options segment incurred losses.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
            <li>Signals generated are for educational purposes only.</li>
            <li>Past performance is not indicative of future results.</li>
            <li>Consult a certified financial advisor before making any investment.</li>
          </ul>
        </div>

        <button
          onClick={onAccept}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
        >
          <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          I Understand the Risks
        </button>
      </div>
    </div>
  );
};

export default RiskWarning;
