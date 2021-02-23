import {
  useCallback,
  useEffect,
  useRef,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

export default function useDebounce<T>(
  delay: number,
  initialValue?: T | (() => T)
): [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>,
  boolean,
  T | undefined
] {
  const [after, dispatchAfter] = useState<T>();
  const [next, dispatchNext] = useState<T>();
  const [waiting, setWaiting] = useState(false);
  const previous = useRef<number>();
  const clear = useCallback(() => {
    if (previous.current) {
      clearTimeout(previous.current);
    }
  }, []);

  const setValue = useCallback<Dispatch<SetStateAction<T | undefined>>>(
    (value: SetStateAction<T | undefined>) => {
      clear();
      dispatchNext(value);
      previous.current = setTimeout(() => {
        dispatchAfter(value);
        setWaiting(false);
      }, delay);
      setWaiting(true);
    },
    [clear, delay]
  );

  useEffect(() => {
    dispatchNext(initialValue);
    dispatchAfter(initialValue);
    setWaiting(false);
  }, [initialValue, setValue]);
  useEffect(() => clear, [clear]);

  return [after, setValue, waiting, next];
}
