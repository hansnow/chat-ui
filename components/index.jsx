import { useState, useEffect, useRef } from "react";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";
import Header from "./Header";

import Swal from "sweetalert2";
import { getReply, getReplyStream } from "@/services";

const API = {
  GetChatbotResponse: async (message) => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (message === "hi") resolve("Welcome to chatbot!");
        else resolve("echo : " + message);
      }, 2000);
    });
  },
};

export function Chatbot() {
  const [messages, setMessages] = useState([]);
  const isPending = useRef(false);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage key="0" fetchMessage={async (set) => set("欢迎使用！")} />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async (text) => {
    if (isPending.current) {
      Swal.fire("请等上条消息完成后再发送下一条");
      return false;
    }
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async (setMessage) => {
          isPending.current = true;
          // const msg = await getReply(text);
          const msg = await getReplyStream(text, (m) => {
            setMessage(m);
          });
          isPending.current = false;
          return msg;
        }}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}
