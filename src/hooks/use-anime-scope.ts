import { useEffect, useRef } from "react";
import { createScope } from "animejs";

export function useAnimeScope() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    return () => {
      scope.current?.revert();
    };
  }, []);

  const initScope = (setupFn: () => void) => {
    if (scope.current) return;
    scope.current = createScope({ root: root.current! }).add(setupFn);
  };

  return { root, initScope };
}
