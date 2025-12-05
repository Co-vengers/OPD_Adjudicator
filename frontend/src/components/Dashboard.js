import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, Users, AlertCircle, CheckCircle, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
    <p className="text-sm text-slate-400">{subtext}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('https://opd-backend-1.onrender.com/api/dashboard-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-10 text-center">Loading Analytics...</div>;

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Operational Overview</h2>
        <p className="text-slate-500">Real-time metrics for OPD claims processing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Claims" 
          value={stats.total_claims} 
          subtext="+12% from last month"
          icon={<Activity className="text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard 
          title="Auto-Approval Rate" 
          value={`${stats.auto_adjudication_rate}%`} 
          subtext="Target: 85%"
          icon={<TrendingUp className="text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard 
          title="Total Disbursed" 
          value={`₹${(stats.total_disbursed / 1000).toFixed(1)}k`} 
          subtext={`of ₹${(stats.total_claimed / 1000).toFixed(1)}k claimed`}
          icon={<DollarSign className="text-amber-600" />}
          color="bg-amber-50"
        />
        <StatCard 
          title="Pending Review" 
          value={stats.manual_review} 
          subtext="Requires human attention"
          icon={<Users className="text-purple-600" />}
          color="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-6">Decision Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Approved', val: stats.approved, total: stats.total_claims, color: 'bg-emerald-500' },
              { label: 'Rejected', val: stats.rejected, total: stats.total_claims, color: 'bg-rose-500' },
              { label: 'Partial', val: stats.partial, total: stats.total_claims, color: 'bg-amber-500' },
              { label: 'Manual Review', val: stats.manual_review, total: stats.total_claims, color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="text-slate-400">{item.val} claims</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${item.color}`} 
                    style={{ width: `${stats.total_claims ? (item.val / stats.total_claims) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for a Chart or Recent Activity */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl text-white shadow-lg">
          <h3 className="font-bold text-lg mb-2">AI Performance Insight</h3>
          <p className="text-slate-300 text-sm mb-6">
            Gemini Flash model is performing with 92% average confidence. 
            Common rejection reason this week: "Annual Limit Exceeded".
          </p>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <CheckCircle size={24} className="text-emerald-400"/>
            </div>
            <div>
              <p className="text-2xl font-bold">0.8s</p>
              <p className="text-xs text-slate-400">Avg Processing Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;