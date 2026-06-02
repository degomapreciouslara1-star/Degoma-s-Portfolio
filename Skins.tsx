import React from 'react';
import { Camera } from 'lucide-react';

export interface MsuIitLogoProps {
  className?: string;
  imageSrc?: string | null;
  onImageChange?: (src: string) => void;
  editable?: boolean;
}

export const MsuIitLogo: React.FC<MsuIitLogoProps> = ({ 
  className = 'w-12 h-12',
  imageSrc,
  onImageChange,
  editable = true
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result && onImageChange) {
          onImageChange(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    if (editable && onImageChange) {
      e.stopPropagation();
      fileInputRef.current?.click();
    }
  };

  const rotationAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  // Parallel lines configuration for the interlocking chevrons (Side 1, 2, 3)
  const lines = [
    // Side 1 (Top to Bottom-Right) - Down-Right direction
    { id: 's1-1', x1: 250 - 5, y1: 104 - 8.66, x2: 376 + 5, y2: 323 + 8.66 },
    { id: 's1-2', x1: 250 - 5 - 12.12, y1: 104 - 8.66 + 7, x2: 376 + 5 - 12.12, y2: 323 + 8.66 + 7 },
    { id: 's1-3', x1: 250 - 5 - 24.25, y1: 104 - 8.66 + 14, x2: 376 + 5 - 24.25, y2: 323 + 8.66 + 14 },

    // Side 2 (Bottom-Right to Bottom-Left) - Horizontal Left direction
    { id: 's2-1', x1: 376 + 10, y1: 323, x2: 124 - 10, y2: 323 },
    { id: 's2-2', x1: 376 + 10, y1: 323 - 14, x2: 124 - 10, y2: 323 - 14 },
    { id: 's2-3', x1: 376 + 10, y1: 323 - 28, x2: 124 - 10, y2: 323 - 28 },

    // Side 3 (Bottom-Left to Top) - Up-Right direction
    { id: 's3-1', x1: 124 - 5, y1: 323 + 8.66, x2: 250 + 5, y2: 104 - 8.66 },
    { id: 's3-2', x1: 124 - 5 + 12.12, y1: 323 + 8.66 + 7, x2: 250 + 5 + 12.12, y2: 104 - 8.66 + 7 },
    { id: 's3-3', x1: 124 - 5 + 24.25, y1: 323 + 8.66 + 14, x2: 250 + 5 + 24.25, y2: 104 - 8.66 + 14 },
  ];

  // Side 2 bottom-left segments to overlay on top of Side 3 for a perfect interlocking triquetra weave
  const side2Overlay = [
    { id: 'ov-1', x1: 155, y1: 323, x2: 114, y2: 323 },
    { id: 'ov-2', x1: 155, y1: 323 - 14, x2: 114, y2: 323 - 14 },
    { id: 'ov-3', x1: 155, y1: 323 - 28, x2: 114, y2: 323 - 28 }
  ];

  return (
    <div 
      className={`relative ${className} shrink-0 group rounded-full overflow-hidden select-none cursor-pointer flex items-center justify-center`}
      onClick={triggerUpload}
      title={editable && onImageChange ? "Click to change university logo / photo" : ""}
    >
      {editable && onImageChange && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      )}

      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt="School Seal" 
          className="w-full h-full object-cover rounded-full border border-[#2C2C2C]/10 shadow-[0_1px_3px_rgba(0,0,0,0.05)] bg-[#FDFCF9]"
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Single representative gear tooth, rotated 12 times to form the complete cog */}
            <g id="gear-tooth">
              <polygon
                points="231,105 234,74 266,74 269,105"
                fill="#FBC02D"
                stroke="#A31D1D"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </g>
            
            {/* Curved text paths within the golden ring */}
            <path id="sealPathTop" d="M 112 250 A 138 138 0 0 1 388 250" fill="none" />
            <path id="sealPathBottom" d="M 388 250 A 138 138 0 0 0 112 250" fill="none" />
          </defs>

          {/* 12 Outer Gear Teeth */}
          {rotationAngles.map((angle) => (
            <use
              key={`tooth-${angle}`}
              href="#gear-tooth"
              transform={`rotate(${angle}, 250, 250)`}
            />
          ))}

          {/* Golden Ring Body */}
          <circle cx="250" cy="250" r="150" fill="#FBC02D" stroke="#A31D1D" strokeWidth="5" />
          <circle cx="250" cy="250" r="114" fill="#FFFFFF" stroke="#A31D1D" strokeWidth="5" />

          {/* Arched Text Labels inside Golden Ring */}
          <text fill="#A31D1D" fontSize="19.5" fontWeight="900" letterSpacing="0.8" fontFamily="system-ui, sans-serif">
            <textPath href="#sealPathTop" startOffset="50%" textAnchor="middle">
              MSU - ILIGAN INSTITUTE OF
            </textPath>
          </text>
          
          <text fill="#A31D1D" fontSize="19.5" fontWeight="900" letterSpacing="1.2" fontFamily="system-ui, sans-serif">
            <textPath href="#sealPathBottom" startOffset="50%" textAnchor="middle">
              TECHNOLOGY
            </textPath>
          </text>

          {/* Central Solid Red Loop Focal Button */}
          <circle cx="250" cy="250" r="21" fill="#A31D1D" />

          {/* Interlocking Parallel Maroon Chevrons */}
          
          {/* 1. Underlying Side 1 (Top to Bottom-Right) */}
          {lines.slice(0, 3).map((l) => (
            <g key={l.id}>
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#FFFFFF" strokeWidth="16" strokeLinecap="butt" />
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#A31D1D" strokeWidth="8.5" strokeLinecap="butt" />
            </g>
          ))}

          {/* 2. Side 2 (Bottom-Right to Bottom-Left) */}
          {lines.slice(3, 6).map((l) => (
            <g key={l.id}>
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#FFFFFF" strokeWidth="16" strokeLinecap="butt" />
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#A31D1D" strokeWidth="8.5" strokeLinecap="butt" />
            </g>
          ))}

          {/* 3. Side 3 (Bottom-Left to Top - naturally overlays Side 2 at bottom-left and Side 1 at top) */}
          {lines.slice(6, 9).map((l) => (
            <g key={l.id}>
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#FFFFFF" strokeWidth="16" strokeLinecap="butt" />
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#A31D1D" strokeWidth="8.5" strokeLinecap="butt" />
            </g>
          ))}

          {/* 4. Overlap layer to weave Side 2 on top of Side 3 at the bottom-left corner */}
          {side2Overlay.map((l) => (
            <g key={l.id}>
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#FFFFFF" strokeWidth="16" strokeLinecap="butt" />
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#A31D1D" strokeWidth="8.5" strokeLinecap="butt" />
            </g>
          ))}

          {/* Central '1968' Year Text */}
          <text
            x="250"
            y="287"
            fill="#A31D1D"
            fontSize="16.5"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.4"
          >
            1968
          </text>
        </svg>
      )}

      {editable && onImageChange && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer rounded-full p-1 text-center">
          <span className="text-[7px] md:text-[8px] text-white font-mono tracking-tighter uppercase font-bold leading-tight">
            Click to Change
          </span>
        </div>
      )}
    </div>
  );
};

