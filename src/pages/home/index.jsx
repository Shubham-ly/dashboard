import { lazy, Suspense, useState } from "react";
const IndividualRank = lazy(() => import("./IndividualRank"));
const TeamRank = lazy(() => import("./TeamRank"));

const tabs = [
  {
    label: "Team Rank",
    component: (key) => <TeamRank key={key} />,
  },
  {
    label: "Individual Rank",
    component: (key) => <IndividualRank key={key} />,
  },
];

export default function HomePage() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="overflow-hidden rounded-lg relative my-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setCurrentTabIndex(index)}
            className={`p-4 bg-gray-300 font-medium
             transition-colors ease-out duration-300 ${
               currentTabIndex === index ? "bg-yellow-300" : "bg-gray-300"
             } `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {tabs.map(
          (tab, index) => currentTabIndex === index && tab.component(index)
        )}
      </Suspense>
    </div>
  );
}
