/**
 * ==========================================================================
 * ව්‍යංජන සන්ධි Rendering Controller (js/byanjana-view.js)
 * ==========================================================================
 */

window.AppState = window.AppState || {};

// Markdown bold (**...**) HTML <strong> බවට හරවන Helper ශ්‍රිතය
function parseByanjanaMarkdownBold(text) {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// ලෝපය (කැපී යාම), ආදේශ සහ ඊතල හැඩගැස්වීම[cite: 9]
function formatByanjanaFormula(text) {
    if (!text) return '';
    let formatted = text.replace(/~([^~]+)~/g, '<span class="lopa-cut">$1</span>');
    formatted = formatted.replace(/→/g, '<span style="color: #C59B27; font-weight: bold; margin: 0 4px;">➔</span>');
    formatted = formatted.replace(/\[(.*?)\]/g, '<span style="background: #FDF4E7; border: 1px solid #E6D0BA; padding: 1px 6px; border-radius: 4px; color: #6B1D2F; font-weight: 700;">$1</span>');
    return formatted;
}

// සූත්‍රයෙන් සෑදෙන සියලු පද හා ප්‍රභේද - Compact Wrapping Badges Layout[cite: 9]
function renderByanjanaFormedWords(formedWords) {
    if (!formedWords || formedWords.length === 0) return '';

    const hasCategories = formedWords.some(item => item.includes(':'));

    // 1. ප්‍රභේද නොමැතිව තනි පද පමණක් ඇති විට[cite: 9]
    if (!hasCategories) {
        return `
            <div class="panel-card byanjana-formed-card">
                <h3 class="section-heading"><span class="heading-icon">✨</span> සූත්‍රයෙන් සෑදෙන සියලු පද</h3>
                <div class="byanjana-words-badges">
                    ${formedWords.map(word => `<span class="byanjana-word-badge">${word.trim()}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // 2. ප්‍රභේද සහිතව ඇති විට (සුඛුච්චාරණ දීර්ඝ, ඡන්දානුරක්ඛණ දීර්ඝ ආදී වශයෙන්)[cite: 9]
    return `
        <div class="panel-card byanjana-formed-card">
            <h3 class="section-heading"><span class="heading-icon">✨</span> සූත්‍රයෙන් සෑදෙන සියලු පද හා ප්‍රභේද</h3>
            <div class="byanjana-formed-groups">
                ${formedWords.map(item => {
                    const parts = item.split(':');
                    const categoryTitle = parts.length > 1 ? parts[0].trim() : '';
                    const wordsString = parts.length > 1 ? parts[1].trim() : parts[0].trim();
                    const wordsList = wordsString.split(',').map(w => w.trim()).filter(Boolean);

                    return `
                        <div class="byanjana-group-box">
                            ${categoryTitle ? `<div class="byanjana-group-title"><span class="group-bullet">⚜️</span> ${categoryTitle}</div>` : ''}
                            <div class="byanjana-words-badges">
                                ${wordsList.map(word => `<span class="byanjana-word-badge">${word}</span>`).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// ෂඩාකාර කාඩ්පත් Helper (Justified Alignment සමඟ)[cite: 9]
function renderByanjanaShadakaraCards(shadakara) {
    const modes = [
        { key: 'sambandha', paliKey: 'sambandha_pali', label: '1. සම්බන්ධො', icon: '1' },
        { key: 'pada', paliKey: 'pada_pali', label: '2. පදං', icon: '2' },
        { key: 'padattha', paliKey: 'padattha_pali', label: '3. පදත්‍ථො', icon: '3' },
        { key: 'padaviggaha', paliKey: 'padaviggaha_pali', label: '4. පදවිග්ගහො', icon: '4' },
        { key: 'chodana', paliKey: 'chodana_pali', label: '5. චොදනා', icon: '5' },
        { key: 'parihara', paliKey: 'parihara_pali', label: '6. පරිහාරො', icon: '6' }
    ];

    return modes.map(m => {
        const meaning = shadakara[m.key];
        const pali = shadakara[m.paliKey];
        if (!meaning && !pali) return '';
        return `
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">${m.icon}</span>
                    <h4 class="shad-card-title">${m.label}</h4>
                </div>
                ${pali ? `<div class="shad-lakkhana-box">${pali}</div>` : ''}
                <div class="shad-card-desc">${meaning || '--'}</div>
            </div>
        `;
    }).join('');
}

// පද සාධන වගු Helper[cite: 9]
function renderByanjanaDerivationTable(example) {
    if (!example) return '<div class="text-muted p-3">සාධන පියවර නොමැත.</div>';
    return `
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width: 60px; text-align: center;">පියවර</th>
                        <th>සාධන පියවර / ක්‍රියාවලිය</th>
                        <th style="width: 280px;">අදාළ සූත්‍රය / නීතිය</th>
                    </tr>
                </thead>
                <tbody>
                    ${(example.steps || []).map((st, i) => `
                        <tr>
                            <td style="text-align: center; font-weight: bold; color: var(--text-muted);">${i + 1}</td>
                            <td style="font-size: 1.05rem; font-weight: 600;">${formatByanjanaFormula(st.formula || st.action)}</td>
                            <td><span class="rule-badge">${st.rule || '-'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="byanjana-siddha-box">
            <span class="byanjana-result-label">සිද්ධ රූපය (අවසන් ඵලය):</span>
            <span class="byanjana-result-word">${example.final_result || example.word}</span>
        </div>
    `;
}

// ප්‍රධාන Workspace Rendering Function[cite: 9]
function renderByanjanaWorkspace(suttaData, targetContainerId = 'viewSuttaPanel') {
    const container = document.getElementById(targetContainerId);
    if (!container || !suttaData) return;

    window.AppState.currentSutta = suttaData;
    window.AppState.activeExampleIndex = window.AppState.activeExampleIndex || 0;

    const examples = suttaData.examples || [];
    if (window.AppState.activeExampleIndex >= examples.length) {
        window.AppState.activeExampleIndex = 0;
    }
    const activeIndex = window.AppState.activeExampleIndex;
    const currentExample = examples[activeIndex] || null;

    container.innerHTML = `
        <!-- 01. සූත්‍ර Top Banner: ශීර්ෂය යටින් සෘජුවම වෘත්තිය සහ සන්නය -->
        <div class="panel-card byanjana-banner-card">
            <div class="tag-row" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem;">
                <span class="byanjana-category-badge">ව්‍යංජන සන්ධි</span>
                <span class="badge badge-khanda">සන්ධිකණ්ඩ</span>
                ${suttaData.sutta_type ? `<span class="badge" style="background:#FAF2E6; color:#6B1D2F; border:1px solid #E6D0BA;">${suttaData.sutta_type}</span>` : ''}
            </div>
            
            <h2 class="byanjana-sutta-title">${suttaData.sutta_name || suttaData.sutta}</h2>

            <!-- සූත්‍රයේ තේරුම (පාලි වචන පමණක් bold කර) -->
            ${suttaData.sutta_meaning ? `
                <div class="byanjana-meaning-container">
                    <p class="byanjana-meaning-text">${parseByanjanaMarkdownBold(suttaData.sutta_meaning)}</p>
                </div>
            ` : ''}

            <!-- වෘත්තිය සහ පදයෙන් පද සන්නය -->
            ${(suttaData.vutti || suttaData.vutti_sanna) ? `
                <div class="byanjana-vutti-container">
                    ${suttaData.vutti ? `
                        <span class="vutti-label">සූත්‍ර වෘත්තිය (පාළි):</span>
                        <p class="byanjana-vutti-text">${suttaData.vutti}</p>
                    ` : ''}
                    
                    ${suttaData.vutti && suttaData.vutti_sanna ? `<hr class="byanjana-sanna-divider">` : ''}
                    
                    ${suttaData.vutti_sanna ? `
                        <span class="vutti-label">වෘත්තියේ පදයෙන් පද සන්නය:</span>
                        <p class="byanjana-sanna-text">${parseByanjanaMarkdownBold(suttaData.vutti_sanna)}</p>
                    ` : ''}
                </div>
            ` : ''}
        </div>

        <!-- 02. ෂඩාකාර විමර්ශනය (Text-Justified) -->
        ${suttaData.shadakara ? `
            <div class="panel-card">
                <h3 class="section-heading"><span class="heading-icon">⚜️</span> සූත්‍ර ෂඩාකාර විමර්ශනය</h3>
                <div class="shadakara-dynamic-grid">
                    ${renderByanjanaShadakaraCards(suttaData.shadakara)}
                </div>
            </div>
        ` : ''}

        <!-- 03. සූත්‍රයෙන් සෑදෙන සියලු පද (Compact Horizontal Wrapping Badges) -->
        ${renderByanjanaFormedWords(suttaData.formed_words)}

        <!-- 04. සෑදිය නොහැකි පද / ප්‍රත්‍යුදාහරණ (Counter Examples) -->
        ${suttaData.counter_examples ? `
            <div class="panel-card byanjana-counter-card">
                <h3 class="section-heading"><span class="heading-icon">🚫</span> සෑදිය නොහැකි පද / නීතිය නොවළඳින තැන් (ප්‍රත්‍යුදාහරණ)</h3>
                <div class="byanjana-counter-content">
                    ${Array.isArray(suttaData.counter_examples) 
                        ? suttaData.counter_examples.map(ce => `<div class="counter-line">✖ ${ce}</div>`).join('') 
                        : `<div class="counter-line">✖ ${suttaData.counter_examples}</div>`}
                </div>
            </div>
        ` : ''}

        <!-- 05. සන්න, ටීකා හා න්‍යාස විශේෂ විමර්ශන (Extended Commentary) -->
        ${suttaData.extended_commentary ? `
            <div class="panel-card byanjana-commentary-card">
                <h3 class="section-heading"><span class="heading-icon">📖</span> සන්න, ටීකා හා න්‍යාස විශේෂ විවරණ</h3>
                <div class="byanjana-commentary-text">
                    ${suttaData.extended_commentary}
                </div>
            </div>
        ` : ''}

        <!-- 06. පියවරෙන් පියවර පද සාධන පුවරුව -->
        ${examples.length > 0 ? `
            <div class="panel-card byanjana-derivation-card">
                <h3 class="section-heading"><span class="heading-icon">⚙️</span> පියවරෙන් පියවර පද සාධන විධික්‍රමය</h3>
                
                <!-- උදාහරණ තේරීමේ Tabs -->
                <div class="example-tabs-list">
                    ${examples.map((ex, idx) => `
                        <button type="button" 
                                class="example-tab-btn ${idx === activeIndex ? 'active' : ''}" 
                                onclick="switchByanjanaExample(${idx})">
                            ${ex.word || `උදාහරණය ${idx + 1}`}
                        </button>
                    `).join('')}
                </div>

                <!-- සාධන පියවර වගුව රඳවන Container එක -->
                <div id="byanjanaDerivationContainer">
                    ${currentExample ? renderByanjanaDerivationTable(currentExample) : ''}
                </div>
            </div>
        ` : ''}
    `;
}

// උදාහරණ Tab ක්ලික් කළ විට ක්‍රියාත්මක වන සෘජු ශ්‍රිතය (DOM-Direct Switch)[cite: 9]
function switchByanjanaExample(index) {
    if (!window.AppState) window.AppState = {};
    window.AppState.activeExampleIndex = index;

    const currentSutta = window.AppState.currentSutta;
    if (!currentSutta || !currentSutta.examples) return;

    // 1. Tab buttons වල active class එක මාරු කිරීම
    const buttons = document.querySelectorAll('.byanjana-derivation-card .example-tab-btn');
    buttons.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. මුළු පිටුවම reload නොකර සාධන වගුව පමණක් update කිරීම
    const derivationContainer = document.getElementById('byanjanaDerivationContainer');
    if (derivationContainer) {
        const example = currentSutta.examples[index];
        derivationContainer.innerHTML = renderByanjanaDerivationTable(example);
    } else {
        renderByanjanaWorkspace(currentSutta);
    }
}