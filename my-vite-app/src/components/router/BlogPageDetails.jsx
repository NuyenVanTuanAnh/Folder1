import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

const BlogPageDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  console.log({ slug });
  //fetching.com?slug=${slug}
  console.log(navigate);
  return (
    <div>
      <button
        onClick={() => navigate("/blog")}
        className="p-3 m-3 rounded-sm text-white bg-green-400"
      >
        Navigate to Blog Page
      </button>
    </div>
  );
};

export default BlogPageDetails;
