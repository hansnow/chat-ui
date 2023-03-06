import { fetchEventSource } from "@microsoft/fetch-event-source";

export const usernameName = "auth-name";
export const authTokenName = "auth-token";

// const apiServer = "http://43.156.82.111:8081";
const apiServer = "";

export const isTokenValid = async (username: string, password: string) => {
  const resp = await fetch(`${apiServer}/waj`, {
    method: "POST",
    body: JSON.stringify({
      name: username,
      cert: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let errorMsg = "";
  try {
    errorMsg = (await resp.json()).error || "";
  } catch (e) {}
  return {
    success: resp.status === 200,
    errorMsg,
  };
};

export const getReply = async (question: string) => {
  const username = localStorage.getItem(usernameName);
  const password = localStorage.getItem(authTokenName);
  const resp = await fetch(`${apiServer}/wak`, {
    method: "POST",
    body: JSON.stringify({
      user: { name: username, cert: password },
      content: question,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (resp.status !== 200) {
    return "发生错误，请重试";
    // return location.reload();
  }
  const data = await resp.json();
  console.log("data", data);
  return data.message;
};

export const getReplyStream = async (
  question: string,
  onMessage: (...args: any[]) => void
) => {
  const username = localStorage.getItem(usernameName);
  const password = localStorage.getItem(authTokenName);
  console.log("我要发请求了");
  await fetchEventSource(`${apiServer}/wak_sse`, {
    openWhenHidden: true,
    method: "POST",
    body: JSON.stringify({
      user: { name: username, cert: password },
      content: question,
    }),
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    async onopen(response) {
      console.log("tttt open", response);
    },
    onmessage(ev) {
      let message = "";
      try {
        message = JSON.parse(ev.data).message;
      } catch (e) {}
      console.log("tttt msg", message);
      onMessage(message);
    },
    onerror(e) {
      console.log("tttt error", e);
    },
    onclose() {
      console.log("tttt close");
    },
  });
};
