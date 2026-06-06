import baxsaaCreative1 from "@/assets/baxsaa-creative-1.png";
import baxsaaCreative2 from "@/assets/baxsaa-creative-2.webp";
import baxsaaExtra1 from "@/assets/baxsaa-extra-1.webp";
import baxsaaExtra2 from "@/assets/baxsaa-extra-2.webp";
import baxsaaExtra3 from "@/assets/baxsaa-extra-3.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const baxsaaMaroon = "0 68% 33%";
const sliderImages = [
  { image: baxsaaCreative1, alt: "Baxsaa Co. creative 1" },
  { image: baxsaaCreative2, alt: "Baxsaa Co. creative 2" },
  { image: baxsaaExtra1, alt: "Baxsaa Co. creative 3" },
  { image: baxsaaExtra2, alt: "Baxsaa Co. creative 4" },
  { image: baxsaaExtra3, alt: "Baxsaa Co. creative 5" },
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
    subtitle="A Mumbai studio that makes premium custom packaging. We made them easier to find online and gave the brand a sharper look, so more of the right buyers saw the work and reached out."
    proofNote="What it proves: clear search presence, a sharper brand look, and fast mobile pages for a maker whose work sells on craft."
    market="Premium custom packaging"
    owlsurfRole="Search, content, creative, and mobile"
    proofPoints={[
      { label: "Buyer", value: "Businesses choosing a packaging partner they can trust" },
    ]}
    slides={sliderImages}
    stats={stats}
    accentColor={baxsaaMaroon}
    background={`linear-gradient(160deg, hsl(36 33% 93%), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))`}
    lightMode
  />
);

export default BaxsaaCaseStudy;
