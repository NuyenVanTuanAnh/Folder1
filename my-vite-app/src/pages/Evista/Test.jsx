import React, { useState } from "react";
import { useGallary } from "../../components/context/GallaryContext";
import { div } from "framer-motion/client";

const Test = () => {
  const { photos } = useGallary();
  console.log(photos);

  return (
    <div className="py-8 px-3">
      <div className="grid grid-cols-4 gap-4">
        {photos.length > 0 &&
          photos.map((items) => (
            <PhotoItem key={items.id} info={items}></PhotoItem>
          ))}
      </div>
    </div>
  );
};

const PhotoItem = ({ info }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="">
      <div className="relative h-[300px] cursor-pointer group">
        <img
          src={info.url}
          alt=""
          className="w-full h-full rounded-md shadow-md object-cover"
        />

        <span
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 bg-black/30 backdrop-blur-md 
    border border-white/20 shadow-lg rounded-full p-1 
    text-white text-sm font-medium
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    transition-transform duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </span>
        <span
          className="absolute bottom-2 left-2 flex items-center gap-2 px-3 py-1
               bg-black/30 backdrop-blur-md border border-white/20 shadow-lg 
                 rounded-full text-white text-sm font-medium 
                 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                 transition-transform duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <button className="">Add to cart</button>
        </span>
      </div>
    </div>
  );
};

export default Test;
