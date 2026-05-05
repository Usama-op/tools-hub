// tools Hub By Usama - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Tool Switching Logic
    const toolCards = document.querySelectorAll('.tool-card');
    const interfaces = document.querySelectorAll('.tool-interface');
    const backBtns = document.querySelectorAll('.back-btn');
    const grid = document.querySelector('.tools-grid');
    const header = document.querySelector('.glass-header');

    toolCards.forEach(card => {
        card.querySelector('.use-tool-btn').addEventListener('click', () => {
            const tool = card.dataset.tool;
            grid.style.display = 'none';
            header.style.display = 'none';
            document.getElementById(`${tool}-tool`).style.display = 'block';
            gsap.from(`#${tool}-tool`, { opacity: 0, y: 20, duration: 0.5 });
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            interfaces.forEach(i => i.style.display = 'none');
            grid.style.display = 'grid';
            header.style.display = 'block';
        });
    });

    // PDF Toolkit Initialization
    if (document.getElementById('pdf-tool')) {
        window.pdfTool = new PDFToolkit();
    }
});

class PDFToolkit {
    constructor() {
        this.files = [];
        this.libLoaded = false;
        this.init();
    }

    async loadLibrary() {
        if (this.libLoaded) return true;
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
            script.id = "pdf-lib-cdn";
            script.onload = () => { this.libLoaded = true; resolve(true); };
            document.body.appendChild(script);
        });
    }

    init() {
        const dropZone = document.getElementById('pdf-drop-zone');
        const input = document.getElementById('pdf-input');
        if (!dropZone) return;

        dropZone.addEventListener('click', () => input.click());
        input.addEventListener('change', (e) => this.handleFiles(e.target.files));
        
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--accent-color)'; });
        dropZone.addEventListener('dragleave', () => dropZone.style.borderColor = 'var(--glass-border)');
        dropZone.addEventListener('drop', (e) => { e.preventDefault(); this.handleFiles(e.dataTransfer.files); });

        document.getElementById('btn-pdf-merge').addEventListener('click', () => this.mergePDFs());
        document.getElementById('btn-pdf-rotate').addEventListener('click', () => this.rotatePDFs());
    }

    handleFiles(fileList) {
        for (let file of fileList) {
            if (file.type === "application/pdf") this.files.push(file);
        }
        this.renderFileList();
    }

    renderFileList() {
        const listContainer = document.getElementById('pdf-file-list');
        listContainer.innerHTML = this.files.map((f, i) => `
            <div class="file-item">
                <span><i class="fas fa-file-pdf"></i> \${f.name}</span>
                <i class="fas fa-times remove-file" onclick="window.pdfTool.removeFile(\${i})"></i>
            </div>`).join('');
    }

    removeFile(index) { this.files.splice(index, 1); this.renderFileList(); }

    showStatus(msg, type = 'info') {
        const status = document.getElementById('pdf-status');
        status.innerHTML = `<div class="pdf-status-msg" style="background: \${type === 'error' ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,0,0.1)'}">\${msg}</div>`;
    }

    async mergePDFs() {
        if (this.files.length < 2) return this.showStatus("Select at least 2 PDFs", "error");
        this.showStatus("Processing...", "info");
        await this.loadLibrary();
        try {
            const { PDFDocument } = window.PDFLib;
            const mergedPdf = await PDFDocument.create();
            for (const file of this.files) {
                const doc = await PDFDocument.load(await file.arrayBuffer());
                const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
                pages.forEach(p => mergedPdf.addPage(p));
            }
            this.save(await mergedPdf.save(), "merged_hub.pdf");
            this.showStatus("Successfully merged!", "success");
        } catch (e) { this.showStatus("Error: " + e.message, "error"); }
    }

    async rotatePDFs() {
        if (this.files.length === 0) return this.showStatus("Select a PDF", "error");
        this.showStatus("Rotating...", "info");
        await this.loadLibrary();
        try {
            const { PDFDocument, degrees } = window.PDFLib;
            const file = this.files[0];
            const bytes = await file.arrayBuffer();
            const doc = await PDFDocument.load(bytes);
            doc.getPages().forEach(p => p.setRotation(degrees((p.getRotation().angle + 90) % 360)));
            this.save(await doc.save(), "rotated_" + file.name);
            this.showStatus("Successfully rotated!", "success");
        } catch (e) { this.showStatus("Error: " + e.message, "error"); }
    }

    save(bytes, name) {
        const blob = new Blob([bytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
    }
}