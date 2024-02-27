import { useRef } from "react";

export function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openDialog() {
    dialogRef.current?.show();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return { dialogRef, openDialog, closeDialog };
}
