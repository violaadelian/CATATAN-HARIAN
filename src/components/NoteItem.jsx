export default function NoteItem({ note, onEdit, onDelete }) {
  const categoryStyles = {
    Kuliah: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200',
    Pribadi: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
    Kerja: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{note.date}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{note.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[note.category] || categoryStyles.Pribadi}`}>
          {note.category}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{note.preview()}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onEdit(note)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-600 dark:bg-red-900/20 dark:text-red-200 dark:hover:bg-red-800"
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
