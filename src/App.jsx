import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import UserProvider from "./store/details";
const HomePage = lazy(() => import("./pages/home"));
const AdminPage = lazy(() => import("./pages/admin"));

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </Suspense>
    </UserProvider>
  );
}

export default App;
