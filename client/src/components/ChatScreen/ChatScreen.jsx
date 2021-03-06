import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "../UI_Components/Loading/Loading";
import io from "socket.io-client";
import ding from "../../assets/Audio/ding.mp3";
import "./style.css";
import Alert from "../UI_Components/Alert/Alert";
let socket = io();
const ChatScreen = (props) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [buttonVisibility, setButtonVisibility] = useState(0);
  useEffect(() => {
    const messageBox = document.getElementById("messageBoxId");
    const audio = new Audio(ding);
    audio.pause();
  }, [messages]);
  useEffect(() => {
    if (message.length > 0) {
      setButtonVisibility(1);
    } else {
      setButtonVisibility(0);
    }
  }, [message]);
  useEffect(() => {
    const messageBox = document.getElementById("messageBoxId");
    if (messageBox !== null) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  }, [messages]);
  socket.on("user-left", (name) => {
    if (name !== null) {
      const msg = {
        username: "notification",
        message: `${name} left the chat`,
      };
      setMessages([...messages, msg]);
    }
  });
  socket.on("new-user-joined", (name) => {
    if (name !== null) {
      const msg = {
        username: "notification",
        message: `${name} joined the chat`,
      };
      setMessages([...messages, msg]);
    }
  });
  socket.on("recieve-error", (msg) => {
    if (msg.username === "error") {
      props.setAlert("something went wrong");
    }
  });
  socket.on("recieve-message", (msg) => {
    if (msg.username !== null) {
      const audio = new Audio(ding);
      audio.play();
      setMessages([...messages, msg]);
    }
  });
  useEffect(() => {
    socket.emit("user-joined", props.username);
  }, []);
  useEffect(() => {});
  const scrollDown = () => {
    const messageBox = document.getElementById("messageBoxId");
    if (messageBox !== null) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  };
  const sendMsg = (event) => {
    event.preventDefault();
    const msg = {
      username: props.username,
      message: message,
    };
    if (msg.username !== null) {
      setMessages([...messages, msg]);
      socket.emit("send-message", msg);
    }
    setMessage("");
  };
  const getChatData = async () => {
    if (props.username === undefined || props.username === null) {
      props.setAlert("not logged in");
      history.push("/");
    } else {
      try {
        const token = props.token;
        const res = await axios.post("/api/chat", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data.messages);
        if (res.data.status === 200) {
          setIsLoading(0);
        }
        history.push("/chat_screen");
      } catch (err) {
        props.setAlert("something went wrong");
      }
    }
  };
  const onMessageScroll = () => {
    const messageBox = document.getElementById("messageBox");
    console.log(messageBox);
  };
  useEffect(() => {
    getChatData();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Alert alert={props.alert} setAlert={props.setAlert} />
      <div className="mainChatSection">
        <div className="innerChatSection">
          <ArrowDropDownIcon onClick={scrollDown} className="scrollDown" />
          <div
            onScroll={onMessageScroll}
            id="messageBoxId"
            className="messageBox"
          >
            {messages.map((message) => {
              if (message === undefined || message === null) {
                return null;
              } else if (message.username === props.username) {
                return <div className="user">{message.message}</div>;
              } else if (message.username === "notification") {
                return <div className="notification">{message.message}</div>;
              } else {
                return (
                  <div className="other-user">
                    <h3
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.5)",
                        padding: "0.2rem 1rem 0.2rem 0.5rem",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {message.username}
                    </h3>
                    <div
                      style={{
                        margin: "0.2rem 0",
                        padding: "0.2rem 1rem 0.2rem 0.5rem",
                      }}
                    >
                      {message.message}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <form
            onSubmit={sendMsg}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="bottomBox">
              <div className="textField">
                <div className="form-input">
                  <input
                    required
                    onChange={(event) => {
                      setMessage(event.target.value);
                    }}
                    value={message}
                    style={{
                      borderRadius: "1rem",
                      width: "95.7%",
                      margin: "auto",
                      padding: "0.4rem 0.3rem",
                      outline: "none",
                      border: "none",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                    type="text"
                    className="messageInputField form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your message..."
                  />
                </div>
              </div>
              {buttonVisibility ? (
                <>
                  <button
                    className="sendButton"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    <SendIcon />
                  </button>
                </>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ChatScreen;
