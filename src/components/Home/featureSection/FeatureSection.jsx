import { FeatureCard } from "./featureCard/FeatureCard";

export default function FeatureSection() {
  return (
    <div className="w-full mx-auto px-6 sm:px-8 md:px-12 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        <FeatureCard
          title="Fast Delivery"
          icon="/lovable-uploads/Vector3.svg"
        />

        <FeatureCard
          title="Safe Purchase"
          icon="/lovable-uploads/Vector2.svg"
        />

        <FeatureCard title="After Care" icon="/lovable-uploads/Vector1.svg" />
      </div>
    </div>
  );
}
