import "./App.css";
import Chat from "./components/chat/Chat";
import io from "socket.io-client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherPointed } from "@fortawesome/free-solid-svg-icons";

const socket = io.connect("https://chat-node-server-dulat.herokuapp.com/", {
  transports: ["websocket"],
});

function App() {
  const [allowed, setAllowed] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    if (username === "" && room === "") {
      alert("Please enter a username and room name");
    } else if (username === "") {
      alert("Please enter a username");
    } else if (room === "") {
      alert("Please enter a room name");
    } else {
      socket.emit("join_room", room);
      setAllowed(true);
    }
  };

  return (
    <div className="App">
      {!allowed ? (
        <div className="before-start">
          <div className="welcome-message">
            <h1>Join or Create chat Room</h1>
          </div>
          <div className="join-room">
            <div className="user-name">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="create-room">
              <input
                type="text"
                placeholder="Create Room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
            <div className="join-button">
              <button onClick={(e) => joinRoom(e)}>
                Join me
                <FontAwesomeIcon
                  style={{ color: "white" }}
                  icon={faFeatherPointed}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="left-container"></div>
          <div className="right-container">
            <div className="header-container">
              <p>{username}</p>
            </div>
            <div className="content-container">
              <Chat socket={socket} username={username} room={room} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
