import { Paper } from "@mantine/core";

export const NumberCell = (number: number)=> {
  const getCellColor = (value: number): string => {
    const colors: Record<number, string> = {
      0: "bg-gray-200",
      2: "bg-blue-200",
      4: "bg-blue-300",
      8: "bg-green-300",
      16: "bg-green-400",
      32: "bg-yellow-300",
      64: "bg-yellow-400",
      128: "bg-orange-300",
      256: "bg-orange-400",
      512: "bg-red-300",
      1024: "bg-red-400",
      2048: "bg-purple-400",
    };
    return colors[value] || "bg-gray-500";
  };


    return (  <Paper
        shadow="xs"
        p="md"
        withBorder
        h={80}
        className={`flex items-center justify-center text-xl font-bold ${getCellColor(number)}`}
      >
        {number || ""}
      </Paper>);
}