import kurarayEval from "@/assets/kuraray-eval.webp";
import kurarayPvoh from "@/assets/kuraray-kuraray-pvoh.webp";
import kurarayPvoh2 from "@/assets/kuraray-kuraray-pvoh-2.webp";
import kurarayMowital from "@/assets/kuraray-mowital-pvb-resin.webp";
import kuraraySepton from "@/assets/kuraray-septon-and-hybrar-tpe.webp";
import kuraraySustainability from "@/assets/kuraray-sustainability.webp";
import kuraraySustainability2 from "@/assets/kuraray-sustainability-2.webp";
import kuraraySustainability3 from "@/assets/kuraray-sustainability-3.webp";
import kuraraySustainability4 from "@/assets/kuraray-sustainability-4.webp";
import kurarayMission from "@/assets/kuraray-sustainibility-mission.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const kurarayBlue = "205 86% 46%";

const sliderImages = [
  { image: kurarayEval, alt: "Kuraray EVAL EVOH barrier resin creative" },
  { image: kurarayPvoh, alt: "Kuraray PVOH creative" },
  { image: kurarayMowital, alt: "Kuraray MOWITAL PVB resin creative" },
  { image: kuraraySepton, alt: "Kuraray SEPTON and HYBRAR elastomer creative" },
  { image: kurarayPvoh2, alt: "Kuraray PVOH creative 2" },
  { image: kuraraySustainability, alt: "Kuraray sustainability creative 1" },
  { image: kuraraySustainability2, alt: "Kuraray sustainability creative 2" },
  { image: kuraraySustainability3, alt: "Kuraray sustainability creative 3" },
  { image: kuraraySustainability4, alt: "Kuraray sustainability creative 4" },
  { image: kurarayMission, alt: "Kuraray sustainability mission creative" },
];

const stats = [
  { value: "1L+", label: "Impressions" },
  { value: "5K+", label: "Clicks" },
  { value: "10%+", label: "Organic engagement" },
  { value: "5K+", label: "Members reached" },
];

const KurarayCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="02"
    title="Kuraray"
    accentTitle="Chemicals"
    subtitle="A Japanese specialty chemicals maker behind films, resins, and elastomers used in safety glass, packaging, and cars. We turned a deep materials portfolio into a clear story buyers could follow."
    mobileSubtitle="Japanese specialty chemicals maker. We turned a deep materials portfolio into a story buyers could follow."
    proofNote="What it proves: making a wide, technical materials range easy to grasp for the people who specify and buy it."
    market="Specialty chemicals and materials"
    owlsurfRole="Positioning, technical storytelling, buyer-facing content"
    proofPoints={[
      { label: "Buyer", value: "Engineering, packaging, automotive, and procurement teams" },
      { label: "Shift", value: "From a dense product catalogue to clear, application-led value" },
      { label: "Proof", value: "EVAL, PVOH, MOWITAL, and SEPTON shown by what they enable" },
    ]}
    slides={sliderImages}
    stats={stats}
    accentColor={kurarayBlue}
    background={`linear-gradient(160deg, hsl(210 35% 10%), hsl(208 55% 16%), hsl(${kurarayBlue} / 0.45))`}
  />
);

export default KurarayCaseStudy;
