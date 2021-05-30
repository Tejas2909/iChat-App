import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import "./DialogBox.css";
export default function FormDialog({
  username,
  open,
  handleClose,
  handleClickOpen,
  title,
}) {
  const [room, setRoom] = useState("");
  const [filledRoomName, setFilledRoomName] = useState(1);
  useEffect(() => {
    setFilledRoomName(1);
  }, [room]);
  const onChangeText = (event) => {
    setRoom(event.target.value);
  };
  const roomFunction = async () => {
    if (room === "") {
      setFilledRoomName(0);
    } else {
      setFilledRoomName(1);
      if (title === "Create Room") {
        const res = await axios.post("/api/create_room", {
          username: username,
          room: room,
        });
        if (res.data.status === 200) {
          handleClose();
        }
      } else {
        const res = await axios.post("/api/join_room", {
          username: username,
          room: room,
        });
        if (res.data.status === 200) {
          handleClose();
        }
      }
    }
  };
  return (
    <div>
      <Button
        style={{
          fontSize: "20px",
          color: "white",
          textDecoration: "none",
          textTransform: "capitalize",
        }}
        onClick={handleClickOpen}
      >
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <div className="textField">
            <TextField
              value={room}
              onChange={onChangeText}
              autoFocus
              margin="dense"
              id="name"
              label="Enter Room Name"
              type="text"
              fullWidth
            />
            {!filledRoomName ? (
              <>
                <small
                  style={{
                    position: "absolute",
                    bottom: "-1rem",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Room name is required
                </small>
              </>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              fontSize: "19px",
              color: "rgba(0,0,0,0.7)",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{
              fontSize: "19px",
              color: "rgba(0,0,0,0.7)",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
            onClick={roomFunction}
            color="primary"
          >
            {title}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
