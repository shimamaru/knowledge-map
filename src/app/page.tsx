import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapTags from "@/components/MapTags";
import ProfileSection from "@/components/ProfileSection";
import RecentRecords from "@/components/RecentRecords";
import TopicCards from "@/components/TopicCards";
import { getStandfmRecords } from "@/lib/standfm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const records = await getStandfmRecords();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <TopicCards />
      <RecentRecords records={records.slice(0, 3)} />
      <MapTags records={records} />
      <ProfileSection />
    </div>
  );
}
