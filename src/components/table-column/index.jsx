import { useContext, useMemo } from "react";
import { UserContext } from "../../store/details";

export default function TableColumn({ tableHeaderLabel, bgColor, data }) {
  const { teams } = useContext(UserContext);
  const teamTotal = teams[tableHeaderLabel].total;

  return (
    <div
      style={{ minWidth: "240px" }}
      className="flex flex-col border-r-gray-300 border-r"
    >
      <h3
        className={`py-4 ${bgColor} border-b border-gray-300 capitalize text-center font-semibold text-xl`}
      >
        {tableHeaderLabel}
      </h3>
      <div className="flex-1 p-2 flex flex-col gap-4">
        {data.map((user, index) => (
          <div
            key={index}
            className="flex justify-between gap-2 border-b border-gray-300 p-2"
          >
            <span>{user.name}</span>
            <span className="font-medium">{user.points}</span>
          </div>
        ))}
      </div>
      <span className="flex justify-between px-4 py-2 bg-black text-white">
        Total: <span>{teamTotal}</span>
      </span>
    </div>
  );
}
