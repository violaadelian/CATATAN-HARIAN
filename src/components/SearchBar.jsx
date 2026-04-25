export default function SearchBar({ value, onChange }) {
  return (
    <div className="mt-4">
      <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Cari catatan</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Judul atau isi catatan..."
        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
      />
    </div>
  );
}
