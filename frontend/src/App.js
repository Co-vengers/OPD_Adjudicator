import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Loader2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ClaimAnalysis from './components/ClaimAnalysis';
import Dashboard from './components/Dashboard';
import ClaimHistory from './components/ClaimHistory';
import PolicyRules from './components/PolicyRules';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleProcessClaim = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://opd-backend-1.onrender.com/api/submit-claim', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Processing failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'history':
        return <ClaimHistory />; // Removed the prop here
      case 'policies':
        return <PolicyRules />;
      case 'adjudicate':
      default:
        if (result) {
          return (
            <div className="animate-fade-in">
              <button 
                onClick={() => {setResult(null); setFile(null); setPreview(null);}} 
                className="mb-4 text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1"
              >
                ← Process New Claim
              </button>
              <ClaimAnalysis result={result} filePreview={preview} />
            </div>
          );
        }

        return (
          <div className="max-w-3xl mx-auto mt-10">
            {/* Upload UI Block - Keeps specific logic here */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center hover:shadow-md transition-all">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                {loading ? <Loader2 size={40} className="animate-spin"/> : <UploadCloud size={40} />}
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {loading ? 'Analyzing Document...' : 'New Adjudication Request'}
              </h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Upload a medical bill or prescription. Our AI will validate it against the "PLUM_OPD_2024" policy.
              </p>

              {!loading && (
                <div className="relative group">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors">
                    {file ? (
                      <p className="text-emerald-600 font-medium flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        {file.name} selected
                      </p>
                    ) : (
                      <span className="text-blue-600 font-medium">Click to Browse Files</span>
                    )}
                  </div>
                </div>
              )}

              {file && !loading && (
                <button 
                  onClick={handleProcessClaim}
                  className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all transform active:scale-95"
                >
                  Process Claim
                </button>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-800">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="ml-64 flex-1 p-8 h-screen overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {activeTab === 'adjudicate' ? 'Adjudication Console' : activeTab}
            </h1>
            <p className="text-slate-500">Plum Insurance • OPD Automation Pod</p>
          </div>
          
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default App;