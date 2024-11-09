import  { useEffect, useRef, useState } from "react";
import { useTea } from "~/drinktea/tea";
import { get_image } from "~/tool/get-images";

const LazyImage = ({ src = '', alt_src = '', alt = '', className = '', index = '', ...props }) => {
  const [loaded_src, set_loaded_src] = useTea.image_store[index]('')
  const [isInView, setIsInView] = useState(false); 
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target); 
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current); 
      }
    };
  }, []);


  const [fetched, set_fetched] = useState(false)
  useEffect(() => {
    const load_img = async (_src: string) => {
      const src = await get_image(_src)
      set_loaded_src(src)
      set_fetched(true)
    }

    if (isInView && !fetched) {
      load_img(src)
    }
  }, [isInView])

  return (
    <img
      ref={imgRef}
      src={loaded_src || alt_src} 
      
      alt={alt}
      {...props} 
      data-src={src} 
      className={className + ' relative hide-text' + (!fetched ? ' img-loading' : '')}
    />
  );
};

export default LazyImage;
