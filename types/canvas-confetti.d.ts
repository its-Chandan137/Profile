declare module "canvas-confetti" {
  type Options = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    scalar?: number;
    ticks?: number;
    zIndex?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: Array<"square" | "circle">;
    disableForReducedMotion?: boolean;
  };

  type Confetti = (options?: Options) => Promise<null> | null;

  const confetti: Confetti;
  export default confetti;
}
