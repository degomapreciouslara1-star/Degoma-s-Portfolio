import React, { useState } from 'react';
import { MsuIitLogo } from './Skins';
import { Search, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
  schoolLogo?: string | null;
  onSchoolLogoChange?: (src: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  tabs,
  schoolLogo,
  onSchoolLogoChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#2C2C2C]/10 text-[#2C2C2C] sticky top-0 z-50 py-1">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center cursor-pointer select-none group"
            id="nav-brand"
          >
            <MsuIitLogo 
              className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105" 
              imageSrc={schoolLogo}
              onImageChange={onSchoolLogoChange}
            />
            <div className="ml-2.5 leading-tight">
              <span className="text-[#1A1A1A] font-serif font-bold tracking-tight text-xs md:text-sm block">
                MSU-IIT CED
              </span>
              <span className="block text-[8px] md:text-[9px] text-[#5A5A40] font-mono tracking-wider font-semibold">
                TECHNOLOGY PORTFOLIO
              </span>
            </div>
          </div>

          {/* Desktop Tab Menu */}
          <div className="hidden lg:flex items-center space-x-1" id="nav-tabs-desktop">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 py-1.5 text-[11px] font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'text-[#1A1A1A] font-bold' 
                      : 'text-[#2C2C2C]/60 hover:text-[#1A1A1A] hover:bg-[#F0EEE6]/60 rounded-sm'
                    }`}
                >
                  {tab.label}
                  {/* Subtle clean bottom line for active state without any noise */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#1A1A1A]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Accessories (Search box + Mobile trigger) */}
          <div className="flex items-center space-x-3">
            {/* Search toggler */}
            <div className="relative flex items-center">
              {showSearch ? (
                <div className="flex items-center bg-[#EAE8E0] border border-[#2C2C2C]/10 rounded px-2.5 py-1 mr-1 transition-all">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search outputs..."
                    className="bg-transparent text-xs text-[#2C2C2C] placeholder-[#2C2C2C]/40 outline-none w-28 md:w-40 font-serif"
                  />
                  <X 
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearch(false);
                    }} 
                    className="w-3.5 h-3.5 text-[#2C2C2C]/60 hover:text-[#1A1A1A] cursor-pointer ml-1" 
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-1.5 rounded hover:bg-[#EAE8E0] text-[#2C2C2C]/70 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  title="Search portfolio..."
                >
                  <Search className="w-4 h-4 md:w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded hover:bg-[#EAE8E0] text-[#2C2C2C]/70 hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F0] border-t border-[#2C2C2C]/10 px-4 pt-2 pb-4 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-[11px] font-sans tracking-widest uppercase transition-colors cursor-pointer block
                  ${isActive 
                    ? 'bg-[#EAE8E0] text-[#1A1A1A] font-bold border-l-2 border-[#1A1A1A] pl-2' 
                    : 'text-[#2C2C2C]/60 hover:bg-[#F0EEE6]/80 hover:text-[#1A1A1A]'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
