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
            currency: currencyRates,
            area: { 'Sq Meter': 1, 'Sq Kilometer': 0.000001, 'Sq Centimeter': 10000, 'Sq Foot': 10.7639, 'Sq Yard': 1.19599, 'Sq Mile': 3.861e-7, 'Acre': 0.000247105, 'Hectare': 0.0001 },
            volume: { 'Liter': 1, 'Milliliter': 1000, 'Cubic Meter': 0.001, 'Cubic Foot': 0.0353147, 'Cubic Inch': 61.0237, 'Gallon (US)': 0.264172, 'Quart (US)': 1.05669 },
            pressure: { 'Pascal': 1, 'Kilopascal': 0.001, 'Bar': 0.00001, 'PSI': 0.000145038, 'Atmosphere': 0.00000986923, 'Torr': 0.00750062 },
            energy: { 'Joule': 1, 'Kilojoule': 0.001, 'Calorie': 0.239006, 'Kilocalorie': 0.000239006, 'Watt-hour': 0.000277778, 'Kilowatt-hour': 2.77778e-7 },
            power: { 'Watt': 1, 'Kilowatt': 0.001, 'Megawatt': 0.000001, 'Horsepower': 0.00134102, 'BTU/hour': 3.41214 },
            force: { 'Newton': 1, 'Kilonewton': 0.001, 'Pound-force': 0.224809, 'Dyne': 100000, 'Kilogram-force': 0.101972 }
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
                    if (this.beep) { this.beep.volume = 1.0; this.beep.play().catch(() => {}); }
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
        this.wakeLock = null;
        this.viewerState = null;
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

        // Drag & drop support (the upload zone advertises this but it was never wired up)
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
                this.handleFiles(e.dataTransfer.files);
            }
        });

        processBtn.addEventListener('click', () => this.process());

        // Setup PDF.js worker
        if (window['pdfjs-dist/build/pdf']) {
            window['pdfjs-dist/build/pdf'].GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        // The Wake Lock API auto-releases when the tab is hidden (e.g. app switch).
        // Re-acquire it when the user comes back, but only while actively viewing a PDF.
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible' && this.activeSubtool === 'view' && !this.wakeLock && this.viewerState) {
                await this.acquireWakeLock();
            }
        });
    }

    switchSubtool(tool, name, opts = {}) {
        this._openSubtoolUI(tool, name);
        // Tell the global navigation controller a subtool was opened, so it can
        // manage browser/device Back for us - unless this call is itself the
        // result of the nav controller restoring state (e.g. after Forward).
        if (!opts.fromHistory && window.ToolshubNav) {
            window.ToolshubNav.enterSubtool('pdftoolkit', tool);
        }
    }

    // The actual DOM/UI work of opening a subtool panel. Kept separate from
    // switchSubtool() so history restoration can reuse it without re-pushing.
    _openSubtoolUI(tool, name) {
        // Leaving the viewer (or switching tools entirely): tidy up screen-wake and fullscreen state
        this.releaseWakeLock();
        if (document.fullscreenElement) {
            (document.exitFullscreen || document.webkitExitFullscreen)?.call(document).catch(() => {});
        }
        this.viewerState = null;

        this.activeSubtool = tool;
        this.files = [];
        const actionArea = document.getElementById('pdf-action-area');
        const fileInput = document.getElementById('pdf-file-input');
        const processBtn = document.getElementById('pdf-process-btn');
        actionArea.style.display = 'block';
        document.getElementById('pdf-action-title').textContent = name.trim();
        document.getElementById('pdf-file-list').innerHTML = '';
        document.getElementById('pdf-status').textContent = '';
        document.getElementById('pdf-preview-area').style.display = 'none';
        document.getElementById('pdf-preview-area').innerHTML = '';
        // The viewer has no "process" step - it renders as soon as a file is picked
        processBtn.style.display = (tool === 'view') ? 'none' : '';
        // Reset the raw <input> so switching tools never carries over a stale
        // file selection (and so re-selecting the same file always fires 'change').
        fileInput.value = '';
        this.editActions = [];
        this.pagesToKeep = [];
        this.renderOptions();

        // Automatically scroll the tool into view with optimized performance
        requestAnimationFrame(() => {
            actionArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Closes the currently-open subtool panel (Back/Escape from subtool level)
    // without opening a different one - releases the wake lock, exits
    // fullscreen, and cleans up any PDF rendering resources.
    closeSubtoolUI() {
        this.releaseWakeLock();
        if (document.fullscreenElement) {
            (document.exitFullscreen || document.webkitExitFullscreen)?.call(document).catch(() => {});
        }
        this.viewerState = null;
        this.activeSubtool = null;
        this.files = [];
        this.editActions = [];
        this.pagesToKeep = [];
        const actionArea = document.getElementById('pdf-action-area');
        if (actionArea) actionArea.style.display = 'none';
        const previewArea = document.getElementById('pdf-preview-area');
        if (previewArea) { previewArea.style.display = 'none'; previewArea.innerHTML = ''; }
        const fileList = document.getElementById('pdf-file-list');
        if (fileList) fileList.innerHTML = '';
        const fileInput = document.getElementById('pdf-file-input');
        if (fileInput) fileInput.value = '';
    }

    // True while a subtool panel (merge, split, view, etc.) is open.
    hasOpenSubtool() {
        return !!this.activeSubtool;
    }

    renderOptions() {
        const container = document.getElementById('pdf-options');
        const fileInput = document.getElementById('pdf-file-input');
        container.innerHTML = '';

        // Enable multiple file selection for Merge and Image-to-PDF
        fileInput.multiple = (this.activeSubtool === 'merge' || this.activeSubtool === 'image-to-pdf');
        // Restrict the file picker to sensible types per tool
        fileInput.accept = this.activeSubtool === 'image-to-pdf' ? 'image/*' : '.pdf,application/pdf';

        const subtoolConfigs = {
            protect: `<div class="opt-group"><label>Set Access Password</label><input type="password" id="pdf-opt-pass" class="glass-input" placeholder="e.g. Secret123"></div>
                <div class="opt-group"><label>PDF.co API Key</label><input type="text" id="pdf-opt-apikey" class="glass-input" placeholder="Your own free key from app.pdf.co" autocomplete="off"></div>
                <p style="opacity:0.6; font-size:0.8rem; grid-column:1/-1;">Used only for this request and never saved - you'll need to re-enter it next time.</p>`,
            unlock: `<div class="opt-group"><label>Enter Current Password</label><input type="password" id="pdf-opt-pass" class="glass-input" placeholder="Password to decrypt"></div>`,
            watermark: `<div class="opt-group"><label>Watermark Text</label><input type="text" id="pdf-opt-text" class="glass-input" placeholder="e.g. CONFIDENTIAL"></div>`,
            rotate: `<div class="opt-group"><label>Rotation Angle</label><select id="pdf-opt-select" class="glass-select"><option value="90">90° CW</option><option value="180">180°</option><option value="270">90° CCW</option></select></div>`,
            split: `<div class="opt-group"><label>Split Ranges (e.g. 1-3, 5)</label><input type="text" id="pdf-opt-text" class="glass-input" placeholder="Leave empty for all pages"></div>`,
            ocr: `<div class="opt-group"><label>OCR Languages (comma separated)</label><input type="text" id="pdf-opt-text" class="glass-input" value="eng"></div>`,
            rearrange: `<div class="opt-group"><label>New Page Order (e.g. 3,1,2,4)</label><input type="text" id="pdf-opt-text" class="glass-input" placeholder="3,1,2,4-10"></div>`,
            "remove-pages": `<div class="opt-group"><label>Pages to Remove (e.g. 1, 3-5)</label><input type="text" id="pdf-opt-text" class="glass-input" placeholder="e.g. 1,5"></div>`,
            "page-numbers": `<div class="opt-group"><label>Starting Number</label><input type="number" id="pdf-opt-num" class="glass-input" value="1"></div>`,
            edit: `<div class="opt-group"><label>Text to Add</label><input type="text" id="pdf-edit-text" class="glass-input" placeholder="Type here, then click the PDF preview" value="Sample Text"></div>`,
            "image-to-pdf": `<div class="opt-group"><label>Page Size</label><select id="pdf-opt-select" class="glass-select"><option value="fit">Fit to Image</option><option value="a4">A4 (centered)</option></select></div>`,
            compress: `<div class="opt-group">
                    <label>Compression Mode</label>
                    <select id="pdf-compress-mode" class="glass-select">
                        <option value="recommended" selected>Recommended — shrink images, keep text sharp</option>
                        <option value="light">Light — best quality, smaller savings</option>
                        <option value="strong">Strong — much smaller, some quality loss</option>
                        <option value="maximum">Maximum — flatten pages to images (best for scans)</option>
                        <option value="lossless">Lossless — structure cleanup only, zero quality loss</option>
                    </select>
                </div>
                <p style="opacity:0.65; font-size:0.85rem; grid-column:1/-1; margin-top:0.5rem; text-align:left;">
                    <strong>Recommended / Light / Strong</strong> re-encode and downsample the images already embedded in your PDF - text, fonts, links and layout are untouched and stay selectable.<br>
                    <strong>Maximum</strong> re-renders every page as a compressed picture for the smallest possible file - great for scans, but text is no longer selectable/searchable afterward.<br>
                    <strong>Lossless</strong> just repacks the file's internal structure with zero quality loss - works on any PDF, but gains are modest.
                </p>`,
            view: `<p style="opacity:0.7;">Opens a full-screen, page-by-page reader. Your screen won't sleep while you're reading.</p>`
        };

        if (subtoolConfigs[this.activeSubtool]) {
            container.innerHTML = subtoolConfigs[this.activeSubtool];
        }
    }

    async handleFiles(fileList) {
        const isImageTool = this.activeSubtool === 'image-to-pdf';
        let files = Array.from(fileList).filter(f => {
            return isImageTool
                ? f.type.startsWith('image/')
                : (f.type === 'application/pdf' || /\.pdf$/i.test(f.name));
        });

        if (files.length === 0) {
            this.showStatus(isImageTool ? "Please select image files (JPG, PNG, etc.)" : "Please select a PDF file", true);
            return;
        }

        // Tools other than Merge / Image-to-PDF only operate on a single file
        if (!(this.activeSubtool === 'merge' || isImageTool)) {
            files = [files[0]];
        }

        this.files = files;
        const listContainer = document.getElementById('pdf-file-list');
        listContainer.innerHTML = this.files.map(f => `
            <div class="file-item">
                <span><i class="fas fa-file"></i> ${f.name}</span>
                <span>${(f.size / 1024).toFixed(1)} KB</span>
            </div>
        `).join('');
        this.showStatus('');

        if (this.activeSubtool === 'edit' && this.files.length > 0) {
            this.renderEditor();
        }
        if (this.activeSubtool === 'view' && this.files.length > 0) {
            this.renderViewer();
        }
    }

    async renderEditor() {
        const preview = document.getElementById('pdf-preview-area');
        preview.style.display = 'block';
        preview.innerHTML = '<p style="margin-bottom:10px;">Click on the page below to place your text:</p><div class="pdf-editor-canvas-container"><canvas id="edit-canvas"></canvas></div>';
        
        const canvas = document.getElementById('edit-canvas');
        const ctx = canvas.getContext('2d');
        
        try {
            const pdfjs = window['pdfjs-dist/build/pdf'];
            const loadingTask = pdfjs.getDocument({ data: await this.files[0].arrayBuffer() });
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            
            // Auto-scale viewport to fit container width
            const containerWidth = preview.clientWidth || 300;
            const scale = (containerWidth - 20) / page.getViewport({ scale: 1 }).width;
            const viewport = page.getViewport({ scale: Math.min(scale, 1.2) });
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            
            canvas.onclick = (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const text = document.getElementById('pdf-edit-text').value;
                
                ctx.font = '20px Arial';
                ctx.fillStyle = 'red';
                ctx.fillText(text, x, y);
                this.editActions.push({ text, x, y, viewportWidth: canvas.width, viewportHeight: canvas.height });
            };
        } catch (e) {
            this.showStatus("Error loading preview", true);
        }
    }

    // --- Full-screen PDF Viewer ------------------------------------------------

    async renderViewer() {
        const preview = document.getElementById('pdf-preview-area');
        preview.style.display = 'block';
        preview.innerHTML = `
            <div id="pdf-viewer-wrap" class="pdf-viewer-wrap" tabindex="-1">
                <div class="pdf-viewer-toolbar">
                    <button id="pv-prev" class="glass-btn"><i class="fas fa-chevron-left"></i> Prev</button>
                    <span id="pv-page-indicator">Page 1 / 1</span>
                    <button id="pv-next" class="glass-btn">Next <i class="fas fa-chevron-right"></i></button>
                    <button id="pv-zoom-out" class="glass-btn"><i class="fas fa-search-minus"></i></button>
                    <button id="pv-zoom-in" class="glass-btn"><i class="fas fa-search-plus"></i></button>
                    <button id="pv-fullscreen" class="glass-btn"><i class="fas fa-expand"></i> Fullscreen</button>
                </div>
                <div class="pdf-viewer-canvas-container">
                    <canvas id="pv-canvas"></canvas>
                </div>
            </div>`;

        this.showStatus("Loading PDF...");
        try {
            const pdfjs = window['pdfjs-dist/build/pdf'];
            const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
            this.viewerState = { pdf, pageNum: 1, scale: 1.2 };

            document.getElementById('pv-prev').addEventListener('click', () => this.changeViewerPage(-1));
            document.getElementById('pv-next').addEventListener('click', () => this.changeViewerPage(1));
            document.getElementById('pv-zoom-in').addEventListener('click', () => this.zoomViewer(0.2));
            document.getElementById('pv-zoom-out').addEventListener('click', () => this.zoomViewer(-0.2));
            document.getElementById('pv-fullscreen').addEventListener('click', () => this.toggleViewerFullscreen());

            const wrap = document.getElementById('pdf-viewer-wrap');
            // Swipe / keyboard navigation for a smoother reading experience.
            // The wrap is focusable (tabindex above) so arrow keys work whether
            // or not the viewer is in fullscreen.
            wrap.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') this.changeViewerPage(1);
                if (e.key === 'ArrowLeft') this.changeViewerPage(-1);
            });
            wrap.focus({ preventScroll: true });

            // Keep the Fullscreen button's own label/icon in sync with reality -
            // it can also be exited via Escape or the browser/OS UI, not just this button.
            // Bound once per PDFToolkit instance (not per viewer open) to avoid
            // stacking duplicate document-level listeners across repeat views.
            if (!this._fullscreenListenerBound) {
                this._fullscreenListenerBound = true;
                document.addEventListener('fullscreenchange', () => this.syncFullscreenButton());
                document.addEventListener('webkitfullscreenchange', () => this.syncFullscreenButton());
            }

            this.setupPinchZoom(document.querySelector('.pdf-viewer-canvas-container'));

            await this.renderViewerPage();
            await this.acquireWakeLock();
            this.showStatus("");
        } catch (e) {
            this.showStatus("Couldn't open this PDF: " + e.message, true);
        }
    }

    // Keeps the toolbar's Fullscreen button label/icon matching the real
    // fullscreen state, however it changed (button, Escape, browser/OS chrome).
    syncFullscreenButton() {
        const btn = document.getElementById('pv-fullscreen');
        const wrap = document.getElementById('pdf-viewer-wrap');
        if (!btn || !wrap) return;
        const isFull = document.fullscreenElement === wrap || document.webkitFullscreenElement === wrap;
        btn.innerHTML = isFull
            ? '<i class="fas fa-compress"></i> Exit Fullscreen'
            : '<i class="fas fa-expand"></i> Fullscreen';
    }

    async renderViewerPage() {
        if (!this.viewerState) return;
        const { pdf, pageNum, scale } = this.viewerState;

        // Guard against out-of-order renders when zoom/page changes fire in quick
        // succession (e.g. during a pinch gesture or fast page flipping).
        const renderToken = (this._viewerRenderToken = (this._viewerRenderToken || 0) + 1);

        const page = await pdf.getPage(pageNum);

        // Render at the device's actual pixel density (capped, to keep memory sane
        // on very high-DPI phones) so text and lines stay sharp instead of blurry,
        // while the on-screen (CSS) size still matches the requested zoom level.
        const dpr = Math.min(window.devicePixelRatio || 1, 3);
        const cssViewport = page.getViewport({ scale });
        const renderViewport = page.getViewport({ scale: scale * dpr });

        const canvas = document.getElementById('pv-canvas');
        if (!canvas || renderToken !== this._viewerRenderToken) return;

        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        canvas.style.width = cssViewport.width + 'px';
        canvas.style.height = cssViewport.height + 'px';

        await page.render({ canvasContext: canvas.getContext('2d'), viewport: renderViewport }).promise;
        if (renderToken !== this._viewerRenderToken) return; // a newer render started while we awaited

        const indicator = document.getElementById('pv-page-indicator');
        if (indicator) indicator.textContent = `Page ${pageNum} / ${pdf.numPages}`;

        const prevBtn = document.getElementById('pv-prev');
        const nextBtn = document.getElementById('pv-next');
        if (prevBtn) prevBtn.disabled = (pageNum <= 1);
        if (nextBtn) nextBtn.disabled = (pageNum >= pdf.numPages);
    }

    changeViewerPage(delta) {
        if (!this.viewerState) return;
        const newPage = this.viewerState.pageNum + delta;
        if (newPage < 1 || newPage > this.viewerState.pdf.numPages) return;
        this.viewerState.pageNum = newPage;
        this.renderViewerPage();
    }

    zoomViewer(delta) {
        if (!this.viewerState) return;
        this.viewerState.scale = Math.min(3, Math.max(0.4, this.viewerState.scale + delta));
        this.renderViewerPage();
    }

    // Two-finger pinch-to-zoom for touch devices. The page's own viewport meta
    // disables native pinch-zoom (so the app can behave like a native reader),
    // so this reimplements it locally, scoped to the PDF canvas only.
    setupPinchZoom(container) {
        if (!container) return;
        let startDistance = null;
        let startScale = 1;

        const distance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.hypot(dx, dy);
        };

        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2 && this.viewerState) {
                startDistance = distance(e.touches);
                startScale = this.viewerState.scale;
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && startDistance && this.viewerState) {
                e.preventDefault();
                const factor = distance(e.touches) / startDistance;
                this.viewerState.scale = Math.min(3, Math.max(0.4, startScale * factor));
                if (!this._pinchRAF) {
                    this._pinchRAF = requestAnimationFrame(() => {
                        this._pinchRAF = null;
                        this.renderViewerPage();
                    });
                }
            }
        }, { passive: false });

        const endPinch = (e) => {
            if (e.touches.length < 2) startDistance = null;
        };
        container.addEventListener('touchend', endPinch);
        container.addEventListener('touchcancel', endPinch);
    }

    toggleViewerFullscreen() {
        const wrap = document.getElementById('pdf-viewer-wrap');
        if (!wrap) return;
        if (!document.fullscreenElement) {
            (wrap.requestFullscreen || wrap.webkitRequestFullscreen)?.call(wrap).catch(() => {});
            wrap.tabIndex = -1;
            wrap.focus();
        } else {
            (document.exitFullscreen || document.webkitExitFullscreen)?.call(document).catch(() => {});
        }
    }

    // Keeps the screen from sleeping while the person is reading a PDF.
    async acquireWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                const sentinel = await navigator.wakeLock.request('screen');
                this.wakeLock = sentinel;
                // The OS/browser can release the lock on its own (low battery, screen
                // dims, etc.) without us calling releaseWakeLock(). Listen so our
                // internal state stays accurate - otherwise the auto re-acquire on
                // visibilitychange below would think a lock is still held and skip it.
                // Guarded against a stale event from an older sentinel clobbering a
                // newer one if release/re-acquire happen in quick succession.
                sentinel.addEventListener('release', () => {
                    if (this.wakeLock === sentinel) this.wakeLock = null;
                });
            }
        } catch (e) {
            // Not fatal - some browsers/contexts (e.g. non-HTTPS, low battery) refuse this.
            console.warn('Wake Lock unavailable:', e.message);
        }
    }

    releaseWakeLock() {
        if (this.wakeLock) {
            this.wakeLock.release().catch(() => {});
            this.wakeLock = null;
        }
    }

    showStatus(msg, isError = false) {
        const el = document.getElementById('pdf-status');
        el.textContent = msg;
        el.style.color = isError ? '#ff5555' : '#00ff99';
    }

    // Helper to parse ranges like "1, 3-5" into [0, 2, 3, 4]
    parsePageRange(rangeStr, maxPages) {
        const pages = new Set();
        const parts = rangeStr.split(',');
        parts.forEach(part => {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(n => parseInt(n.trim()));
                for (let i = start; i <= end; i++) if (i > 0 && i <= maxPages) pages.add(i - 1);
            } else {
                const n = parseInt(part.trim());
                if (n > 0 && n <= maxPages) pages.add(n - 1);
            }
        });
        return Array.from(pages).sort((a, b) => a - b);
    }

    // Escape text for safe inclusion inside XML nodes (used by the docx builder)
    escapeXml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    // Build a minimal, valid .docx (OOXML) package from plain text so "PDF to Word"
    // produces a file Word/LibreOffice can actually open, instead of a mislabeled .doc.
    async buildDocxFromText(text) {
        const paragraphs = text.split('\n').map(line => {
            const safe = this.escapeXml(line.length ? line : ' ');
            return `<w:p><w:r><w:t xml:space="preserve">${safe}</w:t></w:r></w:p>`;
        }).join('');

        const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>`;

        const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;

        const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;

        const zip = new JSZip();
        zip.file("[Content_Types].xml", contentTypes);
        zip.folder("_rels").file(".rels", rels);
        zip.folder("word").file("document.xml", documentXml);
        return zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    }

    // Embed any common image type into a pdf-lib document. pdf-lib only natively
    // supports PNG/JPG, so anything else is re-encoded to PNG via canvas first.
    async imageFileToEmbeddable(pdfDoc, file) {
        const type = (file.type || '').toLowerCase();
        if (type === 'image/png') {
            return pdfDoc.embedPng(await file.arrayBuffer());
        }
        if (type === 'image/jpeg' || type === 'image/jpg') {
            return pdfDoc.embedJpg(await file.arrayBuffer());
        }

        // Fallback for webp/gif/bmp/etc: draw to a canvas and re-encode as PNG
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        const img = await new Promise((resolve, reject) => {
            const el = new Image();
            el.onload = () => resolve(el);
            el.onerror = () => reject(new Error(`Unsupported or corrupt image: ${file.name}`));
            el.src = dataUrl;
        });
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);
        const pngDataUrl = canvas.toDataURL('image/png');
        const pngBytes = Uint8Array.from(atob(pngDataUrl.split(',')[1]), c => c.charCodeAt(0));
        return pdfDoc.embedPng(pngBytes);
    }

    async process() {
        if (this.files.length === 0) return this.showStatus("Please select files first", true);

        const processBtn = document.getElementById('pdf-process-btn');
        const originalBtnText = processBtn.textContent;
        processBtn.disabled = true;
        processBtn.style.opacity = '0.6';
        processBtn.textContent = 'Processing...';
        this.showStatus("Processing...");

        try {
            const { PDFDocument, rgb, degrees, StandardFonts } = window.PDFLib;

            if (this.activeSubtool === 'merge') {
                const mergedPdf = await PDFDocument.create();
                for (const file of this.files) {
                    const donorPdf = await PDFDocument.load(await file.arrayBuffer());
                    const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
                    pages.forEach(p => mergedPdf.addPage(p));
                }
                this.download(await mergedPdf.save(), 'merged.pdf');

            } else if (this.activeSubtool === 'split') {
                const range = document.getElementById('pdf-opt-text').value;
                const sourcePdf = await PDFDocument.load(await this.files[0].arrayBuffer());
                const indices = range ? this.parsePageRange(range, sourcePdf.getPageCount()) : sourcePdf.getPageIndices();
                const newPdf = await PDFDocument.create();
                const pages = await newPdf.copyPages(sourcePdf, indices);
                pages.forEach(p => newPdf.addPage(p));
                this.download(await newPdf.save(), 'split.pdf');

            } else if (this.activeSubtool === 'rotate') {
                const angle = parseInt(document.getElementById('pdf-opt-select').value);
                const pdfDoc = await PDFDocument.load(await this.files[0].arrayBuffer());
                pdfDoc.getPages().forEach(p => p.setRotation(degrees(p.getRotation().angle + angle)));
                this.download(await pdfDoc.save(), 'rotated.pdf');

            } else if (this.activeSubtool === 'rearrange') {
                const orderStr = document.getElementById('pdf-opt-text').value;
                const sourcePdf = await PDFDocument.load(await this.files[0].arrayBuffer());
                const indices = orderStr.split(',').map(n => parseInt(n.trim()) - 1).filter(n => n >= 0 && n < sourcePdf.getPageCount());
                const newPdf = await PDFDocument.create();
                const pages = await newPdf.copyPages(sourcePdf, indices);
                pages.forEach(p => newPdf.addPage(p));
                this.download(await newPdf.save(), 'reorganized.pdf');

            } else if (this.activeSubtool === 'remove-pages') {
                const range = document.getElementById('pdf-opt-text').value;
                const pdfDoc = await PDFDocument.load(await this.files[0].arrayBuffer());
                const toRemove = this.parsePageRange(range, pdfDoc.getPageCount());
                toRemove.reverse().forEach(idx => pdfDoc.removePage(idx));
                this.download(await pdfDoc.save(), 'cleaned.pdf');

            } else if (this.activeSubtool === 'watermark') {
                const text = document.getElementById('pdf-opt-text').value;
                const pdfDoc = await PDFDocument.load(await this.files[0].arrayBuffer());
                const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
                pdfDoc.getPages().forEach(page => {
                    page.drawText(text, {
                        x: page.getWidth() / 4, y: page.getHeight() / 2,
                        size: 50, font, color: rgb(0.7, 0.7, 0.7), opacity: 0.4, rotate: degrees(45)
                    });
                });
                this.download(await pdfDoc.save(), 'watermarked.pdf');

            } else if (this.activeSubtool === 'page-numbers') {
                const startNum = parseInt(document.getElementById('pdf-opt-num').value) || 1;
                const pdfDoc = await PDFDocument.load(await this.files[0].arrayBuffer());
                pdfDoc.getPages().forEach((page, i) => {
                    page.drawText(`${startNum + i}`, { x: page.getWidth() / 2, y: 20, size: 12 });
                });
                this.download(await pdfDoc.save(), 'numbered.pdf');

            } else if (this.activeSubtool === 'pdf-to-img') {
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
                this.showStatus(`Converting ${pdf.numPages} pages...`);
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 2.0 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: context, viewport: viewport }).promise;
                    const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.8));
                    saveAs(blob, `page_${i}.jpg`);
                }

            } else if (this.activeSubtool === 'pdf-to-word') {
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
                let fullText = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    this.showStatus(`Extracting page ${i} of ${pdf.numPages}...`);
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    fullText += content.items.map(item => item.str).join(' ') + "\n\n";
                }
                if (typeof JSZip === 'undefined') {
                    // Graceful fallback if the docx builder library didn't load
                    const blob = new Blob([fullText], { type: "text/plain" });
                    saveAs(blob, this.files[0].name.replace(/\.pdf$/i, '.txt'));
                } else {
                    this.showStatus("Building Word document...");
                    const blob = await this.buildDocxFromText(fullText);
                    saveAs(blob, this.files[0].name.replace(/\.pdf$/i, '.docx'));
                }

            } else if (this.activeSubtool === 'image-to-pdf') {
                if (this.files.length === 0) throw new Error("Please add at least one image.");
                const pageMode = document.getElementById('pdf-opt-select')?.value || 'fit';
                const pdfDoc = await PDFDocument.create();
                for (const file of this.files) {
                    this.showStatus(`Adding ${file.name}...`);
                    const image = await this.imageFileToEmbeddable(pdfDoc, file);
                    if (pageMode === 'a4') {
                        const A4_W = 595.28, A4_H = 841.89;
                        const page = pdfDoc.addPage([A4_W, A4_H]);
                        const scale = Math.min(A4_W / image.width, A4_H / image.height);
                        const w = image.width * scale, h = image.height * scale;
                        page.drawImage(image, { x: (A4_W - w) / 2, y: (A4_H - h) / 2, width: w, height: h });
                    } else {
                        const page = pdfDoc.addPage([image.width, image.height]);
                        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
                    }
                }
                this.download(await pdfDoc.save(), 'images-to-pdf.pdf');

            } else if (this.activeSubtool === 'compress') {
                const mode = document.getElementById('pdf-compress-mode')?.value || 'recommended';
                const originalFile = this.files[0];
                const originalBytes = new Uint8Array(await originalFile.arrayBuffer());

                if (mode === 'maximum') {
                    // Strongest possible reduction: re-render every page as a
                    // single compressed JPEG and rebuild the PDF from those
                    // images. Best for scans/photo-heavy files; text is no
                    // longer selectable in the result.
                    const bytes = await this.rasterizePdfToImages(originalFile, { scale: 1.5, quality: 0.6 });
                    this.finishCompress(bytes, originalBytes, originalFile.name);
                    return;
                }

                const { PDFName, PDFRawStream, PDFNumber } = window.PDFLib;
                const pdfDoc = await PDFDocument.load(originalBytes.slice(), { updateMetadata: false });

                if (mode !== 'lossless') {
                    // Recompress/downsample the JPEGs already embedded in the
                    // PDF in place - this is what actually shrinks real-world
                    // PDFs, since images are almost always 80-90% of the
                    // file's weight. Text, fonts and vector graphics are
                    // never touched.
                    const preset = {
                        light:       { quality: 0.85, maxDim: 2000 },
                        recommended: { quality: 0.72, maxDim: 1600 },
                        strong:      { quality: 0.55, maxDim: 1200 },
                    }[mode] || { quality: 0.72, maxDim: 1600 };

                    const result = await this.recompressPdfImages(pdfDoc, preset, { PDFName, PDFRawStream, PDFNumber });
                    this.showStatus(result.total > 0
                        ? `Recompressed ${result.processed} of ${result.total} image${result.total === 1 ? '' : 's'}. Finalizing...`
                        : 'No re-compressible images found - cleaning up file structure...');
                }

                // useObjectStreams packs the PDF's own objects more tightly,
                // which is "free" savings on top of the image work above -
                // and is also all that Lossless mode does by itself.
                const bytes = await pdfDoc.save({ useObjectStreams: true });
                this.finishCompress(bytes, originalBytes, originalFile.name);
                return;

            } else if (this.activeSubtool === 'pdf-to-text') {
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
                let fullText = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    fullText += content.items.map(item => item.str).join(' ') + "\n\n";
                }
                const blob = new Blob([fullText], { type: "text/plain" });
                saveAs(blob, 'extracted_text.txt');

            } else if (this.activeSubtool === 'edit') {
                if (this.editActions.length === 0) throw new Error("Please click on the PDF to add text first.");
                const pdfDoc = await PDFDocument.load(await this.files[0].arrayBuffer());
                const page = pdfDoc.getPage(0);
                const { width, height } = page.getSize();
                const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                for (const action of this.editActions) {
                    const pdfX = (action.x / action.viewportWidth) * width;
                    const pdfY = height - ((action.y / action.viewportHeight) * height);
                    page.drawText(action.text, { x: pdfX, y: pdfY, size: 20, font, color: rgb(1, 0, 0) });
                }
                this.download(await pdfDoc.save(), 'edited.pdf');

            } else if (this.activeSubtool === 'ocr') {
                if (typeof Tesseract === 'undefined') throw new Error("OCR engine failed to load. Check your internet connection and try again.");
                const langs = (document.getElementById('pdf-opt-text').value.trim() || 'eng').split(',').map(s => s.trim()).filter(Boolean).join('+');
                const pdfjs = window['pdfjs-dist/build/pdf'];
                const pdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer() }).promise;
                const worker = await Tesseract.createWorker(langs);
                let fullText = "";
                try {
                    for (let i = 1; i <= pdf.numPages; i++) {
                        this.showStatus(`Scanning page ${i} of ${pdf.numPages}...`);
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 2.5 });
                        const canvas = document.createElement('canvas');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                        const { data: { text } } = await worker.recognize(canvas);
                        fullText += `--- Page ${i} ---\n${text}\n\n`;
                    }
                } finally {
                    await worker.terminate();
                }
                const blob = new Blob([fullText], { type: "text/plain" });
                saveAs(blob, this.files[0].name.replace(/\.pdf$/i, '') + '_ocr.txt');
                this.showStatus("Done! OCR text extracted to a .txt file.");
                return;

            } else if (this.activeSubtool === 'repair') {
                this.showStatus("Attempting to recover PDF structure...");
                let pdfDoc;
                try {
                    pdfDoc = await PDFDocument.load(await this.files[0].arrayBuffer(), {
                        ignoreEncryption: true,
                        throwOnInvalidObject: false,
                        updateMetadata: false
                    });
                } catch (e) {
                    throw new Error("This PDF is too damaged to recover locally: " + e.message);
                }
                const bytes = await pdfDoc.save({ useObjectStreams: false });
                this.download(bytes, 'repaired_' + this.files[0].name);
                this.showStatus("Done! Structure re-parsed and re-saved. Severe corruption may need dedicated recovery tools.");
                return;

            } else if (this.activeSubtool === 'unlock') {
                const pass = document.getElementById('pdf-opt-pass').value;
                this.showStatus("Decrypting...");
                const pdfjs = window['pdfjs-dist/build/pdf'];
                let srcPdf;
                try {
                    srcPdf = await pdfjs.getDocument({ data: await this.files[0].arrayBuffer(), password: pass }).promise;
                } catch (e) {
                    throw new Error("Incorrect password, or this PDF uses unsupported encryption.");
                }
                const newPdf = await PDFDocument.create();
                for (let i = 1; i <= srcPdf.numPages; i++) {
                    this.showStatus(`Rebuilding page ${i} of ${srcPdf.numPages}...`);
                    const page = await srcPdf.getPage(i);
                    const viewport = page.getViewport({ scale: 2.0 });
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                    const pngDataUrl = canvas.toDataURL('image/png');
                    const pngBytes = Uint8Array.from(atob(pngDataUrl.split(',')[1]), c => c.charCodeAt(0));
                    const image = await newPdf.embedPng(pngBytes);
                    const newPage = newPdf.addPage([viewport.width, viewport.height]);
                    newPage.drawImage(image, { x: 0, y: 0, width: viewport.width, height: viewport.height });
                }
                this.download(await newPdf.save(), 'unlocked.pdf');
                this.showStatus("Done! Password removed. Note: the output is image-based, so text is no longer selectable.");
                return;

            } else if (this.activeSubtool === 'protect') {
                const pass = document.getElementById('pdf-opt-pass').value;
                const apiKey = (document.getElementById('pdf-opt-apikey').value || '').trim();
                if (!pass) throw new Error("A password is required to protect the PDF.");
                if (!apiKey) throw new Error("Please enter a PDF.co API key (get a free one at app.pdf.co).");
                // Note: intentionally not persisted to localStorage - API keys are sensitive
                // and are only kept in memory for the duration of this one request.
                this.showStatus("Strong encryption requires secure processing. Uploading...");
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
                    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
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
            } else {
                throw new Error("This specific tool hasn't been implemented for local processing yet.");
            }
            this.showStatus("Done!");
        } catch (e) {
            console.error(e);
            this.showStatus("Error: " + e.message, true);
        } finally {
            processBtn.disabled = false;
            processBtn.style.opacity = '';
            processBtn.textContent = originalBtnText;
        }
    }

    // --- PDF Compression -------------------------------------------------
    // Walks every indirect object in the PDF looking for embedded JPEG
    // images (Filter /DCTDecode), and re-encodes each one at a lower
    // resolution/quality via <canvas>. Only plain, opaque JPEGs are
    // touched - anything with a soft mask (transparency), an indexed
    // palette, or a stencil mask is left completely alone so we never
    // risk corrupting an image we can't safely rebuild. Text, vector
    // graphics, fonts, links and form fields are never modified.
    async recompressPdfImages(pdfDoc, preset, { PDFName, PDFRawStream, PDFNumber }) {
        const targets = [];
        for (const [, obj] of pdfDoc.context.enumerateIndirectObjects()) {
            if (!(obj instanceof PDFRawStream)) continue;
            try {
                const { dict } = obj;
                const subtype = dict.get(PDFName.of('Subtype'));
                if (!(subtype instanceof PDFName) || subtype.toString() !== '/Image') continue;
                if (dict.get(PDFName.of('SMask'))) continue;      // has transparency - resizing would desync the mask
                if (dict.get(PDFName.of('Mask'))) continue;       // explicit mask reference - same risk
                if (dict.get(PDFName.of('ImageMask'))) continue;  // 1-bit stencil, not a photo

                const colorSpace = dict.get(PDFName.of('ColorSpace'));
                if (colorSpace && colorSpace.toString().includes('Indexed')) continue; // palette image - re-encoding would corrupt colors

                const filter = dict.get(PDFName.of('Filter'));
                if (!(filter instanceof PDFName) || filter.toString() !== '/DCTDecode') continue; // only re-touch images that are already JPEGs

                targets.push(obj);
            } catch (e) {
                // Any oddly-structured object is simply skipped, not fatal.
            }
        }

        let processed = 0;
        for (let i = 0; i < targets.length; i++) {
            const obj = targets[i];
            this.showStatus(`Recompressing image ${i + 1} of ${targets.length}...`);
            try {
                const result = await this.recompressSingleImage(obj.contents, preset);
                if (result && result.bytes.length < obj.contents.length) {
                    obj.contents = result.bytes;
                    obj.dict.set(PDFName.of('Width'), PDFNumber.of(result.width));
                    obj.dict.set(PDFName.of('Height'), PDFNumber.of(result.height));
                    obj.dict.set(PDFName.of('BitsPerComponent'), PDFNumber.of(8));
                    obj.dict.set(PDFName.of('ColorSpace'), PDFName.of('DeviceRGB'));
                    obj.dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'));
                    obj.dict.delete(PDFName.of('DecodeParms'));
                    obj.dict.delete(PDFName.of('Decode'));
                    processed++;
                }
            } catch (e) {
                console.warn('Skipped one image during compression:', e);
            }
        }
        return { processed, total: targets.length };
    }

    // Decodes one embedded JPEG, downsamples it to preset.maxDim on its
    // longest edge (never upscales), and re-encodes it at preset.quality.
    async recompressSingleImage(rawBytes, preset) {
        const blob = new Blob([rawBytes], { type: 'image/jpeg' });
        let bitmap;
        try {
            bitmap = await createImageBitmap(blob);
        } catch (e) {
            return null; // not a decodable JPEG (corrupt or CMYK JPEG some browsers reject) - leave untouched
        }
        const scale = Math.min(1, preset.maxDim / Math.max(bitmap.width, bitmap.height));
        const width = Math.max(1, Math.round(bitmap.width * scale));
        const height = Math.max(1, Math.round(bitmap.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close?.();

        const outBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', preset.quality));
        if (!outBlob) return null;
        const bytes = new Uint8Array(await outBlob.arrayBuffer());
        return { bytes, width, height };
    }

    // Maximum mode: re-renders every page to a canvas via pdf.js and
    // rebuilds a brand-new PDF from those JPEGs with pdf-lib. Produces the
    // smallest possible file for scans/photo-heavy PDFs at the cost of
    // selectable text.
    async rasterizePdfToImages(file, opts) {
        const pdfjs = window['pdfjs-dist/build/pdf'];
        const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
        const { PDFDocument } = window.PDFLib;
        const newPdf = await PDFDocument.create();

        for (let i = 1; i <= pdf.numPages; i++) {
            this.showStatus(`Flattening page ${i} of ${pdf.numPages}...`);
            const page = await pdf.getPage(i);
            const renderViewport = page.getViewport({ scale: opts.scale });
            const canvas = document.createElement('canvas');
            canvas.width = renderViewport.width;
            canvas.height = renderViewport.height;
            await page.render({ canvasContext: canvas.getContext('2d'), viewport: renderViewport }).promise;

            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', opts.quality));
            const bytes = new Uint8Array(await blob.arrayBuffer());
            const image = await newPdf.embedJpg(bytes);

            // Keep the page's real point-size (independent of render scale)
            // so the output document is the same physical page size.
            const pageSize = page.getViewport({ scale: 1 });
            const newPage = newPdf.addPage([pageSize.width, pageSize.height]);
            newPage.drawImage(image, { x: 0, y: 0, width: pageSize.width, height: pageSize.height });
        }
        return newPdf.save({ useObjectStreams: true });
    }

    // Reports the before/after size and downloads the result. If, on rare
    // occasions (e.g. an already-optimized PDF), the "compressed" output
    // ends up no smaller than the original, we hand back the untouched
    // original instead of a bigger file.
    finishCompress(newBytes, originalBytes, originalName) {
        const fmt = (n) => (n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`);
        const originalSize = originalBytes.byteLength || originalBytes.length;
        const newSize = newBytes.byteLength || newBytes.length;
        const baseName = (originalName || 'file.pdf').replace(/\.pdf$/i, '');

        if (newSize >= originalSize) {
            this.showStatus(`Already optimized — no further reduction possible without more quality loss (${fmt(originalSize)}).`);
            this.download(originalBytes, `compressed_${baseName}.pdf`);
            return;
        }

        const savedPct = Math.round((1 - newSize / originalSize) * 100);
        this.showStatus(`Done! ${fmt(originalSize)} → ${fmt(newSize)} (${savedPct}% smaller).`);
        this.download(newBytes, `compressed_${baseName}.pdf`);
    }

    download(bytes, filename) {
        const blob = new Blob([bytes], { type: "application/pdf" });
        saveAs(blob, filename);
    }
}

