import { useContext } from "./context";
import { Chatbot } from ".";
import { Login } from "./login";
import { Loading } from "./loading";

export function Main() {
  const { pageStatus, auth } = useContext();
  if (pageStatus === "login") {
    return <Login onLogin={auth} />;
  } else if (pageStatus === "loading") {
    return <Loading />;
  } else {
    return <Chatbot />;
  }
}
