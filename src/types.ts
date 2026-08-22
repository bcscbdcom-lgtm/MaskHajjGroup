export type Language = 'en' | 'bn';

export interface PackageItem {
  id: string;
  type: 'hajj' | 'umrah';
  category: 'budget' | 'economy' | 'standard' | 'vip' | 'vvip';
  badgeEn: string;
  badgeBn: string;
  categoryTagsEn?: string[];
  categoryTagsBn?: string[];
  isPopular?: boolean;
  nameEn: string;
  nameBn: string;
  durationEn: string;
  durationBn: string;
  priceEn: string;
  priceBn: string;
  priceNumeric: number;
  hotelMakkahEn: string;
  hotelMakkahBn: string;
  hotelMadinahEn: string;
  hotelMadinahBn: string;
  distanceMakkahEn: string;
  distanceMakkahBn: string;
  highlightsEn: string[];
  highlightsBn: string[];
  inclusionsEn: string[];
  inclusionsBn: string[];
  exclusionsEn: string[];
  exclusionsBn: string[];
  itinerarySummaryEn: string;
  itinerarySummaryBn: string;
  departureDatesEn?: string;
  departureDatesBn?: string;
  airlinesEn: string;
  airlinesBn: string;
  availability?: 'open' | 'limited' | 'fast_filling' | 'sold_out';
  seatsRemaining?: number;
  totalSeats?: number;
  availabilityBadgeEn?: string;
  availabilityBadgeBn?: string;
}

export interface LeadershipMember {
  id: string;
  nameEn: string;
  nameBn: string;
  roleEn: string;
  roleBn: string;
  titleEn: string;
  titleBn: string;
  yearsOfService: number;
  hajjCaravansLed: number;
  image: string;
  bioEn: string;
  bioBn: string;
  credentialsEn: string[];
  credentialsBn: string[];
  specialtiesEn: string[];
  specialtiesBn: string[];
  hasVerifiedCertificate?: boolean;
  certificateTitleEn?: string;
  certificateTitleBn?: string;
  certificateNo?: string;
  email?: string;
  phone?: string;
}

export interface UmrahSchedule {
  monthEn: string;
  monthBn: string;
  datesEn: string;
  datesBn: string;
  statusEn: string;
  statusBn: string;
  badgeColor?: string;
}

export interface GuideMember {
  id: string;
  nameEn: string;
  nameBn: string;
  roleEn: string;
  roleBn: string;
  experienceEn: string;
  experienceBn: string;
  image: string;
  bioEn: string;
  bioBn: string;
  specialtiesEn: string[];
  specialtiesBn: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  locationEn: string;
  locationBn: string;
  rating: number;
  packageTypeEn: string;
  packageTypeBn: string;
  year: string;
  textEn: string;
  textBn: string;
}

export interface BlogArticle {
  id: string;
  categoryEn: string;
  categoryBn: string;
  categoryColor: string;
  dateEn: string;
  dateBn: string;
  readTimeEn: string;
  readTimeBn: string;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  contentEn: string;
  contentBn: string;
  icon: string;
  tagsEn: string[];
  tagsBn: string[];
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  category: 'booking' | 'visa' | 'requirements' | 'cost' | 'elderly' | 'general' | 'hajj' | 'umrah';
  segment?: 'general' | 'hajj' | 'umrah' | 'all';
  isPopular?: boolean;
  initialClicks?: number;
  helpfulScore?: number;
  tags?: string[];
}

export interface NoticeItem {
  id: string;
  textEn: string;
  textBn: string;
  active: boolean;
  type: 'urgent' | 'info' | 'success';
  date: string;
}
