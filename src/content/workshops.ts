export const learningAreas = [
  { icon: "Terminal", title: "Linux and developer tools", description: "Use the command line, shell tools, Git, compilers, and reproducible software environments." },
  { icon: "Network", title: "SSH and remote systems", description: "Connect to remote machines, configure SSH keys, and understand shared computing environments." },
  { icon: "Server", title: "Slurm and HPC clusters", description: "Learn how job schedulers, nodes, and resource requests work on research systems." },
  { icon: "Cpu", title: "Parallel programming", description: "Explore shared-memory and distributed computing through CPU and GPU workloads." },
  { icon: "Boxes", title: "Practical systems", description: "Work with containers, virtual machines, a small Raspberry Pi lab, and system configuration." },
  { icon: "GitBranch", title: "Benchmark and optimize", description: "Collect measurements, identify bottlenecks, and document repeatable experiments." },
] as const;

export const publishedGuides = [
  {
    title: "Linux, VMs and containers",
    description: "Terminal basics, Linux environments, containers, local Kubernetes, Ansible, and Proxmox labs.",
    href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings/tree/main/03-linux-vms-and-containers",
  },
  {
    title: "STREAM benchmark on the CAC",
    description: "Access a remote cluster, submit Slurm jobs, benchmark memory bandwidth, and interpret results with the roofline model.",
    href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings/tree/main/04-stream-benchmark-on-cac",
  },
  {
    title: "Profiling and optimization",
    description: "Time a C program, compare optimization flags, use perf, and investigate a cache bottleneck.",
    href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings/tree/main/05-profiling-and-optimization",
  },
] as const;
