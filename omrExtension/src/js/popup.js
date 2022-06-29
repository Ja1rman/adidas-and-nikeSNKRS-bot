clock();
setInterval(clock, 1000);
initAuth();
let userAgent = navigator.userAgent;
$('.menuItem').on('click', function () {
    let _0x490fx2 = $(this).attr('id');
    if (_0x490fx2 === 'action') {
        showWorkBlock()
    } else {
        if (_0x490fx2 === 'profiles') {
            showProfilesBox()
        }
    }
});
$('#settingsBtn').on('click', function () {
    showSettingsBox()
});
$('#createNewProfile').on('click', function () {
    showProfileCreateBox()
});
$('#backToProfileMenu').on('click', function () {
    showProfilesBox()
});
$('.profilesBox').on('click', function (_0x490fx3) {
    let _0x490fx4 = $(_0x490fx3.target);
    let _0x490fx5 = _0x490fx4.attr('class');
    if (_0x490fx5 === 'profileName') {
        _0x490fx4 = _0x490fx4.parent()
    };
    if ((_0x490fx5 === 'profile') || (_0x490fx5 === 'profileName')) {
        $('.profile').each(function () {
            $(this).removeAttr('data-active')
        });
        _0x490fx4.attr('data-active', 'true');
        setActiveProfileInStorage(_0x490fx4[0].innerText)
    } else {
        if (_0x490fx5.indexOf('edit') >= 0) {
            let _0x490fx6 = _0x490fx4.parent().parent()[0].innerText;
            $('#saveProfile').attr('data-edit', 'true');
            showProfileCreateBox();
            getProfile(_0x490fx6, function (_0x490fx7) {
                generateProfileUI(_0x490fx7)
            })
        } else {
            if (_0x490fx5.indexOf('duplicate') >= 0) {
                let _0x490fx6 = _0x490fx4.parent().parent()[0].innerText;
                showProfileCreateBox();
                getProfile(_0x490fx6, function (_0x490fx7) {
                    generateProfileUI(_0x490fx7)
                })
            } else {
                if (_0x490fx5.indexOf('delete') >= 0) {
                    let _0x490fx7 = _0x490fx4.parent().parent();
                    let _0x490fx6 = _0x490fx4.parent().parent()[0].innerText;
                    deleteProfile(_0x490fx6);
                    removeElement(_0x490fx7)
                }
            }
        }
    }
});
$('#saveProfile').on('click', function () {
    let _0x490fx8 = generateProfile();
    let _0x490fx9 = [];
    $('.profile').each(function (_0x490fxa) {
        _0x490fx9[_0x490fxa] = $(this).children('h3').html()
    });
    if (_0x490fx8.shipping.middleName == '') {
        $('#middleName').addClass('validationError')
    };
    if (_0x490fx8.profileName == '') {
        $('#profileName').addClass('validationError')
    };
    if (_0x490fx8.card.cardCvv == '') {
        $('#cardCvv').addClass('validationError')
    };
    if ((_0x490fx9.indexOf(_0x490fx8.profileName) > -1) && !($(this).attr('data-edit'))) {
        $('#profileName').addClass('validationError')
    };
    if ((_0x490fx8.shipping.middleName != '') && (_0x490fx8.card.cardCvv != '') && (_0x490fx8.profileName != '') && ((_0x490fx9.indexOf(_0x490fx8.profileName) == -1) || ($(this).attr('data-edit')))) {
        if ($(this).attr('data-edit')) {
            editProfile(_0x490fx8)
        } else {
            saveProfile(_0x490fx8)
        };
        showProfilesBox()
    }
});
$('.dataItem-inner').on('click', function () {
    let _0x490fxb = $(this).parent();
    let _0x490fxc = $(this);
    if (_0x490fxb.attr('data-active')) {
        _0x490fxb.removeAttr('data-active')
    } else {
        $('.dataItem').each(function () {
            $(this).removeAttr('data-active')
        });
        _0x490fxb.attr('data-active', 'true')
    }
});
$('.passportType').on('click', function () {
    let _0x490fxd = $(this).children('.circle');
    $('.circle').each(function () {
        $(this).removeAttr('data-active')
    });
    _0x490fxd.attr('data-active', true);
    $('.passportBox').each(function () {
        $(this).removeAttr('data-active')
    });
    $('.passportBox[data-local="' + $(this).attr('data-local') + '"]').attr('data-active', 'true')
});
$('.defaultList').on('click', function (_0x490fx3) {
    if ($(this).children('.defaultListBox').attr('data-active')) {
        $(this).children('.defaultListBox').removeAttr('data-active', 'true')
    } else {
        $(this).children('.defaultListBox').attr('data-active', 'true')
    }
});
$('.defaultListItem').on('click', function () {
    let _0x490fxe = $(this).html();
    let _0x490fxf = $(this).parent().parent().children('.defaultListTitle');
    _0x490fxf.attr('data-hasValue', 'true').html(_0x490fxe)
});
$('#setCheckoutTime').on('click', function () {
    let _0x490fx10 = $('#scheduleTime').val();
    if (_0x490fx10.length >= 8) {
        chrome.tabs.getSelected(null, function (_0x490fx11) {
            if (!($('#setCheckoutTime').attr('data-time'))) {
                setCheckoutTimeInApp(_0x490fx11)
            } else {
                removeCheckoutTimeInApp(_0x490fx11)
            }
        })
    } else {
        $('#scheduleTime').addClass('validationError')
    }
});
$('#generateItem').on('click', function () {
    let _0x490fx12 = $('#itemUrl').val();
    if (_0x490fx12 == '') {
        return
    };
    loading($('#generateItem'));
    generateItemToStep2(_0x490fx12)
});
let upcomingClick = false;
$('#upcoming').on('click', function (_0x490fx14) {
    if (upcomingClick === false) {
        let _0x490fx3 = $(_0x490fx14.target);
        let _0x490fx15 = _0x490fx3.attr('data-url');
        if ($(_0x490fx3).attr('data-url')) {
            loading(_0x490fx3);
            upcomingClick = true;
            generateItemToStep2(_0x490fx15)
        }
    }
});
$('#sizeBox').on('click', function (_0x490fx3) {
    if ($(_0x490fx3.delegateTarget).attr('id') === $(this).attr('id')) {
        let _0x490fx16 = $(_0x490fx3.target.offsetParent);
        let _0x490fx17 = _0x490fx16.attr('data-size');
        $('#actionGenerate .size').html();
        $('.productSize').each(function (_0x490fx18) {
            $(this).removeAttr('data-sizeSelected')
        });
        _0x490fx16.attr('data-sizeSelected', 'true');
        $('#actionGenerate .size').html(_0x490fx17)
    }
});
$('#checkoutLink').on('click', function () {
    let _0x490fx19 = $('.itemContainer').attr('data-productid');
    let _0x490fx12 = $('.itemContainer').attr('data-producturl');
    let _0x490fx17 = $('.size').html();
    if (_0x490fx17 === '_') {
        return
    };
    generateCheckoutPage(_0x490fx12, _0x490fx17, _0x490fx19)
});
$('#autorizationBtn').on('click', function () {
    let _0x490fx1a = $('#licenseKey').val().replace(/[-]/g, '');
    auth(_0x490fx1a);
    $('#autorizationBtn').html('');
    loading($('#autorizationBtn'))
});
$('#logOut').on('click', function () {
    removeAccountFromStorage();
    showAuthBlock();
    $('#licenseKey').val('')
});
$('#autofillEnable .configurationCheker').on('click', function () {
    let _0x490fx1b = configurationChekerChange($(this));
    autofillChanger(_0x490fx1b)
});
$('input').on('focus', function (_0x490fx18) {
    $(this).removeClass('validationError');
    if ($(this).attr('id') === 'passportIssueDate') {
        $(this).attr('placeholder', 'ДД/ММ/ГГГГ')
    };
    $('.defaultListBox').removeAttr('data-active', 'true')
});
$('input').on('blur', function (_0x490fx18) {
    if ($(this).val() == '') {
        $(this).addClass('validationError')
    };
    if ($(this).attr('id') === 'passportIssueDate') {
        $(this).attr('placeholder', 'Дата выдачи')
    };
    let _0x490fx1c;
    if ($(this).attr('id') == 'addrFirst') {
        _0x490fx1c = $('#shipping .dataSubTitleValue');
        _0x490fx1c.html($(this).val())
    } else {
        if ($(this).attr('id') == 'passportNumber') {
            _0x490fx1c = $('#verefication .dataSubTitleValue');
            _0x490fx1c.html($(this).val())
        } else {
            if ($(this).attr('id') == 'cardNumber') {
                _0x490fx1c = $('#payment .dataSubTitleValue');
                _0x490fx1c.html($(this).val())
            }
        }
    }
});
$('#cardNumber').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 16);
    _0x490fx1d = _0x490fx1d != '' ? _0x490fx1d.match(/.{1,4}/g).join(' ') : '';
    $(this).val(_0x490fx1d)
});
$('#cardDate').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 4);
    _0x490fx1d = _0x490fx1d != '' ? _0x490fx1d.match(/.{1,2}/g).join(' / ') : '';
    $(this).val(_0x490fx1d)
});
$('#cardCvv').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 3);
    $(this).val(_0x490fx1d)
});
$('#passportNumber').on('input', function () {});
$('#innNumber').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 20);
    $(this).val(_0x490fx1d)
});
$('#passportIssueDate').on('input', function () {
    let _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 8);
    if (_0x490fx1d.length > 2) {
        _0x490fx1d = _0x490fx1d.substring(0, 2) + '/' + _0x490fx1d.substring(2, 20).replace(/\//g, '')
    };
    if (_0x490fx1d.length > 5) {
        _0x490fx1d = _0x490fx1d.substring(0, 2) + '/' + _0x490fx1d.substring(3, 5) + '/' + _0x490fx1d.substring(5, 20).replace(/\//g, '')
    };
    $(this).val(_0x490fx1d)
});
$('#phone').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d\s()]/g, '').substring(0, 11);
    $(this).val(_0x490fx1d)
});
$('#zip').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 6);
    _0x490fx1d = _0x490fx1d != '' ? _0x490fx1d.match(/.{1,3}/g).join('-') : '';
    $(this).val(_0x490fx1d)
});
$('#sity').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^а-яА-ЯЕЁ\-]/g, '');
    $(this).val(_0x490fx1d)
});
$('#scheduleTime').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 10);
    if (_0x490fx1d.substring(0, 1) > 2) {
        $(this).val('0' + $(this).val())
    };
    if ((_0x490fx1d.substring(1, 2) > 3) && (_0x490fx1d.substring(0, 1) == 2)) {
        $(this).val(_0x490fx1d.substring(0, 1))
    };
    if (_0x490fx1d.substring(2, 3) > 5) {
        $(this).val(_0x490fx1d.substr(0, 2) + '0' + _0x490fx1d.substr(2, 3))
    };
    if (_0x490fx1d.substring(4, 5) > 5) {
        $(this).val(_0x490fx1d.substr(0, 4) + '0' + _0x490fx1d.substr(4, 5))
    };
    var _0x490fx1d = $(this).val().replace(/[^\d]/g, '').substring(0, 10);
    if (_0x490fx1d.length < 7) {
        _0x490fx1d = _0x490fx1d != '' ? _0x490fx1d.match(/.{1,2}/g).join(':') : ''
    } else {
        _0x490fx1d = _0x490fx1d.substring(0, 2) + ':' + _0x490fx1d.substring(2, 4) + ':' + _0x490fx1d.substring(4, 6) + ':' + _0x490fx1d.substring(6, 9)
    };
    $(this).val(_0x490fx1d)
});
$('#licenseKey').on('input', function () {
    var _0x490fx1d = $(this).val().replace(/[А-Яа-я-]/g, '').substring(0, 20).toUpperCase();
    _0x490fx1d = _0x490fx1d != '' ? _0x490fx1d.match(/.{1,5}/g).join('-') : '';
    $(this).val(_0x490fx1d)
});

