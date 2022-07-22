import { useCallback, useContext, useMemo } from "react";
import { Graph, TableColumn } from "../../components";
import { UserContext } from "../../store/details";
import getBgColor from "../../utils/getBgColor";

export default function TeamRank() {
  const { teams } = useContext(UserContext);
  return (
    <div className="flex flex-col gap-4">
      <Graph teams={teams} />
      <div className="flex border-2 rounded-xl border-gray-300 overflow-hidden shadow-md">
        {Object.entries(teams).map(([team, data]) => {
          return (
            <TableColumn
              key={team}
              tableHeaderLabel={team}
              bgColor={getBgColor(team)}
              data={data.users}
            />
          );
        })}
      </div>
    </div>
  );
}
