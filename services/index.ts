export const usernameName = "auth-name";
export const authTokenName = "auth-token";

const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const isTokenValid = async (username: string, password: string) => {
  const { status } = await fetch("http://43.156.126.210:8081/waj", {
    method: "POST",
    body: JSON.stringify({
      name: username,
      cert: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return status === 200;
};

export const getReply = async (question: string) => {
  const username = localStorage.getItem(usernameName);
  const password = localStorage.getItem(authTokenName);
  const data = await fetch("http://43.156.126.210:8081/wak", {
    method: "POST",
    body: JSON.stringify({
      name: username,
      cert: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
  console.log("data", data);
  return data.message;
};
