import vntCreative1 from "@/assets/vnt-creative-1.webp";
import vntCreative2 from "@/assets/vnt-creative-2.png";
import vntExtra1 from "@/assets/vnt-extra-1.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const vntGreen = "100 55% 38%";

const sliderImages = [
  { image: vntCreative1, alt: "VNT creative 1" },
  { image: vntCreative2, alt: "VNT creative 2" },
  { image: vntExtra1, alt: "VNT creative 3" },
];

const VNTCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="06"
    title="VNT"
    accentTitle="Mobility"
    subtitle="EV charging infrastructure in India. We mapped the value for hosts, drivers, and partners."
    proofNote="What it proves: infrastructure storytelling for a market where location, trust, and adoption all matter."
    market="EV charging infrastructure"
    owlsurfRole="Positioning, adoption story, partner-facing content"
    proofPoints={[
      { label: "Buyer", value: "Hosts, drivers, real-estate partners, and fleet operators" },
      { label: "Shift", value: "From charging hardware to a clearer network value story" },
      { label: "Proof", value: "Maps, use cases, and partner logic made the category tangible" },
    ]}
    slides={sliderImages}
    accentColor={vntGreen}
    background={`linear-gradient(160deg, hsl(120 25% 75%), hsl(140 30% 68%), hsl(${vntGreen} / 0.5))`}
    lightMode
  />
);

export default VNTCaseStudy;
