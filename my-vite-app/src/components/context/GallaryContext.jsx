import { createContext, useContext, useState } from "react";

const GallaryContext = createContext();

const fakePhotos = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1728443433557-3fc9e37b58c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA==",
    isLiked: false,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1749217097611-38b1eed9c87f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLiked: false,
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1726066012618-f3b5fc6f6593?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLiked: false,
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1742626157052-f5a373a727ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTB8fHxlbnwwfHx8fHw%3D",
    isLiked: false,
  },
  {
    id: "5",
    url: "https://plus.unsplash.com/premium_photo-1734549547834-5bdb0e12366f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLiked: false,
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1749224359039-dc8cbc62be8d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLiked: false,
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1749740565606-80a78d174569?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNjl8fHxlbnwwfHx8fHw%3D",
    isLiked: false,
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1743535363334-2841caa6130e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D",
    isLiked: false,
  },
];

function GallaryProvider(props) {
  const [photos, setPhotos] = useState(fakePhotos);
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const value = { photos, cart, like, setPhotos, setCart, setLike };
  return (
    <GallaryContext.Provider value={value} {...props}></GallaryContext.Provider>
  );
}

function useGallary() {
  const context = useContext(GallaryContext);
  if (context === undefined) {
    throw new Error("useGallary must be used within a GallaryProvider");
  }
  return context;
}

export { GallaryProvider, useGallary };
export default GallaryContext;
