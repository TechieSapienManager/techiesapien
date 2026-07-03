export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  color: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Neural Ops",
    category: "Autonomous Agent Platform",
    year: "2026",
    description:
      "A self-orchestrating agent runtime that plans, executes, and repairs multi-step automations across cloud infrastructure.",
    stack: ["TypeScript", "LLM Orchestration", "Kubernetes", "Vector DB"],
    color: "#3e7bfa",
  },
  {
    id: "02",
    title: "Synapse Grid",
    category: "Realtime Data Mesh",
    year: "2025",
    description:
      "An event-driven data mesh streaming millions of sensor signals into predictive maintenance models for robotics fleets.",
    stack: ["Rust", "Kafka", "PyTorch", "gRPC"],
    color: "#22d3ee",
  },
  {
    id: "03",
    title: "Cortex Studio",
    category: "Generative Design Engine",
    year: "2025",
    description:
      "A generative design tool that turns natural language briefs into production-ready interface systems in seconds.",
    stack: ["Next.js", "Diffusion Models", "WebGPU", "Figma API"],
    color: "#8b7bff",
  },
  {
    id: "04",
    title: "Orbit Automate",
    category: "Workflow Automation Suite",
    year: "2024",
    description:
      "A no-code automation fabric connecting APIs, models, and human approvals into resilient business workflows.",
    stack: ["Node.js", "Temporal", "PostgreSQL", "React"],
    color: "#3e7bfa",
  },
];
