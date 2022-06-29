let timeId;
chrome.runtime.onMessage.addListener(function (_0xbf51x2, _0xbf51x3, _0xbf51x4) {
    if (_0xbf51x2.action === 'initWorkBlock') {
        let _0xbf51x5 = getProductInfo();
        if ($('.button-submit').attr('data-time')) {
            _0xbf51x5.checkoutTime = $('.button-submit').attr('data-time')
        };
        _0xbf51x4(_0xbf51x5)
    };
    if (_0xbf51x2.action === 'setCheckoutTime') {
        timeId = setCheckoutTime(_0xbf51x2.data);
        console.log(_0xbf51x2.data);
        $('.button-submit').attr('data-time', _0xbf51x2.data.hour + ':' + _0xbf51x2.data.minute + ':' + _0xbf51x2.data.second + ':' + _0xbf51x2.data.millisecond);
        _0xbf51x4('success')
    };
    if (_0xbf51x2.action === 'removeCheckoutTime') {
        clearTimeout(timeId);
        $('.button-submit').removeAttr('data-time');
        _0xbf51x4('success')
    }
});

function waitDocument(_0xbf51x7) {
    let _0xbf51x8 = setInterval(function () {
        if ($('#checkout')[0]) {
            clearInterval(_0xbf51x8);
            _0xbf51x7()
        }
    }, 100)
}

function getProductInfo() {
    try {
        let _0xbf51xa = $('.size').html();
        let _0xbf51xb = _0xbf51xa.substr(_0xbf51xa.indexOf(' ') + 1, _0xbf51xa.length);
        let _0xbf51xc = $('.product-title').html();
        let _0xbf51xd;
        try {
            _0xbf51xd = $('#orderSummaryPreviewValue').html().substr(0, $('#orderSummaryPreviewValue').html().indexOf(',')) + ' ₽'
        } catch (e) {
            let _0xbf51xe = $('.summary.total-summary span:last-child').html().replace(/[^\d,]/g, '');
            _0xbf51xd = _0xbf51xe.substr(0, _0xbf51xe.indexOf(',')) + ' ₽'
        };
        let _0xbf51x5 = {
            "itemName": _0xbf51xc,
            "itemPrice": _0xbf51xd,
            "size": _0xbf51xb
        };
        return _0xbf51x5
    } catch (e) {
        return false
    }
}

function setCheckoutTime(_0xbf51x10) {
    const _0xbf51x11 = new Date();
    const _0xbf51x12 = new Date(_0xbf51x11.getFullYear(), _0xbf51x11.getMonth(), _0xbf51x11.getDate(), _0xbf51x10.hour, _0xbf51x10.minute, _0xbf51x10.second, _0xbf51x10.millisecond);
    let _0xbf51x13 = _0xbf51x12.getTime() - _0xbf51x11.getTime();
    return setTimeout(function () {
        $('.button-submit').click()
    }, _0xbf51x13)
}