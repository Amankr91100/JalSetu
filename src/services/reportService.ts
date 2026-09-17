/**
 * Report Service – frontend demo only.
 * Backend would generate PDF/CSV via reportlab / weasyprint / Excel exporters.
 */

export type ReportType = 'flood_extent' | 'risk_analysis' | 'exposure' | 'shelter' | 'evacuation';

export interface ReportRequest {
  regionId: string;
  startDate: string;
  endDate: string;
  type: ReportType;
}

export async function generateReportPreview(req: ReportRequest): Promise<{ title: string; summary: string; generatedAt: string }> {
  // Demo response
  return Promise.resolve({
    title: `${req.type.replace('_', ' ').toUpperCase()} Report – ${req.regionId}`,
    summary: `Prototype report covering ${req.startDate} to ${req.endDate}. In production this would contain maps, statistics, and recommendations generated from live flood and exposure data.`,
    generatedAt: new Date().toISOString(),
  });
}

export async function downloadReport(_req: ReportRequest, format: 'pdf' | 'csv'): Promise<void> {
  // Demo: no real file; show toast in UI
  console.info(`[Demo] Download ${format.toUpperCase()} report requested`);
  alert(`Demo mode: ${format.toUpperCase()} download would start here. Connect a real report backend to enable this.`);
}
