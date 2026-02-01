
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Menu, X, Instagram, MessageCircle, Github,
  ShieldCheck, MapPin, Map as MapIcon, Radio, Info,
  ChevronRight, AlertCircle, PhoneCall,
  Sparkles, Navigation, Users, Shield, MessageSquare, AlertTriangle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- 1. Types & Interfaces ---
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

// --- 2. Constants ---
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
  "로드 마스터 지시 준수"
];

// --- 3. Main App Component ---
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        contents: `질문: ${aiMessage}. 당신은 '포항과메기라이더스' 바이크 크루의 열정적인 멤버입니다. 포항의 라이딩 코스나 바이크 상식에 대해 경상도 사투리를 살짝 섞어서 아주 친절하고 에너제틱하게 답해주세요.`,
        config: {
          systemInstruction: "당신은 포항 라이더입니다. 친근하고 열정적으로 대화하세요."
        }
      });
      alert(response.text);
    } catch (error) {
      alert("AI 라이더가 현재 투어 중이라 응답이 어렵네요! 나중에 다시 물어봐주이소!");
    } finally {
      setIsAiThinking(false);
      setAiMessage('');
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-slate-900 text-slate-100">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection(SectionId.Home)}>
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-black text-white italic">P</div>
          <span className="font-extrabold tracking-tighter text-xl">과메기 <span className="text-orange-500 italic">라이더스</span></span>
        </div>
        <button onClick={toggleMenu} className="p-1">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Fullscreen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 flex flex-col items-center justify-center gap-8">
          <button onClick={() => scrollToSection(SectionId.Home)} className="text-2xl font-bold">HOME</button>
          <button onClick={() => scrollToSection(SectionId.Rules)} className="text-2xl font-bold">RULES</button>
          <button onClick={() => scrollToSection(SectionId.Map)} className="text-2xl font-bold">MAP</button>
          <a href={OPEN_CHAT_URL} target="_blank" className="text-2xl font-bold text-yellow-400 underline">JOIN CHAT</a>
        </div>
      )}

      {/* Hero Section */}
      <section id={SectionId.Home} className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900"></div>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1 bg-orange-600 rounded-full text-xs font-bold mb-4 tracking-widest animate-pulse">POHANG NO.1 CREW</span>
          <h1 className="text-5xl font-black mb-4 leading-tight italic">
            포항의 파도를 가르는<br/>
            <span className="text-orange-500">과메기 라이더스</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xs mx-auto">자유와 안전, 그리고 뜨거운 열정으로 달리는 포항 바이크 크루</p>
          <a href={OPEN_CHAT_URL} target="_blank" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl orange-glow inline-block">
            오픈채팅방 바로가기
          </a>
        </div>
      </section>

      {/* Rules Section */}
      <section id={SectionId.Rules} className="py-20 px-6">
        <h2 className="text-3xl font-black mb-10 italic flex items-center gap-2">
          <ShieldCheck className="text-orange-500" /> 이용수칙
        </h2>
        <div className="space-y-4">
          {GENERAL_RULES.map((rule) => (
            <div key={rule.id} className="p-6 glass-morphism rounded-3xl flex gap-4">
              <div className="text-orange-500"><rule.icon size={24} /></div>
              <div>
                <h3 className="font-bold text-lg">{rule.title}</h3>
                <p className="text-sm text-slate-400">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-6 bg-orange-600/10 border border-orange-600/30 rounded-3xl">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-orange-500">
            <AlertTriangle size={18} /> 투어 시 주의사항
          </h3>
          <ul className="space-y-2">
            {TOUR_RULES.map((t, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-orange-500">•</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Map Section */}
      <section id={SectionId.Map} className="py-20 px-6 bg-slate-800/30">
        <h2 className="text-3xl font-black mb-6 italic flex items-center gap-2">
          <MapIcon className="text-orange-500" /> 라이더 아지트
        </h2>
        <div className="rounded-3xl overflow-hidden aspect-[3/4] border border-slate-700 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/d/embed?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
          ></iframe>
        </div>
      </section>

      {/* AI Chat (간단한 인풋형태) */}
      <div className="px-6 py-20">
        <div className="p-6 glass-morphism rounded-3xl border-orange-500/30 border">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-orange-500" /> 라이딩 코스 추천 AI
          </h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="예: 영일대 코스 알려줘"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 text-sm focus:border-orange-500 outline-none"
            />
            <button 
              onClick={handleAskAi}
              disabled={isAiThinking}
              className="bg-orange-600 px-4 py-3 rounded-xl font-bold text-sm disabled:opacity-50"
            >
              {isAiThinking ? "생각중..." : "묻기"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 glass-morphism z-20 flex justify-around items-center px-4">
        <button onClick={() => scrollToSection(SectionId.Home)} className="flex flex-col items-center gap-1 text-slate-400">
          <MapPin size={20} />
          <span className="text-[10px] font-bold">HOME</span>
        </button>
        <button onClick={() => scrollToSection(SectionId.Rules)} className="flex flex-col items-center gap-1 text-slate-400">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-bold">RULES</span>
        </button>
        <div className="w-12 h-12 -mt-10 bg-orange-600 rounded-full border-4 border-slate-900 flex items-center justify-center text-white" onClick={() => window.open(OPEN_CHAT_URL)}>
          <MessageCircle size={24} />
        </div>
        <button onClick={() => scrollToSection(SectionId.Map)} className="flex flex-col items-center gap-1 text-slate-400">
          <MapIcon size={20} />
          <span className="text-[10px] font-bold">MAP</span>
        </button>
        <button onClick={() => window.open(INSTAGRAM_URL)} className="flex flex-col items-center gap-1 text-slate-400">
          <Instagram size={20} />
          <span className="text-[10px] font-bold">SNS</span>
        </button>
      </div>
    </div>
  );
};

// --- 4. Render ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
