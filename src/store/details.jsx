import { createContext, useCallback, useMemo } from "react";

export const UserContext = createContext(null);
import data from "../data/details.json";
import useLocalStorage from "../hooks/useLocalStorage";

export default function UserProvider({ children }) {
  const [users, setUsers] = useLocalStorage("user-data", data.users);

  const [teams, setTeams] = useLocalStorage(
    "teams",
    useMemo(() => {
      const teamData = {
        green: { users: [], total: 0 },
        blue: { users: [], total: 0 },
        red: { users: [], total: 0 },
      };
      users.forEach((user) => {
        teamData[user.team].users?.push(user);
        teamData[user.team].total += user.points;
      });
      return teamData;
    }, [users.length])
  );

  const updateUserPoints = useCallback(
    (team, user, points) => {
      const currentTeam = teams[team];
      const currentUser = currentTeam.users.find(
        (currentUser) => currentUser.name === user
      );
      currentUser.points = parseInt(points);
      setUsers((prev) =>
        prev.map((user) =>
          user.name === currentUser.name
            ? { ...currentUser, points: parseInt(points) }
            : user
        )
      );
      currentTeam.total += currentUser.points;
      setTeams({ ...teams });
    },
    [users, teams]
  );

  const updateUserData = useCallback(
    (team, user, toChange, data) => {
      const currentTeam = teams[team];
      const currentUser = currentTeam.users.find(
        (currentUser) => currentUser.name === user
      );
      currentUser[toChange] = data;
      setUsers((prev) =>
        prev.map((user) =>
          user.name === currentUser.name
            ? { ...currentUser, [toChange]: data }
            : user
        )
      );
      setTeams({ ...teams });
    },
    [users, teams]
  );

  const value = {
    users: data.users,
    teams,
    updateUserPoints,
    updateUserData,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
