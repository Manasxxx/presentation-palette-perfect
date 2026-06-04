import baxsaaCreative1 from "@/assets/baxsaa-creative-1.png";
import baxsaaCreative2 from "@/assets/baxsaa-creative-2.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const baxsaaMaroon = "0 68% 33%";
const sliderImages = [
  { image: baxsaaCreative1, alt: "Baxsaa Co. creative 1" },
  { image: baxsaaCreative2, alt: "Baxsaa Co. creative 2" },
];

const stats = [
  { value: "2.76M", label: "Qualified views" },
  { value: "3.9M", label: "Market reach" },
  { value: "3X", label: "CTR multiple" },
  { value: "97/100", label: "Mobile score" },
];

const BaxsaaCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="02"
    title="The Baxsaa"
    accentTitle="Co."
    subtitle="Beauty commerce brand. We tightened search, content, and funnel signals so the brand looked sharper at every buyer check."
    proofNote="What it proves: search hygiene, mobile readiness, and performance discipline for a brand where trust is built before checkout."
    market="D2C beauty commerce"
    owlsurfRole="SEO, content, funnel, mobile proof"
    proofPoints={[
      { label: "Buyer", value: "Discovery-led shoppers checking credibility before purchase" },
      { label: "Shift", value: "From scattered brand touchpoints to a cleaner conversion path" },
      { label: "Proof", value: "Reach, mobile performance, and CTR moved together" },
    ]}
    slides={sliderImages}
    stats={stats}
    accentColor={baxsaaMaroon}
    background={`linear-gradient(160deg, hsl(36 33% 93%), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))`}
    lightMode
  />
);

export default BaxsaaCaseStudy;
