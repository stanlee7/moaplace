export type InquiryStatus = 'new' | 'answered' | 'closed'

export type Store = {
  id: string
  name: string
  category: string
  area: string
  address: string
  description: string
  longDescription: string
  tags: string[]
  hours: string
  phone: string
  color: string
  symbol: string
  rating: number
  reviewCount: number
  featured?: boolean
}

export type Inquiry = {
  id: string
  storeId: string
  customerName: string
  contact: string
  subject: string
  message: string
  createdAt: string
  status: InquiryStatus
  reply?: string
  repliedAt?: string
}
