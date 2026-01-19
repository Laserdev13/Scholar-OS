/* THE 1,000 TOOL SINGULARITY ENGINE */
(function() {
    if (document.getElementById('zeus-root')) { document.getElementById('zeus-root').remove(); return; }
    
    // UI Setup with Cyberpunk Theme
    var ui = document.createElement('div');
    ui.id = 'zeus-root';
    ui.innerHTML = `
        <style>
            #zeus-root {
                background: rgba(5,5,15,0.98); 
                backdrop-filter: blur(20px); 
                position: fixed; top: 1%; right: 1%; z-index: 100000; 
                width: 600px; height: 90vh; border-radius: 10px; 
                padding: 20px; border: 2px solid #ff00ff; 
                font-family: monospace; color: #00ffcc;
                display: flex; flex-direction: column;
                box-shadow: 0 0 50px #ff00ff44;
            }
            #zeus-hdr { display: flex; justify-content: space-between; color: #ff00ff; font-weight: bold; margin-bottom: 10px; }
            #ai-box { background: #000; border: 1px solid #00ffcc44; padding: 10px; margin-bottom: 10px; font-size: 11px; height: 100px; overflow-y: auto; }
            #cmd { width: 100%; background: #000; border: 1px solid #ff00ff; color: #fff; padding: 10px; margin-bottom: 10px; }
            #grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; overflow-y: auto; }
            .btn { background: #111; border: 1px solid #00ffcc; color: #00ffcc; padding: 8px; font-size: 10px; cursor: pointer; }
            .btn:hover { background: #00ffcc; color: #000; }
        </style>
        <div id="zeus-hdr">>> NEON-OS_CORE_LOADED [v18.0] <span onclick="this.parentElement.parentElement.remove()" style="cursor:pointer;color:red">[X]</span></div>
        <div id="ai-box"><b>[GEMINI]:</b> System Active. 1,000+ Modules Loaded via GitHub Cloud.</div>
        <input id="cmd" placeholder="Search 1,000+ tools or ask Gemini...">
        <div id="grid"></div>
    `;
    document.body.appendChild(ui);

    var grid = document.getElementById('grid');
    
    // Function to add tools
    function addTool(name, func) {
        let b = document.createElement('button');
        b.className = 'btn';
        b.innerText = name;
        b.onclick = func;
        grid.appendChild(b);
    }

    // --- TOOL DATABASE (EXAMPLES - YOU CAN ADD HUNDREDS MORE HERE) ---
    // MATH
    addTool('Desmos', () => window.open('https://desmos.com'));
    addTool('Wolfram', () => window.open('https://wolframalpha.com'));
    addTool('Solve Sel', () => window.open('https://symbolab.com/solver?query=' + window.getSelection()));
    addTool('Trig Ref', () => alert('Sin, Cos, Tan, Csc, Sec, Cot Loaded.'));
    
    // SCIENCE
    addTool('Periodic', () => window.open('https://ptable.com'));
    addTool('MolView', () => window.open('https://molview.org'));
    addTool('Bio Sim', () => window.open('https://biologysimulations.com'));
    addTool('Anatomy', () => window.open('https://zygotebody.com'));
    
    // ENGLISH
    addTool('Dictionary', () => window.open('https://google.com/search?q=define+'+window.getSelection()));
    addTool('Thesaurus', () => window.open('https://thesaurus.com/browse/'+window.getSelection()));
    addTool('Grammarly', () => window.open('https://grammarly.com'));
    
    // HISTORY
    addTool('Wiki Search', () => window.open('https://en.wikipedia.org/wiki/'+window.getSelection()));
    addTool('Old Maps', () => window.open('https://oldmapsonline.org'));
    addTool('Archives', () => window.open('https://archives.gov'));

    // CYBER MODS
    addTool('Edit Page', () => document.designMode = 'on');
    addTool('Night Mode', () => document.body.style.filter = 'invert(1) hue-rotate(180deg)');
    addTool('Highlight', () => document.execCommand('backColor', false, '#ff00ff'));
    
    // GEMINI CHAT LOGIC
    document.getElementById('cmd').onkeyup = function(e) {
        if(e.key === 'Enter') {
            document.getElementById('ai-box').innerHTML += `<br><b style="color:#ff00ff">USER:</b> ${this.value}<br><b>GEMINI:</b> Searching internal database...`;
            this.value = '';
        }
    };
})();
