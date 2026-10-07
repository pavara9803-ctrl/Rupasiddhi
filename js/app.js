/**
 * ==========================================================================
 * පද රූපසිද්ධි සංහිතා - Core Controller Engine (js/app.js)
 * ==========================================================================
 */

// ෂඩාකාර හැඳින්වීම Master Data (ප්‍රාරම්භක තිරය සඳහා පමණි)
const SHADAKARA_MASTER_DATA = {
    header_section: {
        title: "ඉපැරණි ෂඩාකාර ක්‍රමය හා එය භාවිතයේදී දතයුතු කරුණු",
        lead_paragraph: "ඉතා ප්‍රශස්ත වූ පුරාණ ෂඩාකාර ක්‍රමයට බාලාවතාරය හැදෑරීමට උපකාර වන පරිදි සැකසූ ග්‍රන්ථයක් වන මෙම තත්වදීපිකාව භාවිතයේදී එම ෂඩාකාර ක්‍රමය ගැන මූලික අවබෝධයක් ලබා තිබිය යුතුය. දැනට එම ඉතා වටිනා ඉගැන්වීමේ ක්‍රමය අභාවයට යමින් පවතින බැවින් එය රැකගැනීමට යම් හෝ රුකුලක් අපට හැකි අයුරින් ලබාදීමේ අරමුණින් මෙම කරුණු මෙසේ ඇතුලත් කරමු.",
        appeal: "දහම් දැනීම හා පාළි භාෂා දැනීම ඇති ප්‍රතිපත්තිගරුක භික්ෂුවක් බවට පත්වීමට අදිටන් කරගන්නා සේක්වා යනු අපගේ ගෞරවනීය ආරාධනයයි."
    },
    shadakara_definition: {
        title: "ෂඩාකාරය යනු කුමක්ද?",
        description: "එක් වියරණ සූත්‍රයක් විස්තර කිරීමේදී භාවිතා කළ ආකාර හය ෂඩාකාරය නම් වේ. මුඛමත්තදීපනී, රූපසිද්ධිටීකා, කච්චායනවණ්ණනා ආදී පුරාණ වියරණ ග්‍රන්ථයන්හි මෙසේ දක්වා ඇත.",
        verse: "සම‍්බන්‍ධො ච පදඤ‍්චෙව පදත්‍ථො පදවිග‍්ගහො\nචොදනා පරිහාරො ච ඡබ‍්බිධා සුත‍්තවණ‍්ණනා",
        six_modes: [
            { id: 1, name: "සම‍්බන්‍ධො", pali: "සුත්තෙ පුබ්බාපරපදානං එකවාක්‍යතාය යොජනා සම්බන්ධො", meaning: "සූත්‍රයෙහි පූර්ව අපර පද එක් වාක්‍යක් ලෙස ගලපා යෙදීම සම්බන්ධය නමි." },
            { id: 2, name: "පදං", pali: "සුත්තෙ පදච්ඡෙදවසෙන පදං වෙදිතබ්බං", meaning: "සූත්‍රයෙහි පද බෙදා දැක්වීම පද කීම නමි." },
            { id: 3, name: "පදත්‍ථො", pali: "සුත්තත්ථවසෙන පදත්‍ථො වෙදිතබ්බං", meaning: "සූත්‍රයෙහි පදයන් ගලපා ඒවායේ අර්ථ කීම පදාර්ථ කීම නමි." },
            { id: 4, name: "පදවිග‍්ගහො", pali: "සුත්තෙ විජ්ජමානසමාස - තද්ධිත - කිතකපදානං සමාසාදි-විග්ගහවාක්‍යදස්සනං විග්ගහො", meaning: "සූත්‍රයෙහි දක්නට ලැබෙන සමාස, තද්ධිත, කිතක පදයන්ගේ විග්‍රහ වාක්‍ය දැක්වීම පදවිග්‍රහය නමි." },
            { id: 5, name: "චොදනා", pali: "සුත්තෙ පදානං පයෝජනාදිපුච්ඡනං චොදනා", meaning: "සූත්‍රයේ පදයන්ගේ ප්‍රයෝජනාදිය විමසීම චෝදනා නමි." },
            { id: 6, name: "පරිහාරො", pali: "සුත්තෙ පදානං සාත්ථකතාදිදස්සනවසෙන පරිහරණං පරිහාරො", meaning: "සූත්‍රයේ පදයන්ගේ සාර්ථකත්වය දැක්වීම පරිහාර නමි." }
        ]
    },
    sutta_structure: {
        title: "සූත්‍රයක කොටස් (බාලාවතාර 4 වන සූත්‍රය ඇසුරින්)",
        sutta_text: "4. අඤ‍්ඤෙ දීඝා.",
        vutti_text: "තත්‍ථ සරෙසු රස‍්සෙහඤ‍්ඤෙ දීඝා. සංයොගතො පුබ‍්බෙ එඔ රස‍්සා ඉවොච‍්චන‍්තෙ ක්‍වචි, අනන‍්තරා බ්‍යඤ‍්ජනා සංයොගො. එත්‍ථ, සෙය්‍යො, ඔට්‍ඨො, සොත්‍ථි.",
        four_parts: [
            { part: "සූත්‍රය", content: "අඤ‍්ඤෙ දීඝා" },
            { part: "වෘත්තිය", content: "තත්‍ථ සරෙසු රස‍්සෙහඤ‍්ඤෙ දීඝා. සංයොගතො පුබ‍්බෙ එඔ රස‍්සා ඉවොච‍්චන‍්තෙ, අනන‍්තරා බ්‍යඤ‍්ජනා සංයොගො." },
            { part: "උදාහරණ", content: "එත්‍ථ, සෙය්‍යො, ඔට්‍ඨො, සොත්‍ථි." },
            { part: "ප්‍රයෝග", content: "ක්‍වචීති කිං? පුත‍්තො ත්‍යාහං මහාරාජ" }
        ]
    }
};

