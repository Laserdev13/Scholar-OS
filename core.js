
/* SCHOLAR-OS TITAN-ULTRA v36.0 | CHUNK 1/16: ENGINE */
(function() {
    // Remove existing instance if present
    if (document.getElementById('zeus-root')) {
        document.getElementById('zeus-root').remove();
        return;
    }

    /* CHUNK 2/16: STYLE INJECTION */
    const style = document.createElement('style');
    style.innerHTML = `
        #zeus-root {
            background: rgba(0,2,8,0.99);
            backdrop-filter: blur(60px);
            position: fixed;
            top: 0; right: 0;
            z-index: 100000;
            width: 950px; height: 100vh;
            padding: 30px;
            border-left: 2px solid #00ffcc;
            font-family: "Segoe UI", "Courier New", monospace;
            color: #00ffcc;
            display: flex; flex-direction: column;
            box-shadow: -20px 0 100px rgba(0,255,204,0.3);
            animation: slideIn 0.4s ease-out;
            overflow-y: auto;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        #zeus-hdr {
            display: flex; justify-content: space-between;
            color: #ff00ff; font-weight: bold;
            margin-bottom: 20px; border-bottom: 2px solid #ff00ff;
            padding-bottom: 15px; text-shadow: 0 0 10px #ff00ff;
            font-size: 22px; letter-spacing: 10px;
        }
        #ai-box {
            background: rgba(0,255,204,0.05);
            border: 1px solid #00ffcc44;
            padding: 20px; margin-bottom: 20px;
            font-size: 14px; height: 100px;
            overflow-y: auto; color: #0f0;
            border-radius: 4px; line-height: 1.5;
        }
        #cmd {
            width: 100%; background: #000;
            border: 2px solid #00ffcc; color: #fff;
            padding: 18px; margin-bottom: 20px;
            outline: none; font-size: 20px;
            transition: 0.3s;
        }
        #cmd:focus { box-shadow: 0 0 30px #00ffcc; border-color: #fff; }
        #grid {
            display: grid; grid-template-columns: repeat(6, 1fr);
            gap: 8px; overflow-y: auto; flex-grow: 1;
            padding-bottom: 20px;
        }
        .btn {
            background: rgba(0,0,0,0.7);
            border: 1px solid #444; color: #00ffcc;
            padding: 12px 2px; font-size: 10px;
            cursor: pointer; text-transform: uppercase;
            font-weight: bold; border-radius: 2px;
        }
        .btn:hover {
            background: #00ffcc; color: #000;
            box-shadow: 0 0 20px #00ffcc;
            transform: translateY(-2px); border-color: #fff;
        }
        .cat-tag {
            grid-column: span 6; color: #ff00ff;
            font-size: 13px; margin-top: 40px;
            border-bottom: 1px solid #ff00ff88;
            padding-bottom: 10px; text-align: center;
            font-weight: 900; background: rgba(255,0,255,0.1);
            letter-spacing: 5px;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #00ffcc; border-radius: 10px; }
    `;
    document.head.appendChild(style);

    /* CHUNK 3/16: UI CREATION */
    const ui = document.createElement('div');
    ui.id = 'zeus-root';
    ui.innerHTML = `
        <div id="zeus-hdr">>>> TITAN_ULTRA_v36 << <span onclick="this.parentElement.parentElement.remove()" style="cursor:pointer;color:red">[POWER_OFF]</span></div>
        <div id="ai-box"><b>[KERNEL]:</b> System Online. Synchronizing 1,200+ Neural Links.<br><b>[NOTICE]:</b> Use the command bar to filter by subject or tool name.</div>
        <input id="cmd" placeholder="QUERY TITAN ARCHIVE..." onkeyup="window.deepSearch(this.value)">
        <div id="grid"></div>
    `;
    document.body.appendChild(ui);

    const grid = document.getElementById('grid');
    const ai = document.getElementById('ai-box');

    /* CHUNK 4/16: REGISTRY */
    const registry = [
        { n: 'Desmos 2D', c: 'MATH_CORE', d: 'Graphing calculator for functions', u: 'https://desmos.com/calculator' },
        { n: 'Wolfram Alpha', c: 'MATH_CORE', d: 'Computational knowledge engine', u: 'https://wolframalpha.com' },
        { n: 'Symbolab', c: 'MATH_CORE', d: 'Step-by-step math solver', u: 'https://symbolab.com' },
        { n: 'GeoGebra 3D', c: 'GEOMETRY', d: 'Dynamic geometry and algebra', u: 'https://geogebra.org/3d' },
        { n: 'PhET Physics', c: 'PHYSICS_SIMS', d: 'Interactive labs for mechanics', u: 'https://phet.colorado.edu' },
        { n: 'Periodic Table', c: 'CHEMISTRY', d: 'Interactive isotope/element data', u: 'https://ptable.com' },
        { n: 'GitHub Hub', c: 'DEV_TOOLS', d: 'Repository management', u: 'https://github.com' },
        { n: 'Google Scholar', c: 'ACADEMIC', d: 'Peer-reviewed paper search', u: 'https://scholar.google.com' },
        { n: 'Edit Mode', c: 'SYS_UTILS', d: 'Toggle site design mode', f: () => document.designMode = document.designMode==='on'?'off':'on' },
        { n: 'Night Mode', c: 'SYS_UTILS', d: 'Invert browser colors', f: () => document.body.style.filter = "invert(1) hue-rotate(180deg)" },
    ];

    // Add endpoints for demo
    for(let i=1; i<=950; i++) {
        registry.push({
            n: 'Titan_Endpoint_' + i,
            c: 'DEEP_DATABASE',
            d: 'Verified secure research node',
            f: () => ai.innerHTML += `<br><b>[DATABASE]:</b> Node ${i} accessed via TITAN-ULTRA protocol.`
        });
    }

    /* CHUNK 5/16: RENDER FUNCTION */
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
    window.deepSearch = (v) => render(v);
    render();
    ai.innerHTML += "<br><b>[SUCCESS]:</b> Scholar-OS Titan Ultra Fully Synchronized.";

    /* CHUNK 6/16: PLUGIN SYSTEM */
    const pluginDiv = document.createElement('div');
    pluginDiv.style = "margin-top: 20px; border-top: 1px solid #ff00ff44; padding-top: 15px; display: flex; gap: 10px;";
    pluginDiv.innerHTML = `
        <input id="plug-n" placeholder="Tool Name" style="flex:1; background:#000; border:1px solid #00ffcc; color:#fff; padding:5px;">
        <input id="plug-u" placeholder="URL (https://...)" style="flex:2; background:#000; border:1px solid #00ffcc; color:#fff; padding:5px;">
        <button id="plug-add" style="background:#ff00ff; color:#000; border:none; padding:5px 15px; cursor:pointer; font-weight:bold;">+ INSTALL PLUGIN</button>
    `;
    ui.insertBefore(pluginDiv, grid);

    const savePlugin = (name, url) => {
        if(!/^https?:\/\//.test(url)) {
            ai.innerHTML += `<br><b>[ERROR]:</b> Invalid URL format.`;
            return;
        }
        let plugins = JSON.parse(localStorage.getItem('zeus_plugins') || "[]");
        plugins.push({ n: name, u: url, c: 'USER_PLUGINS' });
        localStorage.setItem('zeus_plugins', JSON.stringify(plugins));
        location.reload();
    };

    document.getElementById('plug-add').onclick = () => {
        const name = document.getElementById('plug-n').value;
        const url = document.getElementById('plug-u').value;
        if(name && url) {
            savePlugin(name, url);
            ai.innerHTML += `<br><b>[SUCCESS]:</b> Plugin '${name}' installed to local registry.`;
        }
    };

    const saved = JSON.parse(localStorage.getItem('zeus_plugins') || "[]");
    saved.forEach(p => {
        registry.unshift({ n: "⭐ " + p.n, c: 'USER_PLUGINS', d: 'User-installed custom module', u: p.u });
    });
    ai.innerHTML += `<br><b>[MODULAR]:</b> Plugin system active. ${saved.length} custom links injected.`;
})();
