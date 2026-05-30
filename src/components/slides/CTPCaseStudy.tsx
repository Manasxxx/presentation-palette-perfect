import ctpCreative1 from "@/assets/ctp-creative-1.png";
import ctpCreative2 from "@/assets/ctp-creative-2.png";
import ctpCreative3 from "@/assets/ctp-creative-3.png";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const ctpGreen = "95 48% 41%";
const ctpTeal = "185 28% 24%";

const sliderImages = [
  { image: ctpCreative1, alt: "Check This Property creative 1" },
  { image: ctpCreative2, alt: "Check This Property creative 2" },
  { image: ctpCreative3, alt: "Check This Property creative 3" },
];

const stats = [
  { value: "1.8M", label: "Impressions" },
  { value: "430%", label: "Follower growth" },
  { value: "14.2%", label: "Engagement" },
  { value: "36K", label: "Link clicks" },
  { value: "3.2X", label: "ROI" },
];

const CTPCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="05"
    title="Check This"
    accentTitle="Property"
    subtitle="Australian property tech. Made the search easy. Aussies found them."
    slides={sliderImages}
    stats={stats}
    accentColor={ctpGreen}
    secondaryColor={ctpTeal}
    background={`linear-gradient(160deg, hsl(95 30% 92%), hsl(95 20% 88%), hsl(${ctpGreen} / 0.2))`}
    lightMode
  />
);

export default CTPCaseStudy;
