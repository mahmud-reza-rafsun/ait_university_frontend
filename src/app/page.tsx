import { Banner } from "@/components/Section/Banner";
import { EventsSection } from "@/components/Section/EventsSection";
import { ResearchSection } from "@/components/Section/ResearchSection";
import { StatsSection } from "@/components/Section/StatsSection";
import { Subject } from "@/components/Section/Subject";

export default function Home() {
  return (
    <div className="mt-12">
      <Banner />
      <Subject />
      <StatsSection />
      <ResearchSection />
      <EventsSection />
    </div>
  );
}
