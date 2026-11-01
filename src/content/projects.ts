export const projectIdeas = [
  { icon: "Cpu", title: "CPU-only AI inference", description: "Compare ways to run language-model workloads on CPUs, looking at throughput, latency, and energy use." },
  { icon: "BarChart3", title: "Model size and quantization", description: "Explore how reducing model precision can change memory needs, response quality, and inference speed." },
  { icon: "Network", title: "A small retrieval system", description: "Build a local search-and-answer prototype and evaluate how well it finds relevant material." },
  { icon: "Activity", title: "Energy-aware scheduling", description: "Use simulation to explore how scheduling choices could respond to changing workload and energy conditions." },
  { icon: "Workflow", title: "OpenMP scaling and bottlenecks", description: "Measure how a shared-memory program responds to additional CPU threads and where performance stops scaling." },
  { icon: "Network", title: "MPI placement and scaling", description: "Explore how process placement and communication affect a distributed workload." },
  { icon: "Server", title: "A small cluster bring-up", description: "Connect small computers and learn about the networking and software layers that make a cluster work." },
  { icon: "Repeat2", title: "A reusable benchmark workflow", description: "Create repeatable steps for running workloads, collecting measurements, and comparing configurations." },
] as const;
