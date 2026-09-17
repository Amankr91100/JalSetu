/**
 * Flood Service – ready for real API integration.
 * Replace mock implementations with fetch calls to your backend
 * (e.g. FastAPI / Express endpoints powered by Sentinel-1, GEE, etc.)
 *
 * Example real endpoint:
 *   GET /api/v1/flood/extent?bbox=...&date=...
 *   Authorization: Bearer <token>
 */

import { floodZones, floodExtentGeoJSON, riskMetrics, floodTrend } from '../data/mockData';
import type { FloodZone, RiskMetrics, FloodTrendPoint } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function getFloodZones(_regionId?: string): Promise<FloodZone[]> {
  // TODO: return fetch(`${API_BASE}/api/v1/flood/zones?region=${regionId}`).then(r => r.json())
  return Promise.resolve(floodZones);
}

export async function getFloodExtentGeoJSON(_bbox?: string) {
  // TODO: real SAR-derived GeoJSON from backend
  return Promise.resolve(floodExtentGeoJSON);
}

export async function getRiskMetrics(_locationId?: string): Promise<RiskMetrics> {
  // TODO: live metrics from risk engine
  return Promise.resolve(riskMetrics);
}

export async function getFloodTrend(_hours = 24): Promise<FloodTrendPoint[]> {
  // TODO: time-series from observation + forecast
  return Promise.resolve(floodTrend);
}

export async function getFloodProbability(_lat: number, _lng: number, _hours: number) {
  // Mock probability
  return Promise.resolve({
    current: 0.72,
    next6h: 0.81,
    next12h: 0.65,
    next24h: 0.48,
  });
}
