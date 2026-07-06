import ctpCreative1 from "@/assets/ctp-creative-1.png";
import ctpCreative2 from "@/assets/ctp-creative-2.png";
import ctpCreative3 from "@/assets/ctp-creative-3.png";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const ctpGreen = "95 48% 41%";

const sliderImages = [
  { image: ctpCreative1, alt: "Check This Property creative 1" },
  { image: ctpCreative2, alt: "Check This Property creative 2" },
  { image: ctpCreative3, alt: "Check This Property creative 3" },
];

const stats = [
  { value: "1.8M", label: "Search reach" },
  { value: "14.2%", label: "Engaged traffic" },
  { value: "36K", label: "Property clicks" },
  { value: "3.2X", label: "Reported ROI" },
];

// Background end stop must stay opaque: a translucent hsl(green / alpha) stop
// composites over the dark section bg into a dark corner under the dark-ink stat strip.
const CTPCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="06"
    title="Check This"
    accentTitle="Property"
    subtitle="Australian property tech. We clarified the product story so searchers could understand and act faster."
    mobileSubtitle="Australian property tech. We made the product story clear enough to act on."
    proofNote="What it proves: category education, search intent, and clearer conversion paths for a technical marketplace."
    market="Australian property technology"
    owlsurfRole="Search, category education, conversion journey"
    proofPoints={[
      { label: "Buyer", value: "Property searchers comparing options under uncertainty" },
      { label: "Shift", value: "From product explanation to faster action and trust" },
      { label: "Proof", value: "Search reach, property clicks, and ROI tied to intent" },
    ]}
    slides={sliderImages}
    stats={stats}
    accentColor={ctpGreen}
    background={`linear-gradient(160deg, hsl(95 30% 92%), hsl(95 20% 88%), hsl(95 30% 74%))`}
    lightMode
  />
);

export default CTPCaseStudy;
