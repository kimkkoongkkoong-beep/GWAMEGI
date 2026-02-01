
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, Instagram, MessageCircle, 
  ShieldCheck, MapPin, Map as MapIcon, Info,
  Sparkles, Users, Shield, MessageSquare, AlertTriangle,
  HandMetal
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- 상수 정의 ---
const CLUB_NAME = "포항과메기라이더스";
const OPEN_CHAT_URL = "https://open.kakao.com/o/pgJRW5di";
const INSTAGRAM_URL = "https://www.instagram.com/pohang_gwamegi_riders";

const GENERAL_RULES = [
  { id: '1', title: '상호 존중', description: '나이, 기종에 상관없이 서로 존댓말을 사용하며 예의를 지킵니다.', icon: Users },
  { id: '2', title: '정치/종교 언급 금지', description: '분쟁의 소지가 있는 민감한 사회적 이슈 언급은 지양합니다.', icon: MessageSquare },
  { id: '3', title: '클린한 채팅', description: '욕설, 비방, 도배 행위 시 경고 없이 강퇴될 수 있습니다.', icon: Shield }
];

const TOUR_RULES = [
  "투어 집결 시간 엄수 (최소 10분 전 도착)",
  "출발 전 주유 완료 필수",
  "대열 이탈 및 추월 절대 금지",
  "로드 마스터 지시 준수",
  "안전 장비(헬멧 등) 필수 착용"
];

// --- 컴포넌트 ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleAskAi = async () => {
    if (!aiMessage.trim()) return;
    setIsAiThinking(true);
    try {
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
      const ai = new GoogleGenAI({ apiKey: apiKey as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `질문: ${aiMessage}. 당신은 '포항과메기라이더스' 바이크 크루의 안내자입니다. 포항 라이딩 코스나 바이크 상식에 대해 경상도 사투리를 섞어 친절하고 열정적으로 답해주세요.`,
      });
      alert(response.text);
    } catch (error) {
      alert("AI 라이더가 투어 중입니다! 잠시 후 다시 물어봐주세요.");
    } finally {
      setIsAiThinking(false);
      setAiMessage('');
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-900 text-slate-100">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center font-black text-white italic shadow-lg">P</div>
          <span className="font-extrabold tracking-tighter text-xl underline decoration-orange-500/50">과메기 <span className="text-orange-500">라이더스</span></span>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* 메뉴 모달 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 flex flex-col items-center justify-center gap-10">
          <button onClick={() => scrollToSection('home')} className="text-3xl font-black">HOME</button>
          <button onClick={() => scrollToSection('rules')} className="text-3xl font-black">RULES</button>
          <button onClick={() => scrollToSection('map')} className="text-3xl font-black">MAP</button>
          <a href={OPEN_CHAT_URL} target="_blank" className="text-3xl font-black text-yellow-400">JOIN CHAT</a>
        </div>
      )}

      {/* 히어로 */}
      <section id="home" className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>
        <div className="relative z-10 animate-fade-in">
          <h1 className="text-6xl font-black mb-6 leading-tight italic">
            포항의 파도를 가르는<br/>
            <span className="text-orange-500">과메기 라이더스</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-xs mx-auto">자유와 안전, 그리고 뜨거운 열정으로 달리는 포항 바이크 크루</p>
          <a href={OPEN_CHAT_URL} target="_blank" className="bg-yellow-400 text-black font-black px-10 py-5 rounded-2xl orange-glow inline-block text-lg">
            오픈채팅방 바로가기
          </a>
        </div>
      </section>

      {/* 규칙 */}
      <section id="rules" className="py-24 px-6 max-w-2xl mx-auto">
        <h2 className="text-4xl font-black mb-12 italic flex items-center gap-3">
          <ShieldCheck size={36} className="text-orange-500" /> 이용수칙
        </h2>
        <div className="grid gap-6">
          {GENERAL_RULES.map((rule) => (
            <div key={rule.id} className="p-8 glass-morphism rounded-[2rem] flex gap-6">
              <div className="text-orange-500 bg-orange-500/10 p-4 rounded-2xl h-fit">
                <rule.icon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{rule.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 지도 */}
      <section id="map" className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-8 italic flex items-center gap-3">
            <MapIcon size={36} className="text-orange-500" /> 라이더 아지트
          </h2>
          <div className="rounded-[2.5rem] overflow-hidden aspect-[3/4] border-4 border-slate-700 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* 하단 바 */}
      <div className="fixed bottom-0 left-0 right-0 h-20 glass-morphism z-30 flex justify-around items-center px-6">
        <button onClick={() => scrollToSection('home')} className="flex flex-col items-center gap-1 text-slate-500">
          <MapPin size={22} /><span className="text-[10px] font-bold">HOME</span>
        </button>
        <button onClick={() => scrollToSection('rules')} className="flex flex-col items-center gap-1 text-slate-500">
          <ShieldCheck size={22} /><span className="text-[10px] font-bold">RULES</span>
        </button>
        <div className="relative -top-6">
          <button 
            onClick={() => window.open(OPEN_CHAT_URL, '_blank')}
            className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-2xl border-4 border-slate-900"
          >
            <MessageCircle size={30} fill="currentColor" />
          </button>
        </div>
        <button onClick={() => scrollToSection('map')} className="flex flex-col items-center gap-1 text-slate-500">
          <MapIcon size={22} /><span className="text-[10px] font-bold">MAP</span>
        </button>
        <button onClick={() => window.open(INSTAGRAM_URL, '_blank')} className="flex flex-col items-center gap-1 text-slate-500">
          <Instagram size={22} /><span className="text-[10px] font-bold">SNS</span>
        </button>
      </div>
    </div>
  );
};

// 렌더링
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