function saveProfileAJAX(_0x490fx7) {
    return new Promise((_0x490fx1f, _0x490fx20) => {
        let _0x490fx21 = [];
        chrome.storage.local.get((_0x490fx8) => {
            if (_0x490fx8.profiles !== undefined) {
                _0x490fx21 = _0x490fx8.profiles
            };
            _0x490fx21.push(_0x490fx7);
            chrome.storage.local.set({
                profiles: _0x490fx21
            }, () => {
                _0x490fx1f(_0x490fx21)
            })
        })
    })
}

function getProfilesAJAX() {
    return new Promise((_0x490fx1f, _0x490fx20) => {
        let _0x490fx21 = [];
        chrome.storage.local.get((_0x490fx8) => {
            if (_0x490fx8.profiles !== undefined) {
                _0x490fx21 = _0x490fx8.profiles
            };
            _0x490fx1f(_0x490fx21)
        })
    })
}

function deleteProfileAJAX(_0x490fx6) {
    return new Promise((_0x490fx1f, _0x490fx20) => {
        let _0x490fx21 = [];
        chrome.storage.local.get((_0x490fx8) => {
            if (_0x490fx8.profiles !== undefined) {
                _0x490fx21 = _0x490fx8.profiles
            };
            let _0x490fxa = _0x490fx21.findIndex((_0x490fx3) => {
                return _0x490fx3.profileName === _0x490fx6
            });
            _0x490fx21.splice(_0x490fxa, 1);
            chrome.storage.local.set({
                profiles: _0x490fx21
            }, () => {
                _0x490fx1f(_0x490fx21)
            })
        })
    })
}

