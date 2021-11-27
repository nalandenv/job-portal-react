import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  const _handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Please Sign in to continue</h1>
      <button onClick={_handleSignInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
