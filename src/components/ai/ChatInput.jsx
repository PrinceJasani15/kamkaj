function ChatInput({
  input,
  setInput,
  sendMessage,
}) {
  return (
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        placeholder="Ask KamKaj AI..."
        className="
        flex-1
        border
        dark:border-slate-600
        dark:bg-slate-700
        dark:text-white
        p-3
        rounded-lg
        "
      />

      <button
        onClick={sendMessage}
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        rounded-lg
        "
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;