function editProfileAJAX(_0x490fx7) {
    return new Promise((_0x490fx1f, _0x490fx20) => {
        let _0x490fx21 = [];
        chrome.storage.local.get((_0x490fx8) => {
            if (_0x490fx8.profiles !== undefined) {
                _0x490fx21 = _0x490fx8.profiles
            };
            let _0x490fxa = _0x490fx21.findIndex((_0x490fx3) => {
                return _0x490fx3.profileName === _0x490fx7.profileName
            });
            _0x490fx21.splice(_0x490fxa, 1, _0x490fx7);
            chrome.storage.local.set({
                profiles: _0x490fx21
            }, () => {
                _0x490fx1f(_0x490fx21)
            })
        })
    })
}

var targetPage = '';
var ua = 'SnkrsAco';

function rewriteUserAgentHeader(_0x490fx18) {
    for (var _0x490fx28 of _0x490fx18.requestHeaders) {
        if (_0x490fx28.name.toLowerCase() === 'user-agent') {
            _0x490fx28.value = ua
        }
    };
    return {
        requestHeaders: _0x490fx18.requestHeaders
    }
}

chrome.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader, {
    urls: [targetPage]
}, ['blocking', 'requestHeaders']);

function authAJAX(_0x490fx1a) {
    return new Promise((_0x490fx1f, _0x490fx20) => {
        fetch('', {
            method: 'GET',
            headers: {
                'X-Authorization': _0x490fx1a
            }
        }).then((_0x490fx2a) => {
            console.log(_0x490fx2a);
            if (_0x490fx2a.ok) {
                _0x490fx1f()
            } else {
                _0x490fx20()
            }
        })
    })
}

