export default function LoginPage({ loginUser }) {
  return (
    <>
      <h1>pluma notes</h1>
      <button onClick={loginUser}>Sign In With Google</button>
    </>
  );
}
