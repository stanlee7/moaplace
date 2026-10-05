import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import { EmptyState, formatDate, Icon, InquiryCard, StatusBadge } from '../components'
import { stores } from '../data'
import { useInquiries } from '../inquiries'
import type { InquiryStatus } from '../types'

export function OperatorInquiriesPage() {
  const { inquiries } = useInquiries()
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all')
  const filtered = inquiries.filter(item => filter === 'all' || item.status === filter)
  const newCount = inquiries.filter(item => item.status === 'new').length
  const answeredCount = inquiries.filter(item => item.status === 'answered').length
  return <div className="operator-page"><div className="shell"><div className="operator-heading"><div><span className="section-kicker">STORE DASHBOARD</span><h1>문의 관리</h1><p>고객의 요청을 확인하고 답변을 남겨보세요.</p></div><span className="demo-chip"><Icon name="spark" size={15}/> 운영자 데모</span></div><div className="dashboard-stats"><div><span>전체 문의</span><strong>{inquiries.length}<small>건</small></strong></div><div><span>답변 대기</span><strong>{newCount}<small>건</small></strong></div><div><span>답변 완료</span><strong>{answeredCount}<small>건</small></strong></div></div><div className="operator-list-head"><div><h2>받은 문의</h2><p>모든 데모 매장의 문의가 표시됩니다.</p></div><div className="status-tabs" aria-label="문의 상태 필터">{([['all', '전체'], ['new', '접수됨'], ['answered', '답변함'], ['closed', '종료']] as const).map(([key, label]) => <button key={key} type="button" className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>)}</div></div>{filtered.length ? <div className="inquiry-list operator-list">{filtered.map(inquiry => <InquiryCard key={inquiry.id} inquiry={inquiry} operator/>)}</div> : <EmptyState title="해당 상태의 문의가 없어요" description="다른 상태를 선택해 보세요."/>}<p className="list-note">이 화면은 역할 체험용입니다. 실제 운영자 권한이나 로그인은 적용되지 않습니다.</p></div></div>
}

export function OperatorInquiryDetailPage() {
  const { id } = useParams()
  const { inquiries, updateInquiry } = useInquiries()
  const inquiry = inquiries.find(item => item.id === id)
  const store = inquiry && stores.find(item => item.id === inquiry.storeId)
  const [reply, setReply] = useState(inquiry?.reply ?? '')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  if (!inquiry) return <div className="shell page-content"><EmptyState title="문의를 찾을 수 없어요" description="목록에서 다시 선택해 주세요." actionLabel="문의 관리로" actionTo="/operator/inquiries"/></div>

  function saveReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!inquiry) return
    if (!reply.trim()) { setError('답변 내용을 입력해 주세요.'); setSaved(false); return }
    updateInquiry(inquiry.id, { reply: reply.trim(), status: 'answered' })
    setError('')
    setSaved(true)
  }

  return <div className="operator-page"><div className="shell operator-detail"><Link to="/operator/inquiries" className="back-link">← &nbsp;문의 목록으로</Link><div className="operator-detail-grid"><div><div className="operator-detail-heading"><span className="section-kicker">CUSTOMER INQUIRY</span><h1>{inquiry.subject}</h1><div className="operator-detail-meta"><StatusBadge status={inquiry.status}/><span>{formatDate(inquiry.createdAt)}</span></div></div><div className="operator-info-card"><div><span>문의 매장</span><strong>{store?.name ?? '매장'}</strong></div><div><span>고객 이름</span><strong>{inquiry.customerName}</strong></div><div><span>연락처</span><strong>{inquiry.contact}</strong></div></div><div className="operator-message"><span className="message-label">문의 내용</span><p>{inquiry.message}</p></div></div><aside className="operator-reply-card"><span className="section-kicker">YOUR RESPONSE</span><h2>고객에게 답변하기</h2><p>고객이 내 문의에서 답변을 확인할 수 있어요.</p><form onSubmit={saveReply}><label className="sr-only" htmlFor="operator-reply">답변 내용</label><textarea id="operator-reply" value={reply} onChange={event => { setReply(event.target.value); setSaved(false) }} placeholder="고객에게 전달할 내용을 작성해 주세요." rows={8} maxLength={1500}/>{error && <p className="form-error" role="alert">{error}</p>}{saved && <p className="form-success" role="status">답변이 저장되었습니다.</p>}<button type="submit" className="button button-dark submit-button">답변 저장하기 <Icon name="arrow" size={18}/></button></form><div className="status-control"><span>문의 상태</span><div><button type="button" disabled={inquiry.status === 'new'} onClick={() => updateInquiry(inquiry.id, { status: 'new' })}>접수됨</button><button type="button" disabled={inquiry.status === 'answered' || !inquiry.reply} onClick={() => updateInquiry(inquiry.id, { status: 'answered' })}>답변함</button><button type="button" disabled={inquiry.status === 'closed' || !inquiry.reply} onClick={() => updateInquiry(inquiry.id, { status: 'closed' })}>종료</button></div></div><p className="demo-note">변경 내용은 이 브라우저에만 저장됩니다.</p></aside></div></div></div>
}
