import { useState } from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const joinedRoom = () => {
    if (username && room) {
      setJoined(true);
    }
  };
  return (
    <div>
      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinedRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <ChatRoom username={username} room={room} />
        </div>
      )}
    </div>
  );
}

export default App;
