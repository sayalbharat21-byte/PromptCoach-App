import React, { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  :root {
    --bg:#07090f; --bg2:#0c0f1a; --surface:#0f1320; --surface2:#141827;
    --border:rgba(255,255,255,0.07); --border2:rgba(255,255,255,0.13);
    --indigo:#6366f1; --indigo-l:#818cf8; --indigo-d:#4338ca;
    --emerald:#10b981; --rose:#f43f5e; --amber:#f59e0b; --sky:#38bdf8;
    --text:#f1f5f9; --text2:#94a3b8; --text3:#475569;
    --r-sm:9px; --r-md:14px; --r-lg:20px;
    --ease:cubic-bezier(0.4,0,0.2,1);
    --shadow-card:0 1px 3px rgba(0,0,0,0.4),0 4px 16px rgba(0,0,0,0.25);
    --shadow-primary:0 4px 20px rgba(99,102,241,0.35),0 1px 4px rgba(99,102,241,0.2);
    --shadow-primary-hover:0 8px 30px rgba(99,102,241,0.5),0 2px 8px rgba(99,102,241,0.3);
  }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(99,102,241,0.35); border-radius:999px; }
  ::-webkit-scrollbar-thumb:hover { background:rgba(99,102,241,0.6); }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; overflow-x:hidden; }
  body::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse 90% 60% at 15% -5%,rgba(99,102,241,0.16) 0%,transparent 55%),radial-gradient(ellipse 60% 40% at 85% 105%,rgba(16,185,129,0.08) 0%,transparent 55%),radial-gradient(ellipse 50% 50% at 50% 50%,rgba(99,102,241,0.03) 0%,transparent 70%); pointer-events:none; z-index:0; animation:ambientShift 12s ease-in-out infinite alternate; }
  @keyframes ambientShift { 0% { opacity:1; transform:scale(1) translateY(0); } 100% { opacity:0.75; transform:scale(1.04) translateY(-8px); } }
  #root { min-height:100vh; display:block; }
  html, body { margin:0; padding:0; }
  .shell { position:relative; z-index:1; max-width:860px; margin:0 auto; padding:0 28px 100px; min-height:100vh; }
  .top-bar { display:flex; align-items:center; justify-content:space-between; padding:24px 0 28px; }
  .brand { display:flex; align-items:center; gap:13px; }
  .brand-icon { width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg,var(--indigo),var(--indigo-d)); display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:var(--shadow-primary); transition:transform 0.2s var(--ease),box-shadow 0.2s; }
  .brand-icon:hover { transform:scale(1.05) rotate(-3deg); }
  .brand-name { font-size:clamp(18px,2.2vw,24px); font-weight:800; color:var(--text); letter-spacing:-0.5px; }
  .brand-name span { color:var(--indigo-l); }
  .hero { padding:4px 0 32px; }
  .hero h1 { font-size:clamp(32px,5vw,56px); font-weight:800; line-height:1.1; letter-spacing:-1.5px; background:linear-gradient(135deg,#ffffff 0%,rgba(241,245,249,0.9) 40%,rgba(129,140,248,0.85) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:14px; }
  .hero p { font-size:clamp(15px,1.8vw,19px); color:var(--text2); line-height:1.7; max-width:580px; }
  .card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-lg); padding:20px; margin-bottom:14px; position:relative; overflow:hidden; box-shadow:var(--shadow-card); transition:border-color 0.2s,box-shadow 0.2s; }
  .card::before { content:''; position:absolute; inset:0; background:linear-gradient(145deg,rgba(255,255,255,0.03) 0%,transparent 50%); pointer-events:none; }
  .card:hover { border-color:var(--border2); }
  .card-accent { border-left:2px solid var(--indigo); box-shadow:var(--shadow-card),-2px 0 20px rgba(99,102,241,0.08); }
  .card-title { font-size:clamp(16px,1.8vw,22px); font-weight:700; color:var(--text); margin-bottom:5px; letter-spacing:-0.3px; display:flex; align-items:center; gap:9px; }
  .card-title .icon { width:30px; height:30px; border-radius:9px; background:rgba(99,102,241,0.13); display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; box-shadow:0 2px 8px rgba(99,102,241,0.15); }
  .card-sub { font-size:clamp(13px,1.4vw,17px); color:var(--text2); line-height:1.65; margin-bottom:16px; }
  textarea { width:100%; background:var(--bg2); border:1.5px solid var(--border); border-radius:var(--r-md); color:var(--text); font-family:'Plus Jakarta Sans',sans-serif; font-size:13.5px; padding:14px 16px; resize:vertical; outline:none; line-height:1.7; min-height:108px; word-break:break-word; overflow-wrap:break-word; transition:border-color 0.2s,box-shadow 0.2s; }
  textarea::placeholder { color:var(--text3); }
  textarea:focus { border-color:rgba(99,102,241,0.6); box-shadow:0 0 0 3px rgba(99,102,241,0.12),0 2px 12px rgba(99,102,241,0.1); }
  .btn { display:inline-flex; align-items:center; gap:7px; border:none; border-radius:var(--r-sm); font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:clamp(13px,1.3vw,16px); cursor:pointer; transition:all 0.18s var(--ease); white-space:nowrap; padding:12px 24px; position:relative; overflow:hidden; }
  .btn::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,0); transition:background 0.15s; }
  .btn:active::after { background:rgba(255,255,255,0.08); }
  .btn-primary { background:linear-gradient(135deg,var(--indigo),var(--indigo-d)); color:#fff; box-shadow:var(--shadow-primary); }
  .btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:var(--shadow-primary-hover); }
  .btn-primary:active:not(:disabled) { transform:scale(0.97) translateY(0); box-shadow:0 2px 8px rgba(99,102,241,0.3); }
  .btn-primary:disabled { opacity:0.4; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn-ghost { background:rgba(255,255,255,0.05); color:var(--text2); border:1px solid var(--border); }
  .btn-ghost:hover { background:rgba(255,255,255,0.1); color:var(--text); border-color:var(--border2); }
  .btn-ghost:active { transform:scale(0.97); }
  .btn-sm { padding:7px 14px; font-size:12px; border-radius:8px; font-weight:600; }
  .btn-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-top:12px; }
  .copy-btn { display:inline-flex; align-items:center; gap:5px; background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--text2); font-size:11.5px; font-weight:600; padding:5px 12px; border-radius:7px; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.15s; white-space:nowrap; }
  .copy-btn:hover { color:var(--text); border-color:var(--border2); background:rgba(255,255,255,0.09); transform:translateY(-1px); }
  .copy-btn:active { transform:scale(0.94); }
  .copy-btn.done { color:var(--emerald); border-color:rgba(16,185,129,0.35); background:rgba(16,185,129,0.1); }
  .output-block { background:var(--bg2); border:1px solid var(--border); border-radius:var(--r-md); padding:16px; margin-top:14px; font-size:13px; line-height:1.85; color:var(--text2); white-space:pre-wrap; word-break:break-word; animation:fadeUp 0.3s var(--ease); box-shadow:inset 0 1px 0 rgba(255,255,255,0.04); }
  .output-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border); flex-wrap:wrap; gap:8px; }
  .output-label { font-size:10px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:var(--indigo-l); }
  .spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.12); border-top-color:#fff; border-radius:50%; animation:spin 0.6s linear infinite; flex-shrink:0; }
  .spinner-indigo { border-color:rgba(99,102,241,0.2); border-top-color:var(--indigo); }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes slideInLeft { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes backdropIn  { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  .page-enter { animation:fadeUp 0.28s var(--ease); }

  /* Hamburger lines */
  .burger-line { display:block; width:clamp(22px,2vw,28px); height:2.5px; background:var(--text2); border-radius:1px; transition:transform 0.22s ease-in-out, opacity 0.22s ease-in-out, width 0.22s ease-in-out, background 0.2s; }
  .burger-btn { display:flex; flex-direction:column; justify-content:center; gap:6px; padding:10px; background:none; border:none; cursor:pointer; border-radius:var(--r-sm); min-width:48px; min-height:48px; align-items:center; transition:background 0.15s; flex-shrink:0; }
  .burger-btn:hover { background:rgba(255,255,255,0.07); }
  .burger-btn:hover .burger-line { background:var(--text); }
  .burger-btn.open .burger-line { background:var(--indigo-l); }
  .burger-btn.open .burger-line-top { transform:translateY(7px) rotate(45deg); }
  .burger-btn.open .burger-line-mid { opacity:0; width:0; }
  .burger-btn.open .burger-line-bot { transform:translateY(-7px) rotate(-45deg); }

  /* Drawer */
  .drawer-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:200; animation:backdropIn 0.2s ease-out; }
  .drawer-panel { position:fixed; top:0; left:0; height:100%; width:88%; max-width:320px; background:var(--bg2); border-right:1px solid var(--border2); z-index:201; display:flex; flex-direction:column; animation:slideInLeft 0.24s cubic-bezier(0.4,0,0.2,1); overflow:hidden; }
  .drawer-scroll { flex:1; overflow-y:auto; -webkit-overflow-scrolling:touch; -webkit-mask-image:linear-gradient(to bottom, black 85%, transparent 100%); mask-image:linear-gradient(to bottom, black 85%, transparent 100%); }
  .drawer-close-btn { width:36px; height:36px; border-radius:50%; border:1px solid var(--border); background:var(--surface); color:var(--text2); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.15s; flex-shrink:0; }
  .drawer-close-btn:hover { background:var(--surface2); color:var(--text); border-color:var(--border2); }
  .drawer-close-btn:active { transform:scale(0.93); }
  .menu-item-btn { width:100%; display:flex; align-items:center; gap:14px; padding:15px 16px; background:var(--surface); border:1px solid var(--border); border-radius:var(--r-md); margin-bottom:10px; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; text-align:left; transition:all 0.15s; }
  .menu-item-btn:hover { background:rgba(99,102,241,0.06); border-color:rgba(99,102,241,0.3); }
  .menu-item-btn:active { transform:scale(0.98); background:rgba(99,102,241,0.1); }
  .menu-item-btn.active-page { background:rgba(99,102,241,0.08); border-color:rgba(99,102,241,0.35); border-left:2px solid var(--indigo-l); }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .drawer-panel { animation:none; }
    .drawer-backdrop { animation:none; }
    .burger-line { transition:none; }
    .page-enter { animation:none; }
  }
  .section-label { font-size:clamp(11px,1vw,13px); font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--text3); margin-bottom:8px; }
  .tag { display:inline-flex; align-items:center; gap:4px; font-size:10.5px; font-weight:700; padding:3px 10px; border-radius:999px; margin-right:6px; margin-bottom:6px; }
  .tag-weak { background:rgba(244,63,94,0.1); color:var(--rose); border:1px solid rgba(244,63,94,0.2); }
  .tag-good { background:rgba(16,185,129,0.1); color:var(--emerald); border:1px solid rgba(16,185,129,0.2); }
  .tag-tip  { background:rgba(99,102,241,0.1); color:var(--indigo-l); border:1px solid rgba(99,102,241,0.2); }
  .code-block { background:rgba(0,0,0,0.25); border-radius:8px; padding:10px 13px; font-size:12.5px; color:var(--text2); font-family:'JetBrains Mono',monospace; line-height:1.75; word-break:break-word; margin-top:8px; border:1px solid rgba(255,255,255,0.05); }
  .check-box { margin-top:12px; padding:10px 13px; background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.15); border-radius:8px; font-size:12.5px; color:var(--text2); line-height:1.6; display:flex; align-items:flex-start; gap:8px; }
  .el-card { border:1px solid var(--border); border-radius:var(--r-md); margin-bottom:8px; overflow:hidden; cursor:pointer; transition:border-color 0.18s,transform 0.18s; background:var(--surface); }
  .el-card:hover { border-color:var(--border2); transform:translateY(-1px); }
  .el-card.open { border-color:rgba(99,102,241,0.35); box-shadow:0 4px 20px rgba(99,102,241,0.08); }
  .el-header { display:flex; align-items:center; justify-content:space-between; padding:13px 15px; gap:12px; }
  .el-left { display:flex; align-items:center; gap:12px; min-width:0; }
  .el-emoji { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
  .el-name { font-size:clamp(14px,1.5vw,18px); font-weight:700; color:var(--text); margin-bottom:2px; }
  .el-def { font-size:clamp(12px,1.2vw,15px); color:var(--text3); }
  .el-chevron { font-size:12px; color:var(--text3); flex-shrink:0; transition:transform 0.2s; }
  .el-card.open .el-chevron { transform:rotate(180deg); }
  .el-body { padding:14px 16px 16px; border-top:1px solid var(--border); animation:fadeDown 0.2s var(--ease); font-size:13px; color:var(--text2); line-height:1.7; }
  .ex-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-lg); padding:18px; margin-bottom:14px; box-shadow:var(--shadow-card); }
  .ex-num { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
  .ex-num-pill { width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,var(--indigo),var(--indigo-d)); color:#fff; font-weight:800; font-size:10px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(99,102,241,0.3); }
  .ex-scenario { font-size:13.5px; color:var(--text); line-height:1.65; margin-bottom:12px; font-weight:500; }
  .ex-score-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:999px; font-size:12px; font-weight:700; margin-top:10px; margin-bottom:10px; }
  .ideal-block { background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.2); border-radius:var(--r-md); padding:14px; margin-top:12px; font-size:12.5px; color:var(--text2); line-height:1.75; white-space:pre-wrap; word-break:break-word; animation:fadeDown 0.2s var(--ease); font-family:'JetBrains Mono',monospace; }
  .ideal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; flex-wrap:wrap; gap:6px; }
  .ideal-label { font-size:10px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--emerald); }
  .session-bar { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-md); padding:14px 18px; margin-bottom:16px; display:flex; align-items:center; gap:16px; box-shadow:var(--shadow-card); }
  .session-stat { text-align:center; }
  .session-stat-val { font-size:clamp(22px,2.5vw,32px); font-weight:800; color:var(--text); line-height:1; letter-spacing:-0.5px; }
  .session-stat-label { font-size:10px; color:var(--text3); margin-top:3px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; }
  .session-divider { width:1px; height:38px; background:var(--border); }
  .empty { text-align:center; padding:56px 24px; }
  .empty-icon { font-size:48px; margin-bottom:16px; opacity:0.6; animation:pulse 3s ease-in-out infinite; }
  .empty p { font-size:14px; color:var(--text2); max-width:280px; margin:0 auto; line-height:1.7; }
  .gen-load { display:flex; flex-direction:column; align-items:center; gap:16px; padding:56px 24px; color:var(--text2); font-size:13.5px; }
  .bottom-nav { position:fixed; bottom:0; left:0; right:0; z-index:100; background:rgba(7,9,15,0.92); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border-top:1px solid var(--border); display:flex; padding:12px 8px 16px; gap:4px; justify-content:center; }
  .nav-item { flex:1; max-width:160px; display:flex; flex-direction:column; align-items:center; gap:4px; padding:6px 4px; border-radius:var(--r-sm); border:none; background:transparent; cursor:pointer; transition:all 0.2s var(--ease); color:var(--text3); font-family:'Plus Jakarta Sans',sans-serif; position:relative; }
  .nav-item:hover { color:var(--text2); }
  .nav-item:active { transform:scale(0.92); }
  .nav-item.active { color:var(--indigo-l); }
  .nav-item.active .nav-label { font-weight:800; color:var(--indigo-l); }
  .nav-item.active .nav-icon-wrap { background:rgba(99,102,241,0.18); border-color:rgba(99,102,241,0.35); box-shadow:0 2px 12px rgba(99,102,241,0.25); }
  .nav-icon-wrap { width:clamp(44px,5vw,56px); height:clamp(28px,3vw,36px); border-radius:999px; border:1px solid transparent; display:flex; align-items:center; justify-content:center; font-size:16px; transition:all 0.2s var(--ease); }
  .nav-label { font-size:clamp(10px,1vw,13px); font-weight:600; transition:all 0.2s; }
  .lesson-block { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-lg); margin-bottom:10px; overflow:hidden; cursor:pointer; transition:all 0.2s var(--ease); box-shadow:var(--shadow-card); }
  .lesson-block:hover { border-color:var(--border2); transform:translateY(-1px); box-shadow:0 4px 20px rgba(0,0,0,0.3); }
  .lesson-header { display:flex; align-items:center; justify-content:space-between; padding:20px 22px; gap:12px; }
  .lesson-icon { width:clamp(38px,4vw,50px); height:clamp(38px,4vw,50px); border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:clamp(19px,2vw,26px); flex-shrink:0; }
  .lesson-body { padding:16px 18px 20px; border-top:1px solid var(--border); animation:fadeDown 0.22s var(--ease); }
  .lib-cat-row { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px; }
  .lib-cat-btn { padding:6px 15px; border-radius:999px; border:1px solid var(--border); background:var(--surface2); color:var(--text2); font-size:12px; font-weight:600; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.15s; white-space:nowrap; }
  .lib-cat-btn:hover { border-color:var(--border2); color:var(--text); }
  .lib-cat-btn.sel { background:rgba(99,102,241,0.2); border-color:rgba(99,102,241,0.5); color:var(--indigo-l); box-shadow:0 2px 10px rgba(99,102,241,0.15); }
  .lib-prompt-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-md); padding:16px; margin-bottom:10px; transition:all 0.18s; box-shadow:var(--shadow-card); }
  .lib-prompt-card:hover { border-color:var(--border2); transform:translateY(-1px); box-shadow:0 4px 20px rgba(0,0,0,0.3); }
  .lib-prompt-title { font-size:clamp(13px,1.4vw,17px); font-weight:700; color:var(--text); margin-bottom:5px; letter-spacing:-0.2px; }
  .lib-prompt-preview { font-size:clamp(12px,1.2vw,15px); color:var(--text3); line-height:1.55; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .lib-actions { display:flex; gap:6px; flex-wrap:wrap; }
  .saved-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:999px; background:rgba(16,185,129,0.12); color:var(--emerald); border:1px solid rgba(16,185,129,0.25); font-size:10px; font-weight:700; }
  .mono-box { background:var(--bg2); border-radius:var(--r-sm); padding:11px 14px; font-size:12px; color:var(--text2); font-family:'JetBrains Mono',monospace; line-height:1.75; white-space:pre-wrap; word-break:break-word; margin-bottom:10px; border:1px solid var(--border); border-left:2px solid var(--indigo); }
  .promo-banner { background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(99,102,241,0.06)); border:1px solid rgba(245,158,11,0.25); border-radius:var(--r-lg); padding:18px; margin-bottom:16px; }
  .hook-banner { background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(244,63,94,0.05)); border:1px solid rgba(99,102,241,0.18); border-radius:var(--r-md); padding:14px 16px; margin-bottom:18px; }
  .daily-card { background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(245,158,11,0.05)); border:1px solid rgba(99,102,241,0.22); border-radius:var(--r-lg); padding:20px; margin-bottom:16px; box-shadow:0 4px 20px rgba(99,102,241,0.08); }
  .wiz-select { width:100%; background:var(--bg2); border:1.5px solid var(--border); border-radius:var(--r-sm); color:var(--text); font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; padding:12px 14px; outline:none; cursor:pointer; margin-bottom:8px; transition:border-color 0.2s; }
  .wiz-select:focus { border-color:rgba(99,102,241,0.5); }
  .wiz-row { display:flex; align-items:center; gap:9px; margin-bottom:9px; }
  .wiz-num { width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,var(--indigo),var(--indigo-d)); color:#fff; font-weight:800; font-size:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 2px 8px rgba(99,102,241,0.3); }
  .wiz-chip-row { display:flex; flex-wrap:wrap; gap:7px; }
  .cert-wrap { background:linear-gradient(135deg,#0d1025 0%,#111a2e 50%,#0a1520 100%); border:2px solid rgba(245,158,11,0.5); border-radius:var(--r-lg); padding:28px 22px; margin-top:16px; position:relative; overflow:hidden; text-align:center; animation:scaleIn 0.4s var(--ease); box-shadow:0 8px 40px rgba(245,158,11,0.1); }
  .compare-col { flex:1; min-width:0; background:var(--surface); border:1px solid var(--border); border-radius:var(--r-md); padding:14px; }
  .hist-item { display:flex; align-items:flex-start; gap:10px; padding:11px 0; border-bottom:1px solid var(--border); cursor:pointer; transition:opacity 0.15s; }
  .hist-item:hover { opacity:0.8; }
  .hist-item:last-child { border-bottom:none; }
  .hist-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:5px; }
  .model-select { background:var(--bg2); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; padding:6px 10px; outline:none; cursor:pointer; }
  .version-tag { display:inline-flex; align-items:center; padding:2px 9px; border-radius:999px; font-size:10px; font-weight:700; background:rgba(99,102,241,0.12); color:var(--indigo-l); border:1px solid rgba(99,102,241,0.22); margin-right:6px; cursor:pointer; transition:all 0.15s; }
  .version-tag:hover { background:rgba(99,102,241,0.2); }
  .version-tag.active { background:rgba(99,102,241,0.3); border-color:var(--indigo-l); }
  .apply-btn { display:inline-flex; align-items:center; gap:5px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.28); color:var(--amber); font-size:11.5px; font-weight:700; padding:6px 13px; border-radius:7px; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.15s; }
  .apply-btn:hover { background:rgba(245,158,11,0.2); transform:translateY(-1px); }
  .apply-btn:active { transform:scale(0.96); }
  .mistake-row { display:flex; gap:12px; padding:14px 0; border-bottom:1px solid var(--border); }
  .mistake-row:last-child { border-bottom:none; }
  .mistake-icon { width:34px; height:34px; border-radius:9px; background:rgba(244,63,94,0.1); display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
  .mistake-title { font-weight:700; font-size:13.5px; color:var(--text); margin-bottom:5px; }
  .mistake-bad { font-size:12.5px; color:var(--rose); margin-bottom:4px; word-break:break-word; }
  .mistake-good { font-size:12.5px; color:var(--emerald); word-break:break-word; }
  .diff-btn { flex:1; padding:8px 4px; border-radius:var(--r-sm); border:1px solid var(--border); background:transparent; color:var(--text2); font-family:'Plus Jakarta Sans',sans-serif; font-size:12px; font-weight:600; cursor:pointer; text-align:center; transition:all 0.15s; }
  .diff-btn.ab { border-color:rgba(16,185,129,0.4); background:rgba(16,185,129,0.08); color:var(--emerald); }
  .diff-btn.ai { border-color:rgba(245,158,11,0.4); background:rgba(245,158,11,0.08); color:var(--amber); }
  .diff-btn.aa { border-color:rgba(244,63,94,0.4); background:rgba(244,63,94,0.08); color:var(--rose); }
  .diff-btn.as { border-color:rgba(56,189,248,0.4); background:rgba(56,189,248,0.08); color:var(--sky); }
  .test-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r-lg); padding:18px; margin-bottom:12px; box-shadow:var(--shadow-card); }
