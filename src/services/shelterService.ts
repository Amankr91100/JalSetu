/**
 * Shelter Service
 */

import { shelters } from '../data/mockData';
import type { Shelter } from '../types';

export async function getShelters(filters?: {
  accessibleOnly?: boolean;
  availableOnly?: boolean;
  sortBy?: 'nearest' | 'capacity';
}): Promise<Shelter[]> {
  // TODO: GET /api/v1/shelters?...
  let result = [...shelters];
  if (filters?.accessibleOnly) result = result.filter((s) => s.accessible);
  if (filters?.availableOnly) result = result.filter((s) => s.available > 0);
  if (filters?.sortBy === 'nearest') result.sort((a, b) => a.distanceKm - b.distanceKm);
  if (filters?.sortBy === 'capacity') result.sort((a, b) => b.available - a.available);
  return Promise.resolve(result);
}

export async function getShelterById(id: string): Promise<Shelter | undefined> {
  return Promise.resolve(shelters.find((s) => s.id === id));
}