// ඛාණ්ඩ 7 පිළිබඳ නාමාවලි සටහන
const KHANDAS_CONFIG = [
    { 
        key: "1_sandhi", 
        name: "1. සන්ධිකණ්ඩ",
        subCategories: [
            { id: "01_sanna", name: "සංඥා සූත්‍ර" },
            { id: "02_sara", name: "ස්වර සන්ධි" },
            { id: "03_byanjana", name: "ව්‍යංජන සන්ධි" },
            { id: "04_niggahita", name: "නිග්ගහීත සන්ධි" },
            { id: "05_pakati", name: "පකති සන්ධි" }
        ]
    },
    { key: "2_nama", name: "2. නාමකණ්ඩ", subCategories: [{ id: "01_pullinga", name: "පුල්ලිංග" }, { id: "02_itthilinga", name: "ඉත්ථිලිංග" }] },
    { key: "3_karaka", name: "3. කාරකකණ්ඩ", subCategories: [{ id: "01_karaka_general", name: "කාරක විධි" }] },
    { key: "4_samasa", name: "4. සමාසකණ්ඩ", subCategories: [{ id: "01_samasa_general", name: "සමාස විධි" }] },
    { key: "5_taddhita", name: "5. තද්ධිතකණ්ඩ", subCategories: [{ id: "01_taddhita_general", name: "තද්ධිත විධි" }] },
    { key: "6_akhyata", name: "6. ආඛ්‍යාතකණ්ඩ", subCategories: [{ id: "01_akhyata_general", name: "ආඛ්‍යාත විධි" }] },
    { key: "7_kibbhidhana", name: "7. කිබ්බිධානකණ්ඩ", subCategories: [{ id: "01_krt_general", name: "කිත් විධි" }] }
];

// Global State
const AppState = {
    currentMode: 'intro',
    activeKhandaKey: null,
    activeSubKhandaId: null,
    activeSuttaNumber: null,
    activeExampleIndex: 0,
    currentSuttas: []
};

function parseLopaCuts(text) {
    if (!text) return '';
    return text.replace(/~([^~]+)~/g, '<span class="lopa-cut">$1</span>');
}

function switchTheme(themeKey) {
    document.body.setAttribute('data-theme', themeKey);
}

