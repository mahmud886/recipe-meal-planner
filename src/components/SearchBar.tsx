import type { CategoryOption } from '../utils/api'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: CategoryOption[]
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: SearchBarProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[2fr,1fr]">
      <div>
        <label className="mb-1 block text-xs font-medium text-[#4f7053]" htmlFor="search">
          Search recipes
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="e.g. chicken, pasta, curry"
          className="w-full rounded-md border border-[#CAE8BD] bg-white px-3 py-2 text-sm text-[#16341f] placeholder:text-[#7a997c] focus:border-[#B0DB9C] focus:outline-none focus:ring-1 focus:ring-[#B0DB9C]"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-[#4f7053]" htmlFor="category">
          Filter by category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-md border border-[#CAE8BD] bg-white px-3 py-2 text-sm text-[#16341f] focus:border-[#B0DB9C] focus:outline-none focus:ring-1 focus:ring-[#B0DB9C]"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
