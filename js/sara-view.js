/**
 * ==========================================================================
 * සර සන්ධි Rendering Controller එක (js/sara-view.js)
 * 02_sara.js හි formula, rule, ඊතල සහ ලෝප ලකුණු නිවැරදිව Render කරයි.
 * ==========================================================================
 */

// ලෝපය (කැපී යාම) සහ ඊතල හැඩගැස්වීම
function formatSaraFormula(text) {
    if (!text) return '';
    // ~අ~ ලෝපය රතු පාටින් කැපී පෙනෙන ලෙස දැක්වීම
    let formatted = text.replace(/~([^~]+)~/g, '<span class="lopa-cut">$1</span>');
    // ඊතල (→) කැපී පෙනෙන පැහැයකින් දැක්වීම
    formatted = formatted.replace(/→/g, '<span style="color: #C59B27; font-weight: bold; margin: 0 4px;">➔</span>');
    // ආදේශ කොටු [ඉ → එ] ඉස්මතු කිරීම
    formatted = formatted.replace(/\[(.*?)\]/g, '<span style="background: #FDF4E7; border: 1px solid #E6D0BA; padding: 1px 6px; border-radius: 4px; color: #8C2D00; font-weight: 700;">$1</span>');
    return formatted;
}

function renderSaraWorkspace(suttaData, targetContainerId = 'viewSuttaPanel') {
    const container = document.getElementById(targetContainerId);
    if (!container || !suttaData) return;

    const examples = suttaData.examples || [];
    const activeIndex = AppState.activeExampleIndex || 0;
    const currentExample = examples[activeIndex] || examples[0] || null;

    container.innerHTML = `
        <!-- 01. සූත්‍ර Top Banner -->
        <div class="panel-card sara-banner-card">
            <div class="tag-row">
                <span class="sara-category-badge">සර සන්ධි</span>
                <span class="badge badge-khanda">සන්ධිකණ්ඩ</span>
            </div>
            <h2 class="sara-sutta-title">${suttaData.sutta_name || suttaData.sutta}</h2>
            
            ${suttaData.vutti ? `
                <div class="sara-vutti-container">
                    <span class="vutti-label">වෘත්තිය:</span>
                    <p class="sara-vutti-text">${suttaData.vutti}</p>
                </div>
            ` : ''}
        </div>

        <!-- 02. ෂඩාකාර විමර්ශනය -->
        ${suttaData.shadakara ? `
            <div class="panel-card">
                <h3 class="section-heading"><span class="heading-icon">⚜️</span> සූත්‍ර ෂඩාකාර විමර්ශනය</h3>
                <div class="shadakara-dynamic-grid">
                    ${renderSaraShadakaraCards(suttaData.shadakara)}
                </div>
            </div>
        ` : ''}

        <!-- 03. පද සාධන පුවරුව -->
        ${examples.length > 0 ? `
            <div class="panel-card sara-derivation-card">
                <h3 class="section-heading"><span class="heading-icon">⚙️</span> පද සාධන විධික්‍රමය</h3>
                
                <!-- උදාහරණ තේරීමේ Tabs -->
                <div class="example-tabs-list">
                    ${examples.map((ex, idx) => `
                        <button class="example-tab-btn ${idx === activeIndex ? 'active' : ''}" 
                                onclick="switchSaraExample(${idx})">
                            ${ex.word || `උදාහරණය ${idx + 1}`}
                        </button>
                    `).join('')}
                </div>

                <!-- සාධන පියවර වගුව -->
                ${currentExample ? renderSaraDerivationTable(currentExample) : ''}
            </div>
        ` : ''}
    `;
}

// ෂඩාකාර කාඩ්පත් Helper
function renderSaraShadakaraCards(shadakara) {
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
                <div class="shad-card-desc text-justified">${meaning || '--'}</div>
            </div>
        `;
    }).join('');
}

// පද සාධන වගු Helper
function renderSaraDerivationTable(example) {
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
                            <td style="font-size: 1.05rem; font-weight: 600;">${formatSaraFormula(st.formula || st.action)}</td>
                            <td><span class="rule-badge">${st.rule || '-'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="sara-siddha-box">
            <span class="sara-result-label">සිද්ධ රූපය (අවසන් ඵලය):</span>
            <span class="sara-result-word">${example.final_result || example.word}</span>
        </div>
    `;
}

// උදාහරණ Tab මාරු කිරීමේ ශ්‍රිතය
function switchSaraExample(index) {
    AppState.activeExampleIndex = index;
    if (AppState.currentSutta) {
        renderSaraWorkspace(AppState.currentSutta);
    }
}