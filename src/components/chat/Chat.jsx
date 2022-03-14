import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="content-container-inner">
      <div className="content-container-header">
        <div
          className="header-top-group"
          style={{ display: "flex", visibility: "visible" }}
        >
          <p>Live Chat Room</p>
        </div>
        <div
          className="header-top-private"
          style={{ display: "none", visibility: "hidden" }}
        >
          <div className="private-back">
            <FontAwesomeIcon
              style={{ color: "white", cursor: "pointer" }}
              icon={faArrowLeft}
            />
          </div>
          <div className="header-top-private-left">
            <p>Private Chat Room</p>
          </div>
          <div className="header-top-private-right">
            <div className="header-top-private-right-p">
              <p>Abhishek</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container-body">
        <ScrollToBottom className="content-container-body-scroll">
          {messageList.map((messagecontent, index) => {
            return messagecontent.author === username ? (
              <div
                className="p1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
                key={index}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <FontAwesomeIcon
                    style={{
                      color: "#24CB31",
                      fontSize: "0.3rem",
                    }}
                    icon={faCircle}
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      padding: "0.1rem 1rem",
                      borderRadius: "0.3rem",
                      backgroundColor: "#32353F",
                    }}
                  >
                    {messagecontent.message}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "lowercase",
                  }}
                >
                  <b>{messagecontent.author}</b>{" "}
                  <small>
                    <small>{messagecontent.time}</small>
                  </small>
                </p>
              </div>
            ) : (
              <div
                className="p1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
                key={index}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <FontAwesomeIcon
                    style={{
                      color: "#18A0FB",
                      fontSize: "0.3rem",
                    }}
                    icon={faCircle}
                  />
                  <p
                    style={{
                      fontSize: "1rem",
                      padding: "0.1rem 1rem",
                      borderRadius: "0.3rem",
                      backgroundColor: "#32353F",
                    }}
                  >
                    {messagecontent.message}
                  </p>
                </div>
                <p style={{ fontSize: "0.8rem", textTransform: "lowercase" }}>
                  <b>{messagecontent.author}</b>{" "}
                  <small>
                    <small>{messagecontent.time}</small>
                  </small>
                </p>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="content-container-footer">
        <div className="content-container-footer-box">
          <div className="content-container-footer-input">
            <input
              type="text"
              placeholder="Send messages ..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
          </div>
          <div className="content-container-footer-button">
            <button onClick={(e) => sendMessage(e)}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
