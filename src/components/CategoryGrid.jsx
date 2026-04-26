import { useMemo } from 'react'
import CategoryTile from './CategoryTile'

const CATEGORY_ORDER = [
  'entra', 'intune', 'exchange', 'autopilot',
  'purview', 'azure', 'graph', 'licensing',
  'sharepoint', 'onedrive', 'teams', 'm365apps',
]

export default function CategoryGrid({ errors, onCategoryClick }) {
  const countByCategory = useMemo(
    () =>
      errors.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + 1
        return acc
      }, {}),
    [errors],
  )

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <span className="section-title">Browse by product</span>
        <div className="section-line" />
      </div>

      <div className="category-grid">
        {CATEGORY_ORDER.map((cat, i) => (
          <CategoryTile
            key={cat}
            category={cat}
            count={countByCategory[cat] || 0}
            onClick={() => onCategoryClick(cat)}
            animDelay={`${0.1 + i * 0.05}s`}
          />
        ))}
      </div>
    </>
  )
}