// QR Code Generator
class QRCodeTool {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('qr-generate').addEventListener('click', () => this.generate());
        document.getElementById('qr-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.generate();
        });
        document.getElementById('qr-download').addEventListener('click', () => this.download());
    }

    generate() {
        const text = document.getElementById('qr-input').value.trim();
        const size = parseInt(document.getElementById('qr-size').value);
        const output = document.getElementById('qr-output');
        const downloadBtn = document.getElementById('qr-download');
        output.innerHTML = '';
        downloadBtn.style.display = 'none';

        if (!text) {
            output.innerHTML = '<p style="opacity:0.7;">Enter some text or a URL first.</p>';
            return;
        }
        if (typeof QRCode === 'undefined') {
            output.innerHTML = '<p style="color:#ff5555;">QR engine failed to load. Check your internet connection.</p>';
            return;
        }

        new QRCode(output, { text, width: size, height: size, correctLevel: QRCode.CorrectLevel.M });
        downloadBtn.style.display = 'inline-block';
    }

    download() {
        const canvas = document.querySelector('#qr-output canvas');
        const img = document.querySelector('#qr-output img');
        const src = canvas ? canvas.toDataURL('image/png') : (img ? img.src : null);
        if (!src) return;
        const a = document.createElement('a');
        a.href = src;
        a.download = 'qrcode.png';
        a.click();
    }
}

