/**
 * Evacuation Route Service
 * For production: integrate OSRM / GraphHopper / custom routing that avoids flooded roads.
 */

import { evacuationRoutes } from '../data/mockData';
import type { EvacuationRoute } from '../types';

export async function getRoutes(_from?: string, _to?: string): Promise<EvacuationRoute[]> {
  // TODO: POST /api/v1/routes { origin, destination, avoidFlood: true }
  return Promise.resolve(evacuationRoutes);
}

export async function getRecommendedRoute(from: string, to: string): Promise<EvacuationRoute | undefined> {
  const routes = await getRoutes(from, to);
  return routes.find((r) => r.status === 'safe') || routes[0];
}
