export interface Achievement {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export const achievements: Achievement[] = [
  {
    year: "2020",
    title: "First Line of Code",
    description:
      "Wrote the first automation script that replaced a full day of manual work with a two-minute job.",
    tag: "Origin",
  },
  {
    year: "2021",
    title: "Shipped First ML Pipeline",
    description:
      "Deployed a production classification pipeline serving predictions at sub-100ms latency.",
    tag: "Machine Learning",
  },
  {
    year: "2022",
    title: "Built Automation Framework",
    description:
      "Designed an internal automation framework adopted across three engineering teams.",
    tag: "Automation",
  },
  {
    year: "2023",
    title: "Led Robotics Integration",
    description:
      "Bridged software and hardware teams to bring computer-vision-guided robotics into production.",
    tag: "Robotics",
  },
  {
    year: "2024",
    title: "Launched Agent Platform",
    description:
      "Released an autonomous agent orchestration platform now running thousands of workflows daily.",
    tag: "AI Systems",
  },
  {
    year: "2025",
    title: "Awwwards-Level Experiences",
    description:
      "Crafted immersive, cinematic web experiences blending 3D, motion, and interaction design.",
    tag: "Design Engineering",
  },
  {
    year: "2026",
    title: "Techie Sapien Labs",
    description:
      "Opened an independent AI laboratory exploring the frontier of intelligent, automated systems.",
    tag: "Present",
  },
];
