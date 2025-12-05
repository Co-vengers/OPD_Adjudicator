import React from 'react';
import { Book, ShieldCheck, AlertOctagon, Clock, Building2, Stethoscope } from 'lucide-react';

const PolicyRules = () => {
  return (
    <div className="animate-fade-in max-w-5xl pb-10">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Policy Configuration</h2>
          <p className="text-slate-500">Active ruleset: <span className="font-mono font-medium text-slate-700">PLUM_OPD_2024</span></p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
          STATUS: ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Financial Limits */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Coverage Limits */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="text-blue-600" size={20}/> Financial Limits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Annual Limit (Floater)</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">₹50,000</p>
                <p className="text-xs text-slate-500 mt-1">Resets Jan 1st</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Per Claim Cap</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">₹5,000</p>
                <p className="text-xs text-slate-500 mt-1">Max payout per visit</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pharmacy Co-pay</p>
                <p className="text-xl font-bold text-slate-800 mt-1">30%</p>
                <p className="text-xs text-slate-500 mt-1">For Branded Drugs</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Consultation Co-pay</p>
                <p className="text-xl font-bold text-slate-800 mt-1">10%</p>
                <p className="text-xs text-slate-500 mt-1">Standard Deduction</p>
              </div>
            </div>
          </div>

          {/* 2. Exclusions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <AlertOctagon className="text-rose-600" size={20}/> Excluded Treatments
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Cosmetic Procedures", 
                "Weight Loss / Bariatric", 
                "Infertility / IVF", 
                "Experimental Therapy", 
                "Teeth Whitening", 
                "Hair Transplant", 
                "Vitamins/Supplements",
                "Self-inflicted Injury"
              ].map(item => (
                <span key={item} className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium border border-rose-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> {item}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 italic">
              * Any claim containing these keywords in the diagnosis or line items will be auto-rejected.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Waiting Periods & Info */}
        <div className="space-y-6">
          
          {/* 3. Waiting Periods */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Clock className="text-purple-600" size={20}/> Waiting Periods
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Initial Waiting</span>
                <span className="font-bold text-slate-800">30 Days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Diabetes (T2)</span>
                <span className="font-bold text-slate-800">90 Days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Hypertension</span>
                <span className="font-bold text-slate-800">90 Days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Joint Replacement</span>
                <span className="font-bold text-slate-800">2 Years</span>
              </li>
            </ul>
          </div>

          {/* 4. Network Hospitals */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="text-slate-600" size={20}/> Preferred Network
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Apollo Hospitals</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Fortis Healthcare</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Max Healthcare</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Manipal Hospitals</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Narayana Health</li>
            </ul>
          </div>

          {/* 5. Logic Explanation */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-start gap-3">
              <Book size={20} className="mt-1 text-blue-400" />
              <div>
                <h4 className="font-bold text-sm">Adjudication Engine</h4>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                  Hybrid Model: <br/>
                  1. <span className="text-white font-medium">Gemini Flash</span> extracts data & checks medical necessity.<br/>
                  2. <span className="text-white font-medium">Rule Engine</span> validates dates, limits & specific exclusions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PolicyRules;