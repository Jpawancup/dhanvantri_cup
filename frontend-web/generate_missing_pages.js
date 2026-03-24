const fs = require('fs');
const path = require('path');
const pages = [
  'admin/profile', 
  'admin/users/add', 
  'admin/users/[id]', 
  'admin/doctors', 
  'admin/doctors/[id]', 
  'admin/verify-doctors', 
  'admin/verify-doctors/[id]', 
  'admin/hospitals', 
  'admin/hospitals/register', 
  'admin/hospitals/[id]', 
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
  fs.writeFileSync(path.join(dir, 'page.tsx'), `import React from 'react';

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
      <p className="text-muted-foreground">This page is currently under implementation in Phase 1.</p>
    </div>
  );
}
`); 
}); 
console.log('Created all missing pages');
