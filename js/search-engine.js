/* ============================================================
 * renderer.js — සියලු HTML ජනන ශ්‍රිත
 * දත්ත ව්‍යුහය සමජාතීය බැවින් සියලු කණ්ඩවලට භාවිතා කළ හැක.
 * ============================================================ */

const getExamples = r => r.examplesList || r.examples || [];
const getExamplesMeaning = r => r.examplesMeaning || [];
const stepText = s => (s.text !== undefined ? s.text : s.expr);

function esc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let _query = '';
function setQuery(q) { _query = q; }
/* විශේෂ වචන bold කිරීම:
 *  1) "1. සම්බන්ධො - ..." ආකාරයේ අංකිත පද (අංකය සහිතව)
 *  2) පේළිය අරඹන "පදං - ..." ආකාරයේ පද (වචන 2ක් දක්වා)
 *  3) දත්තයේ **වචනය** ලෙස ලියූ කොටස්
 *  4) ‘ ’  “ ”  " " උද්ධෘත ලකුණු තුළ ඇති කෙටි වචන (අකුරු/පද)  */
const _T = '[^\\s\\d.,:;()\\-–—<>&]';
const _TERM = `${_T}+(?: ${_T}+)?`;
const RE_NUMBERED = new RegExp(`(\\d+\\.\\s*)(${_TERM})(?=\\s[-–—]\\s)`, 'g');
const RE_LINE_TERM = new RegExp(`(^|\\n)(${_TERM})(?=\\s[-–—]\\s)`, 'g');
function emphasize(safe) {
    return safe
        .replace(RE_NUMBERED, '<strong>$1$2</strong>')
        .replace(RE_LINE_TERM, '$1<strong>$2</strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/(‘[^’<]{1,40}’|“[^”<]{1,40}”|&quot;[^&<]{1,40}&quot;)/g, '<strong>$1</strong>');
}
function hl(text) {
    const safe = emphasize(esc(text));
    if (!_query) return safe;
    const q = esc(_query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(q, 'gi');
    // HTML ටැග් තුළ නොව, පෙළ තුළ පමණක් සෙවුම highlight කරයි
    return safe.split(/(<[^>]+>)/).map(p =>
        p.startsWith('<') ? p : p.replace(re, m => `<mark class="hit">${m}</mark>`)
    ).join('');
}

function haystack(r) {
    const parts = [r.sutra, r.explanation, r.sutraMeaning, r.explanationMeaning, String(r.ruleNumber)];
    getExamples(r).forEach(e => parts.push(e));
    getExamplesMeaning(r).forEach(m => parts.push(m));
    (r.notes || []).forEach(n => parts.push(n));
    (r.notesMeaning || []).forEach(n => parts.push(n));
    (r.augments || []).forEach(a => parts.push(a.letter, a.details));
    if (r.sixfold) {
        Object.values(r.sixfold).forEach(v => parts.push(v));
    }
    (r.derivations || []).forEach(d => {
        parts.push(d.word, d.split, d.meaning);
        d.steps.forEach(s => parts.push(stepText(s), s.rule));
    });
    return parts.filter(Boolean).join(' ').toLowerCase();
}

/* ============================================================
 * කැපුනු අකුරු පරිවර්තකය — SVG ක්‍රමය
 *
 * ආකෘති දෙකක් හඳුනාගනී:
 *  1) | ලකුණ අතර ඇති අකුරු — උදා: "ලොක් - |අ| + අග්ගපුග්ගලො"
 *  2) \ ලකුණට පසු ඇති අකුරු — උදා: "ලොක් \ අ + අග්ගපුග්ගලො"
 *
 * දෙකම එකම ආකාරයට SVG ඉරක් මැදින් ඇඳේ.
 * ============================================================ */
function convertStrike(text) {
    if (!text) return '';
    let safe = esc(text);

    // (1) | | ලකුණු ආකෘතිය
    safe = safe.replace(/\|([^|]+)\|/g, (match, chars) => {
        return `<span class="strike-wrap">${chars}<svg class="strike-svg" viewBox="0 0 100 12" preserveAspectRatio="none"><line x1="0" y1="6" x2="100" y2="6"/></svg></span>`;
    });

    // (2) \ ලකුණු ආකෘතිය — \ ට පසු ඇති අකුරු (ඊළඟ space / + / - දක්වා)
    safe = safe.replace(/\\([^\s+\-]+)/g, (match, chars) => {
        return `<span class="strike-wrap">${chars}<svg class="strike-svg" viewBox="0 0 100 12" preserveAspectRatio="none"><line x1="0" y1="6" x2="100" y2="6"/></svg></span>`;
    });

    return safe;
}

/* ============================================================
 * පද සාදන ප්‍රකාශනය — සංකේත ආකර්ෂණීය ලෙස දර්ශනය කිරීම
 * ============================================================ */
function formatPadaExpr(expr) {
    if (!expr) return '';

    // මුලින්ම කැපුනු අකුරු SVG බවට පත් කරන්න
    let out = convertStrike(expr);

    // + ලකුණ (රන්වන්)
    out = out.replace(/\s\+\s/g, ' <span class="plus">+</span> ');

    // → ඊතලය
    out = out.replace(/→/g, '<span class="arrow">→</span>');

    // ← ඊතලය
    out = out.replace(/←/g, '<span class="arrow">←</span>');

    // ↙ ඊතලය
    out = out.replace(/↙/g, '<span class="arrow">↙</span>');

    // ↳ ඊතලය (අවසාන පියවර සඳහා)
    out = out.replace(/↳/g, '<span class="arrow">↳</span>');

    // " - " (හයිෆන්) සංකේතය (අකුරු වෙන් කිරීම සඳහා)
    out = out.replace(/\s-\s/g, ' <span class="op">-</span> ');

    return out;
}

/* ============================================================
 * ෂඩාකාරය
 * ============================================================ */
function renderSixfold(r) {
    if (!r.sixfold) return '';

    const s = r.sixfold;
    const labels = {
        sambandho: "සම්බන්ධො",
        padam: "පදං",
        padattho: "පදත්ථො",
        padaviggaho: "පදවිග්ගහො",
        codana: "චොදනා",
        pariharo: "පරිහාරො"
    };
    const icons = {
        sambandho: "🔗",
        padam: "📝",
        padattho: "📖",
        padaviggaho: "🔍",
        codana: "❓",
        pariharo: "✅"
    };

    let html = `
        <div class="section-title st-six">ෂඩාකාරය</div>
        <div class="sixfold-grid">`;

    Object.keys(labels).forEach(key => {
        if (s[key]) {
            html += `
                <div class="sixfold-card f-${key}">
                    <span class="sixfold-icon">${icons[key]}</span>
                    <div class="sixfold-label">${labels[key]}</div>
                    <div class="sixfold-text">${hl(s[key])}</div>
                </div>`;
        }
    });

    html += '</div>';
    return html;
}

/* ============================================================
 * උදාහරණ
 * ============================================================ */
function renderExamples(r, ruleIdx, openExamplesFor) {
    const examples = getExamples(r);
    const meanings = getExamplesMeaning(r);
    if (!examples.length) return '';

    const isOpen = openExamplesFor === ruleIdx;

    let bodyHtml = '';
    if (meanings.length === examples.length) {
        bodyHtml = `
            <div class="example-cards">
                ${examples.map((e, i) => `
                    <div class="example-card">
                        <span class="ex-word">${hl(e)}</span>
                        <span class="ex-arrow">➜</span>
                        <span class="ex-meaning">${hl(meanings[i])}</span>
                    </div>`).join('')}
            </div>`;
    } else {
        bodyHtml = `
            <div class="examples-flex">
                ${examples.map(e => `<span class="example-pill">${hl(e)}</span>`).join('')}
            </div>`;
    }

    return `
        <div class="collapsible-section ${isOpen ? 'open' : ''}">
            <button class="collapsible-header" onclick="toggleExamples(${ruleIdx})">
                <span class="toggle-icon">▸</span>
                <span>අදාළ උදාහරණ පද</span>
                <span class="count-badge">${examples.length}</span>
            </button>
            ${isOpen ? '' : '<div class="collapsible-hint">පද බැලීමට ඉහත ශීර්ෂකය ක්ලික් කරන්න.</div>'}
            <div class="collapsible-body">${bodyHtml}</div>
        </div>`;
}

/* ============================================================
 * සටහන්
 * ============================================================ */
function renderNotes(r) {
    if (!r.notes || !r.notes.length) return '';
    const meanings = r.notesMeaning || [];
    return `
        <div class="section-title st-note">විශේෂ සටහන්</div>
        <ul class="notes-list">
            ${r.notes.map((n, i) => `
                <li>
                    <span class="note-text">${hl(n)}</span>
                    ${meanings[i] ? `<span class="note-meaning"><span class="nm-label">තේරුම</span>${hl(meanings[i])}</span>` : ''}
                </li>`).join('')}
        </ul>`;
}

/* ============================================================
 * පද සාදන පියවර — SVG කැපුම් සමඟ
 * ============================================================ */
function renderDerivations(r) {
    const ders = r.derivations || [];
    if (!ders.length) return '<p class="no-data">මෙම සූත්‍රය සඳහා පද විශ්ලේෂණ පියවර දක්වා නොමැත.</p>';

    return ders.map(d => `
        <div class="derivation-card">
            <div class="derivation-header">
                <span class="target-word">${hl(d.word)}</span>
                <span class="split-word">(${hl(d.split)})</span>
            </div>
            ${d.meaning ? `<div class="derivation-meaning"><span class="dm-label">තේරුම</span>${hl(d.meaning)}</div>` : ''}
            <table class="step-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>පද අවස්ථාව</th>
                        <th>යෙදූ සූත්‍රය / විධිය</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.steps.map((s, n) => `
                        <tr>
                            <td class="step-num">${n + 1}.</td>
                            <td class="step-expr">${formatPadaExpr(stepText(s))}</td>
                            <td class="step-rule">${hl(s.rule)}</td>
                        </tr>`).join('')}
                </tbody>
            </table>
        </div>`).join('');
}

/* ============================================================
 * ප්‍රධාන සූත්‍ර රෙන්ඩරය
 * ============================================================ */
function renderRule(r, ctx, openExamplesFor) {
    // ctx: { kandaName, sectionName, ruleIdx }
    let html = `
        <div class="sutra-card">
            ${ctx.kandaName ? `<span class="kanda-tag">${esc(ctx.kandaName)}${ctx.sectionName ? ' · ' + esc(ctx.sectionName) : ''}</span>` : ''}
            <div class="card-header">
                <span class="sutra-id">සූත්‍ර අංක ${esc(r.ruleNumber)}</span>
                <h2 class="sutra-title">${hl(r.sutra)}</h2>
            </div>`;

    if (r.sutraMeaning) {
        html += `
            <div class="sutra-meaning-banner">
                <span class="label">සූත්‍ර තේරුම</span>
                <span class="meaning-text">${hl(r.sutraMeaning)}</span>
            </div>`;
    }
    if (r.explanation) {
        html += `
            <div class="explanation-box">
                <strong>සූත්‍ර විවරණය:</strong>
                <span class="exp-text">${hl(r.explanation)}</span>
            </div>`;
    }
    if (r.explanationMeaning) {
        html += `
            <div class="meaning-box">
                <span class="meaning-label">විවරණයේ තේරුම</span>
                <span class="meaning-text">${hl(r.explanationMeaning)}</span>
            </div>`;
    }

    // ෂඩාකාරය (sixfold)
    html += renderSixfold(r);

    // උදාහරණ
    html += renderExamples(r, ctx.ruleIdx, openExamplesFor);

    // සටහන්
    html += renderNotes(r);

    // ආගම අක්ෂර
    if (r.augments && r.augments.length) {
        html += `
            <div class="section-title st-aug">ආගම අක්ෂර (${r.augments.length})</div>
            <div class="augment-grid">
                ${r.augments.map(a => `
                    <div class="augment-card">
                        <h4>${hl(a.letter)}</h4>
                        <p>${hl(a.details)}</p>
                    </div>`).join('')}
            </div>`;
    }

    // පද සාදන පියවර
    if (r.derivations && r.derivations.length) {
        html += `
            <div class="section-title st-der">පද සාදන රූපසිද්ධි පියවර (${r.derivations.length})</div>
            <div class="derivation-container">${renderDerivations(r)}</div>`;
    }

    html += '</div>';
    return html;
}