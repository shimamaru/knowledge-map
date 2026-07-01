import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapTags from "@/components/MapTags";
import ProfileSection from "@/components/ProfileSection";
import RecentRecords from "@/components/RecentRecords";
import TopicCards from "@/components/TopicCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <TopicCards />
      <RecentRecords />
      <MapTags />
      <ProfileSection />
    </div>
  );
}
