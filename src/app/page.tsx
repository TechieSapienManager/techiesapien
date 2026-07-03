import { Hero } from "@/components/sections/hero";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { AutomationLab } from "@/components/sections/automation-lab";
import { AIPlayground } from "@/components/sections/ai-playground";
import { AchievementsTimeline } from "@/components/sections/achievements-timeline";
import { Services } from "@/components/sections/services";
import { SocialUniverseSection } from "@/components/sections/social-universe-section";
import { ContactTerminal } from "@/components/sections/contact-terminal";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <AutomationLab />
      <AIPlayground />
      <AchievementsTimeline />
      <Services />
      <SocialUniverseSection />
      <ContactTerminal />
    </>
  );
}
