import { Hero } from "@/components/sections/Hero";
import { AudienceStrip } from "@/components/sections/AudienceStrip";
import { About } from "@/components/sections/About";
import { Apps } from "@/components/sections/Apps";
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
      <AudienceStrip />
      <About />
      <Apps />
      <AutomationLab />
      <AIPlayground />
      <AchievementsTimeline />
      <Services />
      <SocialUniverseSection />
      <ContactTerminal />
    </>
  );
}
