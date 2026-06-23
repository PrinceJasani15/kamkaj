function NoteForm({
title,
setTitle,
content,
setContent,
category,
setCategory,
addNote,
}) {
const handleSubmit = (e) => {
e.preventDefault();
addNote(e);
};

return ( <form
   onSubmit={handleSubmit}
   className="app-card mb-6"
 > <div className="grid gap-4">
<input
type="text"
placeholder="Note title..."
value={title}
onChange={(e) => setTitle(e.target.value)}
className="app-input"
required
/>


    <textarea
      placeholder="Write your note content..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="app-input min-h-32 resize-y"
      required
    />

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="app-input"
    >
      <option value="General">General</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Study">Study</option>
      <option value="Ideas">Ideas</option>
    </select>

    <button
      type="submit"
      className="rounded bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      Add Note
    </button>
  </div>
</form>


);
}

export default NoteForm;
