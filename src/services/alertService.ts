/**
 * Alert Service – prototype.
 * Connect to real alerting pipeline (Redis pub/sub, WebSocket, or REST).
 */

import { alerts } from '../data/mockData';
import type { Alert, AlertSeverity } from '../types';

export async function getAlerts(severity?: AlertSeverity | 'all'): Promise<Alert[]> {
  // TODO: GET /api/v1/alerts?severity=...
  if (!severity || severity === 'all') return Promise.resolve(alerts);
  return Promise.resolve(alerts.filter((a) => a.severity === severity));
}

export async function acknowledgeAlert(id: string): Promise<void> {
  // TODO: PATCH /api/v1/alerts/:id { status: 'acknowledged' }
  console.info('[Demo] Acknowledge alert', id);
}

export async function resolveAlert(id: string): Promise<void> {
  // TODO: PATCH /api/v1/alerts/:id { status: 'resolved' }
  console.info('[Demo] Resolve alert', id);
}
