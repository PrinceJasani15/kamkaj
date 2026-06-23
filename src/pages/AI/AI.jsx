import { useEffect, useRef, useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const getInitialMessages = () => [
  {
    id: 1,
    role: "assistant",
    text:
      "Hello! I am KamKaj AI. Type 'my summary' to see your live productivity summary.",
  },
];

function AI() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  const chatStorageKey = user?.id
    ? `kamkaj_ai_chat_${user.id}`
    : null;

  const [messages, setMessages] = useState(getInitialMessages);

  useEffect(() => {
    if (!chatStorageKey) {
      setMessages(getInitialMessages());
      return;
    }

    const savedMessages = localStorage.getItem(chatStorageKey);

    setMessages(
      savedMessages
        ? JSON.parse(savedMessages)
        : getInitialMessages()
    );
  }, [chatStorageKey]);

  useEffect(() => {
    if (chatStorageKey) {
      localStorage.setItem(
        chatStorageKey,
        JSON.stringify(messages)
      );
    }
  }, [chatStorageKey, messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!actionMessage) return;

    const timer = setTimeout(() => {
      setActionMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [actionMessage]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage || isTyping) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: cleanMessage,
    };

    setMessages((oldMessages) => [
      ...oldMessages,
      userMessage,
    ]);

    setMessage("");
    setIsTyping(true);

    try {
      const response = await api.post("/ai/chat", {
        message: cleanMessage,
      });

      const data = response.data;

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          data.reply ||
          "Sorry, AI response mali nathi.",
      };

      setMessages((oldMessages) => [
        ...oldMessages,
        aiMessage,
      ]);

      if (data.action === "task_created") {
        setActionMessage(
          "Task created successfully. Dashboard ane Tasks page refresh karsho to live data dekhase."
        );
      }

      if (data.action === "note_created") {
        setActionMessage(
          "Note created successfully. Notes page refresh karsho to live data dekhase."
        );
      }
    } catch (error) {
      console.log(
        "AI FRONTEND ERROR:",
        error.message
      );

      setMessages((oldMessages) => [
        ...oldMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          text:
            "Server sathe connection nathi thatu. Backend run chhe ke nahi check karo.",
        },
      ]);
    } finally {
      setIsTyping(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const clearChat = () => {
    const firstMessage = {
      id: Date.now(),
      role: "assistant",
      text:
        "Chat cleared. Type 'my summary' to see your productivity summary.",
    };

    setMessages([firstMessage]);
    setActionMessage("");

    if (chatStorageKey) {
      localStorage.setItem(
        chatStorageKey,
        JSON.stringify([firstMessage])
      );
    }
  };

  const usePrompt = (prompt) => {
    setMessage(prompt);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <PageWrapper>
      <div className="p-6 dark:text-white">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              AI Assistant 🤖
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Your KamKaj productivity assistant
            </p>
          </div>

          <button
            onClick={clearChat}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Clear Chat
          </button>
        </div>

        {actionMessage ? (
          <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
            {actionMessage}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800">
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((chat) => (
                <div
                  key={chat.id}
                  className={
                    chat.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      chat.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-white"
                        : "max-w-[80%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-slate-800 dark:bg-slate-700 dark:text-white"
                    }
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {chat.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    <span className="animate-pulse">
                      KamKaj AI is typing...
                    </span>
                  </div>
                </div>
              ) : null}

              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={sendMessage}
              className="border-t border-slate-200 p-4 dark:border-slate-700"
            >
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Ask KamKaj AI anything..."
                  disabled={isTyping}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />

                <button
                  type="submit"
                  disabled={isTyping || !message.trim()}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-4 text-lg font-bold">
              Suggested Prompts
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => usePrompt("my summary")}
                className="w-full rounded-lg border border-slate-200 p-3 text-left text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
              >
                Show my productivity summary
              </button>

              <button
                onClick={() =>
                  usePrompt(
                    "Create task Finish KamKaj presentation"
                  )
                }
                className="w-full rounded-lg border border-slate-200 p-3 text-left text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
              >
                Create a new task
              </button>

              <button
                onClick={() =>
                  usePrompt(
                    "Create note KamKaj AI Ideas: Add voice input feature"
                  )
                }
                className="w-full rounded-lg border border-slate-200 p-3 text-left text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
              >
                Create a new note
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              Live mode active. KamKaj AI is connected to your PostgreSQL data.
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default AI;
