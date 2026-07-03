export interface WorkflowNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export const workflowNodes: WorkflowNode[] = [
  { id: "trigger", label: "Trigger", description: "Event or schedule initiates the pipeline", x: 6, y: 50 },
  { id: "ingest", label: "Ingest", description: "Raw data collected from connected sources", x: 26, y: 18 },
  { id: "clean", label: "Normalize", description: "Data cleaned, validated, and structured", x: 26, y: 82 },
  { id: "model", label: "Model", description: "LLM / ML model reasons over the data", x: 50, y: 50 },
  { id: "decide", label: "Decision", description: "Agent routes based on confidence & policy", x: 72, y: 18 },
  { id: "act", label: "Action", description: "API calls, updates, and notifications fire", x: 72, y: 82 },
  { id: "output", label: "Deliver", description: "Result delivered and pipeline logged", x: 94, y: 50 },
];

export const workflowEdges: WorkflowEdge[] = [
  { from: "trigger", to: "ingest" },
  { from: "trigger", to: "clean" },
  { from: "ingest", to: "model" },
  { from: "clean", to: "model" },
  { from: "model", to: "decide" },
  { from: "model", to: "act" },
  { from: "decide", to: "output" },
  { from: "act", to: "output" },
];
