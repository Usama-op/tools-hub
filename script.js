 // tools Hub By Usama - JavaScript

// Holiday Data (Preloaded)
const holidayData = {
    'India': {
        '2024-01-01': { name: 'New Year\'s Day', type: 'Public Holiday' },
        '2024-01-26': { name: 'Republic Day', type: 'National Holiday' },
        '2024-03-25': { name: 'Holi', type: 'Festival' },
        '2024-04-14': { name: 'Dr. B.R. Ambedkar Jayanti', type: 'National Holiday' },
        '2024-05-01': { name: 'Labour Day', type: 'Public Holiday' },
        '2024-08-15': { name: 'Independence Day', type: 'National Holiday' },
        '2024-10-02': { name: 'Gandhi Jayanti', type: 'National Holiday' },
        '2024-11-01': { name: 'Diwali', type: 'Festival' },
        '2024-12-25': { name: 'Christmas Day', type: 'Public Holiday' }
    },
    'USA': {
        '2024-01-01': { name: 'New Year\'s Day', type: 'Public Holiday' },
        '2024-01-15': { name: 'Martin Luther King Jr. Day', type: 'Public Holiday' },
        '2024-02-19': { name: 'Presidents\' Day', type: 'Public Holiday' },
        '2024-05-27': { name: 'Memorial Day', type: 'Public Holiday' },
        '2024-07-04': { name: 'Independence Day', type: 'National Holiday' },
        '2024-09-02': { name: 'Labor Day', type: 'Public Holiday' },
        '2024-11-11': { name: 'Veterans Day', type: 'Public Holiday' },
        '2024-11-28': { name: 'Thanksgiving Day', type: 'Public Holiday' },
        '2024-12-25': { name: 'Christmas Day', type: 'Public Holiday' }
    },
    'UK': {
        '2024-01-01': { name: 'New Year\'s Day', type: 'Public Holiday' },
        '2024-04-01': { name: 'Easter Monday', type: 'Public Holiday' },
        '2024-05-06': { name: 'Early May Bank Holiday', type: 'Public Holiday' },
        '2024-05-27': { name: 'Spring Bank Holiday', type: 'Public Holiday' },
        '2024-08-26': { name: 'Summer Bank Holiday', type: 'Public Holiday' },
        '2024-12-25': { name: 'Christmas Day', type: 'Public Holiday' },
        '2024-12-26': { name: 'Boxing Day', type: 'Public Holiday' }
    }
};

// Currency Rates (Fixed sample rates)
const currencyRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.73,
    'INR': 74.5,
    'JPY': 110.0,
    'CAD': 1.25,
    'AUD': 1.35
};

// Scientific Calculator
class Calculator {
    constructor() {
        this.previousOperandElement = document.getElementById('previous');
        this.currentOperandElement = document.getElementById('current');
        this.clear();
        this.init();
    }

