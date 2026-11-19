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
