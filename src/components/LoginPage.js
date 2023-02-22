export default function LoginPage({ loginUser }) {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center text-center">
      <div>
        <h1 className="display-1 mb-0">Welcome to</h1>
        <h1 className="display-1 fw-semibold mb-4">Pluma</h1>
        <button className="btn btn-dark" onClick={loginUser}>Sign In With Google</button>
      </div>
    </div>
  );
}
