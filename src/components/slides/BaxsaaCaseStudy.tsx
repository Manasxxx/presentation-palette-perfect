import baxsaaCreative1 from "@/assets/baxsaa-creative-1.png";
import baxsaaCreative2 from "@/assets/baxsaa-creative-2.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const baxsaaMaroon = "0 68% 33%";
const baxsaaMaroonLight = "0 55% 45%";

const sliderImages = [
  { image: baxsaaCreative1, alt: "Baxsaa Co. creative 1" },
  { image: baxsaaCreative2, alt: "Baxsaa Co. creative 2" },
];

const stats = [
  { value: "2.76M", label: "Impressions" },
  { value: "14.6K", label: "Followers" },
  { value: "3.9M", label: "Reach" },
  { value: "3X", label: "CTR" },
  { value: "97/100", label: "Mobile" },
];

const BaxsaaCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="02"
    title="The Baxsaa"
    accentTitle="Co."
    subtitle="D2C beauty. Grew the audience. Sharpened the funnel."
    slides={sliderImages}
    stats={stats}
    accentColor={baxsaaMaroon}
    secondaryColor={baxsaaMaroonLight}
    background={`linear-gradient(160deg, hsl(36 33% 93%), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))`}
    lightMode
  />
);

export default BaxsaaCaseStudy;