// Password Generator
class PasswordGenerator {
    constructor() {
        this.init();
        this.generate();
    }

    init() {
        document.getElementById('pw-generate').addEventListener('click', () => this.generate());
        document.getElementById('pw-length').addEventListener('input', (e) => {
            document.getElementById('pw-length-val').textContent = e.target.value;
            this.generate();
        });
        ['pw-upper', 'pw-lower', 'pw-numbers', 'pw-symbols'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.generate());
        });
        document.getElementById('pw-copy').addEventListener('click', () => this.copy());
    }

    generate() {
        const length = parseInt(document.getElementById('pw-length').value);
        const sets = [];
        if (document.getElementById('pw-upper').checked) sets.push('ABCDEFGHJKLMNPQRSTUVWXYZ');
        if (document.getElementById('pw-lower').checked) sets.push('abcdefghijkmnpqrstuvwxyz');
        if (document.getElementById('pw-numbers').checked) sets.push('23456789');
        if (document.getElementById('pw-symbols').checked) sets.push('!@#$%^&*()-_=+[]{}');

        const output = document.getElementById('pw-output');
        if (sets.length === 0) {
            output.textContent = 'Select at least one character type';
            return;
        }

        const allChars = sets.join('');
        const randomBytes = new Uint32Array(Math.max(length, sets.length));
        crypto.getRandomValues(randomBytes);

        // Guarantee at least one character from every selected set, then fill the rest
        let chars = sets.map((set, i) => set[randomBytes[i] % set.length]);
        for (let i = sets.length; i < length; i++) {
            chars.push(allChars[randomBytes[i] % allChars.length]);
        }

        // Fisher-Yates shuffle using crypto-grade randomness
        const shuffleRand = new Uint32Array(chars.length);
        crypto.getRandomValues(shuffleRand);
        for (let i = chars.length - 1; i > 0; i--) {
            const j = shuffleRand[i] % (i + 1);
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }

        output.textContent = chars.join('');
    }

    copy() {
        const text = document.getElementById('pw-output').textContent;
        if (!text || !navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('pw-copy');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { btn.innerHTML = original; }, 1200);
        }).catch(() => {});
    }
}

