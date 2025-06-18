import React from "react";
import { useSearchParams } from "react-router-dom";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return <div>Blog Page</div>;
};

export default BlogPage;
