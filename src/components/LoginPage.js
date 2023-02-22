export default function LoginPage({ loginUser }) {
  return (
    <>
      <h1>Welcome to Pluma</h1>
      <button onClick={loginUser}>Sign In With Google</button>
    </>
  );
}
