import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { areas, categories, stores } from '../data'
import { EmptyState, Icon, StoreCard, StoreVisual } from '../components'

export function StoresPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('전체')
  const [area, setArea] = useState('전체 지역')
  const filtered = useMemo(() => stores.filter(store => {
    const text = `${store.name} ${store.category} ${store.area} ${store.description} ${store.tags.join(' ')}`.toLocaleLowerCase()
    return text.includes(query.trim().toLocaleLowerCase()) && (category === '전체' || store.category === category) && (area === '전체 지역' || store.area === area)
  }), [query, category, area])

  return <>
    <section className="hero"><div className="shell hero-inner"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-line"/> LOCAL CONNECTION, MADE SIMPLE</span><h1>우리 동네의 좋은 곳,<br/><em>모아</em>서 만나보세요.</h1><p>취향에 맞는 매장을 발견하고 필요한 것을 편하게 물어보세요.<br className="desktop-break"/> 좋은 연결은 여기서 시작됩니다.</p><a href="#explore" className="button button-dark hero-button">매장 둘러보기 <Icon name="arrow" size={18}/></a><div className="hero-stats"><div><strong>06</strong><span>엄선된 매장</span></div><div><strong>04</strong><span>다양한 카테고리</span></div><div><strong>01</strong><span>쉬운 연결</span></div></div></div><div className="hero-art" aria-hidden="true"><div className="hero-circle circle-back"/><div className="hero-circle circle-front"/><div className="hero-flower">✳</div><span className="hero-stamp">GOOD PLACES<br/>GOOD CONNECTIONS</span><span className="hero-small-star">✦</span></div></div></section>
    <section id="explore" className="browse-section shell"><div className="section-heading"><div><span className="section-kicker">DISCOVER LOCAL</span><h2>지금, 당신을 기다리는 곳</h2><p>가까운 곳에서 새로운 경험을 발견해 보세요.</p></div><span className="result-count">총 <b>{filtered.length}</b>개의 매장</span></div>
      <div className="filter-panel"><label className="search-box"><Icon name="search" size={21}/><input aria-label="매장 검색" value={query} onChange={event => setQuery(event.target.value)} placeholder="매장 이름이나 원하는 서비스를 검색해 보세요"/></label><label className="select-wrap"><Icon name="pin" size={18}/><select aria-label="지역 선택" value={area} onChange={event => setArea(event.target.value)}>{areas.map(item => <option key={item}>{item}</option>)}</select></label></div>
      <div className="category-tabs" aria-label="카테고리 필터">{categories.map(item => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      {filtered.length ? <div className="store-grid">{filtered.map(store => <StoreCard key={store.id} store={store}/>)}</div> : <EmptyState title="검색 결과가 없어요" description="다른 검색어나 조건으로 다시 찾아보세요."/>}
    </section>
    <section className="how-section"><div className="shell how-inner"><div><span className="section-kicker">HOW IT WORKS</span><h2>찾고, 물어보고,<br/>연결되세요.</h2></div><div className="how-steps"><div><span>01</span><h3>매장 찾기</h3><p>원하는 지역과 카테고리에서 매장을 둘러보세요.</p></div><div><span>02</span><h3>편하게 문의하기</h3><p>궁금한 점을 남기면 매장에 전달할 내용을 정리할 수 있어요.</p></div><div><span>03</span><h3>답변 확인하기</h3><p>내 문의에서 답변과 진행 상태를 확인하세요.</p></div></div></div></section>
  </>
}

export function StoreDetailPage() {
  const { id } = useParams()
  const store = stores.find(item => item.id === id)
  if (!store) return <div className="shell page-content"><EmptyState title="매장을 찾을 수 없어요" description="주소를 확인하거나 다른 매장을 둘러보세요." actionLabel="매장 목록으로" actionTo="/stores"/></div>
  return <div className="shell detail-page"><Link to="/stores" className="back-link">← &nbsp;매장 목록으로</Link><div className="detail-hero"><StoreVisual store={store} large/></div><div className="detail-layout"><article className="detail-main"><div className="detail-meta"><span>{store.category}</span><span>·</span><span>{store.area}</span>{store.featured && <span className="detail-featured">추천 매장</span>}</div><h1>{store.name}</h1><p className="detail-subtitle">{store.description}</p><div className="detail-rating"><span>★</span> {store.rating.toFixed(1)} <small>리뷰 {store.reviewCount}개</small></div><div className="detail-divider"/><section><h2>매장 소개</h2><p className="detail-description">{store.longDescription}</p></section><section className="detail-section"><h2>이런 서비스를 제공해요</h2><div className="tag-list">{store.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section></article><aside className="contact-card"><span className="contact-kicker">LET'S CONNECT</span><h2>궁금한 점이<br/>있으신가요?</h2><p>문의 내용을 남기고 답변을 확인해 보세요.</p><Link to={`/stores/${store.id}/inquiry`} className="button button-accent">이 매장에 문의하기 <Icon name="arrow" size={18}/></Link><div className="contact-details"><div><Icon name="pin" size={18}/><span>{store.address}</span></div><div><Icon name="clock" size={18}/><span>{store.hours}</span></div><div><Icon name="phone" size={18}/><span>{store.phone}</span></div></div><p className="demo-note">현재는 데모 서비스로, 실제 매장으로 문의가 전송되지 않습니다.</p></aside></div></div>
}
