// ==========================================================
// 홈 화면 알림 팝업 — 여러 장을 넘겨 보는 카드(슬라이드)
//   - 카드 순서·내용은 아래 SLIDES 에서 바꿉니다. (배열 순서 = 보이는 순서)
//   - 팝업을 끄려면 POPUP_ACTIVE 를 false 로 바꾸면 됩니다.
//   - "오늘 하루 보지 않기"를 누르면 그날은 다시 뜨지 않습니다.
// ==========================================================
var POPUP_ACTIVE = true;
var POPUP_ID = 'home-2026-11b';

var SLIDES = [
    {   // 캡스톤디자인 2년 연속 1위
        type: 'capstone',
        streak: '2',
        badge: 'Capstone Design Award',
        title: '1st Place, Two Years Running',
        titleKo: '<span class="nb">한남대학교 건설환경공학과</span> <span class="nb">캡스톤디자인 2년 연속 1위</span>',
        org: '<span class="nb">Department of Civil and Environmental Engineering,</span> <span class="nb">HANNAM UNIVERSITY</span>',
        advisor: 'Advisor: Prof. Min Kyoung KIM',
        items: [
            { year: '2025', project: 'Design of an Urban Smart Hybrid Disaster Prevention System for Extreme Rainfall Response',
              projectKo: '<span class="nb">극한 호우 대응 도시형</span> <span class="nb">스마트 하이브리드 방재 시스템 설계</span>',
              team: '김경후, 김민재, 육찬솔, 이도희, 이재혁, 이환희',
              thumb: 'img/capstone-2025-thumb.webp', poster: 'img/capstone-2025-poster.webp' },
            { year: '2024', project: 'AQUA FLEX BRIDGE', projectKo: '수위 변화 대응 차세대 스마트 교량',
              team: '유성, 임용석, 이효열, 지성현, 조재성, 류태호, 강태규',
              thumb: 'img/capstone-2024-thumb.webp', poster: 'img/capstone-2024-poster.webp' }
        ]
    },
    {   // 1. 구성원 모집
        type: 'join',
        badge: 'Join SMS Lab',
        title: 'Build smarter<br>infrastructure with us.',
        titleKo: 'SMS 연구실과 함께할 대학원생·학부연구생을 모집합니다',
        roles: [
            { en: 'M.S. Students', ko: '석사과정' },
            { en: 'Undergraduate Researchers', ko: '학부연구생' }
        ],
        areas: [
            { key: 'Make', en: 'Smart construction materials', ko: '스마트 건설재료 개발' },
            { key: 'Sense', en: 'Self-sensing concrete and monitoring', ko: '자가감지 콘크리트·모니터링' },
            { key: 'Restore', en: 'Repair and strengthening', ko: '보수보강 재료·기술' }
        ],
        email: 'mkkim9112@hnu.kr',
        office: 'Room 1004 · 교수 연구실 1004호'
    },
    {   // 2. 학생 1저자 논문 — 학생별로 묶어 이름·과정을 강조
        type: 'students',
        badge: 'Student Research Highlights',
        title: 'Students lead as first authors.',
        titleKo: '학생 1저자 발표논문',
        link: 'publications.html',
        people: [
            { name: 'Gun Ho HA', ko: '하건호', level: 'M.S. Student', levelKo: '석사과정', photo: 'img/Gun Ho Ha.jpg?v=2',
              papers: [
                { idx: 'SCI(E)', year: '2026', venue: 'Case Studies in Construction Materials', title: 'Capacitance-based self-sensing response of smart ultra-high-performance concrete under cyclic and monotonic compressive loading' },
                { idx: 'KCI', year: '2026', venue: '한국건설순환자원학회 논문집', title: '시멘트 기반 재료의 정전용량 기반 자기감지 거동 및 유전 분극 메커니즘' }
              ] },
            { name: 'Seong YU', ko: '유성', level: 'M.S. Student', levelKo: '석사과정', photo: 'img/Seong Yu.jpg',
              papers: [
                { idx: 'SCI(E)', year: '2027', venue: 'Measurement', title: 'Monitoring of submerged and chloride-rich environments using apparent electrical resistivity and capacitance of self-sensing concrete' },
                { idx: 'KCI', year: '2025', venue: '한국건설순환자원학회 논문집', title: '해수 수위 및 측정 조건에 따른 시멘트 복합재료의 전기저항률 및 정전용량 특성 분석' }
              ] },
            { name: 'Jae Hyeok LEE', ko: '이재혁', level: 'Undergraduate Researcher', levelKo: '학부연구생', photo: 'img/Jae Hyeok Lee.jpg',
              papers: [
                { idx: 'KCI', year: '2025', venue: '한국건설순환자원학회 논문집', title: '잔골재를 혼입한 슬래그 기반 알칼리 활성 무시멘트의 내구성능 및 평가 방법 유효성 검토' }
              ] }
        ]
    },
    {   // 4. 신진연구 과제
        type: 'project',
        badge: 'New NRF Project',
        title: 'Development of smart diagnostic technology for internal degradation and strength reduction in structures using self-sensing signal interpretation',
        titleKo: '자기감지 신호해석을 활용한 구조물 내부 열화 및 강도저하 스마트 진단기술 개발',
        start: '2026-03', end: '2031-02',
        program: 'Early Career Research (Type B) · 신진연구(유형B)',
        funder: 'Ministry of Science and ICT · 과학기술정보통신부',
        role: 'Principal Investigator · 연구책임자',
        tags: ['Self-sensing signal', 'Internal degradation', 'Strength reduction', 'Smart diagnosis'],
        link: 'projects.html'
    },
    {   // 3. 2026 수상
        type: 'awards',
        badge: 'Awards 2026',
        title: 'Three awards this year.',
        titleKo: '2026년 학회 수상',
        items: [
            { date: '2026.11.20', en: 'Women Researcher Award', ko: '여성연구자상',
              org: 'Korea Institute for Structural Maintenance and Inspection (KSMI)', orgKo: '한국구조물진단유지관리공학회',
              image: 'img/award-2026-ksmi-women.webp' },
            { date: '2026.10.29', en: 'Best Paper Award', ko: '논문상',
              org: 'Korean Recycled Construction Resources Institute (KOREC)', orgKo: '한국건설순환자원학회',
              paper: '고흡수성 수지를 활용한 스마트 UHPC의 전기역학적 거동 평가',
              image: 'img/award-2026-korec-paper.webp' },
            { date: '2026.10.01', en: 'Best Paper Presentation Award', ko: '우수논문발표상',
              org: 'KSMI 2026 Spring Conference', orgKo: '한국구조물진단유지관리공학회 2026년 봄 학술발표회',
              paper: '비파괴 조사를 통한 단면복구공사의 보수재 타설 방법에 따른 성능 비교',
              image: 'img/award-2026-ksmi-presentation.webp' }
        ]
    }
];

