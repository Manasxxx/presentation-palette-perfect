import girlupCreative1 from "@/assets/girlup-creative-1.png";
import girlupCreative2 from "@/assets/girlup-creative-2.png";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const girlUpTeal = "168 100% 36%";
const girlUpPurple = "268 48% 63%";

const sliderImages = [
  { image: girlupCreative1, alt: "Girl Up creative 1" },
  { image: girlupCreative2, alt: "Girl Up creative 2" },
];

const stats = [
  { value: "3.1M", label: "Impressions" },
  { value: "620%", label: "Follower growth" },
  { value: "18.7%", label: "Engagement" },
  { value: "52K", label: "Link clicks" },
  { value: "3.8X", label: "ROI" },
];

const GirlUpCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="04"
    title="Girl"
    accentTitle="Up"
    subtitle="UN Foundation youth movement. Louder where it mattered."
    slides={sliderImages}
    stats={stats}
    accentColor={girlUpTeal}
    secondaryColor={girlUpPurple}
    background={`linear-gradient(160deg, hsl(${girlUpTeal} / 0.85), hsl(168 60% 22% / 0.7), hsl(${girlUpPurple} / 0.35))`}
  />
);

export default GirlUpCaseStudy;
