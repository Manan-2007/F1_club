import { useParallaxLayer } from '@/hooks/useParallaxLayer'

/**
 * CarParallax — 2D layered SVG F1 car with mouse-driven parallax depth.
 * Replaced wholesale by Canvas3D in Phase 5 — props interface is just `mouseRef`.
 *
 * Five stacked SVGs share one 900×400 coordinate space; each layer moves at a
 * different depth so the car reads as volumetric. Nose points left, viewed
 * slightly from above — far-side wheels sit higher, smaller, and darker.
 */
export default function CarParallax({ mouseRef }) {
  const shadowRef = useParallaxLayer(mouseRef, 6, 3)
  const bodyRef = useParallaxLayer(mouseRef, 14, 7)
  const tyresRef = useParallaxLayer(mouseRef, 20, 10)
  const wingsRef = useParallaxLayer(mouseRef, 26, 13)
  const haloRef = useParallaxLayer(mouseRef, 32, 16)

  return (
    <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-8 xl:pr-16 opacity-30 md:opacity-100 pointer-events-none select-none">
      <div className="relative w-full max-w-3xl" style={{ height: '400px' }}>
        {/* LAYER 1 — Ground shadow / reflection */}
        <div ref={shadowRef} className="absolute inset-0">
          <svg viewBox="0 0 900 400" width="100%" height="100%">
            <defs>
              <radialGradient id="cpShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#000000" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cpUnderglow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E10600" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#E10600" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* broad soft shadow */}
            <ellipse cx="465" cy="354" rx="345" ry="24" fill="url(#cpShadow)" />
            {/* red underglow bleeding out from beneath the floor */}
            <ellipse cx="460" cy="350" rx="230" ry="14" fill="url(#cpUnderglow)" />
            {/* contact patches under each near tyre */}
            <ellipse cx="248" cy="352" rx="72" ry="9" fill="#000" opacity="0.5" />
            <ellipse cx="644" cy="352" rx="80" ry="10" fill="#000" opacity="0.5" />
          </svg>
        </div>

        {/* LAYER 2 — Car body: chassis, nose, sidepods, engine cover */}
        <div ref={bodyRef} className="absolute inset-0">
          <svg viewBox="0 0 900 400" width="100%" height="100%">
            <defs>
              {/* panel curvature — lit from above */}
              <linearGradient id="cpBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E1E1E" />
                <stop offset="45%" stopColor="#101010" />
                <stop offset="100%" stopColor="#070707" />
              </linearGradient>
              <linearGradient id="cpPod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#242424" />
                <stop offset="55%" stopColor="#121212" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
              <linearGradient id="cpRed" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E10600" />
                <stop offset="100%" stopColor="#FF1E00" />
              </linearGradient>
              <linearGradient id="cpFin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#191919" />
                <stop offset="100%" stopColor="#0C0C0C" />
              </linearGradient>
              {/* carbon weave suggestion — fine diagonal hatching */}
              <pattern
                id="cpCarbon"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="6" height="6" fill="none" />
                <line x1="0" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeOpacity="0.03" strokeWidth="1.5" />
              </pattern>
              {/* subtle red halo bleed around the whole car */}
              <filter id="cpGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.88  0 0 0 0 0.02  0 0 0 0 0  0 0 0 0.35 0"
                  result="redBlur"
                />
                <feMerge>
                  <feMergeNode in="redBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#cpGlow)">
              {/* ===== main silhouette: nose → chassis → airbox → engine cover → floor ===== */}
              <path
                d="M128 276
                   C 170 262, 252 250, 345 246
                   L 445 240
                   C 452 243, 460 244, 470 244
                   L 540 241
                   C 552 226, 558 204, 574 194
                   C 584 190, 592 192, 600 196
                   C 648 206, 706 230, 756 258
                   L 762 284
                   L 700 296
                   C 640 306, 560 312, 480 310
                   L 396 302
                   C 330 300, 250 294, 180 290
                   L 128 288 Z"
                fill="url(#cpBody)"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="1"
              />
              {/* carbon texture over the silhouette */}
              <path
                d="M128 276
                   C 170 262, 252 250, 345 246
                   L 445 240
                   C 452 243, 460 244, 470 244
                   L 540 241
                   C 552 226, 558 204, 574 194
                   C 584 190, 592 192, 600 196
                   C 648 206, 706 230, 756 258
                   L 762 284
                   L 700 296
                   C 640 306, 560 312, 480 310
                   L 396 302
                   C 330 300, 250 294, 180 290
                   L 128 288 Z"
                fill="url(#cpCarbon)"
              />

              {/* ===== nose cone tip — separate darker panel with red stripe ===== */}
              <path
                d="M128 276 C 156 266, 192 259, 232 254 L 236 268 C 198 272, 160 278, 130 287 Z"
                fill="#0A0A0A"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              {/* red vanity stripe along the nose spine */}
              <path
                d="M142 273 C 205 259, 282 250, 352 247 L 352 252 C 284 255, 208 263, 146 277 Z"
                fill="url(#cpRed)"
                opacity="0.92"
              />

              {/* ===== sidepod — bulging panel with undercut ===== */}
              <path
                d="M388 260
                   C 434 251, 505 250, 562 257
                   C 601 262, 623 277, 618 295
                   C 614 303, 596 307, 570 308
                   C 508 311, 442 308, 404 297
                   C 384 289, 379 271, 388 260 Z"
                fill="url(#cpPod)"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1"
              />
              {/* undercut shadow beneath the pod */}
              <path
                d="M404 297 C 448 306, 520 309, 580 306 L 574 310 C 512 313, 446 310, 402 300 Z"
                fill="#000000"
                opacity="0.55"
              />
              {/* radiator inlet — dark mouth at pod front */}
              <path
                d="M390 263 C 398 258, 410 256, 420 257 L 416 284 C 404 283, 394 277, 390 270 Z"
                fill="#030303"
              />
              {/* red sidepod strake along the pod shoulder */}
              <path
                d="M398 262 C 462 253, 542 253, 598 266 L 599 272 C 543 259, 463 259, 400 269 Z"
                fill="url(#cpRed)"
              />

              {/* ===== engine cover shark fin with red trailing edge ===== */}
              <path
                d="M588 198 C 634 200, 682 214, 724 240 L 716 248 C 678 224, 634 210, 590 208 Z"
                fill="url(#cpFin)"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
              <path
                d="M722 238 L 728 242 L 720 250 L 714 246 Z"
                fill="#E10600"
                opacity="0.85"
              />

              {/* ===== airbox intake — dark oval above cockpit ===== */}
              <path
                d="M562 202 C 566 194, 576 191, 584 194 C 588 198, 586 206, 578 210 C 570 212, 562 209, 562 202 Z"
                fill="#030303"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />

              {/* ===== cockpit opening ===== */}
              <ellipse cx="497" cy="242" rx="52" ry="12" fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* mirror — red cap on carbon stalk */}
              <line x1="447" y1="238" x2="443" y2="228" stroke="#1A1A1A" strokeWidth="3" />
              <ellipse cx="442" cy="226" rx="10" ry="5" fill="#E10600" />

              {/* race number on engine cover */}
              <text
                x="652"
                y="252"
                fontSize="26"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="700"
                fill="rgba(255,255,255,0.14)"
                transform="rotate(8 652 252)"
              >
                01
              </text>

              {/* floor edge — thin red line under the sidepod */}
              <path
                d="M340 302 C 420 308, 520 311, 600 307 L 600 310 C 520 314, 420 311, 340 305 Z"
                fill="#E10600"
                opacity="0.35"
              />
            </g>
          </svg>
        </div>

        {/* LAYER 3 — Tyres + rims (far side first, then near side) */}
        <div ref={tyresRef} className="absolute inset-0">
          <svg viewBox="0 0 900 400" width="100%" height="100%">
            <defs>
              <radialGradient id="cpRim" cx="38%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#3A3A3A" />
                <stop offset="60%" stopColor="#232323" />
                <stop offset="100%" stopColor="#121212" />
              </radialGradient>
              <radialGradient id="cpTyre" cx="40%" cy="35%" r="72%">
                <stop offset="0%" stopColor="#181818" />
                <stop offset="80%" stopColor="#0E0E0E" />
                <stop offset="100%" stopColor="#060606" />
              </radialGradient>
            </defs>

            {/* --- far-side tyres (smaller, higher, darker) --- */}
            <circle cx="302" cy="272" r="45" fill="#0A0A0A" stroke="#141414" strokeWidth="2" />
            <circle cx="302" cy="272" r="26" fill="#151515" />
            <circle cx="302" cy="272" r="10" fill="#1E1E1E" />

            <circle cx="694" cy="266" r="50" fill="#0A0A0A" stroke="#141414" strokeWidth="2" />
            <circle cx="694" cy="266" r="29" fill="#151515" />
            <circle cx="694" cy="266" r="11" fill="#1E1E1E" />

            {/* --- suspension arms reaching to the near wheels --- */}
            <path d="M300 264 L 258 282 L 262 288 L 302 272 Z" fill="#222222" />
            <path d="M690 258 L 652 276 L 656 282 L 694 266 Z" fill="#222222" />

            {/* --- near front tyre --- */}
            <circle cx="248" cy="294" r="57" fill="url(#cpTyre)" stroke="#1C1C1C" strokeWidth="3" />
            {/* sidewall highlight — light catching the top */}
            <path d="M200 268 A 57 57 0 0 1 292 262" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="2" />
            {/* sidewall branding ring */}
            <circle cx="248" cy="294" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x="248" y="264" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
              PIRELLI
            </text>
            {/* soft-compound red ring marking */}
            <circle cx="248" cy="294" r="40" fill="none" stroke="#E10600" strokeWidth="1.5" opacity="0.45" />
            {/* brake glow behind the rim */}
            <circle cx="248" cy="294" r="20" fill="#E10600" opacity="0.25" />
            {/* rim + spokes */}
            <circle cx="248" cy="294" r="32" fill="url(#cpRim)" />
            <g stroke="#0C0C0C" strokeWidth="4">
              <line x1="248" y1="264" x2="248" y2="324" />
              <line x1="218" y1="294" x2="278" y2="294" />
              <line x1="227" y1="273" x2="269" y2="315" />
              <line x1="269" y1="273" x2="227" y2="315" />
            </g>
            <circle cx="248" cy="294" r="9" fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="1.5" />
            <circle cx="248" cy="294" r="4" fill="#E10600" />

            {/* --- near rear tyre (largest) --- */}
            <circle cx="644" cy="289" r="63" fill="url(#cpTyre)" stroke="#1C1C1C" strokeWidth="3" />
            <path d="M590 260 A 63 63 0 0 1 692 254" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="2" />
            <circle cx="644" cy="289" r="51" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x="644" y="256" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
              PIRELLI
            </text>
            <circle cx="644" cy="289" r="44" fill="none" stroke="#E10600" strokeWidth="1.5" opacity="0.45" />
            <circle cx="644" cy="289" r="22" fill="#E10600" opacity="0.25" />
            <circle cx="644" cy="289" r="36" fill="url(#cpRim)" />
            <g stroke="#0C0C0C" strokeWidth="4">
              <line x1="644" y1="256" x2="644" y2="322" />
              <line x1="611" y1="289" x2="677" y2="289" />
              <line x1="621" y1="266" x2="667" y2="312" />
              <line x1="667" y1="266" x2="621" y2="312" />
            </g>
            <circle cx="644" cy="289" r="10" fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="1.5" />
            <circle cx="644" cy="289" r="4.5" fill="#E10600" />
          </svg>
        </div>

        {/* LAYER 4 — Front wing + rear wing assemblies */}
        <div ref={wingsRef} className="absolute inset-0">
          <svg viewBox="0 0 900 400" width="100%" height="100%">
            <defs>
              <linearGradient id="cpEndplate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF1E00" />
                <stop offset="100%" stopColor="#B00500" />
              </linearGradient>
            </defs>

            {/* ===== FRONT WING — three stacked elements, nose-left ===== */}
            {/* main plane (lowest, widest) */}
            <path
              d="M96 330 C 150 322, 212 313, 262 305 L 265 314 C 213 322, 152 331, 98 339 Z"
              fill="#0B0B0B"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* second flap */}
            <path
              d="M102 320 C 155 312, 212 304, 258 298 L 260 306 C 213 312, 156 320, 104 328 Z"
              fill="#121212"
            />
            {/* third flap with red tip */}
            <path
              d="M110 311 C 158 304, 210 297, 254 292 L 256 299 C 211 304, 160 311, 112 318 Z"
              fill="#0E0E0E"
            />
            <path
              d="M226 294 C 236 293, 246 292, 254 292 L 256 299 C 247 300, 237 301, 228 302 Z"
              fill="#E10600"
              opacity="0.9"
            />
            {/* near endplate — red, vertical */}
            <path
              d="M89 295 L 86 337 C 93 342, 102 340, 105 335 L 103 297 C 98 292, 92 292, 89 295 Z"
              fill="url(#cpEndplate)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.75"
            />
            {/* inner/far endplate — darker red */}
            <path
              d="M256 290 L 260 315 C 266 313, 271 307, 270 299 L 267 290 Z"
              fill="#9E0400"
            />
            {/* nose-to-wing pylons */}
            <path d="M150 285 L 146 306 L 156 305 L 160 285 Z" fill="#0A0A0A" />
            <path d="M182 283 L 179 303 L 188 302 L 191 283 Z" fill="#0A0A0A" />

            {/* ===== REAR WING — endplates, DRS main plane + flap, beam wing ===== */}
            {/* far endplate — darker red */}
            <path
              d="M816 166 L 813 252 C 819 257, 826 255, 828 249 L 829 172 C 825 164, 819 163, 816 166 Z"
              fill="#9E0400"
            />
            {/* main plane */}
            <path
              d="M726 190 C 760 184, 792 182, 818 184 L 818 196 C 792 194, 760 196, 726 202 Z"
              fill="#0B0B0B"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            {/* DRS slot gap */}
            <path
              d="M726 203 C 762 197, 794 196, 818 197 L 818 201 C 794 200, 762 201, 726 207 Z"
              fill="#000000"
              opacity="0.85"
            />
            {/* upper DRS flap */}
            <path
              d="M726 208 C 762 202, 794 200, 818 202 L 818 212 C 794 210, 762 212, 726 218 Z"
              fill="#131313"
            />
            {/* DRS actuator pod */}
            <ellipse cx="772" cy="188" rx="9" ry="4" fill="#1E1E1E" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
            {/* beam wing — lower element */}
            <path
              d="M730 252 C 764 248, 796 246, 814 248 L 814 256 C 796 254, 764 256, 730 260 Z"
              fill="#0D0D0D"
            />
            {/* swan-neck mounting struts */}
            <path d="M758 202 C 755 224, 752 240, 750 252 L 758 252 C 760 240, 763 224, 766 202 Z" fill="#1A1A1A" />
            <path d="M792 202 C 790 222, 788 238, 787 250 L 794 250 C 796 238, 798 222, 800 202 Z" fill="#161616" />
            {/* near endplate — red, drawn last so it fronts the planes */}
            <path
              d="M714 172 L 710 268 C 718 274, 727 272, 729 266 L 731 176 C 726 168, 718 168, 714 172 Z"
              fill="url(#cpEndplate)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.75"
            />
            {/* endplate louvre details */}
            <line x1="716" y1="188" x2="727" y2="186" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
            <line x1="715" y1="196" x2="727" y2="194" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
            <line x1="715" y1="204" x2="726" y2="202" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* LAYER 5 — Halo, LED strip, cockpit detail (closest, most movement) */}
        <div ref={haloRef} className="absolute inset-0">
          <svg viewBox="0 0 900 400" width="100%" height="100%">
            {/* halo hoop — thick titanium band over the cockpit */}
            <path
              d="M452 246 C 452 216, 468 202, 502 199 C 534 196, 552 206, 554 220 L 555 246"
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="13"
              strokeLinecap="round"
            />
            {/* top-edge highlight */}
            <path
              d="M452 246 C 452 216, 468 202, 502 199 C 534 196, 552 206, 554 220 L 555 246"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* red accent ring just inside the hoop */}
            <path
              d="M456 244 C 456 219, 471 206, 502 203 C 531 200, 548 209, 550 221 L 551 244"
              fill="none"
              stroke="#E10600"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />
            {/* front pillar */}
            <path d="M500 200 L 491 240" stroke="#161616" strokeWidth="7" strokeLinecap="round" />
            {/* green LED strip along the crown + soft glow */}
            <path
              d="M470 206 Q 502 197 534 205"
              fill="none"
              stroke="#00FF99"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.15"
            />
            <path
              d="M470 206 Q 502 197 534 205"
              fill="none"
              stroke="#00FF99"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* cockpit interior — deepest black */}
            <ellipse cx="500" cy="245" rx="44" ry="11" fill="#030303" />
            {/* headrest padding */}
            <ellipse cx="524" cy="241" rx="16" ry="7" fill="#0A0A0A" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* helmet crown peeking above the cockpit rim */}
            <path
              d="M482 240 C 483 230, 492 224, 502 225 C 511 226, 517 232, 517 240 Z"
              fill="#151515"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <path d="M485 236 C 490 230, 500 228, 508 230" fill="none" stroke="#E10600" strokeWidth="2" opacity="0.7" />

            {/* T-cam above the airbox — red/black broadcast marker */}
            <rect x="561" y="178" width="16" height="7" rx="3.5" fill="#E10600" />
            <rect x="567" y="185" width="4" height="8" fill="#141414" />

            {/* nose camera pods */}
            <rect x="196" y="256" width="5" height="14" rx="2.5" fill="#E10600" />
            <rect x="203" y="257" width="4" height="12" rx="2" fill="#CC0500" />
          </svg>
        </div>
      </div>
    </div>
  )
}
