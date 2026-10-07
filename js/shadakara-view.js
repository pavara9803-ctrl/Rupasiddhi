/**
 * ==========================================================================
 * ෂඩාකාර හැඳින්වීම Render කරන ප්‍රධාන Controller එන්ජිම (js/shadakara-view.js)
 * - ගාථා පැහැදිලි විශාල අකුරින් රන්වන් රාමු තුළ මැදට (Centered) පෙන්වීම
 * - ඡේද නිසි ලෙස වෙන් කර දෙපස සමපාත (Justified) කිරීම
 * - පාලි පාඨ විශේෂිත Typography එකකින් ඉස්මතු කිරීම
 * ==========================================================================
 */

function renderShadakaraFullIntro() {
    const data = window.ShadakaraDetails;
    const introPanel = document.getElementById('viewIntroPanel');
    
    if (!data) {
        console.error("දෝෂය: window.ShadakaraDetails දත්ත ගොනුව හමු නොවීය! (data/0_shadakara_intro/shadakara_details.js පරීක්ෂා කරන්න)");
        return;
    }
    if (!introPanel) return;

    introPanel.innerHTML = `
        <!-- 01. ප්‍රාරම්භක හැඳින්වීම හා ආයාචනය -->
        <div class="panel-card intro-hero-banner">
            <span class="hero-badge">ප්‍රාරම්භක ව්‍යාකරණ ප්‍රවේශය</span>
            <h2 class="hero-title">${data.header_section.title}</h2>
            <div style="margin-top: 0.9rem;">
                <p class="hero-body-text">${data.header_section.lead_paragraph}</p>
            </div>
            
            <div class="appeal-box">
                <div class="appeal-title">☸ <strong>ශාසනික ආයාචනය</strong></div>
                <div class="appeal-content">
                    ${data.header_section.appeal
                        .split('. ')
                        .filter(s => s.trim().length > 0)
                        .map(sentence => `<p>${sentence.trim()}${sentence.endsWith('.') ? '' : '.'}</p>`)
                        .join('')}
                </div>
            </div>
        </div>

        <!-- 02. ෂඩාකාරය යනු කුමක්ද? -->
        <div class="panel-card">
            <h3 class="section-heading"><span class="heading-icon">⚜️</span> ${data.shadakara_definition.title}</h3>
            <p class="text-justified">${data.shadakara_definition.description}</p>
            
            <div class="verse-quote-box">
                <div class="verse-label">« ෂඩාකාර ලක්ෂණ ගාථාව »</div>
                <pre>${data.shadakara_definition.verse}</pre>
            </div>
            
            <div class="shadakara-interactive-grid">
                ${data.shadakara_definition.six_modes.map(m => `
                    <div class="shad-step-card">
                        <div class="shad-step-header">
                            <span class="shad-circle-num">${m.id}</span>
                            <h4 class="shad-step-title">${m.name}</h4>
                        </div>
                        <div class="shad-lakkhana-quote">
                            ${m.pali_lakkhana}
                        </div>
                        <p class="shad-meaning-text text-justified">${m.meaning}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- 03. සූත්‍රයක කොටස් (අඤ්ඤෙ දීඝා ඇසුරින්) -->
        <div class="panel-card">
            <h3 class="section-heading"><span class="heading-icon">📖</span> ${data.sutta_structure.title}</h3>
            <div class="sutta-sample-block">
                <div><strong>මූල සූත්‍රය:</strong> <span class="pali-script-inline">${data.sutta_structure.sutta_text}</span></div>
                <div style="margin-top: 0.6rem;"><strong>වෘත්තිය:</strong> <em class="pali-highlight">${data.sutta_structure.vutti_text}</em></div>
            </div>
            
            <div class="four-parts-grid">
                ${data.sutta_structure.four_parts.map(p => `
                    <div class="part-mini-card">
                        <span class="part-tag">${p.part}</span>
                        <div class="part-content pali-highlight">${p.content}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- 04. සූත්‍රයක ෂඩාකාරය කියන අනුපිළිවෙල -->
        <div class="panel-card">
            <h3 class="section-heading"><span class="heading-icon">📋</span> ${data.method_of_shadakara.title}</h3>
            <div class="table-responsive">
                <table class="timeline-step-table">
                    <tbody>
                        ${data.method_of_shadakara.steps.map(s => {
                            let formattedExample = s.example;
                            if (formattedExample.includes('|')) {
                                formattedExample = formattedExample
                                    .split('|')
                                    .map(part => `<div class="segmented-part text-justified">${part.trim()}</div>`)
                                    .join('');
                            } else {
                                formattedExample = formattedExample.replace(/\n\n/g, '</p><p class="text-justified">').replace(/\n/g, '<br>');
                            }

                            return `
                                <tr>
                                    <td>${s.order}</td>
                                    <td><p class="text-justified">${formattedExample}</p></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="paramparika-note-box">
                📌 <strong>පරම්පරාගත නියාමය:</strong> ${data.method_of_shadakara.paramparika_note}
            </div>
        </div>

        <!-- 05. සූත්‍ර වර්ග හය (6) විමර්ශනය -->
        <div class="panel-card">
            <h3 class="section-heading"><span class="heading-icon">⚖️</span> ${data.six_sutta_types.title}</h3>
            
            <div class="verse-quote-box">
                <div class="verse-label">« ඡබ්බිධ සූත්‍ර ලක්ෂණ ගාථාව »</div>
                <pre>${data.six_sutta_types.verse}</pre>
            </div>
            
            <div class="sutta-types-container">
                ${data.six_sutta_types.types.map(t => `
                    <div class="type-block">
                        <div class="type-block-header">
                            <h4>${t.name}</h4>
                            <span class="type-badge-kind">ලක්ෂණය</span>
                        </div>
                        <div class="type-block-body">
                            <p class="type-desc text-justified">${t.description}</p>${t.example ? `
                                <div class="type-example-box">
                                    <strong>නිදසුන:</strong> <span class="pali-script-inline">${t.example}</span>
                                </div>
                            ` : ''}

                            <!-- විධි සූත්‍ර ගාථාව හෝ අතිදේශ සූත්‍ර ගාථාව -->
                            ${t.verse ? `
                                <div class="verse-quote-box sub-verse-box">
                                    <div class="verse-label">« ${t.name} විවරණ ගාථාව »</div>
                                    <pre>${t.verse}</pre>
                                </div>
                            ` : ''}

                            <!-- විධි සූත්‍ර අටේ වගුව -->
                            ${t.eight_kinds ? `
                                <div class="table-responsive" style="margin-top: 1.1rem;">
                                    <table class="data-table">
                                        <thead>
                                            <tr>
                                                <th style="width: 150px;">විධිය</th>
                                                <th>විස්තරය</th>
                                                <th style="width: 220px;">නිදසුන</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${t.eight_kinds.map(k => `
                                                <tr>
                                                    <td style="font-weight: 700; color: var(--theme-primary);">${k.type}</td>
                                                    <td class="text-justified">${k.desc}</td>
                                                    <td><span class="pali-script-inline">${k.ex}</span></td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            ` : ''}

                            <!-- විධි සූත්‍ර දෙවැදෑරුම් බෙදීම -->
                            ${t.secondary_classification ? `
                                <div class="sub-classification-box">
                                    <strong>${t.secondary_classification.title}</strong>
                                    <ul style="margin: 0.5rem 0 0 1.2rem; line-height: 1.85;">
                                        ${t.secondary_classification.types.map(sc => `
                                            <li class="text-justified"><strong>${sc.name}:</strong>${sc.desc.replace(/\n/g, '<br>')}</li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}

                            <!-- අතිදේශ සය -->
                            ${t.six_kinds ? `
                                <div class="sub-grid-cards">
                                    ${t.six_kinds.map(sk => `
                                        <div class="sub-mini-card">
                                            <div class="sub-title">${sk.name}</div>
                                            <div class="sub-desc text-justified">${sk.desc}</div>
                                            <div style="margin-top: 0.5rem;">
                                                <small style="color: var(--text-muted); font-weight: 700;">නිදසුන:</small>
                                                <div class="pali-script-inline" style="display: block; margin-top: 0.25rem;">${sk.example}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}

                            <!-- අධිකාර තෙවැදෑරුම -->
                            ${t.three_kinds ? `
                                <div class="sub-grid-cards">
                                    ${t.three_kinds.map(tk => `
                                        <div class="sub-mini-card">
                                            <div class="sub-title">${tk.name}</div>
                                            <div class="sub-desc text-justified">${tk.desc}</div>
                                            <div style="margin-top: 0.5rem;">
                                                <small style="color: var(--text-muted); font-weight: 700;">නිදසුන:</small>
                                                <div class="pali-script-inline" style="display: block; margin-top: 0.25rem;">${tk.example}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- 06. පද විග්‍රහ කිරීමේ ක්‍රමවේදය (නාම හා ආඛ්‍යාත) -->
        <div class="panel-card">
            <h3 class="section-heading"><span class="heading-icon">🔍</span> ${data.parsing_methodology.title}</h3>
            <div class="parsing-grid">
                <!-- නාම පද විග්‍රහය -->
                <div class="parsing-column">
                    <h4 class="parsing-title">🏷️ ${data.parsing_methodology.noun_parsing.heading}</h4>
                    <div class="stepper-flow">
                        ${data.parsing_methodology.noun_parsing.steps.map((st, i) => `
                            <div class="step-flow-item">
                                <span class="step-flow-num">${i + 1}</span>
                                <span>${st.replace(/^\d+\.\s*/, '')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="parsing-note text-justified">
                        ${data.parsing_methodology.noun_parsing.special_notes}
                    </div>
                </div>

                <!-- ක්‍රියා පද විග්‍රහය -->
                <div class="parsing-column">
                    <h4 class="parsing-title">⚙️ ${data.parsing_methodology.verb_parsing.heading}</h4>
                    <div class="stepper-flow">
                        ${data.parsing_methodology.verb_parsing.steps.map((st, i) => `
                            <div class="step-flow-item">
                                <span class="step-flow-num">${i + 1}</span>
                                <span>${st.replace(/^\d+\.\s*/, '')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="parsing-example-box">
                        <strong>නිදසුන:</strong> <span class="pali-script-inline">${data.parsing_methodology.verb_parsing.example.word}</span>
                        <p style="margin-top: 0.4rem; font-weight: 600;" class="text-justified">${data.parsing_methodology.verb_parsing.example.analysis}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 07. පූජෝපහාරය හා ප්‍රාර්ථනය -->
        <div class="panel-card colophon-card">
            <p class="colophon-text text-justified">${data.colophon.sources_acknowledgment}</p>
            <div class="colophon-blessing text-justified">
                🙏 ${data.colophon.final_blessing}
            </div>
        </div>
    `;
}