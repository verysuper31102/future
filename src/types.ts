export type ShiftType = '24h' | '12h_day' | '12h_night' | 'hourly';

export type DisabilityLevel = 'level_1_2' | 'level_3_4' | 'level_5_6' | 'level_7_8';

export interface VerifiedBadge {
  id: string;
  name: string; // e.g., '照顧服務員單一級', 'CPR/AED認證', '長照小卡', '良民證審核標章', '體檢合格'
  verifiedDate: string;
  issuer: string;
  iconName?: string;
}

export interface Review {
  id: string;
  caregiverId: string;
  authorName: string;
  rating: number;
  date: string;
  text: string;
  patientCondition: string;
  verifiedStay: boolean;
  helpfulCount?: number;
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD
  shifts: {
    '24h'?: boolean;
    '12h_day'?: boolean;
    '12h_night'?: boolean;
    'hourly'?: boolean;
  };
}

export interface Caregiver {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  title: string; // e.g. '高級失智症專精照服員'
  city: string; // e.g., '台北市'
  districts: string[]; // e.g., ['大安區', '信義區', '中山區']
  experienceYears: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number; // TWD
  dailyRate24h: number; // TWD for 24h
  dailyRate12h: number; // TWD for 12h
  specialties: string[]; // e.g. ['鼻胃管照護', '導尿管照護', '翻身拍背', '失智症陪伴', '中風復健', '吸痰術']
  languages: string[]; // e.g. ['國語', '台語', '客語', '英語']
  verifiedBadges: VerifiedBadge[];
  bio: string;
  philosophy: string; // 文青風格的照顧理念
  matchScore?: number;
  availability: AvailabilitySlot[];
  completedServicesCount: number;
  featuredQuote: string;
}

export interface FilterState {
  city: string;
  district: string;
  disabilityLevel: string;
  careConditions: string[];
  shiftType: ShiftType | 'all';
  maxHourlyPrice: number;
  searchKeyword: string;
  sortBy: 'match' | 'rating' | 'experience' | 'price_low' | 'price_high';
}

export interface Booking {
  id: string;
  caregiverId: string;
  caregiverName: string;
  caregiverAvatar: string;
  caregiverPhone: string;
  seekerName: string;
  seekerPhone: string;
  patientName: string;
  patientAge: number;
  patientGender: 'female' | 'male';
  disabilityLevel: string;
  selectedConditions: string[];
  serviceAddress: string;
  shiftType: ShiftType;
  startDate: string;
  endDate: string;
  totalDays: number;
  estimatedHours: number;
  totalAmount: number;
  platformFee: number;
  escrowStatus: 'pending_payment' | 'escrowed' | 'released' | 'refunded';
  contractSigned: boolean;
  signatureDataUrl?: string;
  status: 'draft' | 'contract_pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  bookingId?: string;
  senderRole: 'seeker' | 'caregiver' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isContractNotice?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: '照護技能' | '急救醫學' | '心理溝通' | '長照政策';
  hours: number;
  provider: string;
  instructor: string;
  rating: number;
  price: number;
  isFree: boolean;
  coverImage: string;
  description: string;
  deadline: string;
  enrolled: boolean;
}

export interface DocumentUploadStatus {
  idCardVerified: boolean;
  policeRecordVerified: boolean; // 良民證
  singleTechLicenseVerified: boolean; // 單一級技術士證
  healthReportVerified: boolean; // 體檢報告
  cprCertVerified: boolean; // CPR證照
  longTermCareCardVerified: boolean; // 長照小卡
}
