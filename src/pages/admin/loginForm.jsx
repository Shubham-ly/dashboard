import { useEffect, useState } from "react";

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

export default function LoginForm({ onLoginClicked }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError("");
      }, 3000);
  }, [error]);

  return (
    <div
      style={{ minWidth: "340px" }}
      className="flex flex-col rounded-lg overflow-hidden bg-white"
    >
      <h3 className="bg-[#121212] text-white p-4 text-lg">Admin Login</h3>
      <div className="flex flex-col gap-2 p-4">
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter username"
          className={`rounded-lg border p-2 ${
            error ? "border-red-600" : "border-black"
          }`}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
          className={`rounded-lg border p-2 ${
            error ? "border-red-600" : "border-black"
          }`}
          value={password}
        />

        <button
          onClick={() => {
            if (username === USERNAME && password === PASSWORD) {
              onLoginClicked(username, password);
              return;
            }
            setError("Username or Password is incorrect");
          }}
          className="bg-accent p-4 mt-4 rounded-lg text-lg font-medium"
        >
          Login
        </button>
      </div>
      {error && (
        <div
          className={`bg-red-300 border-red-600 border p-4 rounded-md fixed right-4 bottom-4 text-red-900 font-bold`}
        >
          {error}
        </div>
      )}
    </div>
  );
}
