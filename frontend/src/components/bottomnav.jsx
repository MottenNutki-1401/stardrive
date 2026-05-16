import "../styles/bottomnav.css";

import {

  useState

} from "react";

import homeIcon
from "../assets/home.svg";

import messageIcon
from "../assets/message.svg";

import profileIcon
from "../assets/profile.svg";

import {

  useNavigate

} from "react-router-dom";

/* CHAT */
import ChatModal
from "../components/ChatModal";

import {
  supabase
} from "../api/api";

function BottomNav() {

  const navigate =
    useNavigate();

  /* CHAT MODAL */
  const [

    showChat,

    setShowChat

  ] = useState(false);

  /* ACTIVE CONVERSATION */
  const [

    activeConversation,

    setActiveConversation

  ] = useState(null);

  /* OPEN CHAT */
  const openChat =
    async () => {

    const currentUser =
      JSON.parse(

        localStorage
          .getItem("user")
      );

    const {

      data,

      error

    } = await supabase

      .from("conversations")

      .select("*")

      .or(

        `passenger_id.eq.${currentUser.id},driver_id.eq.${currentUser.id}`

      )

      .eq(
        "active",
        true
      )

      .limit(1);

    console.log(error);

    console.log(data);

    /* HAS ACTIVE CHAT */
    if (

      data &&
      data.length > 0

    ) {

      setActiveConversation(
        data[0]
      );

      setShowChat(true);

    }

    /* NO CHAT YET */
    else {

      setActiveConversation({

        id: "temporary-chat"
      });

      setShowChat(true);
    }
  };

  return (

    <>

      <div className="bottom-nav1">

        {/* HOME */}
        <button
          onClick={() =>
            navigate(
              "/passengerhome"
            )
          }
        >

          <img
            src={homeIcon}
            alt="home"
          />

        </button>

        {/* MESSAGE */}
        <button
          onClick={openChat}
        >

          <img
            src={messageIcon}
            alt="messages"
          />

        </button>

        {/* PROFILE */}
        <button
          onClick={() =>
            navigate(
              "/profile"
            )
          }
        >

          <img
            src={profileIcon}
            alt="profile"
          />

        </button>

      </div>

      {/* CHAT MODAL */}
      {

        showChat && (

          <ChatModal

            conversation={
              activeConversation
            }

            onClose={() =>
              setShowChat(false)
            }

          />
        )
      }

    </>
  );
}

export default BottomNav;