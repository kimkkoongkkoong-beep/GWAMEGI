
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, Instagram, MessageCircle, Github,
  ShieldCheck, MapPin, Map as MapIcon, Radio, Info,
  ChevronRight, AlertCircle, PhoneCall,
  Sparkles, Navigation, Users, Shield, MessageSquare, AlertTriangle,
  Fuel, HandMetal
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- 1. 타입 정의 (Types) ---
interface RuleItem {
  id: string;
  title: string;
  description: string;
  icon: any;
}

enum SectionId {
  Home = 'home',
  Rules = 'rules',
  Tour = 'tour',
  Map = 'map',
  Contact = 'contact'
}

// --- 2. 데이터 상수 (Constants) ---
const CLUB_NAME = "포항과메기라이더스";
const OPEN_CHAT_URL = "https://open.kakao.com/o/pgJRW5di";
const INSTAGRAM_URL = "https://www.instagram.com/pohang_gwamegi_riders";

const GENERAL_RULES: RuleItem[] = [
  {
    id: '1',
    title: '상호 존중',
    description: '나이, 기종에 상관없이 서로 존댓말을 사용하며 예의를 지킵니다.',
    icon: Users
  },
  {
    id: '2',
    title: '정치/종교 언급 금지',
    description: '분쟁의 소지가 있는 정치, 종교, 민감한 사회적 이슈 언급은 지양합니다.',
    icon: MessageSquare
  },
  {
    id: '3',
    title: '클린한 채팅',
    description: '욕설, 비방, 도배 및 불쾌감을 줄 수 있는 미디어 공유 시 경고 없이 강퇴될 수 있습니다.',
    icon: Shield
  }
];

const TOUR_RULES = [
  "투어 집결 시간 엄수 (최소 10분 전 도착)",
  "출발 전 주유 완료 필수",
  "대열 이탈 및 추월 절대 금지",
  "로드 마스터 지시 준수",
  "풀페이스 헬멧 및 보호장구 착용 권장"
];

const SIGNALS = [
  { title: "정지", desc: "왼팔을 45도 아래로 펴고 손바닥을 뒤로" },
  { title: "위험", desc: "발이나 손으로 노면의 장애물을 가리킴" },
  { title: "서행", desc: "왼팔을 위아래로 가볍게 흔듦" }
];

