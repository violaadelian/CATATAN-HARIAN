import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import Note from './models/Note';
import { fetchPosts } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTheme = localStorage.getItem('catatanHarianDarkMode');
    if (storedTheme !== null) {
      setDarkMode(JSON.parse(storedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('catatanHarianDarkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const loadInitialNotes = async () => {
      setLoading(true);
      setError('');

      const storedNotes = localStorage.getItem('catatanHarianNotes');
      if (storedNotes) {
        try {
          const parsedNotes = JSON.parse(storedNotes);
          const savedNotes = parsedNotes.map((note) => new Note(note));
          setNotes(savedNotes);
          setLoading(false);
          return;
        } catch (storageError) {
          console.error('LocalStorage parse failed:', storageError);
          localStorage.removeItem('catatanHarianNotes');
        }
      }

      try {
        const posts = await fetchPosts();
        const apiNotes = posts.slice(0, 3).map((post) => {
          return new Note({
            title: post.title,
            content: post.body,
            category: 'Kuliah',
          });
        });

        setNotes(apiNotes);
      } catch (err) {
        setError('Gagal memuat data dari API. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    const query = searchText.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchText]);

  const handleSaveNote = (data) => {
    if (editingNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id
            ? new Note({
                id: note.id,
                title: data.title,
                content: data.content,
                category: data.category,
                date: note.date,
              })
            : note
        )
      );
      setEditingNote(null);
    } else {
      setNotes((prevNotes) => [new Note(data), ...prevNotes]);
    }
  };

  useEffect(() => {
    localStorage.setItem('catatanHarianNotes', JSON.stringify(notes));
  }, [notes]);

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleDeleteNote = (noteId) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
    if (!confirmDelete) return;
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (editingNote?.id === noteId) {
      setEditingNote(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleToggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? 'dark min-h-screen bg-slate-900 text-slate-100' : 'min-h-screen bg-slate-100 text-slate-900'}>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Navbar darkMode={darkMode} onToggleTheme={handleToggleTheme} />

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/40 transition dark:border-slate-700 dark:bg-slate-950/80 dark:shadow-slate-950/30">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold sm:text-4xl">Catatan Harian</h1>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Tambahkan, cari, edit, dan hapus catatan harian Anda. Data awal juga dimuat dari API publik untuk menampilkan contoh catatan.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <NoteForm onSave={handleSaveNote} editingNote={editingNote} cancelEdit={handleCancelEdit} />
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-xl font-semibold">Cari Catatan</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Cari berdasarkan judul atau isi secara real-time.</p>
              <SearchBar value={searchText} onChange={setSearchText} />
              <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <p><strong>Total catatan:</strong> {filteredNotes.length}</p>
                <p className="mt-2">Gunakan filter untuk mempercepat pencarian catatan penting.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Daftar Catatan</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Menampilkan judul, tanggal, kategori, dan preview isi catatan.</p>
            </div>
            {loading && <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">Memuat data API...</span>}
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </div>
          ) : (
            <NoteList notes={filteredNotes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
