const getBgColor = (team) => {
  switch (team) {
    case "green":
      return "bg-green-400";
    case "red":
      return "bg-red-400";
    case "blue":
      return "bg-blue-400";
  }
};

export default getBgColor;
