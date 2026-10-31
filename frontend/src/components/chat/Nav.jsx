import { useState } from "react";
import "./stylesheets/nav.css";
import logo from "../../assets/logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./modals/ProfileModal";
import NotificationBadge, { Effect } from "react-notification-badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Nav = () => {
  const { user, notification } = ChatState();
  const [profileModalShow, setProfileModalShow] = useState(false);

  return (
    <>
      <div id="nav">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={logo} height={45} width={45} alt="Talk-A-Tive logo" />
          <h2 style={{ color: "#347136" }}>Talk-A-Tive</h2>
        </div>
        <div id="nav-right">
          <div id="notif-btn" aria-label={`${notification.length} notifications`}>
            <NotificationBadge count={notification.length} effect={Effect.SCALE} />
            <NotificationsIcon aria-hidden="true" />
          </div>
          <button
            id="profile-btn"
            type="button"
            onClick={() => setProfileModalShow(true)}
            aria-label="Open profile"
          >
            <img src={user?.pic} height={35} width={50} alt="" />
            <ArrowDropDownIcon />
          </button>
        </div>
      </div>
      {profileModalShow && (
        <div className="profile-modal">
          <ProfileModal setProfileModalShow={setProfileModalShow} />
        </div>
      )}
    </>
  );
};

export default Nav;
