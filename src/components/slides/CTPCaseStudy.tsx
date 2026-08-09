import ctpCreative1 from "@/assets/ctp-creative-1.png";
import ctpCreative2 from "@/assets/ctp-creative-2.png";
import ctpCreative3 from "@/assets/ctp-creative-3.png";
import ctpCreative4 from "@/assets/ctp-creative-4.webp";
import ctpCreative5 from "@/assets/ctp-creative-5.webp";
import ctpCreative6 from "@/assets/ctp-creative-6.webp";
import ctpCreative7 from "@/assets/ctp-creative-7.webp";
import ctpCreative8 from "@/assets/ctp-creative-8.webp";
import ctpCreative9 from "@/assets/ctp-creative-9.webp";
import ctpCreative10 from "@/assets/ctp-creative-10.webp";
import ctpCreative11 from "@/assets/ctp-creative-11.webp";
import ctpCreative12 from "@/assets/ctp-creative-12.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const ctpGreen = "95 48% 41%";

const sliderImages = [
  { image: ctpCreative1, alt: "Check This Property creative 1" },
  { image: ctpCreative2, alt: "Check This Property creative 2" },
  { image: ctpCreative3, alt: "Check This Property creative 3" },
  { image: ctpCreative4, alt: "Check This Property due diligence creative" },
  { image: ctpCreative5, alt: "Check This Property secret easements creative" },
  { image: ctpCreative6, alt: "Check This Property don't buy blind creative" },
  { image: ctpCreative7, alt: "Check This Property first home buyers in NSW creative" },
  { image: ctpCreative8, alt: "Check This Property overlays creative" },
  { image: ctpCreative9, alt: "Check This Property bushfire-prone scrub creative" },
  { image: ctpCreative10, alt: "Check This Property $25,000 mistake creative" },
  { image: ctpCreative11, alt: "Check This Property first home buyers aerial creative" },
  { image: ctpCreative12, alt: "Check This Property hidden risks creative" },
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
    subtitle="An Australian property tech company. We made its product easier to understand, helping searchers act faster."
    mobileSubtitle="An Australian property tech company. We made the product easier to understand and act on."
    proofNote="What it proves: category education, search intent, and clearer conversion paths for a technical marketplace."
    market="Australian property technology"
    owlsurfRole="Search, category education, and a clearer path to action"
    proofPoints={[
      { label: "Buyer", value: "Property buyers comparing options without all the facts" },
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
