import cultfitCreative1 from "@/assets/cultfit-creative-1.webp";
import cultfitCreative2 from "@/assets/cultfit-creative-2.png";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const cultPink = "340 82% 52%";
const cultYellow = "45 100% 51%";

const sliderImages = [
  { image: cultfitCreative1, alt: "Cult Fit creative 1" },
  { image: cultfitCreative2, alt: "Cult Fit creative 2" },
];

const stats = [
  { value: "4.2M", label: "Impressions" },
  { value: "850%", label: "Follower growth" },
  { value: "12.4%", label: "Engagement" },
  { value: "78K", label: "Link clicks" },
  { value: "4.5X", label: "ROI" },
];

const CultFitCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="03"
    title="Cult"
    accentTitle=".fit"
    subtitle="Fitness platform. Memberships up. Brand sharper."
    slides={sliderImages}
    stats={stats}
    accentColor={cultPink}
    secondaryColor={cultYellow}
    background={`linear-gradient(160deg, hsl(260 20% 8%), hsl(340 30% 12%), hsl(${cultPink} / 0.25), hsl(${cultYellow} / 0.08))`}
  />
);

export default CultFitCaseStudy;
