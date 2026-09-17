export function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Settings</h1>
        <p className="text-sm text-navy-500 mt-0.5">Preferences · Prototype</p>
      </div>
      <div className="glass-card rounded-xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">Display name</label>
          <input className="input-field" defaultValue="Duty Officer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">Default region</label>
          <select className="input-field">
            <option>Assam Valley</option>
            <option>Bihar Plains</option>
            <option>Kerala Backwaters</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">Alert notifications</label>
          <label className="flex items-center gap-2 text-sm text-navy-600 mt-1">
            <input type="checkbox" defaultChecked className="rounded text-flood-600" />
            Email for critical alerts
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-600 mt-1">
            <input type="checkbox" defaultChecked className="rounded text-flood-600" />
            In-app notifications
          </label>
        </div>
        <button className="btn-primary">Save changes (demo)</button>
      </div>
      <p className="text-xs text-navy-400">Settings are not persisted in this prototype.</p>
    </div>
  );
}