$('.export-box').on('click', function () {
    getProfilesAJAX().then((_0x490fx21) => {
        let _0x490fx2b = JSON.stringify(_0x490fx21);
        let _0x490fx2c = document.createElement('a'),
            _0x490fx2d = new Blob([_0x490fx2b], {
                type: 'octet/stream'
            }),
            _0x490fx2e = 'snkrs-aco-profiles.json',
            _0x490fx2f = window.URL.createObjectURL(_0x490fx2d);
        _0x490fx2c.setAttribute('href', _0x490fx2f);
        _0x490fx2c.setAttribute('download', _0x490fx2e);
        _0x490fx2c.click();
        _0x490fx2c.remove()
    })
});
$('.import-box').on('click', function () {
    $('.import-input')[0].click()
});
$('.import-input').on('change', function (_0x490fx30) {
    console.log(_0x490fx30);
    let _0x490fx31 = _0x490fx30.target.files;
    let _0x490fx32 = new FileReader();
    _0x490fx32.readAsText(_0x490fx31[0]);
    _0x490fx32.onload = () => {
        let _0x490fx21 = JSON.parse(_0x490fx32.result);
        chrome.storage.local.set({
            profiles: _0x490fx21
        }, () => {
            _0x490fx21.forEach((_0x490fx7) => {
                chrome.runtime.sendMessage({
                    action: 'setNewProfile',
                    data: _0x490fx7
                }, function () {
                    printNewProfile(_0x490fx7, _0x490fx21.length)
                })
            })
        })
    }
});

function getItemsAJAX() {
    return $.ajax({
        url: 'https://www.nike.com/ru/launch?s=upcoming',
        type: 'POST',
        dataType: 'html'
    })
}

function postOnNike(_0x490fx12) {
    return $.ajax({
        url: _0x490fx12,
        type: 'POST',
        dataType: 'html'
    })
}

function getSizes(_0x490fx12) {
    return $.ajax({
        url: _0x490fx12,
        type: 'POST'
    })
}

function getAccountFromStorage(_0x490fx37) {
    chrome.storage.local.get(['identification'], function (_0x490fx38) {
        if (!($.isEmptyObject(_0x490fx38.identification))) {
            _0x490fx37(_0x490fx38.identification.licenseKey)
        } else {
            _0x490fx37(null)
        }
    })
}

function setAccountInStorage(_0x490fx1a) {
    chrome.storage.local.set({
        identification: {
            licenseKey: _0x490fx1a
        }
    })
}

function removeAccountFromStorage() {
    chrome.storage.local.remove(['identification'])
}

function setActiveProfileInStorage(_0x490fx6) {
    chrome.storage.local.set({
        activeProfile: _0x490fx6
    })
}

function getActiveProfile(_0x490fx37) {
    chrome.storage.local.get(['activeProfile'], function (_0x490fx38) {
        if (!($.isEmptyObject(_0x490fx38.activeProfile))) {
            _0x490fx37(_0x490fx38.activeProfile)
        } else {
            _0x490fx37(null)
        }
    })
}

function autofillChanger(_0x490fx3e) {
    chrome.storage.local.set({
        settings: {
            autofill: _0x490fx3e
        }
    })
}

function getSettings(_0x490fx37) {
    chrome.storage.local.get(['settings'], function (_0x490fx38) {
        _0x490fx37(_0x490fx38)
    })
}

function setDefaultSettings() {
    chrome.storage.local.set({
        settings: {
            autofill: true
        }
    })
}

function initAuth() {
    loading($('body'));
    getAccountFromStorage(function (_0x490fx1a) {
        auth(_0x490fx1a)
    })

}

function auth(_0x490fx1a) {
    authAJAX(_0x490fx1a).then(function () {
        setAccountInStorage(_0x490fx1a);
        showWorkBlock();
        getItems();
        initSettings();
        setProfiles()
    }, function () {
        showAuthBlock()
    })
}

function initSettings() {
    getSettings(function (_0x490fx8) {
        if (!($.isEmptyObject(_0x490fx8.settings))) {
            initSettingsUI(_0x490fx8.settings)
        } else {
            setDefaultSettings()
        }
    })
}

function setProfiles() {
    getProfilesAJAX().then(function (_0x490fx8) {
        chrome.runtime.sendMessage({
            action: 'setProfiles',
            data: _0x490fx8
        }, function () {
            printProfilesUI(_0x490fx8)
        })
    })
}

function getProfile(_0x490fx6, _0x490fx37) {
    chrome.runtime.sendMessage({
        action: 'getProfile',
        profileName: _0x490fx6
    }, function (_0x490fx8) {
        _0x490fx37(_0x490fx8)
    })
}

function deleteProfile(_0x490fx6) {
    getAccountFromStorage(function (_0x490fx47, _0x490fx48) {
        deleteProfileAJAX(_0x490fx6, _0x490fx47, _0x490fx48).then(function () {}, function (_0x490fx8) {
            console.log('Невозможно удалить профиль.')
        })
    })
}

function saveProfile(_0x490fx7) {
    getAccountFromStorage(function (_0x490fx47, _0x490fx48) {
        saveProfileAJAX(_0x490fx7, _0x490fx47, _0x490fx48).then(function (_0x490fx8) {
            if (_0x490fx8.length === 1) {
                setActiveProfileInStorage(_0x490fx8[0].profileName)
            };
            chrome.runtime.sendMessage({
                action: 'setNewProfile',
                data: _0x490fx7
            }, function () {
                printNewProfile(_0x490fx7, _0x490fx8.length)
            })
        }, function (_0x490fx8) {
            console.log('Невозможно добавить профиль.')
        })
    })
}

