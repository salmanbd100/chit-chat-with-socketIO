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
    <div>
      <h2>
        Room: {room}({username})
      </h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <div>({msg.author})</div>
            {msg.message}
            <div>{msg.time}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          placeholder="Type a message ..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}></button>
      </div>
    </div>
  );
};

export default ChatRoom;
