import { useState, useEffect } from "react";
import api from "../../services/api";

import NoteForm from "../../features/notes/NoteForm";
import NoteList from "../../features/notes/NoteList";

function Notes() {
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [category, setCategory] = useState("General");
const [search, setSearch] = useState("");
const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);
const [editingNote, setEditingNote] = useState(null);

const fetchNotes = async () => {
try {
setLoading(true);


  const response = await api.get("/notes");

  setNotes(response.data);
} catch (error) {
  console.log(
    "GET NOTES ERROR:",
    error.response?.data || error.message
  );
  alert("Notes load nathi thai.");
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchNotes();
}, []);

const addNote = async (e) => {
  if (e) {
    e.preventDefault();
  }

  if (!title.trim() || !content.trim()) {
    alert("Title ane content banne lakho.");
    return;
  }

  try {
    if (editingNote) {
      const response = await api.put(
        "/notes/" + editingNote.id,
        {
          title: title.trim(),
          content: content.trim(),
          category: category,
        }
      );

      setNotes((oldNotes) =>
        oldNotes.map((note) =>
          note.id === editingNote.id
            ? response.data
            : note
        )
      );

      setEditingNote(null);
    } else {
      const response = await api.post("/notes", {
        title: title.trim(),
        content: content.trim(),
        category: category,
      });

      setNotes((oldNotes) => [
        response.data,
        ...oldNotes,
      ]);
    }

    setTitle("");
    setContent("");
    setCategory("General");
  } catch (error) {
    console.log(
      "SAVE NOTE ERROR:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.error ||
        "Note save nathi thai."
    );
  }
};

const deleteNote = async (id) => {
try {
await api.delete("/notes/" + id);


  setNotes((oldNotes) =>
    oldNotes.filter((note) => note.id !== id)
  );
} catch (error) {
  console.log(
    "DELETE NOTE ERROR:",
    error.response?.data || error.message
  );
  alert("Note delete nathi thai.");
}


};

const startEditNote = (note) => {
  setEditingNote(note);
  setTitle(note.title);
  setContent(note.content);
  setCategory(note.category || "General");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const filteredNotes = notes.filter((note) => {
const text =
note.title + " " + note.content + " " + note.category;


return text
  .toLowerCase()
  .includes(search.toLowerCase());


});

return ( <div className="p-6 text-slate-900 dark:text-white"> <h1 className="mb-6 text-3xl font-bold">
Notes Manager </h1>

  <NoteForm
    title={title}
    setTitle={setTitle}
    content={content}
    setContent={setContent}
    category={category}
    setCategory={setCategory}
    addNote={addNote}
    editingNote={editingNote}
    setEditingNote={setEditingNote}
  />

  <div className="mb-6 grid gap-4 md:grid-cols-2">
    <div className="rounded-xl bg-blue-600 p-5 text-white">
      <h3>Total Notes</h3>
      <p className="text-3xl font-bold">
        {notes.length}
      </p>
    </div>

    <div className="rounded-xl bg-violet-600 p-5 text-white">
      <h3>Categories</h3>
      <p className="text-3xl font-bold">
        {new Set(notes.map((note) => note.category)).size}
      </p>
    </div>
  </div>

  <input
    type="text"
    placeholder="Search notes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="app-input mb-6"
  />

  {loading ? (
    <p className="text-slate-400">
      Loading notes...
    </p>
  ) : (
    <NoteList
  notes={filteredNotes}
  deleteNote={deleteNote}
  startEditNote={startEditNote}
/>
  )}
</div>


);
}

export default Notes;
