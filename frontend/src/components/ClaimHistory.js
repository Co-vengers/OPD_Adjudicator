import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, Eye, X } from 'lucide-react';
import ClaimAnalysis from './ClaimAnalysis'; // Import the details view

const ClaimHistory = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState(null); // State for the modal

  useEffect(() => {
    axios.get('https://opd-backend-1.onrender.com/api/claims')
      .then(res => {
        setClaims(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      APPROVED: 'bg-emerald-100 text-emerald-700',
      REJECTED: 'bg-rose-100 text-rose-700',
      PARTIAL: 'bg-amber-100 text-amber-700',
      MANUAL_REVIEW: 'bg-purple-100 text-purple-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="animate-fade-in relative">
      {/* --- LIST VIEW --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Claim History</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search claims..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={18} className="text-slate-500" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading records...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Claim ID</th>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{claim.claim_id}</td>
                  <td className="px-6 py-4 text-slate-600">{claim.patient_name || "Unknown"}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(claim.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">₹{claim.approved_amount} <span className="text-slate-400 text-xs font-normal">/ ₹{claim.total_amount}</span></td>
                  <td className="px-6 py-4">{getStatusBadge(claim.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedClaim(claim)} 
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center gap-1 justify-end w-full"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- DETAIL MODAL (OVERLAY) --- */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Claim Details</h3>
                <p className="text-xs text-slate-500">Viewing Record: {selectedClaim.claim_id}</p>
              </div>
              <button 
                onClick={() => setSelectedClaim(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-6 bg-slate-50">
              <ClaimAnalysis 
                result={selectedClaim} 
                // Construct URL to fetch image from backend
                filePreview={selectedClaim.file_path ? `https://opd-backend-1.onrender.com/${selectedClaim.file_path}` : null} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimHistory;