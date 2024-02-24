import { FormEvent, useRef } from "react";

export function useForm<DataType>(fn: (data: DataType) => void) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: any = {};
    for (const [key, value] of formData.entries()) {
      if (data[key] !== undefined && data[key] instanceof Object)
        data[key] = [...data[key], value];
      else if (data[key] !== undefined) data[key] = [data[key], value];
      else data[key] = value;
    }
    fn(data as DataType);
  }

  return { formRef, handleSubmit };
}
