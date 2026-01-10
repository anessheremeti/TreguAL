import { ChevronRight } from "lucide-react";
import React, { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Sidebar() {

  const {
    data: categories = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("http://localhost:5104/api/category");

  const {
    data: posts = [],
    loading: postsLoading,
    error: postsError,
  } = useFetch("http://localhost:5104/api/posts");

  
  const categoryStats = useMemo(() => {
    if (!categories?.length || !posts?.length) {
      return {
        visibleCategories: [],
        othersCount: 0,
      };
    }

    // Count posts per category
    const postCountMap = posts.reduce((acc, post) => {
      const categoryName = post.category || "Uncategorized";
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {});

    // Attach count to categories
    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      count: postCountMap[cat.name] || 0,
    }));

    // Sort by count DESC
    const sortedCategories = categoriesWithCount.sort(
      (a, b) => b.count - a.count
    );

    // Top 10 categories
    const visibleCategories = sortedCategories.slice(0, 10);

    // Others count (sum of remaining)
    const othersCount = sortedCategories
      .slice(10)
      .reduce((sum, cat) => sum + cat.count, 0);

    return {
      visibleCategories,
      othersCount,
    };
  }, [categories, posts]);

  return (
    <div className="space-y-8">
     
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">
          Category
        </h3>

        {categoriesLoading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {categoriesError && (
          <p className="text-red-500">
            Failed to load categories
          </p>
        )}

        {!categoriesLoading && !categoriesError && (
          <div className="space-y-3">
            {categoryStats.visibleCategories.map((cat) => (
              <a
                key={cat.category_id ?? cat.id}
                href="#"
                className="flex items-center justify-between text-gray-400 hover:text-cyan-400 transition group"
              >
                <span className="text-sm">
                  {cat.name} 
                </span>

                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />
              </a>
            ))}

            {categoryStats.othersCount > 0 && (
              <div className="flex items-center justify-between text-gray-500 font-semibold pt-2 border-t border-slate-700">
                <span className="text-sm">
                  Others ({categoryStats.othersCount})
                </span>

                <ChevronRight size={16} />
              </div>
            )}
          </div>
        )}
      </div>

      
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-6">
          Recent posts
        </h3>

        {postsLoading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {postsError && (
          <p className="text-red-500">
            Failed to load posts
          </p>
        )}

        {!postsLoading && !postsError && (
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <Link
                key={post.postId}
                to={`/product-details/${post.postId}`}
                className="block text-gray-400 hover:text-cyan-400 transition text-sm leading-relaxed"
              >
                {post.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
