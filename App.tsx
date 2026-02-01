
import React, { useState } from 'react';
import { 
  Menu, X, Instagram, MessageCircle, Github,
  ShieldCheck, MapPin, Map as MapIcon, Radio, Info,
  ChevronRight, AlertCircle, PhoneCall,
  Sparkles, Navigation
} from 'lucide-react';
import { 
  CLUB_NAME, INSTAGRAM_URL, OPEN_CHAT_URL, GITHUB_URL,
  GENERAL_RULES, TOUR_GUIDELINES, SIGNALS 
} from './constants.tsx';
import { SectionId } from './types.ts';
import { GoogleGenAI } from "@google/genai";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(SectionId.Home);
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  const handleAskAi = async () => {
    if (!aiMessage.trim()) return;
    setIsAiThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `당신은 '포항과메기라이더스'의 명예 회원입니다. 질문: ${aiMessage}. 포항 근처 바이크 투어 코스나 바이크 상식에 대해 친절하게 답해주세요.`,
        config: {
          systemInstruction: "당신은 포항의 지리와 바이크 문화를 잘 아는 열정적인 라이더입니다. 친근하고 에너제틱하게 대답하세요."
        }
      });
      alert(response.text);
    } catch (error) {
      console.error(error);
      alert("AI 라이더가 잠시 휴식 중입니다. 나중에 다시 시도해주세요!");
    } finally {
      setIsAiThinking(false);
      setAiMessage('');
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-slate-900 text-slate-100">
      {/* Navigation */}
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
        <div className="fixed inset-0 z-40 bg-slate-900/95 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300">
          {Object.values(SectionId).map((id) => (
            <button 
              key={id} 
              onClick={() => scrollToSection(id)}
              className="text-2xl font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
            >
              {id}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id={SectionId.Home} className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black mb-4 leading-tight italic">
            포항의 파도를 가르는<br/>
            <span className="text-orange-500">과메기 라이더스</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xs mx-auto">
            자유와 안전, 그리고 뜨거운 열정으로 달리는 포항 No.1 바이크 크루
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <a href={OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-4 rounded-xl orange-glow">
              <MessageCircle size={20} /> 오픈채팅방 참여하기
            </a>
          </div>
        </div>
      </section>

      {/* General Rules */}
      <section id={SectionId.Rules} className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 italic">
            <Info className="text-orange-500" /> 이용수칙
          </h2>
          <div className="space-y-4">
            {GENERAL_RULES.map((rule) => (
              <div key={rule.id} className="p-6 glass-morphism rounded-3xl flex gap-5 items-start">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{rule.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id={SectionId.Map} className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-3 italic">
            <MapIcon className="text-orange-500" /> 라이더 아지트 지도
          </h2>
          <div className="w-full aspect-[9/12] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Floating AI */}
      <div className="fixed bottom-24 right-6 z-30">
        <button 
          onClick={() => setShowAiChat(!showAiChat)}
          className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center orange-glow shadow-xl animate-bounce"
        >
          <Sparkles />
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 glass-morphism z-20 flex justify-around items-center px-4">
        <button onClick={() => scrollToSection(SectionId.Home)} className="flex flex-col items-center gap-1 text-slate-400">
          <MapPin size={20} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => scrollToSection(SectionId.Rules)} className="flex flex-col items-center gap-1 text-slate-400">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-bold uppercase">Rules</span>
        </button>
        <div className="w-12 h-12 -mt-10 bg-orange-600 rounded-full border-4 border-slate-900 flex items-center justify-center text-white cursor-pointer" onClick={() => window.open(OPEN_CHAT_URL, '_blank')}>
          <MessageCircle size={24} />
        </div>
        <button onClick={() => scrollToSection(SectionId.Map)} className="flex flex-col items-center gap-1 text-slate-400">
          <MapIcon size={20} />
          <span className="text-[10px] font-bold uppercase">Map</span>
        </button>
        <button onClick={() => scrollToSection(SectionId.Contact)} className="flex flex-col items-center gap-1 text-slate-400">
          <Instagram size={20} />
          <span className="text-[10px] font-bold uppercase">Sns</span>
        </button>
      </div>
    </div>
  );
};

export default App;
