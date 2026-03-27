import { motion } from 'framer-motion'
import { CheckIcon } from './Icons.jsx'

export default function Step1Dates({ combo, selectedDates, onToggleDate }) {
  const minDatas = combo.minDatas
  const maxDatas = combo.maxDatas
  const count = selectedDates.length
  const limitReached = count >= maxDatas

  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      {/* Header text */}
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold text-neutral-900">
          Escolha entre {minDatas} e {maxDatas} datas
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            {count} de {maxDatas} selecionadas
          </p>
        </div>
      </div>

      {/* Date list */}
      <div className="flex flex-col gap-3">
        {combo.datas.map((data) => {
          const isSelected = selectedDates.includes(data.id)
          const isDisabled = !isSelected && limitReached
          const isObrigatoria = data.obrigatoria

          return (
            <motion.button
              key={data.id}
              onClick={() => onToggleDate(data.id)}
              disabled={isDisabled && !isObrigatoria}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 text-left

                ${isObrigatoria ? 'bg-[#f4f4f4] border-[#E9E9EA]':''}
                ${!isSelected
                  ? isDisabled
                    ? 'border-neutral-200 bg-neutral-50 opacity-50'
                    : 'border-neutral-200 bg-white active:bg-neutral-50'
                  : 'border-brand bg-red-50'
                }`}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-150 border
                  ${isSelected
                    ? isObrigatoria
                      ? 'bg-[#FAFAFA] border-[#D6D7D8]'
                      : 'bg-brand border-brand'
                    : 'bg-white border-neutral-300'
                  }`}
              >
                {isSelected && <CheckIcon size={12}
                  className={`${isObrigatoria
                      ? 'text-[#D6D7D8]'
                      : 'text-white'
                  }`} />}
              </div>

              {/* Date info */}
              <div className="flex-1 flex items-center gap-2">
                <span className={`text-sm font-semibold ${isDisabled ? 'text-neutral-400' : 'text-neutral-900'}`}>
                  {data.data}
                </span>
                <span className="text-neutral-300">•</span>
                <span className={`text-sm font-medium ${isDisabled ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {data.hora}
                </span>
              </div>

              {/* Mandatory badge */}
              {isObrigatoria && (
                <span className="text-[11px] font-medium text-neutral-500 border bg-white px-2 py-0.5 rounded-full">
                  Obrigatória
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
