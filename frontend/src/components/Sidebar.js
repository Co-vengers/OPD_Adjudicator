import React from 'react';
import { LayoutDashboard, FileText, Shield, Settings, Activity, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { id: 'adjudicate', icon: <FileText size={20} />, label: 'New Claim' },
    { id: 'history', icon: <Activity size={20} />, label: 'Claim History' },
    { id: 'policies', icon: <Shield size={20} />, label: 'Policy Rules' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          P
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Plum<span className="text-blue-500">AI</span></span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer: User Profile */}
        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="w-10 h-10 bg-slate-700 rounded-full border-2 border-slate-600 group-hover:border-blue-500 transition-colors shadow-sm overflow-hidden shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vyom" alt="User" />
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">Vyom Rohila</p>
                <p className="text-xs text-slate-400 truncate">Admin</p>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;