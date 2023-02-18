const authToken = window.localStorage.getItem("auth-token");

const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const isTokenValid = async () => {
  await sleep();
  return true;
};

export const getReply = async (question: string) => {
  await sleep();
  return "echo: " + question;
};
