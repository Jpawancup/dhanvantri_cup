import { create } from 'zustand'

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  phone: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  hospital_id: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  admin_user_id?: string;
}

export interface PrescriptionItem {
  id: string;
  medicine_name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  op_id: string;
  doctor_id: string;
  patient_id: string;
  hospital_id: string;
  items: PrescriptionItem[];
  created_at: string;
}

export interface PharmacyOrder {
  id: string;
  prescription_id: string;
  patient_id: string;
  hospital_id: string;
  status: 'pending' | 'ready' | 'dispensed';
  created_at: string;
}

export interface LabOrder {
  id: string;
  op_id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  test_name: string;
  status: 'pending' | 'completed';
}

export interface LabReport {
  id: string;
  lab_order_id: string;
  hospital_id: string;
  report_file: string;
  result_summary: string;
  uploaded_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface AmbulanceRequest {
  id: string;
  patient_id: string;
  hospital_id: string;
  pickup_location: string;
  status: 'requested' | 'dispatched' | 'arrived' | 'completed';
}

export interface OPRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  appointment_id: string;
  visit_date: string;
  notes: string;
}

interface HospitalState {
  patients: Patient[];
  doctors: Doctor[];
  hospitals: Hospital[];
  prescriptions: Prescription[];
  pharmacyOrders: PharmacyOrder[];
  labOrders: LabOrder[];
  labReports: LabReport[];
  appointments: Appointment[];
  ambulanceRequests: AmbulanceRequest[];
  opRecords: OPRecord[];

  // Actions
  addPrescription: (prescription: Prescription) => void;
  updatePharmacyOrderStatus: (id: string, status: 'pending' | 'ready' | 'dispensed') => void;
  addLabOrder: (order: LabOrder) => void;
  uploadLabReport: (report: LabReport) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: 'scheduled' | 'completed' | 'cancelled') => void;
  requestAmbulance: (request: AmbulanceRequest) => void;
  updateAmbulanceStatus: (id: string, status: 'requested' | 'dispatched' | 'arrived' | 'completed') => void;
  addOPRecord: (record: OPRecord) => void;
}

const initialPatients: Patient[] = [
  { id: 'p1', name: 'Prakash Kumar', age: 32, gender: 'Male', blood_group: 'O+', phone: '+91 9876543210' },
  { id: 'p2', name: 'Sneha Reddy', age: 28, gender: 'Female', blood_group: 'A+', phone: '+91 9876543211' }
];

const initialDoctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Arun Sharma', specialization: 'Cardiology', experience: '15 Years', hospital_id: 'h1' },
  { id: 'd2', name: 'Dr. Meera Patel', specialization: 'Neurology', experience: '12 Years', hospital_id: 'h1' }
];

const initialHospitals: Hospital[] = [
  { id: 'h1', name: 'Apollo Hospitals', location: 'Jubilee Hills, Hyderabad', admin_user_id: 'u1' },
  { id: 'h2', name: 'Care Hospitals', location: 'Banjara Hills, Hyderabad', admin_user_id: 'u2' }
];

const initialAppointments: Appointment[] = [
  { id: 'a1', patient_id: 'p1', doctor_id: 'd1', hospital_id: 'h1', date: '2026-03-21T10:00:00Z', status: 'completed' },
  { id: 'a2', patient_id: 'p2', doctor_id: 'd2', hospital_id: 'h1', date: '2026-03-22T14:30:00Z', status: 'scheduled' }
];

const initialOPRecords: OPRecord[] = [
  { id: 'op1', patient_id: 'p1', doctor_id: 'd1', hospital_id: 'h1', appointment_id: 'a1', visit_date: '2026-03-21T10:00:00Z', notes: 'Patient complained of mild chest pain. Recommended ECG and prescribed basic meds.' }
];

