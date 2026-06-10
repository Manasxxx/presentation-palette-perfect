import girlupCreative1 from "@/assets/girlup-creative-1.png";
import girlupCreative2 from "@/assets/girlup-creative-2.png";
import girlupExtra1 from "@/assets/girlup-extra-1.webp";
import girlupExtra2 from "@/assets/girlup-extra-2.webp";
import girlupExtra3 from "@/assets/girlup-extra-3.webp";
import CaseStudyLayout from "@/components/slides/CaseStudyLayout";

const girlUpTeal = "168 100% 36%";

const sliderImages = [
  { image: girlupCreative1, alt: "Girl Up creative 1" },
  { image: girlupCreative2, alt: "Girl Up creative 2" },
  { image: girlupExtra1, alt: "Girl Up creative 3" },
  { image: girlupExtra2, alt: "Girl Up creative 4" },
  { image: girlupExtra3, alt: "Girl Up creative 5" },
];

const stats = [
  { value: "3.1M", label: "Campaign reach" },
  { value: "18.7%", label: "Participation rate" },
  { value: "52K", label: "Action clicks" },
  { value: "3.8X", label: "Reported ROI" },
];

const GirlUpCaseStudy = () => (
  <CaseStudyLayout
    caseNumber="06"
    title="Girl"
    accentTitle="Up"
    subtitle="UN Foundation youth movement. We shaped issue-led creative for reach, participation, and credibility."
    mobileSubtitle="UN Foundation youth movement. We made the creative that grew reach and participation."
    proofNote="What it proves: public-interest messaging with clear action paths, not just awareness for awareness' sake."
    market="Youth movement and advocacy"
    owlsurfRole="Issue-led creative, campaign distribution, participation paths"
    proofPoints={[
      { label: "Audience", value: "Young supporters, partners, and action-oriented communities" },
      { label: "Shift", value: "From broad awareness to specific participation cues" },
      { label: "Proof", value: "Reach, action clicks, and participation rate stayed connected" },
    ]}
    slides={sliderImages}
    stats={stats}
    accentColor={girlUpTeal}
    background={`linear-gradient(160deg, hsl(${girlUpTeal} / 0.85), hsl(168 60% 22% / 0.7), hsl(268 48% 63% / 0.35))`}
  />
);

export default GirlUpCaseStudy;
