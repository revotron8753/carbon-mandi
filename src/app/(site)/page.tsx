import { HomeHero } from "@/components/custom/home/HomeHero";
import { HomeWhatIsGreenH2 } from "@/components/custom/home/HomeWhatIsGreenH2";
import { HomeNationalOpportunity } from "@/components/custom/home/HomeNationalOpportunity";
import { HomeHempNapier } from "@/components/custom/home/HomeHempNapier";
import { HomeWhoUsesH2 } from "@/components/custom/home/HomeWhoUsesH2";
import { HomeWhoBenefits } from "@/components/custom/home/HomeWhoBenefits";
import { HomeBeAPart } from "@/components/custom/home/HomeBeAPart";
import { HomeCarbonNeutral } from "@/components/custom/home/HomeCarbonNeutral";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeWhatIsGreenH2 />
      <HomeNationalOpportunity />
      <HomeHempNapier />
      <HomeWhoUsesH2 />
      <HomeWhoBenefits />
      <HomeBeAPart />
      <HomeCarbonNeutral />
    </>
  );
}
