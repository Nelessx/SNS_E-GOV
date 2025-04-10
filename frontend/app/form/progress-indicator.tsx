import { CheckCircle2 } from "lucide-react"

interface ProgressIndicatorProps {
  steps: string[]
  currentStep: number
  validSteps: Record<number, boolean>
}

export default function ProgressIndicator({ steps, currentStep, validSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile progress indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium">{steps[currentStep]}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Desktop progress indicator */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute top-4 w-full h-0.5 bg-gray-200"></div>
          <ul className="relative flex justify-between">
            {steps.map((step, index) => (
              <li key={index} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index < currentStep
                      ? "bg-primary text-white"
                      : index === currentStep
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                  } z-10`}
                >
                  {index < currentStep && validSteps[index] ? (
                    <CheckCircle2 className="w-8 h-8" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs ${index <= currentStep ? "text-primary font-medium" : "text-gray-500"}`}>
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
