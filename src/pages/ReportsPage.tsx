import { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { locations } from '../data/mockData';
import { generateReportPreview, downloadReport, type ReportType } from '../services/reportService';

const reportTypes: { id: ReportType; label: string }[] = [
  { id: 'flood_extent', label: 'Flood extent report' },
  { id: 'risk_analysis', label: 'Risk analysis report' },
  { id: 'exposure', label: 'Exposure report' },
  { id: 'shelter', label: 'Shelter report' },
  { id: 'evacuation', label: 'Evacuation report' },
];

export function ReportsPage() {
  const [region, setRegion] = useState(locations[0].id);
  const [start, setStart] = useState('2026-09-10');
  const [end, setEnd] = useState('2026-09-17');
  const [type, setType] = useState<ReportType>('flood_extent');
  const [preview, setPreview] = useState<{ title: string; summary: string; generatedAt: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    setLoading(true);
    const data = await generateReportPreview({ regionId: region, startDate: start, endDate: end, type });
    setPreview(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Reports</h1>
        <p className="text-sm text-navy-500 mt-0.5">Generate situation reports · Frontend prototype only</p>
      </div>

      <div className="glass-card rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-navy-500 mb-1">Region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="input-field">
            {locations.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-navy-500 mb-1">Start date</label>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-xs font-medium text-navy-500 mb-1">End date</label>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy-500 mb-1">Report type</label>
          <select value={type} onChange={(e) => setType(e.target.value as ReportType)} className="input-field">
            {reportTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={handlePreview} disabled={loading} className="btn-primary">
            <Eye className="w-4 h-4" />
            {loading ? 'Generating…' : 'Preview Report'}
          </button>
          <button
            onClick={() => downloadReport({ regionId: region, startDate: start, endDate: end, type }, 'pdf')}
            className="btn-secondary"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={() => downloadReport({ regionId: region, startDate: start, endDate: end, type }, 'csv')}
            className="btn-secondary"
          >
            <FileText className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {preview && (
        <div className="glass-card rounded-xl p-5 border border-flood-100">
          <p className="text-xs uppercase tracking-wider text-navy-400 font-medium">Preview · Demo</p>
          <h2 className="mt-1 text-lg font-semibold text-navy-900">{preview.title}</h2>
          <p className="mt-2 text-sm text-navy-600">{preview.summary}</p>
          <p className="mt-3 text-xs text-navy-400">
            Generated at {new Date(preview.generatedAt).toLocaleString()}
          </p>
        </div>
      )}

      <p className="text-xs text-navy-400">
        PDF/CSV download is simulated. Connect a report backend (e.g. FastAPI + reportlab) for production files.
      </p>
    </div>
  );
}
