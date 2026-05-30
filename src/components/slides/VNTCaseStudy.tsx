import vntCreative1 from "@/assets/vnt-creative-1.webp";
import vntCreative2 from "@/assets/vnt-creative-2.png";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const vntGreen = "100 55% 38%";
const vntTeal = "192 100% 32%";

const sliderImages = [
  { image: vntCreative1, alt: "VNT creative 1" },
  { image: vntCreative2, alt: "VNT creative 2" },
];

const VNTCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="06"
    title="VNT"
    accentTitle="Mobility"
    subtitle="EV charging across India. We put them on the map. Literally."
    slides={sliderImages}
    accentColor={vntGreen}
    secondaryColor={vntTeal}
    background={`linear-gradient(160deg, hsl(120 25% 75%), hsl(140 30% 68%), hsl(${vntGreen} / 0.5))`}
    lightMode
  />
);

export default VNTCaseStudy;
