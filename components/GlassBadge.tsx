import { Chip } from '@material-tailwind/react';

type ChipColor = "green" | "blue" | "amber" | "red" | "teal" | "gray";

export function Badge({ children, color = "green", size = "sm" }: { children: React.ReactNode; color?: ChipColor; size?: "sm" | "md" | "lg" }) {
  return (
    <Chip
      value={children}
      color={color}
      size={size}
      className="inline-flex w-auto backdrop-blur-md !bg-opacity-60 border border-white/30 shadow-glass"
    />
  );
}
