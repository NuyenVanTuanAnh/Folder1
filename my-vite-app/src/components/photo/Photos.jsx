import React, { useEffect } from "react";
import axios from "axios"; // Importing axios for potential future use

const getRandomPhotos = async (page) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=10`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Photos = () => {
  const [randomPhotos, setRandomPhotos] = React.useState([]);
  const [loadPage, setLoadPage] = React.useState(1);

  const handleLoadMore = async () => {
    try {
      const images = await getRandomPhotos(loadPage);
      setRandomPhotos((prevPhotos) => [...prevPhotos, ...images]);
      setLoadPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more photos:", error);
    }
  };

  useEffect(() => {
    document.title = "Photos";
    const fetchInitialPhotos = async () => {
      try {
        const images = await getRandomPhotos(1);
        setRandomPhotos(images);
        setLoadPage(2);
      } catch (error) {
        console.error("Error loading initial photos:", error);
      }
    };
    fetchInitialPhotos();
  }, []);
  return (
    <div className="grid grid-cols-5 gap-4 p-10">
      {randomPhotos.map((item, index) => (
        <div
          key={index}
          className="w-fit p-3 bg-amber-50 shadow-md rounded-2xl"
        >
          <img
            src={item.download_url}
            alt={item.author}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      ))}
      <div className="text-center col-span-5">
        <button
          onClick={handleLoadMore}
          className="inline-block px-8 py-4 cursor-pointer text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Photos;
