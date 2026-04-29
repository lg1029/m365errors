import { useState } from 'react'
import { errors } from './data/errors'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import CategoryGrid from './components/CategoryGrid'
import CategoryView from './components/CategoryView'
import StatsRow from './components/StatsRow'
import Footer from './components/Footer'
import SubmitError from './components/SubmitError'

export default function App() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState('home')
  const [activeCategory, setActiveCategory] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)

  const handleCategoryClick = (cat) => {
    setView('category')
    setActiveCategory(cat)
    setQuery('')
    setExpandedCard(null)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setView('home')
    setActiveCategory(null)
    window.scrollTo(0, 0)
  }

  const handleSubmitView = () => {
    setView('submit')
    setQuery('')
    window.scrollTo(0, 0)
  }

  const handleSearchSelect = (error) => {
    setQuery('')
    setView('category')
    setActiveCategory(error.category)
    setExpandedCard(error.id)
    window.scrollTo(0, 0)
  }

  const handleToggleCard = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id))
  }

  const showSearch = query.trim().length > 0

  return (
    <>
      <Navbar onHome={handleBack} onSubmit={handleSubmitView} />

      {view === 'submit' ? (
        <SubmitError onBack={handleBack} />
      ) : view === 'category' ? (
        <CategoryView
          category={activeCategory}
          errors={errors}
          expandedCard={expandedCard}
          onToggleCard={handleToggleCard}
          onBack={handleBack}
        />
      ) : (
        <>
          {/* Hero section — white bg, border-bottom */}
          <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
            <Hero onPillClick={setQuery} />
            <div
              className="max-w-[560px] mx-auto px-6 pb-14"
              style={{ animation: 'fadeUp 0.4s 0.24s ease both' }}
            >
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search by error code or description..."
              />
              {!showSearch && (
                <p
                  className="text-center mt-2 text-xs"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.02em',
                  }}
                >
                  Try: AADSTS53000 &nbsp;·&nbsp; 0x800705b4 &nbsp;·&nbsp; 550 5.1.1
                </p>
              )}
            </div>
          </section>

          {/* Below hero — search results or category grid */}
          <main className="max-w-[1200px] mx-auto px-12 py-12">
            {showSearch ? (
              <SearchResults query={query} errors={errors} onSelect={handleSearchSelect} />
            ) : (
              <>
                <CategoryGrid errors={errors} onCategoryClick={handleCategoryClick} />
                <StatsRow />
              </>
            )}
          </main>
        </>
      )}

      <Footer />
    </>
  )
}
