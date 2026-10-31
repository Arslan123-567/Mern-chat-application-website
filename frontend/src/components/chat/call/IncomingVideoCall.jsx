import Button from "@mui/material/Button";
import logo from "../../../assets/logo.png";

const BACKEND_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BACKEND_BASE_URL
    : import.meta.env.VITE_PROD_BACKEND_BASE_URL;

import io from "socket.io-client";
const ENDPOINT = BACKEND_BASE_URL;
let socket;
import { ChatState } from "../../../context/ChatProvider";
import { useEffect } from "react";

const IncomingVideoCall = () => {
  const { user, incomingVideoCall, setVideoCall, setIncomingVideoCall } =
    ChatState();

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"], // Force WebSocket only
    });
    socket.emit("setup", user);
  }, []);

  useEffect(() => {
    socket.emit("join chat", incomingVideoCall.roomId);
  });

  const rejectVideoCall = () => {
    socket.emit("reject_video_call", {
      to: incomingVideoCall.id,
    });
    setVideoCall(undefined);
    setIncomingVideoCall(undefined);
  };

  const acceptCall = () => {
    setVideoCall({ ...incomingVideoCall, type: "in_coming" });
    socket.emit("accept_incoming_call", { to: incomingVideoCall.id });
    setIncomingVideoCall(undefined);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        position: "absolute",
        zIndex: "10",
        top: "5rem",
        right: "5rem",
        color: "white",
        padding: "10px 20px",
        borderRadius: "15px",
        backgroundColor: "#0b141a",
      }}
    >
      <img
        style={{ mixBlendMode: "multiply" }}
        src={logo}
        width={50}
        height={50}
        alt=""
      />

      <div>
        <h2 style={{ marginBottom: "15px" }}>Incoming video call</h2>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={acceptCall}
          style={{ marginRight: "10px" }}
        >
          Accept
        </Button>

        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={rejectVideoCall}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default IncomingVideoCall;
