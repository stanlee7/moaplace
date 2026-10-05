import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { EmptyState, formatDate, Icon, InquiryCard, StatusBadge } from '../components'
import { stores } from '../data'
import { useInquiries } from '../inquiries'
import type { Inquiry } from '../types'

export function InquiryFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const store = stores.find(item => item.id === id)
  const { addInquiry } = useInquiries()
  const [form, setForm] = useState({ customerName: '', contact: '', subject: '', message: '' })
  const [error, setError] = useState('')

  if (!store) return <div className="shell page-content"><EmptyState title="매장을 찾을 수 없어요" description="다른 매장을 선택해 주세요." actionLabel="매장 목록으로" actionTo="/stores"/></div>

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!store) return
    const values = Object.values(form).map(value => value.trim())
    if (values.some(value => !value)) { setError('모든 항목을 입력해 주세요.'); return }
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(form.contact.trim())) { setError('휴대전화 번호를 확인해 주세요. 예: 010-1234-5678'); return }
    const inquiry: Inquiry = { id: crypto.randomUUID(), storeId: store.id, customerName: form.customerName.trim(), contact: form.contact.trim(), subject: form.subject.trim(), message: form.message.trim(), createdAt: new Date().toISOString(), status: 'new' }
    addInquiry(inquiry)
    navigate(`/my/inquiries/${inquiry.id}`, { state: { submitted: true } })
  }

  return <div className="shell form-page"><Link to={`/stores/${store.id}`} className="back-link">← &nbsp;{store.name}으로 돌아가기</Link><div className="form-layout"><div className="form-intro"><span className="section-kicker">SEND AN INQUIRY</span><h1>궁금한 점을<br/><em>편하게</em> 남겨주세요.</h1><p>매장에 전하고 싶은 내용을 작성해 주세요.<br/>문의 내역에서 답변 상태를 확인할 수 있어요.</p><div className="selected-store"><span className={`selected-store-symbol visual-${store.color}`}>{store.symbol}</span><div><small>문의할 매장</small><strong>{store.name}</strong><span>{store.category} · {store.area}</span></div></div></div><form className="inquiry-form" onSubmit={submit} noValidate><h2>문의 내용</h2><p>필수 항목을 모두 입력해 주세요.</p><div className="form-row"><label>이름 <span>*</span><input value={form.customerName} onChange={event => setForm({ ...form, customerName: event.target.value })} placeholder="이름을 입력해 주세요" maxLength={30} autoComplete="name"/></label><label>연락처 <span>*</span><input value={form.contact} onChange={event => setForm({ ...form, contact: event.target.value })} placeholder="010-1234-5678" inputMode="tel" autoComplete="tel"/></label></div><label>문의 제목 <span>*</span><input value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} placeholder="예: 주말 클래스 예약 가능 여부" maxLength={80}/></label><label>문의 내용 <span>*</span><textarea value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="원하는 날짜, 인원, 궁금한 점을 자세히 적어주세요." rows={6} maxLength={1000}/><small className="char-count">{form.message.length} / 1000</small></label>{error && <p className="form-error" role="alert">{error}</p>}<p className="form-disclaimer">데모 화면입니다. 입력 내용은 이 브라우저에만 저장되며 실제 매장으로 전송되지 않습니다.</p><button className="button button-dark submit-button" type="submit">문의 남기기 <Icon name="arrow" size={18}/></button></form></div></div>
}

export function MyInquiriesPage() {
  const { inquiries } = useInquiries()
  return <div className="shell list-page"><div className="page-heading"><span className="section-kicker">MY INQUIRIES</span><h1>내 문의</h1><p>보낸 문의와 매장의 답변을 한곳에서 확인하세요.</p></div><div className="list-summary"><span>전체 문의 <strong>{inquiries.length}</strong>건</span><Link to="/stores">다른 매장 둘러보기 <Icon name="arrow" size={17}/></Link></div>{inquiries.length ? <div className="inquiry-list">{inquiries.map(inquiry => <InquiryCard key={inquiry.id} inquiry={inquiry}/>)}</div> : <EmptyState title="아직 문의가 없어요" description="궁금한 매장을 찾고 첫 문의를 남겨보세요." actionLabel="매장 둘러보기" actionTo="/stores"/>}<p className="list-note">데모용 샘플 문의가 포함되어 있습니다. 로그인 없이 이 브라우저의 문의를 보여줍니다.</p></div>
}

export function MyInquiryDetailPage() {
  const { id } = useParams()
  const { inquiries } = useInquiries()
  const inquiry = inquiries.find(item => item.id === id)
  const store = inquiry && stores.find(item => item.id === inquiry.storeId)
  if (!inquiry) return <div className="shell page-content"><EmptyState title="문의를 찾을 수 없어요" description="목록에서 다시 선택해 주세요." actionLabel="내 문의로" actionTo="/my/inquiries"/></div>
  return <div className="shell inquiry-detail"><Link to="/my/inquiries" className="back-link">← &nbsp;내 문의로 돌아가기</Link><div className="inquiry-detail-heading"><div><span className="section-kicker">INQUIRY DETAIL</span><h1>{inquiry.subject}</h1><p>{store?.name} · {formatDate(inquiry.createdAt)}</p></div><StatusBadge status={inquiry.status}/></div><div className="message-panel"><span className="message-label">보낸 문의</span><p>{inquiry.message}</p><div className="message-author">{inquiry.customerName} · {inquiry.contact}</div></div><div className={`reply-panel ${inquiry.reply ? 'has-reply' : ''}`}><span className="reply-icon"><Icon name={inquiry.reply ? 'check' : 'mail'} size={22}/></span><div><span className="message-label">매장 답변</span>{inquiry.reply ? <><p>{inquiry.reply}</p><small>{inquiry.repliedAt && formatDate(inquiry.repliedAt)}</small></> : <p className="reply-waiting">아직 답변을 기다리고 있어요. 운영자 화면에서 답변을 작성해 보세요.</p>}</div></div><div className="detail-actions"><Link to={`/stores/${inquiry.storeId}`} className="button button-outline">매장 보기 <Icon name="arrow" size={17}/></Link></div></div>
}