// BMI Calculator
class BMICalculator {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('bmi-calc').addEventListener('click', () => this.calculate());
        ['bmi-weight', 'bmi-height'].forEach(id => {
            document.getElementById(id).addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.calculate();
            });
        });
    }

    calculate() {
        const unit = document.getElementById('bmi-unit').value;
        let weight = parseFloat(document.getElementById('bmi-weight').value);
        let height = parseFloat(document.getElementById('bmi-height').value);
        const result = document.getElementById('bmi-result');

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            result.innerHTML = '<p style="color:#ff5555;">Please enter a valid weight and height.</p>';
            return;
        }

        if (unit === 'imperial') {
            weight *= 0.453592; // lb -> kg
            height *= 2.54;     // in -> cm
        }

        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);

        let category, color;
        if (bmi < 18.5) { category = 'Underweight'; color = '#6c9cf4'; }
        else if (bmi < 25) { category = 'Normal weight'; color = '#00ff99'; }
        else if (bmi < 30) { category = 'Overweight'; color = '#ffcc00'; }
        else { category = 'Obese'; color = '#ff5555'; }

        result.innerHTML = `<h3 style="color:${color};">${bmi.toFixed(1)}</h3><p>${category}</p>`;
    }
}

// Age Calculator
class AgeCalculator {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('age-calc').addEventListener('click', () => this.calculate());
        document.getElementById('age-dob').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.calculate();
        });
    }

    calculate() {
        const dobStr = document.getElementById('age-dob').value;
        const result = document.getElementById('age-result');

        if (!dobStr) {
            result.innerHTML = '<p style="color:#ff5555;">Please pick a date of birth.</p>';
            return;
        }

        const dob = new Date(dobStr);
        const now = new Date();
        if (dob > now) {
            result.innerHTML = '<p style="color:#ff5555;">That date is in the future.</p>';
            return;
        }

        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
        result.innerHTML = `<h3>${years}y ${months}m ${days}d</h3><p>Total: ${totalDays.toLocaleString()} days</p>`;
    }
}