// --- 3. 메인 앱 컴포넌트 (App) ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleAskAi = async () => {
    if (!aiMessage.trim()) return;
    setIsAiThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `당신은 '포항과메기라이더스' 바이크 크루의 명예 회원이자 가이드입니다. 질문: ${aiMessage}. 포항의 멋진 라이딩 코스나 바이크 안전 상식에 대해 경상도 사투리를 섞어 친절하고 열정적으로 답해주세요.`,
        config: {
          systemInstruction: "당신은 포항 라이더입니다. 친근하게 '~했심더', '~하입시더' 같은 말투를 사용하세요."
        }
      });
      alert(response.text);
    } catch (error) {
      alert("AI 라이더가 투어 중이라 응답이 늦네요! 나중에 다시 물어봐주이소!");
    } finally {
      setIsAiThinking(false);
      setAiMessage('');
    }
  };

  return (
    <div className="min-h-screen pb-24 overflow-x-hidden bg-slate-900 text-slate-100">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection(SectionId.Home)}>
          <div className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center font-black text-white italic shadow-lg">P</div>
          <span className="font-extrabold tracking-tighter text-xl">과메기 <span className="text-orange-500 italic">라이더스</span></span>
        </div>
        <button onClick={toggleMenu} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* 전체화면 메뉴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/98 flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-300">
          <button onClick={() => scrollToSection(SectionId.Home)} className="text-3xl font-black hover:text-orange-500 transition-colors">HOME</button>
          <button onClick={() => scrollToSection(SectionId.Rules)} className="text-3xl font-black hover:text-orange-500 transition-colors">RULES</button>
          <button onClick={() => scrollToSection(SectionId.Map)} className="text-3xl font-black hover:text-orange-500 transition-colors">MAP</button>
          <a href={OPEN_CHAT_URL} target="_blank" className="text-3xl font-black text-yellow-400 hover:scale-110 transition-transform">JOIN CHAT</a>
          <button onClick={toggleMenu} className="mt-10 p-4 rounded-full border border-white/20"><X size={32} /></button>
        </div>
      )}

      {/* 히어로 섹션 */}
      <section id={SectionId.Home} className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/60 to-slate-900"></div>
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 bg-orange-600/20 border border-orange-600/50 rounded-full text-orange-500 text-xs font-bold mb-6 tracking-widest animate-pulse">
            SINCE 2024 POHANG RIDER CREW
          </div>
          <h1 className="text-6xl font-black mb-6 leading-tight italic drop-shadow-2xl">
            포항의 파도를 가르는<br/>
            <span className="text-orange-500 underline decoration-yellow-400">과메기 라이더스</span>
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-xs mx-auto font-medium">
            안전한 라이딩, 즐거운 투어<br/>포항 NO.1 모터사이클 크루
          </p>
          <div className="flex flex-col gap-4">
            <a href={OPEN_CHAT_URL} target="_blank" className="bg-yellow-400 text-black font-black px-10 py-5 rounded-2xl orange-glow transform active:scale-95 transition-all text-lg shadow-xl inline-block">
              오픈채팅 참여하기
            </a>
          </div>
        </div>
      </section>

      {/* 이용 수칙 섹션 */}
      <section id={SectionId.Rules} className="py-24 px-6 max-w-2xl mx-auto">
        <h2 className="text-4xl font-black mb-12 italic flex items-center gap-3">
          <ShieldCheck size={36} className="text-orange-500" /> 이용수칙
        </h2>
        <div className="grid gap-6">
          {GENERAL_RULES.map((rule) => (
            <div key={rule.id} className="p-8 glass-morphism rounded-[2.5rem] flex gap-6 hover:border-orange-500/50 transition-colors shadow-lg">
              <div className="bg-orange-600/10 p-4 rounded-2xl h-fit text-orange-500">
                <rule.icon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{rule.title}</h3>
                <p className="text-slate-400 leading-relaxed">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-orange-600/10 border border-orange-600/20 rounded-[2.5rem] shadow-inner">
          <h3 className="font-black text-xl mb-6 flex items-center gap-2 text-orange-500">
            <AlertTriangle size={24} /> 투어 에티켓
          </h3>
          <ul className="space-y-4">
            {TOUR_RULES.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 font-medium">
                <span className="text-orange-500 mt-1">●</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 수신호 섹션 */}
      <section className="py-24 px-6 bg-slate-800/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-12 italic flex items-center gap-3">
            <HandMetal size={36} className="text-orange-500" /> 필수 수신호
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SIGNALS.map((s, i) => (
              <div key={i} className="p-6 glass-morphism rounded-3xl text-center">
                <h4 className="font-black text-orange-500 mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 지도 섹션 */}
      <section id={SectionId.Map} className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-8 italic flex items-center gap-3">
            <MapIcon size={36} className="text-orange-500" /> 라이더 아지트
          </h2>
          <p className="text-slate-400 mb-8 font-medium">포항 근교 집결지 및 추천 카페/맛집 지도</p>
          <div className="rounded-[3rem] overflow-hidden aspect-[3/4] border-4 border-slate-800 shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
              width="100%" 
              height="100%" 
              className="grayscale-[20%] contrast-[110%]"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* AI 가이드 섹션 */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-orange-600/10">
        <div className="max-w-2xl mx-auto p-8 glass-morphism rounded-[3rem] border-orange-500/20 border-2">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Sparkles className="text-orange-500 animate-pulse" /> 라이더 전용 AI 도우미
          </h3>
          <p className="text-slate-400 mb-6 text-sm">라이딩 코스 추천이나 맛집을 물어보세요!</p>
          <div className="flex flex-col gap-3">
            <input 
              type="text" 
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskAi()}
              placeholder="예: 영일대 해수욕장 코스 추천해줘"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 px-6 text-sm focus:border-orange-500 outline-none transition-all shadow-inner"
            />
            <button 
              onClick={handleAskAi}
              disabled={isAiThinking}
              className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black text-lg shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isAiThinking ? "분석 중..." : "AI에게 물어보기"}
            </button>
          </div>
        </div>
      </section>

      {/* 하단 탭 바 */}
      <div className="fixed bottom-0 left-0 right-0 h-20 glass-morphism z-30 flex justify-around items-center px-6 border-t border-white/10">
        <button onClick={() => scrollToSection(SectionId.Home)} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <MapPin size={22} />
          <span className="text-[10px] font-bold tracking-tighter uppercase">HOME</span>
        </button>
        <button onClick={() => scrollToSection(SectionId.Rules)} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <ShieldCheck size={22} />
          <span className="text-[10px] font-bold tracking-tighter uppercase">RULES</span>
        </button>
        <div className="relative -top-6">
          <div className="absolute inset-0 bg-orange-600 rounded-full blur-lg opacity-40 animate-pulse"></div>
          <button 
            onClick={() => window.open(OPEN_CHAT_URL, '_blank')}
            className="relative w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-2xl border-4 border-slate-900 transform active:scale-90 transition-transform"
          >
            <MessageCircle size={30} fill="currentColor" />
          </button>
        </div>
        <button onClick={() => scrollToSection(SectionId.Map)} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <MapIcon size={22} />
          <span className="text-[10px] font-bold tracking-tighter uppercase">MAP</span>
        </button>
        <button onClick={() => window.open(INSTAGRAM_URL, '_blank')} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <Instagram size={22} />
          <span className="text-[10px] font-bold tracking-tighter uppercase">SNS</span>
        </button>
      </div>
    </div>
  );
};

// --- 4. 렌더링 (Render) ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
