import { useCallback, useState } from "react";
import AdminPanel from "./adminPanel";
import LoginForm from "./loginForm";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLoginClicked = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <div className="grid place-items-center bg-white h-screen">
      {isAuthenticated ? (
        <AdminPanel />
      ) : (
        <LoginForm onLoginClicked={onLoginClicked} />
      )}
    </div>
  );
}