// Number Base Converter (Binary / Octal / Decimal / Hex) - live, two-way conversion
class BaseConverter {
    constructor() {
        this.radices = { dec: 10, bin: 2, oct: 8, hex: 16 };
        this.validators = {
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            10: /^[0-9]+$/,
            16: /^[0-9a-fA-F]+$/
        };
        this.init();
    }

    init() {
        Object.keys(this.radices).forEach(key => {
            document.getElementById(`base-${key}`).addEventListener('input', (e) => this.convert(key, e.target.value));
        });
    }

    convert(sourceKey, rawValue) {
        const value = rawValue.trim();

        if (value === '') {
            Object.keys(this.radices).forEach(k => {
                if (k !== sourceKey) document.getElementById(`base-${k}`).value = '';
            });
            return;
        }

        const radix = this.radices[sourceKey];
        if (!this.validators[radix].test(value)) return; // ignore invalid interim keystrokes

        let decimalValue;
        try {
            const prefixed = radix === 10 ? value : radix === 16 ? '0x' + value : radix === 8 ? '0o' + value : '0b' + value;
            decimalValue = BigInt(prefixed);
        } catch (e) {
            return;
        }

        Object.keys(this.radices).forEach(k => {
            if (k === sourceKey) return;
            document.getElementById(`base-${k}`).value = decimalValue.toString(this.radices[k]).toUpperCase();
        });
    }
}

