import { CheckIcon } from './Icons.jsx'

export default function Stepper({ currentStep, totalSteps = 2 }) {
  return (
    <div className="flex items-center gap-0 w-full max-w-[200px] mx-auto">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1
        const isCompleted = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={stepNum} className="flex items-center flex-1">
            {/* Step circle */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${isCompleted ? 'bg-success' : isActive ? 'border-2 border-neutral-300 bg-white' : 'border border-neutral-300 bg-white'}
              `}
            >
              {isCompleted ? (
                <CheckIcon size={14} className="text-white" />
              ) : (
                <span className={`text-sm font-semibold ${isActive ? 'text-neutral-700' : 'text-neutral-400'}`}>
                  {stepNum}
                </span>
              )}
            </div>

            {/* Connector line (not after last step) */}
            {i < totalSteps - 1 && (
              <div className="flex-1 h-px mx-1 border-t border-dashed border-neutral-300" />
            )}
          </div>
        )
      })}
    </div>
  )
}
