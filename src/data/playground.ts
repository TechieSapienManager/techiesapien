export interface PlaygroundPreset {
  prompt: string;
  response: string;
}

export const playgroundPresets: PlaygroundPreset[] = [
  {
    prompt: "What do you specialize in?",
    response:
      "I design AI systems end-to-end — from LLM orchestration and RAG pipelines to autonomous agents, robotics integration, and the automation fabric that connects it all.",
  },
  {
    prompt: "How do you approach automation?",
    response:
      "Every automation starts as a decision tree: trigger, reason, act, verify. I build pipelines that self-heal, log everything, and escalate to humans only when confidence is low.",
  },
  {
    prompt: "What makes your work different?",
    response:
      "Precision engineering meets cinematic design. Systems that are technically rigorous underneath, and effortless — even delightful — to use on the surface.",
  },
  {
    prompt: "Are you available for projects?",
    response:
      "Selectively, yes. I take on a small number of collaborations at a time to keep quality high. Head to the contact terminal below to start a conversation.",
  },
];

export const defaultPlaygroundResponse =
  "That's an interesting prompt. In a full deployment, this would route to a live model — for now, try one of the presets above to see the system respond.";
