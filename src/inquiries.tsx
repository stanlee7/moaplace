import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { seedInquiries } from './data'
import type { Inquiry, InquiryStatus } from './types'

type InquiryContextValue = {
  inquiries: Inquiry[]
  addInquiry: (inquiry: Inquiry) => void
  updateInquiry: (id: string, update: { reply?: string; status?: InquiryStatus }) => void
}

const STORAGE_KEY = 'moa-mvp-inquiries-v1'
const InquiryContext = createContext<InquiryContextValue | null>(null)

function loadInquiries(): Inquiry[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return seedInquiries
    const parsed: unknown = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed as Inquiry[] : seedInquiries
  } catch {
    return seedInquiries
  }
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(loadInquiries)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries)) } catch { /* Storage may be unavailable in private mode. */ }
  }, [inquiries])

  const addInquiry = (inquiry: Inquiry) => setInquiries(current => [inquiry, ...current])
  const updateInquiry = (id: string, update: { reply?: string; status?: InquiryStatus }) => {
    setInquiries(current => current.map(item => item.id === id ? {
      ...item,
      ...update,
      repliedAt: update.reply ? new Date().toISOString() : item.repliedAt,
    } : item))
  }

  return <InquiryContext.Provider value={{ inquiries, addInquiry, updateInquiry }}>{children}</InquiryContext.Provider>
}

export function useInquiries() {
  const context = useContext(InquiryContext)
  if (!context) throw new Error('useInquiries must be used within InquiryProvider')
  return context
}
