import {
  useState,
  useEffect,
} from "react";

import {
  supabase
} from "../api/api";

import "../styles/chatmodal.css";

function ChatModal({

  conversation,

  onClose,

}) {

  if (!conversation)
    return null;

  /* USER */
  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* STATES */
  const [
    messages,
    setMessages
  ] = useState([]);

  const [
    text,
    setText
  ] = useState("");

  /* FETCH MESSAGES */
  const fetchMessages =
    async () => {

    const {
      data,
      error
    } = await supabase

      .from("messages")

      .select("*")

      .eq(
        "conversation_id",
        conversation.id
      )

      .order(
        "created_at",
        {
          ascending: true,
        }
      );

    console.log(error);

    setMessages(
      data || []
    );
  };

  /* SEND MESSAGE */
  const sendMessage =
    async () => {

    if (!text.trim())
      return;

    const {
      error
    } = await supabase

      .from("messages")

      .insert([{

        conversation_id:
          conversation.id,

        sender_id:
          currentUser.id,

        message:
          text,
      }]);

    console.log(error);

    setText("");
  };

  /* REALTIME */
  useEffect(() => {

    fetchMessages();

    const channel =
      supabase

        .channel(
          "messages-channel"
        )

        .on(

          "postgres_changes",

          {

            event: "INSERT",

            schema: "public",

            table: "messages",
          },

          (payload) => {

            const newMessage =
              payload.new;

            /* ONLY THIS CHAT */
            if (

              newMessage.conversation_id ===
              conversation.id

            ) {

              setMessages(
                (prev) => [

                  ...prev,

                  newMessage,
                ]
              );
            }
          }
        )

        .subscribe();

    return () => {

      supabase
        .removeChannel(channel);
    };

  }, []);

  return (

    <div className="chat-modal">

      {/* TOP */}
      <div className="chat-top">

        <div className="chat-user">

          <img
            src={
              conversation.other_user_pic
            }
            alt="user"
          />

          <h2>
            {
              conversation.other_user_name
            }
          </h2>

        </div>

        <button
          className="close-chat"
          onClick={onClose}
        >
          ✕
        </button>

      </div>

      {/* BODY */}
      <div className="chat-body">

        {messages.map(
          (msg) => (

          <div

            key={msg.id}

            className={

              msg.sender_id ===
              currentUser.id

              ? "my-message"

              : "other-message"
            }
          >

            {msg.message}

          </div>
        ))}

      </div>

      {/* BOTTOM */}
      <div className="chat-bottom">

        <input

          type="text"

          placeholder=
            "Type message..."

          value={text}

          onChange={(e) =>

            setText(
              e.target.value
            )
          }

          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatModal;