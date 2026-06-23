function MessageBubble({
  sender,
  message,
}) {
  return (
    <div
      className={`mb-3 max-w-[75%] p-3 rounded-lg
      ${
        sender === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 dark:bg-slate-700 dark:text-white"
      }`}
    >
      {message}
    </div>
  );
}

export default MessageBubble;