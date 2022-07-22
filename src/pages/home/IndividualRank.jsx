import { useContext, useMemo } from "react";
import { UserContext } from "../../store/details";
import getBgColor from "../../utils/getBgColor";

export default function IndividualRank() {
  const { teams } = useContext(UserContext);
  const users = Object.values(teams).reduce(
    (user, team) => [...user, ...team.users],
    []
  );
  const sortedUsers = useMemo(() => {
    return users.sort(
      (currentUser, previousUser) => previousUser.points - currentUser.points
    );
  }, [users]);

  return (
    <div
      style={{
        height: "80vh",
        width: "90vw",
      }}
      className="flex flex-col bg-white p-4 overflow-x-hidden m-4 border-gray-300 border rounded-md shadow-md gap-2 text-center"
    >
      <div className="flex justify-between gap-4 mb-4 text-center">
        <span className="flex-1 text-2xl font-bold">Name</span>
        <span className="flex-1 text-2xl font-bold">Team</span>
        <span className="flex-1 text-2xl font-bold">Points</span>
      </div>
      <hr className="border-black" />
      {sortedUsers.map((user) => (
        <>
          <div className="flex items-center">
            <span className="flex-1 font-bold text-lg">{user.name}</span>
            <span
              className={`flex-1 font-bold text-lg capitalize p-2 ${getBgColor(
                user.team
              )}`}
            >
              {user.team}
            </span>
            <span className="flex-1 font-bold text-lg">{user.points}</span>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}
