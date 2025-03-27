import CategoryCard from "./categoryCard/CategoryCard";

export default function CategorySection() {
  return (
    <div className="w-full font-fira-sans-condensed px-6 sm:px-8 md:px-12 py-8 md:mb-14">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
        Shop By Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        <CategoryCard image="/lovable-uploads/CAT3.png" title="Pots" />
        <CategoryCard image="/lovable-uploads/CAT2.png" title="Plants" />
        <CategoryCard image="/lovable-uploads/CAT1.png" title="Seeds" />
      </div>
    </div>
  );
}
