import imageServices from "../../services/images";
import ImageGallery from "./components/ImageGallery";

const Gallery = () => {
  return <ImageGallery request={imageServices.getImagesByPage} />;
};

export default Gallery;
