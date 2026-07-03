import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Workflow,
  Cpu,
  LineChart,
  Sparkles,
  Bot,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    icon: BrainCircuit,
    title: "AI Systems Design",
    description:
      "End-to-end architecture for LLM-powered products — from retrieval pipelines to agent orchestration.",
    points: ["RAG architecture", "Agent orchestration", "Model evaluation"],
  },
  {
    icon: Workflow,
    title: "Automation Engineering",
    description:
      "Automated pipelines that eliminate manual work and connect your tools into a single intelligent fabric.",
    points: ["Workflow design", "API integration", "Self-healing pipelines"],
  },
  {
    icon: Bot,
    title: "Robotics & Vision",
    description:
      "Computer-vision and control systems that bring intelligence to physical automation.",
    points: ["Computer vision", "Sensor fusion", "Edge inference"],
  },
  {
    icon: Cpu,
    title: "Platform Engineering",
    description:
      "Scalable, resilient infrastructure built to support AI workloads at production scale.",
    points: ["Cloud infrastructure", "Observability", "Cost optimization"],
  },
  {
    icon: Sparkles,
    title: "Product & Interaction Design",
    description:
      "Cinematic, award-caliber interfaces that make advanced technology feel effortless.",
    points: ["3D web experiences", "Design systems", "Motion design"],
  },
  {
    icon: LineChart,
    title: "Strategy & Advisory",
    description:
      "Technical advisory for teams navigating the transition into AI-native products.",
    points: ["Technical audits", "Roadmapping", "Team enablement"],
  },
];