    init() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
                this.updateDisplay();
            });
        });

        // Action buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.handleAction(action);
                this.updateDisplay();
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (event.key >= '0' && event.key <= '9' || event.key === '.') {
                this.appendNumber(event.key);
                this.updateDisplay();
            } else if (event.key === 'Enter' || event.key === '=') {
                this.compute();
                this.updateDisplay();
            } else if (event.key === 'Backspace') {
                this.delete();
                this.updateDisplay();
            } else if (event.key === 'Escape') {
                this.clear();
                this.updateDisplay();
            } else if (['+', '-', '*', '/'].includes(event.key)) {
                const operationMap = {
                    '+': '+',
                    '-': '-',
                    '*': '×',
                    '/': '/'
                };
                this.chooseOperation(operationMap[event.key]);
                this.updateDisplay();
            }
        });
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'equals':
                this.compute();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
            case 'pow':
                const operationMap = {
                    'add': '+',
                    'subtract': '-',
                    'multiply': '×',
                    'divide': '/',
                    'pow': 'xʸ'
                };
                this.chooseOperation(operationMap[action]);
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
            case 'power':
            case 'percent':
            case 'negate':
                this.performScientificOperation(action);
                break;
            case 'pi':
            case 'e':
                this.insertConstant(action);
                break;
        }
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.shouldResetScreen || this.currentOperand === '0') {
            this.currentOperand = number === '.' ? '0.' : number;
            this.shouldResetScreen = false;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case 'xʸ':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    performScientificOperation(operation) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        let result;
        switch (operation) {
            case 'sin':
                result = Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'power':
                result = Math.pow(current, 2);
                break;
            case 'percent':
                result = current / 100;
                break;
            case 'negate':
                result = current * -1;
                break;
            default:
                return;
        }
        
        this.currentOperand = result.toString();
        this.shouldResetScreen = true;
    }

    insertConstant(constant) {
        let value;
        switch (constant) {
            case 'pi':
                value = Math.PI;
                break;
            case 'e':
                value = Math.E;
                break;
            default:
                return;
        }
        this.currentOperand = value.toString();
        this.shouldResetScreen = true;
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// Holiday Calendar
class HolidayCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedCountry = 'India';
        this.customEvents = JSON.parse(localStorage.getItem('calendarCustomEvents')) || {};
        this.init();
        this.renderCalendar();
    }

    init() {
        document.getElementById('country-select').addEventListener('change', (e) => {
            this.selectedCountry = e.target.value;
            this.renderCalendar();
        });

        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
            this.renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthYear = document.getElementById('current-month-year');

        currentMonthYear.textContent = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        calendarGrid.innerHTML = '';

        // Days of week header
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Get first day of month and last day
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        // Start from the Sunday before the first day of the month
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        // End on the Saturday after the last day of the month
        const endDate = new Date(lastDayOfMonth);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

        const today = new Date();
        let iteratorDate = new Date(startDate);

        while (iteratorDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dateNum = document.createElement('div');
            dateNum.className = 'date-number';
            dateNum.textContent = iteratorDate.getDate();
            dayElement.appendChild(dateNum);

            if (iteratorDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('current-day');
            }

            if (iteratorDate.getMonth() !== month) {
                dayElement.classList.add('other-month');
            }

            const dateKey = this.formatDateKey(iteratorDate);
            
            // Render Holidays
            if (holidayData[this.selectedCountry] && holidayData[this.selectedCountry][dateKey]) {
                dayElement.classList.add('holiday');
                
                const holiday = holidayData[this.selectedCountry][dateKey];
                const eventName = document.createElement('div');
                eventName.className = 'event-name';
                
                // Add Google Calendar-style coloring classes
                const typeClass = 'evt-' + holiday.type.toLowerCase().replace(/[^a-z0-9]/g, '-');
                eventName.classList.add(typeClass);
                
                eventName.textContent = holiday.name;
                dayElement.appendChild(eventName);
            }

            // Render Custom Events
            if (this.customEvents[dateKey]) {
                dayElement.classList.add('has-custom-event');
                const customNode = document.createElement('div');
                customNode.className = 'event-name custom-event-label';
                customNode.textContent = this.customEvents[dateKey];
                dayElement.appendChild(customNode);
            }

            dayElement.addEventListener('click', () => this.handleDateClick(dateKey));

            calendarGrid.appendChild(dayElement);
            iteratorDate.setDate(iteratorDate.getDate() + 1);
        }
    }

    handleDateClick(dateKey) {
        const details = document.getElementById('holiday-details');
        const holiday = holidayData[this.selectedCountry] ? holidayData[this.selectedCountry][dateKey] : null;
        const customEvent = this.customEvents[dateKey];
        const dateObj = new Date(dateKey);
        
        let html = `<h3>${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>`;
        
        if (holiday) {
            html += `<p style="color: var(--accent-color); margin-bottom: 0.5rem;"><strong>${holiday.name}</strong> (${holiday.type})</p>`;
        }
        
        if (customEvent) {
            html += `<p style="margin-bottom: 0.5rem;"><strong>Note:</strong> ${customEvent}</p>`;
        } else if (!holiday) {
            html += `<p style="color: var(--secondary-color);">No events for this day.</p>`;
        }

        html += `<div style="margin-top: 1rem; display: flex; gap: 10px; justify-content: center;">
                    <button id="btn-add-note" class="glass-btn" style="font-size: 0.8rem; padding: 5px 10px;">${customEvent ? 'Edit Note' : 'Add Note'}</button>
                    ${customEvent ? `<button id="btn-del-note" class="glass-btn" style="font-size: 0.8rem; padding: 5px 10px; background: rgba(255, 50, 50, 0.2);">Delete Note</button>` : ''}
                 </div>`;

        details.innerHTML = html;

        document.getElementById('btn-add-note').onclick = () => {
            const note = prompt("Enter event note:", customEvent || "");
            if (note !== null) {
                if (note.trim() === "") {
                    delete this.customEvents[dateKey];
                } else {
                    this.customEvents[dateKey] = note.trim();
                }
                localStorage.setItem('calendarCustomEvents', JSON.stringify(this.customEvents));
                this.renderCalendar();
                this.handleDateClick(dateKey); // Refresh details
            }
        };

        if (document.getElementById('btn-del-note')) {
            document.getElementById('btn-del-note').onclick = () => {
                if (confirm("Delete this note?")) {
                    delete this.customEvents[dateKey];
                    localStorage.setItem('calendarCustomEvents', JSON.stringify(this.customEvents));
                    this.renderCalendar();
                    this.handleDateClick(dateKey);
                }
            };
        }
    }

    formatDateKey(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
}