function editProfile(_0x490fx7) {
    getAccountFromStorage(function (_0x490fx47, _0x490fx48) {
        editProfileAJAX(_0x490fx7, _0x490fx47, _0x490fx48).then(function (_0x490fx8) {
            chrome.runtime.sendMessage({
                action: 'updateProfile',
                data: _0x490fx7
            })
        }, function (_0x490fx8) {
            console.log('Невозможно изменить профиль.')
        })
    })
}

function generateProfile() {
    let _0x490fx6 = $('#profileName').val().trim();
    let _0x490fx4c = $('#firstName').val().trim();
    let _0x490fx4d = $('#middleName').val().trim();
    let _0x490fx4e = $('#lastName').val().trim();
    let _0x490fx4f = $('#addrFirst').val().trim();
    let _0x490fx50 = $('#addrSecond').val().trim();
    let _0x490fx51 = $('#city').val().trim();
    let _0x490fx52 = $('#region .defaultListTitle').html() != 'Область' ? $('#region .defaultListTitle').html() : 'Область';
    let _0x490fx53 = $('#zip').val().trim();
    let _0x490fx54 = $('#phone').val().trim();
    let _0x490fx55 = $('#email').val().trim();
    let _0x490fx56 = $('#passportNumber').val().replace(/[\s]/g, '').trim();
    let _0x490fx57 = $('#passportIssueDate').val().trim();
    let _0x490fx58 = $('#issuingAuthority').val().trim();
    let _0x490fx59 = $('#innNumber').val().trim();
    let _0x490fx5a = $('#cardNumber').val().replace(/[\s]/g, '').trim();
    let _0x490fx5b = $('#cardDate').val().trim();
    let _0x490fx5c = $('#cardCvv').val().trim();
    let _0x490fx8 = {
        'profileName': _0x490fx6,
        'shipping': {
            'firstName': _0x490fx4c,
            'middleName': _0x490fx4d,
            'lastName': _0x490fx4e,
            'addrFirst': _0x490fx4f,
            'addrSecond': _0x490fx50,
            'city': _0x490fx51,
            'zip': _0x490fx53,
            'phone': _0x490fx54,
            'email': _0x490fx55
        },
        'verification': {
            'passportNumber': _0x490fx56,
            'passportIssueDate': _0x490fx57,
            'issuingAuthority': _0x490fx58,
            'innNumber': _0x490fx59
        },
        'card': {
            'cardNumber': _0x490fx5a,
            'cardDate': _0x490fx5b,
            'cardCvv': _0x490fx5c
        }
    };
    return _0x490fx8
}

function setCheckoutTimeInApp(_0x490fx11) {
    $('#scheduleTime').attr('disabled', 'true');
    let _0x490fx10 = $('#scheduleTime').val();
    _0x490fx10 = _0x490fx10.split(':');
    let _0x490fx5e = 0;
    if (_0x490fx10[3].length === 1) {
        _0x490fx5e = _0x490fx10[3] * 100
    } else {
        if (_0x490fx10[3].length === 2) {
            _0x490fx5e = _0x490fx10[3] * 10
        } else {
            if (_0x490fx10[3].length === 3) {
                _0x490fx5e = _0x490fx10[3]
            }
        }
    };
    console.log(_0x490fx5e);
    chrome.tabs.sendMessage(_0x490fx11.id, {
        "action": 'setCheckoutTime',
        "data": {
            "hour": _0x490fx10[0],
            "minute": _0x490fx10[1],
            "second": _0x490fx10[2],
            "millisecond": _0x490fx5e
        }
    }, {}, function (_0x490fx5f, _0x490fx60, _0x490fx61) {
        if (_0x490fx5f === 'success') {
            $('#setCheckoutTime').attr('data-time', _0x490fx10);
            $('#setCheckoutTime').html('stop')
        }
    })
}

function removeCheckoutTimeInApp(_0x490fx11) {
    $('#scheduleTime').removeAttr('disabled');
    chrome.tabs.sendMessage(_0x490fx11.id, {
        "action": 'removeCheckoutTime'
    }, {}, function (_0x490fx5f, _0x490fx60, _0x490fx61) {
        if (_0x490fx5f === 'success') {
            $('#setCheckoutTime').removeAttr('data-time');
            $('#setCheckoutTime').html('Set Checkout Time')
        }
    })
}

function getItems() {
    loading($('#upcoming'));
    getItemsAJAX().then(function (_0x490fx8) {
        try {
            let _0x490fx64 = [];
            let _0x490fx65 = 0;
            for (let _0x490fx14 of ($(_0x490fx8))) {
                if ($(_0x490fx14).attr('id') === 'root') {
                    for (let _0x490fx66 of _0x490fx14.getElementsByClassName('card-link')) {
                        if (($(_0x490fx66).children('img')[0] != undefined) && (_0x490fx65 < 8)) {
                            let _0x490fx67 = 'https://www.nike.com' + $(_0x490fx66).attr('href') + '/';
                            let _0x490fx68 = $($(_0x490fx66).children('img')[0]).attr('src');
                            _0x490fx64[_0x490fx65] = {
                                "productUrl": _0x490fx67,
                                "productImage": _0x490fx68
                            };
                            _0x490fx65 += 1
                        }
                    }
                }
            };
            getItemsUI(_0x490fx64)
        } catch (e) {
            $('#upcoming').html('Unable to get a response from Nike')
        }
    }, function () {
        showErrorBlock()
    })
}

