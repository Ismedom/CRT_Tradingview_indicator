import { indicators } from './indicators_data.js';

const indicatorList = document.getElementById('indicator-list');
const codeDisplay = document.getElementById('code-display');
const activeIndicatorName = document.getElementById('active-indicator-name');
const activeIndicatorId = document.getElementById('active-indicator-id');
const fileNameDisplay = document.getElementById('file-name-display');
const copyBtn = document.getElementById('copy-btn');
const runBtn = document.getElementById('run-btn');
const toast = document.getElementById('toast');

let currentIndicator = null;

function init() {
    renderList();
    if (indicators.length > 0) {
        selectIndicator(indicators[0].id);
    }

    copyBtn.addEventListener('click', handleCopy);
    runBtn.addEventListener('click', handleRun);
}

function renderList() {
    indicatorList.innerHTML = '';
    indicators.forEach(indicator => {
        const li = document.createElement('li');
        li.className = 'indicator-item';
        li.dataset.id = indicator.id;
        li.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            ${indicator.name}
        `;
        li.addEventListener('click', () => selectIndicator(indicator.id));
        indicatorList.appendChild(li);
    });
}

function selectIndicator(id) {
    const indicator = indicators.find(i => i.id === id);
    if (!indicator) return;

    currentIndicator = indicator;

    // Update UI
    document.querySelectorAll('.indicator-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === id);
    });

    activeIndicatorName.textContent = indicator.name;
    activeIndicatorId.textContent = `File: indicators/${indicator.id}`;
    fileNameDisplay.textContent = indicator.id;
    
    // Set code with basic indentation preservation
    codeDisplay.textContent = indicator.code;

    // Scroll to top of code
    codeDisplay.parentElement.scrollTop = 0;
}

function handleCopy() {
    if (!currentIndicator) return;

    navigator.clipboard.writeText(currentIndicator.code).then(() => {
        showToast();
    });
}

function handleRun() {
    // "Run" in TradingView context usually means copy and paste, 
    // but we can provide a nice guidance or open TradingView
    window.open('https://www.tradingview.com/chart/', '_blank');
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

init();
