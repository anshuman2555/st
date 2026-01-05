
export type AppView = 'home' | 'about' | 'courses' | 'features' | 'contact' | 'dashboard' | 'admin' | 'redirecting' | 'verification';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  regId?: string;
  semester?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ApplicationData {
  fullName: string;
  dob: string;
  gender: string;
  category: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  class10Board: string;
  class10Year: string;
  class10Percent: string;
  class12Board: string;
  class12Year: string;
  class12Percent: string;
  guardianName: string;
  guardianPhone: string;
  course: string;
  doc10th?: string;
  doc12th?: string;
  docAadhar?: string;
}
