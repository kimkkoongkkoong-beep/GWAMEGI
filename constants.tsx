
import React from 'react';
import { Shield, MessageSquare, Map, HandMetal, Instagram, MessageCircle, AlertTriangle, Fuel, Users } from 'lucide-react';
import { RuleItem, TourGuide } from './types';

export const CLUB_NAME = "포항과메기라이더스";
export const INSTAGRAM_URL = "https://www.instagram.com/"; // 실제 URL로 교체 필요
export const OPEN_CHAT_URL = "https://open.kakao.com/o/pgJRW5di"; // 실제 URL로 교체 필요
export const GITHUB_URL = "https://github.com/"; // 자신의 깃허브 주소로 교체 필요

export const GENERAL_RULES: RuleItem[] = [
  {
    id: '1',
    title: '상호 존중',
    description: '나이, 기종에 상관없이 서로 존댓말을 사용하며 예의를 지킵니다.',
    icon: 'Users'
  },
  {
    id: '2',
    title: '정치/종교 언급 금지',
    description: '분쟁의 소지가 있는 정치, 종교, 민감한 사회적 이슈 언급은 지양합니다.',
    icon: 'MessageSquare'
  },
  {
    id: '3',
    title: '클린한 채팅',
    description: '욕설, 비방, 도배 및 불쾌감을 줄 수 있는 미디어 공유 시 경고 없이 강퇴될 수 있습니다.',
    icon: 'Shield'
  }
];

export const TOUR_GUIDELINES: TourGuide[] = [
  {
    category: '안전 장비 (선택)',
    items: ['풀페이스/시스템 헬멧', '라이딩 자켓 & 팬츠', '라이딩 부츠/슈즈', '라이딩 장갑']
  },
  {
    category: '투어 매너',
    items: ['투어 집결 시간 엄수 (최소 10분 전 도착)', '출발 전 주유 완료 필수', '대열 이탈 및 추월 절대 금지', '로드 마스터 지시 준수']
  },
  {
    category: '위치 공유 (카카오맵)',
    items: ['투어 중 실시간 위치 공유는 [카카오맵] 어플을 사용합니다.', '오픈채팅방 내 위치 공유 기능을 사전에 숙지해주세요.', '중간 합류나 복귀 시 반드시 위치 공유를 확인합니다.']
  }
];

export const SIGNALS: RuleItem[] = [
  {
    id: 's1',
    title: '수신호: 정지',
    description: '왼팔을 45도 아래로 펴고 손바닥을 뒤로 향하게 합니다.',
    icon: 'AlertTriangle'
  },
  {
    id: 's2',
    title: '수신호: 장애물 주의',
    description: '발이나 손으로 노면의 위험 요소를 가리킵니다.',
    icon: 'Map'
  }
];
