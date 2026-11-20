// ==========================================================
// 최신 버전 확인: 브라우저에 예전 페이지가 남아 있으면 한 번 새로고침합니다.
// (PC 브라우저가 이전 화면을 오래 기억하는 문제 방지)
// ==========================================================
(function () {
    var meta = document.querySelector('meta[name="site-build"]');
    if (!meta || !window.fetch || location.protocol === 'file:') return;
    var mine = meta.content, key = 'sms-build-reload';
    fetch(location.pathname + '?b=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) {
            var m = html.match(/name="site-build" content="([^"]+)"/);
            if (!m || m[1] === mine) return;
            try {
                if (sessionStorage.getItem(key) === m[1]) return;   // 무한 새로고침 방지
                sessionStorage.setItem(key, m[1]);
            } catch (e) {}
            location.reload();
        })
        .catch(function () {});
})();

// RESEARCH 하위 메뉴: 터치 기기에서는 첫 번째 탭에 메뉴를 펼치고, 두 번째 탭에 이동합니다.
document.addEventListener('DOMContentLoaded', function () {
    var touch = window.matchMedia('(hover: none)').matches;
    document.querySelectorAll('nav .has-sub > a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var item = link.parentElement;
            if (touch && !item.classList.contains('open')) {
                e.preventDefault();
                document.querySelectorAll('nav .has-sub.open').forEach(function (o) { o.classList.remove('open'); });
                item.classList.add('open');
            }
        });
    });
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav .has-sub')) {
            document.querySelectorAll('nav .has-sub.open').forEach(function (o) { o.classList.remove('open'); });
        }
    });
});


// ==========================================================
// 방문자 수 (GoatCounter)
//  - GOATCOUNTER_CODE 를 goatcounter.com 에서 만든 코드로 바꾸면 작동합니다.
//  - GoatCounter 설정에서 "Allow adding visitor counts on your website" 를 켜야 숫자가 보입니다.
//  - 숫자를 못 불러오면 Visitors 줄은 숨겨진 채로 있습니다.
// ==========================================================
(function () {
    var GOATCOUNTER_CODE = 'sms-laboratory';
    var base = 'https://' + GOATCOUNTER_CODE + '.goatcounter.com';
    if (location.hostname !== 'sms-laboratory.github.io') return;   // 실제 사이트에서만 집계

    var s = document.createElement('script');
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', base + '/count');
    document.head.appendChild(s);

    function day(offset) {                                  // 한국 시간 기준 날짜 (offset일 전)
        var d = new Date(Date.now() + 9 * 3600 * 1000 - offset * 86400000);
        return d.toISOString().slice(0, 10);
    }
    function get(q) {
        return fetch(base + '/counter/TOTAL.json' + q).then(function (r) {
            if (!r.ok) throw new Error(r.status);
            return r.json();
        }).then(function (j) { return parseInt(String(j.count_unique || j.count).replace(/\D/g, ''), 10) || 0; });
    }
    document.addEventListener('DOMContentLoaded', function () {
        var row = document.querySelector('.visitor-row');
        if (!row || !window.fetch) return;
        var days = [6, 5, 4, 3, 2, 1, 0];                       // 최근 7일
        var reqs = days.map(function (o) { return get('?start=' + day(o) + '&end=' + day(o)); });
        reqs.push(get(''));
        Promise.all(reqs).then(function (v) {
            var week = v.slice(0, 7), total = v[7], max = Math.max.apply(null, week.concat([1]));
            row.querySelector('[data-visitors="today"]').textContent = week[6].toLocaleString('en-US');
            row.querySelector('[data-visitors="total"]').textContent = total.toLocaleString('en-US');
            row.querySelector('.v-spark').innerHTML = week.map(function (n, i) {
                return '<i style="height:' + Math.max(12, Math.round(n / max * 100)) + '%" title="' + day(days[i]) + ': ' + n + '"></i>';
            }).join('');
            row.querySelector('.v-spark').setAttribute('title', 'Last 7 days');
            row.hidden = false;
        }).catch(function () {});
    });
})();

// 상단 메뉴 높이를 CSS 변수로 (Research 하위 탭이 메뉴 바로 아래에 붙도록)
(function () {
    function setH() {
        var h = document.querySelector('header');
        if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
    }
    document.addEventListener('DOMContentLoaded', setH);
    window.addEventListener('resize', setH);
})();


// ==========================================================
// 서브 페이지 배너: 오른쪽 신호 그래프 선 (처음 한 번 그려짐)
// ==========================================================
(function () {
    function shape(seed) {                       // 페이지마다 조금씩 다른 곡선
        var a = '', b = '', N = 90, W = 600, H = 200;
        for (var i = 0; i <= N; i++) {
            var u = i / N, x = u * W;
            var env = Math.sin(u * Math.PI);
            var ya = H * .55 - env * (Math.sin(u * (9 + seed) + seed) * 46 + Math.sin(u * 23 + seed * 2) * 10);
            var yb = H * .62 - env * (Math.sin(u * (9 + seed) + seed - .5) * 30);
            a += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + ya.toFixed(1);
            b += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + yb.toFixed(1);
        }
        return [a, b, W, H * .55 - Math.sin(Math.PI) * 0];
    }
    document.addEventListener('DOMContentLoaded', function () {
        var banner = document.querySelector('.page-banner');
        if (!banner) return;
        var seed = (location.pathname.length % 5) + 1;
        var d = shape(seed);
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('class', 'pb-signal');
        svg.setAttribute('viewBox', '0 0 600 200');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');
        svg.innerHTML = '<path class="pb-b" d="' + d[1] + '"/><path class="pb-a" d="' + d[0] + '"/>';
        banner.appendChild(svg);
        svg.querySelectorAll('path').forEach(function (p) {
            var L = Math.ceil(p.getTotalLength ? p.getTotalLength() : 1200);
            p.style.setProperty('--len', L);
        });
        requestAnimationFrame(function () { svg.classList.add('is-drawing'); });
    });
})();