// Dice rendering based on dots count
export const DiceIcon: React.FC<{ dots: number; className?: string }> = ({ dots, className = 'w-24 h-24' }) => {
  const getDotPositions = (n: number) => {
    switch (n) {
      case 1:
        return [{ x: 50, y: 50 }];
      case 2:
        return [
          { x: 30, y: 70 },
          { x: 70, y: 30 }
        ];
      case 3:
        return [
          { x: 30, y: 70 },
          { x: 50, y: 50 },
          { x: 70, y: 30 }
        ];
      case 4:
        return [
          { x: 30, y: 30 },
          { x: 70, y: 30 },
          { x: 30, y: 70 },
          { x: 70, y: 70 }
        ];
      case 5:
        return [
          { x: 30, y: 30 },
          { x: 70, y: 30 },
          { x: 30, y: 70 },
          { x: 70, y: 70 },
          { x: 50, y: 50 }
        ];
      case 6:
        return [
          { x: 30, y: 30 },
          { x: 70, y: 30 },
          { x: 30, y: 50 },
          { x: 70, y: 50 },
          { x: 30, y: 70 },
          { x: 70, y: 70 }
        ];
      default:
        return [];
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} text-stone-800 transition-transform duration-300 hover:scale-105 active:scale-95`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dice Base - paper look, subtle shadow */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="20"
        fill="#fcfaf6"
        stroke="#1c1917"
        strokeWidth="6"
      />
      {/* Inner accent ring */}
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="14"
        fill="none"
        stroke="#e7e5e4"
        strokeWidth="2"
      />
      {/* Group of dots */}
      {getDotPositions(dots).map((dot, idx) => (
        <circle
          key={idx}
          cx={dot.x}
          cy={dot.y}
          r="8"
          fill="#1c1917"
          className="animate-pulse"
          style={{ animationDelay: `${idx * 150}ms` }}
        />
      ))}
    </svg>
  );
};

// 3D Isometric Dice for presentation
export const Dice3D: React.FC<{ className?: string }> = ({ className = 'w-28 h-28' }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} transition-transform duration-300 hover:rotate-6 hover:scale-110`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3D Dice Sides */}
      {/* Bottom shadow */}
      <ellipse cx="60" cy="105" rx="40" ry="10" fill="#000000" fillOpacity="0.1" />

      {/* Top Face */}
      <path
        d="M60 20 L95 38 L60 56 L25 38 Z"
        fill="#fcfaf6"
        stroke="#1c1917"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Left Face */}
      <path
        d="M25 38 L60 56 L60 95 L25 77 Z"
        fill="#f4f0e6"
        stroke="#1c1917"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Right Face */}
      <path
        d="M60 56 L95 38 L95 77 L60 95 Z"
        fill="#ebe6da"
        stroke="#1c1917"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Dots on Top Face (e.g. 1) */}
      <circle cx="60" cy="38" r="4.5" fill="#1c1917" />

      {/* Dots on Left Face (e.g. 5) */}
      <circle cx="42" cy="52" r="4" fill="#1c1917" />
      <circle cx="42" cy="71" r="4" fill="#1c1917" />
      <circle cx="48" cy="61.5" r="4" fill="#1c1917" />
      <circle cx="54" cy="52" r="4" fill="#1c1917" />
      <circle cx="54" cy="71" r="4" fill="#1c1917" />

      {/* Dots on Right Face (e.g. 3) */}
      <circle cx="72" cy="54" r="4" fill="#1c1917" />
      <circle cx="77.5" cy="65.5" r="4" fill="#1c1917" />
      <circle cx="83" cy="77" r="4" fill="#1c1917" />
    </svg>
  );
};

