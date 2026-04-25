import NoteItem from './NoteItem';

export default function NoteList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-lg font-semibold">Tidak ada catatan ditemukan</p>
        <p className="mt-2 text-sm">Coba tambahkan catatan baru atau ubah kata kunci pencarian.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
