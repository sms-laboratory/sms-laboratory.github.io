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
// 서브 페이지 배너 그림: 페이지마다 내용에 맞는 다른 움직임 (처음 한 번)
//   professor    : 변형경화(SH-SFRC) 응력–변형률 곡선이 그려짐
//   research     : Make·Sense·Restore 세 갈래 신호가 차례로 그려짐
//   publications : 연도별 SCI(E) 논문 수 막대가 솟아오름 (실제 편수)
//   projects     : 과제 기간 막대가 시간축을 따라 뻗고, 오늘 위치 표시
//   members      : 교수 노드에서 구성원 노드로 연결선이 퍼짐
//   gallery      : 사진 타일이 대각선 순서로 채워짐
//   contact      : 경로가 그려지고 위치 핀이 떨어진 뒤 파동이 퍼짐
// ==========================================================
(function () {
    var C = '#D23A4E', B = '#6F97F0', S = 'rgba(159,180,211,.6)', F = 'rgba(159,180,211,.25)', T = '#9FB4D3';
    function d(s) { return ' style="--d:' + s + 's"'; }
    function wave(y0, amp, freq, ph) {
        var p = '';
        for (var i = 0; i <= 80; i++) {
            var u = i / 80, x = 20 + u * 560, env = Math.sin(u * Math.PI);
            p += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (y0 - env * Math.sin(u * freq + ph) * amp).toFixed(1);
        }
        return p;
    }
    var M = {
        professor: function () {
            // 선형 → 초기균열 → 다중균열(톱니) 경화 → 연화
            var p = 'M40 180 L110 96', x = 110, y = 96;
            for (var k = 0; k < 11; k++) { x += 14; y += 7; p += ' L' + x + ' ' + y; x += 14; y -= 11.5; p += ' L' + x + ' ' + y; }
            p += ' Q' + (x + 40) + ' ' + (y - 6) + ' ' + (x + 70) + ' ' + (y + 30) + ' T' + (x + 150) + ' 170';
            return '<path class="pbm-draw" stroke="' + F + '" stroke-width="1.4" d="M40 30 V180 H585"' + d(0) + '/>' +
                   '<path class="pbm-draw" stroke="' + C + '" stroke-width="2.6" d="' + p + '"' + d(.2) + '/>' +
                   '<circle class="pbm-pop" cx="' + x + '" cy="' + y + '" r="5" fill="' + C + '"' + d(1.7) + '/>' +
                   '<text class="pbm-fade" x="' + (x + 12) + '" y="' + (y - 10) + '" fill="' + T + '" font-size="12" font-weight="600"' + d(1.9) + '>strain hardening</text>';
        },
        research: function () {
            return '<path class="pbm-draw" stroke="' + S + '" stroke-width="1.8" d="' + wave(120, 26, 11, 1.2) + '"' + d(0) + '/>' +
                   '<path class="pbm-draw" stroke="' + B + '" stroke-width="2.2" d="' + wave(105, 40, 7, .2) + '"' + d(.35) + '/>' +
                   '<path class="pbm-draw" stroke="' + C + '" stroke-width="2.6" d="' + wave(95, 52, 4.5, 0) + '"' + d(.7) + '/>';
        },
        publications: function () {
            var yrs = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
                n = [1, 0, 2, 2, 1, 5, 2, 4, 10, 0, 5, 1], o = '<path stroke="' + F + '" stroke-width="1.2" d="M30 180 H590"/>';
            yrs.forEach(function (yr, i) {
                var x = 40 + i * 46, h = n[i] * 14;
                if (h) o += '<rect class="pbm-grow-y" x="' + x + '" y="' + (180 - h) + '" width="28" height="' + h + '" rx="4" fill="' + (n[i] === 10 ? C : S) + '"' + d(.1 + i * .07) + '/>';
                if (i === 0 || i === yrs.length - 1 || n[i] === 10)
                    o += '<text class="pbm-fade" x="' + (x + 14) + '" y="197" text-anchor="middle" fill="' + T + '" font-size="11" font-weight="600"' + d(1) + '>' + yr + '</text>';
            });
            return o + '<text class="pbm-fade" x="' + (40 + 8 * 46 + 14) + '" y="30" text-anchor="middle" fill="#fff" font-size="13" font-weight="700"' + d(1.1) + '>10</text>';
        },
        projects: function () {
            var X = function (y, m) { return 40 + ((y - 2021) + (m - 1) / 12) * 54; }, o = '';
            for (var y = 2021; y <= 2031; y++) {
                o += '<path stroke="' + F + '" stroke-width="1" d="M' + X(y, 1) + ' 40 V160"/>';
                if (y % 2 === 1) o += '<text class="pbm-fade" x="' + X(y, 1) + '" y="180" text-anchor="middle" fill="' + T + '" font-size="11" font-weight="600"' + d(.1) + '>' + y + '</text>';
            }
            var a1 = X(2021, 3), a2 = X(2026, 3), b2 = X(2031, 3), now = X(2026, 11);
            o += '<rect class="pbm-grow-x" x="' + a1 + '" y="62" width="' + (a2 - a1 - 4) + '" height="24" rx="12" fill="' + S + '"' + d(.2) + '/>' +
                 '<rect class="pbm-grow-x" x="' + a2 + '" y="104" width="' + (b2 - a2) + '" height="24" rx="12" fill="' + C + '"' + d(.9) + '/>' +
                 '<path class="pbm-draw" stroke="#fff" stroke-width="1.6" stroke-dasharray="0" d="M' + now + ' 44 V150"' + d(1.7) + '/>' +
                 '<circle class="pbm-pop" cx="' + now + '" cy="44" r="4.5" fill="#fff"' + d(2.1) + '/>' +
                 '<text class="pbm-fade" x="' + (now + 8) + '" y="40" fill="#fff" font-size="11" font-weight="700"' + d(2.2) + '>now</text>';
            return o;
        },
        members: function () {
            var cx = 380, cy = 100, o = '', i, a, x, y,
                cur = 7, alm = 7;
            for (i = 0; i < cur + alm; i++) {
                var isA = i >= cur, k = isA ? i - cur : i, cnt = isA ? alm : cur;
                a = (k / cnt) * Math.PI * 2 + (isA ? .25 : -.2);
                var r = isA ? 165 : 92;
                x = cx + Math.cos(a) * r * 1.15; y = cy + Math.sin(a) * r * .5;
                var t = .15 + i * .09;
                o += '<path class="pbm-draw" stroke="' + (isA ? F : S) + '" stroke-width="1.3" d="M' + cx + ' ' + cy + ' L' + x.toFixed(1) + ' ' + y.toFixed(1) + '"' + d(t) + '/>' +
                     '<circle class="pbm-pop" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (isA ? 4 : 6.5) + '" fill="' + (isA ? S : '#fff') + '"' + d(t + .35) + '/>';
            }
            return o + '<circle class="pbm-pop" cx="' + cx + '" cy="' + cy + '" r="12" fill="' + C + '"' + d(0) + '/>';
        },
        gallery: function () {
            var o = '', W = [70, 110, 80, 96, 60, 120], r, c, x;
            for (r = 0; r < 3; r++) {
                x = 30 + (r % 2) * 30;
                for (c = 0; c < 6; c++) {
                    var w = W[(c + r * 2) % 6];
                    if (x + w > 590) break;
                    o += '<rect class="pbm-pop" x="' + x + '" y="' + (28 + r * 52) + '" width="' + w + '" height="44" rx="8" fill="' + (r === 1 && c === 3 ? C : (c + r) % 3 ? F : S) + '"' + d(.08 * (r + c) + .1) + '/>';
                    x += w + 8;
                }
            }
            return o;
        },
        contact: function () {
            var px = 470, py = 120;
            return '<path class="pbm-draw" stroke="' + S + '" stroke-width="2.2" d="M30 170 C140 170 150 70 260 80 S360 150 ' + px + ' ' + py + '"' + d(0) + '/>' +
                   '<circle class="pbm-pop" cx="30" cy="170" r="5" fill="' + S + '"' + d(0) + '/>' +
                   '<ellipse class="pbm-ripple" cx="' + px + '" cy="' + py + '" rx="22" ry="8" fill="none" stroke="' + C + '" stroke-width="2"' + d(1.9) + '/>' +
                   '<g class="pbm-drop"' + d(1.3) + '><path fill="' + C + '" d="M' + px + ' ' + py + ' c-6-10-18-20-18-34 a18 18 0 0 1 36 0 c0 14-12 24-18 34z"/>' +
                   '<circle cx="' + px + '" cy="' + (py - 34) + '" r="6.5" fill="#0D2341"/></g>';
        }
    };
    document.addEventListener('DOMContentLoaded', function () {
        var banner = document.querySelector('.page-banner');
        if (!banner) return;
        var key = (location.pathname.split('/').pop() || '').replace('.html', '');
        if (!M[key]) return;
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'pb-art pb-' + key);
        svg.setAttribute('viewBox', '0 0 600 200');
        svg.setAttribute('preserveAspectRatio', 'xMaxYMid meet');
        svg.setAttribute('aria-hidden', 'true');
        svg.innerHTML = M[key]();
        banner.appendChild(svg);
        svg.querySelectorAll('.pbm-draw').forEach(function (p) {
            p.style.setProperty('--len', Math.ceil(p.getTotalLength ? p.getTotalLength() : 1200));
        });
        requestAnimationFrame(function () { svg.classList.add('is-on'); });
    });
})();
