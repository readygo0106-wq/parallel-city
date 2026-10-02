type AtlasMapProps = {
  variant?: "hero" | "city" | "mini";
  className?: string;
};

export function AtlasMap({ variant = "city", className = "" }: AtlasMapProps) {
  return (
    <div className={`atlas-map atlas-map--${variant} ${className}`} role="img" aria-label="Illustrated Qingdao coastal map showing Zhongshan Road, historic blocks, trees, birds, and the shoreline">
      <svg viewBox="0 0 960 680" preserveAspectRatio={variant === "city" ? "xMidYMid slice" : "xMidYMid meet"} aria-hidden="true">
        <defs>
          <pattern id="paper-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.6" fill="#315f5b" opacity=".16" /></pattern>
          <pattern id="sea-lines" width="90" height="42" patternUnits="userSpaceOnUse"><path d="M0 27c16-8 28-8 45 0s29 8 45 0" fill="none" stroke="#f4efe4" strokeWidth="1.7" opacity=".47" /></pattern>
        </defs>
        <rect width="960" height="680" fill="#efe6d2" />
        <path d="M0 0h190c-36 47-25 91 19 112 40 19 64 39 48 75-20 46-75 24-75 71 0 39 71 67 54 124-16 53-86 57-83 111 2 46 41 54 74 73 31 18 41 60 41 114H0Z" fill="#88c4c1" />
        <path d="M0 0h190c-36 47-25 91 19 112 40 19 64 39 48 75-20 46-75 24-75 71 0 39 71 67 54 124-16 53-86 57-83 111 2 46 41 54 74 73 31 18 41 60 41 114H0Z" fill="url(#sea-lines)" />
        <path d="M189 0c-36 47-25 91 19 112 40 19 64 39 48 75-20 46-75 24-75 71 0 39 71 67 54 124-16 53-86 57-83 111 2 46 41 54 74 73 31 18 41 60 41 114" fill="none" stroke="#fff9ec" strokeWidth="10" />
        <path d="M470 0 390 680M708 0 610 680M228 193l732 65M212 420l748 105M342 0 285 680M0 611l960-158" stroke="#fff9ec" strokeWidth="21" opacity=".8" />
        <path d="M470 0 390 680M708 0 610 680M228 193l732 65M212 420l748 105M342 0 285 680M0 611l960-158" stroke="#cfbea2" strokeWidth="1.5" strokeDasharray="3 9" />
        <g fill="#668061">
          <path d="M380 56q-33-33-62 0l30 14Z"/><path d="M402 68q-29-29-55 1l29 13Z"/><path d="M429 51q-29-30-55 0l27 15Z"/>
          <path d="M803 81q-43-44-86 0l43 26Z"/><path d="M859 105q-35-40-72 0l36 22Z"/><path d="M914 83q-32-34-63 0l32 19Z"/>
          <path d="M574 376q-40-36-74 0l37 22Z"/><path d="M630 390q-32-30-62 0l31 22Z"/><path d="M686 361q-34-35-67 0l33 22Z"/>
          <path d="M767 618q-41-38-81 0l40 23Z"/><path d="M830 610q-35-38-70 0l34 22Z"/>
        </g>
        <g fill="#9aab79"><circle cx="292" cy="104" r="16"/><circle cx="314" cy="113" r="12"/><circle cx="453" cy="329" r="14"/><circle cx="471" cy="315" r="12"/><circle cx="916" cy="347" r="19"/><circle cx="895" cy="355" r="14"/><circle cx="551" cy="628" r="18"/></g>
        <g stroke="#596f5a" strokeWidth="3"><path d="M301 125v20M461 333v20M907 365v24M551 645v25"/></g>
        <g fill="#d47d65" stroke="#a35e52" strokeWidth="2">
          <path d="m394 113 50-27 52 29-51 28Z"/><path d="m505 131 48-25 48 28-49 25Z"/><path d="m351 274 73-37 76 38-73 40Z"/><path d="m689 286 60-33 61 37-62 33Z"/><path d="m736 469 72-40 71 41-72 39Z"/><path d="m390 487 55-31 56 34-56 31Z"/>
        </g>
        <g fill="#f9f0db" stroke="#bba882" strokeWidth="2">
          <path d="m394 113 51 30v43l-51-29Z"/><path d="m496 115-51 28v43l51-28Z"/><path d="m505 131 47 28v37l-47-28Z"/><path d="m601 134-49 25v37l49-27Z"/><path d="m351 274 76 41v63l-76-38Z"/><path d="m500 275-73 40v63l73-43Z"/><path d="m689 286 59 37v48l-59-35Z"/><path d="m810 290-62 33v48l62-35Z"/><path d="m736 469 71 40v53l-71-37Z"/><path d="m879 470-72 39v53l72-40Z"/><path d="m390 487 55 34v42l-55-31Z"/><path d="m501 490-56 31v42l56-30Z"/>
        </g>
        <g fill="#4c989a"><rect x="406" y="150" width="11" height="18"/><rect x="432" y="165" width="11" height="18"/><rect x="366" y="315" width="13" height="20"/><rect x="400" y="332" width="13" height="20"/><rect x="757" y="520" width="13" height="20"/><rect x="786" y="536" width="13" height="20"/></g>
        <g fill="#f0bd80"><path d="m568 510 40-20 42 22-41 22Z"/><path d="m570 511 38 23v34l-38-21Z"/><path d="m650 512-42 22v34l42-23Z"/></g>
        <g stroke="#356c70" strokeWidth="3" fill="none"><path d="M64 125q12-12 24 0 12-12 24 0M92 200q10-10 20 0 10-10 20 0M208 553q9-9 18 0 9-9 18 0"/></g>
        <path d="m43 455 47-16-21 23Z" fill="#fff8e7"/><path d="M71 461v-47l-22 29Z" fill="#d77d67"/><path d="M72 414v57" stroke="#285f63" strokeWidth="3"/>
        <path d="M0 0h960v680H0Z" fill="url(#paper-dots)" opacity=".5" />
        <g className="map-label"><rect x="515" y="234" width="180" height="35" rx="2" fill="#f4efe4"/><text x="529" y="257">ZHONGSHAN ROAD</text></g>
        <g className="map-label"><rect x="39" y="319" width="108" height="32" rx="2" fill="#f4efe4"/><text x="52" y="341">QINGDAO BAY</text></g>
        <g className="map-pin"><circle cx="431" cy="283" r="24" fill="#d77d67"/><circle cx="431" cy="283" r="9" fill="#fff9ed"/><path d="m416 297 15 23 15-23" fill="#d77d67"/></g>
      </svg>
      <div className="map-compass" aria-hidden="true"><span>N</span><b>✦</b><span>S</span></div>
      <div className="map-scale" aria-hidden="true"><span>0</span><i/><span>500 m</span></div>
    </div>
  );
}
