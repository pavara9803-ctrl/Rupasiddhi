/**
 * ==========================================================================
 * සංඥා සූත්‍ර Rendering Controller (js/sanna-view.js)
 * ==========================================================================
 */

window.AppState = window.AppState || {};

// Markdown bold (**...**) HTML <strong> බවට හරවන Helper ශ්‍රිතය
function parseSannaMarkdownBold(text) {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function renderSannaWorkspace(suttaData, targetContainerId = 'viewSuttaPanel') {
    const container = document.getElementById(targetContainerId);
    if (!container || !suttaData) return;

    window.AppState.currentSutta = suttaData;

    container.innerHTML = `
        <!-- 01. සූත්‍ර Top Banner: පදච්ඡේද/අනුවර්තන වෙනම පේළි නොමැතිව සෘජුවම අර්ථය, වෘත්තිය සහ සන්නය -->
        <div class="panel-card sanna-banner-card">
            <div class="tag-row" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem;">
                <span class="sanna-category-badge">සංඥා සූත්‍ර</span>
                <span class="badge badge-khanda">සන්ධිකණ්ඩ</span>
                ${suttaData.sutta_type ? `<span class="badge" style="background:#FAF2E6; color:#6B1D2F; border:1px solid #E6D0BA;">${suttaData.sutta_type}</span>` : ''}
            </div>
            
            <h2 class="sanna-sutta-title">${suttaData.sutta_name || (suttaData.sutta_number + '. ' + (suttaData.sutta || ''))}</h2>
            
            <!-- සූත්‍රයේ තේරුම (පාලි වචන පමණක් bold කර) -->
            ${suttaData.sutta_meaning ? `
                <div class="sanna-meaning-box">
                    <p class="sanna-meaning-text">${parseSannaMarkdownBold(suttaData.sutta_meaning)}</p>
                </div>
            ` : ''}

            <!-- සූත්‍ර වෘත්තිය සහ පදයෙන් පද සන්නය -->
            ${(suttaData.vutti || suttaData.vutti_sanna) ? `
                <div class="sanna-vutti-box">
                    ${suttaData.vutti ? `
                        <span class="vutti-label">සූත්‍ර වෘත්තිය (පාළි):</span>
                        <p class="sanna-vutti-text">${suttaData.vutti}</p>
                    ` : ''}

                    ${suttaData.vutti && suttaData.vutti_sanna ? `<hr class="sanna-sanna-divider">` : ''}

                    ${suttaData.vutti_sanna ? `
                        <span class="vutti-label">වෘත්තියේ පදයෙන් පද සන්නය:</span>
                        <p class="sanna-sanna-text">${parseSannaMarkdownBold(suttaData.vutti_sanna)}</p>
                    ` : ''}
                </div>
            ` : ''}
        </div>

        <!-- 02. ෂඩාකාර විමර්ශනය (Text-Justified) -->
        ${suttaData.shadakara ? `
            <div class="panel-card">
                <h3 class="section-heading"><span class="heading-icon">⚜️</span> සූත්‍ර ෂඩාකාර විමර්ශනය</h3>
                <div class="shadakara-dynamic-grid">
                    ${renderSannaShadakaraCards(suttaData.shadakara)}
                </div>
            </div>
        ` : ''}

        <!-- 03. සූත්‍ර අතිරේක විමර්ශන හා අක්ෂර පුවරුව -->
        <div class="panel-card">
            <!-- අක්ෂර මාලාව (අක්ෂර 41) ප්‍රදර්ශනය -->
            ${suttaData.akkhara_chart ? renderSannaAkkharaChart(suttaData.akkhara_chart) : ''}

            <!-- ධ්වනි විද්‍යාත්මක ස්ථාන-කරණ-ප්‍රයත්න විවරණය -->
            ${suttaData.phonetics_system ? renderSannaPhonetics(suttaData.phonetics_system) : ''}

            <!-- පරසමඤ්ඤා සූත්‍රයේ සංඥා නීති (Twenty One Rules) -->
            ${suttaData.twenty_one_rules && suttaData.twenty_one_rules.length > 0 ? `
                <div style="margin-top: 1.2rem;">
                    <h4 style="color: var(--theme-primary); font-weight: 700; margin-bottom: 0.6rem;">
                        📋 සංඥා නීති හා ප්‍රභේද විවරණය
                    </h4>
                    <div class="sanna-rules-grid">
                        ${suttaData.twenty_one_rules.map(r => `
                            <div class="sanna-rule-card">
                                <strong>${r.num}. ${r.rule}</strong>
                                <p>${r.content}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- ටීකා / සන්න විශේෂ සටහන -->
            ${suttaData.extended_commentary ? `
                <div class="sanna-commentary-box">
                    <strong>ටීකා / සන්න විශෙෂ සටහන:</strong> ${suttaData.extended_commentary}
                </div>
            ` : ''}
        </div>
    `;
}

// ෂඩාකාර කාඩ්පත් Helper (Justified Styling සමඟ)
function renderSannaShadakaraCards(shadakara) {
    const modes = [
        { key: 'sambandha', paliKey: 'sambandha_pali', label: '1. සම්බන්ධො', num: '1' },
        { key: 'pada', paliKey: 'pada_pali', label: '2. පදං', num: '2' },
        { key: 'padattha', paliKey: 'padattha_pali', label: '3. පදත්‍ථො', num: '3' },
        { key: 'padaviggaha', paliKey: 'padaviggaha_pali', label: '4. පදවිග්ගහො', num: '4' },
        { key: 'chodana', paliKey: 'chodana_pali', label: '5. චොදනා', num: '5' },
        { key: 'parihara', paliKey: 'parihara_pali', label: '6. පරිහාරො', num: '6' }
    ];

    return modes.map(m => {
        const meaning = shadakara[m.key];
        const pali = shadakara[m.paliKey];
        if (!meaning && !pali) return '';
        return `
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">${m.num}</span>
                    <h4 class="shad-card-title">${m.label}</h4>
                </div>
                ${pali ? `<div class="shad-lakkhana-box">${pali}</div>` : ''}
                <div class="shad-card-desc">${meaning || '--'}</div>
            </div>
        `;
    }).join('');
}

// අක්ෂර මාලාව Render කිරීමේ Helper
function renderSannaAkkharaChart(chart) {
    return `
        <div class="sanna-akkhara-card" style="margin-top: 0.5rem;">
            <h4 style="color: var(--theme-primary); font-size: 1.15rem; font-weight: 700; margin-bottom: 0.8rem; border-bottom: 1.5px dashed var(--theme-accent); padding-bottom: 0.4rem;">
                🔤 පාලි අක්ෂර මාලාව (අක්ෂර 41)
            </h4>

            <div class="sanna-group-header">⚜️ ස්වර අට (08)</div>
            <div class="sanna-badges-wrapper">
                ${(chart.sara || []).map(ch => `<span class="sanna-letter-badge sara">${ch}</span>`).join('')}
            </div>

            <div class="sanna-group-header">⚜️ වර්ග ව්‍යංජන (25)</div>
            ${(chart.vagga || []).map(v => `
                <div style="margin-bottom: 0.5rem;">
                    <small style="color: var(--theme-primary); font-weight: 700;">${v.name}:</small>
                    <div class="sanna-badges-wrapper" style="margin-top: 0.25rem;">
                        ${(v.letters || []).map(ch => `<span class="sanna-letter-badge">${ch}</span>`).join('')}
                    </div>
                </div>
            `).join('')}

            <div class="sanna-group-header">⚜️ අවර්ග ව්‍යංජන (07)</div>
            <div class="sanna-badges-wrapper">
                ${(chart.avagga || []).map(ch => `<span class="sanna-letter-badge">${ch}</span>`).join('')}
            </div>

            <div class="sanna-group-header">⚜️ නිග්ගහීතය (01)</div>
            <div class="sanna-badges-wrapper">
                ${(chart.niggahita || []).map(ch => `<span class="sanna-letter-badge niggahita">${ch}</span>`).join('')}
            </div>
        </div>
    `;
}

// ධ්වනි විද්‍යාව Render කිරීමේ Helper
function renderSannaPhonetics(phonetics) {
    return `
        <div class="sanna-phonetics-card" style="margin-top: 1.2rem;">
            <h4 style="color: var(--theme-primary); margin-bottom: 0.7rem; font-weight: 700;">
                🔬 ධ්වනි විද්‍යාත්මක ස්ථාන-කරණ-ප්‍රයත්න විවරණය
            </h4>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 220px;">ස්ථානය / කරණය</th>
                            <th>අදාළ අක්ෂර</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(phonetics.sthana_classification || []).map(s => `
                            <tr>
                                <td style="font-weight: 700; color: var(--theme-primary);">${s.sthana}</td>
                                <td><code class="pali-script-inline">${s.letters}</code></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}