// World Clock
class WorldClock {
    constructor() {
        this.clocks = document.querySelectorAll('.clock-item');
        this.init();
        this.updateClocks();
        setInterval(() => this.updateClocks(), 1000);
    }

    init() {
        // Add some animation to clocks
        if (typeof gsap !== 'undefined') {
            gsap.to('.clock-item', { 
                y: -10, 
                duration: 2, 
                repeat: -1, 
                yoyo: true, 
                ease: 'power1.inOut',
                stagger: 0.1 
            });
        }
    }

    updateClocks() {
        this.clocks.forEach(clock => {
            const timezone = clock.dataset.timezone;
            const time = new Date().toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            clock.querySelector('.clock-time').textContent = time;
        });
    }
}

// Unit Converter
class UnitConverter {
    constructor() {
        this.currentTab = 'length';
        this.units = {
            length: { 'Meter': 1, 'Kilometer': 0.001, 'Centimeter': 100, 'Millimeter': 1000, 'Mile': 0.000621371, 'Yard': 1.09361, 'Foot': 3.28084, 'Inch': 39.3701 },
            weight: { 'Kilogram': 1, 'Gram': 1000, 'Pound': 2.20462, 'Ounce': 35.274, 'Ton': 0.001 },
            temperature: { 'Celsius': 'C', 'Fahrenheit': 'F', 'Kelvin': 'K' },
            speed: { 'm/s': 1, 'km/h': 3.6, 'mph': 2.23694, 'knot': 1.94384 },
            data: { 'Byte': 1, 'KB': 0.001, 'MB': 0.000001, 'GB': 0.000000001, 'TB': 0.000000000001 },
            currency: currencyRates
        };
        this.init();
        this.setupTab('length');
    }

    init() {
        document.querySelectorAll('.converter-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        let debounceTimer;
        document.getElementById('from-value').addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.convert(), 300);
        });
        document.getElementById('from-unit').addEventListener('change', () => this.convert());
        document.getElementById('to-unit').addEventListener('change', () => this.convert());
    }

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.converter-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        this.setupTab(tab);
    }

    setupTab(tab) {
        const fromSelect = document.getElementById('from-unit');
        const toSelect = document.getElementById('to-unit');

        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';

        Object.keys(this.units[tab]).forEach(unit => {
            fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        });

        // Set default selections
        toSelect.selectedIndex = 1;
        this.convert();
    }

    convert() {
        const fromValue = parseFloat(document.getElementById('from-value').value);
        const fromUnit = document.getElementById('from-unit').value;
        const toUnit = document.getElementById('to-unit').value;
        const toValue = document.getElementById('to-value');

        if (isNaN(fromValue)) {
            toValue.value = '';
            return;
        }

        let result;

        if (this.currentTab === 'temperature') {
            result = this.convertTemperature(fromValue, fromUnit, toUnit);
        } else {
            const fromRate = this.units[this.currentTab][fromUnit];
            const toRate = this.units[this.currentTab][toUnit];
            result = (fromValue / fromRate) * toRate;
        }

        toValue.value = result.toFixed(6);
    }

    convertTemperature(value, from, to) {
        let celsius;

        // Convert to Celsius first
        switch (from) {
            case 'Celsius':
                celsius = value;
                break;
            case 'Fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'Kelvin':
                celsius = value - 273.15;
                break;
        }

        // Convert from Celsius to target
        switch (to) {
            case 'Celsius':
                return celsius;
            case 'Fahrenheit':
                return celsius * 9/5 + 32;
            case 'Kelvin':
                return celsius + 273.15;
        }
    }
}

// Stopwatch & Timer
class StopwatchTimer {
    constructor() {
        this.isStopwatch = true;
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerDuration = 0;
        this.animationFrame = null;
        this.beep = document.getElementById('timer-beep');
        this.init();
    }

    init() {
        document.querySelectorAll('.st-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.tab));
        });