/**
 * Tree View Navigation Render කිරීම
 */
function renderKhandaTreeNavigation() {
    const nav = document.getElementById('khandaListNav');
    if (!nav) return;
    nav.innerHTML = '';

    KHANDAS_CONFIG.forEach(item => {
        const node = document.createElement('div');
        node.className = 'khanda-node';

        const isCurrentActive = (item.key === AppState.activeKhandaKey && AppState.currentMode === 'khanda');

        // ප්‍රධාන ඛාණ්ඩ Button
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `khanda-tab ${isCurrentActive ? 'active' : ''}`;
        btn.setAttribute('data-khanda', item.key);
        btn.innerHTML = `
            <span>📄 ${item.name}</span>
            <span class="chevron-icon" style="font-size:0.75rem;">${isCurrentActive ? '▼' : '▶'}</span>
        `;
        
        btn.onclick = () => selectKhanda(item.key);

        // අනුඛාණ්ඩ Container
        const subContainer = document.createElement('div');
        subContainer.id = `subContainer_${item.key}`;
        subContainer.className = `subkhanda-tree-container ${isCurrentActive ? 'expanded' : ''}`;

        node.appendChild(btn);
        node.appendChild(subContainer);
        nav.appendChild(node);

        if (isCurrentActive) {
            populateSubKhandaUnderButton(item.key, item.subCategories || []);
        }
    });
}

/**
 * අනුඛාණ්ඩ සහ ඒ යටතේම සූත්‍ර ලැයිස්තු Populate කිරීම
 */
function populateSubKhandaUnderButton(khandaKey, subCategories) {
    const container = document.getElementById(`subContainer_${khandaKey}`);
    if (!container) return;
    container.innerHTML = '';

    subCategories.forEach(sub => {
        const subNode = document.createElement('div');
        subNode.className = 'subkhanda-node';

        const isCurrentSub = (AppState.activeSubKhandaId === sub.id && AppState.currentMode === 'khanda');

        // අනුඛාණ්ඩ Button
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `subkhanda-tree-btn ${isCurrentSub ? 'active' : ''}`;
        btn.innerHTML = `
            <span>▸ ${sub.name}</span>
            <span class="sub-chevron" style="font-size:0.7rem;">${isCurrentSub ? '▼' : '▶'}</span>
        `;
        
        btn.onclick = (e) => {
            e.stopPropagation();
            toggleSubKhandaSuttas(sub.id);
        };

        // අනුඛාණ්ඩයට යටින්ම පිහිටන සූත්‍ර ලැයිස්තුව
        const suttaListUl = document.createElement('ul');
        suttaListUl.id = `suttaList_${sub.id}`;
        suttaListUl.className = `sutta-sub-list ${isCurrentSub ? 'expanded' : ''}`;

        // External Database වෙතින් දත්ත ලබා ගැනීම
        const suttasForSub = (window.SuttaDatabase && window.SuttaDatabase[sub.id]) || [];

        if (suttasForSub.length === 0) {
            suttaListUl.innerHTML = `<li style="padding: 0.4rem; font-size: 0.8rem; color: var(--text-muted); font-style: italic;">සූත්‍ර ඇතුළත් කර නොමැත.</li>`;
        } else {
            suttasForSub.forEach(sutta => {
                const li = document.createElement('li');
                li.className = `sutta-sub-item ${sutta.sutta_number === AppState.activeSuttaNumber ? 'active' : ''}`;
                li.innerHTML = `<strong>${sutta.sutta_number}.</strong> ${sutta.sutta_name.split('. ')[1] || sutta.sutta_name}`;
                li.onclick = (e) => {
                    e.stopPropagation();
                    selectSuttaItem(sutta.sutta_number, sub.id);
                };
                suttaListUl.appendChild(li);
            });
        }

        subNode.appendChild(btn);
        subNode.appendChild(suttaListUl);
        container.appendChild(subNode);
    });
}

/**
 * අනුඛාණ්ඩයක් ක්ලික් කළ විට සූත්‍ර ලැයිස්තුව දිගහැරීම / වැසීම
 */