// Ohm's Law Calculator (V = IR, P = VI) - solves for any two known values
class OhmsLawCalculator {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('ohm-calc').addEventListener('click', () => this.calculate());
        document.getElementById('ohm-clear').addEventListener('click', () => this.clear());
    }

    calculate() {
        let v = parseFloat(document.getElementById('ohm-v').value);
        let i = parseFloat(document.getElementById('ohm-i').value);
        let r = parseFloat(document.getElementById('ohm-r').value);
        let p = parseFloat(document.getElementById('ohm-p').value);

        const knownCount = [v, i, r, p].filter(n => !isNaN(n)).length;
        if (knownCount < 2) {
            alert('Please fill in at least two values.');
            return;
        }

        if (!isNaN(v) && !isNaN(i))      { r = v / i; p = v * i; }
        else if (!isNaN(v) && !isNaN(r)) { i = v / r; p = v * i; }
        else if (!isNaN(i) && !isNaN(r)) { v = i * r; p = v * i; }
        else if (!isNaN(v) && !isNaN(p)) { i = p / v; r = v / i; }
        else if (!isNaN(i) && !isNaN(p)) { v = p / i; r = v / i; }
        else if (!isNaN(r) && !isNaN(p)) { v = Math.sqrt(p * r); i = v / r; }

        document.getElementById('ohm-v').value = isFinite(v) ? +v.toFixed(4) : '';
        document.getElementById('ohm-i').value = isFinite(i) ? +i.toFixed(4) : '';
        document.getElementById('ohm-r').value = isFinite(r) ? +r.toFixed(4) : '';
        document.getElementById('ohm-p').value = isFinite(p) ? +p.toFixed(4) : '';
    }

    clear() {
        ['ohm-v', 'ohm-i', 'ohm-r', 'ohm-p'].forEach(id => { document.getElementById(id).value = ''; });
    }
}

