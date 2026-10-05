import { Link, NavLink, useLocation } from 'react-router'
import { stores } from './data'
import type { Inquiry, InquiryStatus, Store } from './types'

export function Icon({ name, size = 20 }: { name: 'search' | 'arrow' | 'pin' | 'clock' | 'phone' | 'chevron' | 'mail' | 'check' | 'spark' | 'menu'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5"/></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    phone: <><path d="M8 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 3a15 15 0 0 1-7-7l3-2-2-5Z"/></>,
    chevron: <><path d="m9 18 6-6-6-6"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    check: <><path d="m5 12 5 5L20 7"/></>,
    spark: <><path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

export function Header() {
  const location = useLocation()
  const isOperator = location.pathname.startsWith('/operator')
  return <header className="site-header">
    <div className="header-inner shell">
      <Link to="/stores" className="brand" aria-label="모아 홈"><span className="brand-mark">✳</span><span>모아<span className="brand-dot">.</span></span></Link>
      <nav className="main-nav" aria-label="주요 메뉴">
        <NavLink to="/stores" className={({isActive}) => !isOperator && isActive ? 'active' : ''}>매장 둘러보기</NavLink>
        <NavLink to="/my/inquiries" className={({isActive}) => isActive ? 'active' : ''}>내 문의</NavLink>
      </nav>
      <Link className={`role-link ${isOperator ? 'operator-active' : ''}`} to={isOperator ? '/stores' : '/operator/inquiries'}>
        <span className="role-indicator" />{isOperator ? '고객 화면으로' : '매장 운영자 화면'}<Icon name="arrow" size={16}/>
      </Link>
    </div>
  </header>
}

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner"><div><span className="footer-brand">✳ 모아.</span><p>좋은 매장을 발견하고, 편하게 연결되세요.</p></div><span>프론트엔드 MVP 데모 · 실제 문의는 전송되지 않습니다</span></div></footer>
}

export function StoreVisual({ store, large = false }: { store: Store; large?: boolean }) {
  return <div className={`store-visual visual-${store.color} ${large ? 'store-visual-large' : ''}`} aria-hidden="true"><span className="visual-orbit orbit-one"/><span className="visual-orbit orbit-two"/><span className="visual-symbol">{store.symbol}</span><span className="visual-label">MOA CURATED PLACE</span></div>
}

export function StoreCard({ store }: { store: Store }) {
  return <Link to={`/stores/${store.id}`} className="store-card">
    <div className="card-image"><StoreVisual store={store}/>{store.featured && <span className="featured-pill">추천 매장</span>}</div>
    <div className="card-content"><div className="card-meta"><span>{store.category}</span><span>·</span><span>{store.area}</span></div><h3>{store.name}</h3><p>{store.description}</p><div className="card-bottom"><span className="rating"><span aria-hidden="true">★</span> {store.rating.toFixed(1)} <span className="review-count">({store.reviewCount})</span></span><span className="card-arrow"><Icon name="arrow" size={18}/></span></div></div>
  </Link>
}

const statusLabels: Record<InquiryStatus, string> = { new: '접수됨', answered: '답변함', closed: '종료' }
export function StatusBadge({ status }: { status: InquiryStatus }) { return <span className={`status-badge status-${status}`}><span className="status-dot"/>{statusLabels[status]}</span> }

export function InquiryCard({ inquiry, operator = false }: { inquiry: Inquiry; operator?: boolean }) {
  const store = stores.find(item => item.id === inquiry.storeId)
  return <Link to={operator ? `/operator/inquiries/${inquiry.id}` : `/my/inquiries/${inquiry.id}`} className="inquiry-card">
    <div className="inquiry-card-main"><div className="inquiry-card-top"><span className="inquiry-store">{store?.name ?? '매장'}</span><StatusBadge status={inquiry.status}/></div><h3>{inquiry.subject}</h3><p>{inquiry.message}</p><div className="inquiry-card-foot"><span>{operator ? inquiry.customerName : store?.category}</span><span>·</span><time>{formatDate(inquiry.createdAt)}</time></div></div><span className="inquiry-card-arrow"><Icon name="chevron" size={20}/></span>
  </Link>
}

export function EmptyState({ title, description, actionLabel, actionTo }: { title: string; description: string; actionLabel?: string; actionTo?: string }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name="search" size={30}/></span><h3>{title}</h3><p>{description}</p>{actionLabel && actionTo && <Link to={actionTo} className="button button-dark">{actionLabel}<Icon name="arrow" size={17}/></Link>}</div>
}

export function formatDate(value: string) { return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value)) }
