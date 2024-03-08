import {
  useEffect,
  useRef,
} from "react";


function useEventListener(eventName: string, handler: any, element = window) {
  const savedHandler = useRef<any>();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const eventListener = (event: any) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export { useEventListener };