const initialPrescriptions: Prescription[] = [
  {
    id: 'rx1', op_id: 'op1', doctor_id: 'd1', patient_id: 'p1', hospital_id: 'h1', created_at: '2026-03-21T10:15:00Z',
    items: [
      { id: 'item1', medicine_name: 'Aspirin 75mg', dosage: '1-0-0', duration: '30 days', instructions: 'After breakfast' },
      { id: 'item2', medicine_name: 'Atorvastatin 10mg', dosage: '0-0-1', duration: '30 days', instructions: 'After dinner' }
    ]
  }
];

const initialPharmacyOrders: PharmacyOrder[] = [
  { id: 'po1', prescription_id: 'rx1', patient_id: 'p1', hospital_id: 'h1', status: 'pending', created_at: '2026-03-21T10:15:00Z' }
];

const initialLabOrders: LabOrder[] = [
  { id: 'lo1', op_id: 'op1', patient_id: 'p1', doctor_id: 'd1', hospital_id: 'h1', test_name: 'ECG', status: 'pending' },
  { id: 'lo2', op_id: 'op1', patient_id: 'p1', doctor_id: 'd1', hospital_id: 'h1', test_name: 'Lipid Profile', status: 'completed' }
];

const initialLabReports: LabReport[] = [
  { id: 'rep1', lab_order_id: 'lo2', hospital_id: 'h1', report_file: 'lipid_profile_report.pdf', result_summary: 'Cholesterol levels slightly elevated. Triglycerides normal.', uploaded_at: '2026-03-22T09:00:00Z' }
];

const initialAmbulanceRequests: AmbulanceRequest[] = [
  { id: 'amb1', patient_id: 'p2', hospital_id: 'h1', pickup_location: 'Madhapur, Hyderabad', status: 'completed' }
];


export const useHospitalStore = create<HospitalState>((set) => ({
  patients: initialPatients,
  doctors: initialDoctors,
  hospitals: initialHospitals,
  prescriptions: initialPrescriptions,
  pharmacyOrders: initialPharmacyOrders,
  labOrders: initialLabOrders,
  labReports: initialLabReports,
  appointments: initialAppointments,
  ambulanceRequests: initialAmbulanceRequests,
  opRecords: initialOPRecords,

  addPrescription: (prescription) => set((state) => {
    // When prescription is created, auto-create pharmacy order
    const newPharmacyOrder: PharmacyOrder = {
      id: `po-${Date.now()}`,
      prescription_id: prescription.id,
      patient_id: prescription.patient_id,
      hospital_id: prescription.hospital_id,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    return {
      prescriptions: [...state.prescriptions, prescription],
      pharmacyOrders: [...state.pharmacyOrders, newPharmacyOrder]
    };
  }),

  updatePharmacyOrderStatus: (id, status) => set((state) => ({
    pharmacyOrders: state.pharmacyOrders.map(order => order.id === id ? { ...order, status } : order)
  })),

  addLabOrder: (order) => set((state) => ({
    labOrders: [...state.labOrders, order]
  })),

  uploadLabReport: (report) => set((state) => {
    // Update lab order status to completed
    const updatedLabOrders = state.labOrders.map(order => 
      order.id === report.lab_order_id ? { ...order, status: 'completed' as const } : order
    );
    return {
      labReports: [...state.labReports, report],
      labOrders: updatedLabOrders
    };
  }),

  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment]
  })),

  updateAppointmentStatus: (id, status) => set((state) => ({
    appointments: state.appointments.map(app => app.id === id ? { ...app, status } : app)
  })),

  requestAmbulance: (request) => set((state) => ({
    ambulanceRequests: [...state.ambulanceRequests, request]
  })),

  updateAmbulanceStatus: (id, status) => set((state) => ({
    ambulanceRequests: state.ambulanceRequests.map(req => req.id === id ? { ...req, status } : req)
  })),

  addOPRecord: (record) => set((state) => ({
    opRecords: [...state.opRecords, record]
  }))
}));
