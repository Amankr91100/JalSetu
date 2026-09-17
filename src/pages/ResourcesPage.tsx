import { Link } from 'react-router-dom';
import { Satellite, Map, Shield, Users, ArrowRight } from 'lucide-react';

const techStack = [
  'React', 'TypeScript', 'MapLibre GL', 'Node.js', 'Express.js', 'Python', 'FastAPI',
  'PostgreSQL', 'PostGIS', 'Redis', 'Sentinel-1 SAR', 'Google Earth Engine',
  'GeoPandas', 'Rasterio', 'GDAL', 'Machine Learning',
];

export function ResourcesPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-navy-900">About Flood Guard</h1>
        <p className="mt-3 text-navy-600 leading-relaxed">
          Flood Guard is an intelligent flood monitoring and decision-support platform that
          combines satellite-based flood mapping, forecast-assisted risk analysis, exposure data,
          shelters, and evacuation routes to help authorities act faster and more confidently.
        </p>

        <section className="mt-12 space-y-8">
          <div className="flex gap-4">
            <div className="p-2.5 rounded-lg bg-flood-50 text-flood-600 h-fit">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-navy-900">Sentinel-1 SAR & cloudy conditions</h2>
              <p className="mt-1 text-sm text-navy-600 leading-relaxed">
                Optical satellites are often blocked by clouds during monsoon. Sentinel-1 Synthetic
                Aperture Radar (SAR) can detect open water and flooded areas through cloud cover,
                day or night, making it a primary source for rapid inundation mapping.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-2.5 rounded-lg bg-flood-50 text-flood-600 h-fit">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-navy-900">Flood inundation mapping</h2>
              <p className="mt-1 text-sm text-navy-600 leading-relaxed">
                Inundation mapping estimates the spatial extent of flood water. Algorithms classify
                SAR backscatter and may fuse elevation, river networks, and historical extents to
                produce flood polygons used for exposure and risk analysis.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-2.5 rounded-lg bg-flood-50 text-flood-600 h-fit">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-navy-900">How risk analysis works</h2>
              <p className="mt-1 text-sm text-navy-600 leading-relaxed">
                Risk combines observed flood extent, forecast rainfall and river levels, terrain,
                population and critical infrastructure exposure, and uncertainty. Outputs support
                prioritisation of rescue, shelters, and routes — they do not replace official
                authority judgment.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-2.5 rounded-lg bg-flood-50 text-flood-600 h-fit">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-navy-900">Why human validation matters</h2>
              <p className="mt-1 text-sm text-navy-600 leading-relaxed">
                Automated products can have false positives/negatives (e.g. permanent water,
                radar shadows). Human-in-the-loop review by trained officers ensures maps and
                recommendations are fit for operational use before they drive decisions.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-navy-900">Technology stack</h2>
          <p className="mt-1 text-sm text-navy-500">Frontend prototype + backend-ready design</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-sm bg-navy-50 text-navy-700 border border-navy-100 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-12 p-5 rounded-xl bg-navy-50 border border-navy-100">
          <p className="text-sm text-navy-700">
            This website is a <strong>decision-support prototype</strong> with mock data.
            It is not connected to live satellite or weather feeds. Final emergency decisions
            must always be validated by authorised authorities.
          </p>
          <Link to="/dashboard" className="mt-4 inline-flex btn-primary text-sm">
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
