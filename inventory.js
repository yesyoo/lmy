(function inventory() {
    const id = window.location.href.split('/')[4];
    if(Number(id)) {
        if(window.location.href.includes(`https://logistics.market.yandex.ru/tpl-outlet/${id}/orders-issuing`)) {
            start(id);
        } else { console.log(`Перейди по ссылке и начни заново: https://logistics.market.yandex.ru/tpl-outlet/${id}/orders-issuing`) };
    } else { console.log('Ты не авторизован в https://logistics.market.yandex.ru') };
})();

function start(id) {
    const orders = getOrders(id);
    setTimeout(() => {getSum(orders)}, 2000);
};

function getOrders(id) {
    if(window.location.href === `https://logistics.market.yandex.ru/tpl-outlet/${id}/orders-issuing` || window.location.href.includes('statuses=TRANSMITTED_TO_RECIPIENT')) {
        document.querySelector('[data-tid="66fcbac9 cb97fdce 9124fdb8 38883eec"]').click();
        document.querySelector('[data-value="TRANSMITTED_TO_RECIPIENT"]').click();
    };
    allInPage();
    const orders = Number(document.querySelector('[data-e2e-i18n-key="pages.tpl-outlet-orders-issuing:table.title"]').innerHTML.split(' ')[2]);
    if(orders > 100) { firstPage() };
    return orders;
};
function getSum(orders) {
    let sum = 0;
    let page = 0;
    (function count() {
        page += 1;
        sum += getSumOfItemsInPage();

        if(page < Math.ceil(orders / 100)) {
            nextPage();
            setTimeout(() => { count()}, 5000)
        } else {
            console.log(`На полках: ${sum} шт`)
        };
    })();
};

function getSumOfItemsInPage() {
    const list = [];
    document.querySelectorAll('tbody tr').forEach(e => { list.push(Number(e.children[9].innerText))});
    return list.reduce(function(acc, item) { return acc + item }, 0);
};
function allInPage() {
    document.querySelector("[to='100']").click();
};
function firstPage() {
    document.querySelector('[data-tid="8e34e3c2 8166f242 5f1405c6 e67b4555"]').click();
};
function nextPage() {
    document.querySelector('[data-tid="8e34e3c2 8166f242 8e7b5e32 e67b4555"]').click();
};

