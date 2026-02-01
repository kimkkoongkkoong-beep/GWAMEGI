
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
} from './constants';
import { SectionId } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SectionId>(SectionId.Home);
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToSection = (id: SectionId) => {
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
    <div className="min-h-screen pb-20 overflow-x-hidden bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection(SectionId.Home)}>
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-black text-white italic">P</div>
          <span className="font-extrabold tracking-tighter text-xl text-white">과메기 <span className="text-orange-500 italic">라이더스</span></span>
        </div>
        <button onClick={toggleMenu} className="p-1 text-white">
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
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-orange-500 transition-colors"
            >
              {id}
            </button>
          ))}
          <div className="flex gap-6 mt-8">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-pink-500"><Instagram /></a>
            <a href={OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-yellow-500"><MessageCircle /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full text-white"><Github /></a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id={SectionId.Home} className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900"></div>
        <div className="relative z-10 animate-in slide-in-from-bottom duration-700">
          <h1 className="text-5xl font-black mb-4 leading-tight italic text-white">
            포항의 파도를 가르는<br/>
            <span className="text-orange-500">과메기 라이더스</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xs mx-auto">
            자유와 안전, 그리고 뜨거운 열정으로 달리는 포항 No.1 바이크 크루
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <a href={OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-4 rounded-xl orange-glow transition-transform active:scale-95">
              <MessageCircle size={20} /> 오픈채팅방 참여하기
            </a>
            <button onClick={() => scrollToSection(SectionId.Rules)} className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-4 rounded-xl border border-white/20">
              <ShieldCheck size={20} /> 클럽 수칙 보기
            </button>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id={SectionId.About} className="py-20 px-6 max-w-2xl mx-auto text-white">
        <div className="flex items-center gap-2 mb-6 text-orange-500 font-bold tracking-wider">
          <div className="h-px w-8 bg-orange-500"></div>
          <span>WHO WE ARE</span>
        </div>
        <h2 className="text-3xl font-extrabold mb-6 italic">바다의 도시 포항에서 시작된<br/>라이더들의 진정한 쉼터</h2>
        <p className="text-slate-400 leading-relaxed mb-8">
          '포항과메기라이더스'는 포항을 거점으로 활동하는 모든 기종 라이더들의 열린 공간입니다. 
          제철 과메기처럼 쫀득하고 찰진 라이딩의 재미를 추구하며, 안전을 최우선으로 생각합니다.
          초보 라이더부터 베테랑까지, 모두가 함께 즐길 수 있는 건전한 이륜차 문화를 만들어갑니다.
        </p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h3 className="text-2xl font-bold text-orange-500 mb-1">50+</h3>
            <p className="text-slate-500 text-sm">Active Members</p>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h3 className="text-2xl font-bold text-orange-500 mb-1">Weekly</h3>
            <p className="text-slate-500 text-sm">Group Tours</p>
          </div>
        </div>
      </section>

      {/* General Rules */}
      <section id={SectionId.Rules} className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 italic text-white">
            <Info className="text-orange-500" /> 이용수칙
          </h2>
          <div className="space-y-4">
            {GENERAL_RULES.map((rule) => (
              <div key={rule.id} className="p-6 glass-morphism rounded-3xl flex gap-5 items-start">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center shrink-0 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{rule.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 text-red-400 text-sm">
            <AlertCircle className="shrink-0" size={18} />
            <span>본 수칙은 원활한 모임 운영을 위해 필수적으로 준수해야 하며, 위반 시 관리자 재량으로 조치될 수 있습니다.</span>
          </div>
        </div>
      </section>

      {/* Tour Guidelines */}
      <section id={SectionId.Tour} className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 italic text-white">
            <MapPin className="text-orange-500" /> 투어 가이드
          </h2>
          {TOUR_GUIDELINES.map((guide, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <h3 className="text-lg font-bold text-orange-500 mb-4 ml-2 uppercase tracking-widest">{guide.category}</h3>
              <div className="bg-slate-800/30 rounded-3xl border border-slate-700/50 divide-y divide-slate-700/50 overflow-hidden">
                {guide.items.map((item, i) => (
                  <div key={i} className="p-5 flex items-start gap-4 hover:bg-white/5 transition-colors">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                    <span className="text-slate-300 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Map Section */}
      <section id={SectionId.Map} className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-3 italic text-white">
            <MapIcon className="text-orange-500" /> 라이더 아지트 지도
          </h2>
          <p className="text-slate-400 mb-8 ml-2 leading-relaxed">투어 집합 장소, 추천 맛집, 카페 등 우리만의 핫플레이스를 공유합니다.</p>
          <div className="w-full aspect-[9/12] md:aspect-video rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              title="과메기 라이더스 내지도"
              loading="lazy"
            ></iframe>
          </div>
          <div className="mt-6 flex justify-between items-center px-2">
            <span className="text-xs text-slate-500 italic">Created by 과메기라이더스</span>
            <a 
              href="https://www.google.com/maps/d/viewer?mid=1qiJWtAP_E66N5tqR6nhhluV1gMhf82g" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 text-sm font-bold flex items-center gap-1 hover:underline"
            >
              큰 지도로 보기 <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Signals & Communication */}
      <section id={SectionId.Signals} className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3 italic">
            <Radio className="text-orange-500" /> 통신 & 수신호
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <PhoneCall size={20} className="text-orange-500" /> 무전 통신 (SENA)
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    대열 주행 시 세나(SENA) Mesh 2.0 사용을 적극 권장합니다. 안전한 진로 변경과 위험 감지를 위해 짧고 명확하게 소통합니다.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full"></div>
              </div>

              <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Navigation size={20} className="text-yellow-500" /> 위치 공유 (카카오맵)
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    투어 중 모든 멤버의 안전 거리를 확보하기 위해 <b>카카오맵 실시간 위치 공유</b> 기능을 사용합니다. 채팅방 내 전용 링크를 확인해주세요.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 blur-3xl rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SIGNALS.map((signal) => (
                <div key={signal.id} className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                  <h4 className="font-bold text-white mb-2">{signal.title}</h4>
                  <p className="text-sm text-slate-500">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id={SectionId.Contact} className="py-20 px-6 bg-slate-950 text-center border-t border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center font-black text-3xl text-white italic mx-auto mb-6">P</div>
          <h2 className="text-2xl font-bold mb-4 italic uppercase text-white">Pohang Gwamegi Riders</h2>
          <p className="text-slate-500 mb-10">포항의 모든 라이더가 하나되는 그날까지</p>
          
          <div className="flex justify-center gap-8 mb-12">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                <Instagram size={28} />
              </div>
              <span className="text-xs font-bold text-slate-400">INSTAGRAM</span>
            </a>
            <a href={OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <span className="text-xs font-bold text-slate-400">OPEN CHAT</span>
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Github size={28} />
              </div>
              <span className="text-xs font-bold text-slate-400">GITHUB</span>
            </a>
          </div>

          <div className="text-slate-600 text-xs mt-12">
            © 2026 POHANG GWAMEGI RIDERS. ALL RIGHTS RESERVED.<br/>
            Safe Riding, Safe Life.
          </div>
        </div>
      </section>

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-24 right-6 z-30 flex flex-col items-end gap-3">
        {showAiChat && (
          <div className="glass-morphism p-4 rounded-3xl w-72 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm text-orange-500 flex items-center gap-2">
                <Sparkles size={14} /> AI 라이더 어시스턴트
              </span>
              <button onClick={() => setShowAiChat(false)} className="text-slate-500"><X size={18} /></button>
            </div>
            <p className="text-xs text-slate-400 mb-3 text-left">포항의 멋진 투어 코스나 바이크 수칙에 대해 물어보세요!</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="어디가 좋을까?"
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm flex-1 outline-none focus:border-orange-500 text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
              />
              <button 
                onClick={handleAskAi}
                disabled={isAiThinking}
                className="bg-orange-600 p-2 rounded-lg disabled:opacity-50 text-white shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            {isAiThinking && <div className="text-[10px] text-orange-500 mt-2 animate-pulse italic text-left">Thinking...</div>}
          </div>
        )}
        <button 
          onClick={() => setShowAiChat(!showAiChat)}
          className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center orange-glow shadow-xl animate-bounce text-white"
        >
          {showAiChat ? <X /> : <Sparkles />}
        </button>
      </div>

      {/* Bottom Quick Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 glass-morphism border-t border-white/10 z-20 flex justify-around items-center px-4">
        <button onClick={() => scrollToSection(SectionId.Home)} className="flex flex-col items-center gap-1 text-slate-400 focus:text-orange-500">
          <MapPin size={20} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => scrollToSection(SectionId.Rules)} className="flex flex-col items-center gap-1 text-slate-400 focus:text-orange-500">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-bold uppercase">Rules</span>
        </button>
        <div className="w-12 h-12 -mt-10 bg-orange-600 rounded-full border-4 border-slate-900 flex items-center justify-center text-white cursor-pointer shadow-xl transition-transform active:scale-90" onClick={() => window.open(OPEN_CHAT_URL, '_blank')}>
          <MessageCircle size={24} />
        </div>
        <button onClick={() => scrollToSection(SectionId.Map)} className="flex flex-col items-center gap-1 text-slate-400 focus:text-orange-500">
          <MapIcon size={20} />
          <span className="text-[10px] font-bold uppercase">Map</span>
        </button>
        <button onClick={() => scrollToSection(SectionId.Contact)} className="flex flex-col items-center gap-1 text-slate-400 focus:text-orange-500">
          <Instagram size={20} />
          <span className="text-[10px] font-bold uppercase">Sns</span>
        </button>
      </div>
    </div>
  );
};

export default App;
