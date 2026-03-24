const fs = require('fs');
const path = require('path');

const pages = [
  'admin/profile', 
  'admin/users/add', 
  'admin/users/[id]', 
  'admin/doctors/[id]', 
  'admin/verify-doctors', 
  'admin/verify-doctors/[id]', 
  'admin/hospitals/register', 
  'admin/hospitals/[id]', 
  'admin/hospitals/infrastructure',
  'admin/system/metrics', 
  'admin/system/database', 
  'admin/system/api-limits', 
  'admin/system/security', 
  'admin/system/roles', 
  'admin/system/firewall', 
  'admin/system/audit-logs', 
  'admin/system/compliance', 
  'admin/system/health', 
  'hospital/notifications', 
  'hospital/profile'
];

pages.forEach(p => { 
  const dir = path.join('src/app', p); 
  fs.mkdirSync(dir, { recursive: true }); 
  const title = p.split('/').map(w => w.toUpperCase()).join(' - '); 
  const layoutTarget = p.startsWith('admin') ? 'AdminLayout' : 'DashboardLayout';
  const layoutPath = p.startsWith('admin') ? '@/layouts/AdminLayout' : '@/layouts/DashboardLayout';

  fs.writeFileSync(path.join(dir, 'page.tsx'), `"use client"

import ${layoutTarget} from "${layoutPath}"
import { Construction } from "lucide-react"

export default function Page() {
  return (
    <${layoutTarget}>
      <div className="max-w-4xl mx-auto p-8 pt-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-medical-grey/50 rounded-full flex items-center justify-center text-medical-blue animate-pulse">
            <Construction className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-foreground">${title}</h1>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          This module is part of the extensive Phase 1 UI architecture and is structurally mapped. Interactive logic will be connected shortly.
        </p>
        <button onClick={() => window.history.back()} className="mt-8 px-8 py-3 bg-medical-blue text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-medical-blue/90 transition-colors shadow-lg shadow-medical-blue/20">
          Go Back
        </button>
      </div>
    </${layoutTarget}>
  );
}
`); 
}); 
console.log('Updated all dummy pages with beautiful layout');
