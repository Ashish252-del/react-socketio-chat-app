import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  useEffect(()=>{
    socket.on('hello',(arg)=>{
      console.log(arg,"with socket id ",socket.id);
    })
    // socket.on('admin',(arg)=>{
    //   console.log("welcome all")
    // })
  },[])
  socket.on("connect", () => {
    console.log("I am connected"); // ojIckSD2jqNzOqIrAGzL
  });
  const joinRoom = () => {
    if (username !== "" && room !== "") {
     
      socket.emit("join_room", room);
     
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
          <div>
          <Chat socket={socket} username={username} room={room} />
         
           </div>
      
      )}
    </div>
  );
}

export default App;
