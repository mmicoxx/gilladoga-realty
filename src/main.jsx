import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUpRight, BedDouble, Bath, Building2, ChevronDown, MapPin, MoveRight, Search, ShieldCheck, Square, X } from 'lucide-react'
import './styles.css'

const properties = [
  { id: 1, type: 'For Sale', name: 'The Grove Residence', place: 'Tagaytay, Cavite', price: 'P18.5M', beds: 4, baths: 3, area: '286 sqm', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85' },
  { id: 2, type: 'For Sale', name: 'Solana Townhome', place: 'Nuvali, Laguna', price: 'P9.8M', beds: 3, baths: 2, area: '154 sqm', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85' },
  { id: 3, type: 'For Lease', name: 'Atria Sky Suite', place: 'BGC, Taguig', price: 'P85K / mo', beds: 2, baths: 2, area: '96 sqm', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' },
  { id: 4, type: 'For Sale', name: 'Casa Amara', place: 'Alabang, Muntinlupa', price: 'P32M', beds: 5, baths: 4, area: '420 sqm', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85' },
]

function App() {
  const [activeType, setActiveType] = useState('All homes')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const filtered = properties.filter((property) =>
    (activeType === 'All homes' || property.type === activeType) &&
    `${property.name} ${property.place}`.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal, .property-card, .numbers')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const scrollToListings = () => document.querySelector('#listings').scrollIntoView({ behavior: 'smooth' })
  const navigateTo = (sectionId, activeId = sectionId) => (event) => {
    event.preventDefault()
    setActiveSection(activeId)
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return <>
    <header className="site-header">
      <a className="brand" href="#top" onClick={navigateTo('#top')} aria-label="Gilladoga Realty home"><img src="/logo.png" alt="Gilladoga Realty" /></a>
      <nav aria-label="Main navigation"><a className={activeSection === '#top' ? 'nav-active' : ''} href="#top" onClick={navigateTo('#top')}>Home</a><a className={activeSection === '#about' ? 'nav-active' : ''} href="#why-us" onClick={navigateTo('#why-us', '#about')}>About</a><a className={activeSection === '#listings' ? 'nav-active' : ''} href="#listings" onClick={navigateTo('#listings')}>Properties</a><a className={activeSection === '#why-us' ? 'nav-active' : ''} href="#why-us" onClick={navigateTo('#why-us')}>Services</a></nav>
      <a className="header-cta" href="#contact" onClick={navigateTo('#contact')}><span>Sign Up</span><i><ArrowRight size={17} /></i></a>
    </header>

    <main id="top">
      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=2200&q=90" alt="Modern family home with a pool" />
        <div className="hero-wash" />
        <div className="hero-copy reveal">
          <p className="eyebrow">GILLADOGA REALTY / FIND YOUR NEXT ADDRESS</p>
          <h1>Discover Homes<br />That Truly Fit<br /><em>Your Lifestyle</em></h1>
          <p className="intro">The right home is more than a property. It is a place that makes everyday life feel right.</p>
          <a className="hero-link" href="#listings" onClick={navigateTo('#listings')}>Explore the collection <ArrowUpRight size={17} /></a>
        </div>
        <div className="search-panel reveal delay-2">
          <div className="search-tabs">
            {['All homes', 'For Sale', 'For Lease'].map((type) => <button key={type} className={activeType === type ? 'active' : ''} onClick={() => setActiveType(type)}>{type}</button>)}
          </div>
          <div className="search-controls">
            <label><MapPin size={18} /><span>Location</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where would you like to live?" /></label>
            <button className="select-control">Property type <ChevronDown size={16} /></button>
            <button className="select-control">Price range <ChevronDown size={16} /></button>
            <button className="search-button" onClick={scrollToListings} aria-label="Search properties"><Search size={21} /></button>
          </div>
        </div>
        <div className="hero-note">Scroll to explore <span /></div>
        <div className="hero-index"><b>01</b><span>04</span></div>
      </section>

      <section className="intro-band reveal">
        <div><p className="eyebrow">A DIFFERENT KIND OF SEARCH</p><h2>Not just square meters.<br /><span>A sense of arrival.</span></h2></div>
        <div className="intro-side"><p>We look beyond the listing sheet to find the light, rhythm, and neighborhood that make a property feel like yours.</p><a href="#why-us" onClick={navigateTo('#why-us')} className="text-link">Meet your property partners <MoveRight size={18} /></a></div>
      </section>

      <section className="listings reveal" id="listings">
        <div className="section-heading"><div><p className="eyebrow">THE COLLECTION / 04 HOMES</p><h2>Places with presence.</h2></div><button className="view-all" onClick={() => { setActiveType('All homes'); setQuery('') }}>View all properties <ArrowRight size={17} /></button></div>
        <div className="property-grid">
          {filtered.map((property, index) => <article className="property-card" style={{ '--card-delay': `${index * 90}ms` }} key={property.id}>
            <button className="property-image" onClick={() => setSelected(property)}><img src={property.image} alt={property.name} /><span>{property.type}</span></button>
            <div className="property-info"><p>{property.place}</p><h3>{property.name}</h3><strong>{property.price}</strong><div className="facts"><span><BedDouble size={16} />{property.beds} beds</span><span><Bath size={16} />{property.baths} baths</span><span><Square size={15} />{property.area}</span></div></div>
          </article>)}
        </div>
        {!filtered.length && <p className="empty">No homes match that search. Try another location.</p>}
      </section>

      <section className="numbers reveal"><div><strong>18</strong><span>years of<br />local insight</span></div><div><strong>240+</strong><span>families<br />guided home</span></div><div><strong>06</strong><span>cities<br />we know deeply</span></div><p>Good property decisions<br /><em>start with good questions.</em></p></section>

      <section className="why-us" id="why-us">
        <div className="why-image"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1300&q=85" alt="Gilladoga Realty consultants in a bright office" /></div>
        <div className="why-copy"><p className="eyebrow">OUR APPROACH</p><h2>Clear guidance at every turn.</h2><p>Whether you are buying your first home, growing an investment portfolio, or placing a property on the market, our local expertise keeps every decision straightforward.</p><div className="service-list"><div><Building2 /><span><b>Thoughtful matching</b><small>Homes selected around your life, not just a list.</small></span></div><div><MapPin /><span><b>Local intelligence</b><small>Practical insight into the places you are considering.</small></span></div></div><a className="text-link" href="#contact" onClick={navigateTo('#contact')}>How we can help <MoveRight size={18} /></a></div>
      </section>

      <section className="contact" id="contact"><div className="contact-intro"><p className="eyebrow">THE GILLADOGA CONCIERGE</p><h2>Your next chapter<br /><em>starts here.</em></h2><p>Tell us what you are looking for. We will bring the shortlist, the local context, and a calm second opinion.</p><div className="contact-promise"><ShieldCheck size={18} /><span><b>Private, personal, practical.</b><small>Expect a thoughtful reply within one working day.</small></span></div></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><div className="form-heading"><span>01</span><b>Tell us a little about you</b></div><label>Your name<input required placeholder="Juan dela Cruz" /></label><label>Email address<input type="email" required placeholder="you@email.com" /></label><label>I'm interested in<select defaultValue=""><option value="" disabled>Select an option</option><option>Buying a property</option><option>Selling a property</option><option>Leasing a property</option></select></label><button type="submit">{submitted ? 'Message received' : 'Begin the conversation'} <ArrowRight size={18} /></button></form></section>
    </main>
    <footer><a className="brand" href="#top" onClick={navigateTo('#top')}><img src="/logo.png" alt="Gilladoga Realty" /></a><p>Good places, well found. © 2026 Gilladoga Realty</p><div><a href="#top">Instagram</a><a href="#top">Facebook</a></div></footer>
    {selected && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={selected.name} onClick={() => setSelected(null)}><section className="property-modal" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setSelected(null)} aria-label="Close property details"><X /></button><img src={selected.image} alt={selected.name} /><div><p className="eyebrow">{selected.place}</p><h2>{selected.name}</h2><strong>{selected.price}</strong><p>{selected.beds} bedrooms · {selected.baths} bathrooms · {selected.area}</p><a href="#contact" onClick={() => setSelected(null)}>Inquire about this home <ArrowRight size={17} /></a></div></section></div>}
  </>
}

createRoot(document.getElementById('root')).render(<App />)