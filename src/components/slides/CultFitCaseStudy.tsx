import cultfitCreative1 from "@/assets/cultfit-creative-1.webp";
import cultfitCreative2 from "@/assets/cultfit-creative-2.png";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const cultPink = "340 82% 52%";

const sliderImages = [
  { image: cultfitCreative1, alt: "Cult Fit creative 1" },
  { image: cultfitCreative2, alt: "Cult Fit creative 2" },
];

const stats = [
  { value: "4.2M", label: "Audience reach" },
  { value: "12.4%", label: "Interaction rate" },
  { value: "78K", label: "Intent clicks" },
  { value: "4.5X", label: "Reported ROI" },
];

const CultFitCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="04"
    title="Cult"
    accentTitle=".fit"
    subtitle="Fitness platform. Performance creatives and social proof turned attention into membership intent."
    mobileSubtitle="Fitness platform. Our ads and social proof turned attention into memberships."
    proofNote="What it proves: fast-moving campaign creative, measurable audience response, and conversion-minded storytelling."
    market="Fitness and wellness platform"
    owlsurfRole="Campaign creative, paid media, performance narrative"
    proofPoints={[
      { label: "Buyer", value: "Urban fitness users choosing between apps, gyms, and routines" },
      { label: "Shift", value: "From attention to membership intent through sharper creative" },
      { label: "Proof", value: "Reach, link clicks, and ROI read in one strip" },
    ]}
    slides={sliderImages}
    stats={stats}
    accentColor={cultPink}
    background={`linear-gradient(160deg, hsl(260 20% 8%), hsl(340 30% 12%), hsl(${cultPink} / 0.25), hsl(45 100% 51% / 0.08))`}
  />
);

export default CultFitCaseStudy;
