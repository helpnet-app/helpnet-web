import { ChangeEvent, useState } from "react";

export function useInputDelay(fn: (value: string) => void, delay = 1000) {
  const [timeout, setTimeoutElement] = useState<number>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (timeout) clearTimeout(timeout);
    const newTimeout = setTimeout(() => fn(value), delay);
    setTimeoutElement(newTimeout);
  }

  return { handleChange };
}
