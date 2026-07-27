import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProfileSection from "@/components/ProfileSection";
import TopicCards from "@/components/TopicCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <TopicCards />
      <ProfileSection />
    </div>
  );
}
