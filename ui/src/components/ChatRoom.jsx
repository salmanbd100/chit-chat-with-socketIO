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
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground font-sans">
              {room}
            </h2>
            <p className="text-sm text-muted-foreground">
              Connected as {username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full">
          <div className="w-2 h-2 bg-secondary rounded-full"></div>
          <span className="text-sm text-secondary-foreground font-medium">
            Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground text-lg font-medium">
                No messages yet
              </p>
              <p className="text-muted-foreground text-sm">
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
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card text-card-foreground rounded-bl-md"
                }`}
              >
                {msg.author !== username && (
                  <div className="text-xs font-medium text-secondary mb-1">
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

      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground transition-all duration-200"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
          <button
            onClick={sendMessage}
            className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