function generateItemToStep2(_0x490fx12) {
    postOnNike(_0x490fx12).then(function (_0x490fx8) {
        let _0x490fx19, _0x490fx6a, _0x490fx6b, _0x490fx6c, _0x490fx6d, _0x490fx6e;
        try {
            let _0x490fx6f = $(_0x490fx8)[38].text.substr($(_0x490fx8)[38].text.indexOf('{"cookies'), $(_0x490fx8)[38].text.length);
            _0x490fx6f = JSON.parse(_0x490fx6f.substr(0, _0x490fx6f.indexOf(';window.initilizeAppWithHandoffState(')));
            let _0x490fx70 = _0x490fx6f.viewThread.threadId;
            let _0x490fx71 = _0x490fx6f.product.threads.data.items[_0x490fx70];
            _0x490fx19 = _0x490fx71.productId;
            _0x490fx6a = _0x490fx71.coverCard.defaultURL;
            _0x490fx6d = _0x490fx6f.product.availabilities.data.items[_0x490fx19];
            console.log(_0x490fx6d);
            _0x490fx6e = _0x490fx6d.sizeRun.replace(/[^.Y\d]/g, ' ').replace(/\s+/g, ' ').split(' ');
            _0x490fx6e[_0x490fx6e.length - 1] = _0x490fx6e[_0x490fx6e.length - 1].replace(/\s+/g, ' ').trim();
            _0x490fx6e = _0x490fx6e.sort((_0x490fx73, _0x490fx74) => {
                return _0x490fx73 - _0x490fx74
            }).filter((_0x490fx72) => {
                return _0x490fx72 !== ''
            });;;
            console.log(_0x490fx6e);
            for (let _0x490fx75 of _0x490fx71.cards) {
                if (_0x490fx75.subType === 'carousel') {
                    _0x490fx6b = _0x490fx75.subtitle + ' ' + _0x490fx75.title;
                    _0x490fx6c = _0x490fx75.description
                }
            }
        } catch (e) {
            for (let _0x490fx76 of $(_0x490fx8)) {
                if (_0x490fx76.name === 'branch:deeplink:productId') {
                    _0x490fx19 = _0x490fx76.content
                };
                if (_0x490fx76.name === 'twitter:image') {
                    _0x490fx6a = _0x490fx76.content
                };
                if (_0x490fx76.name === 'og:title') {
                    _0x490fx6b = _0x490fx76.content;
                    _0x490fx6b = _0x490fx6b.substr(0, _0x490fx6b.indexOf('—'))
                }
            }
        };
        if ((_0x490fx19 != undefined) && (_0x490fx6a != undefined) && (_0x490fx6b != undefined)) {
            let _0x490fx77 = {
                "productId": _0x490fx19,
                "url": _0x490fx12,
                "itemName": _0x490fx6b,
                "imageUrl": _0x490fx6a,
                "imtemDescription": _0x490fx6c,
                "sizes": {
                    "sizes": _0x490fx6d,
                    "sizesArr": _0x490fx6e
                }
            };
            generateItemToStep2UI(_0x490fx77)
        } else {
            showErrorBlock()
        }
    }, function () {
        showErrorBlock()
    })
}

function generateCheckoutPage(_0x490fx12, _0x490fx17, _0x490fx19) {
    let _0x490fx3e = false;
    let _0x490fx79;
    chrome.tabs.query({}, function (_0x490fx7a) {
        for (var _0x490fx7b = 0; _0x490fx7b < _0x490fx7a.length; _0x490fx7b++) {
            _0x490fx79 = _0x490fx7a[_0x490fx7b].url.substr(_0x490fx7a[_0x490fx7b].url.indexOf('returnUrl=') + 10, _0x490fx7a[_0x490fx7b].url.length).replace(/\%2F/g, '/');
            if (_0x490fx79 === _0x490fx12) {
                _0x490fx3e = true;
                tabId = _0x490fx7a[_0x490fx7b].id
            }
        };
        if (_0x490fx3e === false) {
            let _0x490fx7c = _0x490fx12 + '?productId=' + _0x490fx19 + '&size=' + _0x490fx17;
            chrome.tabs.create({
                'url': _0x490fx7c,
                'index': 0
            }, function (_0x490fx11) {})
        } else {
            chrome.tabs.update(tabId, {
                "active": true
            })
        }
    })
}

function clock() {
    var _0x490fx7e = new Date(),
        _0x490fx7f = (_0x490fx7e.getHours() < 10) ? '0' + _0x490fx7e.getHours() : _0x490fx7e.getHours(),
        _0x490fx80 = (_0x490fx7e.getMinutes() < 10) ? '0' + _0x490fx7e.getMinutes() : _0x490fx7e.getMinutes(),
        _0x490fx81 = (_0x490fx7e.getSeconds() < 10) ? '0' + _0x490fx7e.getSeconds() : _0x490fx7e.getSeconds();
    var _0x490fx6f = _0x490fx7f + ':' + _0x490fx80 + ':' + _0x490fx81;
    $('.currentTime').html(_0x490fx6f)
}

