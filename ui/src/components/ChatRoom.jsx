import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const ChatRoom = ({ username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(username, room);

  useEffect(() => {
    socket.emit("join_room", room);
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [room]);

  const sendMessage = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{room}</h2>
              <p className="text-sm text-gray-600">Connected as {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-blue-700 font-medium">Online</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
              Close
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-600 text-lg font-medium">
                  No messages yet
                </p>
                <p className="text-gray-500 text-sm">
                  Start the conversation by sending a message
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`flex ${
                  msg.author === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.author === username
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-200"
                  }`}
                >
                  {msg.author !== username && (
                    <div className="text-xs font-medium text-blue-600 mb-1">
                      {msg.author}
                    </div>
                  )}
                  <div className="text-sm leading-relaxed break-words">
                    {msg.message}
                  </div>
                  {msg.time && (
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {msg.time}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
