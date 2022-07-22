import { useEffect, useRef, useState } from "react";
import getBgColor from "../../utils/getBgColor";

export default function Graph({ teams }) {
  const graphRef = useRef(null);
  return (
    <div className="flex-1 w-full flex flex-col" ref={graphRef}>
      {Object.entries(teams).map(([team, data], index) => {
        const bgColor = getBgColor(team);
        const teamTotal = data.total;
        return (
          <Bar
            total={teamTotal}
            key={index}
            bgColor={bgColor}
            graphWidth={graphRef.current?.width || 100}
          />
        );
      })}
    </div>
  );
}

function Bar({ total, bgColor, graphWidth }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth((total / graphWidth) * 35);
  }, [total]);
  return (
    <div
      style={{
        width: width + "vw",
        height: "25px",
      }}
      title={`Total points: ${total}`}
      className={`${bgColor} transition-all duration-1000 bg-opacity-80 ease-out hover:bg-opacity-100`}
    ></div>
  );
}
