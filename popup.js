// ==========================================================
// 홈 화면 알림 팝업
//   - 내용을 바꾸려면 아래 POPUP만 수정하세요. (items: 최신 순)
//   - 팝업을 끄려면 POPUP.active 를 false 로 바꾸면 됩니다.
//   - "오늘 하루 보지 않기"를 누르면 그날은 다시 뜨지 않습니다.
// ==========================================================
var POPUP = {
    active: true,
    id: 'capstone-2024-2025',
    streak: '2',                                   // 연속 1위 햇수 (큰 숫자로 표시)
    badge: 'Capstone Design Award',
    title: '1st Place, Two Years Running',
    titleKo: '<span class="nb">한남대학교 건설환경공학과</span> <span class="nb">캡스톤디자인 2년 연속 1위</span>',
    org: '<span class="nb">Department of Civil and Environmental Engineering,</span> <span class="nb">HANNAM UNIVERSITY</span>',
    advisor: 'Advisor: Prof. Min Kyoung KIM',
    items: [
        {
            year: '2025',
            project: 'Design of an Urban Smart Hybrid Disaster Prevention System for Extreme Rainfall Response',
            projectKo: '<span class="nb">극한 호우 대응 도시형</span> <span class="nb">스마트 하이브리드 방재 시스템 설계</span>',
            team: '김경후, 김민재, 육찬솔, 이도희, 이재혁, 이환희',
            thumb: 'img/capstone-2025-thumb.webp',
            poster: 'img/capstone-2025-poster.webp'
        },
        {
            year: '2024',
            project: 'AQUA FLEX BRIDGE',
            projectKo: '수위 변화 대응 차세대 스마트 교량',
            team: '유성, 임용석, 이효열, 지성현, 조재성, 류태호, 강태규',
            thumb: 'img/capstone-2024-thumb.webp',
            poster: 'img/capstone-2024-poster.webp'
        }
    ]
};

(function () {
    if (!POPUP.active) return;
    var KEY = 'sms-popup-hide:' + POPUP.id;
    function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    try { if (localStorage.getItem(KEY) === today()) return; } catch (e) {}

    document.addEventListener('DOMContentLoaded', function () {
        var cards = POPUP.items.map(function (it) {
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
        var wrap = document.createElement('div');
        wrap.className = 'np-backdrop';
        wrap.innerHTML =
            '<div class="np" role="dialog" aria-modal="true" aria-labelledby="np-title">' +
                '<div class="np-head">' +
                    '<div class="np-streak" aria-hidden="true">' +
                        '<span class="np-streak-n">' + POPUP.streak + '</span>' +
                        '<span class="np-streak-t">years<br>in a row</span>' +
                    '</div>' +
                    '<div class="np-head-text">' +
                        '<span class="np-badge">' + POPUP.badge + '</span>' +
                        '<h2 id="np-title">' + POPUP.title + '</h2>' +
                        '<p class="np-ko">' + POPUP.titleKo + '</p>' +
                        '<p class="np-org">' + POPUP.org + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="np-cards">' + cards + '</div>' +
                '<div class="np-foot">' +
                    '<p class="np-advisor">' + POPUP.advisor + '</p>' +
                    '<label class="np-today"><input type="checkbox"> 오늘 하루 보지 않기</label>' +
                    '<button type="button" class="np-close">Close</button>' +
                '</div>' +
                '<button type="button" class="np-x" aria-label="닫기">&times;</button>' +
            '</div>';
        document.body.appendChild(wrap);
        var last = document.activeElement;
        function close() {
            if (wrap.querySelector('.np-today input').checked) { try { localStorage.setItem(KEY, today()); } catch (e) {} }
            wrap.classList.remove('is-open');
            document.removeEventListener('keydown', onKey);
            setTimeout(function () { wrap.remove(); }, 250);
            if (last && last.focus) last.focus();
        }
        function onKey(e) { if (e.key === 'Escape') close(); }
        wrap.querySelectorAll('.np-close, .np-x').forEach(function (b) { b.addEventListener('click', close); });
        wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
        document.addEventListener('keydown', onKey);
        setTimeout(function () {
            wrap.classList.add('is-open');
            wrap.querySelector('.np-close').focus({ preventScroll: true });
        }, 700);
    });
})();
