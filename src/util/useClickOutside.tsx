import { useEffect, useRef } from "react";
import { toUSVString } from "util";

export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLDivElement | HTMLButtonElement;
      if (event.target === ref.current) {
        return;
      }

      if (target?.contains(ref.current) && target !== ref.current) {
        console.log("clicked outside");
        callback();
      }
    }

    window && window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window &&
        window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [callback, ref.current]);

  return ref;
}
