import { remark } from "remark";
import html from "remark-html";
import remarkExternalLinks from 'remark-external-links'

export const usernameName = "auth-name";
export const authTokenName = "auth-token";

const apiServer = "http://30.30.224.68:5000";

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
  const resp = await fetch(`${apiServer}/chat`, {
    method: "POST",
    body: JSON.stringify({
      // user: { name: username, cert: password },
      question: question,
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
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(remarkExternalLinks, { target: "_blank" }).use(html).process(data.result);
  const contentHtml = processedContent.toString();
  return contentHtml;
};
