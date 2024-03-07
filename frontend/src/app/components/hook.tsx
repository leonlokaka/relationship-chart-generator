import React, {
  MutableRefObject,
  useCallback,
} from "react";
import { useSwiperSlide } from "swiper/react";

function useGetAosRefList(length: number) {
  const aosRefList = React.useRef<any>([]);
  aosRefList.current = Array(length)
    .fill(null)
    .map((item, i) => aosRefList.current[i] ?? React.createRef());

  return aosRefList;
}

function useSwiperAosCoordinator(aosRefs: MutableRefObject<any>) {
  const swiperSlide = useSwiperSlide();
  const handleSwiperChange = useCallback(
    function handleSwiperChange() {
      if (!aosRefs.current) return;

      if (swiperSlide.isActive) {
        // manual trigger
        for (let i = 0; i < aosRefs.current.length; i++) {
          if (
            aosRefs.current[i].current &&
            !aosRefs.current[i].current.classList.contains("aos-animate")
          )
            aosRefs.current[i].current.classList.add("aos-animate");
        }
      } else {
        for (let i = 0; i < aosRefs.current.length; i++) {
          if (
            aosRefs.current[i].current &&
            aosRefs.current[i].current.classList.contains("aos-animate")
          )
            aosRefs.current[i].current.classList.remove("aos-animate");
        }
      }
    },
    [aosRefs, swiperSlide.isActive]
  );

  React.useEffect(() => {
      handleSwiperChange();
  }, [handleSwiperChange, swiperSlide]);

  return;
}

export { useSwiperAosCoordinator, useGetAosRefList };
