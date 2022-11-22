import { useEffect, useRef } from "react";

// Hook custom sự kiện
export const useEventListener = (
  eventName,
  handler,
  element = window,
  condition = true,
  delay = 100
) => {
  const savedHandler = useRef(); // ref chứa hàm xử lý

  useEffect(() => {
    savedHandler.current = handler; // lưu hàm xử lý vào ref
  }, [handler]);

  useEffect(() => {
    // kiểm tra có thể khởi tạo sự kiện lắng nghe event
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);

    if (!!condition) {
      // điều kiện sử dụng hàm lắng nghe sự kiện
      setTimeout(() => {
        element.addEventListener(eventName, eventListener);
      }, delay);
    } else {
      element.removeEventListener(eventName, eventListener);
    }
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, element, condition]);
};
