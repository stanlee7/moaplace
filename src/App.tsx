import { Navigate, Route, Routes, useLocation } from 'react-router'
import { useEffect } from 'react'
import { Footer, Header } from './components'
import { StoresPage, StoreDetailPage } from './pages/Stores'
import { InquiryFormPage, MyInquiriesPage, MyInquiryDetailPage } from './pages/Customer'
import { OperatorInquiriesPage, OperatorInquiryDetailPage } from './pages/Operator'

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return <><Header/><main><Routes>
    <Route path="/" element={<Navigate to="/stores" replace/>}/>
    <Route path="/stores" element={<StoresPage/>}/>
    <Route path="/stores/:id" element={<StoreDetailPage/>}/>
    <Route path="/stores/:id/inquiry" element={<InquiryFormPage/>}/>
    <Route path="/my/inquiries" element={<MyInquiriesPage/>}/>
    <Route path="/my/inquiries/:id" element={<MyInquiryDetailPage/>}/>
    <Route path="/operator/inquiries" element={<OperatorInquiriesPage/>}/>
    <Route path="/operator/inquiries/:id" element={<OperatorInquiryDetailPage/>}/>
    <Route path="*" element={<div className="shell not-found"><h1>페이지를 찾을 수 없어요</h1><a href="/stores" className="button button-dark">매장 둘러보기</a></div>}/>
  </Routes></main><Footer/></>
}