// Hand-drawn Quiz Sheet
export const HanddrawnQuizSheet: React.FC<{
  title: string;
  score: string;
  studentName: string;
  className?: string;
  dotsData?: string;
}> = ({ title, score, studentName, className = '', dotsData }) => {
  return (
    <div
      className={`relative w-full max-w-[280px] aspect-[3/4] bg-stone-50 border border-stone-300 rounded shadow-md p-4 overflow-hidden select-none font-mono ${className}`}
      style={{
        backgroundImage: 'linear-gradient(#f1f1f1 1px, transparent 1px)',
        backgroundSize: '100% 1.15rem',
        lineHeight: '1.15rem'
      }}
    >
      {/* Binder holes on left */}
      <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-around py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-400" />
        ))}
      </div>

      {/* Red margin line */}
      <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-300" />

      {/* Ruling lines simulation and text content */}
      <div className="pl-6 pt-1 text-[10px] text-stone-700 leading-[1.15rem]">
        <div className="border-b border-indigo-200 pb-[1.5px] mb-[1.5px] flex justify-between font-bold">
          <span>Name: <span className="font-serif italic text-blue-800 text-[11px]">{studentName}</span></span>
          <span className="text-[9px]">2026-06-02</span>
        </div>
        <div className="border-b border-indigo-200 pb-[1.5px] mb-[1.5px]">
          <span className="font-semibold text-stone-500">Subject: </span>
          <span className="text-stone-800 font-bold">BSEd Biology (TTL 1 Lab)</span>
        </div>
        <div className="border-b border-indigo-200 pb-[1.5px] mb-[2px] font-bold text-center text-indigo-700 tracking-wide text-[9px]">
          {title.toUpperCase()}
        </div>

        {/* Written answers simulation with checks & marks */}
        <div className="mt-2 space-y-[2px] text-[10px]">
          <div className="flex items-center justify-between">
            <span>1. Mitosis phase ... <span className="text-blue-700 italic font-bold">Metaphase</span></span>
            <span className="text-emerald-600 font-bold text-xs">✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span>2. Powerhouse of cell ... <span className="text-blue-700 italic font-bold">Mitochondria</span></span>
            <span className="text-emerald-600 font-bold text-xs">✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span>3. Genetic material ... <span className="text-blue-700 italic font-bold">DNA helix</span></span>
            <span className="text-emerald-600 font-bold text-xs">✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span>4. Cell membrane ... <span className="text-blue-700 italic font-bold">Phospholipid</span></span>
            {score === '5/7' ? (
              <span className="text-red-500 font-bold text-xs">✗ <span className="text-[8px] line-through text-stone-400">RNA</span></span>
            ) : (
              <span className="text-emerald-600 font-bold text-xs">✓</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span>5. Photosynthesis site ... <span className="text-blue-700 italic font-bold">Chloroplast</span></span>
            <span className="text-emerald-600 font-bold text-xs">✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span>6. Codon match ... <span className="text-blue-700 italic font-bold">Ribosome</span></span>
            <span className="text-emerald-600 font-bold text-xs">✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span>7. Cell count ... <span className="text-blue-700 italic font-bold">Cytometry</span></span>
            {score === '5/7' ? (
              <span className="text-red-500 font-bold text-xs">✗ <span className="text-[8px] line-through text-stone-400">Count</span></span>
            ) : (
              <span className="text-emerald-600 font-bold text-xs">✓</span>
            )}
          </div>
        </div>
      </div>

      {/* Handwritten big Red Score circle */}
      <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full border-3 border-red-500 flex flex-col items-center justify-center rotate-[-12deg] bg-red-50/70 select-none animate-pulse">
        <span className="text-red-500 text-[18px] font-bold tracking-tighter leading-none">{score}</span>
        <span className="text-red-400 text-[8px] font-bold uppercase leading-none">Passed</span>
        {/* Draw a handwritten tick underneath */}
        <svg viewBox="0 0 50 15" className="w-12 h-4 text-red-500 fill-none stroke-current stroke-3">
          <path d="M5 10 Q15 2 22 13 T45 3" />
        </svg>
      </div>
    </div>
  );
};

