// Original script.js logic preserved
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.tools-grid');
    const header = document.querySelector('.glass-header');
    
    document.querySelectorAll('.tool-card').forEach(card => {
        card.querySelector('.use-tool-btn').addEventListener('click', () => {
            const tool = card.dataset.tool;
            grid.style.display = 'none';
            header.style.display = 'none';
            document.getElementById(`${tool}-tool`).style.display = 'block';
            gsap.from(`#${tool}-tool`, { opacity: 0, y: 20 });
        });
    });

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tool-interface').forEach(i => i.style.display = 'none');
            grid.style.display = 'grid';
            header.style.display = 'block';
        });
    });

    // PDF Toolkit Class
    if (document.getElementById('pdf-tool')) window.pdfTool = new PDFToolkit();
});

class PDFToolkit {
    constructor() {
        this.files = [];
        this.libLoaded = false;
        this.init();
    }

    async load() {
        if (this.libLoaded) return;
        const loadS = (src) => new Promise(r => { const s = document.createElement('script'); s.src = src; s.onload = r; document.body.appendChild(s); });
        await Promise.all([
            loadS("https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"),
            loadS("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js")
        ]);
        window['pdfjs-dist/build/pdf'].GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        this.libLoaded = true;
    }

    init() {
        const dz = document.getElementById('pdf-drop-zone');
        const inp = document.getElementById('pdf-input');
        dz.onclick = () => inp.click();
        inp.onchange = (e) => { for(let f of e.target.files) this.files.push(f); this.render(); };
        
        document.getElementById('btn-pdf-merge').onclick = () => this.execute('merge');
        document.getElementById('btn-pdf-rotate').onclick = () => this.execute('rotate');
        document.getElementById('btn-pdf-to-jpg').onclick = () => this.execute('toJpg');
        document.getElementById('btn-jpg-to-pdf').onclick = () => this.execute('fromJpg');
        document.getElementById('btn-pdf-split').onclick = () => {
            const p = document.getElementById('split-settings');
            p.style.display = p.style.display === 'none' ? 'block' : 'none';
            if (p.style.display === 'block') this.execute('split');
        };
    }

    render() {
        const list = document.getElementById('pdf-file-list');
        list.innerHTML = this.files.map((f, i) => `<div class="file-item"><span>\${f.name.slice(0,20)}...</span><i class="fas fa-trash" style="color:#ff4d4d;cursor:pointer" onclick="window.pdfTool.remove(\${i})"></i></div>`).join('');
    }
    remove(i) { this.files.splice(i, 1); this.render(); }

    status(m, c='rgba(77,132,243,0.1)') {
        document.getElementById('pdf-status').innerHTML = `<div class="pdf-status-msg" style="background:\${c}">\${m}</div>`;
    }

    async execute(type) {
        if (!this.files.length) return this.status("Add files first!", "rgba(255,77,77,0.1)");
        this.status("Processing...");
        await this.load();
        try {
            const { PDFDocument, degrees } = window.PDFLib;
            if (type === 'merge') {
                const doc = await PDFDocument.create();
                for (let f of this.files) {
                    const src = await PDFDocument.load(await f.arrayBuffer(), {ignoreEncryption:true});
                    const pages = await doc.copyPages(src, src.getPageIndices());
                    pages.forEach(p => doc.addPage(p));
                }
                this.save(await doc.save(), "merged.pdf");
            } else if (type === 'rotate') {
                const doc = await PDFDocument.load(await this.files[0].arrayBuffer(), {ignoreEncryption:true});
                doc.getPages().forEach(p => p.setRotation(degrees((p.getRotation().angle + 90) % 360)));
                this.save(await doc.save(), "rotated.pdf");
            } else if (type === 'fromJpg') {
                const doc = await PDFDocument.create();
                for (let f of this.files) {
                    if (f.type.includes('image')) {
                        const img = await doc.embedJpg(await f.arrayBuffer());
                        const p = doc.addPage([img.width, img.height]);
                        p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
                    }
                }
                this.save(await doc.save(), "images.pdf");
            } else if (type === 'toJpg') {
                const pdf = await window['pdfjs-dist/build/pdf'].getDocument(await this.files[0].arrayBuffer()).promise;
                const page = await pdf.getPage(1);
                const canvas = document.getElementById('pdf-render-canvas');
                const viewport = page.getViewport({ scale: 2 });
                canvas.width = viewport.width; canvas.height = viewport.height;
                await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                canvas.toBlob(b => {
                    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = "page1.jpg"; a.click();
                }, 'image/jpeg');
            } else if (type === 'split') {
                const r = document.getElementById('split-range').value;
                if (!r) return;
                const src = await PDFDocument.load(await this.files[0].arrayBuffer(), {ignoreEncryption:true});
                const doc = await PDFDocument.create();
                const idx = r.split(',').map(n => parseInt(n.trim()) - 1);
                const pgs = await doc.copyPages(src, idx);
                pgs.forEach(p => doc.addPage(p));
                this.save(await doc.save(), "split.pdf");
            }
            this.status("Success!", "rgba(77,255,77,0.1)");
        } catch (e) { this.status("Error: " + e.message, "rgba(255,77,77,0.1)"); }
    }

    save(bytes, name) {
        const b = new Blob([bytes], { type: "application/pdf" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; a.click();
    }
}