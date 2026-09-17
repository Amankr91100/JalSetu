export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type AlertSeverity = 'critical' | 'high' | 'moderate' | 'low' | 'resolved';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';
export type ShelterStatus = 'open' | 'closed' | 'full';

export interface FloodZone {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  affectedAreaKm2: number;
  populationAtRisk: number;
  coordinates: [number, number][]; // polygon
  lastUpdated: string;
}

export interface Alert {
  id: string;
  title: string;
  location: string;
  severity: AlertSeverity;
  status: AlertStatus;
  description: string;
  recommendedAction: string;
  timestamp: string;
  type: 'flood_expansion' | 'heavy_rainfall' | 'river_level' | 'road_blockage' | 'shelter_capacity' | 'infrastructure_risk';
}

export interface Shelter {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  capacity: number;
  occupied: number;
  available: number;
  accessible: boolean;
  status: ShelterStatus;
  contact: string;
  address: string;
  amenities: string[];
}

export interface EvacuationRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  distanceKm: number;
  estimatedMinutes: number;
  riskLevel: RiskLevel;
  status: 'safe' | 'risky' | 'blocked';
  coordinates: [number, number][];
  blockedRoads?: string[];
  alternative?: boolean;
}

export interface Infrastructure {
  id: string;
  name: string;
  type: 'hospital' | 'school' | 'bridge' | 'power' | 'water' | 'road';
  latitude: number;
  longitude: number;
  riskLevel: RiskLevel;
  status: string;
}

export interface RiskMetrics {
  totalAffectedArea: number;
  highRiskZones: number;
  populationAtRisk: number;
  criticalAssets: number;
  availableShelters: number;
  activeAlerts: number;
  riskDistribution: { level: RiskLevel; count: number; percentage: number }[];
}

export interface FloodTrendPoint {
  time: string;
  affectedArea: number;
  waterLevel: number;
}

export interface Location {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  color: string;
}
