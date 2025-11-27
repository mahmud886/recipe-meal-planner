interface ShoppingItem {
  key: string
  name: string
  measure: string
}

interface ShoppingListPanelProps {
  items: ShoppingItem[]
  isGenerating: boolean
  error: string | null
  onGenerate: () => void
  completedMap: Record<string, boolean>
  onToggle: (key: string) => void
  onClearCompleted: () => void
}

export function ShoppingListPanel({
  items,
  isGenerating,
  error,
  onGenerate,
  completedMap,
  onToggle,
  onClearCompleted,
}: ShoppingListPanelProps) {
  const hasCompleted = Object.values(completedMap).some(Boolean)

  return (
    <section className="space-y-3 rounded-xl border border-[#CAE8BD] bg-white/80 p-3 shadow-sm shadow-[#ECFAE5]">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#16341f]">Shopping list</h2>
          <p className="text-xs text-[#4f7053]">Generated from your planned meals.</p>
        </div>
        <button
          type="button"
          disabled={isGenerating}
          onClick={onGenerate}
          className="rounded-md bg-[#B0DB9C] px-3 py-1.5 text-xs font-medium text-[#16341f] disabled:cursor-not-allowed disabled:bg-[#B0DB9C]/70"
        >
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {items.length === 0 ? (
        <p className="text-xs text-[#4f7053]">
          No items yet. Plan some meals and generate the shopping list.
        </p>
      ) : (
        <>
          <ul className="max-h-52 space-y-1 overflow-y-auto text-xs">
            {items.map((item) => {
              const completed = completedMap[item.key] ?? false
              return (
                <li
                  key={item.key}
                  className="flex items-center justify-between gap-2 rounded border border-[#CAE8BD] bg-[#ECFAE5] px-2 py-1"
                >
                  <label className="flex flex-1 cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={() => onToggle(item.key)}
                      className="h-3 w-3 rounded border-[#B0DB9C] bg-white text-[#4f7053]"
                    />
                    <span
                      className={`flex-1 ${
                        completed ? 'text-[#7a997c] line-through' : 'text-[#16341f]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </label>
                  <span className="text-[11px] text-[#4f7053]">{item.measure}</span>
                </li>
              )
            })}
          </ul>
          <div className="flex justify-end">
            <button
              type="button"
              disabled={!hasCompleted}
              onClick={onClearCompleted}
              className="text-[11px] text-[#4f7053] hover:text-[#16341f] disabled:cursor-not-allowed disabled:text-[#B0DB9C]"
            >
              Clear completed
            </button>
          </div>
        </>
      )}
    </section>
  )
}