`;

/* ── DATA ── */
const ELEMENTS = [
  { emoji:"🎭", color:"rgba(99,102,241,0.12)", name:"Role / Persona", def:"Tell AI who to be",
    why:"Without a role, AI gives generic answers. A role focuses its knowledge on exactly what you need.",
    weak:"Tell me about marketing",
    strong:"You are a marketing expert who helps B2B SaaS companies grow through LinkedIn content. Advise me on a Q4 lead generation campaign.",
    check:"Did I tell AI exactly who it should be for this task?" },
  { emoji:"🎯", color:"rgba(16,185,129,0.12)", name:"Objective", def:"State clearly what you want done",
    why:"Your objective is the most important part. Without it, AI guesses and usually guesses wrong.",
    weak:"Help me with my presentation",
    strong:"Write 5 LinkedIn posts announcing our new product feature launch. Each under 150 words with a clear call-to-action.",
    check:"Is my goal specific enough that a stranger could complete it without asking me anything?" },
  { emoji:"📋", color:"rgba(245,158,11,0.12)", name:"Context / Background", def:"Give AI the details it cannot guess",
    why:"AI has no idea about your business or customers. Context turns a generic answer into one that fits your world.",
    weak:"Write a sales message",
    strong:"I work in B2B SaaS sales. My prospects are HR managers at companies with 200-500 employees. Q4 budget decisions are finalised in the next 3 weeks.",
    check:"Have I shared who my customers are, what my business does, and what the situation is?" },
  { emoji:"🎨", color:"rgba(56,189,248,0.12)", name:"Tone", def:"Set the voice and feeling",
    why:"Without tone, AI defaults to stiff corporate language. Tone makes your output feel right for the room — whether that is a boardroom or a one-on-one.",
    weak:"Write an email about the project delay",
    strong:"Write in a direct, calm, and accountable tone. Senior professional level. No fluff, no hedging, no passive voice.",
    check:"Did I tell AI HOW the response should sound — formal or casual, warm or direct, confident or empathetic?" },
  { emoji:"📐", color:"rgba(244,63,94,0.12)", name:"Format / Structure", def:"Tell AI how to present the answer",
    why:"Without format, AI gives a wall of text when you needed 5 short bullet points.",
    weak:"Explain pricing strategy",
    strong:"Give me 3 pricing strategies. For each: name, 2-sentence explanation, one real example. Use a numbered list.",
    check:"Did I specify the length, layout and structure of the response?" },
  { emoji:"⚠", color:"rgba(244,63,94,0.12)", name:"Constraints", def:"Set limits on what to avoid",
    why:"What you tell AI NOT to do is just as important as what you tell it to do.",
    weak:"Write about our product launch",
    strong:"Avoid: jargon like leverage and synergy, bullet points more than 5, passive voice, and any claims that cannot be verified.",
    check:"Did I explicitly tell AI what NOT to do, NOT say, and NOT include?" },
  { emoji:"✅", color:"rgba(16,185,129,0.12)", name:"Example", def:"Show AI exactly what good looks like",
    why:"One real example is worth more than ten adjectives. AI replicates patterns precisely.",
    weak:"Write a strong executive summary",
    strong:"Match this style: Revenue grew 18% YoY driven by enterprise expansion, despite macro headwinds. Operating margin improved 3 points. Q4 outlook remains cautious but achievable.",
    check:"Have I given AI at least one real example of what a great response looks like?" },
  { emoji:"🔄", color:"rgba(245,158,11,0.12)", name:"Critique / Self-Review", def:"Ask AI to check its own answer",
    why:"AI's first answer is rarely its best. A self-review instruction makes AI catch its own mistakes.",
    weak:"(Accepts and uses first response without asking AI to review it)",
    strong:"After writing, re-read once: Is this clear? Is the tone right? Fix anything, then give me the final version only.",
    check:"Did I ask AI to review and improve its own answer before giving it to me?" },
];

const MISTAKES = [
  { icon:"💬", name:"Being Too Vague", bad:'"Help me with marketing"', good:'"Write 3 LinkedIn posts announcing our new product launch. Professional tone, under 150 words each, ends with a question."' },
  { icon:"🗺", name:"No Context Given", bad:'"Write a business plan"', good:'"Write a 1-page business case for launching a new product feature, targeting mid-market SaaS companies, with a 6-month ROI projection."' },
  { icon:"📦", name:"Asking Everything at Once", bad:'"Write a plan, 10 posts, and pricing"', good:'"One task per prompt. Start: Create a go-to-market strategy for my SaaS product."' },
  { icon:"📏", name:"No Format Specified", bad:'"Explain customer retention"', good:'"Explain 3 retention strategies. Each: name, 2-sentence explanation, one example."' },
  { icon:"🔄", name:"Accepting the First Answer", bad:'"(Never follows up)"', good:'"Follow up: Make it shorter and casual or Give me 3 different tone options."' },
];

const FORMULA_ROWS = [
  {n:1,label:"ROLE",        hint:"Who should AI be?",              eg:"You are a senior strategy consultant with 15 years of experience advising Fortune 500 companies."},
  {n:2,label:"OBJECTIVE",   hint:"What exactly do you want done?", eg:"Write a concise executive summary for a Q3 performance review presentation."},
  {n:3,label:"CONTEXT",     hint:"What is your situation?",        eg:"I am a product manager at a 200-person SaaS company presenting to the leadership team next Friday."},
  {n:4,label:"TONE",        hint:"How should it sound and feel?",  eg:"Direct, professional, and confident. Senior leadership level. No filler words or hedging."},
  {n:5,label:"FORMAT",      hint:"How should the answer look?",    eg:"3 paragraphs: key achievements, risks, and Q4 outlook. Each paragraph under 60 words. No bullet points."},
  {n:6,label:"CONSTRAINTS", hint:"What should AI avoid?",          eg:"No jargon like leverage or synergy. No passive voice. No claims without supporting context."},
  {n:7,label:"EXAMPLE",     hint:"Show what good looks like",      eg:"Style: Last quarter we grew ARR by 18% despite headwinds in the enterprise segment..."},
  {n:8,label:"CRITIQUE",    hint:"Ask AI to review its own answer",eg:"After writing, re-read and fix anything that does not match. Give final version only."},
];

const TONES   = ["Professional","Formal","Direct & Concise","Conversational","Confident","Empathetic","Persuasive","Friendly"];
const FORMATS = ["Short paragraphs","Bullet points","Numbered list","Table","Step-by-step","Single message","Email format","Script / Dialogue"];
const PERSONAS = [
  "Marketing Expert","Business Advisor","Sales Specialist","Brand Strategist","Growth Hacker",
  "Business Coach","Startup Mentor","Entrepreneur Coach","Pricing Strategist","Market Research Analyst",
  "Content Writer","Copywriter","Social Media Expert","Email Marketing Expert","Public Relations Expert",
  "Storyteller","Script Writer","Blog Writer","Ad Copywriter","Newsletter Writer",
  "Customer Service Pro","HR Consultant","Recruitment Specialist","Employee Trainer","Conflict Resolution Expert",
  "Leadership Coach","Team Manager","Talent Acquisition Expert","Performance Coach","Workplace Culture Expert",
  "Finance Advisor","Accountant","Tax Consultant","Investment Advisor","Budget Planner",
  "Legal Advisor","Contract Specialist","Compliance Expert","Risk Analyst","Insurance Advisor",
  "Teacher / Trainer","Career Coach","Life Coach","Productivity Coach","Study Skills Expert",
  "Parenting Advisor","Health and Wellness Coach","Nutrition Expert","Mindset Coach","Personal Development Expert",
  "Others",
];
const QUICK_PURPOSES = ["WhatsApp Marketing","Instagram Reels","Weekly Planning","Customer Reply","Product Description","Business Email","Sales Script","Social Media Bio","Complaint Response","Employee Message"];
const DAILY_CHALLENGES = [
  { title:"Write a performance review",           hint:"Use Role + Context + Tone",            scenario:"Write a balanced annual performance review for a mid-level analyst on your team who delivered strong results but struggles with meeting deadlines. It will be shared with HR and used in a one-on-one conversation." },
  { title:"Prepare a stakeholder update email",   hint:"Use Format + Constraints + Critique",  scenario:"Your project is 2 weeks behind schedule due to a vendor delay. Write a concise update email to your CFO and CTO that is transparent, solution-focused, and under 150 words." },
  { title:"Pitch a new idea to your manager",     hint:"Use Role + Objective + Format",         scenario:"You want to propose switching your team's project management tool from email threads to Notion. Write a short persuasive message to your manager making the case in under 100 words." },
  { title:"Summarise a long meeting into actions",hint:"Use Format + Constraints",             scenario:"You just attended a 90-minute strategy meeting with 5 stakeholders. Write a crisp follow-up summary with clear owners, action items, and deadlines — something the team can act on immediately." },
  { title:"Write a follow-up after a job interview",hint:"Use Tone + Context + Critique",      scenario:"You interviewed for a Senior Product Manager role yesterday. The panel included the CPO and two team leads. Write a follow-up email that is warm, professional, and reinforces one specific thing you discussed." },
  { title:"Create a LinkedIn post from a win",    hint:"Use Role + Tone + Example",            scenario:"Your team just shipped a feature that reduced customer churn by 12%. Write a LinkedIn post sharing this achievement in a way that is credible, not boastful, and invites conversation." },
  { title:"Draft a difficult message to a client",hint:"Use Tone + Constraints + Critique",   scenario:"A key deliverable will be delayed by one week due to an internal resourcing issue. Write a professional WhatsApp or email message to the client that owns the mistake and proposes a solution." },
];

const TRACKS = [
  { id:"business",    label:"🏢 Business & Strategy",    desc:"Sales, strategy, operations" },
  { id:"marketing",   label:"📣 Marketing",               desc:"Campaigns, content, branding" },
  { id:"sales",       label:"💰 Sales",                   desc:"Pitches, follow-ups, closing" },
  { id:"content",     label:"✍ Content Creation",        desc:"Social, blogs, scripts" },
  { id:"hr",          label:"👥 HR & Recruitment",        desc:"Hiring, reviews, policies" },
  { id:"finance",     label:"💳 Finance & Planning",      desc:"Budgets, reports, proposals" },
  { id:"customer",    label:"🎧 Customer Service",        desc:"Complaints, support, retention" },
  { id:"ecommerce",   label:"🛒 E-Commerce",              desc:"Product, listings, reviews" },
  { id:"realestate",  label:"🏠 Real Estate",             desc:"Listings, pitches, emails" },
  { id:"education",   label:"📚 Education & Training",    desc:"Lessons, assessments, plans" },
  { id:"healthcare",  label:"🏥 Healthcare & Wellness",   desc:"Patient comms, wellness plans" },
  { id:"legal",       label:"⚖ Legal & Compliance",      desc:"Contracts, policies, notices" },
  { id:"freelance",   label:"🧑💻 Freelancing",             desc:"Proposals, rates, client emails" },
  { id:"personal",    label:"🌱 Personal Growth",         desc:"Goals, habits, communication" },
  { id:"students",    label:"🎓 Students",                desc:"Study plans, essays, research" },
];
const TABS = [
  { id:"guide",    icon:"📖", label:"Learn"     },
  { id:"builder",  icon:"✦",  label:"Build"     },
  { id:"library",  icon:"📚", label:"Browse"    },
  { id:"practice", icon:"✏",  label:"Practice"  },
];

const PROMPT_LIBRARY = [
    { cat:"Marketing", color:"rgba(99,102,241,0.15)", tc:"var(--indigo-l)", prompts:[
    { title:"LinkedIn Thought Leadership Post", prompt:"You are a B2B content strategist who helps senior professionals build authority on LinkedIn.\nWrite a thought leadership post for a [JOB TITLE] in [INDUSTRY] sharing a genuine insight about [TOPIC].\nContext: The author has [X] years of experience. Target audience: [DECISION-MAKER TYPE].\nTone: Direct, credible, professional. Starts with a bold or counterintuitive first line.\nFormat: Hook line, 3-4 short paragraphs, one key takeaway, a question to drive comments. Under 250 words.\nAvoid: Starting with I am excited to share, generic advice, buzzwords, no personal angle.\nAfter writing, check: Does the first line make you want to read the second? Is the insight genuinely useful? Fix anything weak." },
    { title:"Product Launch Press Release", prompt:"You are a B2B PR specialist with experience in technology and SaaS companies.\nWrite a press release announcing the launch of [PRODUCT/FEATURE] by [COMPANY NAME].\nKey facts: [3 FACTS]. Market problem solved: [PROBLEM]. Executive quote placeholder: [NAME, TITLE].\nTone: Professional, newsworthy, factual. Journalists should find this useful, not promotional.\nFormat: Headline, dateline, 3 paragraphs (news, context, quote), boilerplate, press contact.\nAvoid: Hyperbole, writing like an ad, burying the actual news in paragraph 3.\nAfter writing, check: Would a journalist find this genuinely newsworthy? Is the news in paragraph 1? Fix if not." },
    { title:"Email Campaign for B2B Product", prompt:"You are a B2B email marketing specialist.\nWrite a 3-email nurture sequence for [PRODUCT/SERVICE] targeting [BUYER PERSONA].\nBuyer stage: [AWARENESS/CONSIDERATION/DECISION]. Key pain point: [PAIN POINT]. CTA: [DESIRED ACTION].\nTone: Consultative, helpful, not salesy. Each email adds value before asking for anything.\nFormat: Email 1 = problem awareness, Email 2 = solution education, Email 3 = social proof + CTA. Subject line for each.\nAvoid: Generic subject lines, feature-dumping, asking for a demo in email 1.\nAfter writing, review: Would a busy VP open and read each email? Fix anything that reads like a bulk campaign." },
    { title:"Case Study One-Pager", prompt:"You are a B2B content writer specialising in customer success stories.\nWrite a case study one-pager for [CLIENT TYPE] who used [PRODUCT/SERVICE] to solve [PROBLEM].\nChallenge: [WHAT THEY FACED]. Approach: [WHAT YOU DID]. Result: [MEASURABLE OUTCOME].\nTone: Factual, credible, story-driven. Let the result speak.\nFormat: Client challenge, solution implemented, measurable results with numbers, one client quote placeholder, CTA.\nAvoid: Vague outcomes, sounding like an ad, no specific numbers.\nAfter writing, check: Would a similar prospect trust your solution after reading? Finalise." },
    { title:"Webinar Invitation Email", prompt:"You are a demand generation specialist.\nWrite an invitation email for a webinar titled [WEBINAR TITLE] targeting [AUDIENCE].\nDate/time: [DETAILS]. Speaker: [NAME AND TITLE]. What attendees will learn: [3 SPECIFIC OUTCOMES].\nTone: Informative, creates anticipation, speaks to the audience's professional goals.\nFormat: Subject line, hook, 3 bullet outcomes, speaker credibility line, date/time/CTA.\nAvoid: Long speaker bios before the value prop, vague outcomes, weak subject lines.\nAfter writing, check: After reading, does the reader know exactly what they will gain and why it matters now? Fix if not." },
    { title:"LinkedIn Company Page Post", prompt:"You are a B2B social media strategist.\nWrite a LinkedIn company page post for [COMPANY] announcing [NEWS/MILESTONE/INSIGHT].\nAudience: [TARGET BUYER OR TALENT]. Goal: [Brand awareness/Lead generation/Talent attraction].\nTone: Professional, authentic, avoids corporate speak.\nFormat: Hook line, 2-3 short paragraphs, clear CTA. Under 200 words. 3-5 relevant hashtags.\nAvoid: Overly promotional tone, starting with We are pleased to announce, vague CTAs.\nAfter writing, check: Would someone stop scrolling for this on a busy LinkedIn feed? Fix the hook if not." },
    { title:"Cold Email Sequence for SaaS", prompt:"You are a SaaS growth marketer specialising in outbound email campaigns.\nWrite a 3-touch cold email sequence to [DECISION MAKER TITLE] at [COMPANY TYPE].\nProduct: [WHAT IT DOES]. Key differentiator: [YOUR EDGE]. Pain point addressed: [PAIN].\nTone: Peer-to-peer, respectful of their time, leads with their problem not your product.\nFormat: Email 1 = personalised problem observation (under 80 words). Email 2 = social proof + soft ask (under 100 words). Email 3 = breakup email (under 50 words).\nAvoid: Feature lists, pitching in email 1, generic subject lines.\nAfter writing, check: Would you reply to each of these if they landed in your inbox? Fix anything that feels like a template." },
    { title:"Content Marketing Strategy Brief", prompt:"You are a content strategy director for B2B companies.\nCreate a quarterly content marketing strategy brief for [COMPANY] targeting [BUYER PERSONA].\nBusiness goal: [GOAL]. Current content gap: [WHAT IS MISSING]. Channels: [CHANNELS].\nFormat: Goal statement, 3 content pillars with rationale, content types for each pillar, monthly cadence, success metrics.\nAvoid: Vanity metrics, producing content without a distribution plan, no connection to pipeline.\nAfter writing, check: Is every content piece connected to a business goal? Would the sales team find this useful? Fix if not." },
    { title:"Partner Marketing Announcement", prompt:"You are a B2B partnership marketing specialist.\nWrite an announcement for a new strategic partnership between [COMPANY A] and [COMPANY B].\nWhat the partnership delivers for customers: [JOINT VALUE]. Why now: [MARKET CONTEXT].\nTone: Confident, mutually beneficial, customer-first framing.\nFormat: Headline, joint value prop in 2 sentences, what each partner brings, customer benefit, quote placeholders for both CEOs, CTA.\nAvoid: Sounding like a stock announcement, vague synergy language, no clear customer benefit.\nAfter writing, check: Would a customer care about this partnership? Is the benefit to them explicit? Fix if not." },
    { title:"Event Sponsorship Proposal", prompt:"You are a B2B event marketing specialist.\nWrite a sponsorship proposal for [COMPANY] sponsoring [EVENT NAME].\nAudience at event: [DECISION MAKER TYPE]. Sponsorship tier: [LEVEL]. Key goal: [BRAND/LEADS/RELATIONSHIP].\nTone: Professional, ROI-focused, shows you understand their business objectives.\nFormat: Event overview, audience profile, sponsorship benefits, expected ROI framing, investment summary, next step.\nAvoid: Feature listing without ROI framing, vague audience data, no clear next step.\nAfter writing, check: Would a marketing director feel this is worth their budget? Is the ROI framing specific? Finalise." },
    { title:"Analyst Briefing Document", prompt:"You are a B2B product marketing manager.\nWrite an analyst briefing document for [PRODUCT/COMPANY] to share with industry analysts.\nCategory: [MARKET CATEGORY]. Differentiation: [KEY DIFFERENTIATOR]. Traction: [METRICS]. Vision: [WHERE YOU ARE HEADING].\nTone: Confident, factual, forward-looking. Analysts value insight over hype.\nFormat: Company overview, market problem, solution approach, differentiation evidence, traction data, 18-month roadmap, key questions we want analyst feedback on.\nAvoid: Marketing language, claims without evidence, no competitive context.\nAfter writing, check: Would a Gartner analyst find this substantive? Is every claim backed by data? Fix if not." },
    { title:"Account-Based Marketing Message", prompt:"You are an ABM (Account-Based Marketing) specialist.\nWrite a personalised outreach message for [DECISION MAKER NAME/TITLE] at [TARGET ACCOUNT].\nAccount research: [RECENT NEWS/CHALLENGE/TRIGGER]. Your relevant solution: [HOW YOU HELP]. Tone: Hyper-personalised, peer-to-peer, shows you did your homework.\nFormat: Reference something specific about their company (1 sentence), connect it to a challenge you solve (1 sentence), soft CTA (1 sentence). Under 60 words total.\nAvoid: Generic templates, starting with I hope this email finds you well, vague connection to their situation.\nAfter writing, check: Would the recipient feel this was written specifically for them? Fix anything generic." },
    { title:"Product Positioning Statement", prompt:"You are a product marketing director.\nWrite a product positioning statement for [PRODUCT] in the [MARKET CATEGORY].\nTarget customer: [WHO]. Key pain point: [PAIN]. Primary benefit: [BENEFIT]. Proof point: [EVIDENCE].\nFormat: Internal positioning statement using this structure: For [TARGET], [PRODUCT] is the [CATEGORY] that [KEY BENEFIT] because [PROOF]. Then 3 external tagline variations.\nAvoid: Vague benefits, positioning that applies to every competitor, jargon.\nAfter writing, check: Is the benefit ownable and provable? Would your target customer immediately recognise themselves? Finalise." },
    { title:"Customer Reference Request Email", prompt:"You are a customer marketing manager.\nWrite an email asking a satisfied customer [NAME] at [COMPANY] to participate as a reference for sales conversations.\nTheir result: [OUTCOME THEY ACHIEVED]. What you are asking: [REFERENCE CALL / CASE STUDY / QUOTE].\nTone: Grateful, specific, makes the ask feel like a small favour not a big commitment.\nFormat: Thank them for their success, explain what you are asking and why, what is in it for them, how much time it requires, easy next step.\nAvoid: Making it feel like a big ask, vague reciprocal value, no time estimate.\nAfter writing, check: Is the ask so easy that a busy executive would say yes in 10 seconds? Fix if not." },
    { title:"Go-To-Market Launch Plan Summary", prompt:"You are a go-to-market strategist at a B2B technology company.\nWrite a GTM launch plan summary for [PRODUCT/FEATURE] launching in [TIMEFRAME].\nTarget segment: [WHO]. Primary channel: [CHANNEL]. Launch goal: [METRIC]. Budget: [AMOUNT].\nFormat: Executive summary (3 sentences), target segment profile, launch goals with metrics, channel strategy, first 30 days plan, success criteria.\nAvoid: Vague actions, launch plans without owners, goals without numbers.\nAfter writing, check: Could the sales and marketing team execute from this document alone? Fix anything ambiguous." },
    { title:"Win-Loss Analysis Report", prompt:"You are a competitive intelligence and product marketing specialist.\nWrite a win-loss analysis report summary for [PRODUCT] based on recent deals.\nWins: [NUMBER] deals won against [COMPETITOR]. Losses: [NUMBER] deals lost to [COMPETITOR]. Key patterns: [WHAT YOU ARE SEEING].\nFormat: Executive summary, top 3 reasons we win, top 3 reasons we lose, competitive positioning gaps, 3 recommended actions for sales and product.\nAvoid: Only presenting positive data, vague recommendations, no product or sales actions.\nAfter writing, check: Would the CEO and product team both find this actionable? Fix anything vague." },
    { title:"Marketing OKR Framework", prompt:"You are a VP of Marketing helping set quarterly goals.\nCreate a marketing OKR framework for [TEAM/COMPANY] for [QUARTER].\nBusiness priority: [COMPANY GOAL]. Marketing focus: [MARKETING ROLE IN THAT GOAL].\nFormat: 2-3 Objectives each with 3-4 measurable Key Results. Each KR has a specific number, baseline, and target deadline.\nAvoid: Activity-based KRs (we will publish 10 posts), KRs without baselines, more than 3 objectives.\nAfter writing, check: Are all KRs outcome-based? Would achieving them prove the Objective was met? Fix anything that measures activity rather than impact." },
    { title:"Competitive Battle Card", prompt:"You are a product marketing manager creating sales enablement content.\nWrite a competitive battle card for [YOUR PRODUCT] vs [COMPETITOR].\nYour strengths: [LIST]. Competitor strengths: [HONEST ACKNOWLEDGEMENT]. Common objections: [LIST].\nFormat: 1-sentence positioning statement, where we win (3 bullets), where they win (2 bullets honest), how to handle their top 3 objections, landmine questions to ask, proof points.\nAvoid: Dishonest comparisons, ignoring competitor strengths, no objection handling.\nAfter writing, check: Would a sales rep feel confident walking into a competitive deal with this? Finalise." },
    { title:"Demand Generation Campaign Brief", prompt:"You are a demand generation director at a B2B SaaS company.\nWrite a campaign brief for a demand generation campaign targeting [BUYER PERSONA] in [INDUSTRY].\nCampaign goal: [PIPELINE/AWARENESS/RETENTION]. Budget: [AMOUNT]. Timeline: [DURATION].\nFormat: Campaign objective, target audience profile, core message and offer, channels and tactics, content requirements, success metrics, timeline milestones.\nAvoid: Campaigns without a clear offer, tactics without rationale, no measurement plan.\nAfter writing, check: Could an agency or in-house team execute this brief without a follow-up meeting? Fix anything unclear." },
    { title:"Brand Messaging Guide", prompt:"You are a brand strategist developing messaging architecture for a B2B company.\nCreate a brand messaging guide for [COMPANY] in [MARKET CATEGORY].\nCore audience: [WHO]. Brand personality: [3-4 WORDS]. Key differentiator: [WHAT ONLY YOU DO].\nFormat: Brand promise (1 sentence), value proposition (2 sentences), 3 messaging pillars each with a headline and 2 proof points, elevator pitch (30 seconds), what we say vs what we never say.\nAvoid: Generic messaging that applies to any company, no proof points, vague personality traits.\nAfter writing, check: Could this guide a new hire to write on-brand content from day one? Fix anything vague." },
  ]},
  { cat:"Sales", color:"rgba(16,185,129,0.15)", tc:"var(--emerald)", prompts:[
    { title:"Cold Outreach Email", prompt:"You are a B2B sales expert.\nWrite a cold outreach email to [TARGET].\nI offer: [PRODUCT/SERVICE]. Key benefit: [MAIN OUTCOME].\nTone: Direct, confident, respectful. Not pushy.\nFormat: Subject + 4-sentence email: hook, relevance, value, CTA. Under 100 words.\nAvoid: Starting with My name is, long intros, multiple CTAs.\nReview: Would you reply to this? Is the CTA specific? Finalise." },
    { title:"Follow-Up After Meeting", prompt:"You are a sales professional.\nWrite a follow-up email after meeting [PROSPECT] from [COMPANY].\nWe discussed: [KEY POINTS]. Next step: [STEP]. Date: [DATE].\nTone: Professional but warm, confident.\nFormat: Subject + thank you + 2-3 key recap points + clear next step with date.\nAvoid: Vague next steps, over-long summaries.\nCheck: Is the next step crystal clear? Finalise." },
    { title:"Sales Pitch Script", prompt:"You are a sales coach for small business owners.\nWrite a 60-second verbal sales pitch for [PRODUCT/SERVICE].\nTarget: [WHO]. Problem: [PROBLEM]. Solution: [HOW]. Price: [PRICE].\nTone: Confident, conversational, not scripted.\nFormat: Problem - Solution - Proof - CTA. Under 120 words.\nAvoid: Features before benefits, price at the start.\nReview: Does it lead with the customer pain? Finalise." },
    { title:"Proposal Introduction", prompt:"You are a business proposal expert.\nWrite the executive summary for a proposal to [CLIENT].\nProposing: [WHAT]. Value: [OUTCOME/ROI]. Timeline: [TIMELINE]. Investment: [PRICE].\nTone: Confident, clear, client-focused.\nFormat: 3 paragraphs: their challenge, our solution, expected outcome. Under 200 words.\nAvoid: Starting with our company history, vague claims.\nReview: Does it focus on the client? Is the outcome clear? Finalise." },
    { title:"Objection Handler Script", prompt:"You are a sales trainer.\nWrite a script to handle this objection: [SPECIFIC OBJECTION].\nProduct: [WHAT YOU SELL]. Buyer: [WHO].\nTone: Empathetic, confident, solution-focused.\nFormat: Acknowledge, reframe, evidence, gentle close. Under 100 words.\nAvoid: Arguing, dismissing the concern, applying pressure.\nCheck: Does it make the prospect feel heard? Finalise." },
    { title:"Discovery Call Opening", prompt:"You are a sales coach.\nWrite an opening script for a discovery call with [PROSPECT TYPE].\nGoal: [UNDERSTAND NEEDS/QUALIFY/DEMO]. Product: [PRODUCT].\nTone: Warm, curious, professional.\nFormat: Brief intro, agenda, first qualifying question. Under 80 words.\nAvoid: Jumping straight into the pitch, too many questions at once.\nCheck: Does it set a collaborative tone? Finalise." },
    { title:"Closing Email Script", prompt:"You are a sales closer.\nWrite a closing email to [PROSPECT] who has been evaluating [PRODUCT] for [X] weeks.\nStatus: Proposal sent. Last contact: [WHEN]. Decision deadline: [DATE].\nTone: Confident, warm, gentle urgency without pressure.\nFormat: 3 sentences. Reference proposal, name one key benefit, ask a closing question.\nAvoid: Begging, ultimatums, rehashing the whole proposal.\nCheck: Is there a clear question that invites a yes? Finalise." },
    { title:"Testimonial Request", prompt:"You are a customer relationship manager.\nWrite a message asking a happy customer for a review on [PLATFORM].\nCustomer bought: [PRODUCT]. Result: [RESULT IF KNOWN]. Tone: Genuine, grateful, low-pressure.\nFormat: WhatsApp under 60 words. Thank, mention result, simple link request.\nAvoid: Asking only for 5 stars, bulk-message feel.\nCheck: Is it easy for them to say yes? Finalise." },
    { title:"Renewal Negotiation Email", prompt:"You are a B2B account manager specialising in contract renewals.\nWrite a renewal negotiation email to [CLIENT NAME] at [COMPANY] whose contract expires in [X] weeks.\nCurrent ARR: [AMOUNT]. Proposed renewal: [NEW TERMS]. Their main concern: [CONCERN].\nTone: Appreciative, value-focused, confident. Not desperate.\nFormat: Thank them for the partnership, summarise value delivered (2-3 results), present renewal terms, handle their likely concern, clear CTA with deadline.\nAvoid: Leading with price, ignoring value delivered, no deadline on the offer.\nAfter writing, check: Does the client feel valued and see a clear reason to renew? Fix if not." },
    { title:"Upsell Message", prompt:"You are a customer success expert.\nWrite an upsell message for a buyer of [PRODUCT A] to upgrade to [PRODUCT B].\nUpgrade benefit: [BENEFIT]. Price difference: [AMOUNT]. Tone: Helpful recommendation, not a sales pitch.\nFormat: WhatsApp or email under 80 words. Acknowledge purchase, recommend, benefit, CTA.\nAvoid: Pressure tactics, making them feel the old product was a mistake.\nReview: Does it lead with their benefit? Finalise." },
    { title:"LinkedIn Connection Message", prompt:"You are a social selling expert.\nWrite a LinkedIn connection message to [TARGET ROLE] at [COMPANY TYPE].\nReason: [GENUINE REASON]. Common ground: [MUTUAL INTEREST]. Tone: Human, curious, zero sales pressure.\nFormat: 2 sentences max. Personal observation + genuine reason to connect.\nAvoid: Pitching in the connection message, copy-paste templates.\nCheck: Would you accept this connection request? Finalise." },
    { title:"Pipeline Reactivation Message", prompt:"You are a sales professional.\nWrite a message to reactivate a cold deal from [X] months ago with [PROSPECT].\nLast discussed: [WHAT]. New angle: [WHAT HAS CHANGED]. Tone: Low-pressure, genuinely curious, fresh start.\nFormat: 3 sentences. Reference past conversation, new development, soft ask. Under 60 words.\nAvoid: Making them feel guilty, repeating the old pitch.\nCheck: Does it give them a reason to re-engage? Finalise." },
    { title:"Annual Contract Renewal Email", prompt:"You are a customer success manager.\nWrite a contract renewal email to [CLIENT] renewing in [X] weeks.\nContract value: [AMOUNT]. Key value delivered: [2-3 OUTCOMES]. Upgrade available: [IF APPLICABLE].\nTone: Appreciative, confident, forward-looking.\nFormat: Subject + thanks + value recap + renewal ask + upgrade mention + next step.\nAvoid: Making it purely transactional, forgetting to acknowledge loyalty.\nCheck: Does the client feel valued? Is the renewal ask clear? Finalise." },
    { title:"Sales Team Motivation Message", prompt:"You are a sales director.\nWrite a motivational message to your sales team about [GOAL].\nContext: [CURRENT PERFORMANCE vs TARGET]. A specific win to acknowledge: [WIN].\nTone: Energising, real, not hollow cheerleading.\nFormat: Acknowledge reality, celebrate specific win, paint the goal, call to action.\nAvoid: Empty slogans, ignoring the gap to target.\nCheck: After reading, does the team feel capable and motivated? Finalise." },
    { title:"Competitive Comparison Script", prompt:"You are a sales strategist.\nWrite a script for when a prospect mentions evaluating [COMPETITOR].\nYour product: [PRODUCT]. Key differentiator: [WHY YOU WIN]. Competitor strength: [HONEST ACKNOWLEDGEMENT].\nTone: Confident, honest, not disparaging.\nFormat: Acknowledge competitor, highlight your difference, proof point, invite comparison. Under 150 words.\nAvoid: Trash-talking, false claims, being defensive.\nCheck: Is your differentiation clear without attacking anyone? Finalise." },
    { title:"Case Study Request Email", prompt:"You are a content and sales specialist.\nWrite an email asking [CLIENT] to participate in a case study.\nTheir result: [OUTCOME]. What is in it for them: [EXPOSURE/CO-MARKETING].\nTone: Flattering, professional, low-effort ask.\nFormat: 4 sentences. Acknowledge result, explain case study, what they get, simple next step.\nAvoid: Making it feel like a big commitment, vague reciprocal value.\nCheck: Is the ask low-effort? Is what they get clear? Finalise." },
    { title:"Trade Show Follow-Up", prompt:"You are a B2B sales professional.\nWrite a follow-up message after meeting [NAME] at [EVENT NAME].\nDiscussed: [TOPIC]. Their interest: [INTEREST]. Next step: [STEP].\nTone: Warm, memorable, personal.\nFormat: Subject + 3-sentence email. Recall meeting, reference specific detail, CTA.\nAvoid: Generic nice to meet you emails.\nCheck: Does it prove you actually listened at the event? Finalise." },
    { title:"Pricing Justification Script", prompt:"You are a pricing coach for service businesses.\nWrite a script justifying the price of [SERVICE] at [PRICE].\nWhat is included: [LIST]. Outcome delivered: [RESULT]. Comparison: [CHEAPER ALTERNATIVE AND WHY IT FALLS SHORT].\nTone: Confident, value-focused, never apologetic.\nFormat: Value delivered, what it replaces, ROI framing. Under 150 words.\nAvoid: Apologising for the price, over-explaining.\nCheck: After reading, does the price feel fair? Finalise." },
    { title:"Executive Briefing Document", prompt:"You are a senior business analyst preparing briefing materials for C-suite executives.\nWrite an executive briefing document on [TOPIC/DECISION] for [EXECUTIVE TITLE].\nContext: [SITUATION]. Decision needed: [WHAT THEY NEED TO DECIDE]. Deadline: [WHEN].\nTone: Concise, factual, respects their time. No fluff.\nFormat: Situation (2 sentences), key data points (3 bullets), options considered (2-3), recommendation with rationale, risks, requested action.\nAvoid: Long background sections, vague recommendations, no clear ask.\nAfter writing, check: Can the executive make an informed decision in under 3 minutes? Fix anything that adds length without adding value." },
    { title:"Demo Request Follow-Up", prompt:"You are a SaaS sales specialist.\nWrite a follow-up after a product demo with [PROSPECT] from [COMPANY].\nKey moments: [2 THINGS THEY REACTED TO]. Concern raised: [CONCERN]. Next step: [TRIAL/PROPOSAL/CALL].\nTone: Helpful, momentum-building, not desperate.\nFormat: Subject + thank you + 2 key moments recap + address concern + CTA.\nAvoid: Over-promising, ignoring concerns raised.\nCheck: Does it move the deal forward? Finalise." },
  ]},
  { cat:"Content Creation", color:"rgba(245,158,11,0.15)", tc:"var(--amber)", prompts:[
    { title:"Thought Leadership Video Script", prompt:"You are a B2B video content strategist.\nWrite a 60-second thought leadership video script for [SPEAKER NAME/TITLE] on [TOPIC].\nAudience: [PROFESSIONAL AUDIENCE]. Platform: [LINKEDIN/YOUTUBE/INTERNAL]. Key insight: [MAIN POINT].\nTone: Confident, expert, conversational. Sounds like a person, not a presenter.\nFormat: Hook (5 sec), core insight (30 sec), supporting evidence (15 sec), closing takeaway + CTA (10 sec). Include speaker notes.\nAvoid: Starting with Hi I am, reading from a script feel, no clear takeaway.\nAfter writing, check: Would someone save or share this video? Is the insight genuinely useful? Fix if not." },
    { title:"YouTube Video Description", prompt:"You are a YouTube SEO expert.\nWrite a video description for [VIDEO TITLE] on [CHANNEL].\nTopic: [TOPIC]. Keywords: [KEYWORDS].\nFormat: 3-sentence intro, 5 timestamps, 3 links, 10 hashtags. Under 500 words.\nAvoid: Keyword stuffing, copying the title, skipping timestamps.\nCheck: Would this rank in search? Finalise." },
    { title:"Blog Post Outline", prompt:"You are a content strategist.\nCreate a blog post outline for: [TITLE].\nAudience: [WHO]. Goal: [Educate/Traffic/Leads]. Length: [WORD COUNT].\nFormat: H1, meta description under 160 chars, 5-7 H2 sections each with 3 bullet sub-points, conclusion CTA.\nAvoid: Generic section headers, repeating ideas, weak CTAs.\nReview: Does the structure tell a complete story? Finalise." },
    { title:"Executive Newsletter Edition", prompt:"You are a B2B content strategist specialising in executive communications.\nWrite one edition of a professional newsletter for [EXECUTIVE/BRAND] on [TOPIC].\nAudience: [PROFESSIONAL SUBSCRIBERS]. Frequency: [WEEKLY/MONTHLY]. Core insight to share: [INSIGHT].\nTone: Authoritative, curated, adds genuine value. Like a trusted advisor sharing what matters.\nFormat: Subject line, opening insight (100 words), 3 curated takeaways with context, one recommendation or action, closing thought.\nAvoid: Generic industry recaps, content with no point of view, more than 400 words total.\nAfter writing, check: Would a busy executive read this and feel it was worth their time? Finalise." },
    { title:"LinkedIn Article Intro", prompt:"You are a LinkedIn content expert.\nWrite the opening 3 paragraphs of a LinkedIn article titled [TITLE].\nBackground: [YOUR ROLE]. Main insight: [KEY POINT]. Tone: Professional but personal. Share a real experience.\nFormat: Para 1: counterintuitive statement. Para 2: personal story. Para 3: what reader will learn. Under 200 words.\nAvoid: I am excited to share, buzzwords, generic advice.\nReview: Does para 1 make you want to read para 2? Finalise." },
    { title:"Podcast Episode Intro", prompt:"You are a podcast producer.\nWrite the opening 60 seconds for a podcast episode titled [EPISODE TITLE].\nPodcast: [NAME]. Guest/Topic: [GUEST OR TOPIC]. Key insight to tease: [MAIN TAKEAWAY].\nTone: Conversational, curious, warm.\nFormat: Hook question, tease the big insight, introduce topic, what listeners will learn.\nAvoid: Long sponsor reads at the start, boring bios.\nReview: Would someone turn it off in the first 30 seconds? Finalise." },
    { title:"B2B Product One-Pager", prompt:"You are a B2B product marketer.\nWrite a sales one-pager for [PRODUCT/SOLUTION] targeting [BUYER PERSONA].\nProblem solved: [PAIN POINT]. Key capabilities: [3 FEATURES]. Proof: [METRIC OR CLIENT WIN]. CTA: [NEXT STEP].\nTone: Benefit-first, credible, concise. Written for a busy decision-maker who will skim.\nFormat: Headline (problem-focused), value proposition (2 sentences), 3 capability bullets with business outcomes, social proof section, pricing or next step CTA.\nAvoid: Feature lists without business outcomes, jargon, more than one page worth of content.\nAfter writing, check: Would a prospect understand the value and want to learn more within 30 seconds? Finalise." },
    { title:"Email Subject Lines", prompt:"You are an email copywriting expert.\nWrite 10 email subject lines for a campaign about [TOPIC/OFFER].\nAudience: [AUDIENCE]. Goal: [Opens/Clicks/Sales]. Tone: Mix of curiosity, urgency, and benefit-driven.\nFormat: 10 numbered lines. Include 2 questions, 2 numbers, 2 curiosity gaps, 2 direct, 2 personalised.\nAvoid: Spam trigger words, all caps, misleading clickbait.\nCheck: Would you open at least 5 of these? Mark the top 3. Finalise." },
    { title:"About Us Page", prompt:"You are a brand copywriter.\nWrite an About Us page for [BUSINESS NAME].\nWhat you do: [DESCRIPTION]. Why you started: [FOUNDING STORY]. Values: [2-3 VALUES].\nTone: Human, authentic, brand-appropriate.\nFormat: Who we are, why we exist, what we believe, team placeholder, CTA.\nAvoid: Starting with Founded in..., corporate language, no personality.\nCheck: Would someone feel connected after reading? Finalise." },
    { title:"30-Second Video Ad Script", prompt:"You are a video ad copywriter.\nWrite a 30-second video ad script for [PRODUCT/SERVICE].\nProblem it solves: [PROBLEM]. Hero of the ad: [CUSTOMER TYPE]. Key emotion: [EMOTION].\nTone: Storytelling, relatable, ends with clear CTA.\nFormat: Scene 1 - problem (8 sec). Scene 2 - solution (15 sec). Scene 3 - CTA (7 sec). Include voiceover and visual cues.\nAvoid: Starting with a product shot, feature-listing, weak CTAs.\nCheck: Does the viewer feel the problem and see themselves in the solution? Finalise." },
    { title:"Board Presentation Narrative", prompt:"You are a management consultant who specialises in executive storytelling.\nWrite the narrative script for a board presentation on [TOPIC] for [COMPANY].\nAudience: Board of Directors. Duration: [X] minutes. Core message: [KEY POINT]. Decision needed: [ASK].\nTone: Authoritative, data-informed, confident. Every slide has a clear point, not just a title.\nFormat: Opening frame (why we are here), situation and context, key findings (3), options considered, recommendation with evidence, risks and mitigations, the ask.\nAvoid: Slides that are just titles, burying the recommendation, no clear ask at the end.\nAfter writing, check: Will the board know exactly what they are being asked to decide? Fix if not." },
    { title:"Long-Form LinkedIn Post", prompt:"You are a LinkedIn content strategist.\nWrite a long-form LinkedIn post about [TOPIC/STORY/LESSON].\nYour angle: [YOUR UNIQUE TAKE]. Target reader: [ROLE/INDUSTRY].\nTone: Personal, insightful, starts with a bold or surprising first line.\nFormat: 1-line hook, 3-4 short paragraphs, 1 key takeaway, question at the end. Under 300 words.\nAvoid: I am thrilled to announce, buzzword overload, no personal element.\nCheck: Does the first line make you want to read the second? Finalise." },
    { title:"Webinar Invitation Email", prompt:"You are a webinar marketing specialist.\nWrite an invitation email for a webinar titled [WEBINAR TITLE].\nDate/time: [DETAILS]. Speaker: [NAME AND CREDENTIAL]. What attendees learn: [3 OUTCOMES].\nTone: Informative, exciting, creates anticipation.\nFormat: Subject + hook + 3 bullet outcomes + speaker intro + date/time + registration CTA.\nAvoid: Long speaker bios before value, vague outcomes, weak subject lines.\nCheck: After reading, do you know exactly what you will gain? Finalise." },
    { title:"Case Study Write-Up", prompt:"You are a B2B content writer.\nWrite a case study for [CLIENT TYPE] who used [PRODUCT/SERVICE].\nChallenge: [PROBLEM]. Solution: [WHAT YOU DID]. Result: [MEASURABLE OUTCOME].\nTone: Factual, credible, story-driven.\nFormat: Challenge, solution, results with key quote placeholder, CTA. Under 400 words.\nAvoid: Vague outcomes, sounding like an ad, no numbers.\nCheck: Would a similar prospect trust your solution after reading? Finalise." },
    { title:"Explainer Video Script", prompt:"You are an explainer video scriptwriter.\nWrite a 60-second explainer video script for [PRODUCT/SERVICE].\nViewer: [WHO]. Core problem solved: [PROBLEM]. How it works: [SIMPLE EXPLANATION]. CTA: [WHAT TO DO NEXT].\nTone: Simple, friendly, builds confidence.\nFormat: Problem (10 sec), introduce solution (10 sec), 3 steps (30 sec), CTA (10 sec).\nAvoid: Technical jargon, more than 3 steps, weak ending.\nCheck: Could a 10-year-old understand what this product does? Finalise." },
    { title:"Guest Post Pitch Email", prompt:"You are a content marketing specialist.\nWrite a guest post pitch email to [BLOG/PUBLICATION NAME].\nProposed topic: [TITLE]. Reader benefit: [BENEFIT]. Your credentials: [BACKGROUND].\nTone: Professional, confident, shows you know their audience.\nFormat: Subject + 4-sentence email. Compliment, pitch, benefit, writing sample mention.\nAvoid: Vague topics, not referencing their specific audience.\nCheck: Does it feel tailored to their publication? Finalise." },
    { title:"FAQ Page Content", prompt:"You are a UX copywriter.\nWrite a FAQ section for [PRODUCT/SERVICE/BUSINESS].\nCommon questions: [LIST 5-7]. Main hesitations: [CONCERNS].\nTone: Clear, direct, reassuring. Like a helpful person speaking.\nFormat: Q and A pairs. Each answer under 3 sentences.\nAvoid: Jargon, vague answers, answers that raise more questions.\nCheck: Does every answer fully resolve the concern? Finalise." },
    { title:"Podcast Episode Script Outline", prompt:"You are a B2B podcast producer and content strategist.\nWrite a detailed script outline for a podcast episode titled [EPISODE TITLE] featuring [GUEST NAME/TITLE].\nShow: [PODCAST NAME]. Audience: [PROFESSIONAL AUDIENCE]. Duration: [MINUTES]. Core topic: [TOPIC].\nFormat: Pre-show context notes, 5-minute opening hook, 3-4 interview segments with anchor questions for each, transition bridges, closing summary and listener CTA.\nAvoid: Generic questions that any podcast would ask, no preparation for likely tangents.\nAfter writing, check: Would this produce a tightly structured episode a professional audience would complete? Finalise." },
    { title:"Newsletter Subject Lines", prompt:"You are an email marketing expert.\nGenerate 15 newsletter subject line ideas for [BRAND] about [TOPIC].\nAudience: [AUDIENCE]. Brand tone: [TONE].\nFormat: 15 numbered lines. Label each: Curiosity / Benefit / Urgency / Personal / Question.\nAvoid: Clickbait, overused words like game-changer, misleading lines.\nCheck: Are there at least 3 you would genuinely open? Star the best 3. Finalise." },
    { title:"Infographic Script", prompt:"You are a visual content strategist.\nWrite the content script for an infographic about [TOPIC].\nAudience: [WHO]. Key message: [MAIN TAKEAWAY]. Sections: [5-7].\nFormat: Title, sections with short header + 2-3 data points each, source placeholders, footer CTA.\nAvoid: Too much text per section, unverifiable claims.\nCheck: Can this be understood in under 60 seconds? Finalise." },
  ]},
  { cat:"HR & Team", color:"rgba(56,189,248,0.15)", tc:"var(--sky)", prompts:[
    { title:"Job Description", prompt:"You are an HR consultant for small businesses.\nWrite a job description for [JOB TITLE].\nCompany: [TYPE]. Responsibilities: [3-4 TASKS]. Must-have skills: [SKILLS]. Salary: [RANGE].\nTone: Clear, welcoming, honest.\nFormat: Role summary, 5 responsibilities, 5 requirements, what we offer, how to apply.\nAvoid: Unicorn skill lists, corporate jargon, 20 responsibilities.\nReview: Would your ideal candidate get excited reading this? Finalise." },
    { title:"Employee Appreciation Message", prompt:"You are an HR manager.\nWrite an appreciation message for [NAME] who [WHAT THEY DID].\nContext: [TEAM/COMPANY]. Shared [publicly/privately]. Tone: Genuine, specific, warm. Not corporate.\nFormat: 3-4 sentences. Name the action, explain the impact, express genuine thanks.\nAvoid: Generic great job, hollow superlatives.\nCheck: Is the specific achievement named? Does it feel personal? Finalise." },
    { title:"Performance Review Feedback", prompt:"You are an experienced team manager.\nWrite performance review feedback for [ROLE].\nStrengths: [2-3]. Growth areas: [1-2]. Performance level: [Good/Meets/Needs improvement].\nTone: Honest, balanced, growth-focused.\nFormat: Strengths with examples, development areas with examples, forward-looking goal.\nAvoid: Vague feedback, no specific examples, surprises.\nCheck: Does the employee know exactly what to do differently? Finalise." },
    { title:"Team Meeting Agenda", prompt:"You are an operations manager.\nCreate a meeting agenda for a [TYPE] team meeting.\nTeam: [NAME]. Duration: [TIME]. Goal: [OUTCOME]. Topics: [LIST].\nFormat: Meeting title, goal, timed agenda items with owner, action items section.\nAvoid: Agenda items without owners, meetings that could be an email.\nCheck: Can every item be completed in the allotted time? Finalise." },
    { title:"Offer Letter Draft", prompt:"You are an HR professional.\nDraft an offer letter for [CANDIDATE] for the role of [ROLE].\nCompany: [NAME]. Start date: [DATE]. Salary: [AMOUNT]. Benefits: [LIST].\nTone: Professional, welcoming, clear.\nFormat: Formal greeting, role and terms, next steps, warm close.\nAvoid: Legal jargon without explanation, vague key terms.\nCheck: Are all key terms clearly stated? Finalise." },
    { title:"Warning Letter", prompt:"You are an HR consultant.\nWrite a formal warning letter regarding [ISSUE].\nEmployee: [NAME]. Role: [ROLE]. Incident date: [DATE]. Prior warnings: [YES/NO].\nTone: Formal, factual, non-personal.\nFormat: Incident description, policy reference, expected behaviour, consequence, signature lines.\nAvoid: Emotional language, vague descriptions.\nCheck: Is the incident described without emotion? Finalise." },
    { title:"Internal Announcement", prompt:"You are an internal communications manager.\nWrite an announcement about [TOPIC] for [ALL STAFF / SPECIFIC TEAM].\nEffective date: [DATE]. Key information: [WHAT THEY NEED TO KNOW].\nTone: Clear, direct, positive where possible.\nFormat: Subject line, 2-sentence summary, bullet key details, action required, contact for questions.\nAvoid: Burying key info, corporate speak, 5 paragraphs for one fact.\nCheck: What must people DO after reading? Is that the clearest line? Finalise." },
    { title:"Onboarding Welcome Message", prompt:"You are an HR manager.\nWrite a welcome message for new employee [NAME] joining as [ROLE].\nStart date: [DATE]. Team: [TEAM]. First day plan: [BRIEF OUTLINE].\nTone: Warm, exciting, reassuring.\nFormat: Personal welcome, what to expect on day 1, who to ask for help, a team message.\nAvoid: Overwhelming with info, formal HR-speak, making it feel like a manual.\nCheck: Would a new joiner feel excited and calm after reading? Finalise." },
    { title:"Exit Interview Questions", prompt:"You are an HR specialist.\nCreate 10 exit interview questions for a departing employee from [ROLE/DEPARTMENT].\nGoal: Understand why they are leaving and improve retention.\nFormat: 10 open-ended questions. Include topics: role satisfaction, management, culture, growth, what would have made them stay.\nAvoid: Leading questions, yes/no questions, accusatory questions.\nCheck: Are the questions likely to uncover useful insights? Finalise." },
    { title:"Employee Survey", prompt:"You are an HR analytics specialist.\nCreate a 10-question employee satisfaction survey for [COMPANY TYPE].\nKey areas: [Engagement/Management/Culture/Growth/Wellbeing].\nFormat: Mix of 1-10 scales and open-ended questions. One per key area.\nAvoid: Double-barrelled questions, vague questions, too many open-ended.\nCheck: Can this be completed in under 5 minutes? Will results be actionable? Finalise." },
    { title:"Pay Rise Request Template", prompt:"You are a career coach.\nWrite a pay rise request for someone in [ROLE] with [X] years at the company.\nKey achievements: [2-3 WINS]. Market rate: [SALARY RANGE]. Target: [AMOUNT].\nTone: Confident, data-backed, professional. Not emotional.\nFormat: 4 paragraphs: context, achievements, market data, specific ask and timeline.\nAvoid: Emotional appeals, vague contributions, asking without a specific number.\nCheck: Is the ask backed by evidence? Is the number specific? Finalise." },
    { title:"Probation Review Letter", prompt:"You are an HR professional.\nWrite a probation review letter for [EMPLOYEE] after [X] months.\nOutcome: [PASSED/EXTENDED/CONCERNS]. Tone: Professional, constructive, forward-looking.\nFormat: Acknowledge the period, performance summary, outcome statement, next steps or goals.\nAvoid: Vague feedback, surprises not discussed, no clear next steps.\nCheck: Is the employee clear on what happens next? Finalise." },
    { title:"Culture Values Statement", prompt:"You are an organisational culture expert.\nWrite a company culture values statement for [COMPANY NAME].\nIndustry: [TYPE]. Team size: [SIZE]. Aspirational culture: [3-4 WORDS].\nFormat: 4-5 core values each with a one-sentence description. Total under 200 words.\nAvoid: Generic values like integrity, abstract statements with no behaviour.\nCheck: Do these values tell a new hire exactly how to behave? Finalise." },
    { title:"Remote Work Policy", prompt:"You are an HR policy writer.\nWrite a remote work policy for [COMPANY TYPE].\nEmployees affected: [ALL/SPECIFIC ROLES]. Arrangement: [Fully remote/Hybrid]. Core hours: [HOURS].\nFormat: Policy overview, eligibility, core hours, communication expectations, equipment provision, review period.\nAvoid: Overly rigid rules that undermine trust, vague expectations.\nCheck: Does the policy feel fair and enable productivity? Finalise." },
    { title:"Team Building Activity Plan", prompt:"You are an HR manager planning a team event.\nCreate a half-day team building plan for a team of [SIZE].\nBudget: [AMOUNT]. Location: [Office/Offsite]. Goal: [Bond/Communication/Celebrate].\nFormat: Timeline with activities, facilitator notes, materials needed, estimated cost.\nAvoid: Activities that exclude anyone, forcing personal sharing, no clear purpose.\nCheck: Will everyone feel included? Finalise." },
    { title:"Resignation Acceptance Letter", prompt:"You are an HR manager.\nWrite a resignation acceptance letter for [EMPLOYEE] who resigned from [ROLE].\nFinal date: [DATE]. Handover plan: [BRIEF]. Tone: Professional, warm, appreciative.\nFormat: Accept resignation, confirm final date, acknowledge contribution, handover expectations, good wishes.\nAvoid: Making it purely transactional, not acknowledging their contributions.\nCheck: Would they speak well of the company after receiving this? Finalise." },
    { title:"Redundancy Letter", prompt:"You are an HR consultant.\nWrite a redundancy notification letter for [EMPLOYEE] in [ROLE].\nReason: [BUSINESS REASON]. Notice period: [NOTICE]. Severance: [IF ANY].\nTone: Professional, compassionate, clear.\nFormat: Reason, effective date, notice period, severance, support offered, next steps.\nAvoid: Unclear reasons, cold language, no support mentioned.\nCheck: Is every key term clearly stated? Does the employee know what happens next? Finalise." },
    { title:"Team Charter", prompt:"You are a team effectiveness consultant.\nWrite a team charter for [TEAM NAME] at [COMPANY].\nTeam goal: [MAIN OBJECTIVE]. Team size: [NUMBER].\nFormat: Team purpose, how we work, our agreements, how we handle conflict, our commitments.\nAvoid: Making it top-down, vague commitments, no conflict resolution plan.\nCheck: Would every team member feel ownership over this charter? Finalise." },
    { title:"360 Feedback Request", prompt:"You are an HR development specialist.\nWrite a 360 feedback request to be sent to [COLLEAGUE/MANAGER/REPORT] about [EMPLOYEE].\nFeedback areas: [AREAS]. Tone: Collaborative, low-pressure, specific.\nFormat: Brief explanation, 3-5 specific questions, deadline, anonymity note.\nAvoid: Vague questions, making it a report card, too many questions.\nCheck: Are the questions specific enough to give actionable feedback? Finalise." },
    { title:"Disciplinary Meeting Script", prompt:"You are an HR manager.\nWrite a script for a disciplinary meeting with [EMPLOYEE] regarding [ISSUE].\nPrevious discussions: [YES/NO]. Policy violated: [POLICY]. Desired outcome: [BEHAVIOUR CHANGE].\nTone: Professional, calm, firm but fair.\nFormat: Opening, state issue factually, allow employee to respond (prompt), expected change, consequence, close.\nAvoid: Emotional language, accusations, not allowing the employee to speak.\nCheck: Is the expected change specific and measurable? Finalise." },
  ]},
  { cat:"Finance & Planning", color:"rgba(244,63,94,0.15)", tc:"var(--rose)", prompts:[
    { title:"Monthly Budget Plan", prompt:"You are a financial advisor for small businesses.\nHelp me create a monthly budget plan for my [BUSINESS TYPE].\nMonthly revenue: [AMOUNT]. Fixed costs: [LIST]. Variable costs: [LIST]. Savings goal: [AMOUNT].\nFormat: Income vs expenses summary, surplus/deficit, 3 specific recommendations to improve cash flow.\nAvoid: Generic advice, ignoring seasonality.\nCheck: Are recommendations specific to my numbers? Finalise." },
    { title:"Invoice Follow-Up Message", prompt:"You are a business owner following up on an unpaid invoice.\nWrite a payment follow-up for [CLIENT].\nInvoice: [NUMBER]. Amount: [AMOUNT]. Due date: [DATE]. Days overdue: [DAYS].\nTone: Professional, firm but not aggressive. Preserve the relationship.\nFormat: Reference invoice, state amount and due date, request payment by [NEW DATE], offer to discuss.\nAvoid: Threats, emotional language, vague amount.\nCheck: Is the amount and new due date crystal clear? Finalise." },
    { title:"Proposal Pricing Section", prompt:"You are a pricing strategist.\nWrite the pricing section of a proposal for [SERVICE/PRODUCT].\nOptions: [2-3 TIERS]. Inclusions: [LIST]. Payment terms: [TERMS].\nTone: Confident, value-focused. Price is justified, not apologised for.\nFormat: 3-column comparison table, most popular highlighted, what happens next.\nAvoid: Leading with lowest price, hiding exclusions, more than 3 options.\nCheck: Does each tier feel worth its price? Finalise." },
    { title:"Plain-Language P and L Summary", prompt:"You are a small business financial advisor.\nWrite a plain-language P&L summary for [BUSINESS] for [PERIOD].\nRevenue: [AMOUNT]. COGS: [AMOUNT]. Operating expenses: [AMOUNT]. Net profit: [AMOUNT].\nTone: Clear, simple, no jargon.\nFormat: Revenue summary, expense summary, net result with key observation. Under 200 words.\nAvoid: Accountant jargon, just repeating numbers, missing the so what.\nCheck: Would a non-finance person understand immediately? Finalise." },
    { title:"Investor Update Email", prompt:"You are a startup founder.\nWrite a monthly investor update email.\nHighlights: [2-3 WINS]. Key metrics: [REVENUE/USERS/GROWTH]. Challenges: [HONEST CHALLENGES]. Help needed: [ASK IF ANY].\nTone: Transparent, confident, brief.\nFormat: 3-bullet highlights, metrics table, one challenge with plan, one specific ask.\nAvoid: Only sharing good news, vague metrics, too many asks.\nCheck: After reading, would an investor feel informed and confident? Finalise." },
    { title:"Cash Flow Forecast", prompt:"You are a financial planner for small businesses.\nWrite a 3-month cash flow forecast narrative for [BUSINESS].\nMonthly revenue projection: [AMOUNTS]. Expected expenses: [AMOUNTS]. Opening balance: [AMOUNT].\nFormat: Month-by-month summary, key risk periods identified, 2 recommendations to protect cash flow.\nAvoid: False precision, ignoring seasonal risk, no contingency planning.\nCheck: Does the narrative help the owner see where they need to act? Finalise." },
    { title:"Salary Negotiation Script", prompt:"You are a career coach.\nWrite a salary negotiation script for [ROLE] at [COMPANY TYPE].\nCurrent offer: [AMOUNT]. Target: [AMOUNT]. Experience: [YEARS]. Key value: [SKILL/ACHIEVEMENT].\nTone: Confident, professional, collaborative.\nFormat: Opening, market research reference, value statement, counter-offer, response to pushback.\nAvoid: Apologising for asking, giving a range, ultimatums.\nCheck: Is the number backed by evidence? Is the tone collaborative? Finalise." },
    { title:"Price Increase Announcement", prompt:"You are a customer communications expert.\nWrite a price increase notification to customers of [BUSINESS].\nNew pricing: [WHAT IS CHANGING]. Effective date: [DATE]. Reason: [HONEST REASON]. Loyalty offer: [IF ANY].\nTone: Honest, confident, appreciative. Not apologetic.\nFormat: Acknowledge the relationship, announce change with date, brief reason, what stays the same, loyalty offer.\nAvoid: Over-apologising, burying the increase, making it a surprise.\nCheck: Will customers feel respected rather than deceived? Finalise." },
    { title:"Startup Funding Pitch Summary", prompt:"You are a startup pitch coach.\nWrite a one-page funding pitch summary for [STARTUP NAME].\nProblem: [PROBLEM]. Solution: [PRODUCT]. Market size: [TAM]. Traction: [METRICS]. Team: [FOUNDERS]. Ask: [AMOUNT AND USE].\nTone: Confident, clear, investor-grade.\nFormat: One paragraph each for problem, solution, market, traction, team, ask.\nAvoid: Vague market size claims, no traction, ask without use of funds.\nCheck: Could an investor evaluate this in under 3 minutes? Finalise." },
    { title:"Break-Even Analysis", prompt:"You are a financial analyst for small businesses.\nHelp me calculate and explain break-even for [PRODUCT/SERVICE].\nSelling price: [PRICE]. Variable cost per unit: [COST]. Fixed monthly costs: [AMOUNT].\nFormat: Formula, break-even quantity, break-even revenue, plain-language explanation, one sensitivity scenario.\nAvoid: Jargon without explanation, only giving the number.\nCheck: Does the owner know exactly how many units to sell each month? Finalise." },
    { title:"Cost Reduction Plan", prompt:"You are a small business operations consultant.\nCreate a cost reduction plan for [BUSINESS TYPE] targeting [TARGET]% reduction.\nMajor cost areas: [LIST]. Revenue: [REVENUE]. Non-negotiables: [COSTS THAT CANNOT BE CUT].\nFormat: Top 5 opportunities, estimated saving each, difficulty (Easy/Medium/Hard), priority order.\nAvoid: Cutting costs that damage the product or customer experience.\nCheck: Can at least 3 be implemented in the next 30 days? Finalise." },
    { title:"Financial Goal Setting", prompt:"You are a personal finance coach.\nHelp me set 3 financial goals for the next [TIME PERIOD].\nCurrent situation: [INCOME/EXPENSES/SAVINGS]. Key priorities: [WHAT MATTERS MOST].\nFormat: Goal 1, 2, 3 - each with a specific number, a deadline, and 2 actions to start this week.\nAvoid: Vague goals like save more, goals without deadlines.\nCheck: Can I start the first action today? Is every goal measurable? Finalise." },
    { title:"Grant or Loan Application", prompt:"You are a business writing expert.\nWrite a business description for a grant or loan application for [BUSINESS].\nWhat you do: [DESCRIPTION]. Years operating: [YEARS]. Employees: [NUMBER]. Purpose: [WHY]. Amount: [AMOUNT].\nTone: Professional, credible, clear.\nFormat: Business overview, specific use of funds, expected outcome.\nAvoid: Vague use of funds, overpromising, sounding risky.\nCheck: Is the use of funds specific enough for a lender? Finalise." },
    { title:"Annual Financial Review", prompt:"You are a financial advisor.\nWrite an annual financial review summary for [BUSINESS/INDIVIDUAL].\nYear reviewed: [YEAR]. Key financials: [REVENUE/PROFIT/SAVINGS]. Goals last year: [GOALS]. Achieved: [OUTCOMES].\nTone: Honest, reflective, forward-looking.\nFormat: Performance vs goals, 3 financial wins, 2 lessons learned, 3 goals for next year.\nAvoid: Only celebrating wins, setting vague goals again.\nCheck: Does this create clear accountability for the year ahead? Finalise." },
    { title:"Profit Reinvestment Plan", prompt:"You are a business growth strategist.\nHelp me plan reinvestment of [AMOUNT] profit into [BUSINESS TYPE].\nBusiness goals: [GROWTH GOALS]. Constraints: [MAIN BOTTLENECKS]. Time horizon: [SHORT/LONG TERM].\nFormat: Top 3 investment areas, expected return for each, recommended allocation, risk note.\nAvoid: Spreading investment too thin, ignoring bottlenecks, no expected outcome.\nCheck: Does each investment directly serve the business goals? Finalise." },
    { title:"Freelancer Rate Calculator", prompt:"You are a freelance business coach.\nHelp a [FREELANCER TYPE] calculate their ideal rate.\nDesired monthly income: [AMOUNT]. Billable hours: [HOURS/MONTH]. Monthly expenses: [EXPENSES]. Desired savings: [AMOUNT].\nFormat: Minimum rate calculation, market rate comparison, value-based pricing suggestion, sample pricing tiers.\nAvoid: Underpricing advice, ignoring taxes, no value-based pricing explanation.\nCheck: Does the freelancer understand all 3 pricing approaches? Finalise." },
    { title:"Tax Planning Checklist", prompt:"You are a small business tax advisor.\nCreate a year-end tax preparation checklist for a [BUSINESS TYPE] in India.\nBusiness structure: [SOLE PROPRIETOR/PARTNERSHIP/COMPANY]. Revenue range: [APPROXIMATE].\nFormat: 15-item checklist covering income documentation, expense receipts, deductions, compliance deadlines, records to organise.\nAvoid: Advice that replaces a CA, vague items.\nCheck: Is every item specific and actionable? Finalise." },
    { title:"Financial Proposal for Lender", prompt:"You are a small business advisor.\nWrite a financial narrative for a loan proposal from [BUSINESS NAME].\nLoan amount: [AMOUNT]. Purpose: [SPECIFIC USE]. Repayment: [HOW]. Security: [IF ANY].\nTone: Professional, credible, well-prepared.\nFormat: Business overview, current financial health, loan purpose, repayment plan, why this is a sound investment.\nAvoid: Vague repayment plans, ignoring risks, no explanation of fund use.\nCheck: Would a cautious lender feel comfortable? Finalise." },
    { title:"Expense Report Summary", prompt:"You are a finance manager.\nWrite an expense report summary for [PERIOD].\nTotal spent: [AMOUNT]. Categories: [LIST AND AMOUNTS]. Budget: [BUDGET].\nFormat: 2-sentence summary, category breakdown, variance from budget, 2-3 flags.\nAvoid: Just listing numbers without insight, missing variance analysis.\nCheck: Does the summary tell a story beyond the numbers? Finalise." },
    { title:"Business Valuation Explanation", prompt:"You are a business finance advisor.\nExplain the estimated valuation of [BUSINESS TYPE] with [REVENUE] annual revenue.\nContext: [PURPOSE: selling/raising funds/planning]. Industry: [INDUSTRY].\nTone: Clear, educational, simple language for a non-finance founder.\nFormat: 3 common valuation methods, which applies best, a rough estimated range and why.\nAvoid: Overly technical formulas, giving a single precise number without context.\nCheck: After reading, does the founder understand how their business is valued? Finalise." },
  ]},
  { cat:"Personal Growth", color:"rgba(99,102,241,0.12)", tc:"var(--indigo-l)", prompts:[
    { title:"Personal Bio", prompt:"You are a personal branding expert.\nWrite a professional bio for [YOUR NAME].\nRole: [ROLE]. Experience: [YEARS AND FIELD]. Key achievement: [ONE BIG WIN]. Goal: [WHAT YOU WANT TO BE KNOWN FOR].\nTone: Confident, warm, human.\nFormat: 2-sentence punchy version + 5-sentence full version. Both end with what you are working on now.\nAvoid: Starting with I am passionate, listing titles without context.\nCheck: Does it make someone want to meet you? Finalise." },
    { title:"Study Plan Creator", prompt:"You are an expert learning coach.\nCreate a 4-week study plan for [SUBJECT OR EXAM].\nCurrent level: [BEGINNER/INTERMEDIATE]. Time available: [HOURS/DAY]. Exam date: [DATE]. Weak areas: [TOPICS].\nFormat: Week-by-week breakdown, daily time blocks, resources, one practice test per week.\nAvoid: Cramming in the last week, ignoring weak areas, no review sessions.\nCheck: Is the plan realistic for the time available? Finalise." },
    { title:"Quarterly Goal Setting", prompt:"You are a productivity coach.\nHelp me set quarterly goals for these life areas: [LIST 2-3 AREAS].\nFor each area: one specific goal, 3 actions, how to measure progress, weekly check-in question.\nAvoid: Vague goals, too many goals, no measurement criteria.\nCheck: Is each goal specific and measurable? Can I start today? Finalise." },
    { title:"30-Day Habit Plan", prompt:"You are a behaviour change expert.\nCreate a 30-day habit plan for [HABIT].\nCurrent baseline: [WHERE YOU ARE NOW]. Target: [WHERE YOU WANT TO BE]. Time slot: [WHEN IN DAY].\nFormat: Week 1-2 starter level, Week 3-4 building level, daily action, how to handle missed days.\nAvoid: Ambitious targets from day 1, no setback plan.\nCheck: Is week 1 so easy it feels almost too simple? Good. Finalise." },
    { title:"Sincere Apology Message", prompt:"You are a communication expert.\nWrite a sincere apology to [PERSON] for [WHAT HAPPENED].\nRelationship: [HOW YOU KNOW THEM]. Impact: [HOW IT AFFECTED THEM].\nTone: Genuine, accountable, no excuses.\nFormat: Acknowledge what happened, take responsibility, what you are doing differently, ask how to make it right.\nAvoid: Starting with I am sorry if, making excuses, asking for immediate forgiveness.\nCheck: Does it put their feelings first? Finalise." },
    { title:"Feedback Request", prompt:"You are a professional development coach.\nWrite a message requesting feedback from [PERSON] about [SPECIFIC AREA].\nTone: Humble, curious, professional.\nFormat: Why you value their opinion, one specific question, preferred format, thank them.\nAvoid: Asking for general feedback on everything, vague questions.\nCheck: Is there exactly one specific question? Is it easy to respond? Finalise." },
    { title:"Thank You Note", prompt:"You are an etiquette expert.\nWrite a thank you note for [PERSON] who [WHAT THEY DID].\nContext: [OCCASION/RELATIONSHIP]. Tone: Warm, specific, genuine. Not transactional.\nFormat: 3-4 sentences. Name the action, explain the impact, forward-looking appreciation.\nAvoid: Generic thank you for everything, making it about yourself.\nCheck: Could this only have been written for this specific person? Finalise." },
    { title:"Career Change Cover Letter", prompt:"You are a career transition coach.\nWrite a cover letter for someone moving from [CURRENT FIELD] to [NEW FIELD].\nTransferable skills: [LIST 3]. Reason for change: [BRIEF GENUINE REASON]. Target role: [JOB TITLE].\nTone: Confident, honest about the transition, shows genuine motivation.\nFormat: Opening with value you bring, how your background is an asset, motivation, CTA.\nAvoid: Apologising for the career change, hiding your previous experience.\nCheck: Does the transition feel like a strength not a weakness? Finalise." },
    { title:"Networking Follow-Up", prompt:"You are a career networking coach.\nWrite a follow-up message after meeting [PERSON] at [EVENT/CONTEXT].\nDiscussed: [TOPIC]. Goal: [WHAT YOU HOPE TO EXPLORE].\nTone: Warm, genuine, adds value.\nFormat: 3 sentences. Recall the meeting, specific reference to your conversation, low-pressure next step.\nAvoid: Immediately asking for something, vague nice to meet you messages.\nCheck: Would they remember who you are and feel good about connecting? Finalise." },
    { title:"Personal Mission Statement", prompt:"You are a personal development coach.\nHelp me write my personal mission statement.\nWhat I care most about: [VALUES]. What I am uniquely good at: [STRENGTHS]. Who I want to impact: [WHO]. Change I want to create: [IMPACT].\nTone: Authentic, inspiring, personal.\nFormat: One powerful sentence + 3-sentence expansion. No jargon.\nAvoid: Corporate language, vague purpose, trying to sound impressive.\nCheck: Does this feel genuinely mine? Would I be proud to read it aloud? Finalise." },
    { title:"LinkedIn Profile Summary", prompt:"You are a LinkedIn profile expert.\nWrite a LinkedIn summary for [YOUR NAME] in [INDUSTRY].\nSuperpower: [WHAT YOU ARE BEST AT]. Who you help: [TARGET AUDIENCE]. Key achievement: [SPECIFIC WIN]. Current focus: [WHAT YOU ARE WORKING ON NOW].\nTone: First person, conversational, confident.\nFormat: Hook sentence, 2-paragraph story, key achievement, current focus, CTA.\nAvoid: Generic results-driven professional, listing job titles, third person.\nCheck: Would the right person reach out to you after reading? Finalise." },
    { title:"Difficult Conversation Script", prompt:"You are a communication coach.\nWrite a script for a difficult conversation with [PERSON] about [ISSUE].\nGoal: [DESIRED OUTCOME]. Their likely reaction: [ANTICIPATED RESPONSE].\nTone: Calm, direct, respectful.\nFormat: Opening statement, explain the impact, ask for their perspective, proposed solution, close.\nAvoid: Accusatory language, bringing up past issues, no solution ready.\nCheck: Does the script invite dialogue rather than defensiveness? Finalise." },
    { title:"Morning Routine Plan", prompt:"You are a productivity and wellness coach.\nDesign a morning routine for someone who wants to [GOAL].\nAvailable time: [MINUTES]. Current morning: [WHAT YOU DO NOW]. Constraints: [E.G. KIDS/EARLY START].\nFormat: Minute-by-minute plan, purpose of each activity, one alternative for bad days.\nAvoid: Unrealistic 5am routines, too many activities, no flexibility.\nCheck: Could someone actually do this tomorrow without buying anything? Finalise." },
    { title:"Professional Resignation Letter", prompt:"You are a career coach.\nWrite a professional resignation letter for someone leaving [COMPANY] after [X] years.\nLeaving for: [BRIEF REASON]. Notice period: [NOTICE]. Relationships to maintain: [IMPORTANT].\nTone: Professional, grateful, forward-looking.\nFormat: Formal resignation, last working date, expression of gratitude, transition offer.\nAvoid: Burning bridges, sharing negative feedback, no transition offer.\nCheck: Would this letter protect the relationship and reputation? Finalise." },
    { title:"30-Second Self-Introduction", prompt:"You are a communication coach.\nWrite a 30-second self-introduction for [CONTEXT: interview/networking/new team].\nWho you are: [ROLE AND BACKGROUND]. What you do: [IN SIMPLE TERMS]. What makes you interesting: [ONE UNIQUE THING].\nTone: Confident, warm, memorable.\nFormat: Who I am, what I do, one interesting hook, invitation for conversation.\nAvoid: Reading from a bio, listing credentials without story, being too formal.\nCheck: After hearing this, would someone want to keep talking to you? Finalise." },
    { title:"Journaling Prompt Set", prompt:"You are a mindfulness coach.\nCreate 10 journaling prompts for someone working through [THEME].\nTheir situation: [BRIEF CONTEXT].\nFormat: 10 numbered prompts. Mix of reflection (what happened), insight (what does it mean), and action (what will you do).\nAvoid: Too abstract, repetitive themes, prompts that require a therapist.\nCheck: Can someone sit down tonight and genuinely engage with all 10? Finalise." },
    { title:"Time Audit Review", prompt:"You are a time management coach.\nHelp me conduct a time audit for a typical week as a [ROLE].\nCurrent time blocks: [HOW YOU SPEND YOUR TIME]. Priority goals: [WHAT MATTERS MOST]. Suspected time wasters: [LIST].\nFormat: Current time map, ideal time map, top 3 adjustments to make this week, one non-negotiable to protect.\nAvoid: Unrealistic schedules, ignoring energy levels, cutting all leisure.\nCheck: After this audit, do I have a specific change to make tomorrow? Finalise." },
    { title:"Personal Brand Statement", prompt:"You are a personal branding coach.\nWrite a one-sentence personal brand statement for [YOUR NAME].\nAudience: [WHO YOU WANT TO ATTRACT]. Unique skill: [WHAT ONLY YOU DO]. Outcome you create: [RESULT YOU DELIVER].\nFormat: One powerful sentence: I help [WHO] to [OUTCOME] through [YOUR UNIQUE APPROACH]. Then 3 alternative versions.\nAvoid: Generic statements, jargon, sentences that could describe anyone.\nCheck: Could this only have been written about you? Finalise." },
    { title:"Public Speaking Opener", prompt:"You are a public speaking coach.\nWrite the opening 2 minutes of a speech about [TOPIC] for [AUDIENCE].\nYour angle: [YOUR UNIQUE PERSPECTIVE]. Goal: [WHAT YOU WANT THE AUDIENCE TO FEEL OR DO].\nTone: Confident, engaging, starts with a story or surprising fact.\nFormat: Hook (story/fact/question), bridge to topic, thesis statement, preview of key points.\nAvoid: Starting with My name is, starting with a dictionary definition.\nCheck: Would the audience be hooked in the first 20 seconds? Finalise." },
    { title:"90-Day Personal Development Plan", prompt:"You are a professional development coach.\nCreate a 90-day personal development plan for someone in [ROLE] improving [SKILL AREA].\nCurrent level: [BEGINNER/INTERMEDIATE]. Time per week: [HOURS]. Learning style: [READ/WATCH/DO].\nFormat: Month 1, 2, 3 focus. For each: specific skill, resources, practice activity, milestone.\nAvoid: Vague learning goals, no practice component, no way to measure progress.\nCheck: After 90 days, how will they know they have improved? Finalise." },
  ]},
  { cat:"Customer Service", color:"rgba(16,185,129,0.12)", tc:"var(--emerald)", prompts:[
    { title:"Complaint Response Template", prompt:"You are a customer service expert.\nWrite a response to a customer complaint about [ISSUE].\nBusiness: [TYPE]. What went wrong: [WHAT HAPPENED]. Resolution: [SOLUTION].\nTone: Empathetic, accountable, solution-focused.\nFormat: Acknowledge issue, apologise genuinely, state resolution, thank for feedback.\nAvoid: Defensive language, blaming customer, hollow apologies.\nCheck: Would the customer feel heard and satisfied? Finalise." },
    { title:"Delivery Delay Notification", prompt:"You are a customer communications specialist.\nWrite a proactive message about a delivery delay for [PRODUCT].\nOriginal date: [DATE]. New date: [DATE]. Reason: [REASON].\nTone: Transparent, apologetic, solution-oriented.\nFormat: Apologise, explain honestly, give new date, offer something for the inconvenience.\nAvoid: Vague timelines, corporate excuses, no goodwill gesture.\nCheck: Does the customer know exactly what to expect? Finalise." },
    { title:"VIP Customer Welcome", prompt:"You are a luxury customer experience specialist.\nWrite a welcome message for a new VIP customer at [BUSINESS].\nWhat they get: [BENEFITS]. Dedicated contact: [NAME/TEAM].\nTone: Exclusive, warm, personal. They should feel special.\nFormat: Personal welcome, what makes their experience different, dedicated contact, first next step.\nAvoid: Generic corporate welcome, listing all benefits in a bullet dump.\nCheck: Would they feel genuinely valued as a VIP? Finalise." },
    { title:"Customer Satisfaction Follow-Up", prompt:"You are a customer success specialist.\nWrite a post-purchase follow-up for a customer who bought [PRODUCT] [X] days ago.\nGoal: Check satisfaction, invite feedback, offer help.\nTone: Genuine, low-pressure, helpful.\nFormat: WhatsApp or email under 70 words. Check in, ask one specific question, offer support contact.\nAvoid: Immediately asking for a review, pushy upsell, automated feel.\nCheck: Would the customer feel cared for rather than marketed to? Finalise." },
    { title:"Wrong Item Received Response", prompt:"You are a customer service manager.\nWrite a response to a customer who received the wrong item.\nOrder: [WHAT THEY ORDERED vs WHAT THEY GOT]. Resolution: [REPLACEMENT/REFUND/BOTH].\nTone: Apologetic, efficient, takes full responsibility.\nFormat: Acknowledge error immediately, apologise, state resolution clearly, timeline.\nAvoid: Asking customer to jump through hoops, vague timelines.\nCheck: Is the resolution process completely clear and effortless? Finalise." },
    { title:"Negative Review Response", prompt:"You are a reputation management expert.\nWrite a public response to this negative review: [PASTE REVIEW].\nBusiness: [NAME]. Was the complaint valid: [YES/PARTLY/NO].\nTone: Professional, empathetic, constructive. Aimed at other readers too.\nFormat: Thank them, acknowledge experience, take appropriate responsibility, invite offline resolution.\nAvoid: Being defensive, attacking the reviewer, empty corporate apologies.\nCheck: Would a new customer reading this trust your business more? Finalise." },
    { title:"Product Tutorial Message", prompt:"You are a customer onboarding specialist.\nWrite a tutorial message for a customer who just purchased [PRODUCT].\nTop 3 features: [FEATURES]. Common first mistake: [MISTAKE]. Support link: [LINK].\nTone: Encouraging, simple, step-by-step.\nFormat: Welcome, 3 quick steps to get started, tip to avoid the common mistake, support CTA.\nAvoid: Overwhelming with features, technical jargon, no clear next step.\nCheck: Can a first-time user get started from this message alone? Finalise." },
    { title:"Refund Policy Message", prompt:"You are a customer experience manager.\nWrite a message explaining your refund policy to a customer requesting a refund for [PRODUCT/SERVICE].\nPolicy: [POLICY DETAILS]. Customer situation: [WHAT HAPPENED].\nTone: Clear, empathetic, fair.\nFormat: Acknowledge request, explain policy, state decision, next steps.\nAvoid: Legal jargon, dismissive tone, leaving outcome unclear.\nCheck: After reading, does the customer know exactly what will happen? Finalise." },
    { title:"SLA Breach Notification", prompt:"You are a B2B customer success manager.\nWrite a proactive SLA breach notification to [CLIENT NAME] at [COMPANY].\nSLA breached: [WHAT WAS MISSED]. Root cause: [BRIEF HONEST REASON]. Impact on them: [HOW IT AFFECTED THEM].\nTone: Accountable, direct, solution-focused. No corporate deflection.\nFormat: Acknowledge the breach clearly, root cause in one sentence, immediate remediation action, prevention measure going forward, escalation contact offered.\nAvoid: Passive voice, vague timelines, making the client chase for answers.\nAfter writing, check: Does the client know exactly what happened, what is being done, and that they are in safe hands? Finalise." },
    { title:"Subscription Cancellation Recovery", prompt:"You are a customer retention specialist.\nWrite a message to a customer trying to cancel their subscription to [SERVICE].\nReason (if known): [REASON]. Retention offer: [PAUSE/DISCOUNT/DOWNGRADE].\nTone: Understanding, low-pressure, shows you value them.\nFormat: Acknowledge decision, address the likely reason, present alternative offer, make staying easy.\nAvoid: Guilt-tripping, desperate tone, making cancellation difficult.\nCheck: Does the offer genuinely address their reason for leaving? Finalise." },
    { title:"New Feature Announcement", prompt:"You are a product communications manager.\nWrite an announcement to existing customers about a new feature: [FEATURE NAME].\nWhat it does: [BENEFIT IN PLAIN LANGUAGE]. Who benefits: [CUSTOMER TYPE]. How to access: [HOW].\nTone: Excited, helpful, benefit-focused.\nFormat: What is new, who it helps and how, how to access, CTA to try it.\nAvoid: Technical descriptions, burying the benefit.\nCheck: After reading, does the customer know if this is relevant to them? Finalise." },
    { title:"Executive Quarterly Business Review Agenda", prompt:"You are a B2B customer success manager preparing for a Quarterly Business Review.\nCreate a QBR agenda for [CLIENT NAME] at [COMPANY].\nRelationship stage: [MONTHS/YEARS]. Key metrics to review: [METRICS]. Renewal in: [TIMEFRAME]. Goal: [RETAIN/EXPAND/RECOVER].\nFormat: Meeting objectives, agenda items with owner and time allocation (60-90 mins total), key data to present, open issues to resolve, expansion opportunity to introduce, next steps section.\nAvoid: Monologue-style agendas with no client participation, no forward-looking discussion.\nAfter writing, check: Would the client feel this meeting is worth their time and helps them succeed? Finalise." },
    { title:"Contract Dispute Resolution Email", prompt:"You are a B2B client relationship director.\nWrite a professional email to resolve a contract dispute with [CLIENT] about [ISSUE].\nClient's position: [WHAT THEY CLAIM]. Your position: [WHAT YOU BELIEVE]. Desired outcome: [RESOLUTION].\nTone: Professional, calm, solution-oriented. Firm but relationship-preserving.\nFormat: Acknowledge the disagreement without conceding, present your understanding of the contract, propose a fair resolution, suggest a call to align, express commitment to the relationship.\nAvoid: Legal threats in the opening, emotional language, no proposed resolution.\nAfter writing, check: Would this de-escalate the situation while protecting your position? Finalise." },
    { title:"After-Sales Service Message", prompt:"You are a customer success manager.\nWrite an after-sales message to a customer who purchased [HIGH-VALUE PRODUCT] [X] weeks ago.\nService offer: [WARRANTY/SUPPORT/MAINTENANCE]. Contact: [HOW TO REACH YOU].\nTone: Proactive, caring, builds long-term relationship.\nFormat: Check-in on satisfaction, remind of after-sales support, easy contact CTA.\nAvoid: Jumping straight to upsell, template feel.\nCheck: Does this message build trust and loyalty? Finalise." },
    { title:"Beta Feedback Request", prompt:"You are a product manager.\nWrite a message to beta users of [PRODUCT] asking for feedback after [X] weeks.\nFeedback areas: [AREAS]. Incentive: [IF ANY].\nTone: Collaborative, grateful, treats them as partners.\nFormat: Thank them, 3 specific questions, time estimate, how feedback will be used.\nAvoid: Too many questions, vague questions, not explaining impact of feedback.\nCheck: Would a busy person take 5 minutes to respond? Finalise." },
    { title:"Seasonal Customer Greeting", prompt:"You are a relationship marketing specialist.\nWrite a seasonal greeting to customers of [BUSINESS] for [FESTIVAL/OCCASION].\nKey message: [WHAT YOU WANT THEM TO FEEL]. Offer (if any): [OPTIONAL].\nTone: Warm, genuine, not a sales message.\nFormat: Heartfelt greeting, one personal touch, gentle CTA if applicable.\nAvoid: Generic greetings, making it purely promotional.\nCheck: Does this make customers feel valued as people, not just buyers? Finalise." },
    { title:"Service Interruption Notice", prompt:"You are a communications manager.\nWrite a service interruption notice for customers of [BUSINESS/SERVICE].\nWhat will not be available: [WHAT]. Duration: [START TO END TIME]. Reason: [BRIEF REASON]. Workaround: [IF ANY].\nTone: Transparent, apologetic, helpful.\nFormat: What is affected, when, why (briefly), what customers can do, when normal service resumes.\nAvoid: Vague timelines, no workaround, making it seem less important.\nCheck: Does the customer know exactly what to do and when things return to normal? Finalise." },
    { title:"Escalation Acknowledgement", prompt:"You are a senior customer service manager.\nWrite an escalation acknowledgement to a customer whose issue is being escalated.\nIssue: [ISSUE]. Escalated to: [TEAM/MANAGER]. Timeline: [TIMELINE].\nTone: Reassuring, accountable, shows urgency.\nFormat: Acknowledge escalation, explain who is handling it, specific timeline, direct contact.\nAvoid: Vague timelines, passing the buck, making customer feel they need to follow up.\nCheck: After reading, does the customer feel their issue is in safe hands? Finalise." },
    { title:"Chatbot Welcome Message", prompt:"You are a conversational UX designer.\nWrite a chatbot welcome message for [BUSINESS] website.\nBot name: [NAME IF ANY]. Can help with: [LIST 3-4 THINGS]. Fallback: [WHEN TO CONNECT TO HUMAN].\nTone: Friendly, helpful, sets clear expectations.\nFormat: Greeting, what the bot can help with, 3-4 quick-action button texts, human handoff option.\nAvoid: Pretending to be human, overpromising capabilities.\nCheck: Within 10 seconds, does the visitor know if this bot can help? Finalise." },
    { title:"G2 / Gartner Review Request", prompt:"You are a B2B customer marketing manager.\nWrite an email requesting a review on [G2/GARTNER PEER INSIGHTS/CAPTERRA] from a satisfied client [NAME] at [COMPANY].\nResult they achieved: [OUTCOME]. Time required: [MINUTES]. Incentive: [IF ANY].\nTone: Grateful, specific, makes the ask feel low-effort and worthwhile.\nFormat: Personalise with their result, explain why reviews matter (helps peers make better decisions), direct link, time estimate, optional incentive if applicable.\nAvoid: Generic review requests, not mentioning their specific result, asking too many people at once.\nAfter writing, check: Would a busy enterprise customer take 5 minutes to complete this? Fix anything that makes it feel like more work than it is." },
  ]},
  { cat:"Business Strategy", color:"rgba(244,63,94,0.12)", tc:"var(--rose)", prompts:[
    { title:"SWOT Analysis", prompt:"You are a business strategy consultant.\nConduct a SWOT analysis for [BUSINESS NAME] in [INDUSTRY].\nContext: [BRIEF DESCRIPTION]. Current challenges: [MAIN CHALLENGES]. Goals: [WHAT YOU ARE TRYING TO ACHIEVE].\nFormat: 4-quadrant SWOT with 4-5 points per quadrant, followed by top 3 strategic recommendations.\nAvoid: Generic points, no recommendations after the analysis.\nCheck: Are the insights specific to this business? Do recommendations follow logically? Finalise." },
    { title:"90-Day Business Plan", prompt:"You are a business execution coach.\nCreate a 90-day action plan for [BUSINESS] to achieve [SPECIFIC GOAL].\nCurrent status: [WHERE YOU ARE NOW]. Resources: [TEAM/BUDGET/TIME].\nFormat: Month 1 foundation, Month 2 build, Month 3 scale. Each: 3 specific actions, owner, success metric.\nAvoid: Vague actions, no accountability, more than 3 priorities per month.\nCheck: Can someone start Month 1 actions tomorrow? Finalise." },
    { title:"Business Model Canvas", prompt:"You are a business model designer.\nMap out the Business Model Canvas for [BUSINESS NAME].\nWhat I sell: [PRODUCT/SERVICE]. Who I sell to: [CUSTOMERS]. How I reach them: [CHANNELS].\nFormat: All 9 canvas blocks filled in: Value Prop, Customer Segments, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partners, Cost Structure.\nAvoid: Vague entries, missing blocks, no connection between blocks.\nCheck: Does the model tell a coherent business story? Finalise." },
    { title:"Market Entry Strategy", prompt:"You are a market strategy consultant.\nHelp me develop a market entry strategy for [PRODUCT/SERVICE] in [MARKET].\nTarget customer: [WHO]. Main competitors: [LIST]. Unique advantage: [YOUR DIFFERENTIATOR].\nFormat: Market overview, target segment, entry approach, first 90 days plan, risk assessment.\nAvoid: Entering without differentiation, no timeline.\nCheck: After reading, is the path to market clear and defensible? Finalise." },
    { title:"Pricing Strategy Framework", prompt:"You are a pricing strategist.\nHelp me develop a pricing strategy for [PRODUCT/SERVICE].\nCost to produce: [COST]. Target margin: [%]. Competitor pricing: [RANGE]. Willingness to pay: [ESTIMATE].\nFormat: 3 pricing approaches evaluated, recommended approach with rationale, suggested price point, discount policy.\nAvoid: Pricing below cost, copying competitor pricing without rationale.\nCheck: Does the recommended price balance competitiveness and margin? Finalise." },
    { title:"Customer Persona", prompt:"You are a customer research strategist.\nCreate a detailed customer persona for [BUSINESS TYPE].\nProduct: [WHAT YOU SELL]. Target customer: [BROAD DESCRIPTION].\nFormat: Name, demographics, goals, pain points, buying behaviour, preferred channels, key quote capturing their mindset.\nAvoid: Demographic profiles with no psychology, pain points not connected to your product.\nCheck: Could your team make a decision using this persona? Finalise." },
    { title:"Product Launch Checklist", prompt:"You are a product launch manager.\nCreate a product launch checklist for [PRODUCT NAME] launching in [X] weeks.\nTeam size: [SIZE]. Channels: [WHERE YOU WILL SELL]. Launch goal: [TARGET].\nFormat: Pre-launch (8 weeks to 1 week), Launch week, Post-launch (week 2-4). Each phase has tasks with owner and deadline.\nAvoid: Forgetting customer service prep, no post-launch plan, tasks without owners.\nCheck: Is there anything that could cause a failed launch not covered here? Finalise." },
    { title:"OKR Framework", prompt:"You are a management consultant.\nHelp me write OKRs for [TEAM/BUSINESS] for [QUARTER].\nCompany direction: [STRATEGIC PRIORITY]. Team focus: [WHAT YOUR TEAM OWNS].\nFormat: 2-3 Objectives each with 3-4 Key Results. Each KR measurable with target number and deadline.\nAvoid: KRs that are tasks not outcomes, vague objectives, more than 3 objectives.\nCheck: Are all KRs measurable? Would achieving them prove the Objective was met? Finalise." },
    { title:"Competitive Advantage Statement", prompt:"You are a positioning strategist.\nHelp me articulate the competitive advantage of [BUSINESS] in [MARKET].\nWhat we do better: [SPECIFIC STRENGTH]. Why competitors cannot easily copy this: [REASON]. Who values this most: [IDEAL CUSTOMER].\nFormat: One-sentence statement + 3-paragraph explanation covering what, why, and who.\nAvoid: Vague statements, advantages that competitors share, no customer connection.\nCheck: Would a potential customer choose you over a competitor after reading? Finalise." },
    { title:"Growth Strategy - Ansoff Matrix", prompt:"You are a growth strategy consultant.\nApply the Ansoff Matrix to identify growth options for [BUSINESS].\nCurrent products: [LIST]. Current markets: [LIST]. Resources available: [BUDGET/TEAM].\nFormat: All 4 quadrants evaluated with 2-3 specific options each, then a ranked recommendation with rationale.\nAvoid: Recommending diversification before mastering current market.\nCheck: Is the recommended growth path aligned with available resources? Finalise." },
    { title:"Brand Positioning Statement", prompt:"You are a brand strategist.\nWrite a brand positioning statement for [BRAND NAME].\nTarget customer: [WHO]. Category: [WHAT CATEGORY YOU ARE IN]. Key benefit: [WHAT YOU DO BETTER]. Reason to believe: [PROOF].\nFormat: Internal positioning statement + 3 external tagline options.\nInternal format: For [TARGET], [BRAND] is the [CATEGORY] that [KEY BENEFIT] because [REASON TO BELIEVE].\nAvoid: Vague benefits, positioning that applies to all competitors.\nCheck: Is the benefit ownable and provable? Finalise." },
    { title:"Exit Strategy Outline", prompt:"You are a business exit advisor.\nHelp me outline an exit strategy for [BUSINESS TYPE].\nBusiness age: [YEARS]. Current revenue: [AMOUNT]. Goal timeline: [YEARS TO EXIT]. Preferred exit: [SELL/MERGE/IPO/SUCCESSION].\nFormat: Exit type evaluation, business readiness assessment, 3-year preparation plan, key value drivers to build, advisors needed.\nAvoid: Assuming exits happen without preparation.\nCheck: Does this plan give concrete actions to increase exit value? Finalise." },
    { title:"Risk Register", prompt:"You are a risk management consultant.\nCreate a risk register for [PROJECT/BUSINESS/INITIATIVE].\nScope: [WHAT IS BEING ASSESSED]. Key risk areas: [OPERATIONAL/FINANCIAL/MARKET/PEOPLE/LEGAL].\nFormat: 10-15 risks with: risk description, likelihood (1-5), impact (1-5), risk score, mitigation action, owner.\nAvoid: Only listing risks without mitigation, vague descriptions, no ownership.\nCheck: Are the top 3 risks actively being mitigated with named owners? Finalise." },
    { title:"Customer Journey Map", prompt:"You are a customer experience strategist.\nMap the customer journey for [PRODUCT/SERVICE] from awareness to loyalty.\nCustomer type: [PERSONA]. Main purchase channel: [HOW THEY BUY].\nFormat: 5 stages (Awareness, Consideration, Purchase, Experience, Loyalty). For each: customer actions, emotions, touchpoints, pain points, opportunities.\nAvoid: Only mapping the happy path, no pain points, no improvement opportunities.\nCheck: Does this map reveal at least 3 specific improvements? Finalise." },
    { title:"Partnership Evaluation", prompt:"You are a business development consultant.\nHelp me evaluate a potential partnership with [PARTNER TYPE].\nWhat they bring: [VALUE]. What we bring: [VALUE]. Goal: [SHARED GOAL].\nFormat: Strategic fit assessment, financial opportunity estimate, risk assessment, success metrics, go/no-go recommendation.\nAvoid: Only looking at upside, no exit conditions, vague success metrics.\nCheck: Does the framework give a clear recommendation? Finalise." },
    { title:"Pivot Decision Framework", prompt:"You are a startup strategy advisor.\nHelp me evaluate whether to pivot [BUSINESS/PRODUCT].\nCurrent situation: [WHAT IS NOT WORKING]. Evidence: [DATA OR FEEDBACK]. Pivot option: [WHAT YOU MIGHT CHANGE].\nFormat: Problem diagnosis, pivot hypothesis, evidence needed to confirm, resources required, decision criteria, next step.\nAvoid: Pivoting based on one complaint, no definition of what pivot success looks like.\nCheck: Is there a clear decision point defined? Finalise." },
    { title:"Scenario Planning", prompt:"You are a strategic planning consultant.\nHelp me conduct scenario planning for [BUSINESS] over the next [1-3 YEARS].\nKey uncertainties: [2-3 VARIABLES]. Current position: [WHERE YOU ARE NOW].\nFormat: 3 scenarios (best/base/worst) each with: trigger conditions, impact on business, strategic response, early warning indicators.\nAvoid: Scenarios without triggers, no strategic response for bad scenarios.\nCheck: Does each scenario have a clear early warning sign? Finalise." },
    { title:"Operational Efficiency Review", prompt:"You are an operations consultant.\nIdentify operational inefficiencies in [BUSINESS TYPE].\nKey processes: [LIST 4-5]. Team size: [NUMBER]. Main bottleneck: [WHERE THINGS SLOW DOWN].\nFormat: Process audit checklist, top 3 inefficiencies, root cause for each, recommended solution, estimated time/cost saving.\nAvoid: Solutions requiring large investment, not addressing root cause.\nCheck: Can at least 2 recommendations be implemented in the next 30 days? Finalise." },
    { title:"Stakeholder Communication Plan", prompt:"You are a project management consultant.\nCreate a stakeholder communication plan for [PROJECT/INITIATIVE].\nKey stakeholders: [LIST WITH ROLES]. Timeline: [DURATION]. Key milestones: [LIST].\nFormat: Stakeholder map, communication frequency for each group, format, owner, key messages per stakeholder.\nAvoid: Same communication for all stakeholders, no two-way feedback mechanism.\nCheck: Will each stakeholder have the right information at the right time? Finalise." },
    { title:"Franchise Feasibility", prompt:"You are a franchise business consultant.\nEvaluate the feasibility of franchising [BUSINESS].\nCurrent business: [DESCRIPTION]. Locations: [NUMBER]. Profitability: [MARGIN]. Systems documented: [YES/NO].\nFormat: Readiness assessment across 5 criteria, financial model estimate, timeline to first franchise, key risks, go/no-go recommendation.\nAvoid: Over-optimistic projections, ignoring system documentation requirement.\nCheck: Is the recommendation honest about whether the business is truly ready? Finalise." },
  ]},
  { cat:"Education & Training", color:"rgba(245,158,11,0.12)", tc:"var(--amber)", prompts:[
    { title:"Lesson Plan Creator", prompt:"You are an experienced educator.\nCreate a lesson plan for teaching [TOPIC] to [STUDENT AGE/LEVEL].\nDuration: [TIME]. Class size: [NUMBER]. Prior knowledge: [WHAT THEY ALREADY KNOW].\nFormat: Learning objectives, materials, warm-up, main instruction (with timing), group activity, assessment, wrap-up.\nAvoid: All lecture-based delivery, no student interaction, unmeasurable objectives.\nCheck: Can someone who has never taught this topic deliver it using this plan? Finalise." },
    { title:"Training Module Outline", prompt:"You are a corporate training designer.\nCreate a training module outline on [TOPIC] for [EMPLOYEE TYPE].\nDuration: [HOURS]. Learning goal: [WHAT THEY WILL DO AFTER]. Delivery: [IN-PERSON/ONLINE/SELF-PACED].\nFormat: Module overview, 4-5 sections with outcomes, activity type for each, assessment method, time per section.\nAvoid: Too much content, no practice activities, vague outcomes.\nCheck: After this training, can employees immediately apply what they learned? Finalise." },
    { title:"Quiz Generator", prompt:"You are an assessment design specialist.\nCreate a 10-question quiz on [TOPIC] for [STUDENT LEVEL].\nLearning objectives tested: [LIST 3]. Difficulty: 30% easy, 50% medium, 20% hard.\nFormat: 7 multiple choice (4 options each), 2 true/false, 1 short answer. Include correct answers separately.\nAvoid: Trick questions, ambiguous wording, questions that only test memory.\nCheck: Do the questions genuinely test understanding? Finalise." },
    { title:"Course Curriculum Design", prompt:"You are a curriculum designer.\nDesign a [DURATION] online course curriculum for [TOPIC].\nTarget learner: [WHO]. Goal: [WHAT THEY WILL ACHIEVE]. Format: [VIDEO/TEXT/LIVE].\nFormat: Course overview, week-by-week modules with titles, learning outcomes per module, content type, one assignment per module.\nAvoid: Too much content per week, no practical assignments, vague outcomes.\nCheck: By the end, can a learner demonstrate the skill? Finalise." },
    { title:"Employee Learning Progress Report", prompt:"You are an L&D manager writing a learning progress report.\nWrite a progress report for [EMPLOYEE NAME] in [ROLE] who completed [TRAINING PROGRAMME].\nCompletion: [%]. Assessment score: [SCORE]. Strengths demonstrated: [2-3]. Development gaps: [1-2].\nTone: Constructive, growth-focused, professional. Suitable for the employee and their manager.\nFormat: Training overview, key strengths with examples, development areas with specific recommendations, suggested next steps or follow-on learning.\nAvoid: Vague observations, only positive feedback, no development pathway.\nAfter writing, check: Does the employee and manager both know what to do next? Finalise." },
    { title:"Workshop Facilitation Guide", prompt:"You are a workshop facilitator.\nCreate a facilitation guide for a [DURATION] workshop on [TOPIC] for [AUDIENCE].\nGoal: [WHAT PARTICIPANTS WILL LEAVE WITH]. Group size: [NUMBER].\nFormat: Pre-workshop setup, opening (icebreaker + agenda), 3-4 timed activities with facilitator notes, debrief questions, closing, materials list.\nAvoid: Activities without purpose, no debrief, not accounting for group dynamics.\nCheck: Would a first-time facilitator be able to run this successfully? Finalise." },
    { title:"E-Learning Script", prompt:"You are an instructional designer.\nWrite the script for an e-learning module on [TOPIC] lasting [X] minutes.\nLearner: [WHO]. Learning objective: [WHAT THEY WILL DO AFTER]. Tone: [Conversational/Professional].\nFormat: Narrator script with scene descriptions, on-screen text cues, interaction prompts, quiz moment.\nAvoid: Reading slides aloud, no interactions, passive listening only.\nCheck: Is there at least one interaction every 3 minutes? Finalise." },
    { title:"Manager Coaching Notes", prompt:"You are a management development coach.\nWrite structured coaching notes for a manager coaching session with [EMPLOYEE NAME] in [ROLE].\nSession focus: [TOPIC: communication/performance/career growth]. Key observations: [WHAT YOU NOTICED]. Goal for next session: [DEVELOPMENT GOAL].\nTone: Supportive, honest, growth-oriented.\nFormat: Session summary, key insights discussed, agreed actions with owner and deadline, one focus area for next session, manager reflection prompts.\nAvoid: Vague observations, no agreed actions, coaching notes that look like performance reviews.\nAfter writing, check: Would the employee feel motivated and clear on what to do differently? Finalise." },
    { title:"Microlearning Module", prompt:"You are an L&D specialist.\nCreate a 5-minute microlearning module on [SPECIFIC SKILL].\nLearner: [EMPLOYEE TYPE]. Delivered via: [APP/EMAIL/WHATSAPP].\nFormat: One key concept, one real example, one common mistake to avoid, one 3-question quiz, one action to take today.\nAvoid: Covering too much, no practical application, no knowledge check.\nCheck: Can a busy employee absorb and apply this in 5 minutes? Finalise." },
    { title:"Beginner Subject Explainer", prompt:"You are an expert in [SUBJECT] who teaches beginners.\nExplain [CONCEPT] to someone who has never heard of it.\nAudience: [WHO: school student/working professional/parent].\nTone: Simple, engaging, uses real-life analogies.\nFormat: One-sentence definition, real-world analogy, step-by-step explanation, common misconception addressed, 3 key takeaways.\nAvoid: Jargon without explanation, assuming prior knowledge.\nCheck: Would a complete beginner understand this? Finalise." },
    { title:"Business Report Structure Guide", prompt:"You are a business writing coach for corporate professionals.\nCreate a structure guide for a [TYPE: strategy/analysis/proposal/post-mortem] business report on [TOPIC].\nAudience: [STAKEHOLDER TYPE]. Length: [PAGES]. Key recommendation: [MAIN POINT].\nFormat: Executive summary structure, body sections with purpose of each, how to present data and evidence, conclusion and recommendation structure, common mistakes to avoid.\nAvoid: Academic-style structure in a business context, burying the recommendation.\nAfter writing, check: Could a first-time report writer produce a professional document using this guide? Finalise." },
    { title:"Pre-Meeting Briefing Note", prompt:"You are a chief of staff or executive assistant preparing briefing materials.\nWrite a pre-meeting briefing note for [EXECUTIVE NAME] attending [MEETING TYPE] with [ATTENDEES].\nMeeting goal: [WHAT NEEDS TO BE ACHIEVED]. Background: [CONTEXT]. Key decisions needed: [LIST].\nFormat: Meeting purpose (1 sentence), attendee profiles and their priorities, background context (3 bullets), agenda overview, the 3 questions the executive should be prepared to answer, suggested positions on each.\nAvoid: Too much background, no preparation for difficult questions, missing attendee context.\nAfter writing, check: Would the executive feel fully prepared in a 5-minute read? Finalise." },
    { title:"Training Needs Analysis", prompt:"You are an L&D specialist.\nConduct a training needs analysis for [ROLE/DEPARTMENT] at [COMPANY TYPE].\nCurrent performance gap: [WHAT IS NOT WORKING]. Desired performance: [WHAT GOOD LOOKS LIKE]. Cause: [SKILL/KNOWLEDGE/MOTIVATION].\nFormat: Gap analysis, root cause identification, recommended interventions, priority order, estimated impact and cost.\nAvoid: Recommending training for motivation issues, no measurement plan.\nCheck: Will the recommended training actually close the performance gap? Finalise." },
    { title:"Mentorship Program Framework", prompt:"You are an organisational development specialist.\nDesign a mentorship program framework for [COMPANY TYPE].\nGoal: [WHAT THE PROGRAM AIMS TO ACHIEVE]. Participants: [MENTOR PROFILE/MENTEE PROFILE]. Duration: [TIME].\nFormat: Program overview, matching criteria, meeting frequency and structure, conversation topics by month, success metrics, milestones.\nAvoid: No structure beyond pairing people, no accountability mechanism.\nCheck: Would both mentors and mentees find this valuable? Finalise." },
    { title:"Knowledge Base Article", prompt:"You are a technical writer.\nWrite a knowledge base article explaining [PROCESS/FEATURE/POLICY].\nAudience: [INTERNAL/CUSTOMERS]. Complexity: [BEGINNER/INTERMEDIATE].\nFormat: Article title, one-sentence summary, numbered steps, screenshot placeholder notes, common issues and solutions, related articles.\nAvoid: Assuming knowledge, steps without context, no troubleshooting section.\nCheck: Can someone complete the task from reading this article alone? Finalise." },
    { title:"Leadership Development Programme Plan", prompt:"You are an organisational development specialist.\nDesign a 6-month leadership development programme plan for [PARTICIPANT PROFILE: new managers/senior leaders].\nOrganisation: [COMPANY TYPE]. Business context: [CHALLENGES THEY FACE]. Cohort size: [NUMBER].\nFormat: Programme objectives, monthly themes with learning goals, mix of learning methods (workshops/coaching/on-the-job/peer learning), assessment approach, success metrics, what good looks like at 6 months.\nAvoid: Training-only programmes with no on-the-job application, no peer learning, no measurement.\nAfter writing, check: Would HR and line managers both believe this will build better leaders? Finalise." },
    { title:"Guest Speaker Brief", prompt:"You are an event manager at an educational institution.\nWrite a brief for a guest speaker presenting on [TOPIC] to [AUDIENCE].\nEvent: [NAME]. Duration: [TIME]. Audience size: [NUMBER]. Format: [IN-PERSON/ONLINE].\nFormat: Audience profile, objectives, suggested structure, technical setup, Q&A handling, dos and donts.\nAvoid: Over-prescribing the content, no audience information, unclear timing.\nCheck: Would a first-time speaker feel fully prepared? Finalise." },
    { title:"Internship Project Brief", prompt:"You are an HR and learning manager.\nWrite a project brief for an intern joining [DEPARTMENT] for [DURATION].\nProject goal: [WHAT THE INTERN WILL WORK ON]. Skills they will develop: [LIST]. Deliverable: [WHAT THEY WILL PRODUCE].\nFormat: Project overview, week-by-week milestones, resources and support, evaluation criteria, presentation requirement.\nAvoid: Busy work with no real output, no clear deliverable, no feedback mechanism.\nCheck: Would an intern leave having genuinely contributed and learned? Finalise." },
    { title:"Learning Outcomes Writing", prompt:"You are an instructional design expert.\nHelp me write strong learning outcomes for a course on [TOPIC].\nLevel: [Bloom's: Remember/Understand/Apply/Analyse/Evaluate/Create]. Number needed: [NUMBER].\nFormat: [NUMBER] outcomes starting with: By the end of this course, participants will be able to... using Bloom's taxonomy verbs.\nAvoid: Vague verbs like understand or know, outcomes that cannot be measured, multiple skills per outcome.\nCheck: Can each outcome be directly assessed? Finalise." },
    { title:"Certification Criteria Document", prompt:"You are a training quality specialist.\nWrite the certification criteria document for [TRAINING PROGRAMME].\nCertification name: [NAME]. Minimum score to pass: [%]. Assessment format: [EXAM/PROJECT/OBSERVATION]. Valid for: [PERIOD].\nFormat: Programme overview, competency framework, assessment rubric, pass/fail criteria, renewal requirements, appeals process.\nAvoid: Vague competency descriptions, no appeals process, unclear renewal requirements.\nCheck: Is every criterion objective and measurable? Finalise." },
  ]},
];



/* ── API ── */
async function callClaude(messages, system, maxTokens) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{ "Content-Type":"application/json","x-api-key":"ignored","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true" },
    body:JSON.stringify({ model:"claude-haiku-4-5-20251001", max_tokens:maxTokens||450, system, messages }),
  });
  const data = await res.json();
  return data.content?.map(function(b){ return b.text||""; }).join("") || "Error. Please try again.";
}

/* ── COPY BTN ── */
function CopyBtn(props) {
  var text = props.text;
  var label = props.label || "Copy";
  var done = props.done;
  var setDone = props.setDone;
  var [localDone, setLocalDone] = useState(false);
  var isDone = done !== undefined ? done : localDone;
  function handle() {
    function doCopy() {
      if (setDone) setDone(true); else setLocalDone(true);
      setTimeout(function(){ if (setDone) setDone(false); else setLocalDone(false); }, 2000);
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(doCopy).catch(fb);
      } else { fb(); }
    } catch(e) { fb(); }
    function fb() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand("copy"); doCopy(); } catch(e2) {}
      document.body.removeChild(ta);
    }
  }
  return React.createElement("button", { className:"copy-btn"+(isDone?" done":""), onClick:handle }, isDone ? "Copied" : label);
}

/* ── FEEDBACK CARD ── */
function FeedbackCard(props) {
  var text = props.text;
  var BLOCKS = ["Role","Objective","Context","Tone","Format","Constraints","Example","Critique"];
  var presentMatch = text.match(/PRESENT:\s*([^\n]+)/i);
  var missingMatch = text.match(/MISSING:\s*([^\n]+)/i);
  var bestMatch    = text.match(/BEST PART:\s*([^\n]+)/i);
  var tipMatch     = text.match(/TOP TIP:\s*([^\n]+)/i);
  var presentLine  = presentMatch ? presentMatch[1] : "";
  var missingLine  = missingMatch ? missingMatch[1] : "";
  var bestPart     = bestMatch    ? bestMatch[1]    : "";
  var topTip       = tipMatch     ? tipMatch[1]     : "";
  var present = BLOCKS.filter(function(b){ return presentLine.toLowerCase().indexOf(b.toLowerCase()) >= 0; });
  var missing = BLOCKS.filter(function(b){ return missingLine.toLowerCase().indexOf(b.toLowerCase()) >= 0; });
  if (!presentLine && !missingLine) {
    return React.createElement("div", { style:{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r-md)",padding:16,marginTop:12} }, text);
  }
  return (
    React.createElement("div", { style:{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r-md)",padding:16,marginTop:12,animation:"fadeUp 0.3s"} },
      React.createElement("div", { style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,paddingBottom:12,borderBottom:"1px solid var(--border)",flexWrap:"wrap",gap:8} },
        React.createElement("span", { style:{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"var(--indigo-l)"} }, "8-Block Evaluation"),
        React.createElement(CopyBtn, { text:text })
      ),
      present.length > 0 && React.createElement("div", { style:{marginBottom:12} },
        React.createElement("div", { style:{fontSize:10,fontWeight:700,textTransform:"uppercase",color:"var(--emerald)",marginBottom:7} }, "Present in your prompt"),
        React.createElement("div", { style:{display:"flex",flexWrap:"wrap",gap:6} },
          present.map(function(b){ return React.createElement("span", { key:b, style:{padding:"4px 11px",borderRadius:999,fontSize:12,fontWeight:700,background:"rgba(16,185,129,0.12)",color:"var(--emerald)",border:"1px solid rgba(16,185,129,0.25)"} }, b); })
        )
      ),
      missing.length > 0 && React.createElement("div", { style:{marginBottom:14} },
        React.createElement("div", { style:{fontSize:10,fontWeight:700,textTransform:"uppercase",color:"var(--rose)",marginBottom:7} }, "Missing from your prompt"),
        React.createElement("div", { style:{display:"flex",flexWrap:"wrap",gap:6} },
          missing.map(function(b){ return React.createElement("span", { key:b, style:{padding:"4px 11px",borderRadius:999,fontSize:12,fontWeight:700,background:"rgba(244,63,94,0.1)",color:"var(--rose)",border:"1px solid rgba(244,63,94,0.2)"} }, b); })
        )
      ),
      React.createElement("div", { style:{height:1,background:"var(--border)",margin:"12px 0"} }),
      bestPart && React.createElement("div", { style:{marginBottom:10,fontSize:13,lineHeight:1.6} },
        React.createElement("strong", { style:{color:"var(--text)"} }, "Well done: "),
        React.createElement("span", { style:{color:"var(--text2)"} }, bestPart)
      ),
      topTip && React.createElement("div", { style:{padding:"10px 13px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.18)",borderRadius:"var(--r-sm)",fontSize:13,lineHeight:1.6} },
        React.createElement("strong", { style:{color:"var(--indigo-l)"} }, "Top tip: "),
        React.createElement("span", { style:{color:"var(--text2)"} }, topTip)
      )
    )
  );
}

/* ── APP ── */
const LESSONS = [
    {num:1,emoji:"🧱",label:"The 8 Building Blocks",      sub:"What every great prompt needs and why",                  bg:"rgba(99,102,241,0.15)", tc:"var(--indigo-l)",bc:"rgba(99,102,241,0.3)"},
    {num:2,emoji:"✦", label:"The Master Formula",          sub:"All 8 blocks working together in one real prompt",       bg:"rgba(16,185,129,0.15)",tc:"var(--emerald)", bc:"rgba(16,185,129,0.3)"},
    {num:3,emoji:"🔄",label:"The 7-Step Improvement Loop", sub:"Build any prompt step by step, start rough finish strong",bg:"rgba(245,158,11,0.15)",tc:"var(--amber)",  bc:"rgba(245,158,11,0.3)"},
    {num:4,emoji:"⚡",label:"3 Power Moves",               sub:"One line that instantly upgrades any prompt",            bg:"rgba(16,185,129,0.15)",tc:"var(--emerald)", bc:"rgba(16,185,129,0.3)"},
    {num:5,emoji:"🏅",label:"5 Golden Rules",              sub:"The mindset that separates great prompts from lucky ones",bg:"rgba(245,158,11,0.15)",tc:"var(--amber)",  bc:"rgba(245,158,11,0.3)"},
    {num:6,emoji:"⚠",label:"5 Mistakes to Avoid",        sub:"What kills AI results and how to fix it",                bg:"rgba(244,63,94,0.12)", tc:"var(--rose)",   bc:"rgba(244,63,94,0.25)"},
    {num:7,emoji:"🔥",label:"Before vs After",             sub:"Same task, see the transformation a great prompt makes", bg:"rgba(56,189,248,0.12)",tc:"var(--sky)",    bc:"rgba(56,189,248,0.25)"},
  ];

export default function PromptCoach() {
  var [tab, setTab]               = useState("guide");
  var [animKey, setAnimKey]       = useState(0);
  var [practiceCount, setPracticeCount] = useState(0);

  // Burger menu
  var [showMenu, setShowMenu]     = useState(false);
  var [menuPage, setMenuPage]     = useState("home");

  // Escape key closes drawer + body scroll lock
  React.useEffect(function() {
    if (showMenu) {
      document.body.style.overflow = "hidden";
      function onKey(e) { if (e.key === "Escape") { setShowMenu(false); setMenuPage("home"); } }
      document.addEventListener("keydown", onKey);
      return function() { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
    } else {
      document.body.style.overflow = "";
    }
  }, [showMenu]);

  // Builder
  var [bMode, setBMode]           = useState("improve");
  var [bInput, setBInput]         = useState("");
  var [bOutput, setBOutput]       = useState("");
  var [bAnswer, setBAnswer]       = useState("");
  var [loadingB, setLoadingB]     = useState(false);

  // Wizard
  var W0 = {role:"",objective:"",context:"",tone:"",format:"",constraints:"",example:"",critique:true};
  var [wiz, setWiz]               = useState(W0);
  var [customRole, setCustomRole] = useState("");
  var [wizOut, setWizOut]         = useState("");
  var [loadingWiz, setLoadingWiz] = useState(false);
  function wSet(k,v){ setWiz(function(p){ var n=Object.assign({},p); n[k]=v; return n; }); }
  function resetWiz(){ setWiz(W0); setWizOut(""); setCustomRole(""); }

  // Persona Suggester
  var [showPersonaSuggester, setShowPersonaSuggester] = useState(false);
  var [personaTask, setPersonaTask]     = useState("");
  var [personaSuggestion, setPersonaSuggestion] = useState("");
  var [loadingPersona, setLoadingPersona] = useState(false);

  async function suggestPersona() {
    if (!personaTask.trim()) return;
    setLoadingPersona(true); setPersonaSuggestion("");
    try {
      var sys = "You are an expert in AI prompt engineering. Based on the task described, suggest the ideal expert persona or team.\n\nReply in this EXACT format:\n\nRECOMMENDED PERSONA:\n[role title or team]\n\nWHY THIS WORKS:\n[2 sentences]\n\nALTERNATIVE:\n[simpler single role]";
      var result = await callClaude([{role:"user",content:"Task: "+personaTask}], sys, 300);
      setPersonaSuggestion(result);
    } finally { setLoadingPersona(false); }
  }

  function applyPersonaSuggestion() {
    var m = personaSuggestion.match(/RECOMMENDED PERSONA:\s*([\s\S]*?)(?=WHY THIS WORKS:|$)/i);
    if (m) {
      var suggested = m[1].trim();
      setCustomRole(suggested);
      wSet("role","Others");
      setShowPersonaSuggester(false);
      setPersonaTask(""); setPersonaSuggestion("");
    }
  }

  // Library
  var [libCat, setLibCat]         = useState(0);
  var [libSearch, setLibSearch]   = useState("");
  var [learnThis, setLearnThis]   = useState(null);
  var [saved, setSaved]           = useState([]);
  var [showSaved, setShowSaved]   = useState(false);

  async function getLearnThis(title, prompt) {
    setLearnThis({title:title, prompt:prompt, loading:true, breakdown:""});
    try {
      var sys = "You are a prompt engineering teacher. Analyse this prompt against the 8 building blocks.\n\nReply in this EXACT format:\n\nBLOCKS USED:\nRole: [what role is set]\nObjective: [what the objective is]\nContext: [what context is given]\nTone: [what tone is set]\nFormat: [what format is specified]\nConstraints: [what constraints are set]\nExample: [example given OR Not used]\nCritique: [critique instruction OR Not used]\n\nKEY LESSON:\n[One sentence on what beginners should copy]\n\nTRY IT YOURSELF:\n[One sentence challenge]";
      var result = await callClaude([{role:"user",content:"Analyse: "+prompt}], sys, 500);
      setLearnThis({title:title, prompt:prompt, loading:false, breakdown:result});
    } catch(e) {
      setLearnThis({title:title, prompt:prompt, loading:false, breakdown:"Could not load. Please try again."});
    }
  }

  function savePrompt(title, prompt) {
    setSaved(function(prev) {
      if (prev.some(function(p){ return p.prompt===prompt; })) return prev;
      return [{id:Date.now(),title:title,prompt:prompt,date:new Date().toLocaleDateString("en-IN")}].concat(prev).slice(0,50);
    });
  }
  function deleteSaved(id) { setSaved(function(prev){ return prev.filter(function(p){ return p.id!==id; }); }); }

  // Learn
  var [openEl, setOpenEl]         = useState(null);
  var [openLesson, setOpenLesson] = useState(null);

  // Practice
  var [track, setTrack]           = useState("business");
  var [exs, setExs]               = useState([]);
  var [loadingEx, setLoadingEx]   = useState(false);
  var [ans, setAns]               = useState(["","",""]);
  var [showIdeal, setShowIdeal]   = useState([false,false,false]);
  var [fbs, setFbs]               = useState(["","",""]);
  var [exScores, setExScores]     = useState([null,null,null]);
  var [loadingFb, setLoadingFb]   = useState([false,false,false]);
  var todayChallenge              = DAILY_CHALLENGES[new Date().getDay() % DAILY_CHALLENGES.length];
  var [showDaily, setShowDaily]   = useState(false);
  var [dailyAns, setDailyAns]     = useState("");
  var [dailyFb, setDailyFb]       = useState("");
  var [loadingDaily, setLoadingDaily] = useState(false);

  // Compare
  var [cmpA, setCmpA]             = useState("");
  var [cmpB, setCmpB]             = useState("");
  var [cmpOutA, setCmpOutA]       = useState("");
  var [cmpOutB, setCmpOutB]       = useState("");
  var [loadingCmpA, setLoadingCmpA] = useState(false);
  var [loadingCmpB, setLoadingCmpB] = useState(false);

  // History
  var [history, setHistory]       = useState([]);
  var [showHistory, setShowHistory] = useState(false);
  var [historyLoaded, setHistoryLoaded] = useState(false);

  React.useEffect(function() {
    async function loadHistory() {
      try {
        var result = await window.storage.get("promptcoach-history");
        if (result && result.value) setHistory(JSON.parse(result.value));
      } catch(e) {}
      setHistoryLoaded(true);
    }
    loadHistory();
  }, []);

  async function addToHistory(label, prompt, output) {
    setHistory(function(prev) {
      var entry = {id:Date.now(),label:label,prompt:prompt,output:output,
        time:new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})};
      var updated = [entry].concat(prev).slice(0,10);
      try { window.storage.set("promptcoach-history", JSON.stringify(updated)); } catch(e) {}
      return updated;
    });
  }

  async function clearHistory() {
    setHistory([]);
    try { await window.storage.delete("promptcoach-history"); } catch(e) {}
  }

  // Versions
  var [versions, setVersions]     = useState([]);
  var [activeVersion, setActiveVersion] = useState(0);

  function go(id){ setTab(id); setAnimKey(function(k){ return k+1; }); }
  function switchMode(id){ setBMode(id); setBOutput(""); setBInput(""); setWizOut(""); setBAnswer(""); }

  function saveVersion(prompt, output) {
    setVersions(function(prev){
      var v = {v:prev.length+1,prompt:prompt,output:output,
        time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})};
      var updated = prev.concat([v]);
      setActiveVersion(updated.length-1);
      return updated;
    });
  }

  async function runCompare(side) {
    var prompt = side==="A" ? cmpA : cmpB;
    if (!prompt.trim()) return;
    if (side==="A") { setLoadingCmpA(true); setCmpOutA(""); }
    else { setLoadingCmpB(true); setCmpOutB(""); }
    try {
      var result = await callClaude([{role:"user",content:prompt}], "You are a helpful AI assistant. Answer the prompt directly.", 600);
      if (side==="A") setCmpOutA(result); else setCmpOutB(result);
    } finally {
      if (side==="A") setLoadingCmpA(false); else setLoadingCmpB(false);
    }
  }

  async function runBothCompare() {
    if (cmpA.trim()) runCompare("A");
    if (cmpB.trim()) runCompare("B");
  }

  async function runWizard() {
    if (!wiz.objective.trim()) return;
    setLoadingWiz(true); setWizOut("");
    try {
      var finalRole = wiz.role==="Others" ? (customRole.trim()||"the most appropriate expert") : (wiz.role||"the most appropriate expert");
      var critLine  = wiz.critique ? "After writing, re-read and fix anything that does not match. Give final version only." : "";
      var sys = "You are a world-class prompt engineer. Build a complete professional AI prompt from the user answers. Follow the 8-block structure. Return ONLY the finished prompt.";
      var msg = "Build a prompt:\n1. ROLE: "+finalRole+"\n2. OBJECTIVE: "+wiz.objective+"\n3. CONTEXT: "+(wiz.context||"Not provided")+"\n4. TONE: "+(wiz.tone||"Professional")+"\n5. FORMAT: "+(wiz.format||"Clear and well-structured")+"\n6. CONSTRAINTS: "+(wiz.constraints||"Avoid jargon")+"\n7. EXAMPLE: "+(wiz.example||"Not provided")+"\n8. CRITIQUE: "+(critLine||"Not required");
      var result = await callClaude([{role:"user",content:msg}], sys, 1200);
      setWizOut(result);
      addToHistory("Built: "+wiz.objective.slice(0,30), result, "");
    } finally { setLoadingWiz(false); }
  }

  async function runBuilder() {
    if (!bInput.trim()) return;
    setLoadingB(true); setBOutput(""); setBAnswer("");
    try {
      var sys2 = "You are a prompt engineer. Improve the given prompt to include: Role, Objective, Context, Tone, Format, Constraints, and a Critique instruction.\nReply in this exact format:\n\nIMPROVED PROMPT:\n[improved prompt]\n\nWHAT WAS MISSING:\n- [issue]\n\nWHY ITS BETTER:\n- [improvement]";
      var improved = await callClaude([{role:"user",content:"Improve: \""+bInput+"\""}], sys2, 1200);
      setBOutput(improved);
      var s = improved.indexOf("IMPROVED PROMPT:");
      if (s !== -1) {
        var after = improved.slice(s+16).trim();
        var e = after.search(/\nWHAT WAS MISSING|\nWHY ITS BETTER|\n[A-Z]{4,}/);
        var cleanPrompt = e===-1 ? after.trim() : after.slice(0,e).trim();
        if (cleanPrompt) {
          saveVersion(bInput, cleanPrompt);
          var answer = await callClaude([{role:"user",content:cleanPrompt}], "You are a helpful AI assistant. Answer the prompt directly.", 600);
          setBAnswer(answer);
          addToHistory("Improved: "+bInput.slice(0,30), cleanPrompt, answer);
        }
      }
    } finally { setLoadingB(false); }
  }

  function extractImp(text) {
    var s = text.indexOf("IMPROVED PROMPT:"); if (s===-1) return text;
    var after = text.slice(s+16).trim();
    var e = after.search(/\nWHAT WAS MISSING|\nWHY ITS BETTER|\n[A-Z]{4,}/);
    return e===-1 ? after : after.slice(0,e).trim();
  }

  async function genExs() {
    setLoadingEx(true); setExs([]); setAns(["","",""]); setShowIdeal([false,false,false]); setFbs(["","",""]); setExScores([null,null,null]);
    var trackMap = {
      business:   {ind:["retail shop owner","coaching centre","manufacturing business"],   bl:"Role, Objective, Context, Tone, Format, and Constraints"},
      marketing:  {ind:["Instagram brand manager","digital marketing agency","local business owner"], bl:"Role, Objective, Tone, Format, Example, and Critique"},
      sales:      {ind:["software sales rep","insurance agent","freelance designer"],       bl:"Role, Objective, Context, Tone, Constraints, and Critique"},
      content:    {ind:["YouTube creator","food blogger","LinkedIn educator"],             bl:"Role, Objective, Tone, Format, Example, and Critique"},
      hr:         {ind:["HR manager at a startup","recruitment consultant","L&D specialist"], bl:"Role, Objective, Context, Format, Constraints, and Critique"},
      finance:    {ind:["small business owner","freelance accountant","personal finance advisor"], bl:"Role, Objective, Context, Format, and Constraints"},
      customer:   {ind:["e-commerce support rep","restaurant manager","SaaS support agent"], bl:"Role, Objective, Context, Tone, Constraints, and Critique"},
      ecommerce:  {ind:["Meesho seller","Amazon India seller","handmade products seller"], bl:"Role, Objective, Context, Tone, Format, and Constraints"},
      realestate: {ind:["residential property agent","commercial property broker","rental manager"], bl:"Role, Objective, Context, Tone, Format, and Constraints"},
      education:  {ind:["school teacher","corporate trainer","online course creator"],     bl:"Role, Objective, Context, Format, Constraints, and Critique"},
      healthcare: {ind:["clinic manager","health coach","nutritionist"],                   bl:"Role, Objective, Context, Tone, Format, and Constraints"},
      legal:      {ind:["solo practitioner lawyer","compliance officer","contract specialist"], bl:"Role, Objective, Context, Format, Constraints, and Critique"},
      freelance:  {ind:["freelance graphic designer","independent copywriter","freelance photographer"], bl:"Role, Objective, Context, Tone, Format, and Constraints"},
      personal:   {ind:["professional on personal development","manager improving communication","entrepreneur building habits"], bl:"Role, Objective, Context, Tone, and Format"},
      students:   {ind:["engineering student","MBA student","job seeker writing applications"], bl:"Role, Objective, Context, Format, and Constraints"},
    };
    var picked = trackMap[track] || trackMap.business;
    var tLabel = (TRACKS.find(function(t){ return t.id===track; })||{label:track}).label;
    var ind = picked.ind.slice().sort(function(){ return Math.random()-0.5; }).slice(0,3);
    try {
      var sys = "You are a prompt engineering coach. Generate 3 real-world practice exercises for the "+tLabel+" track.\n\nUse this EXACT format:\n\nEXERCISE 1\nSCENARIO: [2 sentences about a "+ind[0]+" needing AI help]\nIDEAL: [Complete prompt using "+picked.bl+". Each block on its own line.]\nHINT: [One sentence on the most important block]\n\nEXERCISE 2\nSCENARIO: [2 sentences about a "+ind[1]+"]\nIDEAL: [Complete prompt using "+picked.bl+"]\nHINT: [One tip]\n\nEXERCISE 3\nSCENARIO: [2 sentences about a "+ind[2]+"]\nIDEAL: [Complete prompt using "+picked.bl+"]\nHINT: [One tip]";
      var raw = await callClaude([{role:"user",content:"Generate the 3 exercises now."}], sys, 1200);
      var parts = raw.split(/EXERCISE\s+\d+/i).filter(function(p){ return p.trim().length>0; });
      var parsed = parts.slice(0,3).map(function(block){
        var sm = block.match(/SCENARIO:\s*([\s\S]*?)(?=IDEAL:|$)/i);
        var im = block.match(/IDEAL:\s*([\s\S]*?)(?=HINT:|$)/i);
        var hm = block.match(/HINT:\s*([\s\S]*?)$/i);
        return {scenario:sm?sm[1].trim():"",ideal:im?im[1].trim():"",hint:hm?hm[1].trim():""};
      }).filter(function(e){ return e.scenario.length>0; });
      if (parsed.length===0) throw new Error("parse failed");
      setExs(parsed);
    } catch(err) {
      setExs([{scenario:"Could not generate. Please tap Generate Exercises again.",ideal:"",hint:""}]);
    } finally { setLoadingEx(false); }
  }

  async function getFb(idx) {
    if (!ans[idx].trim() || !exs[idx]) return;
    var nl = loadingFb.slice(); nl[idx]=true; setLoadingFb(nl);
    try {
      var sys = "You are a prompt coach. Evaluate against 8 blocks: Role, Objective, Context, Tone, Format, Constraints, Example, Critique.\nReply:\nPRESENT: [blocks present]\nMISSING: [blocks missing]\nBEST PART: [one sentence]\nTOP TIP: [one sentence]\nSCORE: [1-10]/10";
      var result = await callClaude([{role:"user",content:"Scenario: "+exs[idx].scenario+"\n\nUser prompt:\n"+ans[idx]}], sys, 300);
      var nf = fbs.slice(); nf[idx]=result; setFbs(nf);
      var m = result.match(/SCORE:\s*(\d+)/i);
      if (m) { var sc=parseInt(m[1]); var ns=exScores.slice(); ns[idx]=sc; setExScores(ns); setPracticeCount(function(p){ return p+1; }); }
    } finally { var nl2=loadingFb.slice(); nl2[idx]=false; setLoadingFb(nl2); }
  }

  async function getDailyFb() {
    if (!dailyAns.trim()) return;
    setLoadingDaily(true);
    try {
      var sys = "You are a prompt coach. Evaluate against 8 blocks.\nReply:\nPRESENT: [blocks present]\nMISSING: [blocks missing]\nBEST PART: [one sentence]\nTOP TIP: [one sentence]\nSCORE: [1-10]/10";
      var result = await callClaude([{role:"user",content:"Scenario: "+todayChallenge.scenario+"\n\nPrompt:\n"+dailyAns}], sys, 300);
      setDailyFb(result);
      var m = result.match(/SCORE:\s*(\d+)/i);
      if (m) { var sc2=parseInt(m[1]); setPracticeCount(function(p){ return p+1; }); }
    } finally { setLoadingDaily(false); }
  }

  var numBall = function(n) { return React.createElement("div",{className:"wiz-num"},n); };
  var Chip = function(p) {
    return React.createElement("button",{onClick:p.onClick,style:{padding:"5px 12px",borderRadius:999,border:"1px solid",borderColor:p.sel?(p.selBorder||"rgba(99,102,241,0.5)"):"var(--border)",background:p.sel?(p.selBg||"rgba(99,102,241,0.18)"):"var(--surface2)",color:p.sel?(p.selColor||"var(--indigo-l)"):"var(--text2)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.15s"}},p.label);
  };

  return (
    React.createElement(React.Fragment, null,
      React.createElement("style", {dangerouslySetInnerHTML:{__html:STYLES}}),
      React.createElement("div", {className:"shell"},

        React.createElement("div", {className:"top-bar"},
          React.createElement("button", {
            className: "burger-btn" + (showMenu ? " open" : ""),
            onClick: function(){ setShowMenu(true); setMenuPage("home"); },
            "aria-label": showMenu ? "Close navigation menu" : "Open navigation menu",
            "aria-expanded": showMenu,
            "aria-controls": "nav-drawer",
          },
            React.createElement("span", {className:"burger-line burger-line-top"}),
            React.createElement("span", {className:"burger-line burger-line-mid"}),
            React.createElement("span", {className:"burger-line burger-line-bot"})
          ),
          React.createElement("div", {className:"brand"},
            React.createElement("div",{className:"brand-icon",style:{fontFamily:"serif",fontSize:14,fontWeight:900,letterSpacing:"-1px",color:"#fff"}},"PC"),
            React.createElement("div", null,
              React.createElement("div",{className:"brand-name"},"Prompt",React.createElement("span",null,"Coach")),
              React.createElement("div",{style:{fontSize:9,color:"var(--text3)",letterSpacing:"0.3px",marginTop:-1}},"The AI expert in your pocket")
            )
          ),

        ),

        React.createElement("div", {key:animKey, className:"page-enter"},

          tab==="builder" && React.createElement("div", null,
            React.createElement("div",{className:"hero"},
              React.createElement("h1",null,"Tell Us What You Need. We'll Build the Prompt With You."),
              React.createElement("p",null,"Start with any rough idea - even 3 words is enough. We shape it into a prompt that gets you the result you actually wanted.")
            ),
            React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:12}},
              React.createElement("button",{onClick:function(){ setShowHistory(!showHistory); },style:{display:"flex",alignItems:"center",gap:5,background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"var(--r-sm)",color:history.length>0?"var(--indigo-l)":"var(--text3)",fontSize:11.5,fontWeight:600,padding:"5px 10px",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},
                "History "+(history.length>0?"("+history.length+")":"")
              )
            ),
            showHistory && React.createElement("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r-md)",padding:14,marginBottom:14}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}},
                React.createElement("div",null,
                  React.createElement("span",{style:{fontSize:11,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--indigo-l)"}},"Last 10 Prompts"),
                  React.createElement("span",{style:{fontSize:10,color:"var(--text3)",marginLeft:8}},"Saved across sessions")
                ),
                React.createElement("button",{onClick:clearHistory,style:{fontSize:11,color:"var(--rose)",background:"none",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Clear All")
              ),
              !historyLoaded && React.createElement("div",{style:{fontSize:12,color:"var(--text3)",textAlign:"center",padding:"12px 0"}},"Loading..."),
              historyLoaded && history.length===0 && React.createElement("div",{style:{fontSize:12,color:"var(--text3)",textAlign:"center",padding:"12px 0"}},"No history yet. Build or improve a prompt to start tracking."),
              historyLoaded && history.map(function(h){
                return React.createElement("div",{key:h.id,className:"hist-item",onClick:function(){ setBInput(h.prompt); switchMode("improve"); setShowHistory(false); }},
                  React.createElement("div",{className:"hist-dot",style:{background:h.label.startsWith("Built")?"var(--emerald)":"var(--indigo)"}}),
                  React.createElement("div",{style:{minWidth:0,flex:1}},
                    React.createElement("div",{style:{fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:2}},h.label),
                    React.createElement("div",{style:{fontSize:11,color:"var(--text3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},h.prompt.slice(0,55),"...")
                  ),
                  React.createElement("span",{style:{fontSize:10,color:"var(--text3)",flexShrink:0}},h.time)
                );
              })
            ),
            React.createElement("div",{style:{display:"flex",gap:5,marginBottom:16,background:"var(--surface)",borderRadius:"var(--r-md)",padding:5,border:"1px solid var(--border)"}},
              [{id:"wizard",icon:"+",label:"Build",sub:"8 guided questions"},{id:"improve",icon:"W",label:"Improve",sub:"Upgrade a prompt"},{id:"compare",icon:"=",label:"Compare",sub:"A vs B side by side"}].map(function(m){
                return React.createElement("button",{key:m.id,onClick:function(){ switchMode(m.id); },style:{flex:1,padding:"8px 2px",borderRadius:"var(--r-sm)",border:"none",cursor:"pointer",background:bMode===m.id?"linear-gradient(135deg,var(--indigo),var(--indigo-d))":"transparent",color:bMode===m.id?"#fff":"var(--text2)",fontFamily:"'Plus Jakarta Sans',sans-serif",textAlign:"center",transition:"all 0.18s",boxShadow:bMode===m.id?"0 4px 14px rgba(99,102,241,0.3)":"none"}},
                  React.createElement("div",{style:{fontSize:10,fontWeight:700}},m.label),
                  React.createElement("div",{style:{fontSize:9,opacity:0.7,marginTop:1}},m.sub)
                );
              })
            ),
            bMode==="wizard" && React.createElement("div",{className:"card card-accent"},
              React.createElement("div",{className:"card-title"},React.createElement("div",{className:"icon"},"+"),"Prompt Builder - 8 Building Blocks"),
              React.createElement("div",{className:"card-sub"},"Answer 8 simple questions. We write the expert prompt for you."),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(1),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Role - What expert should AI be?")),
                React.createElement("div",{style:{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.18)",borderRadius:"var(--r-sm)",padding:"10px 13px",marginBottom:10}},
                  React.createElement("div",{style:{fontSize:12,color:"var(--text2)",lineHeight:1.6,marginBottom:8}},"In case you don't find the role or persona you are looking for, or don't know who you want AI to act like - just write what you want to achieve and we will select the role or the team for you."),
                  React.createElement("button",{onClick:function(){ setShowPersonaSuggester(!showPersonaSuggester); setPersonaSuggestion(""); setPersonaTask(""); },style:{fontSize:12,color:"var(--amber)",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:6,padding:"5px 13px",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700}},
                    showPersonaSuggester?"Close":"Help me choose"
                  )
                ),
                showPersonaSuggester && React.createElement("div",{style:{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:"var(--r-md)",padding:14,marginBottom:12}},
                  React.createElement("div",{style:{fontSize:12,fontWeight:700,color:"var(--amber)",marginBottom:8}},"Describe what you want to achieve"),
                  React.createElement("textarea",{value:personaTask,onChange:function(e){ setPersonaTask(e.target.value); },placeholder:"e.g. Write Instagram captions for my jewellery business, plan a product launch...",rows:3,style:{minHeight:70,marginBottom:8,fontSize:12}}),
                  React.createElement("button",{className:"btn btn-primary btn-sm",onClick:suggestPersona,disabled:loadingPersona||!personaTask.trim(),style:{width:"100%",justifyContent:"center"}},
                    loadingPersona?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Finding your best expert..."):"Suggest Best Expert"
                  ),
                  loadingPersona && React.createElement("div",{style:{marginTop:12,padding:"18px 16px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:"var(--r-md)",display:"flex",alignItems:"center",gap:14}},
                    React.createElement("div",{className:"spinner spinner-indigo",style:{width:22,height:22,borderWidth:3,flexShrink:0}}),
                    React.createElement("div",null,
                      React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"var(--indigo-l)",marginBottom:3}},"Analysing your task..."),
                      React.createElement("div",{style:{fontSize:11.5,color:"var(--text3)"}},"Selecting the best expert or team for you")
                    )
                  ),
                  personaSuggestion && (function(){
                    var pm = personaSuggestion.match(/RECOMMENDED PERSONA:\s*([\s\S]*?)(?=WHY THIS WORKS:|$)/i);
                    var wm = personaSuggestion.match(/WHY THIS WORKS:\s*([\s\S]*?)(?=ALTERNATIVE:|$)/i);
                    var am = personaSuggestion.match(/ALTERNATIVE:\s*([\s\S]*?)$/i);
                    var persona = pm?pm[1].trim():""; var why=wm?wm[1].trim():""; var alt=am?am[1].trim():"";
                    return React.createElement("div",{style:{marginTop:12}},
                      React.createElement("div",{style:{background:"var(--bg2)",borderRadius:"var(--r-sm)",padding:12,marginBottom:8}},
                        React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--amber)",marginBottom:6}},"Recommended Expert"),
                        React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:6}},persona),
                        React.createElement("div",{style:{fontSize:12,color:"var(--text2)",lineHeight:1.6,marginBottom:10}},why),
                        React.createElement("button",{className:"btn btn-primary btn-sm",onClick:applyPersonaSuggestion},"Use This Expert")
                      ),
                      alt && React.createElement("div",{style:{background:"var(--surface2)",borderRadius:"var(--r-sm)",padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}},
                        React.createElement("div",null,
                          React.createElement("div",{style:{fontSize:10,fontWeight:700,color:"var(--text3)",marginBottom:3}},"Simpler alternative"),
                          React.createElement("div",{style:{fontSize:12,color:"var(--text2)"}},alt)
                        ),
                        React.createElement("button",{onClick:function(){ setCustomRole(alt); wSet("role","Others"); setShowPersonaSuggester(false); setPersonaTask(""); setPersonaSuggestion(""); },style:{padding:"4px 10px",borderRadius:6,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text2)",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",flexShrink:0}},"Use This")
                      )
                    );
                  })()
                ),
                React.createElement("select",{className:"wiz-select",value:PERSONAS.indexOf(wiz.role)>=0?wiz.role:(wiz.role?"Others":""),onChange:function(e){ var v=e.target.value; if(v==="Others"){wSet("role","Others");}else{wSet("role",v);setCustomRole("");} }},
                  React.createElement("option",{value:"",disabled:true},"Select an expert persona"),
                  React.createElement("optgroup",{label:"Business and Strategy"},PERSONAS.slice(0,10).map(function(p){ return React.createElement("option",{key:p,value:p},p); })),
                  React.createElement("optgroup",{label:"Content and Communication"},PERSONAS.slice(10,20).map(function(p){ return React.createElement("option",{key:p,value:p},p); })),
                  React.createElement("optgroup",{label:"Customer and HR"},PERSONAS.slice(20,30).map(function(p){ return React.createElement("option",{key:p,value:p},p); })),
                  React.createElement("optgroup",{label:"Finance and Legal"},PERSONAS.slice(30,40).map(function(p){ return React.createElement("option",{key:p,value:p},p); })),
                  React.createElement("optgroup",{label:"Education and Personal Growth"},PERSONAS.slice(40,50).map(function(p){ return React.createElement("option",{key:p,value:p},p); })),
                  React.createElement("optgroup",{label:"Other"},React.createElement("option",{value:"Others"},"Others - I will describe my own"))
                ),
                wiz.role && wiz.role!=="Others" && React.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 13px",borderRadius:999,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.35)",fontSize:12,fontWeight:700,color:"var(--indigo-l)"}},
                  wiz.role,React.createElement("span",{style:{cursor:"pointer",opacity:0.7},onClick:function(){ wSet("role",""); }},"x")
                ),
                wiz.role==="Others" && React.createElement("input",{type:"text",value:customRole,onChange:function(e){ setCustomRole(e.target.value); },placeholder:"e.g. Wedding photographer, Astrologer, Cricket coach...",style:{width:"100%",background:"var(--bg2)",border:"1px solid rgba(99,102,241,0.4)",borderRadius:"var(--r-sm)",color:"var(--text)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,padding:"10px 13px",outline:"none",marginTop:8},autoFocus:true})
              ),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(2),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Objective - What exactly do you want AI to do? *")),
                React.createElement("textarea",{value:wiz.objective,onChange:function(e){ wSet("objective",e.target.value); },placeholder:"e.g. Write a 5-slide executive summary for our Q3 board presentation...",rows:3,style:{minHeight:80}})
              ),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(3),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Context - Your situation, business and audience")),
                React.createElement("textarea",{value:wiz.context,onChange:function(e){ wSet("context",e.target.value); },placeholder:"e.g. I am a product manager at a 300-person B2B SaaS company. My audience is the C-suite...",rows:3,style:{minHeight:76}})
              ),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(4),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Tone - How should it sound and feel?")),
                React.createElement("div",{className:"wiz-chip-row"},
                  TONES.map(function(t){ return React.createElement(Chip,{key:t,label:t,sel:wiz.tone===t,selBorder:"rgba(16,185,129,0.5)",selBg:"rgba(16,185,129,0.15)",selColor:"var(--emerald)",onClick:function(){ wSet("tone",wiz.tone===t?"":t); }}); })
                )
              ),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(5),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Format - How should the answer be structured?")),
                React.createElement("div",{className:"wiz-chip-row"},
                  FORMATS.map(function(f){ return React.createElement(Chip,{key:f,label:f,sel:wiz.format===f,selBorder:"rgba(245,158,11,0.5)",selBg:"rgba(245,158,11,0.15)",selColor:"var(--amber)",onClick:function(){ wSet("format",wiz.format===f?"":f); }}); })
                )
              ),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(6),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Constraints - What should AI avoid? (optional)")),
                React.createElement("input",{type:"text",value:wiz.constraints,onChange:function(e){ wSet("constraints",e.target.value); },placeholder:"e.g. No jargon, no passive voice, no bullet points over 5, avoid words like leverage or synergy...",style:{width:"100%",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r-sm)",color:"var(--text)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,padding:"10px 13px",outline:"none"}})
              ),
              React.createElement("div",{style:{marginBottom:16}},
                React.createElement("div",{className:"wiz-row"},numBall(7),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Example - Show AI what good looks like (optional)")),
                React.createElement("textarea",{value:wiz.example,onChange:function(e){ wSet("example",e.target.value); },placeholder:"e.g. Paste a sentence or paragraph that shows the style, tone, or structure you want...",rows:2,style:{minHeight:70}})
              ),
              React.createElement("div",{style:{marginBottom:20}},
                React.createElement("div",{className:"wiz-row"},numBall(8),React.createElement("div",{className:"section-label",style:{marginBottom:0}},"Critique - Ask AI to review its own answer?")),
                React.createElement("div",{style:{display:"flex",gap:8}},
                  [{v:true,label:"Yes - polish before delivering",c:"var(--emerald)",bg:"rgba(16,185,129,0.12)",bc:"rgba(16,185,129,0.4)"},{v:false,label:"No - use first answer",c:"var(--text2)",bg:"var(--surface2)",bc:"var(--border)"}].map(function(opt){
                    return React.createElement("button",{key:String(opt.v),onClick:function(){ wSet("critique",opt.v); },style:{flex:1,padding:"9px 8px",borderRadius:"var(--r-sm)",border:"1px solid "+(wiz.critique===opt.v?opt.bc:"var(--border)"),background:wiz.critique===opt.v?opt.bg:"transparent",color:wiz.critique===opt.v?opt.c:"var(--text3)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.15s",textAlign:"center"}},opt.label);
                  })
                )
              ),
              React.createElement("div",{className:"btn-row"},
                React.createElement("button",{className:"btn btn-primary",onClick:runWizard,disabled:loadingWiz||!wiz.objective.trim()},
                  loadingWiz?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Building..."):"Build My Prompt"
                ),
                wiz.objective && React.createElement("button",{className:"btn btn-ghost",onClick:resetWiz},"Reset")
              ),
              wizOut && React.createElement("div",{className:"output-block",style:{marginTop:16}},
                React.createElement("div",{className:"output-header"},
                  React.createElement("div",{className:"output-label"},"Your Ready-to-Use Prompt"),
                  React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},
                    React.createElement(CopyBtn,{text:wizOut,label:"Copy Prompt"}),
                    React.createElement("button",{onClick:function(){ savePrompt("My Prompt - "+new Date().toLocaleDateString("en-IN"), wizOut); },style:{padding:"5px 12px",borderRadius:6,border:"1px solid rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.08)",color:"var(--emerald)",fontSize:11.5,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Save")
                  )
                ),
                wizOut
              )
            ),

            bMode==="improve" && React.createElement("div",{className:"card card-accent"},
              React.createElement("div",{className:"card-title"},React.createElement("div",{className:"icon"},"W"),"Improve My Prompt"),
              React.createElement("div",{className:"card-sub"},"Share a rough idea - we improve it, run it, and show you the real AI output."),
              React.createElement("div",{className:"section-label"},"Your prompt idea"),
              React.createElement("textarea",{value:bInput,onChange:function(e){ setBInput(e.target.value); },placeholder:"Paste your rough idea here - even 3 words is enough. Try: 'Help me write an email to my manager'",rows:4}),
              React.createElement("div",{className:"btn-row"},
                React.createElement("button",{className:"btn btn-primary",onClick:runBuilder,disabled:loadingB||!bInput.trim()},
                  loadingB?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Improving..."):"Improve My Prompt"
                ),
                bInput && React.createElement("button",{className:"btn btn-ghost",onClick:function(){ setBInput(""); setBOutput(""); setBAnswer(""); }},"Clear")
              ),
              bOutput && (function(){
                var imp = extractImp(bOutput);
                var misMatch = bOutput.match(/WHAT WAS MISSING:\s*([\s\S]*?)(?=WHY ITS BETTER:|$)/i);
                var whyMatch = bOutput.match(/WHY ITS BETTER:\s*([\s\S]*?)$/i);
                var mis = misMatch?misMatch[1].trim():""; var why=whyMatch?whyMatch[1].trim():"";
                return React.createElement("div",{style:{marginTop:14}},
                  versions.length>0 && React.createElement("div",{style:{marginBottom:12,padding:"10px 13px",background:"var(--surface2)",borderRadius:"var(--r-sm)",border:"1px solid var(--border)"}},
                    React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--text3)",marginBottom:7}},"Version History"),
                    React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},
                      versions.map(function(v,vi){
                        return React.createElement("button",{key:v.v,onClick:function(){ setActiveVersion(vi); setBInput(v.prompt); },className:"version-tag"+(activeVersion===vi?" active":"")},"V"+v.v+" - "+v.time);
                      })
                    )
                  ),
                  React.createElement("div",{style:{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r-md)",padding:16,marginBottom:12}},
                    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,paddingBottom:12,borderBottom:"1px solid var(--border)",flexWrap:"wrap",gap:8}},
                      React.createElement("span",{style:{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"var(--indigo-l)"}},"Improved Prompt"),
                      React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},
                        React.createElement(CopyBtn,{text:imp,label:"Copy Prompt"}),
                        React.createElement("button",{onClick:function(){ savePrompt("Improved - "+bInput.slice(0,30), imp); },style:{padding:"5px 12px",borderRadius:6,border:"1px solid rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.08)",color:"var(--emerald)",fontSize:11.5,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Save")
                      )
                    ),
                    React.createElement("div",{style:{fontSize:13,lineHeight:1.8,color:"var(--text2)",whiteSpace:"pre-wrap",wordBreak:"break-word"}},imp),
                    React.createElement("div",{style:{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}},
                      React.createElement("button",{className:"apply-btn",onClick:function(){ setBInput(imp); runBuilder(); }},"Refine Further"),
                      React.createElement("button",{className:"apply-btn",style:{background:"rgba(99,102,241,0.1)",borderColor:"rgba(99,102,241,0.3)",color:"var(--indigo-l)"},onClick:function(){ setCmpA(bInput); setCmpB(imp); switchMode("compare"); }},"Compare Original vs Improved")
                    )
                  ),
                  bAnswer && React.createElement("div",{style:{background:"rgba(16,185,129,0.05)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:"var(--r-md)",padding:16,marginBottom:12}},
                    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,paddingBottom:12,borderBottom:"1px solid rgba(16,185,129,0.15)",flexWrap:"wrap",gap:8}},
                      React.createElement("span",{style:{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"var(--emerald)"}},"AI Answer"),
                      React.createElement(CopyBtn,{text:bAnswer,label:"Copy Answer"})
                    ),
                    React.createElement("div",{style:{fontSize:13,lineHeight:1.8,color:"var(--text2)",whiteSpace:"pre-wrap",wordBreak:"break-word"}},bAnswer)
                  ),
                  mis && React.createElement("div",{style:{background:"rgba(244,63,94,0.05)",border:"1px solid rgba(244,63,94,0.18)",borderRadius:"var(--r-md)",padding:14,marginBottom:12}},
                    React.createElement("div",{style:{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"var(--rose)",marginBottom:10}},"What was Missing"),
                    React.createElement("div",{style:{fontSize:13,lineHeight:1.8,color:"var(--text2)",whiteSpace:"pre-wrap"}},mis)
                  ),
                  why && React.createElement("div",{style:{background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.18)",borderRadius:"var(--r-md)",padding:14}},
                    React.createElement("div",{style:{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"var(--indigo-l)",marginBottom:10}},"Why it is Better"),
                    React.createElement("div",{style:{fontSize:13,lineHeight:1.8,color:"var(--text2)",whiteSpace:"pre-wrap"}},why)
                  )
                );
              })()
            ),

            bMode==="compare" && React.createElement("div",{className:"card card-accent"},
              React.createElement("div",{className:"card-title"},React.createElement("div",{className:"icon"},"="),"Compare Mode"),
              React.createElement("div",{className:"card-sub"},"Write two prompts for the same task. Run both. See which wins."),
              React.createElement("div",{style:{display:"flex",gap:8,marginBottom:16}},
                React.createElement("button",{className:"btn btn-ghost btn-sm",onClick:function(){ if(cmpA.trim()) setCmpB(cmpA); }},"Copy A to B"),
                React.createElement("button",{className:"btn btn-ghost btn-sm",onClick:function(){ setCmpA(""); setCmpB(""); setCmpOutA(""); setCmpOutB(""); }},"Clear All"),
                React.createElement("button",{className:"btn btn-primary btn-sm",onClick:runBothCompare,disabled:(!cmpA.trim()&&!cmpB.trim())||loadingCmpA||loadingCmpB},
                  (loadingCmpA||loadingCmpB)?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Running..."):"Run Both"
                )
              ),
              React.createElement("div",{style:{display:"flex",gap:8,marginBottom:8}},
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--indigo-l)",marginBottom:6}},"Prompt A"),
                  React.createElement("textarea",{value:cmpA,onChange:function(e){ setCmpA(e.target.value); },placeholder:"Write your first prompt here...",rows:5,style:{minHeight:100}}),
                  React.createElement("div",{style:{marginTop:6,display:"flex",gap:6}},
                    React.createElement("button",{className:"btn btn-primary btn-sm",onClick:function(){ runCompare("A"); },disabled:loadingCmpA||!cmpA.trim()},
                      loadingCmpA?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Running A..."):"Run A"
                    ),
                    cmpA&&React.createElement(CopyBtn,{text:cmpA,label:"Copy A"})
                  )
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--emerald)",marginBottom:6}},"Prompt B"),
                  React.createElement("textarea",{value:cmpB,onChange:function(e){ setCmpB(e.target.value); },placeholder:"Write your second prompt here...",rows:5,style:{minHeight:100}}),
                  React.createElement("div",{style:{marginTop:6,display:"flex",gap:6}},
                    React.createElement("button",{className:"btn btn-primary btn-sm",onClick:function(){ runCompare("B"); },disabled:loadingCmpB||!cmpB.trim()},
                      loadingCmpB?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Running B..."):"Run B"
                    ),
                    cmpB&&React.createElement(CopyBtn,{text:cmpB,label:"Copy B"})
                  )
                )
              ),
              (cmpOutA||cmpOutB||loadingCmpA||loadingCmpB) && React.createElement("div",null,
                React.createElement("div",{style:{height:1,background:"var(--border)",margin:"16px 0"}}),
                React.createElement("div",{style:{display:"flex",gap:8}},
                  React.createElement("div",{style:{flex:1,background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:"var(--r-md)",padding:12}},
                    React.createElement("div",{style:{fontSize:10,fontWeight:800,textTransform:"uppercase",color:"var(--indigo-l)",marginBottom:8}},"Output A"),
                    loadingCmpA?React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,color:"var(--text2)",fontSize:12}},React.createElement("div",{className:"spinner spinner-indigo"}),"Generating..."):
                    React.createElement("div",{style:{fontSize:12,color:"var(--text2)",lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-word"}},cmpOutA||"Run Prompt A to see output"),
                    cmpOutA&&React.createElement("div",{style:{marginTop:8}},React.createElement(CopyBtn,{text:cmpOutA,label:"Copy"}))
                  ),
                  React.createElement("div",{style:{flex:1,background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:"var(--r-md)",padding:12}},
                    React.createElement("div",{style:{fontSize:10,fontWeight:800,textTransform:"uppercase",color:"var(--emerald)",marginBottom:8}},"Output B"),
                    loadingCmpB?React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,color:"var(--text2)",fontSize:12}},React.createElement("div",{className:"spinner",style:{borderColor:"rgba(16,185,129,0.2)",borderTopColor:"var(--emerald)"}}),"Generating..."):
                    React.createElement("div",{style:{fontSize:12,color:"var(--text2)",lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-word"}},cmpOutB||"Run Prompt B to see output"),
                    cmpOutB&&React.createElement("div",{style:{marginTop:8}},React.createElement(CopyBtn,{text:cmpOutB,label:"Copy"}))
                  )
                )
              )
            )
          ),

          tab==="guide" && React.createElement("div", null,
            React.createElement("div",{className:"hero"},
              React.createElement("h1",null,"You Don't Need to Be Technical. You Need the Right Framework."),
              React.createElement("p",null,"Learn the 8 building blocks of a great prompt in plain English. Each lesson takes under 5 minutes.")
            ),
            React.createElement("div",{onClick:function(){ window.open("https://youtu.be/ezmuCprlTVE","_blank"); },style:{marginBottom:18,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r-lg)",overflow:"hidden",boxShadow:"var(--shadow-card)",cursor:"pointer"}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"13px 16px",borderBottom:"1px solid var(--border)"}},
                React.createElement("div",{style:{width:28,height:28,borderRadius:8,background:"rgba(244,63,94,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},
                  React.createElement("div",{style:{width:0,height:0,borderTop:"6px solid transparent",borderBottom:"6px solid transparent",borderLeft:"10px solid var(--rose)",marginLeft:2}})
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"var(--text)"}},"Watch the Quick Guide"),
                  React.createElement("div",{style:{fontSize:11,color:"var(--text3)"}},"A quick walkthrough of how PromptCoach works")
                )
              ),
              React.createElement("div",{style:{position:"relative",width:"100%",paddingBottom:"26%",height:0,background:"linear-gradient(135deg,#0b0f1d,#111a2e)"}},
                React.createElement("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14}},
                  React.createElement("div",{style:{width:68,height:68,borderRadius:"50%",background:"var(--rose)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 30px rgba(244,63,94,0.4)",transition:"transform 0.2s"}},
                    React.createElement("div",{style:{width:0,height:0,borderTop:"13px solid transparent",borderBottom:"13px solid transparent",borderLeft:"22px solid #fff",marginLeft:5}})
                  ),
                  React.createElement("div",{style:{fontSize:12,fontWeight:600,color:"var(--text2)",letterSpacing:"0.3px"}},"Tap to watch on YouTube")
                ),
                React.createElement("div",{style:{position:"absolute",top:10,right:12,fontSize:9,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--text3)",background:"rgba(0,0,0,0.4)",padding:"3px 8px",borderRadius:5}},"Video Guide")
              )
            ),
            LESSONS.map(function(lesson){
              var isOpen = openLesson===lesson.num;
              return React.createElement("div",{key:lesson.num,className:"lesson-block",style:{borderColor:isOpen?lesson.bc:"var(--border)"},onClick:function(){ setOpenLesson(isOpen?null:lesson.num); }},
                React.createElement("div",{className:"lesson-header"},
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,minWidth:0}},
                    React.createElement("div",{className:"lesson-icon",style:{background:lesson.bg}},lesson.emoji),
                    React.createElement("div",{style:{minWidth:0}},
                      React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:lesson.tc,marginBottom:2}},"Lesson "+lesson.num),
                      React.createElement("div",{style:{fontWeight:700,fontSize:14,color:"var(--text)",marginBottom:2}},lesson.label),
                      React.createElement("div",{style:{fontSize:11.5,color:"var(--text3)"}},lesson.sub)
                    )
                  ),
                  React.createElement("div",{style:{fontSize:14,color:"var(--text3)",flexShrink:0,transition:"transform 0.2s",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}},"v")
                ),
                isOpen && React.createElement("div",{className:"lesson-body",onClick:function(e){ e.stopPropagation(); }},
                  lesson.num===1 && React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:13,color:"var(--text2)",lineHeight:1.65,marginBottom:14}},"Every powerful prompt is built from the same 8 blocks. Tap each to expand."),
                    ELEMENTS.map(function(el,i){
                      return React.createElement("div",{key:i,className:"el-card"+(openEl===i?" open":""),onClick:function(e){ e.stopPropagation(); setOpenEl(openEl===i?null:i); }},
                        React.createElement("div",{className:"el-header"},
                          React.createElement("div",{className:"el-left"},
                            React.createElement("div",{className:"el-emoji",style:{background:el.color}},el.emoji),
                            React.createElement("div",null,React.createElement("div",{className:"el-name"},el.name),React.createElement("div",{className:"el-def"},el.def))
                          ),
                          React.createElement("div",{className:"el-chevron"},"v")
                        ),
                        openEl===i && React.createElement("div",{className:"el-body"},
                          React.createElement("strong",null,"Why it matters:"), " ",el.why,
                          React.createElement("div",{style:{marginTop:12}},React.createElement("span",{className:"tag tag-weak"},"Without it"),React.createElement("div",{className:"code-block",style:{borderLeft:"2px solid var(--rose)"}},el.weak)),
                          React.createElement("div",{style:{marginTop:10}},React.createElement("span",{className:"tag tag-good"},"With it"),React.createElement("div",{className:"code-block",style:{borderLeft:"2px solid var(--emerald)"}},el.strong)),
                          React.createElement("div",{className:"check-box"},React.createElement("span",{className:"tag tag-tip",style:{marginBottom:0,marginRight:8}},"Self-check"),el.check)
                        )
                      );
                    }),
                    React.createElement("div",{style:{marginTop:16,padding:"14px 16px",background:"linear-gradient(135deg,rgba(16,185,129,0.1),rgba(99,102,241,0.06))",border:"1px solid rgba(16,185,129,0.25)",borderRadius:"var(--r-md)",textAlign:"center"}},
                      React.createElement("div",{style:{fontSize:18,marginBottom:6}},"(!)"),
                      React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"var(--emerald)",marginBottom:4}},"You just learned the most important framework in AI."),
                      React.createElement("div",{style:{fontSize:12,color:"var(--text2)",marginBottom:10}},"6 lessons left - each one builds on this foundation."),
                      React.createElement("div",{style:{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}},
                        React.createElement("button",{onClick:function(){ setTab("builder"); switchMode("wizard"); },style:{padding:"8px 18px",borderRadius:"var(--r-sm)",border:"none",background:"linear-gradient(135deg,var(--emerald),#059669)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Try it in Build Mode"),
                        React.createElement("button",{onClick:function(){ window.open("https://tally.so/r/rjvEep","_blank"); },style:{padding:"8px 18px",borderRadius:"var(--r-sm)",border:"1px solid rgba(99,102,241,0.4)",background:"rgba(99,102,241,0.1)",color:"var(--indigo-l)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Get Pro Updates")
                      )
                    )
                  ),
                  lesson.num===2 && React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:13,color:"var(--text2)",lineHeight:1.65,marginBottom:14}},"This is what a fully built prompt looks like - every block filled in for a real business scenario."),
                    FORMULA_ROWS.map(function(row){
                      return React.createElement("div",{key:row.n,style:{display:"flex",gap:12,padding:"11px 0",borderBottom:row.n<8?"1px solid var(--border)":"none",alignItems:"flex-start"}},
                        React.createElement("div",{style:{width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,var(--indigo),var(--indigo-d))",color:"#fff",fontWeight:800,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}},row.n),
                        React.createElement("div",{style:{minWidth:0}},
                          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:3}},
                            React.createElement("span",{style:{fontSize:11,fontWeight:800,letterSpacing:"0.8px",color:"var(--indigo-l)"}},row.label),
                            React.createElement("span",{style:{fontSize:11,color:"var(--text3)"}},row.hint)
                          ),
                          React.createElement("div",{style:{fontSize:12,color:"var(--text2)",background:"var(--bg2)",borderRadius:6,padding:"7px 10px",fontFamily:"'JetBrains Mono',monospace",lineHeight:1.6,wordBreak:"break-word"}},row.eg)
                        )
                      );
                    }),
                    React.createElement("div",{style:{marginTop:14}},React.createElement(CopyBtn,{text:"THE MASTER FORMULA\n1. ROLE - You are a [expert].\n2. OBJECTIVE - Write/Create [specific task].\n3. CONTEXT - My situation: [describe].\n4. TONE - Sound [tone].\n5. FORMAT - [length, structure].\n6. CONSTRAINTS - Avoid: [list].\n7. EXAMPLE - Style: [your example].\n8. CRITIQUE - Re-read and fix. Final version only.",label:"Copy Full Formula"}))
                  ),
                  lesson.num===3 && React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:13,color:"var(--text2)",lineHeight:1.65,marginBottom:14}},"Start rough and add one block at a time. Each step makes your prompt meaningfully better."),
                    [["Write","Get your rough idea out first"],["Add Role","You are a [expert] at the very start"],["Add Objective","State exactly what you want - specific and clear"],["Add Context","Your business, your customers, the situation"],["Add Tone","Friendly / formal / direct"],["Add Format","Bullets, numbered list, word count"],["Add Constraints","What to avoid: jargon, passive voice"]].map(function(item,i){
                      return React.createElement("div",{key:i,style:{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<6?"1px solid var(--border)":"none"}},
                        React.createElement("div",{style:{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,var(--indigo),var(--indigo-d))",color:"#fff",fontWeight:800,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},i+1),
                        React.createElement("div",{style:{fontSize:13}},React.createElement("strong",{style:{color:"var(--text)"}},item[0]),React.createElement("span",{style:{color:"var(--text2)"}}," - "+item[1]))
                      );
                    })
                  ),
                  lesson.num===4 && React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:13,color:"var(--text2)",lineHeight:1.65,marginBottom:14}},"Add any of these lines to your prompt and the quality jumps immediately."),
                    [{move:"Think step by step",when:"Decisions, analysis, planning",why:"Forces AI to reason carefully before answering.",use:"Think step by step before giving your final answer."},
                     {move:"Give me 3 versions",when:"Emails, proposals, presentations",why:"You get options - the 2nd or 3rd version is almost always sharper.",use:"Give me 3 versions: one concise for a busy executive, one detailed for a technical team, one persuasive for a client pitch."},
                     {move:"Explain your reasoning",when:"Advice, recommendations, strategy",why:"Makes AI show its thinking so you can challenge it.",use:"After your answer, briefly explain why you made these choices."}].map(function(pm,i){
                      return React.createElement("div",{key:i,style:{padding:"14px 0",borderBottom:i<2?"1px solid var(--border)":"none"}},
                        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},
                          React.createElement("div",{style:{width:20,height:20,borderRadius:6,background:"rgba(16,185,129,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"var(--emerald)",flexShrink:0}},i+1),
                          React.createElement("span",{style:{fontWeight:700,fontSize:13.5,color:"var(--text)"}},pm.move)
                        ),
                        React.createElement("div",{style:{fontSize:12,color:"var(--text2)",marginBottom:5,lineHeight:1.55}},pm.why),
                        React.createElement("div",{style:{fontSize:11,color:"var(--text3)",marginBottom:8}},"Best for: "+pm.when),
                        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,background:"var(--bg2)",borderRadius:7,padding:"8px 11px"}},
                          React.createElement("span",{style:{fontSize:12,color:"var(--emerald)",fontFamily:"'JetBrains Mono',monospace",flex:1,wordBreak:"break-word"}},pm.use),
                          React.createElement(CopyBtn,{text:pm.use,label:"Copy"})
                        )
                      );
                    })
                  ),
                  lesson.num===5 && React.createElement("div",null,
                    [["One prompt, one goal","Never ask for 5 things at once. Split complex tasks into separate prompts."],["Longer is not better","A focused 3-line prompt beats a rambling 10-liner. Clarity wins."],["Your first prompt is a draft","Always follow up. Refine, redirect, or ask for 3 variations."],["Context is your superpower","The more AI knows about your world, the more relevant its answer."],["Save what works","When a prompt gives great results, save it as your personal template."]].map(function(item,i){
                      return React.createElement("div",{key:i,style:{display:"flex",gap:12,padding:"12px 0",borderBottom:i<4?"1px solid var(--border)":"none"}},
                        React.createElement("div",{style:{width:22,height:22,borderRadius:6,background:"rgba(245,158,11,0.15)",color:"var(--amber)",fontWeight:800,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}},i+1),
                        React.createElement("div",null,React.createElement("div",{style:{fontWeight:700,fontSize:13,color:"var(--text)",marginBottom:3}},item[0]),React.createElement("div",{style:{fontSize:12,color:"var(--text2)",lineHeight:1.55}},item[1]))
                      );
                    })
                  ),
                  lesson.num===6 && React.createElement("div",null,
                    MISTAKES.map(function(m,i){
                      return React.createElement("div",{key:i,className:"mistake-row"},
                        React.createElement("div",{className:"mistake-icon"},m.icon),
                        React.createElement("div",{style:{minWidth:0}},
                          React.createElement("div",{className:"mistake-title"},m.name),
                          React.createElement("div",{className:"mistake-bad"},"Bad: ",m.bad),
                          React.createElement("div",{className:"mistake-good"},"Good: ",m.good)
                        )
                      );
                    })
                  ),
                  lesson.num===7 && React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:13,color:"var(--text2)",lineHeight:1.65,marginBottom:14}},"Same task. One prompt gets a useless answer. One gets a result you can actually use."),
                    [{task:"Write a performance review",
                      bad:"Help me write a performance review.",
                      good:"You are an experienced people manager at a mid-size technology company.\nWrite a structured annual performance review for a senior software engineer who exceeded targets this year.\nContext: The engineer delivered 3 major features on time, mentored 2 junior developers, but needs to improve documentation.\nTone: Professional, balanced, growth-focused.\nFormat: 4 sections - Key Achievements, Areas of Strength, Development Areas, Goals for Next Year. Each 3-4 sentences.\nAvoid: Vague language, generic praise, no specific examples.\nAfter writing, check: Is every point specific enough? Fix if not.",
                      blocks:["Role","Objective","Context","Tone","Format","Constraints","Critique"]},
                     {task:"Prepare for a salary negotiation",
                      bad:"Help me negotiate my salary.",
                      good:"You are an executive career coach specialising in compensation negotiation.\nHelp me prepare for a salary negotiation for a promotion from Senior Manager to Director.\nContext: I have been in the role 3 years, led a team of 12, delivered a project saving the company Rs 40 lakhs, and market rate for Director is 20% above my current salary.\nTone: Confident, collaborative, evidence-based.\nFormat: A 5-point script with opening, value evidence, market data, the ask, and response to pushback.\nAvoid: Emotional appeals, vague contributions, giving a range instead of a number.\nAfter writing, review: Is every point backed by a fact? Fix weak points.",
                      blocks:["Role","Objective","Context","Tone","Format","Constraints","Critique"]},
                     {task:"Write a stakeholder update email",
                      bad:"Write a project update email for my stakeholders.",
                      good:"You are a senior project manager at a consulting firm.\nWrite a concise stakeholder update email for a digital transformation project that is 2 weeks behind schedule.\nContext: Delay is due to a vendor missing a delivery. Stakeholders include the CFO, CTO, and two external partners. They expect directness and solutions.\nTone: Transparent, accountable, solution-focused. Senior executive level.\nFormat: Subject line, 3 paragraphs - current status, root cause, recovery plan with revised timeline.\nAvoid: Burying the delay, passive voice, vague recovery plans.\nAfter writing, check: Will the CFO know the issue and solution within 10 seconds?",
                      blocks:["Role","Objective","Context","Tone","Format","Constraints","Critique"]}].map(function(ex,idx){
                      return React.createElement("div",{key:idx,style:{marginBottom:14,background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r-md)",overflow:"hidden"}},
                        React.createElement("div",{style:{padding:"10px 14px",borderBottom:"1px solid var(--border)",background:"var(--surface)"}},React.createElement("span",{style:{fontSize:13,fontWeight:700,color:"var(--text)"}},ex.task)),
                        React.createElement("div",{style:{padding:"12px 14px",borderBottom:"1px solid var(--border)",background:"rgba(244,63,94,0.04)"}},
                          React.createElement("div",{style:{fontSize:10,fontWeight:800,textTransform:"uppercase",color:"var(--rose)",marginBottom:7}},"What most people write"),
                          React.createElement("div",{style:{fontSize:13,color:"rgba(244,63,94,0.85)",fontFamily:"'JetBrains Mono',monospace",padding:"9px 12px",background:"rgba(244,63,94,0.07)",borderRadius:"var(--r-sm)"}},ex.bad)
                        ),
                        React.createElement("div",{style:{padding:"12px 14px",background:"rgba(16,185,129,0.04)"}},
                          React.createElement("div",{style:{fontSize:10,fontWeight:800,textTransform:"uppercase",color:"var(--emerald)",marginBottom:7}},"What Prompt Coach builds"),
                          React.createElement("div",{style:{fontSize:12,color:"var(--text2)",fontFamily:"'JetBrains Mono',monospace",lineHeight:1.8,padding:"9px 12px",background:"rgba(16,185,129,0.07)",borderRadius:"var(--r-sm)",whiteSpace:"pre-wrap",wordBreak:"break-word"}},ex.good),
                          React.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:5,marginTop:10}},
                            ex.blocks.map(function(b){ return React.createElement("span",{key:b,style:{padding:"2px 9px",borderRadius:999,fontSize:10,fontWeight:700,background:"rgba(16,185,129,0.12)",color:"var(--emerald)"}},b); })
                          ),
                          React.createElement("div",{style:{marginTop:10,display:"flex",justifyContent:"flex-end"}},React.createElement(CopyBtn,{text:ex.good,label:"Copy This Prompt"}))
                        )
                      );
                    })
                  )
                )
              );
            }),
            React.createElement("div",{style:{textAlign:"center",marginTop:18,paddingBottom:8}},React.createElement(CopyBtn,{text:"PROMPT COACH - THE 8 BUILDING BLOCKS:\n1. Role\n2. Objective\n3. Context\n4. Tone\n5. Format\n6. Constraints\n7. Example\n8. Critique",label:"Copy Complete Guide"}))
          ),

          tab==="library" && React.createElement("div", null,
            React.createElement("div",{className:"hero"},
              React.createElement("h1",null,"Borrowed From Experts. Ready for Your World."),
              React.createElement("p",null,"Pick from ready-made prompts across real-life needs. Use them as-is or tweak them to fit your situation.")
            ),
            React.createElement("div",{className:"promo-banner"},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8}},
                React.createElement("div",null,
                  React.createElement("div",{style:{fontSize:13,fontWeight:800,color:"var(--amber)"}},"Prompt Coach Pro - Coming Soon"),
                  React.createElement("div",{style:{fontSize:11.5,color:"var(--text2)",marginTop:2}},"500+ premium prompts, AI generator, team sharing, and advanced templates.")
                )
              ),
              React.createElement("div",{style:{fontSize:11,color:"var(--text3)",marginBottom:12}},"Currently free while in beta. Pro plan launching at Rs 199/month."),
              React.createElement("button",{onClick:function(){ window.open("https://tally.so/r/rjvEep","_blank"); },style:{width:"100%",padding:"11px 16px",borderRadius:"var(--r-sm)",border:"none",background:"linear-gradient(135deg,var(--amber),#d97706)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:"0 4px 14px rgba(245,158,11,0.3)"}},"Join the Waitlist - Get Early Access")
            ),
            saved.length>0 && React.createElement("div",{style:{marginBottom:14}},
              React.createElement("button",{onClick:function(){ setShowSaved(!showSaved); },style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:"var(--r-md)",padding:"12px 16px",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.15s"}},
                React.createElement("div",{style:{flex:1,textAlign:"left"}},
                  React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"var(--emerald)"}},"My Saved Prompts ("+saved.length+")"),
                  React.createElement("div",{style:{fontSize:11,color:"var(--text3)",marginTop:2}},"Tap to "+(showSaved?"hide":"view")+" your saved prompts")
                ),
                React.createElement("span",{style:{fontSize:14,color:"var(--text3)"}},"v")
              ),
              showSaved && React.createElement("div",{style:{marginTop:8}},
                saved.map(function(s){
                  return React.createElement("div",{key:s.id,className:"lib-prompt-card",style:{borderLeft:"2px solid var(--emerald)"}},
                    React.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:6}},
                      React.createElement("div",null,
                        React.createElement("div",{className:"lib-prompt-title"},s.title),
                        React.createElement("div",{style:{fontSize:10,color:"var(--text3)"}},"Saved on "+s.date)
                      ),
                      React.createElement("button",{onClick:function(){ deleteSaved(s.id); },style:{background:"rgba(244,63,94,0.1)",border:"1px solid rgba(244,63,94,0.2)",borderRadius:6,color:"var(--rose)",fontSize:11,fontWeight:700,padding:"3px 8px",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",flexShrink:0}},"Remove")
                    ),
                    React.createElement("div",{className:"lib-prompt-preview"},s.prompt),
                    React.createElement("div",{className:"lib-actions"},React.createElement(CopyBtn,{text:s.prompt,label:"Copy Prompt"}))
                  );
                })
              )
            ),
            React.createElement("input",{type:"text",value:libSearch,onChange:function(e){ setLibSearch(e.target.value); },placeholder:"Search prompts...",style:{width:"100%",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r-md)",color:"var(--text)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,padding:"11px 15px",outline:"none",marginBottom:14}}),
            React.createElement("div",{className:"lib-cat-row"},
              React.createElement("button",{className:"lib-cat-btn"+(libCat===-1?" sel":""),onClick:function(){ setLibCat(-1); }},"All"),
              PROMPT_LIBRARY.map(function(cat,i){
                return React.createElement("button",{key:i,className:"lib-cat-btn"+(libCat===i?" sel":""),onClick:function(){ setLibCat(i); },style:{borderColor:libCat===i?cat.tc:"var(--border)",color:libCat===i?cat.tc:"var(--text2)",background:libCat===i?cat.color:"var(--surface2)"}},cat.cat);
              })
            ),
            PROMPT_LIBRARY.filter(function(cat,i){ return libCat===-1||libCat===i; }).map(function(cat,ci){
              var filtered = cat.prompts.filter(function(p){
                if (!libSearch.trim()) return true;
                var q = libSearch.toLowerCase();
                return p.title.toLowerCase().indexOf(q)>=0 || p.prompt.toLowerCase().indexOf(q)>=0;
              });
              if (filtered.length===0) return null;
              return React.createElement("div",{key:ci,style:{marginBottom:20}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10}},
                  React.createElement("div",{style:{height:1,flex:1,background:"var(--border)"}}),
                  React.createElement("span",{style:{fontSize:11,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:cat.tc,padding:"2px 10px",borderRadius:999,background:cat.color}},cat.cat),
                  React.createElement("div",{style:{height:1,flex:1,background:"var(--border)"}})
                ),
                filtered.map(function(p,pi){
                  var isSaved = saved.some(function(s){ return s.prompt===p.prompt; });
                  var isLearning = learnThis && learnThis.title===p.title && learnThis.prompt===p.prompt;
                  return React.createElement("div",{key:pi,className:"lib-prompt-card"},
                    React.createElement("div",{className:"lib-prompt-title"},p.title),
                    React.createElement("div",{className:"lib-prompt-preview"},p.prompt),
                    React.createElement("div",{className:"lib-actions"},
                      React.createElement(CopyBtn,{text:p.prompt,label:"Copy Prompt"}),
                      !isSaved?React.createElement("button",{onClick:function(){ savePrompt(p.title,p.prompt); },style:{padding:"5px 12px",borderRadius:6,border:"1px solid rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.08)",color:"var(--emerald)",fontSize:11.5,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Save"):React.createElement("span",{style:{padding:"5px 10px",borderRadius:6,border:"1px solid rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.08)",color:"var(--emerald)",fontSize:11,fontWeight:700}},"Saved"),
                      React.createElement("button",{onClick:function(){ isLearning?setLearnThis(null):getLearnThis(p.title,p.prompt); },style:{padding:"5px 12px",borderRadius:6,border:"1px solid rgba(245,158,11,0.35)",background:isLearning?"rgba(245,158,11,0.15)":"rgba(245,158,11,0.08)",color:"var(--amber)",fontSize:11.5,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},isLearning?"Hide":"Why This Works")
                    ),
                    isLearning && React.createElement("div",{style:{marginTop:12}},
                      learnThis.loading?React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:"var(--r-sm)",fontSize:13,color:"var(--text2)"}},React.createElement("div",{className:"spinner",style:{borderColor:"rgba(245,158,11,0.2)",borderTopColor:"var(--amber)"}}),React.createElement("span",null,"Analysing the 8 building blocks...")):
                      (function(){
                        var bd = learnThis.breakdown;
                        var BLOCKS = ["Role","Objective","Context","Tone","Format","Constraints","Example","Critique"];
                        var bm = bd.match(/BLOCKS USED:\s*([\s\S]*?)(?=KEY LESSON:|$)/i);
                        var lm = bd.match(/KEY LESSON:\s*([\s\S]*?)(?=TRY IT YOURSELF:|$)/i);
                        var tm = bd.match(/TRY IT YOURSELF:\s*([\s\S]*?)$/i);
                        var blocksText = bm?bm[1].trim():""; var lesson2=lm?lm[1].trim():""; var tryIt=tm?tm[1].trim():"";
                        return React.createElement("div",{style:{background:"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:"var(--r-md)",padding:14}},
                          React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--amber)",marginBottom:12}},"8-Block Breakdown"),
                          BLOCKS.map(function(block){
                            var pattern = new RegExp(block+":\\s*([^\\n]+)","i");
                            var m2 = blocksText.match(pattern);
                            var text2 = m2?m2[1].trim():"";
                            if (!text2) return null;
                            var isPresent = !text2.toLowerCase().startsWith("not used");
                            return React.createElement("div",{key:block,style:{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}},
                              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:5,flexShrink:0,width:90}},
                                React.createElement("span",{style:{fontSize:11,fontWeight:800,color:isPresent?"var(--emerald)":"var(--text3)"}},isPresent?"v":"-"),
                                React.createElement("span",{style:{fontSize:11,fontWeight:700,color:isPresent?"var(--emerald)":"var(--text3)"}},block)
                              ),
                              React.createElement("div",{style:{fontSize:12,color:isPresent?"var(--text2)":"var(--text3)",lineHeight:1.5,flex:1}},text2)
                            );
                          }),
                          lesson2 && React.createElement("div",{style:{marginTop:12,padding:"10px 13px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:"var(--r-sm)"}},
                            React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--indigo-l)",marginBottom:5}},"Key Lesson"),
                            React.createElement("div",{style:{fontSize:12.5,color:"var(--text2)",lineHeight:1.6}},lesson2)
                          ),
                          tryIt && React.createElement("div",{style:{marginTop:10,padding:"10px 13px",background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:"var(--r-sm)"}},
                            React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--emerald)",marginBottom:5}},"Try It Yourself"),
                            React.createElement("div",{style:{fontSize:12.5,color:"var(--text2)",lineHeight:1.6}},tryIt),
                            React.createElement("button",{onClick:function(){ setTab("builder"); switchMode("improve"); setBInput(p.prompt); },style:{marginTop:8,padding:"6px 14px",borderRadius:6,border:"1px solid rgba(16,185,129,0.3)",background:"rgba(16,185,129,0.1)",color:"var(--emerald)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Open in Builder")
                          )
                        );
                      })()
                    )
                  );
                })
              );
            })
          ),

          tab==="practice" && React.createElement("div", null,
            React.createElement("div",{className:"hero"},
              React.createElement("h1",null,"Every Attempt Makes the Next One Better."),
              React.createElement("p",null,"Try real-world scenarios and get honest feedback on your prompts. No jargon - just clear guidance.")
            ),
            practiceCount>0 && React.createElement("div",{className:"session-bar"},
              React.createElement("div",{className:"session-stat"},React.createElement("div",{className:"session-stat-val"},practiceCount),React.createElement("div",{className:"session-stat-label"},"Submitted")),
              React.createElement("div",{className:"session-divider"}),
              React.createElement("div",{className:"session-stat"},
                React.createElement("div",{className:"session-stat-val",style:{color:"#10b981"}},exScores.filter(function(s){ return s!==null; }).length>0?Math.round(exScores.filter(function(s){ return s!==null; }).reduce(function(a,b){ return a+b; },0)/exScores.filter(function(s){ return s!==null; }).length)+"/10":"--"),
                React.createElement("div",{className:"session-stat-label"},"Avg Score")
              )
            ),
            React.createElement("div",{className:"daily-card"},
              React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},
                  React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"var(--amber)"}},"Today's Challenge"),
                    React.createElement("div",{style:{fontSize:14,fontWeight:700,color:"var(--text)",marginTop:2}},todayChallenge.title)
                  )
                ),
                React.createElement("button",{className:"btn btn-ghost btn-sm",onClick:function(){ setShowDaily(!showDaily); setDailyAns(""); setDailyFb(""); }},showDaily?"Close":"Try It")
              ),
              React.createElement("div",{style:{fontSize:12,color:"var(--text3)"}},"Hint: "+todayChallenge.hint),
              showDaily && React.createElement("div",{style:{marginTop:14}},
                React.createElement("div",{style:{background:"var(--bg2)",borderRadius:"var(--r-sm)",padding:"12px 14px",fontSize:13,color:"var(--text)",lineHeight:1.65,marginBottom:12,borderLeft:"2px solid var(--amber)"}},todayChallenge.scenario),
                React.createElement("div",{className:"section-label",style:{marginBottom:7}},"Your prompt attempt"),
                React.createElement("textarea",{value:dailyAns,onChange:function(e){ setDailyAns(e.target.value); },placeholder:"Write your best prompt for today's challenge...",rows:5}),
                React.createElement("div",{className:"btn-row"},
                  React.createElement("button",{className:"btn btn-primary btn-sm",onClick:getDailyFb,disabled:loadingDaily||!dailyAns.trim()},
                    loadingDaily?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Checking..."):"Get Feedback"
                  )
                ),
                dailyFb && React.createElement(FeedbackCard,{text:dailyFb})
              )
            ),
            React.createElement("div",{className:"card"},
              React.createElement("div",{className:"card-title"},React.createElement("div",{className:"icon"},"P"),"Practice by Track"),
              React.createElement("div",{className:"card-sub"},"Pick your focus area - get 3 real scenarios from that world every time."),
              React.createElement("select",{value:track,onChange:function(e){ setTrack(e.target.value); setExs([]); },style:{width:"100%",background:"var(--bg2)",border:"1px solid rgba(99,102,241,0.4)",borderRadius:"var(--r-sm)",color:"var(--text)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,padding:"11px 13px",outline:"none",cursor:"pointer",marginBottom:12}},
                TRACKS.map(function(t){ return React.createElement("option",{key:t.id,value:t.id},t.label+" - "+t.desc); })
              ),
              (function(){
                var sel = TRACKS.find(function(t){ return t.id===track; });
                return sel?React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.18)",borderRadius:"var(--r-sm)",marginBottom:14}},
                  React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:12,fontWeight:700,color:"var(--indigo-l)"}},sel.label),
                    React.createElement("div",{style:{fontSize:11,color:"var(--text3)"}},sel.desc)
                  )
                ):null;
              })(),
              React.createElement("button",{className:"btn btn-primary",onClick:genExs,disabled:loadingEx},
                loadingEx?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Generating..."):exs.length?"New Exercises":"Generate Exercises"
              )
            ),
            loadingEx && React.createElement("div",{className:"gen-load"},React.createElement("div",{className:"spinner spinner-indigo",style:{width:28,height:28,borderWidth:3}}),React.createElement("span",null,"Creating exercises...")),
            !loadingEx && exs.length===0 && React.createElement("div",{className:"empty"},React.createElement("div",{className:"empty-icon"},"P"),React.createElement("p",null,"Choose your track and generate exercises. Fresh scenarios every time.")),
            !loadingEx && exs.map(function(ex,i){
              return React.createElement("div",{key:i,className:"ex-card"},
                React.createElement("div",{className:"ex-num"},React.createElement("div",{className:"ex-num-pill"},i+1),"Exercise "+(i+1)+" of "+exs.length),
                React.createElement("div",{className:"ex-scenario"},ex.scenario),
                ex.hint && React.createElement("div",{style:{fontSize:11.5,color:"var(--text3)",marginBottom:12}},"Hint: "+ex.hint),
                React.createElement("div",{className:"section-label",style:{marginBottom:7}},"Your prompt attempt"),
                React.createElement("textarea",{value:ans[i],onChange:function(e){ var a=ans.slice(); a[i]=e.target.value; setAns(a); },placeholder:"Write your best prompt here...",rows:5}),
                React.createElement("div",{className:"btn-row"},
                  React.createElement("button",{className:"btn btn-primary btn-sm",onClick:function(){ getFb(i); },disabled:loadingFb[i]||!ans[i].trim()},
                    loadingFb[i]?React.createElement(React.Fragment,null,React.createElement("div",{className:"spinner"}),"Checking..."):"Get Feedback"
                  ),
                  React.createElement("button",{className:"btn btn-ghost btn-sm",onClick:function(){ var s=showIdeal.slice(); s[i]=!s[i]; setShowIdeal(s); }},showIdeal[i]?"Hide Ideal":"Show Ideal"),
                  ans[i]&&React.createElement(CopyBtn,{text:ans[i],label:"Copy Mine"})
                ),
                exScores[i]!==null && React.createElement("div",{className:"ex-score-badge",style:{background:exScores[i]>=7?"rgba(16,185,129,0.12)":exScores[i]>=5?"rgba(245,158,11,0.12)":"rgba(244,63,94,0.12)",color:exScores[i]>=7?"var(--emerald)":exScores[i]>=5?"var(--amber)":"var(--rose)"}},exScores[i]+"/10 - "+(exScores[i]>=8?"Excellent!":exScores[i]>=6?"Good work":exScores[i]>=4?"Keep practising":"Review the ideal")),
                fbs[i] && React.createElement(FeedbackCard,{text:fbs[i]}),
                fbs[i] && React.createElement("div",{style:{marginTop:10,padding:"10px 13px",background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.18)",borderRadius:"var(--r-sm)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}},
                  React.createElement("span",{style:{fontSize:12,color:"var(--text2)"}},"Want to refine this prompt further?"),
                  React.createElement("button",{onClick:function(){ setBInput(ans[i]); setTab("builder"); switchMode("improve"); },style:{padding:"5px 12px",borderRadius:6,border:"1px solid rgba(99,102,241,0.3)",background:"rgba(99,102,241,0.1)",color:"var(--indigo-l)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Try this in Build Mode")
                ),
                showIdeal[i] && ex.ideal && React.createElement("div",{className:"ideal-block"},
                  React.createElement("div",{className:"ideal-header"},React.createElement("div",{className:"ideal-label"},"Ideal Prompt"),React.createElement(CopyBtn,{text:ex.ideal,label:"Copy Ideal"})),
                  ex.ideal
                )
              );
            })
          )

        )
      ),

      showMenu && React.createElement("div", {className:"drawer-backdrop", onClick:function(){ setShowMenu(false); setMenuPage("home"); }},
        React.createElement("div", {
          id:"nav-drawer",
          className:"drawer-panel",
          role:"dialog",
          "aria-modal":"true",
          "aria-label":"Navigation menu",
          onClick:function(e){ e.stopPropagation(); }
        },
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 20px 16px",borderBottom:"1px solid var(--border)",flexShrink:0}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
              React.createElement("div",{style:{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,var(--indigo),var(--indigo-d))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",boxShadow:"var(--shadow-primary)"}},"PC"),
              React.createElement("div",null,
                React.createElement("div",{style:{fontSize:15,fontWeight:800,color:"var(--text)",letterSpacing:"-0.4px"}},"Prompt",React.createElement("span",{style:{color:"var(--indigo-l)"}},"Coach")),
                React.createElement("div",{style:{fontSize:9,color:"var(--text3)"}},"The AI expert in your pocket")
              )
            ),
            React.createElement("button",{className:"drawer-close-btn",onClick:function(){ setShowMenu(false); setMenuPage("home"); },"aria-label":"Close navigation menu"},"x")
          ),
          React.createElement("div",{className:"drawer-scroll"},
            React.createElement("div",{style:{padding:"16px 20px"}},
              menuPage==="home" && React.createElement("div",null,
                React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--text3)",marginBottom:14}},"Menu"),
                [{icon:"A",label:"About Us",sub:"Who built PromptCoach",page:"about"},{icon:"G",label:"Guide to the App",sub:"How to use all 4 tabs",page:"guide_menu"}].map(function(item){
                  return React.createElement("button",{key:item.page,className:"menu-item-btn"+(menuPage===item.page?" active-page":""),onClick:function(){ setMenuPage(menuPage===item.page?"home":item.page); }},
                    React.createElement("div",{style:{width:38,height:38,borderRadius:11,background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}},item.icon),
                    React.createElement("div",{style:{flex:1}},
                      React.createElement("div",{style:{fontSize:14,fontWeight:700,color:"var(--text)",marginBottom:2}},item.label),
                      React.createElement("div",{style:{fontSize:12,color:"var(--text3)"}},item.sub)
                    ),
                    React.createElement("div",{style:{fontSize:16,color:"var(--text3)",transform:menuPage===item.page?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s"}},">")
                  );
                }),
                React.createElement("div",{style:{marginTop:24,padding:"14px 16px",background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.18)",borderRadius:"var(--r-md)"}},
                  React.createElement("div",{style:{fontSize:12,fontWeight:700,color:"var(--emerald)",marginBottom:4}},"Free while in Beta"),
                  React.createElement("div",{style:{fontSize:11.5,color:"var(--text2)",lineHeight:1.6,marginBottom:10}},"PromptCoach is completely free to use. Pro plan launching at Rs 199/month."),
                  React.createElement("button",{onClick:function(){ window.open("https://tally.so/r/rjvEep","_blank"); },style:{width:"100%",padding:"9px 14px",borderRadius:"var(--r-sm)",border:"1px solid rgba(16,185,129,0.35)",background:"rgba(16,185,129,0.12)",color:"var(--emerald)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}},"Join the Waitlist")
                )
              ),
              menuPage==="about" && React.createElement("div",null,
                React.createElement("button",{onClick:function(){ setMenuPage("home"); },style:{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"var(--indigo-l)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:20,padding:0}},"< Back"),
                React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--text3)",marginBottom:16}},"About Us"),
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:20,padding:"16px",background:"var(--surface)",borderRadius:"var(--r-lg)",border:"1px solid var(--border)"}},
                  React.createElement("div",{style:{width:52,height:52,borderRadius:16,background:"linear-gradient(135deg,var(--indigo),var(--indigo-d))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:"var(--shadow-primary)",color:"#fff",fontWeight:800}},"B"),
                  React.createElement("div",null,
                    React.createElement("div",{style:{fontSize:15,fontWeight:800,color:"var(--text)",marginBottom:2}},"Bharat"),
                    React.createElement("div",{style:{fontSize:12,color:"var(--indigo-l)",fontWeight:600}},"Creator, PromptCoach")
                  )
                ),
                [{heading:"The idea behind PromptCoach",body:"I built PromptCoach because I was frustrated. Every time I asked AI for help, the results were mediocre - not because the AI was weak, but because I did not know how to ask well. I spent months figuring out what actually works, and realised this knowledge is not available in one simple, practical place."},
                 {heading:"Who it is for",body:"PromptCoach is built for professionals, business owners, and learners who want to get dramatically better results from AI - without learning to code or spending hours reading technical guides. If you use ChatGPT, Claude, or Gemini in your work and feel the results could be better, this is for you."},
                 {heading:"What makes it different",body:"Every other prompt tool either gives you a library to copy-paste from, or a course to read through. PromptCoach does both - and adds something no one else has: real-time AI feedback on your own prompts, so you learn by doing, not just by reading."},
                 {heading:"A note from me",body:"This is a work in progress, built with genuine care. Every lesson, every example, every feature has been thought through for someone who is using AI for the first time or wants to finally get it right. If something does not work or could be better, I want to know."},
                ].map(function(section,i){
                  return React.createElement("div",{key:i,style:{marginBottom:18}},
                    React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:6}},section.heading),
                    React.createElement("div",{style:{fontSize:13,color:"var(--text2)",lineHeight:1.75}},section.body)
                  );
                })
              ),
              menuPage==="guide_menu" && React.createElement("div",null,
                React.createElement("button",{onClick:function(){ setMenuPage("home"); },style:{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"var(--indigo-l)",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:20,padding:0}},"< Back"),
                React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--text3)",marginBottom:16}},"Guide to the App"),
                [{icon:"L",tab:"Learn",color:"rgba(99,102,241,0.12)",tc:"var(--indigo-l)",border:"rgba(99,102,241,0.25)",tagline:"Start here. Always.",what:"The Learn tab teaches you the 8 building blocks of a great prompt - the same framework used by AI professionals.",how:"Tap any lesson to expand it. Start with Lesson 1 (The 8 Building Blocks). Each lesson takes under 5 minutes.",tip:"Finish Lesson 1 before using any other tab - it makes everything else 10x more useful."},
                 {icon:"B",tab:"Build",color:"rgba(16,185,129,0.08)",tc:"var(--emerald)",border:"rgba(16,185,129,0.2)",tagline:"Where you create your prompts.",what:"Build has 3 modes - Build (guided 8-question wizard), Improve (paste any rough idea and we upgrade it), and Compare (test two prompts side by side).",how:"New to prompting? Use Build mode. Have a rough idea? Use Improve. Compare lets you test two prompts side by side.",tip:"In the Role block, tap Help me choose and describe your task - we will suggest the best expert or team."},
                 {icon:"P",tab:"Browse",color:"rgba(245,158,11,0.08)",tc:"var(--amber)",border:"rgba(245,158,11,0.2)",tagline:"Ready-made expert prompts.",what:"The Browse tab has professionally crafted prompts across 9 categories - Marketing, Sales, HR, Finance, Customer Service, and more.",how:"Pick a category, find a prompt, tap Copy to use it. Tap Why This Works to see the 8-block breakdown.",tip:"Tap Why This Works on at least 3 prompts. It is the fastest way to learn what makes a prompt powerful."},
                 {icon:"X",tab:"Practice",color:"rgba(244,63,94,0.08)",tc:"var(--rose)",border:"rgba(244,63,94,0.2)",tagline:"Learn by doing - with real feedback.",what:"Practice gives you real-world scenarios. Write a prompt for each and get AI feedback against all 8 building blocks.",how:"Choose a track, generate exercises, write your prompt, tap Get Feedback. A Daily Challenge gives you one scenario every day.",tip:"Do not read the Ideal Prompt before attempting. Write your own first - that is where the learning happens."}
                ].map(function(item,i){
                  return React.createElement("div",{key:i,style:{background:item.color,border:"1px solid "+item.border,borderRadius:"var(--r-lg)",padding:"16px",marginBottom:14}},
                    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10}},
                      React.createElement("div",{style:{width:34,height:34,borderRadius:10,background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}},item.icon),
                      React.createElement("div",null,
                        React.createElement("div",{style:{fontSize:14,fontWeight:800,color:item.tc}},item.tab),
                        React.createElement("div",{style:{fontSize:11.5,color:"var(--text2)",fontStyle:"italic"}},item.tagline)
                      )
                    ),
                    React.createElement("div",{style:{marginBottom:8}},
                      React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--text3)",marginBottom:3}},"What it is"),
                      React.createElement("div",{style:{fontSize:12.5,color:"var(--text2)",lineHeight:1.6}},item.what)
                    ),
                    React.createElement("div",{style:{marginBottom:8}},
                      React.createElement("div",{style:{fontSize:10,fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:"var(--text3)",marginBottom:3}},"How to use it"),
                      React.createElement("div",{style:{fontSize:12.5,color:"var(--text2)",lineHeight:1.6}},item.how)
                    ),
                    React.createElement("div",{style:{padding:"8px 11px",background:"rgba(0,0,0,0.15)",borderRadius:"var(--r-sm)",borderLeft:"2px solid "+item.border}},
                      React.createElement("span",{style:{fontSize:10.5,fontWeight:800,color:item.tc}},"Tip: "),
                      React.createElement("span",{style:{fontSize:11.5,color:"var(--text2)",lineHeight:1.55}},item.tip)
                    )
                  );
                })
              )
            )
          )
        )
      ),

      React.createElement("nav",{className:"bottom-nav"},
        TABS.map(function(t){
          return React.createElement("button",{key:t.id,className:"nav-item"+(tab===t.id?" active":""),onClick:function(){ go(t.id); }},
            React.createElement("div",{className:"nav-icon-wrap"},t.icon),
            React.createElement("div",{className:"nav-label"},t.label)
          );
        })
      )
    )
  );
}
