import { useEffect, useState } from 'react';

export default function NoteForm({ onSave, editingNote, cancelEdit, categories, onAddCategory }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (categories && categories.length > 0 && !category) {
      setCategory(categories[0]);
    }
  }, [categories, category]);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category);
    } else {
      setTitle('');
      setContent('');
      setCategory(categories && categories.length > 0 ? categories[0] : '');
    }
  }, [editingNote, categories]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }

    onSave({ title: title.trim(), content: content.trim(), category });
    setTitle('');
    setContent('');
    setCategory(categories && categories.length > 0 ? categories[0] : '');
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-200/30 transition dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/30">
      <div>
        <h2 className="text-xl font-semibold">{editingNote ? 'Edit Catatan' : 'Tambah Catatan Baru'}</h2>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Judul</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Masukkan judul..."
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Isi Catatan</label>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows="5"
          placeholder="Tulis catatan Anda..."
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Kategori</label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        >
          {categories && categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Tambah Kategori Baru</label>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleAddCategory();
              }
            }}
            placeholder="Nama kategori baru..."
            className="flex-1 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center justify-center rounded-3xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Tambah
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          {editingNote ? 'Simpan Perubahan' : 'Tambah Catatan'}
        </button>
        {editingNote && (
          <button type="button" onClick={cancelEdit} className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
