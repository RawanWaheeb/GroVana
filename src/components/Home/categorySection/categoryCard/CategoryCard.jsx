import { NavLink } from "react-router-dom";


export default function CategoryCard({ image, title }) {
  return (
    <NavLink href="#" className="flex flex-col items-center gap-3 sm:gap-4">
      <img
        src={image}
        alt={title}
        className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] h-[250px] sm:h-[280px] md:h-[300px] object-cover rounded-lg shadow-lg"
      />
      <h3 className="text-xl sm:text-2xl font-medium text-[#2E5B41] text-center">
        {title}
      </h3>
    </NavLink>
  );
}
