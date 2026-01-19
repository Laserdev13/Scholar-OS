
/* SCHOLAR-OS TITAN-ULTRA v36.1 | Optimized for Speed */
(function() {
    // Remove existing instance if present
    if (document.getElementById('zeus-root')) {
        document.getElementById('zeus-root').remove();
        return;
    }

    /* STYLE: Lighter for performance */
    const style = document.createElement('style');
    style.innerHTML = `
        #zeus-root {
            background: rgba(0,2,8,0.95);
            position: fixed;
            top: 0; right: 0;
            z-index: 100000;
            width: 400px; height: 100vh;
            padding: 20px;
            border-left: 2px solid #00ffcc;
            font-family: "Segoe UI", monospace;
            color: #00ffcc;
            display: flex; flex-direction: column;
            box-shadow: -10px 0 40px rgba(0,255,204,0.3);
            animation: slideIn 0.3s ease-out;
            overflow-y: auto;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        #zeus-hdr {
            display: flex; justify-content: space-between;
            color: #ff00ff; font-weight: bold;
            margin-bottom: 10px; border-bottom: 1px solid #ff00ff;
            padding-bottom: 8px; font-size: 18px;
        }
        #ai-box {
            background: rgba(0,255,204,0.05);
            border: 1px solid #00ffcc44;
            padding: 10px; margin-bottom: 10px;
            font-size: 12px; height: 80px;
            overflow-y: auto; color: #0f0;
            border-radius: 4px;
        }
        #cmd {
            width: 100%; background: #000;
            border: 1px solid #00ffcc; color: #fff;
            padding: 10px; margin-bottom: 10px;
            outline: none; font-size: 14px;
        }
        #grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 6px; overflow-y: auto; flex-grow: 1;
        }
        .btn {
            background: rgba(0,0,0,0.7);
            border: 1px solid #444; color: #00ffcc;
            padding: 8px; font-size: 10px;
            cursor: pointer; text-transform: uppercase;
            font-weight: bold; border-radius: 2px;
        }
        .btn:hover {
            background: #00ffcc; color: #000;
        }
        .cat-tag {
            grid-column: span 3; color: #ff00ff;
            font-size: 11px; margin-top: 20px;
            border-bottom: 1px solid #ff00ff88;
            padding-bottom: 5px; text-align: center;
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);

    /* UI CREATION */
    const ui = document.createElement('div');
    ui.id = 'zeus-root';
    ui.innerHTML = `
        <div id="zeus-hdr">TITAN_ULTRA <span onclick="this.parentElement.parentElement.remove()" style="cursor:pointer;color:red">[X]</span></div>
        <div id="ai-box">System Online. Use search bar below.</div>
        <input id="cmd" placeholder="Search tools..." onkeyup="window.deepSearch(this.value)">
        <div id="grid"></div>
    `;
    document.body.appendChild(ui);

    const grid = document.getElementById('grid');
    const ai = document.getElementById('ai-box');

    /* REGISTRY: Reduced heavy endpoints for speed */
    const registry = [
        { n: 'Desmos 2D', c: 'MATH', d: 'Graphing calculator', u: 'https://desmos.com/calculator' },
        { n: 'Wolfram Alpha', c: 'MATH', d: 'Computational engine', u: 'https://wolframalpha.com' },
        { n: 'Symbolab', c: 'MATH', d: 'Step solver', u: 'https://symbolab.com' },
        { n: 'GeoGebra', c: 'GEOMETRY', d: 'Dynamic geometry', u: 'https://geogebra.org' },
        { n: 'PhET Physics', c: 'PHYSICS', d: 'Interactive labs', u: 'https://phet.colorado.edu' },
        { n: 'Periodic Table', c: 'CHEMISTRY', d: 'Element data', u: 'https://ptable.com' },
        { n: 'GitHub', c: 'DEV', d: 'Code hosting', u: 'https://github.com' },
        { n: 'Google Scholar', c: 'ACADEMIC', d: 'Research papers', u: 'https://scholar.google.com' },
        { n: 'Edit Mode', c: 'UTILS', d: 'Toggle design mode', f: () => document.designMode = document.designMode==='on'?'off':'on' },
        { n: 'Night Mode', c: 'UTILS', d: 'Invert colors', f: () => document.body.style.filter = "invert(1) hue-rotate(180deg)" },
    ];

    /* PERFORMANCE: Throttle search */
    let searchTimeout;
    const render = (query = "") => {
        grid.innerHTML = ""; let currentCat = "";
        registry.forEach(item => {
            const searchTerms = (item.n + item.c + (item.d || "")).toLowerCase();
            if (searchTerms.includes(query.toLowerCase())) {
                if (item.c !== currentCat) {
                    currentCat = item.c;
                    let tag = document.createElement('div');
                    tag.className = 'cat-tag'; tag.innerText = `[${currentCat}]`;
                    grid.appendChild(tag);
                }
                let b = document.createElement('button');
                b.className = 'btn'; b.innerText = item.n;
                b.title = item.d || "";
                b.onclick = item.f ? item.f : () => window.open(item.u);
                grid.appendChild(b);
            }
        });
    };
    window.deepSearch = (v) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => render(v), 250);
    };

    render();
    ai.innerHTML += "<br><b>Ready:</b> Titan Ultra Optimized.";
})();
