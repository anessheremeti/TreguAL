import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories, colors } from "../data/products";

function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  onFilterChange,
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    color: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryName) => {
    const updated = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((c) => c !== categoryName)
      : [...selectedCategories, categoryName];
    setSelectedCategories(updated);
    onFilterChange();
  };

  const handleColorChange = (colorName) => {
    const updated = selectedColors.includes(colorName)
      ? selectedColors.filter((c) => c !== colorName)
      : [...selectedColors, colorName];
    setSelectedColors(updated);
    onFilterChange();
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    if (newRange[0] <= newRange[1]) {
      setPriceRange(newRange);
      onFilterChange();
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-slate-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-white font-semibold text-base mb-4 hover:text-yellow-400 transition-colors"
        >
          Category
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.category ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.category && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat.name}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryChange(cat.name)}
                  className="w-4 h-4 rounded bg-slate-700 border border-slate-600 cursor-pointer accent-yellow-400"
                />
                <span className="ml-3 text-gray-300 text-sm group-hover:text-white transition-colors">
                  {cat.name}
                </span>
                <span className="ml-auto text-gray-500 text-xs">
                  ({cat.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="bg-slate-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection("color")}
          className="w-full flex items-center justify-between text-white font-semibold text-base mb-4 hover:text-yellow-400 transition-colors"
        >
          Color
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.color ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.color && (
          <div className="space-y-3">
            {colors.map((color) => (
              <label
                key={color.name}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color.name)}
                  onChange={() => handleColorChange(color.name)}
                  className="w-4 h-4 rounded bg-slate-700 border border-slate-600 cursor-pointer accent-yellow-400"
                />
                <div
                  className="w-4 h-4 rounded ml-3 border border-slate-600"
                  style={{ backgroundColor: color.code }}
                />
                <span className="ml-2 text-gray-300 text-sm group-hover:text-white transition-colors">
                  {color.name}
                </span>
                <span className="ml-auto text-gray-500 text-xs">
                  ({color.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-slate-800 rounded-lg p-4">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-white font-semibold text-base mb-4 hover:text-yellow-400 transition-colors"
        >
          Price
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 font-semibold">
                ${priceRange[0]}
              </span>
              <span className="text-gray-500">-</span>
              <span className="text-yellow-400 font-semibold">
                ${priceRange[1]}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-xs mb-2 block">
                  Min Price
                </label>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-2 block">
                  Max Price
                </label>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Button */}
      <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors">
        Filter
      </button>
    </div>
  );
}

export default FilterSidebar;