function toggleSubKhandaSuttas(subId) {
    const isAlreadyActive = (AppState.activeSubKhandaId === subId);

    document.querySelectorAll('.sutta-sub-list').forEach(el => el.classList.remove('expanded'));
    document.querySelectorAll('.subkhanda-tree-btn').forEach(el => {
        el.classList.remove('active');
        const chevron = el.querySelector('.sub-chevron');
        if (chevron) chevron.innerText = '▶';
    });

    if (!isAlreadyActive) {
        AppState.activeSubKhandaId = subId;
        const targetUl = document.getElementById(`suttaList_${subId}`);
        if (targetUl) {
            targetUl.classList.add('expanded');
            const currentSubBtn = targetUl.previousElementSibling;
            if (currentSubBtn) {
                currentSubBtn.classList.add('active');
                const chevron = currentSubBtn.querySelector('.sub-chevron');
                if (chevron) chevron.innerText = '▼';
            }
        }

        const suttasForSub = (window.SuttaDatabase && window.SuttaDatabase[subId]) || [];
        AppState.currentSuttas = suttasForSub;

        if (suttasForSub.length > 0) {
            selectSuttaItem(suttasForSub[0].sutta_number, subId);
        }
    } else {
        AppState.activeSubKhandaId = null;
    }
}

/**
 * සූත්‍රයක් තෝරා ගැනීම
 */
function selectSuttaItem(suttaNum, subId) {
    AppState.activeSuttaNumber = suttaNum;
    AppState.activeSubKhandaId = subId;
    AppState.activeExampleIndex = 0;

    document.querySelectorAll('.sutta-sub-item').forEach(el => {
        el.classList.toggle('active', el.innerText.startsWith(`${suttaNum}.`));
    });

    const suttasForSub = (window.SuttaDatabase && window.SuttaDatabase[subId]) || [];
    const sutta = suttasForSub.find(s => s.sutta_number === suttaNum);
    if (!sutta) return;

    renderSuttaWorkspace(sutta);
}

/**
 * ප්‍රධාන ඛාණ්ඩයක් තෝරා ගැනීම සහ නැවත ක්ලික් කළ විට හැකිලීම (Toggle)
 */
function selectKhanda(khandaKey) {
    // විවෘතව ඇති ඛාණ්ඩයම ක්ලික් කළ විට හැකිලීම (Collapse)
    if (AppState.currentMode === 'khanda' && AppState.activeKhandaKey === khandaKey) {
        AppState.currentMode = 'intro';
        AppState.activeKhandaKey = null;
        AppState.activeSubKhandaId = null;
        
        renderKhandaTreeNavigation();
        showShadakaraIntro();
        return;
    }

    AppState.currentMode = 'khanda';
    AppState.activeKhandaKey = khandaKey;
    AppState.activeExampleIndex = 0;

    switchTheme(`khanda-${khandaKey}`);

    const btnIntro = document.getElementById('btnShadakaraIntro');
    if (btnIntro) btnIntro.classList.remove('active');

    const introPanel = document.getElementById('viewIntroPanel');
    const suttaPanel = document.getElementById('viewSuttaPanel');
    if (introPanel) introPanel.style.display = 'none';
    if (suttaPanel) suttaPanel.style.display = 'flex';

    renderKhandaTreeNavigation();

    // පෙරනිමි පළමු අනුඛාණ්ඩය ස්වයංක්‍රීයව දිගහැරීම
    const currentKhandaConfig = KHANDAS_CONFIG.find(k => k.key === khandaKey);
    if (currentKhandaConfig && currentKhandaConfig.subCategories.length > 0) {
        toggleSubKhandaSuttas(currentKhandaConfig.subCategories[0].id);
    }
}

/**
 * 0. ෂඩාකාරය හැඳින්වීම පෙන්වීම
 */
