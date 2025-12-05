import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const getStatusColor = (status) => {
    switch(status) {
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      case 'PARTIAL': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (status) => {
    switch(status) {
      case 'APPROVED': return <CheckCircle className="w-6 h-6 text-green-600"/>;
      case 'REJECTED': return <XCircle className="w-6 h-6 text-red-600"/>;
      default: return <AlertTriangle className="w-6 h-6 text-yellow-600"/>;
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mt-6 animate-fade-in">
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Claim Analysis</h2>
          <p className="text-gray-500">ID: {result.claim_id}</p>
        </div>
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(result.status)}`}>
          {getIcon(result.status)}
          <span className="font-bold">{result.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: AI Extraction */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Info size={18}/> Extracted Data
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Patient:</span> {result.extracted_data.patient_name}</p>
            <p><span className="font-medium">Diagnosis:</span> {result.extracted_data.diagnosis}</p>
            <p><span className="font-medium">Doctor:</span> {result.extracted_data.doctor_name}</p>
            <p><span className="font-medium">Reg No:</span> {result.extracted_data.doctor_reg_no || "Not found"}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
               <p className="font-medium">Confidence Score</p>
               <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                 <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${result.confidence_score * 100}%`}}></div>
               </div>
               <p className="text-right text-xs mt-1">{(result.confidence_score * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Right: Adjudication */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Financial Decision</h3>
          <div className="flex justify-between items-center mb-2">
            <span>Claimed Amount:</span>
            <span className="font-bold">₹{result.total_amount}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-lg">
            <span>Approved Amount:</span>
            <span className={`font-bold ${result.status === 'REJECTED' ? 'text-red-600' : 'text-green-600'}`}>
              ₹{result.approved_amount}
            </span>
          </div>

          {result.rejection_reasons && result.rejection_reasons.length > 0 && (
            <div className="bg-red-50 p-3 rounded text-sm text-red-700 border border-red-100">
              <p className="font-bold mb-1">Reasoning:</p>
              <ul className="list-disc pl-4 space-y-1">
                {result.rejection_reasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;