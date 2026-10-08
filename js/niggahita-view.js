/**
 * ==========================================================================
 * නිග්ගහීත සන්ධි Rendering Controller එක (js/niggahita-view.js)
 * 04_niggahita.js හි සියලු තොරතුරු (සෑදෙන පද, ප්‍රත්‍යුදාහරණ, සන්න සටහන්) 
 * සංයුක්තව (Compact) සහ පියවරෙන් පියවර සාධන වගුව පෙන්වයි.
 * ==========================================================================
 */

// ලෝපය (කැපී යාම), ආදේශ සහ ඊතල හැඩගැස්වීම
function formatNiggahitaFormula(text) {
    if (!text) return '';
    let formatted = text.replace(/~([^~]+)~/g, '<span class="lopa-cut">$1</span>');
    formatted = formatted.replace(/→/g, '<span style="color: #C59B27; font-weight: bold; margin: 0 4px;">➔</span>');
    formatted = formatted.replace(/\[(.*?)\]/g, '<span style="background: #FDF4E7; border: 1px solid #E6D0BA; padding: 1px 6px; border-radius: 4px; color: #5C1422; font-weight: 700;">$1</span>');
    return formatted;
}

// සූත්‍රයෙන් සෑදෙන සියලු පද හා ප්‍රභේද - පිටුවේ ඉඩ ප්‍රයෝජනයට ගන්නා සංයුක්ත ශ්‍රිතය
function renderNiggahitaFormedWords(formedWords) {
    if (!formedWords || formedWords.length === 0) return '';

    const hasCategories = formedWords.some(item => item.includes(':'));

    // 1. ප්‍රභේද නොමැතිව තනි පද පමණක් ඇති විට
    if (!hasCategories) {
        return `
            <div class="panel-card niggahita-formed-card">
                <h3 class="section-heading"><span class="heading-icon">✨</span> සූත්‍රයෙන් සෑදෙන සියලු පද</h3>
                <div class="niggahita-words-badges">
                    ${formedWords.map(word => `<span class="niggahita-word-badge">${word.trim()}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // 2. ප්‍රභේද සහිතව ඇති විට (ක-වග්ගෙ, ච-වග්ගෙ, නිච්ච ආදී වශයෙන්)
    return `
        <div class="panel-card niggahita-formed-card">
            <h3 class="section-heading"><span class="heading-icon">✨</span> සූත්‍රයෙන් සෑදෙන සියලු පද හා ප්‍රභේද</h3>
            <div class="niggahita-formed-groups">
                ${formedWords.map(item => {
                    const parts = item.split(':');
                    const categoryTitle = parts.length > 1 ? parts[0].trim() : '';
                    const wordsString = parts.length > 1 ? parts[1].trim() : parts[0].trim();
                    const wordsList = wordsString.split(',').map(w => w.trim()).filter(Boolean);

                    return `
                        <div class="niggahita-group-box">
                            ${categoryTitle ? `<div class="niggahita-group-title"><span class="group-bullet">⚜️</span> ${categoryTitle}</div>` : ''}
                            <div class="niggahita-words-badges">
                                ${wordsList.map(word => `<span class="niggahita-word-badge">${word}</span>`).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderNiggahitaWorkspace(suttaData, targetContainerId = 'viewSuttaPanel') {
    const container = document.getElementById(targetContainerId);
    if (!container || !suttaData) return;

    const examples = suttaData.examples || [];
    const activeIndex = AppState.activeExampleIndex || 0;
    const currentExample = examples[activeIndex] || examples[0] || null;

    container.innerHTML = `
        <!-- 01. සූත්‍ර Top Banner -->
        <div class="panel-card niggahita-banner-card">
            <div class="tag-row">
                <span class="niggahita-category-badge">නිග්ගහීත සන්ධි</span>
                <span class="badge badge-khanda">සන්ධිකණ්ඩ</span>
                ${suttaData.sutta_type ? `<span class="badge" style="background:#FAF2E6; color:#5C1422; border:1px solid #E6D0BA;">${suttaData.sutta_type}</span>` : ''}
            </div>
            <h2 class="niggahita-sutta-title">${suttaData.sutta_name || suttaData.sutta}</h2>

            ${suttaData.vutti ? `
                <div class="niggahita-vutti-container">
                    <span class="vutti-label">සූත්‍ර වෘත්තිය (පාළි):</span>
                    <p class="niggahita-vutti-text">${suttaData.vutti}</p>
                </div>
            ` : ''}
        </div>

        <!-- 02. ෂඩාකාර විමර්ශනය -->
        ${suttaData.shadakara ? `
            <div class="panel-card">
                <h3 class="section-heading"><span class="heading-icon">⚜️</span> සූත්‍ර ෂඩාකාර විමර්ශනය</h3>
                <div class="shadakara-dynamic-grid">
                    ${renderNiggahitaShadakaraCards(suttaData.shadakara)}
                </div>
            </div>
        ` : ''}

        <!-- 03. සූත්‍රයෙන් සෑදෙන සියලු පද (Formed Words) -->
        ${renderNiggahitaFormedWords(suttaData.formed_words)}

        <!-- 04. සෑදිය නොහැකි පද / ප්‍රත්‍යුදාහරණ (Counter Examples) -->
        ${suttaData.counter_examples ? `
            <div class="panel-card niggahita-counter-card">
                <h3 class="section-heading"><span class="heading-icon">🚫</span> සෑදිය නොහැකි පද / නීතිය නොවළඳින තැන් (ප්‍රත්‍යුදාහරණ)</h3>
                <div class="niggahita-counter-content">
                    ${Array.isArray(suttaData.counter_examples) 
                        ? suttaData.counter_examples.map(ce => `<div class="counter-line">✖ ${ce}</div>`).join('') 
                        : `<div class="counter-line">✖ ${suttaData.counter_examples}</div>`}
                </div>
            </div>
        ` : ''}

        <!-- 05. සන්න, ටීකා හා න්‍යාස විශේෂ විමර්ශන (Extended Commentary) -->
        ${suttaData.extended_commentary ? `
            <div class="panel-card niggahita-commentary-card">
                <h3 class="section-heading"><span class="heading-icon">📖</span> සන්න, ටීකා හා න්‍යාස විශේෂ විවරණ</h3>
                <div class="niggahita-commentary-text">
                    ${suttaData.extended_commentary}
                </div>
            </div>
        ` : ''}

        <!-- 06. පියවරෙන් පියවර පද සාධන පුවරුව -->
        ${examples.length > 0 ? `
            <div class="panel-card niggahita-derivation-card">
                <h3 class="section-heading"><span class="heading-icon">⚙️</span> පියවරෙන් පියවර පද සාධන විධික්‍රමය</h3>
                
                <!-- උදාහරණ තේරීමේ Tabs -->
                <div class="example-tabs-list">
                    ${examples.map((ex, idx) => `
                        <button class="example-tab-btn ${idx === activeIndex ? 'active' : ''}" 
                                onclick="switchNiggahitaExample(${idx})">
                            ${ex.word || `උදාහරණය ${idx + 1}`}
                        </button>
                    `).join('')}
                </div>

                <!-- සාධන පියවර වගුව -->
                ${currentExample ? renderNiggahitaDerivationTable(currentExample) : ''}
            </div>
        ` : ''}
    `;
}

// ෂඩාකාර කාඩ්පත් Helper
function renderNiggahitaShadakaraCards(shadakara) {
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
function renderNiggahitaDerivationTable(example) {
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
                            <td style="font-size: 1.05rem; font-weight: 600;">${formatNiggahitaFormula(st.formula || st.action)}</td>
                            <td><span class="rule-badge">${st.rule || '-'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="niggahita-siddha-box">
            <span class="niggahita-result-label">සිද්ධ රූපය (අවසන් ඵලය):</span>
            <span class="niggahita-result-word">${example.final_result || example.word}</span>
        </div>
    `;
}

// උදාහරණ Tab මාරු කිරීමේ ශ්‍රිතය
function switchNiggahitaExample(index) {
    AppState.activeExampleIndex = index;
    if (AppState.currentSutta) {
        renderNiggahitaWorkspace(AppState.currentSutta);
    }
}