// Initialize all tools when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Keep the footer's copyright year current without needing a manual edit.
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // Initialize GSAP Animations if elements exist
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        if (document.querySelector('.main-header')) {
            tl.from('.main-header', { duration: 1.2, y: -50, opacity: 0, ease: 'expo.out' });
        }
        if (document.querySelectorAll('.tool-card').length > 0) {
            tl.from('.tool-card', { duration: 0.8, y: 50, opacity: 0, stagger: 0.1, ease: 'expo.out' }, '-=0.5');
        }
    }

    // Navigation Logic
    const toolsGrid = document.querySelector('.tools-grid');
    const toolsSection = document.getElementById('tools-section');
    const header = document.querySelector('.main-header');
    const gsapReady = typeof gsap !== 'undefined';
    let pdfToolkitInstance; // assigned further below; referenced here only inside callbacks that run later

    // --- History-aware navigation (Hub -> Tool -> Subtool) -------------------
    // Every level pushes (or replaces) a history entry, so the browser Back
    // button, Android system Back, Android gesture Back, and installed-PWA
    // Back all "just work" via the standard popstate event instead of exiting
    // the app. On-screen Back-to-Hub buttons and Escape both route through
    // the same functions, so there's exactly one source of truth for what's
    // currently on screen.
    let navApplyingState = false; // true while restoring UI from a history entry, to avoid re-pushing

    function safeHistoryPush(state) {
        try { history.pushState(state, '', location.pathname + location.search); } catch (e) { /* e.g. restrictive file:// origin - navigation still works, just without a history entry */ }
    }
    function safeHistoryReplace(state) {
        try { history.replaceState(state, '', location.pathname + location.search); } catch (e) { /* see above */ }
    }

    // Pure UI: shows the Hub grid, hiding whichever tool interface was open.
    // Safe to call repeatedly - does nothing if the Hub is already showing.
    function showHubUI() {
        if (toolsGrid.style.display === 'none') {
            if (gsapReady) {
                gsap.killTweensOf([toolsSection, toolsGrid, header]);
                gsap.to(toolsSection, { opacity: 0, y: 30, duration: 0.3, ease: 'expo.in', onComplete: () => {
                    toolsSection.style.display = 'none';
                    document.querySelectorAll('.tool-interface').forEach(ti => ti.style.display = 'none');

                    toolsGrid.style.display = 'grid';
                    header.style.display = 'block';

                    gsap.fromTo([header, toolsGrid],
                        { opacity: 0, y: -30 },
                        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out', clearProps: "all" }
                    );
                }});
            } else {
                toolsSection.style.display = 'none';
                document.querySelectorAll('.tool-interface').forEach(ti => ti.style.display = 'none');
                toolsGrid.style.display = 'grid';
                header.style.display = 'block';
            }
        }
    }

    // Pure UI: shows a given tool's interface. If the tool-section chrome is
    // already visible (e.g. moving between subtool <-> tool level within the
    // same tool), it just swaps the visible interface with no re-animation.
    function showToolUI(toolId) {
        const targetInterface = document.getElementById(`${toolId}-tool`);
        if (!targetInterface) return false;

        document.querySelectorAll('.tool-interface').forEach(el => {
            el.style.display = 'none';
        });
        targetInterface.style.display = 'block';

        if (toolsSection.style.display === 'block') {
            return true; // already in tool view - nothing further to animate
        }

        if (gsapReady) {
            gsap.to([toolsGrid, header], { opacity: 0, y: -20, duration: 0.4, onComplete: () => {
                toolsGrid.style.display = 'none';
                header.style.display = 'none';
                toolsSection.style.display = 'block';
                gsap.fromTo(toolsSection, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            }});
        } else {
            // Animation library unavailable (e.g. blocked/offline CDN) - still fully usable, just instant.
            toolsGrid.style.display = 'none';
            header.style.display = 'none';
            toolsSection.style.display = 'block';
        }
        return true;
    }

    // Single source of truth for "what does the screen show for this history
    // state" - called on popstate (Back/Forward, hardware/gesture Back) and
    // once on initial load. Always cleans up nested UI (fullscreen, wake
    // lock, an open PDF subtool) before switching views.
    function applyNavState(state) {
        navApplyingState = true;
        try {
            if (document.fullscreenElement) {
                (document.exitFullscreen || document.webkitExitFullscreen)?.call(document).catch(() => {});
            }
            if (pdfToolkitInstance) pdfToolkitInstance.releaseWakeLock();

            if (!state || state.view === 'hub') {
                if (pdfToolkitInstance && pdfToolkitInstance.hasOpenSubtool()) pdfToolkitInstance.closeSubtoolUI();
                showHubUI();
            } else if (state.view === 'tool') {
                if (pdfToolkitInstance && pdfToolkitInstance.hasOpenSubtool()) pdfToolkitInstance.closeSubtoolUI();
                showToolUI(state.toolId);
            } else if (state.view === 'subtool') {
                showToolUI(state.toolId);
                if (state.toolId === 'pdftoolkit' && pdfToolkitInstance) {
                    const btn = document.querySelector(`.pdf-subtool-btn[data-subtool="${state.subtool}"]`);
                    pdfToolkitInstance.switchSubtool(state.subtool, btn ? btn.textContent : state.subtool, { fromHistory: true });
                }
            }
        } finally {
            navApplyingState = false;
        }
    }

    // Hub -> Tool (card click / deep link). Pushes a new history entry.
    function goToTool(toolId) {
        if (!document.getElementById(`${toolId}-tool`)) return;
        showToolUI(toolId);
        if (!navApplyingState) safeHistoryPush({ toolshub: true, view: 'tool', toolId });
    }

    // On-screen "Back to Hub" buttons: always return straight to the Hub,
    // however deep the current view is - by walking history back exactly
    // that many steps, so browser Back afterwards continues to behave
    // naturally instead of leaving stray forward-history entries.
    function goToHubDirect() {
        const cur = history.state;
        const depth = (cur && cur.view === 'subtool') ? 2 : (cur && cur.view === 'tool') ? 1 : 0;
        if (depth > 0) {
            history.go(-depth);
        } else {
            applyNavState({ view: 'hub' });
        }
    }

    // Exposed so PDFToolkit (defined earlier in this file) can register a
    // subtool as its own history level without knowing about pushState directly.
    window.ToolshubNav = {
        enterSubtool(toolId, subtoolId) {
            if (navApplyingState) return;
            const cur = history.state;
            const newState = { toolshub: true, view: 'subtool', toolId, subtool: subtoolId };
            if (cur && cur.view === 'subtool' && cur.toolId === toolId) {
                safeHistoryReplace(newState); // lateral move between subtools - don't grow the stack
            } else {
                safeHistoryPush(newState);
            }
        }
    };

    // Establish the Hub as the baseline history entry without adding a new
    // one, so a single Back press from the Hub falls through to normal
    // browser/PWA behavior instead of being trapped in the app.
    safeHistoryReplace({ toolshub: true, view: 'hub' });

    document.querySelectorAll('.use-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.tool-card');
            goToTool(card.dataset.tool);
        });
    });

    // Deep-link support for PWA shortcuts / bookmarks, e.g. index.html?tool=pdftoolkit
    const requestedTool = new URLSearchParams(window.location.search).get('tool');
    if (requestedTool) {
        goToTool(requestedTool);
    }

    // --- Pin Feature ---------------------------------------------------------
    // Lets people pin frequently-used tools to the top of the grid. Only the
    // list of pinned tool IDs is persisted (a few short strings) - no other
    // app or tool state is ever written to localStorage by this feature.
    // Wrapped in try/catch for the same reason as initTool() above: this
    // block runs before every other tool's init code, so an uncaught error
    // in here would otherwise silently stop the rest of the app (including
    // the Notepad) from ever loading.
    try {
    (function initPinnedTools() {
        const STORAGE_KEY = 'toolshub_pinned_tools';
        const grid = document.getElementById('tools-grid');
        const label = document.getElementById('pinned-section-label');
        if (!grid) return;

        const validToolIds = Array.from(document.querySelectorAll('.tool-card')).map(c => c.dataset.tool);

        function loadPinned() {
            try {
                const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                if (!Array.isArray(raw)) return [];
                // Only keep IDs that still correspond to a real tool on this page
                return raw.filter(id => validToolIds.includes(id));
            } catch (e) {
                return [];
            }
        }

        function savePinned(list) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            } catch (e) {
                // localStorage unavailable (private browsing, quota, etc.) - pinning just won't persist
            }
        }

        function render() {
            const pinned = loadPinned();

            document.querySelectorAll('.tool-card').forEach(card => {
                const id = card.dataset.tool;
                const isPinned = pinned.includes(id);
                card.classList.toggle('pinned', isPinned);
                const btn = card.querySelector('.pin-tool-btn');
                const icon = btn?.querySelector('i');
                if (btn) btn.classList.toggle('pinned', isPinned);
                if (icon) icon.className = isPinned ? 'fas fa-star' : 'far fa-star';
                if (btn) btn.setAttribute('aria-label', isPinned ? `Unpin ${id}` : `Pin ${id}`);
            });

            label.style.display = pinned.length ? 'flex' : 'none';

            // Reorder: pinned tools first (in the order they were pinned), then
            // everything else in its original document order.
            const cards = Array.from(document.querySelectorAll('.tool-card'));
            const byId = Object.fromEntries(cards.map(c => [c.dataset.tool, c]));
            const rest = cards.filter(c => !pinned.includes(c.dataset.tool));

            pinned.forEach(id => { if (byId[id]) grid.appendChild(byId[id]); });
            rest.forEach(c => grid.appendChild(c));
            if (pinned.length) grid.insertBefore(label, grid.firstChild);
        }

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.pin-tool-btn');
            if (!btn) return;
            e.stopPropagation();
            const id = btn.dataset.pinTool;
            let pinned = loadPinned();
            if (pinned.includes(id)) {
                pinned = pinned.filter(t => t !== id);
            } else {
                pinned.push(id);
            }
            savePinned(pinned);
            render();
        });

        render();
    })();
    } catch (err) {
        console.error('ToolsHub: pinned-tools feature failed to initialize', err);
    }

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            goToHubDirect();
        });
    });

    // Browser/device Back, Android system Back, Android gesture Back, and
    // installed-PWA Back all surface as this one event - it's the single
    // source of truth that keeps on-screen UI in sync with real history.
    window.addEventListener('popstate', (e) => {
        applyNavState(e.state);
    });

    // Escape: close a modal first, then exit fullscreen, then step back one
    // level (subtool -> tool -> hub) - same destination as the on-screen
    // Back button, just one level per press. Never hijacks Escape while
    // sitting on the Hub (nothing to go back to).
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;

        const iosModal = document.getElementById('pwa-ios-modal');
        if (iosModal && getComputedStyle(iosModal).display !== 'none') {
            (window.toolshubCloseIosModal || (() => { iosModal.style.display = 'none'; }))();
            return;
        }
        const banner = document.getElementById('pwa-banner');
        if (banner && getComputedStyle(banner).display !== 'none') {
            (window.toolshubCloseInstallBanner || (() => { banner.style.display = 'none'; }))();
            return;
        }

        if (document.fullscreenElement) {
            (document.exitFullscreen || document.webkitExitFullscreen)?.call(document).catch(() => {});
            return;
        }

        // Only step back if a tool/subtool is actually open - a tool being
        // open counts as "a clear active tool-navigation state", so this
        // still applies even while a field inside it has focus.
        const cur = history.state;
        if (cur && cur.view && cur.view !== 'hub') {
            history.back();
        }
    });

    // Each tool is initialized independently: every tool on this page shares
    // one DOMContentLoaded handler, so an uncaught error in any single tool's
    // constructor would otherwise stop every tool listed after it (including
    // the Notepad block below) from ever initializing. initTool() isolates
    // failures so one broken tool can't take the rest of the app down with it.
    function initTool(name, fn) {
        try {
            fn();
        } catch (err) {
            console.error(`ToolsHub: "${name}" failed to initialize`, err);
        }
    }

    if (document.getElementById('current')) initTool('Calculator', () => new Calculator());
    if (document.getElementById('calendar-grid')) initTool('HolidayCalendar', () => new HolidayCalendar());
    if (document.querySelector('.clock-item')) initTool('WorldClock', () => new WorldClock());
    if (document.getElementById('from-unit')) initTool('UnitConverter', () => new UnitConverter());
    if (document.getElementById('st-display')) initTool('StopwatchTimer', () => new StopwatchTimer());
    if (document.getElementById('pdftoolkit-tool')) initTool('PDFToolkit', () => { pdfToolkitInstance = new PDFToolkit(); });
    if (document.getElementById('search-input')) initTool('QuickSearch', () => new QuickSearch());
    if (document.getElementById('qr-output')) initTool('QRCodeTool', () => new QRCodeTool());
    if (document.getElementById('pw-output')) initTool('PasswordGenerator', () => new PasswordGenerator());
    if (document.getElementById('bmi-result')) initTool('BMICalculator', () => new BMICalculator());
    if (document.getElementById('age-result')) initTool('AgeCalculator', () => new AgeCalculator());
    if (document.getElementById('base-dec')) initTool('BaseConverter', () => new BaseConverter());
    if (document.getElementById('ohm-v')) initTool('OhmsLawCalculator', () => new OhmsLawCalculator());

    // Notepad Tool Logic
    // Everything below is stored ONLY in this browser's localStorage.
    // Nothing is ever sent to a server - notes and pins are private to
    // this device/browser and are never synced or uploaded anywhere.
    if (document.getElementById('note')) {
        // Elements
        const noteArea = document.getElementById("note");
        const highlightLayer = document.getElementById("highlightLayer");
        const saveBtn = document.getElementById("saveBtn");
        const pinBtn = document.getElementById("pinBtn");
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
        const pinnedList = document.getElementById("pinnedList");
        const pinnedEmpty = document.getElementById("pinnedEmpty");
        const savedList = document.getElementById("savedList");
        const savedEmpty = document.getElementById("savedEmpty");

        const PIN_STORAGE_KEY = "myNote_pinnedNotes";
        const SAVED_STORAGE_KEY = "myNote_savedNotes";
        // The active search term, applied to the current note AND the
        // Pinned/Saved lists. Kept outside runSearch so re-renders (e.g.
        // after pinning/removing a note) can re-apply the same filter.
        // Matching is always case-insensitive and works from a single
        // character - the regex "i" flag and .toLowerCase() calls below
        // handle both upper- and lower-case input.
        let currentSearchTerm = "";

        // Functions
        function updateHighlight(searchTerm = "") {
            // Escape the note text FIRST, then inject <mark> tags. Doing it
            // in the other order (old bug) meant any '<', '>' or '&' typed
            // in a note was parsed as real HTML in the highlight layer,
            // which silently ate characters and threw the overlay out of
            // sync with the textarea - search looked "broken" any time a
            // note contained ordinary punctuation like that.
            let html = escapeHtml(noteArea.value);
            let matchCount = 0;
            if (searchTerm) {
                const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regex = new RegExp(`(${escaped})`, "gi");
                html = html.replace(regex, (match) => { matchCount++; return `<mark>${match}</mark>`; });
            }
            highlightLayer.innerHTML = html || " ";
            highlightLayer.scrollTop = noteArea.scrollTop; // sync scroll
            return matchCount;
        }

        // Scrolls the textarea so the first match is visible, and reports
        // how many matches were found - across the current note AND the
        // Pinned/Saved lists - via the status line.
        function runSearch(term) {
            const trimmed = term.trim();
            currentSearchTerm = trimmed;

            const noteMatches = updateHighlight(trimmed);
            const pinnedMatches = renderPinnedNotes();
            const savedMatches = renderSavedNotes();

            if (!trimmed) return;

            const total = noteMatches + pinnedMatches + savedMatches;

            if (total === 0) {
                showStatus(`No matches for "${trimmed}"`);
                return;
            }

            // Jump the textarea's scroll position to the first match so
            // long notes don't leave the highlight off-screen.
            if (noteMatches > 0) {
                const idx = noteArea.value.toLowerCase().indexOf(trimmed.toLowerCase());
                if (idx !== -1) {
                    const before = noteArea.value.slice(0, idx);
                    const lineNumber = before.split("\n").length - 1;
                    const lineHeight = parseFloat(getComputedStyle(noteArea).lineHeight) || 22;
                    noteArea.scrollTop = Math.max(0, lineNumber * lineHeight - noteArea.clientHeight / 2);
                    highlightLayer.scrollTop = noteArea.scrollTop;
                }
            }

            const parts = [];
            if (noteMatches) parts.push(`${noteMatches} in note`);
            if (pinnedMatches) parts.push(`${pinnedMatches} pinned`);
            if (savedMatches) parts.push(`${savedMatches} saved`);
            showStatus(`Found: ${parts.join(", ")}`);
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

        function escapeHtml(str) {
            const div = document.createElement("div");
            div.textContent = str;
            return div.innerHTML;
        }

        function getEntries(key) {
            try {
                const raw = localStorage.getItem(key);
                return raw ? JSON.parse(raw) : [];
            } catch (e) {
                return [];
            }
        }

        function saveEntries(key, entries) {
            localStorage.setItem(key, JSON.stringify(entries));
        }

        // Adds `text` to the list under `key` unless an entry with the exact
        // same text is already in it - keeps Pin/Save from piling up
        // duplicate copies when clicked repeatedly on unchanged text.
        // Returns false (and does nothing) if it was already there.
        function addUniqueEntry(key, text) {
            const entries = getEntries(key);
            if (entries.some((e) => e.text === text)) return false;
            entries.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, createdAt: Date.now() });
            saveEntries(key, entries);
            return true;
        }

        function getPinnedNotes() { return getEntries(PIN_STORAGE_KEY); }
        function savePinnedNotes(pins) { saveEntries(PIN_STORAGE_KEY, pins); }
        function getSavedNotes() { return getEntries(SAVED_STORAGE_KEY); }
        function saveSavedNotes(saves) { saveEntries(SAVED_STORAGE_KEY, saves); }

        // Builds the preview snippet for a list item. With no active search
        // it's just the first 60 characters (old behavior). With an active
        // search it centers the snippet on the match and wraps it in
        // <mark> so you can actually see why that note matched, instead of
        // always showing the start of the note regardless of where the
        // match is.
        function buildPreview(text, searchTerm) {
            if (!searchTerm) {
                const preview = text.length > 60 ? text.slice(0, 60) + "\u2026" : text;
                return escapeHtml(preview) || "<em>(empty note)</em>";
            }

            const lower = text.toLowerCase();
            const term = searchTerm.toLowerCase();
            const idx = lower.indexOf(term);
            if (idx === -1) {
                const preview = text.length > 60 ? text.slice(0, 60) + "\u2026" : text;
                return escapeHtml(preview) || "<em>(empty note)</em>";
            }

            const contextBefore = 20;
            const contextAfter = 40;
            const start = Math.max(0, idx - contextBefore);
            const end = Math.min(text.length, idx + term.length + contextAfter);
            let snippet = text.slice(start, end);
            snippet = escapeHtml(snippet);

            // Re-find the match within the escaped snippet to wrap it -
            // escaping can't change match position since none of our
            // search characters need HTML-escaping at that offset.
            const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(`(${escapedTerm})`, "i");
            snippet = snippet.replace(regex, "<mark>$1</mark>");

            if (start > 0) snippet = "\u2026" + snippet;
            if (end < text.length) snippet = snippet + "\u2026";
            return snippet;
        }

        // Shared renderer for both the Pinned and Saved lists - same markup,
        // same "click to load, x to remove" behavior, just a different
        // storage key/CSS class/status text for each. When a search term is
        // active, only matching entries are shown (with the match
        // highlighted); returns how many entries matched.
        function renderNoteList(config) {
            const { getList, setList, listEl, emptyEl, emptyText, itemClass, textClass, dateClass, removeClass, removeLabel, loadStatus, removeStatus } = config;
            const allEntries = getList();
            const searchTerm = currentSearchTerm;
            const entries = searchTerm
                ? allEntries.filter((e) => e.text.toLowerCase().includes(searchTerm.toLowerCase()))
                : allEntries;
            listEl.innerHTML = "";

            if (entries.length === 0) {
                emptyEl.style.display = "block";
                emptyEl.textContent = searchTerm ? `No matches for "${searchTerm}"` : emptyText;
                return 0;
            }
            emptyEl.style.display = "none";

            entries.slice().reverse().forEach((entry) => {
                const item = document.createElement("div");
                item.className = itemClass;

                const textWrap = document.createElement("div");
                textWrap.className = textClass;
                const dateStr = new Date(entry.createdAt).toLocaleString();
                textWrap.innerHTML = `${buildPreview(entry.text, searchTerm)}<span class="${dateClass}">${escapeHtml(dateStr)}</span>`;

                textWrap.addEventListener("click", () => {
                    noteArea.value = entry.text;
                    localStorage.setItem("myNote", noteArea.value);
                    updateHighlight(searchInput.value.trim());
                    updateCounter();
                    showStatus(loadStatus);
                });

                const removeBtn = document.createElement("button");
                removeBtn.className = removeClass;
                removeBtn.setAttribute("aria-label", removeLabel);
                removeBtn.textContent = "\u00D7";
                removeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    setList(getList().filter((entry2) => entry2.id !== entry.id));
                    renderNoteList(config);
                    showStatus(removeStatus);
                });

                item.appendChild(textWrap);
                item.appendChild(removeBtn);
                listEl.appendChild(item);
            });

            return entries.length;
        }

        function renderPinnedNotes() {
            return renderNoteList({
                getList: getPinnedNotes,
                setList: savePinnedNotes,
                listEl: pinnedList,
                emptyEl: pinnedEmpty,
                emptyText: "Nothing pinned yet — pin a note to keep it handy.",
                itemClass: "pinned-note-item",
                textClass: "pinned-note-text",
                dateClass: "pinned-note-date",
                removeClass: "pinned-note-remove",
                removeLabel: "Remove pinned note",
                loadStatus: "📌 Pinned note loaded",
                removeStatus: "Pin removed",
            });
        }

        function renderSavedNotes() {
            return renderNoteList({
                getList: getSavedNotes,
                setList: saveSavedNotes,
                listEl: savedList,
                emptyEl: savedEmpty,
                emptyText: "Nothing saved yet — tap Save to keep a note here.",
                itemClass: "saved-note-item",
                textClass: "saved-note-text",
                dateClass: "saved-note-date",
                removeClass: "saved-note-remove",
                removeLabel: "Remove saved note",
                loadStatus: "💾 Saved note loaded",
                removeStatus: "Saved note removed",
            });
        }

        // Load saved note + theme + pins (all local to this device)
        const savedNote = localStorage.getItem("myNote");
        const theme = localStorage.getItem("theme");

        if (savedNote) noteArea.value = savedNote;
        if (theme === "dark") notesToolContainer.classList.add("dark");

        updateHighlight();
        updateCounter();
        renderPinnedNotes();
        renderSavedNotes();

        // Event Listeners
        saveBtn.addEventListener("click", () => {
            const text = noteArea.value;
            localStorage.setItem("myNote", text);
            if (!text.trim()) {
                showStatus("Nothing to save yet");
                return;
            }
            const added = addUniqueEntry(SAVED_STORAGE_KEY, text);
            renderSavedNotes();
            showStatus(added ? "\u2705 Note saved!" : "\u2705 Already saved");
        });

        pinBtn.addEventListener("click", () => {
            const text = noteArea.value;
            if (!text.trim()) {
                showStatus("Nothing to pin yet");
                return;
            }
            const added = addUniqueEntry(PIN_STORAGE_KEY, text);
            renderPinnedNotes();
            showStatus(added ? "📌 Note pinned!" : "📌 Already pinned");
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
            showStatus("\u2B07 Download started");
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
            runSearch(searchInput.value);
        });

        // Live search as the user types, debounced so a fast typist isn't
        // re-scanning the whole note on every keystroke.
        let searchDebounce;
        searchInput.addEventListener("input", () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => runSearch(searchInput.value), 200);
        });

        // Enter in the search box should search immediately, not require
        // a click on the Search button.
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                clearTimeout(searchDebounce);
                runSearch(searchInput.value);
            }
        });

        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            currentSearchTerm = "";
            updateHighlight();
            renderPinnedNotes();
            renderSavedNotes();
            searchInput.focus();
        });
    }
});
