import dehnLightning from "@/assets/dehn-when-lightning-strikes.webp";
import dehnRailway from "@/assets/dehn-railway-earthing.webp";
import dehnPowerGrids from "@/assets/dehn-power-grids.webp";
import dehnRadioBase from "@/assets/dehn-radio-base-station.webp";
import dehnSafetyNetworks from "@/assets/dehn-safety-networks.webp";
import dehnSafetyTips from "@/assets/dehn-safety-tips.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

// DEHN brand red (#E2001A)
const dehnRed = "353 100% 44%";

const sliderImages = [
  { image: dehnLightning, alt: "DEHN when lightning strikes creative" },
  { image: dehnRailway, alt: "DEHN railway earthing creative" },
  { image: dehnPowerGrids, alt: "DEHN power grids protection creative" },
  { image: dehnRadioBase, alt: "DEHN radio base station protection creative" },
  { image: dehnSafetyNetworks, alt: "DEHN safety networks creative" },
  { image: dehnSafetyTips, alt: "DEHN electrical safety tips creative" },
];

const DEHNCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="08"
    title="DEHN"
    accentTitle="Electricals"
    subtitle="A German maker of lightning protection, surge protection, and earthing systems. We turned safety engineering into clear stories for the people who plan and protect infrastructure."
    mobileSubtitle="German lightning and surge protection maker. We made safety engineering easy to understand."
    proofNote="What it proves: technical safety products explained through the places they protect, not through spec sheets."
    market="Lightning, surge, and earthing protection"
    owlsurfRole="Technical storytelling, creative, education-led content"
    proofPoints={[
      { label: "Buyer", value: "Electrical engineers, infrastructure planners, and safety leads" },
      { label: "Shift", value: "From product spec sheets to application-led safety stories" },
      { label: "Proof", value: "Railways, power grids, and telecom shown as protected systems" },
    ]}
    slides={sliderImages}
    accentColor={dehnRed}
    background={`linear-gradient(160deg, hsl(220 20% 9%), hsl(355 45% 15%), hsl(${dehnRed} / 0.3))`}
  />
);

export default DEHNCaseStudy;