        document.getElementById('st-start').addEventListener('click', () => this.start());
        document.getElementById('st-pause').addEventListener('click', () => this.pause());
        document.getElementById('st-reset').addEventListener('click', () => this.reset());
    }

    switchMode(mode) {
        this.isStopwatch = mode === 'stopwatch';
        document.querySelectorAll('.st-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === mode);
        });

        document.querySelector('.timer-inputs').style.display = this.isStopwatch ? 'none' : 'flex';
        this.reset();
    }

    start() {
        if (this.isRunning) return;

        if (!this.isStopwatch) {
            const hours = parseInt(document.getElementById('timer-hours').value) || 0;
            const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
            const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
            this.timerDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
            if (this.timerDuration === 0) return;
        }

        this.isRunning = true;
        this.startTime = Date.now() - this.elapsedTime;
        if (this.beep) { this.beep.volume = 0.2; this.beep.play().catch(() => {}); }

        const animate = () => {
            if (!this.isRunning) return;
            
            const now = Date.now();
            if (this.isStopwatch) {
                this.elapsedTime = now - this.startTime;
            } else {
                this.elapsedTime = this.timerDuration - (now - this.startTime);
                if (this.elapsedTime <= 0) {
                    this.elapsedTime = 0;
                    this.pause();
                    this.updateDisplay();
                    if (this.beep) { this.beep.volume = 1.0; this.beep.play(); }
                    setTimeout(() => alert('Timer finished!'), 10);
                    return;
                }
            }
            this.updateDisplay();
            this.animationFrame = requestAnimationFrame(animate);
        };
        this.animationFrame = requestAnimationFrame(animate);
    }

    pause() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrame);
    }

    reset() {
        this.pause();
        this.elapsedTime = 0;
        this.startTime = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((this.elapsedTime % 1000) / 10);

        const display = document.getElementById('st-display');
        display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
}

