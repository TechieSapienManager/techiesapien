import { Hero } from "@/components/sections/Hero";
import { AudienceStrip } from "@/components/sections/AudienceStrip";
import { About } from "@/components/sections/About";
import { Apps } from "@/components/sections/Apps";
import { Content } from "@/components/sections/Content";
import { Revyon } from "@/components/sections/Revyon";
import { AutomationLab } from "@/components/sections/AutomationLab";
import { Services } from "@/components/sections/Services";
import { AchievementsTimeline } from "@/components/sections/achievements-timeline";
import { SocialUniverseSection } from "@/components/sections/social-universe-section";
import { ContactTerminal } from "@/components/sections/contact-terminal";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceStrip />
      <About />
      <Apps />
      <Content />
      <Revyon />
      <AutomationLab />
      <Services />
      <AchievementsTimeline />
      <SocialUniverseSection />
      <ContactTerminal />
    </>
  );
}