function showWorkBlock() {
    $('#working .menuItem').each(function () {
        $(this).removeAttr('data-active')
    });
    $('#action').attr('data-active', 'true');
    $('.main').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn');;
    });
    $('#working').attr('data-active', 'true');
    loadingStop($('body'));
    loadingStop($('.upcomingItem'));
    upcomingClick = false;
    $('#autorizationBtn').html('Log In');
    initWorkBlock()
}

function showAuthBlock() {
    $('.main').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn');;
    });
    $('#authorization').attr('data-active', 'true');
    $('#autorizationBox').attr('data-active', 'true');
    loadingStop($('body'));
    $('#autorizationBtn').html('Log In')
}

function showSettingsBox() {
    $('#working .menuItem').each(function () {
        $(this).removeAttr('data-active')
    });
    $('.mainContainer').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn')
    });
    $('#settings').attr('data-active', 'true')
}

function showErrorBlock() {
    $('.main').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn');;
    });
    $('#error').attr('data-active', 'true');
    loadingStop($('body'))
}

function initWorkBlock() {
    $('#working .mainContainer').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn')
    });
    chrome.tabs.getSelected(null, function (_0x490fx11) {
        let _0x490fx12 = _0x490fx11.url;
        let _0x490fx79 = _0x490fx12.substr(_0x490fx12.indexOf('returnUrl=') + 10, _0x490fx12.length).replace(/\%2F/g, '/').replace('launcht', 'launch/t');
        if (_0x490fx12.indexOf('gs.nike.com/?checkoutId=') > 0) {
            $('#actionCheckout').attr('data-active', 'true').addClass('b-show').addClass('flexColumn');
            chrome.tabs.sendMessage(_0x490fx11.id, {
                "action": 'initWorkBlock'
            }, {}, function (_0x490fx5f, _0x490fx60, _0x490fx61) {
                if (_0x490fx5f == false) {
                    showErrorBlock();
                    return
                };
                if (_0x490fx5f.checkoutTime != undefined) {
                    $('#scheduleTime').attr('disabled', 'true');
                    $('#setCheckoutTime').attr('data-time', _0x490fx5f.checkoutTime);
                    $('#setCheckoutTime').html('stop');
                    $('#scheduleTime').val(_0x490fx5f.checkoutTime)
                };
                $('#actionCheckout .size').html(_0x490fx5f.size);
                $('#actionCheckout .itemName').html(strHandler(_0x490fx5f.itemName, 20));
                $('#actionCheckout .price').html(_0x490fx5f.itemPrice);
                _0x490fx87(_0x490fx79).catch((_0x490fx18) => {
                    return console.log(_0x490fx18)
                })
            });

            async function _0x490fx87(_0x490fx12) {
                fetch(_0x490fx12).then(function (_0x490fx88) {
                    _0x490fx88.text().then(function (_0x490fx8) {
                        for (let _0x490fx76 of $(_0x490fx8)) {
                            if (_0x490fx76.name === 'twitter:image') {
                                $('.itemImage').attr('style', 'background-image: url("' + _0x490fx76.content + '")')
                            }
                        }
                    })
                })
            }
        } else {
            $('#actionStart').attr('data-active', 'true').addClass('b-show')
        }
    })
}

function showProfilesBox() {
    $('#working .menuItem').each(function () {
        $(this).removeAttr('data-active')
    });
    $('#profiles').attr('data-active', 'true');
    $('.mainContainer').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn')
    });
    $('#saveProfile').removeAttr('data-edit');
    $('#profilesMenu').attr('data-active', 'true').addClass('b-show').addClass('flexColumn')
}

function showProfileCreateBox() {
    $('#profileName').removeAttr('disabled');
    $('#profileGenerate input').each(function () {
        $(this).val('');
        $(this).removeClass('validationError')
    });
    $('#region span[name="region"]').html('Область').removeAttr('data-hasvalue');
    $('.mainContainer').each(function (_0x490fx18) {
        $(this).removeAttr('data-active').removeClass('b-show').removeClass('flexColumn')
    });
    $('#profileGenerate').attr('data-active', 'true').addClass('b-show');
    if ($('#saveProfile').attr('data-edit') == 'true') {
        $('#profileName').attr('disabled', 'disabled')
    }
}

function printProfilesUI(_0x490fx8) {
    $('.profile').remove();
    getActiveProfile(function (_0x490fx6) {
        for (let _0x490fx7 of _0x490fx8) {
            let _0x490fx8c = false;
            if (_0x490fx7.profileName == _0x490fx6) {
                _0x490fx8c = true
            };
            $('.profilesBox').append('<div class="profile" data-active="' + _0x490fx8c + '"><h3 class="profileName">' + _0x490fx7.profileName + '</h3><div class="profileFeateres"><div class="duplicate profileFeateresBtn"></div><div class="edit profileFeateresBtn"></div><div class="delete profileFeateresBtn"></div></div>')
        }
    })
}