// Quick Search Panel
class QuickSearch {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('search-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.search('google');
            }
        });

        document.querySelectorAll('.search-buttons .glass-btn').forEach(btn => {
            btn.addEventListener('click', () => this.search(btn.dataset.search));
        });
    }

    search(engine) {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (!query) {
            searchInput.focus();
            return;
        }

        let url;
        switch (engine) {
            case 'google':
                url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                break;
            case 'wikipedia':
                url = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`;
                break;
            case 'youtube':
                url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
                break;
        }

        window.open(url, '_blank');
    }
}

// PDF Toolkit Logic
class PDFToolkit {
    constructor() {
        this.activeSubtool = null;
        this.files = [];
        this.init();
    }

    init() {
        const uploadZone = document.getElementById('pdf-upload-zone');
        const fileInput = document.getElementById('pdf-file-input');
        const processBtn = document.getElementById('pdf-process-btn');

        document.querySelectorAll('.pdf-subtool-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchSubtool(btn.dataset.subtool, btn.textContent));
        });

        uploadZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        
        processBtn.addEventListener('click', () => this.process());

        // Setup PDF.js worker
        if (window['pdfjs-dist/build/pdf']) {
            window['pdfjs-dist/build/pdf'].GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    }

    switchSubtool(tool, name) {
        this.activeSubtool = tool;
        this.files = [];
        document.getElementById('pdf-action-area').style.display = 'block';
        document.getElementById('pdf-action-title').textContent = name;
        document.getElementById('pdf-file-list').innerHTML = '';
        document.getElementById('pdf-status').textContent = '';
        document.getElementById('pdf-preview-area').style.display = 'none';
        document.getElementById('pdf-preview-area').innerHTML = '';
        this.pagesToKeep = [];
        this.renderOptions();
    }

    renderOptions() {
        const container = document.getElementById('pdf-options');
        const fileInput = document.getElementById('pdf-file-input');
        container.innerHTML = '';
        
        // Enable multiple file selection for specific tools
        fileInput.multiple = ['merge', 'jpg-to-pdf', 'compare'].includes(this.activeSubtool);

        const placeholders = ['compress', 'pdf-to-word', 'html-to-pdf'];
        if (placeholders.includes(this.activeSubtool)) {
            this.showStatus("Note: This feature typically requires server-side processing. A demo placeholder is active.", false);
            return;
        }

        if (this.activeSubtool === 'protect') {
            container.innerHTML = `
                <div class="opt-group" style="text-align: left;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--secondary-color);">Set Access Password</label>
                    <input type="password" id="pdf-opt-pass" class="glass-input" placeholder="e.g. Secret123">
                </div>`;
        } else if (this.activeSubtool === 'unlock') {
            container.innerHTML = `
                <div class="opt-group" style="text-align: left;">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--secondary-color);">Enter Current Password</label>
                    <input type="password" id="pdf-opt-pass" class="glass-input" placeholder="Password required to decrypt">
                </div>`;
        } else if (this.activeSubtool === 'crop') {
            container.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <input type="number" id="crop-top" class="glass-input" placeholder="Top Margin" value="50">
                    <input type="number" id="crop-bottom" class="glass-input" placeholder="Bottom Margin" value="50">
                    <input type="number" id="crop-left" class="glass-input" placeholder="Left Margin" value="50">
                    <input type="number" id="crop-right" class="glass-input" placeholder="Right Margin" value="50">
                </div>`;
        } else if (this.activeSubtool === 'edit') {
            container.innerHTML = `<input type="text" id="pdf-opt-text" class="glass-input" placeholder="Text to add (Top-Left corner)" value="Edited with Tool Hub">`;
        } else if (this.activeSubtool === 'sign') {
            container.innerHTML = `
                <input type="text" id="pdf-opt-text" class="glass-input" placeholder="Signature Name" value="John Doe">
                <p style="font-size: 0.8rem; margin-top: 5px; color: var(--secondary-color);">Simplified: Adds text signature to first page.</p>`;
        } else if (this.activeSubtool === 'ocr') {
            container.innerHTML = `
                <p style="font-size: 0.8rem; color: var(--secondary-color); margin-bottom: 10px;">Uses Gemini AI to extract text from the first page.</p>
                <input type="password" id="pdf-api-key" class="glass-input" placeholder="Enter Gemini API Key">`;
        } else if (this.activeSubtool === 'compare') {
            container.innerHTML = `<p>Please upload two PDF files to compare their first pages.</p>`;
            document.getElementById('pdf-file-input').multiple = true;
        } else if (this.activeSubtool === 'watermark') {
            container.innerHTML = `<input type="text" id="pdf-opt-text" class="glass-input" placeholder="Watermark Text" value="CONFIDENTIAL">`;
        } else if (this.activeSubtool === 'split') {
            container.innerHTML = `<input type="text" id="pdf-opt-text" class="glass-input" placeholder="Page Range (e.g. 1, 3-5)">`;
        } else if (this.activeSubtool === 'rotate') {
            container.innerHTML = `
                <select id="pdf-opt-select" class="glass-select">
                    <option value="90">90° Clockwise</option>
                    <option value="180">180°</option>
                    <option value="270">270° Counter-Clockwise</option>
                </select>`;
        }
    }

    async handleFiles(fileList) {
        this.files = Array.from(fileList);
        const listContainer = document.getElementById('pdf-file-list');
        listContainer.innerHTML = this.files.map(f => `
            <div class="file-item">
                <span><i class="fas fa-file"></i> ${f.name}</span>
                <span>${(f.size / 1024).toFixed(1)} KB</span>
            </div>
        `).join('');

        if (this.activeSubtool === 'organize' && this.files.length > 0) {
            this.pagesToKeep = [];
            this.renderThumbnails();
        }
    }

    async renderThumbnails() {
        const previewArea = document.getElementById('pdf-preview-area');
        previewArea.style.display = 'block';
        previewArea.innerHTML = '<p>Generating page previews...</p><div class="pdf-thumbnail-grid"></div>';
        const grid = previewArea.querySelector('.pdf-thumbnail-grid');

        try {
            const pdfjs = window['pdfjs-dist/build/pdf'];
            const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                this.pagesToKeep.push(i - 1); // Track 0-indexed pages
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.height = viewport.height; canvas.width = viewport.width;
                await page.render({ canvasContext: ctx, viewport }).promise;
                
                const thumb = document.createElement('div');
                thumb.className = 'thumb-container';
                thumb.innerHTML = `<img src="${canvas.toDataURL()}" class="thumb-img"><p style="font-size:0.7rem; text-align:center">Page ${i}</p>`;
                thumb.onclick = () => {
                    thumb.style.opacity = thumb.style.opacity === '0.3' ? '1' : '0.3';
                    this.pagesToKeep = this.pagesToKeep.includes(i-1) ? this.pagesToKeep.filter(p => p !== i-1) : [...this.pagesToKeep, i-1].sort();
                };
                grid.appendChild(thumb);
            }
        } catch (e) {
            this.showStatus("Error generating previews", true);
        }
    }

    showStatus(msg, isError = false) {
        const el = document.getElementById('pdf-status');
        el.textContent = msg;
        el.style.color = isError ? '#ff5555' : '#00ff99';
    }

    async process() {
        if (this.files.length === 0) return this.showStatus("Please select files first", true);
        this.showStatus("Processing...");

        try {
            const { PDFDocument, rgb, degrees, StandardFonts } = window.PDFLib;
            
            if (this.activeSubtool === 'merge') {
                const mergedPdf = await PDFDocument.create();
                for (const file of this.files) {
                    const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach(p => mergedPdf.addPage(p));
                }
                this.download(await mergedPdf.save(), 'merged.pdf');

            } else if (this.activeSubtool === 'protect') {
                const pass = document.getElementById('pdf-opt-pass').value;
                if (!pass) throw new Error("A password is required to protect the PDF.");
                
                this.showStatus("Strong encryption requires secure processing. Uploading...");
                const apiKey = "remyandrade123@gmail.com_ufIHT440KEkQscu8i2Lf9kXyDVXkkHAjFpAk24mqyRl1g6VJG4VDpV9ra7TAOi3h";
                
                const formData = new FormData();
                formData.append("file", this.files[0]);

                const uploadRes = await fetch("https://api.pdf.co/v1/file/upload", {
                    method: "POST",
                    headers: { "x-api-key": apiKey },
                    body: formData
                });
                const uploadData = await uploadRes.json();

                if (uploadData.error) throw new Error(uploadData.message);

                this.showStatus("Encrypting PDF with AES-128...");
                const securityRes = await fetch("https://api.pdf.co/v1/pdf/security/add", {
                    method: "POST",
                    headers: { 
                        "x-api-key": apiKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: "protected_" + this.files[0].name,
                        url: uploadData.url,
                        userPassword: pass,
                        ownerPassword: pass,
                        encryptionAlgorithm: "AES128"
                    })
                });

                const securityResult = await securityRes.json();
                if (securityResult.error) throw new Error(securityResult.message);

                this.showStatus("Success! Downloading protected PDF...");
                const fileResponse = await fetch(securityResult.url);
                const blob = await fileResponse.blob();
                saveAs(blob, "protected_" + this.files[0].name);

            } else if (this.activeSubtool === 'unlock') {
                const pass = document.getElementById('pdf-opt-pass').value;
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { userPassword: pass, ignoreEncryption: true });
                this.download(await pdf.save(), 'unlocked.pdf');

            } else if (this.activeSubtool === 'crop') {
                const m = {
                    t: parseInt(document.getElementById('crop-top').value),
                    b: parseInt(document.getElementById('crop-bottom').value),
                    l: parseInt(document.getElementById('crop-left').value),
                    r: parseInt(document.getElementById('crop-right').value)
                };
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { ignoreEncryption: true });
                pdf.getPages().forEach(p => {
                    const { width, height } = p.getSize();
                    p.setCropBox(m.l, m.b, width - m.l - m.r, height - m.t - m.b);
                });
                this.download(await pdf.save(), 'cropped.pdf');

            } else if (this.activeSubtool === 'page-numbers') {
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { ignoreEncryption: true });
                const font = await pdf.embedFont(StandardFonts.Helvetica);
                const pages = pdf.getPages();
                pages.forEach((p, i) => {
                    p.drawText(`${i + 1} / ${pages.length}`, {
                        x: p.getSize().width / 2 - 20, y: 20, size: 12, font, color: rgb(0.5, 0.5, 0.5)
                    });
                });
                this.download(await pdf.save(), 'numbered.pdf');

            } else if (this.activeSubtool === 'edit' || this.activeSubtool === 'sign') {
                const text = document.getElementById('pdf-opt-text').value;
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { ignoreEncryption: true });
                const font = await pdf.embedFont(StandardFonts.HelveticaBold);
                const firstPage = pdf.getPages()[0];
                firstPage.drawText(text, { x: 50, y: firstPage.getSize().height - 50, size: 20, font, color: rgb(0, 0, 0.5) });
                this.download(await pdf.save(), 'edited.pdf');

            } else if (this.activeSubtool === 'compare') {
                if (this.files.length < 2) throw new Error("Select two files");
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const render = async (file, canvas) => {
                    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
                    const page = await pdf.getPage(1);
                    const vp = page.getViewport({ scale: 1.5 });
                    canvas.width = vp.width; canvas.height = vp.height;
                    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
                    return canvas.getContext('2d').getImageData(0, 0, vp.width, vp.height);
                };
                const d1 = await render(this.files[0], document.getElementById('pdf-compare-canvas1'));
                const d2 = await render(this.files[1], document.getElementById('pdf-compare-canvas2'));
                const diffCanvas = document.getElementById('pdf-compare-diff');
                diffCanvas.width = d1.width; diffCanvas.height = d1.height;
                const diffData = diffCanvas.getContext('2d').createImageData(d1.width, d1.height);
                window.pixelmatch(d1.data, d2.data, diffData.data, d1.width, d1.height, { threshold: 0.1 });
                diffCanvas.getContext('2d').putImageData(diffData, 0, 0);
                const preview = document.getElementById('pdf-preview-area');
                preview.style.display = 'block';
                preview.innerHTML = `<h3>Comparison Result (Differences in Red)</h3><img src="${diffCanvas.toDataURL()}" class="compare-result-img">`;

            } else if (this.activeSubtool === 'ocr') {
                const key = document.getElementById('pdf-api-key').value;
                if (!key) throw new Error("API Key required");
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
                const page = await pdf.getPage(1);
                const canvas = document.getElementById('pdf-hidden-canvas');
                const vp = page.getViewport({ scale: 2 });
                canvas.width = vp.width; canvas.height = vp.height;
                await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
                const base64 = canvas.toDataURL('image/png').split(',')[1];
                
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "Extract text from this image" }, { inlineData: { mimeType: "image/png", data: base64 } }] }]
                    })
                });
                const result = await response.json();
                const text = result.candidates[0].content.parts[0].text;
                const blob = new Blob([text], { type: "text/plain" });
                saveAs(blob, "extracted-text.txt");

            } else if (this.activeSubtool === 'organize') {
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { ignoreEncryption: true });
                const newPdf = await PDFDocument.create();
                const pages = await newPdf.copyPages(pdf, this.pagesToKeep);
                pages.forEach(p => newPdf.addPage(p));
                this.download(await newPdf.save(), 'organized.pdf');
                this.showStatus("Done!", false);
                return;

            } else if (this.activeSubtool === 'watermark') {
                const text = document.getElementById('pdf-opt-text').value;
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { ignoreEncryption: true });
                const font = await pdf.embedFont(StandardFonts.HelveticaBold);
                pdf.getPages().forEach(page => {
                    const { width, height } = page.getSize();
                    page.drawText(text, {
                        x: width / 2 - 100, y: height / 2, size: 50,
                        font, color: rgb(0.9, 0.1, 0.1), opacity: 0.3, rotate: degrees(-45)
                    });
                });
                this.download(await pdf.save(), 'watermarked.pdf');

            } else if (this.activeSubtool === 'rotate') {
                const rot = parseInt(document.getElementById('pdf-opt-select').value);
                const pdf = await PDFDocument.load(await this.files[0].arrayBuffer(), { ignoreEncryption: true });
                pdf.getPages().forEach(p => p.setRotation(degrees(p.getRotation().angle + rot)));
                this.download(await pdf.save(), 'rotated.pdf');

            } else if (this.activeSubtool === 'jpg-to-pdf') {
                const pdf = await PDFDocument.create();
                for (const file of this.files) {
                    const img = await pdf.embedJpg(await file.arrayBuffer());
                    const page = pdf.addPage([img.width, img.height]);
                    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
                }
                this.download(await pdf.save(), 'images.pdf');

            } else if (this.activeSubtool === 'pdf-to-jpg') {
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const loadingTask = pdfjs.getDocument({ data: await this.files[0].arrayBuffer() });
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.height = viewport.height; canvas.width = viewport.width;
                await page.render({ canvasContext: ctx, viewport }).promise;
                canvas.toBlob(blob => saveAs(blob, 'page1.jpg'), 'image/jpeg');
            }
            
            this.showStatus("Done!");
        } catch (e) {
            console.error(e);
            this.showStatus("Error: " + e.message, true);
        }
    }

    download(bytes, filename) {
        const blob = new Blob([bytes], { type: "application/pdf" });
        saveAs(blob, filename);
    }
}