function showShadakaraIntro() {
    AppState.currentMode = 'intro';
    AppState.activeKhandaKey = null;
    AppState.activeSubKhandaId = null;

    switchTheme('intro-shadakara');

    const btnIntro = document.getElementById('btnShadakaraIntro');
    if (btnIntro) btnIntro.classList.add('active');

    document.querySelectorAll('.subkhanda-tree-container').forEach(el => el.classList.remove('expanded'));
    document.querySelectorAll('.khanda-tab').forEach(el => el.classList.remove('active'));

    const introPanel = document.getElementById('viewIntroPanel');
    const suttaPanel = document.getElementById('viewSuttaPanel');
    if (introPanel) introPanel.style.display = 'flex';
    if (suttaPanel) suttaPanel.style.display = 'none';

    renderKhandaTreeNavigation();
    
    // shadakara-view.js හි ඇති නව එන්ජිම මඟින් සම්පූර්ණ ප්‍රවේශය Render කිරීම
    if (typeof renderShadakaraFullIntro === 'function') {
        renderShadakaraFullIntro();
    }
}

/**
 * රූප සටහනේ ආකාරයටම ෂඩාකාර කාඩ්පත් 6 (සූත්‍රයට අදාළ පාලි පාඨය සහිතව) Render කිරීම
 */
function renderSuttaWorkspace(sutta) {
    const khandaConfig = KHANDAS_CONFIG.find(k => k.key === AppState.activeKhandaKey);
    const khandaBadge = document.getElementById('currentKhandaBadge');
    const subBadge = document.getElementById('currentSubKhandaBadge');
    const titleEl = document.getElementById('displaySuttaTitle');
    const vuttiEl = document.getElementById('displaySuttaVutti');

    if (khandaBadge) khandaBadge.innerText = khandaConfig ? khandaConfig.name : '--';
    if (subBadge) subBadge.innerText = sutta.sub_khanda_name || '--';
    if (titleEl) titleEl.innerText = sutta.sutta_name;
    if (vuttiEl) vuttiEl.innerText = sutta.vutti;

    const shad = sutta.shadakara || {};
    const shadGrid = document.getElementById('displayShadakaraGrid');

    // රූපයේ රතු පාට කොටු තුළ ඒ ඒ සූත්‍රයටම අදාළ පාලි පාඨය පෙන්වීම
    if (shadGrid) {
        shadGrid.innerHTML = `
            <!-- 1. සම්බන්ධො -->
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">1</span>
                    <h4 class="shad-card-title">සම්බන්ධො</h4>
                </div>
                <div class="shad-lakkhana-box">
                    ${shad.sambandha_pali || "සුත්තෙ පුබ්බාපරපදානං එකවාක්‍යතාය යොජනා සම්බන්ධො"}
                </div>
                <p class="shad-card-desc">${shad.sambandha || "--"}</p>
            </div>

            <!-- 2. පදං -->
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">2</span>
                    <h4 class="shad-card-title">පදං</h4>
                </div>
                <div class="shad-lakkhana-box">
                    ${shad.pada_pali || "සුත්තෙ පදච්ඡෙදවසෙන පදං වෙදිතබ්බං"}
                </div>
                <p class="shad-card-desc">${shad.pada || "--"}</p>
            </div>

            <!-- 3. පදත්‍ථො -->
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">3</span>
                    <h4 class="shad-card-title">පදත්‍ථො</h4>
                </div>
                <div class="shad-lakkhana-box">
                    ${shad.padattha_pali || "සුත්තත්ථවසෙන පදත්‍ථො වෙදිතබ්බං"}
                </div>
                <p class="shad-card-desc">${shad.padattha || "--"}</p>
            </div>

            <!-- 4. පදවිග්ගහො -->
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">4</span>
                    <h4 class="shad-card-title">පදවිග්ගහො</h4>
                </div>
                <div class="shad-lakkhana-box">
                    ${shad.padaviggaha_pali || "සුත්තෙ විජ්ජමානසමාස-තද්ධිත-කිතකපදානං විග්ගහදස්සනං"}
                </div>
                <p class="shad-card-desc">${shad.padaviggaha || "--"}</p>
            </div>

            <!-- 5. චොදනා -->
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">5</span>
                    <h4 class="shad-card-title">චොදනා</h4>
                </div>
                <div class="shad-lakkhana-box">
                    ${shad.chodana_pali || "සුත්තෙ පදානං පයොජනාදිපුච්ඡනං චොදනා"}
                </div>
                <p class="shad-card-desc">${shad.chodana || "--"}</p>
            </div>

            <!-- 6. පරිහාරො -->
            <div class="shad-aspect-card">
                <div class="shad-card-header">
                    <span class="shad-number-badge">6</span>
                    <h4 class="shad-card-title">පරිහාරො</h4>
                </div>
                <div class="shad-lakkhana-box">
                    ${shad.parihara_pali || "සුත්තෙ පදානං සාත්ථකතාදිදස්සනවසෙන පරිහරණං පරිහාරො"}
                </div>
                <p class="shad-card-desc">${shad.parihara || "--"}</p>
            </div>
        `;
    }

    // සූත්‍රයේ අතිරේක තොරතුරු පෙන්වීම
    renderExtraSuttaInformation(sutta);

    // පද සාධන පියවර පෙන්වීම
    renderDerivationSection(sutta);
}