// ZipGrade Bubble Sheet rendering
export const ZipgradeSheet: React.FC<{
  title: string;
  score: string;
  className?: string;
  isFirst?: boolean;
}> = ({ title, score, className = '', isFirst = true }) => {
  return (
    <div className={`relative w-full max-w-[280px] aspect-[3/4.2] bg-white border-2 border-stone-400 rounded-lg shadow-lg p-3 text-stone-800 flex flex-col justify-between select-none ${className}`}>
      {/* Corner calibration targets */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 bg-stone-900 rounded-sm" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-stone-900 rounded-sm" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 bg-stone-900 rounded-sm" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-stone-900 rounded-sm" />

      {/* Outer border container */}
      <div className="border border-stone-800 p-2 h-full flex flex-col justify-between text-stone-800 font-sans">
        
        {/* ZipGrade Header */}
        <div className="text-center border-b-2 border-stone-800 pb-1.5">
          <div className="flex justify-between items-center px-1">
            <span className="text-[11px] font-black tracking-widest text-stone-900">ZIPGRADE.COM</span>
            <span className="text-[9px] bg-stone-200 px-1 rounded font-bold">{isFirst ? 'MIDTERM' : 'FINALEXAM'}</span>
          </div>
          <h1 className="text-[12px] font-serif font-black tracking-tight text-stone-900 mt-1">{title.toUpperCase()}</h1>
        </div>

        {/* Student Metadata Box */}
        <div className="grid grid-cols-2 gap-1 text-[8px] my-1.5 bg-stone-50 p-1 rounded font-mono border border-stone-200">
          <div>
            <span className="text-stone-500">Student Name:</span>
            <div className="font-bold text-stone-900 truncate">Degoma, Precious Lara L.</div>
          </div>
          <div>
            <span className="text-stone-500">Subject Class:</span>
            <div className="font-bold text-stone-900 truncate">BSEd Bio / T78</div>
          </div>
        </div>

        {/* Bubble sheet grid mock */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] leading-tight flex-1 py-1">
          {[...Array(20)].map((_, i) => {
            const qNum = i + 1;
            const chosenLetter = ['A', 'B', 'B', 'D', 'C', 'A', 'E', 'B', 'C', 'D'][qNum % 10];
            const isCorrect = isFirst ? qNum % 4 !== 0 : qNum % 12 !== 0; // Final (isFirst=false) has high score!
            
            return (
              <div key={i} className="flex items-center space-x-1 border-b border-stone-100 py-0.5">
                <span className="font-bold text-stone-500 w-3 text-right">{qNum}</span>
                <div className="flex space-x-[2px] items-center">
                  {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                    const isSelected = letter === chosenLetter;
                    return (
                      <div
                        key={letter}
                        className={`w-3.5 h-3.5 rounded-full border border-stone-400 flex items-center justify-center text-[5.5px] font-semibold transition-colors
                          ${isSelected 
                            ? 'bg-stone-950 text-white border-stone-950 font-bold' 
                            : 'bg-stone-50 text-stone-500'
                          } relative`}
                      >
                        {letter}
                        {isSelected && !isCorrect && (
                          <div className="absolute inset-0 bg-red-400 rounded-full opacity-60 flex items-center justify-center text-white font-black text-[6px]">
                            ✗
                          </div>
                        )}
                        {isSelected && isCorrect && qNum % 5 === 0 && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 text-white text-[5px] flex items-center justify-center">
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Written score marker & Signature */}
        <div className="border-t-2 border-stone-800 pt-1.5 flex justify-between items-end font-mono">
          <div className="leading-none text-left">
            <span className="text-[6.5px] text-stone-500 block uppercase font-bold">Verified Sign</span>
            <span className="font-serif italic font-semibold text-stone-950 text-[10px] tracking-wide relative block mt-0.5">
              Lara Degoma
              <span className="absolute -top-2 left-0 w-8 h-[1px] bg-indigo-400 rotate-[-8deg] opacity-60"></span>
            </span>
          </div>
          
          {/* Detailed grade badge */}
          <div className="bg-stone-100 hover:bg-stone-200 border border-stone-300 px-2 py-0.5 rounded text-right leading-tight">
            <span className="text-[6px] text-stone-500 block uppercase font-bold">Final Score</span>
            <span className="text-[12px] font-black text-rose-600 block tracking-tight">{score}</span>
            <span className="text-[5.5px] font-bold text-stone-600 block">{isFirst ? 'PASSED (75%)' : 'EXCELLENT (93%)'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

// Elegant high-fidelity SVG representation of Precious Lara Degoma to guarantee uncanny resemblance on load!
export const StudentAvatar: React.FC<{
  imageSrc?: string | null;
  onImageChange?: (src: string) => void;
  className?: string;
}> = ({ imageSrc, onImageChange, className = 'w-48 h-48' }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result && onImageChange) {
          onImageChange(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerUpload = () => {
    if (onImageChange) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div 
      className={`relative group inline-block ${className} cursor-pointer hover:scale-[1.02] transition-transform duration-300`}
      onClick={triggerUpload}
      title={onImageChange ? "Click anywhere to change photo" : ""}
    >
      {/* Upload Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {imageSrc ? (
        // Custom uploaded image
        <div className="w-full h-full rounded-lg overflow-hidden border-4 border-stone-200 shadow-lg relative bg-white">
          <img src={imageSrc} alt="Precious Lara" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 bg-stone-900 border border-amber-400 text-stone-100 font-sans text-xs rounded shadow-md font-semibold hover:bg-stone-800">
              Change Photo
            </span>
          </div>
        </div>
      ) : (
        // High fidelity styled vector portrait matching the screenshot
        <div className="w-full h-full rounded-2xl overflow-hidden border-[6px] border-stone-200 bg-[#e5e0d4] shadow-lg relative group transition-all duration-300 hover:border-amber-500/80 hover:shadow-xl">
          <svg viewBox="0 0 100 100" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3eee3" />
                <stop offset="100%" stopColor="#dcd5c5" />
              </linearGradient>
              <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#801b1b" />
                <stop offset="50%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#6b1414" />
              </linearGradient>
              <clipPath id="circleClip">
                <rect x="2" y="2" width="96" height="96" rx="14" />
              </clipPath>
            </defs>

            {/* Background */}
            <rect width="100" height="100" fill="url(#avatarGrad)" />
            
            {/* Subtle blackboard/library background lines */}
            <line x1="10" y1="20" x2="90" y2="20" stroke="#cabfa8" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="10" y1="35" x2="90" y2="35" stroke="#cabfa8" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="15" y1="50" x2="45" y2="50" stroke="#cabfa8" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="55" y1="50" x2="85" y2="50" stroke="#cabfa8" strokeWidth="0.5" strokeDasharray="3 3" />

            <g clipPath="url(#circleClip)">
              {/* Hair Back */}
              <path d="M25 50 C25 22, 75 22, 75 50 C75 58, 72 65, 78 72 C74 76, 68 70, 68 62 M25 50 C25 58, 28 65, 22 72 C26 76, 32 70, 32 62" fill="#1c1917" />
              
              {/* Ears */}
              <circle cx="31" cy="48" r="4.5" fill="#facc15" fillOpacity="0.15" />
              <circle cx="31" cy="48" r="3.2" fill="#fbcfe8" />
              <circle cx="69" cy="48" r="4.5" fill="#facc15" fillOpacity="0.15" />
              <circle cx="69" cy="48" r="3.2" fill="#fbcfe8" />

              {/* Neck */}
              <path d="M44 54 L56 54 L54 62 L46 62 Z" fill="#ebbe9b" />
              <path d="M44 58 C44 58, 50 62, 56 58" stroke="#d49e73" strokeWidth="1" fill="none" />

              {/* Face */}
              <path d="M33 42 C33 27, 67 27, 67 42 C67 56, 60 62, 50 62 C40 62, 33 56, 33 42 Z" fill="#fbcfe8" />
              
              {/* Blush cheeks */}
              <circle cx="39" cy="50" r="3.5" fill="#f43f5e" fillOpacity="0.25" />
              <circle cx="61" cy="50" r="3.5" fill="#f43f5e" fillOpacity="0.25" />

              {/* Hair front bangs */}
              <path d="M32 40 C35 30, 48 24, 52 28 C56 24, 65 30, 68 40 C70 45, 68 32, 60 26 C53 23, 44 23, 38 26 C31 32, 30 45, 32 40 Z" fill="#1c1917" />
              
              {/* Happy Eyes with lashes */}
              <path d="M36 43 C37.5 41, 41.5 41, 43 43" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M57 43 C58.5 41, 62.5 41, 64 43" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" fill="none" />
              
              {/* Eyebrows */}
              <path d="M35 39 C37 37, 41 37, 42.5 38.5" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" fill="none" />
              <path d="M65 39 C63 37, 59 37, 57.5 38.5" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" fill="none" />

              {/* Nose */}
              <path d="M49 46 C49 46, 50 49, 51 46" stroke="#d49e73" strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Glasses - black thick frame (UNCANNY!) */}
              <rect x="33" y="39" width="13" height="9" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="2.2" />
              <rect x="54" y="39" width="13" height="9" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="2.2" />
              <line x1="46" y1="43" x2="54" y2="43" stroke="#1a1a1a" strokeWidth="2.5" />
              {/* Temple pieces left and right */}
              <line x1="33" y1="42" x2="28" y2="40" stroke="#1a1a1a" strokeWidth="1.8" />
              <line x1="67" y1="42" x2="72" y2="40" stroke="#1a1a1a" strokeWidth="1.8" />

              {/* Smile / Mouth */}
              <path d="M44 51 Q50 56 56 51" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* White teeth detail inside smile */}
              <path d="M45 52 Q50 55 55 52" fill="none" stroke="#ffffff" strokeWidth="1.2" />

              {/* Clothes: White collar + Maroon Blazer jacket (MSU-IIT blazer) */}
              <path d="M30 72 L70 72 L65 58 L35 58 Z" fill="#ffffff" />  {/* White inner shirt */}
              <path d="M22 62 C30 62, 35 68, 35 100 L65 100 C65 68, 70 62, 78 62 C85 64, 80 100, 80 100 L20 100 C20 100, 15 64, 22 62 Z" fill="url(#jacketGrad)" /> {/* Blazer */}
              
              {/* Left & Right Blazer collars */}
              <polygon points="35,62 44,78 30,76 26,62" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="0.5" />
              <polygon points="65,62 56,78 70,76 74,62" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="0.5" />

              {/* Little golden circular lapel pin (MSU IIT designator crest!) */}
              <circle cx="31" cy="70" r="1.8" fill="#eab308" stroke="#1c1917" strokeWidth="0.4" />
              <polygon points="31,69.2 29.8,71 32.2,71" fill="#7f1d1d" />
            </g>

            {/* Frame border */}
            <rect x="2" y="2" width="96" height="96" rx="14" fill="none" stroke="#57534e" strokeWidth="1.5" />
          </svg>

          {/* Hover instruction label */}
          <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-center p-2">
            <span className="text-[11px] text-amber-300 uppercase tracking-widest font-bold">Replace Photo</span>
            <span className="text-[9px] text-stone-200 mt-1 max-w-[80%] font-medium">Click anywhere to select your real image</span>
          </div>
        </div>
      )}

      {/* Floating always-visible stylish camera icon button on the bottom corner */}
      {onImageChange && (
        <div 
          className="absolute bottom-1 right-1 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white p-2 rounded-full border-2 border-stone-100 shadow-md transition-all group-hover:scale-110 z-10 hover:border-amber-400"
          title="Change photo"
        >
          <Camera className="w-4 h-4 text-amber-400" />
        </div>
      )}
    </div>
  );
};
