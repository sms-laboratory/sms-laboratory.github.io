// ==========================================================
// 홈 화면 알림 팝업
//   - 내용을 바꾸려면 아래 POPUP만 수정하세요.
//   - 팝업을 끄려면 POPUP.active 를 false 로 바꾸면 됩니다.
//   - "오늘 하루 보지 않기"를 누르면 그날은 다시 뜨지 않습니다.
// ==========================================================
var POPUP = {
    active: true,
    id: 'capstone-2024',
    badge: '1st Place',
    title: '2024 Capstone Design',
    titleKo: '2024년도 캡스톤디자인 1위',
    project: 'AQUA FLEX BRIDGE',
    projectKo: '수위 변화 대응 차세대 스마트 교량',
    team: '유성, 임용석, 이효열, 지성현, 조재성, 류태호, 강태규',
    advisor: 'Advisor: Prof. Min Kyoung KIM',
    thumb: 'img/capstone-2024-thumb.webp',
    poster: 'img/capstone-2024-poster.webp'
};

(function () {
    if (!POPUP.active) return;
    var KEY = 'sms-popup-hide:' + POPUP.id;
    function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
    try { if (localStorage.getItem(KEY) === today()) return; } catch (e) {}

    document.addEventListener('DOMContentLoaded', function () {
        var wrap = document.createElement('div');
        wrap.className = 'np-backdrop';
        wrap.innerHTML =
            '<div class="np" role="dialog" aria-modal="true" aria-labelledby="np-title">' +
                '<a class="np-poster" href="' + POPUP.poster + '" target="_blank" rel="noopener" aria-label="포스터 크게 보기">' +
                    '<img src="' + POPUP.thumb + '" alt="' + POPUP.project + ' 포스터">' +
                    '<span class="np-zoom">View poster</span>' +
                '</a>' +
                '<div class="np-body">' +
                    '<span class="np-badge">' + POPUP.badge + '</span>' +
                    '<h2 id="np-title">' + POPUP.title + '</h2>' +
                    '<p class="np-ko">' + POPUP.titleKo + '</p>' +
                    '<div class="np-project">' +
                        '<strong>' + POPUP.project + '</strong>' +
                        '<span>' + POPUP.projectKo + '</span>' +
                    '</div>' +
                    '<p class="np-team">' + POPUP.team + '</p>' +
                    '<p class="np-advisor">' + POPUP.advisor + '</p>' +
                    '<div class="np-foot">' +
                        '<label class="np-today"><input type="checkbox"> 오늘 하루 보지 않기</label>' +
                        '<button type="button" class="np-close">Close</button>' +
                    '</div>' +
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
