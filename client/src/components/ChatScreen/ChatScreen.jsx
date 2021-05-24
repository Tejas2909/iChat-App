import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "../UI_Components/Loading/Loading";
import io from "socket.io-client";
import "./style.css";
let socket = io();
const ChatScreen = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  useEffect(() => {
    if (props.username !== null) {
      socket.emit("user-joined", props.username);
    }
    socket.on("new-user-joined", (name) => {
      if (name !== null) {
        const msg = {
          username: "notification",
          message: `${name} joined the chat`,
        };
        setMessages([...messages, msg]);
      }
    });
    socket.on("user-left", (name) => {
      if (name !== null) {
        const msg = {
          username: "notification",
          message: `${name} left the chat`,
        };
        setMessages([...messages, msg]);
      }
    });
    socket.on("recieve-message", (msg) => {
      if (msg.username !== null) {
        setMessages([...messages, msg]);
      }
    });
  }, []);
  const sendMsg = async (event) => {
    event.preventDefault();
    const msg = {
      username: props.username,
      message: message,
    };
    if (msg.username !== null) {
      setMessages([...messages, msg]);
    }
    socket.emit("send-message", msg);
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
        setMessages([...messages, res.data.messages]);
        setIsLoading(0);
        history.push("/chat_screen");
      } catch (err) {
        props.setAlert("something went wrong");
      }
    }
  };
  useEffect(() => {
    getChatData();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="mainChatSection">
        <div className="innerChatSection">
          <div id="messageBox" className="messageBox"></div>
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
                    onChange={(event) => {
                      setMessage(event.target.value);
                    }}
                    value={message}
                    style={{
                      borderRadius: "1rem",
                      width: "80%",
                      margin: "auto",
                      padding: "0.4rem 0.3rem",
                      outline: "none",
                      border: "none",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your message..."
                  />
                </div>
              </div>
              <div className="sendButton">
                <Button
                  disabled={!message}
                  type="submit"
                  style={{ borderRadius: "50%", padding: "1rem 0rem" }}
                  variant="contained"
                  color="secondary"
                >
                  <SendIcon />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ChatScreen;