(function () {
    if (!POPUP_ACTIVE || !SLIDES.length) return;
    var KEY = 'sms-popup-hide:' + POPUP_ID;
    function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    try { if (localStorage.getItem(KEY) === today()) return; } catch (e) {}

    function capstone(s) {
        var cards = s.items.map(function (it) {
            return '<article class="np-card">' +
                '<a class="np-poster" href="' + it.poster + '" target="_blank" rel="noopener" aria-label="' + it.year + ' 포스터 크게 보기">' +
                    '<img src="' + it.thumb + '" alt="' + it.year + ' 캡스톤디자인 포스터">' +
                    '<span class="np-year"><b>1st</b>' + it.year + '</span>' +
                    '<span class="np-zoom">View poster</span>' +
                '</a>' +
                '<p class="np-en">' + it.project + '</p>' +
                '<p class="np-kr">' + it.projectKo + '</p>' +
                '<p class="np-team">' + it.team + '</p>' +
            '</article>';
        }).join('');
        return '<div class="np-slide np-s-cap">' +
            '<div class="np-head">' +
                '<div class="np-streak" aria-hidden="true"><span class="np-streak-n">' + s.streak + '</span><span class="np-streak-t">years<br>in a row</span></div>' +
                '<div class="np-head-text">' +
                    '<span class="np-badge">' + s.badge + '</span>' +
                    '<h2>' + s.title + '</h2>' +
                    '<p class="np-ko">' + s.titleKo + '</p>' +
                    '<p class="np-org">' + s.org + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="np-cards">' + cards + '</div>' +
            '<p class="np-advisor">' + s.advisor + '</p>' +
        '</div>';
    }
    var JOIN_ICONS = {
        Make: '<svg viewBox="0 0 48 48"><rect x="8" y="18" width="32" height="22" rx="3"/><path d="M8 26h32M18 18v22M30 18v22"/><path d="M16 10l8-4 8 4"/></svg>',
        Sense: '<svg viewBox="0 0 48 48"><path d="M4 30h8l4-14 6 24 6-18 4 8h12"/></svg>',
        Restore: '<svg viewBox="0 0 48 48"><path d="M8 38h32M12 38V18h24v20"/><path d="M20 18l4 8-3 4 4 8" stroke-dasharray="3 3"/><path d="M30 10l6 6M33 13l-9 9"/></svg>'
    };
    function join(s) {
        var roles = s.roles.map(function (r, i) {
            return '<li class="jn-role' + (i === 0 ? ' is-main' : '') + '"><span class="jn-role-n">0' + (i + 1) + '</span><b>' + r.ko + '</b><span class="jn-role-en">' + r.en + '</span></li>';
        }).join('');
        var areas = s.areas.map(function (r) {
            return '<li class="jn-area"><span class="jn-ic" aria-hidden="true">' + (JOIN_ICONS[r.key] || '') + '</span><em>' + r.key + '</em><b>' + r.ko + '</b><span>' + r.en + '</span></li>';
        }).join('');
        return '<div class="np-slide np-s-join">' +
            '<span class="np-badge">' + s.badge + '</span>' +
            '<h2>' + s.title + '</h2>' +
            '<p class="np-ko">' + s.titleKo + '</p>' +
            '<div class="jn-board">' +
                '<div class="jn-left"><p class="jn-h">We are recruiting</p><ul class="jn-roles">' + roles + '</ul></div>' +
                '<div class="jn-right"><p class="jn-h">What you will work on</p><ul class="jn-areas">' + areas + '</ul></div>' +
            '</div>' +
            '<div class="jn-cta"><span class="jn-cta-t">관심 있는 학생은 언제든 연락 주세요</span><a class="jn-mail" href="mailto:' + s.email + '?subject=SMS%20Lab%20%EC%A7%80%EC%9B%90%20%EB%AC%B8%EC%9D%98">' + s.email + '</a><span class="jn-room">' + s.office + '</span></div>' +
        '</div>';
    }
    function students(s) {
        function slot(p, kind) {
            var x = p.papers.filter(function (q) { return q.idx === kind; })[0];
            if (!x) return '<div class="st-slot is-empty"></div>';
            return '<div class="st-slot"><span class="st-idx' + (kind === 'KCI' ? ' is-kci' : '') + '">' + kind + '</span><span class="st-yr">' + x.year + '</span>' +
                   '<p class="st-t">' + x.title + '</p><p class="st-v">' + x.venue + '</p></div>';
        }
        var cols = s.people.map(function (p) {
            return '<article class="st-card">' +
                '<div class="st-who"><img src="' + p.photo + '" alt="' + p.ko + '" loading="lazy">' +
                    '<p class="st-name">' + p.ko + '</p><p class="st-en">' + p.name + '</p>' +
                    '<p class="st-level">' + p.levelKo + '</p><p class="st-level-en">' + p.level + '</p></div>' +
                slot(p, 'SCI(E)') + slot(p, 'KCI') +
            '</article>';
        }).join('');
        return '<div class="np-slide np-s-students">' +
            '<span class="np-badge">' + s.badge + '</span>' +
            '<h2>' + s.title + '</h2>' +
            '<p class="np-ko">' + s.titleKo + '</p>' +
            '<div class="st-grid">' + cols + '</div>' +
            '<a class="np-more" href="' + s.link + '">See all publications</a>' +
        '</div>';
    }
    function project(s) {
        var p = function (v) { var a = v.split('-'); return +a[0] * 12 + (+a[1] - 1); };
        var now = new Date(), total = p(s.end) - p(s.start) + 1, done = Math.min(total, Math.max(0, now.getFullYear() * 12 + now.getMonth() - p(s.start) + 1));
        var pct = Math.round(done / total * 100), y0 = +s.start.slice(0, 4), y1 = +s.end.slice(0, 4);
        var ticks = ''; for (var y = y0; y <= y1; y++) ticks += '<span>' + y + '</span>';
        return '<div class="np-slide np-s-project">' +
            '<span class="np-badge">' + s.badge + '</span>' +
            '<p class="pj-years">' + s.start.replace('-', '.') + ' – ' + s.end.replace('-', '.') + ' · 5 years</p>' +
            '<h2>' + s.title + '</h2>' +
            '<p class="np-ko">' + s.titleKo + '</p>' +
            '<div class="pj-years-grid">' + (function () {
                var o = '', cy = now.getFullYear();
                for (var k = 0; k < 5; k++) {
                    var y = y0 + k, st = y < cy ? 'is-done' : (y === cy ? 'is-now' : '');
                    o += '<div class="pj-y ' + st + '"><span>Year ' + (k + 1) + '</span><b>' + y + (k === 4 ? '–' + y1 : '') + '</b>' + (st === 'is-now' ? '<em>Now</em>' : '') + '</div>';
                }
                return o;
            })() + '</div>' +
            '<div class="pj-track" aria-label="진행 ' + pct + '%"><i style="--pct:' + pct + '%"></i></div>' +
            '<p class="pj-pct"><b>' + pct + '%</b> of the 5-year project · 5년 과제 중 ' + pct + '% 진행</p>' +
            '<ul class="pj-tags">' + s.tags.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
            '<dl class="pj-meta"><div><dt>Program</dt><dd>' + s.program + '</dd></div><div><dt>Funded by</dt><dd>' + s.funder + '</dd></div><div><dt>Role</dt><dd>' + s.role + '</dd></div></dl>' +
            '<a class="np-more" href="' + s.link + '">See all projects</a>' +
        '</div>';
    }
    function explain(s) {
        var steps = s.steps.map(function (t, i) {
            return '<li><span class="ex-n">' + (i + 1) + '</span><b>' + t.en + ' <small>' + t.ko + '</small></b><p>' + t.text + '</p><p class="ex-ko">' + t.textKo + '</p></li>';
        }).join('');
        var L = '', R = '';
        for (var i = 0; i <= 120; i++) {
            var u = i / 120, c = u * 3 % 1, tri = c < .5 ? c * 2 : 2 - c * 2, x = (20 + u * 300).toFixed(1);
            L += (i ? 'L' : 'M') + x + ' ' + (150 - tri * 70).toFixed(1);
            R += (i ? 'L' : 'M') + x + ' ' + (40 + tri * 66 + Math.sin(u * 90) * 1.6).toFixed(1);
        }
        return '<div class="np-slide np-s-explain">' +
            '<span class="np-badge">' + s.badge + '</span>' +
            '<h2>' + s.title + '</h2>' +
            '<p class="np-ko">' + s.titleKo + '</p>' +
            '<div class="ex-body">' +
                '<div class="ex-fig" aria-hidden="true"><svg viewBox="0 0 340 180">' +
                    '<path d="M20 160 H330 M20 20 V160" stroke="#C9D3DF" stroke-width="1.4" fill="none"/>' +
                    '<path class="ex-line ex-load" d="' + L + '"/>' +
                    '<path class="ex-line ex-sig" d="' + R + '"/>' +
                    '<g font-size="11" font-weight="700"><text x="226" y="14" fill="#D23A4E">Resistance ΔR/R₀</text><text x="226" y="176" fill="#7B8794">Load</text></g>' +
                '</svg></div>' +
                '<ol class="ex-steps">' + steps + '</ol>' +
            '</div>' +
            '<a class="np-more" href="' + s.link + '">Explore our research</a>' +
        '</div>';
    }
    function awards(s) {
        var cards = s.items.map(function (it) {
            return '<article class="aw-card">' +
                '<a class="aw-cert" href="' + it.image + '" target="_blank" rel="noopener" aria-label="' + it.ko + ' 상장 크게 보기"><img src="' + it.image + '" alt="' + it.ko + ' 상장" loading="lazy"></a>' +
                '<p class="aw-date">' + it.date + '</p>' +
                '<p class="aw-en">' + it.en + '</p>' +
                '<p class="aw-ko">' + it.ko + '</p>' +
                '<p class="aw-org">' + it.org + '<span>' + it.orgKo + '</span></p>' +
                (it.paper ? '<p class="aw-paper">' + it.paper + '</p>' : '') +
            '</article>';
        }).join('');
        return '<div class="np-slide np-s-awards">' +
            '<span class="np-badge">' + s.badge + '</span>' +
            '<h2>' + s.title + '</h2>' +
            '<p class="np-ko">' + s.titleKo + '</p>' +
            '<div class="aw-grid">' + cards + '</div>' +
        '</div>';
    }
    function yir(s) {
        var c = s.citations, ratio = (c.now / c.prev).toFixed(1);
        var tiles = s.tiles.map(function (t) {
            return '<li class="yir-tile"><div class="yir-num" data-to="' + t.to + '">0' + (t.unit ? '<small>' + t.unit + '</small>' : '') + '</div>' +
                   '<div class="yir-lab">' + t.label + '</div><div class="yir-lab-ko">' + t.ko + '</div></li>';
        }).join('');
        return '<div class="np-slide np-s-yir">' +
            '<span class="yir-kick">' + s.kicker + '</span>' +
            '<h2>' + s.title + '</h2>' +
            '<p class="yir-ko">' + s.titleKo + '</p>' +
            '<ul class="yir-tiles">' +
                '<li class="yir-tile is-hero"><span class="yir-x">&times;' + ratio + '</span>' +
                    '<div class="yir-num" data-to="' + c.now + '">0</div>' +
                    '<div class="yir-lab">' + c.label + '</div><div class="yir-lab-ko">' + c.ko + '</div>' +
                    '<div class="yir-chart" aria-hidden="true">' +
                        '<div class="yir-bar" data-h="' + Math.round(c.prev / c.now * 100) + '"><b>' + c.prev + '</b><i>' + (new Date().getFullYear() - 1) + '</i></div>' +
                        '<div class="yir-bar is-now" data-h="100"><b>' + c.now + '</b><i>' + new Date().getFullYear() + '</i></div>' +
                    '</div></li>' +
                tiles +
            '</ul>' +
        '</div>';
    }
    var R = { capstone: capstone, join: join, students: students, project: project, explain: explain, yir: yir, awards: awards };

    document.addEventListener('DOMContentLoaded', function () {
        var n = SLIDES.length;
        var dots = '';
        for (var i = 0; i < n; i++) dots += '<button type="button" aria-label="' + (i + 1) + '번째 카드"></button>';
        var wrap = document.createElement('div');
        wrap.className = 'np-backdrop';
        wrap.innerHTML =
            '<div class="np" role="dialog" aria-modal="true" aria-label="알림">' +
                '<div class="np-viewport"><div class="np-track">' + SLIDES.map(function (s) { return R[s.type](s); }).join('') + '</div></div>' +
                '<div class="np-foot">' +
                    (n > 1 ? '<div class="np-nav"><button type="button" class="np-arr np-prev" aria-label="이전 카드">&#8249;</button><div class="np-dots">' + dots + '</div><button type="button" class="np-arr np-next" aria-label="다음 카드">&#8250;</button></div>' : '') +
                    '<label class="np-today"><input type="checkbox"> 오늘 하루 보지 않기</label>' +
                    '<button type="button" class="np-close">Close</button>' +
                '</div>' +
                '<button type="button" class="np-x" aria-label="닫기">&times;</button>' +
            '</div>';
        document.body.appendChild(wrap);

        var track = wrap.querySelector('.np-track'), viewport = wrap.querySelector('.np-viewport'), slides = track.children, dotEls = wrap.querySelectorAll('.np-dots button');
        function fit() {   // 모든 카드를 같은 높이로: 가장 긴 카드 기준, 화면보다 길면 카드 안에서 스크롤
            var foot = wrap.querySelector('.np-foot').offsetHeight, max = 0;
            for (var k = 0; k < n; k++) max = Math.max(max, slides[k].scrollHeight);
            viewport.style.height = Math.min(max, window.innerHeight - 40 - foot) + 'px';
        }
        window.addEventListener('resize', fit);
        var cur = 0, counted = false;
        function countUp(slide) {
            if (counted) return; counted = true;
            slide.querySelectorAll('.yir-bar').forEach(function (b) { b.style.height = b.dataset.h + '%'; });
            slide.classList.add('is-on');
            slide.querySelectorAll('.yir-num[data-to]').forEach(function (el) {
                var to = +el.dataset.to, sm = el.querySelector('small'), t0 = performance.now(), D = 1200;
                (function f(t) {
                    var u = Math.min(1, (t - t0) / D);
                    el.textContent = Math.round(to * (1 - Math.pow(1 - u, 3)));
                    if (sm) el.appendChild(sm);
                    if (u < 1) requestAnimationFrame(f);
                })(t0);
            });
        }
        function go(i) {
            cur = (i + n) % n;
            track.style.transform = 'translateX(' + (-100 * cur) + '%)';
            for (var k = 0; k < n; k++) {
                slides[k].setAttribute('aria-hidden', k === cur ? 'false' : 'true');
                slides[k].inert = k !== cur;
                if (dotEls[k]) dotEls[k].classList.toggle('is-cur', k === cur);
            }
            slides[cur].scrollTop = 0;
            fit();
            if (slides[cur].classList.contains('np-s-yir')) setTimeout(function () { countUp(slides[cur]); }, 250);
            if (slides[cur].classList.contains('np-s-explain') || slides[cur].classList.contains('np-s-project')) slides[cur].classList.add('is-on');
        }
        if (n > 1) {
            wrap.querySelector('.np-prev').addEventListener('click', function () { go(cur - 1); });
            wrap.querySelector('.np-next').addEventListener('click', function () { go(cur + 1); });
            dotEls.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
            var sx = null, sy = null;
            track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
            track.addEventListener('touchend', function (e) {
                if (sx === null) return;
                var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1));
                sx = null;
            });
        }
        go(0);
        wrap.querySelectorAll('img').forEach(function (im) { if (!im.complete) im.addEventListener('load', fit); });   // 사진이 늦게 뜨면 높이 다시 맞춤

        var last = document.activeElement;
        function close() {
            if (wrap.querySelector('.np-today input').checked) { try { localStorage.setItem(KEY, today()); } catch (e) {} }
            wrap.classList.remove('is-open');
            document.removeEventListener('keydown', onKey);
            setTimeout(function () { wrap.remove(); }, 250);
            if (last && last.focus) last.focus();
        }
        function onKey(e) {
            if (e.key === 'Escape') close();
            if (n > 1 && e.key === 'ArrowRight') go(cur + 1);
            if (n > 1 && e.key === 'ArrowLeft') go(cur - 1);
        }
        wrap.querySelectorAll('.np-close, .np-x').forEach(function (b) { b.addEventListener('click', close); });
        wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
        document.addEventListener('keydown', onKey);
        setTimeout(function () {
            fit();
            wrap.classList.add('is-open');
            wrap.querySelector('.np-close').focus({ preventScroll: true });
        }, 700);
    });
})();
