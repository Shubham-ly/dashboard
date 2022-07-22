import { useContext } from "react";
import { UserContext } from "../../store/details";
import UserRow from "./userRow";

export default function AdminPanel() {
  const { teams } = useContext(UserContext);

  return (
    <div
      style={{
        height: "90vh",
        width: "76vw",
      }}
      className="flex flex-col bg-white p-4 overflow-x-hidden m-4 border-gray-300 border rounded-md shadow-md"
    >
      <div className="flex justify-between gap-4 mb-4 text-center">
        <span className="flex-1 text-2xl font-bold">Name</span>
        <span className="flex-1 text-2xl font-bold">Team</span>
        <span className="flex-1 text-2xl font-bold">Points</span>
      </div>
      <hr className="border-black" />
      {Object.values(teams).map((team) => {
        return Object.values(team.users).map((user) => (
          <UserRow user={user} key={user.name} />
        ));
      })}
    </div>
  );
}
