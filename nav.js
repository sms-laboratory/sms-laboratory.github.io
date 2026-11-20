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
