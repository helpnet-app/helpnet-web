import { useState } from "react";

export function useTabs(defaultStep = 0) {
  const [currentStep, setCurrentStep] = useState(defaultStep);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function backStep() {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }

  function skipTo(index: number) {
    if (index === currentStep || index < 0) return;
    setCurrentStep(index);
  }

  function isTab(index: number) {
    return currentStep === index;
  }

  return { nextStep, backStep, skipTo, isTab };
}
