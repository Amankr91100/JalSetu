import { useState, useMemo } from 'react';
import { ShelterCard } from '../components/ShelterCard';
import { shelters as allShelters } from '../data/mockData';

type Filter = 'nearest' | 'capacity' | 'accessible' | 'available';

export function SheltersPage() {
  const [filter, setFilter] = useState<Filter>('nearest');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const shelters = useMemo(() => {
    let list = [...allShelters];
    if (filter === 'accessible') list = list.filter((s) => s.accessible);
    if (filter === 'available') list = list.filter((s) => s.available > 0);
    if (filter === 'nearest') list.sort((a, b) => a.distanceKm - b.distanceKm);
    if (filter === 'capacity') list.sort((a, b) => b.available - a.available);
    return list;
  }, [filter]);

  const selected = allShelters.find((s) => s.id === selectedId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Shelters</h1>
        <p className="text-sm text-navy-500 mt-0.5">Nearby relief camps and capacity · Demo data</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ['nearest', 'Nearest'],
            ['capacity', 'Highest capacity'],
            ['accessible', 'Accessible'],
            ['available', 'Available now'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
              filter === id
                ? 'bg-flood-600 text-white border-flood-600'
                : 'bg-white text-navy-600 border-navy-200 hover:bg-navy-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {shelters.map((s) => (
          <ShelterCard key={s.id} shelter={s} onViewDetails={setSelectedId} />
        ))}
      </div>

      {shelters.length === 0 && (
        <div className="text-center py-12 text-navy-500">
          <p>No shelters match the current filters.</p>
        </div>
      )}

      {/* Simple details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-navy-950/40" onClick={() => setSelectedId(null)}>
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-navy-900">{selected.name}</h2>
            <p className="text-sm text-navy-500 mt-1">{selected.address}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-navy-500">Distance</dt><dd>{selected.distanceKm} km</dd></div>
              <div className="flex justify-between"><dt className="text-navy-500">Capacity</dt><dd>{selected.capacity}</dd></div>
              <div className="flex justify-between"><dt className="text-navy-500">Available</dt><dd className="font-medium text-success-700">{selected.available}</dd></div>
              <div className="flex justify-between"><dt className="text-navy-500">Contact</dt><dd>{selected.contact}</dd></div>
              <div className="flex justify-between"><dt className="text-navy-500">Status</dt><dd className="capitalize">{selected.status}</dd></div>
            </dl>
            <div className="mt-3">
              <p className="text-xs text-navy-500 mb-1">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.amenities.map((a) => (
                  <span key={a} className="text-xs px-2 py-0.5 bg-navy-50 text-navy-700 rounded">{a}</span>
                ))}
              </div>
            </div>
            <button onClick={() => setSelectedId(null)} className="mt-5 w-full btn-secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