/**
 * සූත්‍රයේ අතිරේක ව්‍යාකරණ තොරතුරු පෙන්වීම
 * (අක්ෂර 41 ප්‍රදර්ශනය ඇතුළත්ව)
 */
function renderExtraSuttaInformation(sutta) {
    const extraContainer = document.getElementById('extraSuttaDetailsBlock');
    if (!extraContainer) return;

    let html = `
        <h3 class="section-heading">
            <span class="heading-icon">📚</span> සූත්‍ර විමර්ශන අතිරේක තොරතුරු
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            ${sutta.sutta_type ? `
                <div style="background: #FAF8F5; border: 1px solid var(--border-soft); padding: 0.8rem; border-radius: 6px;">
                    <strong style="color: var(--theme-primary);">සූත්‍ර වර්ගය:</strong>
                    <div>${sutta.sutta_type}</div>
                </div>` : ''}
            ${sutta.pada_cheda ? `
                <div style="background: #FAF8F5; border: 1px solid var(--border-soft); padding: 0.8rem; border-radius: 6px;">
                    <strong style="color: var(--theme-primary);">පදච්ඡේදය:</strong>
                    <div>${sutta.pada_cheda}</div>
                </div>` : ''}
            ${sutta.anuvattana ? `
                <div style="background: #FAF8F5; border: 1px solid var(--border-soft); padding: 0.8rem; border-radius: 6px;">
                    <strong style="color: var(--theme-primary);">අනුවර්තනය:</strong>
                    <div>${sutta.anuvattana}</div>
                </div>` : ''}
        </div>
    `;

    // 02 වන සූත්‍රය සඳහා පාලි අක්ෂර මාලාව (අක්ෂර 41) ප්‍රදර්ශනය කිරීම
    if (sutta.akkhara_chart) {
        html += `
            <div class="akkhara-display-card">
                <h4 class="akkhara-group-title">🔤 පාලි අක්ෂර මාලාව (අක්ෂර 41)</h4>
                
                <div class="akkhara-sub-title">⚜️ ස්වර අට (08)</div>
                <div class="akkhara-badges-grid">
                    ${sutta.akkhara_chart.sara.map(ch => `<span class="akkhara-badge sara">${ch}</span>`).join('')}
                </div>

                <div class="akkhara-sub-title">⚜️ වර්ග ව්‍යංජන (25)</div>
                ${sutta.akkhara_chart.vagga.map(v => `
                    <div style="margin-bottom: 0.4rem;">
                        <small style="color: var(--theme-primary); font-weight: bold;">${v.name}:</small>
                        <div class="akkhara-badges-grid" style="margin-top: 0.2rem;">
                            ${v.letters.map(ch => `<span class="akkhara-badge">${ch}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}

                <div class="akkhara-sub-title">⚜️ අවර්ග ව්‍යංජන (07)</div>
                <div class="akkhara-badges-grid">
                    ${sutta.akkhara_chart.avagga.map(ch => `<span class="akkhara-badge">${ch}</span>`).join('')}
                </div>

                <div class="akkhara-sub-title">⚜️ නිග්ගහීතය (01)</div>
                <div class="akkhara-badges-grid">
                    ${sutta.akkhara_chart.niggahita.map(ch => `<span class="akkhara-badge niggahita">${ch}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // ධ්වනි විද්‍යාත්මක ස්ථාන-කරණ-ප්‍රයත්න විවරණය
    if (sutta.phonetics_system) {
        html += `
            <div style="margin-top: 1rem; background: #FAF9F6; border: 1px solid var(--border-soft); padding: 1rem; border-radius: 8px;">
                <h4 style="color: var(--theme-primary); margin-bottom: 0.6rem;">🔬 ධ්වනි විද්‍යාත්මක ස්ථාන-කරණ-ප්‍රයත්න විවරණය</h4>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ස්ථානය / කරණය</th>
                                <th>අදාළ අක්ෂර</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sutta.phonetics_system.sthana_classification.map(s => `
                                <tr>
                                    <td style="font-weight: 700; color: var(--theme-primary);">${s.sthana}</td>
                                    <td>${s.letters}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // සන්න / ටීකා විශේෂ සටහන
    if (sutta.extended_commentary) {
        html += `
            <div style="margin-top: 0.8rem; background: #FDFBF7; border-left: 4px solid var(--theme-accent); padding: 0.8rem; font-size: 0.95rem;">
                <strong>ටීකා / සන්න විශෙෂ සටහන:</strong> ${sutta.extended_commentary}
            </div>
        `;
    }

    extraContainer.innerHTML = html;
}

function renderDerivationSection(sutta) {
    const tabsContainer = document.getElementById('exampleTabsNav');
    const tbody = document.getElementById('derivationStepsBody');
    const finalBox = document.getElementById('displayFinalWord');

    if (!tabsContainer || !tbody || !finalBox) return;
    tabsContainer.innerHTML = '';

    if (!sutta.examples || sutta.examples.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 1.5rem;">මෙම සූත්‍රය සංඥා මාත්‍රයක් හෝ පදසාධන නිදසුන් රහිත සූත්‍රයකි.</td></tr>`;
        finalBox.innerText = '--';
        return;
    }

    sutta.examples.forEach((ex, idx) => {
        const btn = document.createElement('button');
        btn.className = `example-tab-btn ${idx === AppState.activeExampleIndex ? 'active' : ''}`;
        btn.innerText = ex.word;
        btn.onclick = () => {
            AppState.activeExampleIndex = idx;
            document.querySelectorAll('.example-tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
            renderDerivationTable(sutta.examples[idx]);
        };
        tabsContainer.appendChild(btn);
    });

    renderDerivationTable(sutta.examples[AppState.activeExampleIndex]);
}

function renderDerivationTable(exampleObj) {
    const tbody = document.getElementById('derivationStepsBody');
    const finalBox = document.getElementById('displayFinalWord');
    if (!tbody || !finalBox) return;

    tbody.innerHTML = exampleObj.steps.map((st, i) => `
        <tr>
            <td style="font-weight: 700; color: var(--text-muted); width: 50px;">${i + 1}</td>
            <td style="font-weight: 600; font-size: 1.05rem;">${parseLopaCuts(st.formula)}</td>
            <td><span class="rule-badge">${st.rule}</span></td>
        </tr>
    `).join('');

    finalBox.innerText = exampleObj.final_result;
}

function handleGlobalSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) return;

    const items = document.querySelectorAll('.sutta-sub-item');
    AppState.currentSuttas.forEach((s, idx) => {
        const matches = s.sutta_name.toLowerCase().includes(q) ||
                        s.vutti.toLowerCase().includes(q) ||
                        (s.examples && s.examples.some(e => e.word.toLowerCase().includes(q)));
        if (items[idx]) {
            items[idx].style.display = matches ? 'block' : 'none';
        }
    });
}

// ආරම්භක ක්‍රියාත්මක වීම
document.addEventListener('DOMContentLoaded', () => {
    const btnIntro = document.getElementById('btnShadakaraIntro');
    if (btnIntro) {
        btnIntro.addEventListener('click', showShadakaraIntro);
    }

    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleGlobalSearch(e.target.value));
    }

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
    });

    showShadakaraIntro();
});