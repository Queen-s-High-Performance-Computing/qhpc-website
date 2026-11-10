// Possible hands-on exercises, not claims of completed club projects.
export const projectIdeas = [
  { icon: "Server", title: "Run a scheduler on our Pi cluster", description: "Configure the nodes and compare manual workload execution with jobs submitted through Slurm." },
  { icon: "BarChart3", title: "Measure memory and CPU performance", description: "Run a benchmark under controlled settings, record results, and explain what limits performance." },
  { icon: "Workflow", title: "Compare serial and parallel execution", description: "Use OpenMP or MPI to see how communication, thread count and process placement affect runtime." },
] as const;
