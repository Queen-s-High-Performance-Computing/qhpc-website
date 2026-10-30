export const learningAreas = [
  { icon: "Terminal", title: "Linux and development tools", description: "Build confidence with the command line, Git, compilers, libraries, and software environments." },
  { icon: "Network", title: "Remote computing", description: "Learn how SSH connects your computer to shared systems and how to work safely in a remote environment." },
  { icon: "Server", title: "Clusters and job scheduling", description: "Understand nodes, shared resources, and how Slurm schedules work on a cluster." },
  { icon: "Cpu", title: "Parallel computing", description: "Explore CPUs, GPUs, processes, threads, shared-memory programming, and distributed workloads." },
  { icon: "Boxes", title: "Applications and systems", description: "Connect computing concepts to real workloads, containers, virtual machines, and small cluster projects." },
  { icon: "GitBranch", title: "Performance and reproducibility", description: "Practice benchmarking, profiling, experiment design, debugging, and documenting results." },
] as const;

export const publishedGuides = [
  {
    title: "Linux, VMs and containers",
    description: "Terminal basics, Linux environments, containers, local Kubernetes clusters, Ansible, and Proxmox labs.",
    href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings/tree/main/03-linux-vms-and-containers",
  },
  {
    title: "SSH and Slurm on the CAC",
    description: "Configure SSH, edit a job script, submit it to the scheduler, and inspect its output.",
    href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings/tree/main/04-ssh-and-slurm",
  },
] as const;
