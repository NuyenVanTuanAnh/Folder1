// import { data } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const HackerNews = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(true);
  const handleFetchdata = useRef(() => {});
  handleFetchdata.current = async () => {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${query}`
    );
    console.log(response.data?.hits);
    setHits(response.data?.hits || []);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchdata.current();
  }, [query]);
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6">
      {/* Input search */}
      <input
        type="text"
        placeholder="Tìm kiếm bài viết về React..."
        className="w-full px-5 py-3 border border-teal-300 rounded-xl text-gray-800 text-base shadow focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin shadow-md"></div>
        </div>
      )}

      {/* Kết quả */}
      {!loading && hits.length > 0 && (
        <div className="space-y-4">
          {hits.map((item) => (
            <div
              key={item.objectID}
              className="p-4 border border-gray-300 rounded-xl shadow hover:shadow-lg transition duration-200 bg-gray-50"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 font-medium hover:underline"
              >
                {item.title || "Không có tiêu đề"}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Không có kết quả */}
      {!loading && hits.length === 0 && query.trim() && (
        <p className="text-center text-gray-500">
          Không tìm thấy kết quả phù hợp.
        </p>
      )}
    </div>
  );
};

export default HackerNews;
