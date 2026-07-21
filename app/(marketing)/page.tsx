import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Process } from "@/components/sections/Process";
import { WhyMe } from "@/components/sections/WhyMe";
import { Software } from "@/components/sections/Software";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Services />
      <Portfolio />
      <FeaturedProjects />
      <Process />
      <WhyMe />
      <Software />
      <Testimonials />
      <Stats />
      <FAQ />
      <Contact />
    </main>
  );
}
