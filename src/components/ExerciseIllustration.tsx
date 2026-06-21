/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IllustrationProps {
  svgType: string;
  accentColor: string; // Neon A (Cyan) or Neon B (Rose)
}

export const ExerciseIllustration: React.FC<IllustrationProps> = ({ svgType, accentColor }) => {
  // Theme Color System
  const frameColor = '#475569';      // slate-600 (strong steel machine frames)
  const darkFrame = '#1e293b';       // slate-800 (shadow structures)
  const padColor = '#171717';        // zinc-900 (leather seat cushions)
  const padBorder = '#3f3f46';       // zinc-700
  const cableColor = '#94a3b8';      // slate-400 (steel cables)
  const pullyColor = '#64748b';      // slate-500 (guide pulleys)
  const stackColor = '#334155';      // slate-700 (weight stack plates)
  const activePulse = accentColor;   // Interactive high contrast color

  switch (svgType) {
    case 'leg_extension':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Base Floor Steel Frame */}
          <path d="M15,105 L115,105 M40,105 L40,40 M100,105 L100,20 L115,20" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Weight Stack (stacked horizontal plates) */}
          <rect x="95" y="32" width="22" height="60" fill="#1e293b" stroke={frameColor} strokeWidth="1.5" />
          {[38, 45, 52, 59, 66, 73, 80, 87].map((yHeight) => (
            <rect key={yHeight} x="97" y={yHeight} width="18" height="4" fill={stackColor} rx="0.5" />
          ))}
          {/* Selection Pin */}
          <circle cx="106" cy="68" r="2.5" fill={activePulse} />
          <line x1="106" y1="68" x2="114" y2="68" stroke={activePulse} strokeWidth="1.5" />
          
          {/* Cables and Pulley system leading to active lever */}
          <circle cx="106" cy="24" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          <line x1="106" y1="24" x2="65" y2="24" stroke={cableColor} strokeWidth="1.5" />
          <circle cx="65" cy="24" r="4" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          <line x1="65" y1="24" x2="65" y2="55" stroke={cableColor} strokeWidth="1.2" />

          {/* Seated Gym Chair (Seat & Back support pads) */}
          <rect x="25" y="70" width="30" height="8" rx="2" fill={padColor} stroke={padBorder} strokeWidth="1.5" /> {/* Seat */}
          <rect x="23" y="42" width="8" height="28" rx="2" fill={padColor} stroke={padBorder} strokeWidth="1.5" /> {/* Backrest */}

          {/* Pivot Leg pad lever */}
          <circle cx="50" cy="74" r="4" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          {/* Dynamic leg pad extension lever swinging up */}
          <line x1="50" y1="74" x2="68" y2="86" stroke={frameColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Foam leg roller cushion */}
          <circle cx="68" cy="86" r="6" fill={activePulse} stroke="#000" strokeWidth="1" />

          {/* Motion Indicators (Leg push up) */}
          <path d="M54,94 Q68,96 74,80" stroke={activePulse} strokeWidth="2" strokeDasharray="3 3" fill="none" strokeLinecap="round" />
          <path d="M71,80 L76,80 L74,85 Z" fill={activePulse} />
          
          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">CADEIRA EXTENSORA</text>
        </svg>
      );

    case 'leg_press_45':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Heavy 45 Degree Incline Base Tracks */}
          <path d="M15,105 L125,105 M115,105 L115,20 L35,100" stroke={frameColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Sub diagonal rail */}
          <line x1="25" y1="105" x2="95" y2="35" stroke={frameColor} strokeWidth="2.5" />

          {/* Seat tilted backwards at bottom */}
          <rect x="20" y="80" width="22" height="7" rx="1" transform="rotate(-15 20 80)" fill={padColor} stroke={padBorder} strokeWidth="1.5" />
          <rect x="15" y="55" width="7" height="24" rx="1" transform="rotate(15 15 55)" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Incline sliding sled carriage */}
          <rect x="58" y="44" width="26" height="10" transform="rotate(-45 58 44)" fill={darkFrame} stroke={frameColor} strokeWidth="2" />
          {/* Heavy metal plate holder on sled */}
          <line x1="68" y1="46" x2="52" y2="30" stroke={frameColor} strokeWidth="4.5" strokeLinecap="round" />
          {/* Circular weight plates loaded on the sled */}
          <circle cx="58" cy="36" r="11" fill={activePulse} stroke="#111" strokeWidth="1.5" />
          <circle cx="63" cy="41" r="11" fill={activePulse} stroke="#111" strokeWidth="1.5" opacity="0.85" />
          <circle cx="58" cy="36" r="4" fill="#000" />

          {/* Heavy Footplate sled press board */}
          <line x1="78" y1="38" x2="94" y2="54" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />

          {/* Directional Force arrow */}
          <path d="M68,68 L56,56" stroke={activePulse} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M54,58 L54,53 L59,53 Z" fill={activePulse} />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">LEG PRESS 45°</text>
        </svg>
      );

    case 'leg_horizontal':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Horizontal twin guide rails */}
          <path d="M15,105 L125,105" stroke={frameColor} strokeWidth="3" />
          <path d="M15,92 L125,92" stroke={frameColor} strokeWidth="2" strokeDasharray="1 1" />
          
          {/* Foot plate on the right */}
          <path d="M110,50 L110,95 L118,95" stroke={frameColor} strokeWidth="4" strokeLinecap="round" />

          {/* Sliding Seat Carriage unit */}
          <rect x="25" y="72" width="26" height="18" fill="none" stroke={frameColor} strokeWidth="1.5" />
          <circle cx="32" cy="91" r="3" fill="#1e293b" stroke={frameColor} />
          <circle cx="44" cy="91" r="3" fill="#1e293b" stroke={frameColor} />
          
          {/* Seated cushions (comfort leather padding) */}
          <rect x="28" y="66" width="22" height="6" rx="1.5" fill={padColor} stroke={padBorder} strokeWidth="1.5" />
          <rect x="22" y="44" width="6" height="22" rx="1.5" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Integrated Selectorized Weight Stack Unit on the left block */}
          <rect x="75" y="45" width="24" height="46" fill="#111" stroke={frameColor} strokeWidth="2" />
          {[52, 58, 64, 70, 76, 82, 88].map((h) => (
            <rect key={h} x="78" y={h} width="18" height="3.5" fill={activePulse} stroke="#000" strokeWidth="0.5" />
          ))}

          {/* Force tension push indicator */}
          <path d="M58,76 L68,76" stroke={activePulse} strokeWidth="2" />
          <path d="M68,76 L64,73 L64,79 Z" fill={activePulse} />

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">LEG HORIZONTAL</text>
        </svg>
      );

    case 'adductor':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Front Angle Seat and Machine Chassis */}
          <path d="M20,105 L120,105 M70,105 L70,45" stroke={frameColor} strokeWidth="3" />
          
          {/* Seat Cushion */}
          <ellipse cx="70" cy="74" rx="22" ry="10" fill={padColor} stroke={padBorder} strokeWidth="2" />
          {/* Backrest Cushion */}
          <rect x="62" y="35" width="16" height="28" rx="3" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Symmetrical Left and Right Swiveling pads */}
          {/* Left Pad (Pushes inward) */}
          <rect x="36" y="52" width="10" height="24" rx="3" fill={padColor} stroke={activePulse} strokeWidth="2" />
          <line x1="36" y1="64" x2="48" y2="64" stroke={frameColor} strokeWidth="3" />
          {/* Right Pad (Pushes inward) */}
          <rect x="94" y="52" width="10" height="24" rx="3" fill={padColor} stroke={activePulse} strokeWidth="2" />
          <line x1="104" y1="64" x2="92" y2="64" stroke={frameColor} strokeWidth="3" />

          {/* Symmetrical Action flow vectors (Inward compress targets) */}
          <path d="M28,64 Q46,64 50,64" stroke={activePulse} strokeWidth="2" />
          <path d="M112,64 Q94,64 90,64" stroke={activePulse} strokeWidth="2" />
          
          {/* Glow spots inside */}
          <circle cx="58" cy="74" r="5" fill={activePulse} opacity="0.8" />
          <circle cx="82" cy="74" r="5" fill={activePulse} opacity="0.8" />

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">CADEIRA ADUTORA</text>
        </svg>
      );

    case 'squat_free':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Sturdy Free squat rack stand (Gaiola de agachamento) */}
          <path d="M15,105 L125,105" stroke={frameColor} strokeWidth="3" />
          {/* Vertical Columns */}
          <rect x="30" y="25" width="6" height="80" fill={darkFrame} stroke={frameColor} strokeWidth="2" />
          <rect x="104" y="25" width="6" height="80" fill={darkFrame} stroke={frameColor} strokeWidth="2" />
          {/* Safety Spotter Arms */}
          <path d="M26,75 L45,75 M114,75 L95,75" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />

          {/* Hook pegs holding active loaded Barbell */}
          <path d="M28,45 L38,45 M112,45 L102,45" stroke="#f1f5f9" strokeWidth="4" />

          {/* The Barbell (Barra livre) */}
          <line x1="12" y1="43" x2="128" y2="43" stroke="#e2e8f0" strokeWidth="2.5" />
          {/* Left bumper weight plates */}
          <rect x="20" y="32" width="4" height="22" rx="1" fill={activePulse} stroke="#000" strokeWidth="1" />
          <circle cx="22" cy="43" r="11" fill={activePulse} stroke="#000" strokeWidth="1.5" />
          <circle cx="16" cy="43" r="9" fill={activePulse} stroke="#000" strokeWidth="1.5" />
          {/* Right bumper weight plates */}
          <rect x="116" y="32" width="4" height="22" rx="1" fill={activePulse} stroke="#000" strokeWidth="1" />
          <circle cx="118" cy="43" r="11" fill={activePulse} stroke="#000" strokeWidth="1.5" />
          <circle cx="124" cy="43" r="9" fill={activePulse} stroke="#000" strokeWidth="1.5" />

          {/* Central grip indicator */}
          <rect x="55" y="41.5" width="30" height="3" fill="#e2e8f0" stroke={activePulse} strokeWidth="0.5" />

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">AGACHAMENTO LIVRE</text>
        </svg>
      );

    case 'stiff_dumbbell':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Double level classic steel Gym Gym Dumbbell Rack */}
          <path d="M15,105 L125,105 M30,105 L45,45 M110,105 L95,45" stroke={frameColor} strokeWidth="3" />
          {/* Lower shelf bar */}
          <line x1="20" y1="85" x2="120" y2="85" stroke={frameColor} strokeWidth="2.5" />
          {/* Upper shelf bar */}
          <line x1="38" y1="52" x2="102" y2="52" stroke={frameColor} strokeWidth="2.5" />

          {/* Dumbbells resting on the upper shelf */}
          {[46, 60, 74, 88].map((cxPos) => (
            <g key={cxPos}>
              {/* Dumbbell plates */}
              <rect x={cxPos - 4} y="44" width="3" height="15" rx="1" fill="#222" stroke="#444" strokeWidth="0.5" />
              <rect x={cxPos + 2} y="44" width="3" height="15" rx="1" fill="#222" stroke="#444" strokeWidth="0.5" />
              {/* Grip bar */}
              <line x1={cxPos - 4} y1="51.5" x2={cxPos + 4} y2="51.5" stroke={cableColor} strokeWidth="1.5" />
            </g>
          ))}

          {/* Active highlighting dumbbells (Hexagonal shape, larger on the floor) */}
          <g transform="translate(10, 0)">
            <rect x="40" y="86" width="36" height="2" fill="#555" />
            
            {/* Left dumbbell */}
            <path d="M44,92 L50,92 L53,95 L53,101 L50,104 L44,104 L41,101 L41,95 Z" fill={padColor} stroke={activePulse} strokeWidth="1.5" />
            <path d="M60,92 L66,92 L69,95 L69,101 L66,104 L60,104 L57,101 L57,95 Z" fill={padColor} stroke={activePulse} strokeWidth="1.5" />
            <line x1="50" y1="98" x2="60" y2="98" stroke="#f8fafc" strokeWidth="2.5" />
          </g>

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">STIFF COM HALTER</text>
        </svg>
      );

    case 'lat_pulldown':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Overhead Lat pulldown steel pillar chassis */}
          <path d="M15,108 L125,108 M45,108 L45,18 L90,18" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Seated bench support & foam knee rollers */}
          <rect x="25" y="76" width="30" height="7" rx="1.5" fill={padColor} stroke={padBorder} strokeWidth="1.5" />
          <circle cx="50" cy="70" r="5" fill="#222" stroke={frameColor} strokeWidth="1" /> {/* knee hold roller */}

          {/* Integrated selectorized weight stack tower */}
          <rect x="90" y="32" width="22" height="65" fill="#111" stroke={frameColor} strokeWidth="1.5" />
          {[38, 44, 50, 56, 62, 68, 74, 80, 86, 92].map((y) => (
            <rect key={y} x="92" y={y} width="18" height="3.5" fill={stackColor} rx="0.5" stroke="#000" strokeWidth="0.5" />
          ))}
          {/* Chrome Select-pin */}
          <circle cx="101" cy="62" r="2.5" fill={activePulse} />

          {/* Cable Pull pulley wheels */}
          <circle cx="88" cy="22" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1.0" />
          <circle cx="45" cy="22" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1.0" />
          
          {/* Lat-pull cable lines */}
          <line x1="90" y1="22" x2="90" y2="35" stroke={cableColor} strokeWidth="1.5" />
          <line x1="88" y1="22" x2="45" y2="22" stroke={cableColor} strokeWidth="1.5" />
          {/* Hanging down cable wire */}
          <line x1="45" y1="22" x2="45" y2="48" stroke={activePulse} strokeWidth="1.8" />

          {/* Wide lateral bar handle */}
          <path d="M20,48 L45,51 L70,48" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Hands grip indicators at extreme ends */}
          <circle cx="21" cy="48" r="3" fill={activePulse} />
          <circle cx="69" cy="48" r="3" fill={activePulse} />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">PUXADA MAQUINA</text>
        </svg>
      );

    case 'chest_supported_row':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Vertical and horizontal mechanical floor stand */}
          <path d="M15,105 L115,105 M35,105 L45,40 L95,40" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Footplate rest angle */}
          <path d="M30,105 L22,78" stroke={frameColor} strokeWidth="2.5" />

          {/* Slanted chest pad, seat cushion support */}
          <rect x="24" y="80" width="16" height="7" rx="1" fill={padColor} stroke={padBorder} strokeWidth="1.5" /> {/* Seat */}
          <rect x="42" y="46" width="6" height="24" rx="2" transform="rotate(15 42 46)" fill={padColor} stroke={padBorder} strokeWidth="1.5" /> {/* Chest board */}

          {/* Pull Lever connected to selectorized load or plate pegs */}
          <circle cx="85" cy="40" r="4" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          {/* Heavy swing lever arm moving backward */}
          <line x1="85" y1="40" x2="68" y2="76" stroke={frameColor} strokeWidth="3" />
          {/* Pulling dynamic handles with high visibility highlight */}
          <circle cx="68" cy="76" r="6" fill={activePulse} stroke="#000" strokeWidth="1" />
          
          {/* Double weight plate on active peg */}
          <circle cx="85" cy="62" r="11" fill={stackColor} stroke="#222" strokeWidth="1" />
          <circle cx="85" cy="62" r="6" fill="#000" />

          {/* Motion pull curve indicator */}
          <path d="M78,76 Q65,70 60,74" stroke={activePulse} strokeWidth="1.5" strokeDasharray="2 2" fill="none" />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">REMADA APOIADA</text>
        </svg>
      );

    case 'bicep_curl_bar':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Preacher Scott curls bench stand (Banco Scott) */}
          <path d="M15,105 L125,105 M70,105 L70,45" stroke={frameColor} strokeWidth="3" />
          
          {/* Slanted Preacher arm rest pad cushion */}
          <rect x="42" y="44" width="40" height="15" rx="3" transform="rotate(-15 42 44)" fill={padColor} stroke={padBorder} strokeWidth="2" />
          
          {/* Small seated pad cushion */}
          <rect x="85" y="75" width="22" height="7" rx="1" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Barbell rest brackets underneath */}
          <path d="M42,68 L50,60" stroke={frameColor} strokeWidth="2.5" strokeLinecap="round" />
          
          {/* The EZ Bar / Straight Barbell loaded with plates */}
          <g transform="translate(14, 5)">
            <path d="M20,62 L32,58 L45,64 L58,58 L70,62" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="18" cy="62" r="10" fill={activePulse} stroke="#111" strokeWidth="1" />
            <circle cx="14" cy="62" r="8" fill={activePulse} stroke="#111" strokeWidth="1" />
            <rect x="70" y="55" width="4" height="14" rx="1" fill={stackColor} />
            <rect x="8" y="55" width="4" height="14" rx="1" fill={stackColor} />
          </g>

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">BICEPS BARRA LIVRE</text>
        </svg>
      );

    case 'bicep_pulley':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Low pulley machine column frame */}
          <path d="M15,105 L115,105 M35,105 L35,20 L50,20" stroke={frameColor} strokeWidth="3.2" strokeLinecap="round" />
          
          {/* Selectorized weight stack column */}
          <rect x="18" y="32" width="16" height="70" fill="#111" stroke={frameColor} strokeWidth="1.5" />
          {[38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98].map((yHeight) => (
            <rect key={yHeight} x="20" y={yHeight} width="12" height="3" fill={stackColor} stroke="#000" strokeWidth="0.5" />
          ))}

          {/* Low Pulley Wheel system */}
          <circle cx="35" cy="98" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          
          {/* Core high pulley system wheel guides */}
          <circle cx="35" cy="22" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          <line x1="28" y1="22" x2="28" y2="35" stroke={cableColor} strokeWidth="1.2" />

          {/* Active pulley cable pulled up diagonally */}
          <line x1="35" y1="98" x2="80" y2="48" stroke={activePulse} strokeWidth="1.8" />
          
          {/* Straight bicep revolving bar handle pulled up */}
          <line x1="75" y1="44" x2="85" y2="52" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="48" r="3.5" fill={activePulse} stroke="#111" />

          {/* High visibility force waves */}
          <circle cx="80" cy="48" r="9" stroke={activePulse} strokeWidth="1" strokeDasharray="3 3.5" fill="none" />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">BÍCEPS EM POLIA</text>
        </svg>
      );

    case 'treadmill':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Solid Heavy Treadmill Base Desk (Deck correndo) */}
          <rect x="25" y="85" width="85" height="12" rx="4" fill={darkFrame} stroke={frameColor} strokeWidth="2" />
          {/* The revolving belt loop texture lines */}
          <line x1="32" y1="91" x2="102" y2="91" stroke="#444" strokeWidth="3" strokeDasharray="5 4" />

          {/* Bottom structural engine hood */}
          <rect x="20" y="78" width="14" height="15" rx="2" fill={frameColor} stroke="#222" />

          {/* Upright structural arm bars and console mast */}
          <path d="M85,85 L102,40 L88,40" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Wide interactive LCD tablet computer screen (Painel digital) */}
          <rect x="84" y="24" width="22" height="16" rx="2" fill="#111" stroke={frameColor} strokeWidth="1.5" />
          <rect x="87" y="27" width="16" height="10" fill="#000" />
          <path d="M88,31 L93,31 L96,29 L101,33" stroke={activePulse} strokeWidth="1" fill="none" />

          {/* Red Emergency safety cable clip */}
          <circle cx="92" cy="42" r="2.5" fill="#ef4444" />
          <path d="M92,42 Q86,52 88,64" stroke="#ef4444" strokeWidth="1" fill="none" />

          {/* Green Go Pulsing indicator on the belt board */}
          <circle cx="50" cy="91" r="3" fill={activePulse} className="animate-ping" />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">ESTEIRA CARDIO</text>
        </svg>
      );

    case 'leg_curl':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Solid Seated Flexor base frame */}
          <path d="M15,105 L115,105 M35,108 L35,42 M100,105 L100,20" stroke={frameColor} strokeWidth="3" />
          
          {/* Seated cushions with slight forward tilt */}
          <rect x="25" y="65" width="28" height="8" rx="2" transform="rotate(10 25 65)" fill={padColor} stroke={padBorder} strokeWidth="1.5" /> {/* Seat */}
          <rect x="22" y="38" width="8" height="26" rx="2" transform="rotate(-5 22 38)" fill={padColor} stroke={padBorder} strokeWidth="1.5" /> {/* Backrest */}

          {/* Integrated Selectorized Weight Stack Unit */}
          <rect x="95" y="35" width="20" height="58" fill="#13151a" stroke={frameColor} strokeWidth="1.5" />
          {[40, 46, 52, 58, 64, 70, 76, 82, 88].map((y) => (
            <rect key={y} x="97" y={y} width="16" height="3" fill={stackColor} stroke="#000" strokeWidth="0.5" />
          ))}
          <circle cx="105" cy="64" r="2.5" fill={activePulse} />

          {/* Rotating joint pivot hub */}
          <circle cx="56" cy="74" r="4.5" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          
          {/* Swinging flexor arm pressing downwards backwards */}
          <line x1="56" y1="74" x2="74" y2="92" stroke={frameColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Foam foot roller pad cushion */}
          <circle cx="74" cy="92" r="6" fill={activePulse} stroke="#000" strokeWidth="1" />

          {/* Motion Indicators (Leg curling back down) */}
          <path d="M54,92 Q68,96 72,93" stroke={activePulse} strokeWidth="1.5" strokeDasharray="2.5 2" fill="none" />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">CADEIRA FLEXORA</text>
        </svg>
      );

    case 'abductor':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Symmetrical Chassis structure */}
          <path d="M15,105 L125,105 M70,105 L70,45" stroke={frameColor} strokeWidth="3" />
          
          {/* Seating pads */}
          <ellipse cx="70" cy="74" rx="22" ry="10" fill={padColor} stroke={padBorder} strokeWidth="2" />
          <rect x="62" y="35" width="16" height="28" rx="3" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Outer Abduction thigh support pads */}
          {/* Left cushion pushing out */}
          <rect x="22" y="52" width="10" height="24" rx="3" fill={padColor} stroke={activePulse} strokeWidth="2" />
          <line x1="22" y1="64" x2="38" y2="64" stroke={frameColor} strokeWidth="3" />
          
          {/* Right cushion pushing out */}
          <rect x="108" y="52" width="10" height="24" rx="3" fill={padColor} stroke={activePulse} strokeWidth="2" />
          <line x1="118" y1="64" x2="102" y2="64" stroke={frameColor} strokeWidth="3" />

          {/* Symmetrical force lines pushing apart outwards */}
          <path d="M44,64 L30,64" stroke={activePulse} strokeWidth="2" />
          <path d="M30,64 L34,60 L34,68 Z" fill={activePulse} />
          
          <path d="M96,64 L110,64" stroke={activePulse} strokeWidth="2" />
          <path d="M110,64 L106,60 L106,68 Z" fill={activePulse} />

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">CADEIRA ABDUTORA</text>
        </svg>
      );

    case 'sumo_squat':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Ground surface bar */}
          <path d="M15,106 L125,106" stroke={frameColor} strokeWidth="2.5" />

          {/* Large heavy Kettlebell sitting in target position */}
          <g transform="translate(45, 34)">
            {/* Round heavy bell iron base */}
            <circle cx="25" cy="48" r="21" fill={padColor} stroke={activePulse} strokeWidth="3" />
            <circle cx="25" cy="48" r="14" fill="#1e293b" stroke="#334155" />
            
            {/* Clean weight text label */}
            <text x="17" y="52" fill={activePulse} className="text-[9px] font-mono font-black select-none pointer-events-none">24kg</text>

            {/* Kettlebell thick grip handle */}
            <path d="M11,35 C11,10 39,10 39,35" fill="none" stroke="#f1f5f9" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M11,32 L39,32" stroke={frameColor} strokeWidth="5.5" />
          </g>

          {/* Feet guide footprint guides to highlight sumo wide stance */}
          <g opacity="0.8">
            <rect x="20" y="85" width="12" height="20" rx="3" transform="rotate(-30 20 85)" fill="#222" stroke={activePulse} strokeWidth="1" />
            <rect x="110" y="78" width="12" height="20" rx="3" transform="rotate(30 110 78)" fill="#222" stroke={activePulse} strokeWidth="1" />
          </g>

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">AGACHAMENTO SUMÔ</text>
        </svg>
      );

    case 'calf_raise':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Rigid Standing Calf raise machine block frame */}
          <path d="M20,105 L120,105 M40,105 L40,25" stroke={frameColor} strokeWidth="3" />
          
          {/* Elevated angled calf step block */}
          <polygon points="70,105 105,86 105,105" fill={darkFrame} stroke={frameColor} strokeWidth="2" />
          {/* Foot friction grip pad layer */}
          <line x1="72" y1="104" x2="103" y2="87.5" stroke={activePulse} strokeWidth="2.5" />

          {/* High leverage shoulder pads cushion assembly */}
          <rect x="33" y="32" width="25" height="15" rx="3" fill={padColor} stroke={padBorder} strokeWidth="2" />
          <line x1="45" y1="47" x2="45" y2="105" stroke={frameColor} strokeWidth="2" />

          {/* Upwards raising guide vectors (Glows) */}
          <path d="M92,72 L92,52" stroke={activePulse} strokeWidth="2" strokeDasharray="3 3" />
          <path d="M92,52 L89,56 L95,56 Z" fill={activePulse} />

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">PANTURRILHA EM PÉ</text>
        </svg>
      );

    case 'pec_fly':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Seated spine of mechanical Chest Fly (Pec Deck) */}
          <path d="M15,105 L115,105 M70,105 L70,22 L110,22" stroke={frameColor} strokeWidth="3" />
          
          {/* Seat cushion & back plate */}
          <rect x="52" y="72" width="36" height="8" rx="2" fill={padColor} stroke={padBorder} strokeWidth="1.5" />
          <rect x="65" y="38" width="10" height="34" rx="2" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Dual pivoting arms hanging from top overhead gears */}
          <circle cx="70" cy="24" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1" />
          
          {/* Left sweeping pivot chest lever */}
          <path d="M70,24 C45,24 45,65 45,65" stroke={frameColor} strokeWidth="2.5" fill="none" />
          <rect x="40" y="52" width="10" height="16" rx="1.5" fill={padColor} stroke={activePulse} strokeWidth="1.5" /> {/* Foam arm pad */}

          {/* Right sweeping pivot chest lever */}
          <path d="M70,24 C95,24 95,65 95,65" stroke={frameColor} strokeWidth="2.5" fill="none" />
          <rect x="90" y="52" width="10" height="16" rx="1.5" fill={padColor} stroke={activePulse} strokeWidth="1.5" /> {/* Foam arm pad */}

          {/* Symmetrical sweeping arrows pointing inward to close */}
          <path d="M35,60 Q55,48 65,58" stroke={activePulse} strokeWidth="1.5" strokeDasharray="3 3.5" fill="none" />
          <path d="M105,60 Q85,48 75,58" stroke={activePulse} strokeWidth="1.5" strokeDasharray="3 3.5" fill="none" />

          <text x="12" y="14" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">PEITORAL FLY</text>
        </svg>
      );

    case 'chest_press_machine':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Heavy flat frame representing horizontal seated chest press */}
          <path d="M15,105 L125,105 M35,105 L35,22 M80,105 L80,50" stroke={frameColor} strokeWidth="3" />
          
          {/* Seated cushions with straight vertical back */}
          <rect x="25" y="75" width="26" height="8" rx="1.5" fill={padColor} stroke={padBorder} strokeWidth="1.5" />
          <rect x="22" y="42" width="8" height="34" rx="2" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Mechanical push lever and solid handles */}
          <circle cx="55" cy="28" r="4" fill={pullyColor} stroke={frameColor} />
          {/* Lever swinging forward away from athlete seat */}
          <line x1="55" y1="28" x2="68" y2="70" stroke={frameColor} strokeWidth="3.2" strokeLinecap="round" />
          {/* Dual grip handle highlighted */}
          <line x1="62" y1="58" x2="74" y2="58" stroke={activePulse} strokeWidth="4" strokeLinecap="round" />

          {/* Press force indicator arrows pushing outward */}
          <path d="M54,64 L72,64" stroke={activePulse} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M72,64 L68,61 L68,67 Z" fill={activePulse} />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">SUPINO MAQUINA</text>
        </svg>
      );

    case 'incline_hammer_press':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Angled Spine support and frame */}
          <path d="M15,105 L125,105 M40,105 L85,25 M85,25 L105,105" stroke={frameColor} strokeWidth="3.2" />
          
          {/* Premium Inclined Seat support cushion */}
          <rect x="36" y="66" width="24" height="7.5" rx="1.5" transform="rotate(-30 36 66)" fill={padColor} stroke={padBorder} strokeWidth="1.5" />
          <rect x="52" y="32" width="8" height="32" rx="2" transform="rotate(-30 52 32)" fill={padColor} stroke={padBorder} strokeWidth="1.5" />

          {/* Articulated Incline push horn lever */}
          <circle cx="85" cy="35" r="4.5" fill={pullyColor} stroke={frameColor} />
          
          {/* Angled press handle swinging up and away */}
          <line x1="85" y1="35" x2="66" y2="60" stroke={frameColor} strokeWidth="3" />
          <circle cx="66" cy="60" r="5" fill={activePulse} stroke="#000" strokeWidth="1" />

          {/* Plates loaded on front horn pegs */}
          <circle cx="80" cy="54" r="10" fill={stackColor} stroke="#000" strokeWidth="1" />
          <line x1="72" y1="54" x2="88" y2="54" stroke={frameColor} strokeWidth="3.5" />

          {/* Angle push arrows */}
          <path d="M58,52 L68,36" stroke={activePulse} strokeWidth="2" strokeDasharray="3 3" />
          <path d="M68,36 L62,38 L65,42 Z" fill={activePulse} />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">HAMMER INCLINADO</text>
        </svg>
      );

    case 'lateral_raise':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Standard overhead standing pulley frame or rack */}
          <path d="M15,105 L125,105 M35,105 L35,20 L50,20" stroke={frameColor} strokeWidth="3" />
          
          {/* Stack and pulley setup */}
          <rect x="20" y="36" width="12" height="64" fill="#111" stroke={frameColor} strokeWidth="1" />
          {[42, 48, 54, 60, 66, 72, 78, 84, 90, 96].map((yHeight) => (
            <rect key={yHeight} x="21" y={yHeight} width="10" height="2.5" fill={stackColor} stroke="#000" strokeWidth="0.5" />
          ))}

          {/* A central beautiful freestanding dumbbell stand */}
          <g transform="translate(68, 44)">
            {/* Pyramid dumbbell tower */}
            <polygon points="12,62 18,22 26,22 32,62" fill="none" stroke={frameColor} strokeWidth="2.5" />
            <rect x="8" y="60" width="28" height="2" fill={frameColor} />
            
            {/* Displaying two active hexagonal dumbbells on hooks */}
            <circle cx="21" cy="30" r="5" fill={activePulse} stroke="#000" strokeWidth="1" />
            <line x1="16" y1="30" x2="26" y2="30" stroke="#f1f5f9" strokeWidth="2" />
            <circle cx="21" cy="46" r="6" fill={activePulse} stroke="#000" strokeWidth="1.5" />
            <line x1="15" y1="46" x2="27" y2="46" stroke="#f1f5f9" strokeWidth="2" />
          </g>

          <text x="12" y="16" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">ELEVAÇÃO LATERAL</text>
        </svg>
      );

    case 'tricep_pushdown':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Crossover column towering high pulleys */}
          <path d="M15,108 L125,108 M45,108 L45,18 L110,18" stroke={frameColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* High pully chrome wheel */}
          <circle cx="45" cy="22" r="5.5" fill={pullyColor} stroke={frameColor} strokeWidth="1" />

          {/* Column weight stack unit */}
          <rect x="95" y="32" width="20" height="66" fill="#111" stroke={frameColor} strokeWidth="1.5" />
          {[38, 44, 50, 56, 62, 68, 74, 80, 86, 92].map((y) => (
            <rect key={y} x="97" y={y} width="16" height="3" fill={stackColor} rx="0.5" stroke="#000" strokeWidth="0.5" />
          ))}
          <circle cx="105" cy="62" r="2.5" fill={activePulse} />

          {/* Tension wire steel cables */}
          <line x1="45" y1="22" x2="95" y2="22" stroke={cableColor} strokeWidth="1.5" />
          <line x1="97" y1="22" x2="97" y2="34" stroke={cableColor} strokeWidth="1.5" />

          {/* Cable wire going downwards from high pulley to the active rope handle */}
          <line x1="45" y1="22" x2="45" y2="56" stroke={activePulse} strokeWidth="1.8" />
          
          {/* Braided Tricep Rope handle loaded with high viz glowing knot caps */}
          <path d="M40,68 L45,56 L50,68" fill="none" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="40" cy="68" r="3.5" fill={activePulse} stroke="#111" />
          <circle cx="50" cy="68" r="3.5" fill={activePulse} stroke="#111" />

          {/* Action indicator arrows */}
          <path d="M45,74 L45,86" stroke={activePulse} strokeWidth="2" strokeLinecap="round" />
          <path d="M45,86 L42,82 L48,82 Z" fill={activePulse} />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">TRÍCEPS POLIA</text>
        </svg>
      );

    case 'cable_pullover':
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          {/* Outer pulley tower frame */}
          <path d="M15,108 L125,108 M45,108 L45,18 L90,18" stroke={frameColor} strokeWidth="3" />
          
          {/* High pulley system wheel */}
          <circle cx="45" cy="22" r="5" fill={pullyColor} stroke={frameColor} strokeWidth="1.2" />

          {/* Weight plate tower column block */}
          <rect x="90" y="32" width="22" height="66" fill="#111" stroke={frameColor} strokeWidth="1.5" />
          {[38, 44, 50, 56, 62, 68, 74, 80, 86, 92].map((y) => (
            <rect key={y} x="92" y={y} width="18" height="3" fill={stackColor} rx="0.5" stroke="#000" strokeWidth="0.5" />
          ))}

          {/* Diagonal cable being pulled in arc to activate lats */}
          <line x1="45" y1="22" x2="68" y2="60" stroke={activePulse} strokeWidth="1.8" />
          {/* Pull Bar attachment straight grip */}
          <line x1="63" y1="56" x2="73" y2="64" stroke="#f1f5f9" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="68" cy="60" r="3" fill={activePulse} stroke="#111" />

          {/* Dynamic sweeping arc to guide mechanical pullover path */}
          <path d="M48,32 C58,36 70,48 70,60" stroke={activePulse} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

          <text x="12" y="15" fill={activePulse} className="text-[9px] font-sans font-black tracking-widest uppercase">PULLOVER POLIA</text>
        </svg>
      );

    default:
      // High-quality multi-exercise fallback representation
      return (
        <svg viewBox="0 0 140 120" className="w-full h-full max-w-[150px] mx-auto" fill="none" stroke="currentColor">
          <circle cx="70" cy="60" r="45" stroke={frameColor} strokeWidth="2" strokeDasharray="4 4" />
          <rect x="62" y="30" width="16" height="60" rx="3" fill={darkFrame} stroke={frameColor} strokeWidth="2.5" />
          <line x1="35" y1="60" x2="105" y2="60" stroke={activePulse} strokeWidth="6" strokeLinecap="round" />
          <circle cx="70" cy="60" r="12" fill={padColor} stroke="#222" strokeWidth="2" />
          <text x="50" y="112" fill={activePulse} className="text-[8px] font-mono tracking-widest">PRO TREINO</text>
        </svg>
      );
  }
};
