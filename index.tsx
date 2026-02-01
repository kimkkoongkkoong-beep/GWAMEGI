
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, Instagram, MessageCircle, 
  ShieldCheck, MapPin, Map as MapIcon, 
  Sparkles, Users, Shield, MessageSquare, AlertTriangle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- 데이터 정의 ---
const CLUB_NAME = "포항과메기라이더스";
const OPEN_CHAT_URL = "https://open.kakao.com/o/pgJRW5di";
const INSTAGRAM_URL = "https://www.instagram.com/pohang_gwamegi_riders";

const RULES = [
  { id: '1', title: '상호 존중', desc: '나이, 기종 관계없이 존댓말 사용 및 예의 준수', icon: Users },
  { id: '2', title: '정치/종교 언급 금지', desc: '분쟁 소지가 있는 민감한 주제 언급 자제', icon: MessageSquare },
  { id: '3', title: '클린 채팅', desc: '욕설, 비방, 도배 금지 (위반 시 즉시 강퇴)', icon: Shield }
];

const TOUR_TIPS = [
  "집결 시간 10분 전 도착 엄수",
  "출발 전 연료 가득 채우기",
  "대열 주행 시 추월 절대 금지",
  "헬멧 및 안전 보호구 필수 착용"
];

// --- 앱 컴포넌트 ---
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
      // 브라우저 환경에서 안전하게 API KEY 가져오기
      const apiKey = (window as any).process?.env?.API_KEY || "";
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `질문: ${aiMessage}. 당신은 '포항과메기라이더스' 바이크 크루의 마스코트입니다. 포항 라이딩 코스나 안전 지식을 경상도 사투리로 아주 친절하고 씩씩하게 답해줘!`,
      });
      alert(response.text);
    } catch (error) {
      alert("AI 라이더가 투어 중이라 응답을 못 하네요! 나중에 다시 물어봐주이소!");
    } finally {
      setIsAiThinking(false);
      setAiMessage('');
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-900 selection:bg-orange-500/30">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center font-black text-white italic shadow-lg rotate-3">P</div>
          <span className="font-extrabold tracking-tighter text-xl underline decoration-orange-500/30 underline-offset-4">과메기 <span className="text-orange-500">라이더스</span></span>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-300 active:scale-90 transition-transform">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 flex flex-col items-center justify-center gap-12 p-10 backdrop-blur-md">
          <button onClick={() => scrollToSection('home')} className="text-4xl font-black italic hover:text-orange-500">HOME</button>
          <button onClick={() => scrollToSection('rules')} className="text-4xl font-black italic hover:text-orange-500">RULES</button>
          <button onClick={() => scrollToSection('map')} className="text-4xl font-black italic hover:text-orange-500">MAP</button>
          <a href={OPEN_CHAT_URL} target="_blank" className="text-4xl font-black italic text-yellow-400">JOIN CHAT</a>
          <button onClick={() => setIsMenuOpen(false)} className="mt-12 p-4 rounded-full border border-white/10"><X size={32}/></button>
        </div>
      )}

      {/* 히어로 섹션 */}
      <section id="home" className="h-[90vh] flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/60 to-slate-900"></div>
        <div className="relative z-10 animate-slide-up">
          <div className="inline-block px-4 py-1 bg-orange-600/20 border border-orange-600/30 rounded-full text-orange-500 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">Pohang Rider Crew</div>
          <h1 className="text-5xl font-black mb-6 leading-[1.1] italic">
            포항의 파도를 가르는<br/>
            <span className="text-orange-500 underline decoration-white/20 underline-offset-8">과메기 라이더스</span>
          </h1>
          <p className="text-slate-400 text-base mb-10 max-w-xs mx-auto font-medium leading-relaxed">자유와 안전, 그리고 열정으로 달리는<br/>포항 최고의 바이크 크루</p>
          <a href={OPEN_CHAT_URL} target="_blank" className="bg-yellow-400 text-black font-black px-12 py-5 rounded-2xl orange-glow transform active:scale-95 transition-all text-lg shadow-xl inline-block">
            오픈채팅방 바로가기
          </a>
        </div>
      </section>

      {/* 규칙 섹션 */}
      <section id="rules" className="py-24 px-6 max-w-lg mx-auto">
        <h2 className="text-3xl font-black mb-12 italic flex items-center gap-3">
          <ShieldCheck size={32} className="text-orange-500" /> 이용수칙
        </h2>
        <div className="grid gap-4">
          {RULES.map((rule) => (
            <div key={rule.id} className="p-6 glass-morphism rounded-3xl flex gap-5 items-center hover:border-orange-500/30 transition-colors">
              <div className="bg-orange-600/10 p-4 rounded-2xl text-orange-500 shrink-0">
                <rule.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{rule.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-slate-800/50 border border-white/5 rounded-[2.5rem]">
          <h3 className="font-black text-xl mb-6 text-orange-500 flex items-center gap-2 italic">
            <AlertTriangle size={20} /> 투어 에티켓
          </h3>
          <ul className="space-y-4">
            {TOUR_TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-orange-500 font-bold shrink-0">#</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 지도 섹션 */}
      <section id="map" className="py-24 px-6 bg-slate-800/20">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-black mb-4 italic flex items-center gap-3">
            <MapIcon size={32} className="text-orange-500" /> 라이더 아지트
          </h2>
          <p className="text-slate-500 text-sm mb-8 font-medium italic">집결지 및 추천 맛집 지도</p>
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border-2 border-white/10 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
              width="100%" 
              height="100%" 
              className="grayscale-[30%] contrast-[110%]"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* AI 섹션 */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto p-8 glass-morphism rounded-[2.5rem] border-orange-500/20">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Sparkles className="text-orange-500" size={20} /> AI 라이더 가이드
          </h3>
          <div className="space-y-3">
            <input 
              type="text" 
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="코스나 맛집을 물어보이소!"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-6 text-sm focus:border-orange-500 outline-none transition-all placeholder:text-slate-600"
            />
            <button 
              onClick={handleAskAi}
              disabled={isAiThinking}
              className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black text-white shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isAiThinking ? "분석 중..." : "물어보기"}
            </button>
          </div>
        </div>
      </section>

      {/* 하단 탭 바 */}
      <div className="fixed bottom-0 left-0 right-0 h-20 glass-morphism z-30 flex justify-around items-center px-4 border-t border-white/5">
        <button onClick={() => scrollToSection('home')} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <MapPin size={22} /><span className="text-[10px] font-bold">HOME</span>
        </button>
        <button onClick={() => scrollToSection('rules')} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <ShieldCheck size={22} /><span className="text-[10px] font-bold">RULES</span>
        </button>
        <div className="relative -top-6">
          <div className="absolute inset-0 bg-orange-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <button 
            onClick={() => window.open(OPEN_CHAT_URL, '_blank')}
            className="relative w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-2xl border-4 border-slate-900 transform active:scale-90 transition-transform"
          >
            <MessageCircle size={30} fill="currentColor" />
          </button>
        </div>
        <button onClick={() => scrollToSection('map')} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <MapIcon size={22} /><span className="text-[10px] font-bold">MAP</span>
        </button>
        <button onClick={() => window.open(INSTAGRAM_URL, '_blank')} className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-orange-500 transition-colors">
          <Instagram size={22} /><span className="text-[10px] font-bold">SNS</span>
        </button>
      </div>
    </div>
  );
};

// --- 렌더링 ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
