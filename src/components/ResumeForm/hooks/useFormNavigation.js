import { useState } from "react";

const useFormNavigation = (initialStep = 1, maxStep = 8) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const markStepCompleted = (stepNumber) => {
    setCompletedSteps((prev) => new Set([...prev, stepNumber]));
  };

  const handleNext = () => {
    markStepCompleted(currentStep);
    if (currentStep < maxStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTabClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  return {
    currentStep,
    completedSteps,
    setCurrentStep,
    setCompletedSteps,
    handleNext,
    handleBack,
    handleTabClick,
    markStepCompleted,
  };
};

export default useFormNavigation;
