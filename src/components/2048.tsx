import { useEffect, useState } from "react";
import { Container, Title, Text, Grid, Paper } from "@mantine/core";

const GRID_SIZE = 4;

type Grid = number[][];
type Direction = "up" | "down" | "left" | "right";

const generateEmptyGrid = (): Grid => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));

const getRandomEmptyCell = (grid: Grid): [number, number] | null => {
  const emptyCells: [number, number][] = [];
  grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell === 0) emptyCells.push([r, c]);
  }));
  return emptyCells.length ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
};

const addRandomTile = (grid: Grid): void => {
  const cell = getRandomEmptyCell(grid);
  if (cell) {
    const [r, c] = cell;
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
};

const cloneGrid = (grid: Grid): Grid => grid.map((row) => [...row]);

const moveAndMerge = (line: number[]): number[] => {
  const newLine = line.filter((v) => v);
  for (let i = 0; i < newLine.length - 1; i++) {
    if (newLine[i] === newLine[i + 1]) {
      newLine[i] *= 2;
      newLine[i + 1] = 0;
    }
  }
  return newLine.filter((v) => v).concat(Array(GRID_SIZE - newLine.filter((v) => v).length).fill(0));
};

const transpose = (grid: Grid): Grid => grid[0].map((_, i) => grid.map((row) => row[i]));

const moveGrid = (grid: Grid, direction: Direction): Grid => {
  let newGrid = cloneGrid(grid);
  if (direction === "up" || direction === "down") newGrid = transpose(newGrid);

  newGrid = newGrid.map((row) => (direction === "right" || direction === "down" ? row.reverse() : row));
  newGrid = newGrid.map(moveAndMerge);
  newGrid = newGrid.map((row) => (direction === "right" || direction === "down" ? row.reverse() : row));

  if (direction === "up" || direction === "down") newGrid = transpose(newGrid);
  return newGrid;
};

const checkWin = (grid: Grid): boolean => grid.flat().includes(2048);

const canMove = (grid: Grid): boolean => {
  if (getRandomEmptyCell(grid)) return true;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if ((r < GRID_SIZE - 1 && grid[r][c] === grid[r + 1][c]) || (c < GRID_SIZE - 1 && grid[r][c] === grid[r][c + 1])) {
        return true;
      }
    }
  }
  return false;
};

interface CellProps {
  value: number | null | undefined;
}

function getBackgroundColor(value: number): string {
  if (value === 0) return "gray";
  const blueIntensity = Math.min(255, Math.max(0, Math.floor((value / 100) * 255)));
  return `rgb(0, 0, ${blueIntensity})`;
}

function Cell({ value }: CellProps) {
  if (value === null || value === undefined || isNaN(value)) {
    return null;
  }

  const formattedValue = new Intl.NumberFormat().format(value);
  const backgroundColor = getBackgroundColor(value);

  return (
    <div style={{ backgroundColor, color: "white", borderRadius: "4px", textAlign: "center",width: "100px",height:"100px",
      alignContent:"center",
      fontWeight:"1000",
      fontSize:"30px"
     }}>
      {formattedValue}
    </div>
  );
}


export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(generateEmptyGrid);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => parseInt(localStorage.getItem("bestScore") || "0"));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || isWinner) return;

      const directions: Record<string, Direction> = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
      if (directions[e.key]) {
        const newGrid = moveGrid(grid, directions[e.key]);
        if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
          addRandomTile(newGrid);
          setGrid(newGrid);
          const newScore = newGrid.flat().reduce((a, b) => a + b, 0);
          setScore(newScore);

          if (newScore > bestScore) {
            setBestScore(newScore);
            localStorage.setItem("bestScore", newScore.toString());
          }

          if (checkWin(newGrid)) setIsWinner(true);
          if (!canMove(newGrid)) setIsGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, bestScore, isGameOver, isWinner]);

  useEffect(() => addRandomTile(grid), []);

  return (
    <Container size="sm" >
      <Title order={1}>2048</Title>
      <Text>Score: {score} | Best: {bestScore}</Text>
      {isWinner && <Text>🎉 You Win! 🎉</Text>}
      {isGameOver && <Text>💀 Game Over 💀</Text>}
      <Grid columns={GRID_SIZE} >
        {grid.map((row, r) => row.map((cell, c) => (
          <Grid.Col span={1} key={`${r}-${c}`} >
            <Cell value={cell} />
          </Grid.Col>
        )))}
      </Grid>
    </Container>
  );
}
