import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'

const CATEGORIES = ['All', 'Groceries', 'Repairs', 'Tutoring', 'Transport', 'Moving', 'Tech Help']
const urgencyColor = { high:'bg-red-100 text-red-600', med:'bg-amber-100 text-amber-600', low:'bg-green-100 text-green-600' }
const urgencyLabel = { high:'Urgent', med:'Moderate', low:'Flexible' }
const categoryIcon = { Groceries:'🛒', Repairs:'🔧', Tutoring:'📚', Transport:'🚗', Moving:'📦', 'Tech Help':'💻', Other:'📌' }

export default function BrowseNeeds() {
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getNeeds({}).then(data => {
      setNeeds(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  const filtered = needs.filter(n =>
    (category === 'All' || n.category === category) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-black text-4xl mb-1" style={{fontFamily:'Georgia,serif'}}>Community Needs</h1>
            <p className="text-gray-500">Browse and help with open requests in your community</p>
          </div>
          <Link to="/needs/post" className="px-6 py-3 bg-[#f4a261] text-white font-semibold rounded-full hover:bg-[#e76f51] transition-all hover:-translate-y-0.5">+ Post a Need</Link>
        </div>
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input type="text" placeholder="Search needs..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#e8e2d9] rounded-2xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={'px-4 py-2 rounded-full text-sm font-semibold transition-all ' + (category === cat ? 'bg-[#1a472a] text-white' : 'bg-white border border-[#e8e2d9] text-gray-600 hover:border-[#1a472a]')}>
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">⏳</div>
            <p className="font-semibold">Loading needs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(need => (
              <div key={need._id} className="bg-white border border-[#e8e2d9] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-semibold text-[#1a472a]">{categoryIcon[need.category] || '📌'} {need.category}</span>
                  <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + (urgencyColor[need.urgency] || 'bg-gray-100 text-gray-600')}>{urgencyLabel[need.urgency] || need.urgency}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 leading-snug" style={{fontFamily:'Georgia,serif'}}>{need.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{need.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#f4a261] flex items-center justify-center text-white text-xs font-bold">
                      {need.postedBy?.name?.split(' ').map(n=>n[0]).join('') || '?'}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{need.postedBy?.name || 'Anonymous'}</span>
                  </div>
                  <Link to={'/needs/' + need._id}
                    className={'text-xs font-semibold px-4 py-2 rounded-full transition-all ' + (need.status === 'Open' ? 'bg-[#1a472a] text-white hover:bg-[#2d6a4f]' : 'bg-gray-100 text-gray-400')}>
                    {need.status === 'Open' ? 'Help Now' : need.status}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold">No needs found</p>
          </div>
        )}
      </div>
    </div>
  )
}
