import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function FilterSidebar({
  categories = [],
  selectedCategories,
  setSelectedCategories,
  onFilterChange,
}) {
  const [expanded, setExpanded] = useState(true);

  const toggleSection = () => setExpanded((prev) => !prev);

  const handleCategoryChange = (categoryId) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updated);
    onFilterChange();
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-4">
        <button
          onClick={toggleSection}
          className="w-full flex items-center justify-between text-white font-semibold text-base mb-4 hover:text-yellow-400 transition-colors"
        >
          Category
          <ChevronDown
            size={20}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat.categoryId}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.categoryId)}
                  onChange={() => handleCategoryChange(cat.categoryId)}
                  className="w-4 h-4 rounded bg-slate-700 border border-slate-600 cursor-pointer accent-yellow-400"
                />
                <span className="ml-3 text-gray-300 text-sm group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSidebar;
