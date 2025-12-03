export function formatProgress(progress) {
  return Math.round(progress * 100);
}

export function getDifficultyColor(difficulty) {
  const colors = {
    BEGINNER: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    INTERMEDIATE:
      "bg-yellow-500/30 text-yellow-400 border border-yellow-500/40",
    ADVANCED: "bg-yellow-500/40 text-yellow-300 border border-yellow-500/50",
  };
  return (
    colors[difficulty] ||
    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
  );
}
