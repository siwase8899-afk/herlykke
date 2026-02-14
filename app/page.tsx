import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { SocialProof } from '../components/landing/SocialProof';
import { FounderSection } from '../components/landing/FounderSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTAFooter } from '../components/landing/CTAFooter';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <HowItWorks />
      <SocialProof />
      <FounderSection />
      <FAQSection />
      <CTAFooter />
    </main>
  );
}
