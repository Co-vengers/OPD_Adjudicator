import React from 'react';
import { AlertTriangle, FileText, BrainCircuit, ImageOff } from 'lucide-react'; // Added ImageOff

const ClaimAnalysis = ({ result, filePreview }) => {
  if (!result) return null;

  const { 
    status, 
    extracted_data, 
    rejection_reasons, 
    approved_amount, 
    total_amount, 
    confidence_score 
  } = result;

  const getStatusColor = (s) => {
    switch(s) {
      case 'APPROVED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'REJECTED': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'PARTIAL': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      {/* Header Result Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Claim Decision: 
            <span className={`px-4 py-1 rounded-full text-sm font-bold border ${getStatusColor(status)}`}>
              {status}
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">ID: {result.claim_id} • Processed via Gemini Flash</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider">Approved Amount</p>
          <p className={`text-3xl font-bold ${status === 'REJECTED' ? 'text-slate-400 line-through' : 'text-emerald-600'}`}>
            ₹{(approved_amount || 0).toLocaleString()}
          </p>
          {status !== 'APPROVED' && (
             <p className="text-xs text-rose-500 mt-1">
               Original: ₹{(total_amount || 0).toLocaleString()}
             </p>
          )}
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-250px)]">
        {/* Left: Document Viewer */}
        <div className="w-1/2 bg-slate-900 rounded-xl overflow-hidden shadow-lg relative flex flex-col">
          <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
            <span className="text-slate-300 font-medium flex items-center gap-2">
              <FileText size={16} /> Original Document
            </span>
          </div>
          <div className="flex-1 bg-black/50 overflow-auto p-4 flex items-center justify-center">
             {filePreview ? (
                <img src={filePreview} alt="Doc" className="max-w-full shadow-2xl rounded-sm" />
             ) : (
                <div className="text-center text-slate-500">
                    <ImageOff size={48} className="mx-auto mb-2 opacity-50"/>
                    <p>Document image not available for historical records</p>
                </div>
             )}
          </div>
        </div>

        {/* Right: Analysis Data */}
        <div className="w-1/2 flex flex-col gap-4 overflow-y-auto pr-2">
          
          {/* 1. Rejection/Warning Reasons */}
          {rejection_reasons && rejection_reasons.length > 0 && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
              <h3 className="text-rose-800 font-bold mb-3 flex items-center gap-2">
                <AlertTriangle size={18} /> Adjudication Logic Applied
              </h3>
              <ul className="space-y-2">
                {rejection_reasons.map((reason, idx) => (
                  <li key={idx} className="text-sm text-rose-700 flex items-start gap-2 bg-white/50 p-2 rounded">
                    <span className="mt-0.5">•</span> {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 2. Medical Necessity AI Check */}
          {extracted_data && (
            <div className={`p-5 rounded-xl border ${extracted_data.medical_necessity_check === 'PASS' ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'}`}>
              <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                <BrainCircuit size={18} className="text-blue-600"/> AI Medical Necessity Check
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-bold px-3 py-1 rounded border ${extracted_data.medical_necessity_check === 'PASS' ? 'bg-white text-emerald-600 border-emerald-200' : 'bg-white text-orange-600 border-orange-200'}`}>
                  {extracted_data.medical_necessity_check || "N/A"}
                </span>
                <span className="text-sm text-slate-600 italic">
                  "{extracted_data.medical_necessity_reason || "No reasoning provided"}"
                </span>
              </div>
            </div>
          )}

          {/* 3. Extracted Details Grid */}
          {extracted_data && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">Extracted Data Points</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Patient Name</p>
                  <p className="font-medium text-slate-700">{extracted_data.patient_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Date of Service</p>
                  <p className="font-medium text-slate-700">{extracted_data.date_of_service || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Diagnosis</p>
                  <p className="font-medium text-slate-700">{extracted_data.diagnosis || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Doctor Reg No</p>
                  <p className="font-medium text-slate-700">{extracted_data.doctor_reg_no || "N/A"}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-400 uppercase mb-2">Confidence Score</p>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${confidence_score > 0.8 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                    style={{width: `${(confidence_score || 0) * 100}%`}}
                  ></div>
                </div>
                <p className="text-right text-xs text-slate-400 mt-1">{((confidence_score || 0) * 100).toFixed(1)}% Accuracy</p>
              </div>
            </div>
          )}

          {/* 4. Line Items Table */}
          {extracted_data && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Line Item</th>
                    <th className="px-4 py-3 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {extracted_data.line_items && extracted_data.line_items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 text-slate-700">{item.item}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-700">₹{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClaimAnalysis;