import type { Inquiry, Store } from './types'

export const stores: Store[] = [
  {
    id: 'atelier-one', name: '아틀리에 온', category: '공간·클래스', area: '성수',
    address: '서울 성동구 연무장길 42', description: '일상에 작은 쉼을 더하는 도자기 공방',
    longDescription: '처음 만들어 보는 분도 편하게 참여할 수 있는 소규모 도자기 클래스를 운영합니다. 원데이 클래스부터 정규 과정, 단체 프로그램까지 목적에 맞춰 안내해 드려요.',
    tags: ['원데이 클래스', '단체 예약', '초보자 환영'], hours: '화–일 11:00–19:00', phone: '02-0000-1101',
    color: 'peach', symbol: '✺', rating: 4.9, reviewCount: 128, featured: true,
  },
  {
    id: 'green-table', name: '그린테이블', category: '음식·카페', area: '연남',
    address: '서울 마포구 동교로 246', description: '계절의 맛을 담은 작은 브런치 키친',
    longDescription: '제철 식재료로 만드는 브런치와 음료를 선보입니다. 소규모 모임과 특별한 날을 위한 공간 이용도 문의해 주세요.',
    tags: ['브런치', '모임 공간', '비건 옵션'], hours: '매일 10:00–20:00', phone: '02-0000-1102',
    color: 'sage', symbol: '✿', rating: 4.8, reviewCount: 94,
  },
  {
    id: 'form-studio', name: '폼 스튜디오', category: '뷰티·웰니스', area: '강남',
    address: '서울 강남구 테헤란로 18길 25', description: '나에게 맞는 움직임을 찾는 프라이빗 스튜디오',
    longDescription: '개인의 컨디션과 목표에 맞춘 1:1 필라테스 프로그램을 제공합니다. 체험 수업과 정규 수업 일정을 편하게 문의해 주세요.',
    tags: ['1:1 레슨', '체험 수업', '예약제'], hours: '월–토 08:00–21:00', phone: '02-0000-1103',
    color: 'lilac', symbol: '✧', rating: 5.0, reviewCount: 76, featured: true,
  },
  {
    id: 'slow-bloom', name: '슬로우블룸', category: '라이프스타일', area: '서촌',
    address: '서울 종로구 자하문로 54', description: '마음을 전하는 꽃과 식물의 공간',
    longDescription: '계절의 색을 담은 꽃다발과 식물을 제안합니다. 행사 장식, 정기 구독, 맞춤 제작 상담을 진행합니다.',
    tags: ['꽃다발', '행사 장식', '맞춤 제작'], hours: '화–일 11:00–19:00', phone: '02-0000-1104',
    color: 'rose', symbol: '❀', rating: 4.9, reviewCount: 112,
  },
  {
    id: 'sound-room', name: '사운드룸', category: '공간·클래스', area: '합정',
    address: '서울 마포구 양화로 72', description: '음악으로 채우는 나만의 작은 시간',
    longDescription: '방음 시설을 갖춘 연습실과 소규모 음악 레슨을 운영합니다. 공간 대여, 악기 사용, 레슨 일정은 문의로 안내해 드립니다.',
    tags: ['연습실', '음악 레슨', '공간 대여'], hours: '매일 09:00–23:00', phone: '02-0000-1105',
    color: 'blue', symbol: '♫', rating: 4.7, reviewCount: 63,
  },
  {
    id: 'ordinary-lab', name: '오디너리 랩', category: '라이프스타일', area: '성수',
    address: '서울 성동구 성수이로 88', description: '취향을 발견하는 향 만들기 작업실',
    longDescription: '다양한 향을 직접 경험하고 나만의 향을 만드는 클래스를 진행합니다. 커플 클래스와 단체 워크숍도 가능합니다.',
    tags: ['향수 클래스', '커플 체험', '워크숍'], hours: '수–일 12:00–20:00', phone: '02-0000-1106',
    color: 'butter', symbol: '✳', rating: 4.8, reviewCount: 87,
  },
]

export const seedInquiries: Inquiry[] = [
  { id: 'sample-1', storeId: 'atelier-one', customerName: '김지민', contact: '010-1234-5678', subject: '4인 도자기 클래스 문의', message: '이번 주 토요일 오후에 4명이 함께 참여할 수 있을까요?', createdAt: '2026-10-04T10:30:00+09:00', status: 'new' },
  { id: 'sample-2', storeId: 'green-table', customerName: '박서윤', contact: '010-2345-6789', subject: '주말 소규모 모임 문의', message: '일요일 점심에 6명 정도 모일 수 있는 자리가 있을까요?', createdAt: '2026-10-03T14:20:00+09:00', status: 'answered', reply: '안녕하세요! 이번 일요일 12시에는 6인 자리가 가능합니다. 방문 시간을 알려주시면 안내해 드릴게요.', repliedAt: '2026-10-03T16:00:00+09:00' },
  { id: 'sample-3', storeId: 'form-studio', customerName: '이현우', contact: '010-3456-7890', subject: '체험 수업 가능 시간', message: '평일 저녁 7시 이후에 체험 수업이 가능한지 궁금합니다.', createdAt: '2026-10-02T09:10:00+09:00', status: 'closed', reply: '화요일과 목요일 저녁 7시 이후 가능합니다. 편한 요일을 알려주세요.', repliedAt: '2026-10-02T11:40:00+09:00' },
]

export const categories = ['전체', '공간·클래스', '음식·카페', '뷰티·웰니스', '라이프스타일']
export const areas = ['전체 지역', '성수', '연남', '강남', '서촌', '합정']