// Initialize all tools when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP Animations if elements exist
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        if (document.querySelector('.main-header')) {
            tl.from('.main-header', { duration: 1.2, y: -50, opacity: 0, ease: 'power4.out' });
        }
        if (document.querySelectorAll('.tool-card').length > 0) {
            tl.from('.tool-card', { duration: 0.8, y: 50, opacity: 0, stagger: 0.1, ease: 'power3.out' }, '-=0.5');
        }
    }

    // Navigation Logic
    const toolsGrid = document.querySelector('.tools-grid');
    const toolsSection = document.getElementById('tools-section');
    const header = document.querySelector('.main-header');

    document.querySelectorAll('.use-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.tool-card');
            const toolId = card.dataset.tool;
            
            gsap.to([toolsGrid, header], { opacity: 0, y: -20, duration: 0.4, onComplete: () => {
                toolsGrid.style.display = 'none';
                header.style.display = 'none';
                toolsSection.style.display = 'block';
                gsap.fromTo(toolsSection, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            }});

            document.querySelectorAll('.tool-interface').forEach(el => {
                el.style.display = 'none';
            });
            document.getElementById(`${toolId}-tool`).style.display = 'block';
        });
    });

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Use immediate visibility reset for 'Back to Hub' to prevent "ghost" elements
            gsap.killTweensOf([toolsSection, toolsGrid, header]);
            gsap.to(toolsSection, { opacity: 0, y: 15, duration: 0.25, onComplete: () => {
                toolsSection.style.display = 'none';
                // Reset all tool visibility
                document.querySelectorAll('.tool-interface').forEach(ti => ti.style.display = 'none');
                
                toolsGrid.style.display = 'grid';
                header.style.display = 'block';
                gsap.fromTo([header, toolsGrid], 
                    { opacity: 0, y: -15 }, 
                    { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, clearProps: "all" }
                );
            }});
        });
    });

    if (document.getElementById('current')) new Calculator();
    if (document.getElementById('calendar-grid')) new HolidayCalendar();
    if (document.querySelector('.clock-item')) new WorldClock();
    if (document.getElementById('from-unit')) new UnitConverter();
    if (document.getElementById('st-display')) new StopwatchTimer();
    if (document.getElementById('pdftoolkit-tool')) new PDFToolkit();
    if (document.getElementById('search-input')) new QuickSearch();

    // Notepad Tool Logic
    if (document.getElementById('note')) {
        // Elements
        const noteArea = document.getElementById("note");
        const highlightLayer = document.getElementById("highlightLayer");
        const saveBtn = document.getElementById("saveBtn");
        const clearBtn = document.getElementById("clearBtn");
        const downloadBtn = document.getElementById("downloadBtn");
        const modeToggle = document.getElementById("modeToggle");
        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchBtn");
        const clearSearchBtn = document.getElementById("clearSearchBtn");
        const wordCount = document.getElementById("wordCount");
        const charCount = document.getElementById("charCount");
        const statusMsg = document.getElementById("statusMsg");
        const notesToolContainer = document.getElementById("notes-tool");

        // Functions
        function updateHighlight(searchTerm = "") {
            let text = noteArea.value;
            if (searchTerm) {
                const regex = new RegExp(`(${searchTerm})`, "gi");
                text = text.replace(regex, "<mark>$1</mark>");
            }
            highlightLayer.innerHTML = text || " ";
            highlightLayer.scrollTop = noteArea.scrollTop; // sync scroll
        }

        function updateCounter() {
            const text = noteArea.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            wordCount.textContent = `Words: ${words}`;
            charCount.textContent = `Characters: ${chars}`;
        }

        function showStatus(message) {
            statusMsg.textContent = message;
            statusMsg.style.opacity = 1;
            setTimeout(() => { statusMsg.style.opacity = 0; }, 2000);
        }

        // Load saved note + theme
        const savedNote = localStorage.getItem("myNote");
        const theme = localStorage.getItem("theme");

        if (savedNote) noteArea.value = savedNote;
        if (theme === "dark") notesToolContainer.classList.add("dark");

        updateHighlight();
        updateCounter();

        // Event Listeners
        saveBtn.addEventListener("click", () => {
            localStorage.setItem("myNote", noteArea.value);
            showStatus("✅ Note saved!");
        });

        noteArea.addEventListener("input", () => {
            localStorage.setItem("myNote", noteArea.value);
            updateHighlight(searchInput.value.trim());
            updateCounter();
            showStatus("💾 Auto-saved");
        });

        clearBtn.addEventListener("click", () => {
            noteArea.value = "";
            localStorage.removeItem("myNote");
            updateHighlight();
            updateCounter();
            showStatus("🧹 Note cleared");
        });

        downloadBtn.addEventListener("click", () => {
            const blob = new Blob([noteArea.value], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "note.txt";
            link.click();
            URL.revokeObjectURL(link.href);
            showStatus("⬇ Download started");
        });

        modeToggle.addEventListener("click", () => {
            notesToolContainer.classList.toggle("dark");
            const theme = notesToolContainer.classList.contains("dark") ? "dark" : "light";
            localStorage.setItem("theme", theme);
        });

        noteArea.addEventListener("scroll", () => {
            highlightLayer.scrollTop = noteArea.scrollTop;
        });

        searchBtn.addEventListener("click", () => {
            updateHighlight(searchInput.value.trim());
        });

        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            updateHighlight();
        });
    }

    // Liquid Glass Button Ripple Effect
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
