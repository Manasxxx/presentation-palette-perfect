import raychemCreative1 from "@/assets/raychem-creative-1.webp";
import raychemCreative2 from "@/assets/raychem-creative-2.webp";
import raychemCreative3 from "@/assets/Raychemcasestudy 3.webp";
import raychemExtra1 from "@/assets/raychem-extra-1.webp";
import raychemExtra2 from "@/assets/raychem-extra-2.webp";
import raychemExtra3 from "@/assets/raychem-extra-3.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const raychemRed = "356 86% 52%";
const raychemBlue = "210 100% 25%";

const sliderImages = [
  { image: raychemCreative1, alt: "Raychem RPG power grid creative" },
  { image: raychemCreative2, alt: "Raychem RPG invisible infrastructure creative" },
  { image: raychemCreative3, alt: "Raychem RPG field engineers at work" },
  { image: raychemExtra1, alt: "Raychem RPG additional creative 1" },
  { image: raychemExtra2, alt: "Raychem RPG additional creative 2" },
  { image: raychemExtra3, alt: "Raychem RPG additional creative 3" },
];

const RaychemRPGCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="07"
    title="Raychem"
    accentTitle="RPG"
    subtitle="Industrial electrical and heat-tracing systems. We turned infrastructure expertise into clearer digital demand."
    proofNote="What it proves: industrial-category fluency, sharper creative, and demand language for technical buyers."
    market="Industrial electrical systems"
    owlsurfRole="Technical storytelling, demand language, campaign creative"
    proofPoints={[
      { label: "Buyer", value: "Industrial, utility, engineering, and procurement teams" },
      { label: "Shift", value: "From hidden infrastructure to visible operational value" },
      { label: "Proof", value: "Creative shows applications, field context, and category authority" },
    ]}
    slides={sliderImages}
    accentColor={raychemRed}
    background={`linear-gradient(160deg, hsl(210 30% 10%), hsl(210 50% 15%), hsl(${raychemBlue} / 0.6), hsl(${raychemRed} / 0.15))`}
  />
);

export default RaychemRPGCaseStudy;