function printNewProfile(_0x490fx7, _0x490fx2) {
    if (_0x490fx2 == 1) {
        $('.profilesBox').append('<div class="profile" data-active="true"><h3 class="profileName">' + _0x490fx7.profileName + '</h3><div class="profileFeateres"><div class="duplicate profileFeateresBtn"></div><div class="edit profileFeateresBtn"></div><div class="delete profileFeateresBtn"></div></div>')
    } else {
        $('.profilesBox').append('<div class="profile" data-active="false"><h3 class="profileName">' + _0x490fx7.profileName + '</h3><div class="profileFeateres"><div class="duplicate profileFeateresBtn"></div><div class="edit profileFeateresBtn"></div><div class="delete profileFeateresBtn"></div></div>')
    }
}

function generateProfileUI(_0x490fx7) {
    $('#profileName').val(_0x490fx7.profileName);
    $('#firstName').val(_0x490fx7.shipping.firstName);
    $('#middleName').val(_0x490fx7.shipping.middleName);
    $('#lastName').val(_0x490fx7.shipping.lastName);
    $('#addrFirst').val(_0x490fx7.shipping.addrFirst);
    $('#addrSecond').val(_0x490fx7.shipping.addrSecond);
    $('#city').val(_0x490fx7.shipping.city);
    $('#region .defaultListTitle').html(_0x490fx7.shipping.region).attr('data-hasvalue', 'true');
    $('#zip').val(_0x490fx7.shipping.zip);
    $('#phone').val(_0x490fx7.shipping.phone);
    $('#email').val(_0x490fx7.shipping.email);
    $('#passportNumber').val(_0x490fx7.verification.passportNumber);
    $('#passportIssueDate').val(_0x490fx7.verification.passportIssueDate);
    $('#issuingAuthority').val(_0x490fx7.verification.issuingAuthority);
    $('#innNumber').val(_0x490fx7.verification.innNumber);
    let _0x490fx5a = _0x490fx7.card.cardNumber != '' ? _0x490fx7.card.cardNumber.match(/.{1,4}/g).join(' ') : '';
    $('#cardNumber').val(_0x490fx5a);
    $('#cardDate').val(_0x490fx7.card.cardDate);
    $('#cardCvv').val(_0x490fx7.card.cardCvv)
}

function removeElement(_0x490fx14) {
    _0x490fx14.addClass('b-hide');
    setTimeout(function () {
        _0x490fx14.remove()
    }, 300)
}

function generateItemToStep2UI(_0x490fx8) {
    $('.itemContainer').attr('data-productId', _0x490fx8.productId);
    $('.itemContainer').attr('data-productUrl', _0x490fx8.url);
    $('#actionGenerate .itemName').html(strHandler(_0x490fx8.itemName, 20));
    $('#actionGenerate .itemImage').attr('style', 'background-image: url("' + _0x490fx8.imageUrl + '")');
    $('#actionGenerate .itemPrice').hide();
    if (_0x490fx8.sizes.sizesArr != null) {
        siziesHtml = '';
        for (let _0x490fx91 of _0x490fx8.sizes.sizesArr) {
            console.log(_0x490fx91);
            console.log(_0x490fx8.sizes.sizes.sizes);
            siziesHtml = siziesHtml + '<div class="productSize" data-size="' + _0x490fx8.sizes.sizes.sizes[_0x490fx91].size + '"><h3>' + _0x490fx8.sizes.sizes.sizes[_0x490fx91].localizedSize + '</h3></div>'
        };
        $('#sizeBox').html(siziesHtml)
    };
    $('#actionStart').addClass('b-hide');
    setTimeout(function () {
        $('#generateItem').html('Accept');
        $('#actionStart').attr('data-active', 'false').removeClass('b-hide');;;
        $('#actionGenerate').attr('data-active', 'true').addClass('b-show').addClass('flexColumn')
    }, 300)
}

function strHandler(_0x490fx6f, _0x490fx93) {
    if (_0x490fx6f.length > 28) {
        _0x490fx6f = _0x490fx6f.substr(0, _0x490fx6f.indexOf(' ', _0x490fx93))
    };
    return _0x490fx6f
}

function getItemsUI(_0x490fx8) {
    $('#upcoming').html('');
    for (let _0x490fx66 of _0x490fx8) {
        $('#upcoming').append('<div class="upcomingItem" style="background-image: url(' + _0x490fx66.productImage + ')" data-url="' + _0x490fx66.productUrl + '"></div>')
    };
    loadingStop($('#upcoming'))
}

function loading(_0x490fx14) {
    _0x490fx14.append('<div class="loadingGif"></div>')
}

function loadingStop(_0x490fx14) {
    $(_0x490fx14).children('.loadingGif').remove()
}

function initSettingsUI(_0x490fx98) {
    $('#autofillEnable .configurationCheker').attr('data-enable', _0x490fx98.autofill)
}

function configurationChekerChange(_0x490fx14) {
    if (_0x490fx14.attr('data-enable') === 'true') {
        _0x490fx14.attr('data-enable', 'false');
        return false
    } else {
        _0x490fx14.attr('data-enable', 'true');
        return true
    }
}