import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { InquiryProvider } from './inquiries'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter><InquiryProvider><App/></InquiryProvider></BrowserRouter></React.StrictMode>,
)
