import { createContext, useEffect, useState } from "react";
import { Listing } from "./components/Listing";
import app from "./utils/firebase/index";
import SignIn from "./components/SignIn";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const Signed = createContext();
function App() {
  const [uId, setUId] = useState<any>();
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUId(user.uid);
      }
    });
  }, []);

  if (!uId) {
    return <SignIn />;
  }
  const _handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((e) => {
        console.log(e);
      });
    window.location.reload();
  };
  return (
    <>
      <button onClick={_handleSignOut}>Sign Out</button>
      <Listing />
    </>
  );
}

export default App;
