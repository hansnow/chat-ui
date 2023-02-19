export const usernameName = "auth-name";
export const authTokenName = "auth-token";

const apiServer = "http://43.156.82.111:8081";

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
