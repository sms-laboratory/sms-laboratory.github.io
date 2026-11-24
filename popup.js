// ==========================================================
// 홈 화면 알림 팝업 — 여러 장을 넘겨 보는 카드(슬라이드)
//   - 카드 순서·내용은 아래 SLIDES 에서 바꿉니다. (배열 순서 = 보이는 순서)
//   - 팝업을 끄려면 POPUP_ACTIVE 를 false 로 바꾸면 됩니다.
//   - "오늘 하루 보지 않기"를 누르면 그날은 다시 뜨지 않습니다.
// ==========================================================
var POPUP_ACTIVE = true;
var POPUP_ID = 'home-2026-11';

var SLIDES = [
    {   // 1. 캡스톤디자인 2년 연속 1위
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
    {   // 2. 여성연구자상
        type: 'award',
        badge: 'Award &middot; 2026.11.20',
        title: 'Women Researcher Award',
        titleKo: '한국구조물진단유지관리공학회 여성연구자상',
        org: 'Korea Institute for Structural Maintenance and Inspection (KSMI)',
        text: 'Awarded to Prof. Min Kyoung KIM for outstanding research achievements and scholarly contributions that strengthen the role of women researchers.',
        textKo: '우수한 연구성과와 학문적 성취로 여성연구자 역량 제고에 기여한 공로',
        image: 'img/ksmi-women-researcher-2026.webp',
        imageAlt: '여성연구자상 상장'
    },
    {   // 3. 2026 결산 (숫자는 2026.11 기준)
        type: 'yir',
        kicker: 'Year in Review',
        title: '2026 at<span>SMS Lab.</span>',
        titleKo: '숫자로 보는 SMS 연구실의 2026년',
        citations: { now: 227, prev: 107, label: 'Citations this year', ko: '올해 피인용 · 역대 최고 (Scopus)' },
        tiles: [
            { to: 5, label: 'SCI(E) papers', ko: 'SCI(E) 논문 게재' },
            { to: 3, label: 'Awards', ko: '학회 수상 · 여성연구자상 외 2건' },
            { to: 5, unit: 'yr', label: 'New NRF project', ko: '신진연구(유형B) 5년 과제 착수' },
            { to: 4, label: 'New members', ko: '새 구성원 합류' }
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
    function award(s) {
        return '<div class="np-slide np-s-award">' +
            '<a class="np-cert" href="' + s.image + '" target="_blank" rel="noopener" aria-label="상장 크게 보기"><img src="' + s.image + '" alt="' + s.imageAlt + '"></a>' +
            '<div class="np-award-text">' +
                '<span class="np-badge">' + s.badge + '</span>' +
                '<h2>' + s.title + '</h2>' +
                '<p class="np-ko">' + s.titleKo + '</p>' +
                '<p class="np-org">' + s.org + '</p>' +
                '<p class="np-quote">' + s.text + '</p>' +
                '<p class="np-quote-ko">' + s.textKo + '</p>' +
            '</div>' +
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
    var R = { capstone: capstone, award: award, yir: yir };

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
        function fit() { viewport.style.height = slides[cur].offsetHeight + 'px'; }   // 카드마다 높이가 달라 현재 카드 높이에 맞춤
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
            wrap.querySelector('.np').scrollTop = 0;
            fit();
            if (slides[cur].classList.contains('np-s-yir')) setTimeout(function () { countUp(slides[cur]); }, 250);
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
