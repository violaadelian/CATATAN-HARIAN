export default function Navbar({ darkMode, onToggleTheme }) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur transition dark:border-slate-700 dark:bg-slate-950/90 dark:shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Aplikasi</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Catatan Harian</h1>
      </div>
      <button
        type="button"
        onClick={onToggleTheme}
        className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        {darkMode ? 'Mode Terang' : 'Mode Gelap'}
      </button>
    </header>
  );
}
