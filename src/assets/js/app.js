//= components/jquery.min.js
//= components/jquery.magnific-popup.min.js
//= components/jquery.mCustomScrollbar.js
//= components/slick.min.js
//= components/jquery.maskedinput.min.js
$(function () {

    // активация формы результатат поиска
    function formSearchActive() {
        let formSearch = document.querySelector('.form-search');
        let formInputSearch = document.querySelectorAll('.form-input-search');
        let body = document.querySelector('.page');
        if (formSearch && formInputSearch) {
            formInputSearch.forEach(item => {
                item.addEventListener('keyup', () => {
                    if (item.value != '') {
                        formSearch.style.display = 'flex';
                    } else if (item.value == '') {
                        formSearch.style.display = 'none';
                    }
                })
                item.addEventListener('click', () => {
                    formSearch.style.display = 'flex';
                })
                body.addEventListener('click', () => {
                    formSearch.style.display = 'none';
                })
            })

        }
    }
    formSearchActive();
    // header place open
    function openPlace() {
        let headerPlaceHead = document.querySelector('.header-place-head');
        let headerPlaceBody = document.querySelector('.header-place-body');
        if (headerPlaceHead && headerPlaceBody) {
            let headerPlaceClose = document.querySelector('.header-place-close');
            let headerPlaceCity = document.querySelector('.header-place-city');

            let sityName = document.querySelectorAll('.sity-name');
            headerPlaceHead.addEventListener('click', () => {
                if (!headerPlaceHead.classList.contains('active')) {
                    headerPlaceHead.classList.add('active');
                    headerPlaceBody.classList.add('active');
                } else {
                    headerPlaceHead.classList.remove('active');
                    headerPlaceBody.classList.remove('active');
                }

            })

            headerPlaceClose.addEventListener('click', () => {
                headerPlaceHead.classList.remove('active');
                headerPlaceBody.classList.remove('active');
            })

            sityName.forEach((item) => {

                item.addEventListener('click', () => {
                    sityName.forEach((item) => {
                        if (item.classList.contains('active')) {
                            item.classList.remove('active')
                        }
                    })
                    item.classList.add('active');
                    headerPlaceCity.textContent = item.textContent;

                    headerPlaceHead.classList.remove('active');
                    headerPlaceBody.classList.remove('active');
                })
            })

        }
    };
    openPlace();

    //autocomplite

    let countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Канада", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "Франция", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Германия", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Мужчина", "Israel", "Италия", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Швеция", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    let medicines = ['анавенол', 'анавенол', 'анальгин-хинин', 'анальгин-хинин', 'анафранил', 'анальгин-хинин']
    function autocomplete(idFormSearch, sortList) {
        /* функция автозаполнения принимает два аргумента,
        элемент текстового поля и массив возможных значений автозаполнения: */
        // класс формы поиска id
        let inp = document.getElementById(idFormSearch)
        let currentFocus;
        if (inp) {
            /* выполнение функции, когда кто-то пишет в текстовом поле: */
            inp.addEventListener("input", function (e) {
                let a, b, i, val = this.value;
                /* закрыть все уже открытые списки значений автозаполнения */
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                /* создайте элемент DIV, который будет содержать элементы (значения): */
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /* добавьте элемент DIV в качестве дочернего элемента контейнера автозаполнения: */
                this.parentNode.appendChild(a);
                /* для каждого элемента в массиве... */
                for (i = 0; i < sortList.length; i++) {
                    /* проверьте, начинается ли элемент с тех же букв, что и значение текстового поля: */
                    if (sortList[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /* создайте элемент DIV для каждого соответствующего элемента: */
                        b = document.createElement("DIV");
                        b.classList.add('autocomplete-items-row')
                        /* сделайте соответствующие буквы жирным шрифтом: */
                        b.innerHTML = "<span class='autocompliter-literal'>" + sortList[i].substr(0, val.length) + "</span>";
                        b.innerHTML += sortList[i].substr(val.length);
                        /* вставьте поле ввода, которое будет содержать значение текущего элемента массива: */
                        b.innerHTML += "<input type='hidden' value='" + sortList[i] + "'>";
                        /* выполнение функции, когда кто-то нажимает на значение элемента (элемент DIV): */
                        b.addEventListener("click", function (e) {
                            /* вставьте значение для текстового поля автозаполнения: */
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /* закройте список значений автозаполнения,
                            (или любые другие открытые списки значений автозаполнения : */
                            closeAllLists();

                        });
                        a.appendChild(b);
                    }
                }

                // стилизация скрола
                $(".autocomplete-items").mCustomScrollbar({

                });

                addFilter("resultPopup-input", 'resultPopup__block-adress', 'resultPopup-adress', 'resultPopup-remove');

                // добовление выброного элемента в поиске на страницу 
                // nameSerch класс формы поиска
                // filterBlock - блок куда добовляются новые эелементы
                // className - класс добовляемого блока
                // btnRemove - наименование класса кнопки очистки блока с добавлеными блоками

                function addFilter(nameSerch, filterBlock, className, btnRemove) {
                    let btnAutocomp = document.querySelectorAll('.autocomplete-items-row');
                    let blockFilter = document.querySelector(`.${filterBlock}`)
                    if (blockFilter) {
                        btnAutocomp.forEach(item => {
                            item.addEventListener('click', () => {
                                if (nameSerch == inp.classList) {
                                    let removeBtn = document.querySelector(`.${btnRemove}`);
                                    b = document.createElement("DIV");
                                    b.classList.add(`${className}`);
                                    b.innerHTML = `<span class="resultPopup-adress-name">${inp.value}` +
                                        '</span>' +
                                        '<button class="resultPopup-adress-dell" > ' +
                                        ' <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                        ' <path' +
                                        ' d="M5.99943 6.94273L10.1947 11.138L11.1375 10.1952L6.94224 5.99992L11.1375 1.80469L10.1947 0.861878L5.99943 5.05711L1.80414 0.861816L0.861328 1.80463L5.05662 5.99992L0.861328 10.1952L1.80414 11.138L5.99943 6.94273Z"' +
                                        ' fill="white" />' +
                                        ' </svg>' +
                                        '</button>';
                                    blockFilter.style.display = 'block'
                                    blockFilter.insertBefore(b, removeBtn);
                                    // удаление добавленого элемента при нажатии на кнопку
                                    removeBlock("resultPopup-adress-dell", 'resultPopup-adress', 'resultPopup__block-adress', 'resultPopup-remove');
                                }
                            })
                        })
                    }
                }



            });

            /* выполнение функции нажимает клавишу на клавиатуре: */
            inp.addEventListener("keydown", function (e) {
                let x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /* Если нажата клавиша со стрелкой вниз,
                    увеличение текущей переменной фокуса: */
                    currentFocus++;
                    /* и сделать текущий элемент более видимым: */
                    addActive(x);
                } else if (e.keyCode == 38) { //вверх
                    /* Если нажата клавиша со стрелкой вверх,
                    уменьшите текущую переменную фокуса: */
                    currentFocus--;
                    /* и сделать текущий элемент более видимым: */
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /* Если нажата клавиша ENTER, предотвратите отправку формы, */
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /* и имитировать щелчок по элементу "active": */
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                /* функция для классификации элемента как "active": */
                if (!x) return false;
                /* начните с удаления "активного" класса для всех элементов: */
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*добавить класса "autocomplete-active": */
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /* функция для удаления "активного" класса из всех элементов автозаполнения: */
                for (let i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /* закройте все списки автозаполнения в документе,
                кроме того, который был передан в качестве аргумента: */
                let x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /* выполнение функции, когда кто-то щелкает в документе: */
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }
    }



    autocomplete("myInput", medicines);
    autocomplete("header-place", countries);
    autocomplete("resultPopup-search", countries);
    autocomplete("resultPopup-search-two", countries);
    autocomplete("control__search-id", countries);
    autocomplete("cabinetOrder__search-id", countries);
    // slaider
    $(".slaid-slaider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        arrows: false
    });

    // показ скрытых номеров в блоке recom
    function recomVisible() {
        let recomBtnVisible = document.querySelectorAll('.recom-btn-visible');
        if (recomBtnVisible) {
            recomBtnVisible.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.parentElement.classList.toggle('--visible');
                    item.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle('--visible');
                })
            })
        }
    }
    recomVisible();
    // popup 
    $('.popup-content , .popup-content-2').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        closeBtnInside: true
    });



    //popup close 
    function closePopup(closeBtn) {
        let popupClose = document.querySelectorAll(`.${closeBtn}`);
        if (popupClose) {
            popupClose.forEach((item) => {
                item.addEventListener('click', () => {
                    $.magnificPopup.close();
                })
            })
        }

    }
    closePopup('popup-close');
    closePopup('resultPopup-btn-result');
    closePopup('resultMap-close');
    closePopup('orderPopup-link-2');
    closePopup('popupPwd-btn');
    closePopup('popupDel-btn');
    closePopup('popupDel-btn-dell');
    closePopup('resultMap-inner-close-mob');

    // показывать скрывать пароль

    function showPassword() {
        let btn = document.querySelectorAll('.password-btn');
        if (btn) {
            btn.forEach((item) => {
                item.addEventListener('click', function () {
                    let passwordId = item.getAttribute('data-password');
                    let showPassword = document.querySelector(passwordId);
                    item.classList.toggle('--active')
                    if (showPassword.getAttribute('type') === 'password') {
                        showPassword.type = 'text';
                    } else {
                        showPassword.type = 'password';
                    }
                })
            })
        }
    };
    showPassword();

    // tabs
    function tabs(btnOpenTab, bookBark, tabAttr) {
        const tabBtn = document.querySelectorAll(`.${btnOpenTab}`);
        const tabItem = document.querySelectorAll(`.${bookBark}`);

        if (tabItem) {
            tabBtn.forEach((item) => {
                item.addEventListener('click', function () {
                    let tabId = item.getAttribute(tabAttr);
                    let currentTab = document.querySelector(tabId);

                    tabBtn.forEach(function (item) {
                        item.classList.remove('active')
                    })

                    tabItem.forEach(function (item) {
                        item.classList.remove('active')
                    })
                    item.classList.add('active');
                    currentTab.classList.add('active');

                });
            });

        }


    }
    tabs("popup-box-btn", "popup-wrapper", "data-tab");
    tabs("info__sidebar-btn", "info-tab", "data-info");
    tabs("cabiner-btn", "cabinet__tab", "data-cabinet");


    // открытие окна регистрации
    function openReg() {
        let btnOpen = document.querySelectorAll('.popup-btn-regist');
        let tabItem = document.querySelectorAll('.popup-tab');
        if (btnOpen && tabItem) {
            btnOpen.forEach((item) => {
                item.addEventListener('click', () => {
                    let tabId = item.getAttribute('data-popupTab');
                    let currentTab = document.querySelector(tabId);

                    tabItem.forEach(function (item) {
                        item.classList.remove('active')
                    })

                    currentTab.classList.add('active');
                })
            })

        }
    }
    openReg();
    // mask
    $(".phone").mask("+38-999-999-99-99");
    $(".editInfo--input-phone").mask("+38-999-999-99-99");
    // стилизация скролла
    $(".basket-body").mCustomScrollbar({});
    $(".resultMap-body").mCustomScrollbar({});
    $(".form-search-scroll").mCustomScrollbar({});
    $(".orderPopup-accordion-body").mCustomScrollbar({});
    $(".menuBurger").mCustomScrollbar({});
    // открытие боковое панели
    function openPanel(openBtn, openBox, closeBtn) {
        let btnOpen = document.querySelectorAll(`.${openBtn}`);
        let boxOpen = document.querySelector(`.${openBox}`);
        let btnClose = document.querySelector(`.${closeBtn}`);
        let body = document.querySelector('body');
        let backgroundFon = document.querySelector('.background-fon');
        if (btnOpen && boxOpen) {

            btnOpen.forEach(item => {
                item.addEventListener('click', () => {

                    if (!boxOpen.classList.contains('active')) {
                        boxOpen.classList.add('active');
                        backgroundFon.classList.add('active');
                        body.classList.add('stop');
                    }
                })
            })
            backgroundFon.addEventListener("click", () => {
                boxOpen.classList.remove('active');
                backgroundFon.classList.remove('active');
                body.classList.remove('stop');
            })
            btnClose.addEventListener('click', () => {
                boxOpen.classList.remove('active');
                backgroundFon.classList.remove('active');
                body.classList.remove('stop');
            })
        }
    }
    openPanel('header-burger', 'menuBurger', 'menu-close');
    openPanel('header-btn-basket', 'basket', 'basket-close');
    openPanel('menuBurger-btn-basket', 'basket', 'basket-close');
    openPanel('result-filter-btn', 'result-filter', 'result-filter-close');
    openPanel('medic-filter-open', 'medic-filter', 'medic-fitter-close');
    openPanel('medic-filter-open', 'medic-filter', 'medic-filter-btn');

    // коризина колличество товара 
    function basketProduct() {
        let btnPrev = document.querySelectorAll('.basket-coll-prev');
        let btnNext = document.querySelectorAll('.basket-coll-next');
        let basketNum = document.querySelectorAll('.basket-num');
        if (btnPrev && btnNext && basketNum) {
            btnPrev.forEach((item) => {
                item.addEventListener('click', () => {
                    let tabId = item.getAttribute('data-basket');
                    let idInput = document.querySelector(tabId);
                    idInput.value -= 1;
                    if (idInput.value > 0) {
                        if (item.classList.contains('--disabled')) {
                            item.classList.remove('--disabled')
                        }
                    } else if (idInput.value <= 1) {
                        item.classList.add('--disabled')
                        idInput.value = 1;
                    }
                })
            })
            btnNext.forEach((item) => {
                item.addEventListener('click', () => {
                    let tabId = item.getAttribute('data-basket');
                    let idInput = document.querySelector(tabId);
                    let num = +idInput.value;

                    idInput.value = num + 1;
                    if (idInput.value > 1) {
                        btnPrev.forEach(item => {
                            if (item.getAttribute('data-basket') == tabId) {

                                if (item.classList.contains('--disabled')) {
                                    item.classList.remove('--disabled')
                                }
                            }
                        })
                    }

                })
            })
            basketNum.forEach((item) => {
                item.addEventListener('keyup', () => {
                    console.log(item.value)
                    if (item.value < 0) {
                        item.value = 1;
                    }
                })
            })

        }
    }
    basketProduct();

    // select
    let select = function () {
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');
        if (selectHeader) {
            selectHeader.forEach((item) => {
                item.addEventListener('click', selectToggle)
            })

            selectItem.forEach((item) => {
                item.addEventListener('click', selectChoose)
            })

            function selectToggle() {
                this.parentElement.classList.toggle('is-active');
            }

            function selectChoose() {
                let text = this.innerText;
                let select = this.closest('.select');
                let currentText = select.querySelector(".select__current");
                currentText.innerText = text;
                select.classList.remove('is-active');
            }
        }

    }
    select();

    // result filter open
    function accordionOpen(accordionHead) {
        let btnOpen = document.querySelectorAll(`.${accordionHead}`)
        if (btnOpen) {
            btnOpen.forEach(item => {
                item.addEventListener('click', () => {
                    item.classList.toggle('active');
                })
            })
        }
    }

    accordionOpen('result__filter-head');
    accordionOpen('resultMap__row-head');
    accordionOpen('orderPopup-accordion-btn');
    // открытие всех номеров блок resutl__box
    function visibleBlock(btnVisible) {
        let btnOpen = document.querySelectorAll(`.${btnVisible}`);
        if (btnOpen) {
            btnOpen.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.classList.toggle('active');
                })
            })
        }
    }
    visibleBlock('result-tell-visible');
    // remove resultPopup-adress
    // nameBtn кнопка удаления улицы
    // blockDel блок который необходимо удалить
    // containerBlock контейнер содеражаций название улиц
    // btnHidd очистка котейнера
    function removeBlock(nameBtn, blockDel, containerBlock, btnHidd) {
        let btnRemove = document.querySelectorAll(`.${nameBtn}`);
        let containerHidden = document.querySelector(`.${containerBlock}`);
        let btnHidden = document.querySelector(`.${btnHidd}`)
        if (btnRemove && containerHidden) {
            btnRemove.forEach(item => {
                item.addEventListener('click', () => {
                    let dellBlock = item.parentElement;
                    dellBlock.parentNode.removeChild(dellBlock);
                    let blockDell = document.querySelectorAll(`.${blockDel}`)
                    if (blockDell.length == 0) {
                        containerHidden.style.display = 'none';
                    }
                })
            })
            btnHidden.addEventListener('click', () => {
                let btnRemove = document.querySelectorAll(`.${nameBtn}`);
                btnRemove.forEach(item => {
                    item.parentElement.parentNode.removeChild(item.parentElement);
                })
                containerHidden.style.display = 'none';
            })
        }
    }

    removeBlock("resultPopup-adress-dell", 'resultPopup-adress', 'resultPopup__block-adress', 'resultPopup-remove');
    // выбор места
    function choisePlace(nameBtn, hideBlock, blockVisible, btnPlace, placeName) {
        let btnName = document.querySelectorAll(`.${nameBtn}`);
        let blockHide = document.querySelector(`.${hideBlock}`);
        let visibleBlock = document.querySelector(`.${blockVisible}`);
        let placeBtn = document.querySelectorAll(`.${btnPlace}`);
        let namePlace = document.querySelector(`.${placeName}`);
        if (btnName) {
            btnName.forEach(item => {
                item.addEventListener('click', () => {
                    blockHide.style.display = 'none';
                    visibleBlock.style.display = 'block';
                })

            })

            if (placeBtn && namePlace) {
                placeBtn.forEach(item => {
                    item.addEventListener('click', () => {
                        blockHide.style.display = 'block';
                        visibleBlock.style.display = 'none';
                        namePlace.textContent = item.value;
                    })
                })
            }
        }
    }

    choisePlace('resultPopup-btn', 'resultPopup__wrapp-adress', 'resultPopup__wrapp-place', 'resultPopup__place-radio', 'resultPopup-place-name');

    // удаление кнопки растояния на карте resultMap-box-inner
    function resultMapBoxRemve() {
        let removeBtn = document.querySelectorAll('.resultMap-inner-close');
        if (removeBtn) {
            removeBtn.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.remove();
                })
            })
        }
    }
    resultMapBoxRemve();

    // добовление формы добовления телефона
    //regBtn-кнопка добовелния формы
    // regRow - блок куда добовляется форма
    // regInp-класс добавленого элемента
    //regInpPhone класс маски телефона
    function registAddTell(regBtn, regRow, regInp, regInpPhone) {
        let registAddBtn = document.querySelectorAll(`.${regBtn}`);
        let registAddRow = document.querySelector(`.${regRow}`);
        if (registAddBtn && registAddRow) {
            registAddBtn.forEach(item => {
                item.addEventListener('click', () => {
                    inputReg = document.createElement("input");
                    inputReg.classList.add(`${regInp}`);
                    inputReg.classList.add(`${regInpPhone}`);
                    registAddRow.appendChild(inputReg);
                    $(`.${regInpPhone}`).mask("+38-999-999-99-99");
                })
            })
        }
    }
    registAddTell('regist-add-btn', 'regist-add-row', 'regist-input', 'regist-input-phone');
    registAddTell('editInfo-row-btn', 'editInfo-row-add-tell', 'editInfo-input', 'editInfo--input-phone');


    // добовление формы 
    //inputBtn-кнопка добовелния формы
    //inputRow - блок куда добовляется форма
    //inputInp-класс добавленого элемента

    function inputAdd(inputBtn, inputRow, inputInp) {
        let registAddBtn = document.querySelectorAll(`.${inputBtn}`);
        let registAddRow = document.querySelector(`.${inputRow}`);
        if (registAddBtn && registAddRow) {
            registAddBtn.forEach(item => {
                item.addEventListener('click', () => {
                    inputReg = document.createElement("input");
                    inputReg.classList.add(`${inputInp}`);
                    registAddRow.appendChild(inputReg);

                })
            })
        }
    }
    inputAdd('editInfo-row-btn-one', 'editInfo-row-add', 'editInfo-input');
    // кабинет открытие дополнительных вкладок

    function openTabCabinet(nameBtn) {
        let btnOpen = document.querySelectorAll(`.${nameBtn}`);
        if (btnOpen) {
            btnOpen.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.parentElement.parentElement.classList.add('tabHidden');
                })
            })
        }
    }
    openTabCabinet('cabinetInfo-btn');

    // закрытие дополнительной вкладки мобильная версия
    function mobCloseTabCabiner(nameBtn) {
        let btnOpen = document.querySelectorAll(`.${nameBtn}`);
        if (btnOpen) {
            btnOpen.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.classList.remove('tabHidden');
                })
            })
        }
    }
    mobCloseTabCabiner('cabinet-btn--hidden');
    // закрыттие дополнительной вкладки
    function closeTabCabinet(nameBtn) {
        let btnOpen = document.querySelectorAll(`.${nameBtn}`);
        if (btnOpen) {
            btnOpen.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.parentElement.parentElement.classList.remove('tabHidden');
                })
            })
        }
    }
    closeTabCabinet('editInfo-btn-one');
    closeTabCabinet('editInfo-btn');
    closeTabCabinet('changeCabinet-btn');
    closeTabCabinet('changeCabinet-btn-save');
    // control table выбор товаров
    function controlTableProduct() {
        let controlLabel = document.querySelectorAll('.control__label-checkbox');
        let popupDelSpan = document.querySelector('.popupDel-span');
        if (controlLabel) {
            controlLabel.forEach(item => {
                item.addEventListener('click', () => {
                    let x = 0;
                    if (item.checked) {
                        item.parentElement.parentElement.parentElement.parentElement.classList.add('--active')
                    }
                    else {
                        item.parentElement.parentElement.parentElement.parentElement.classList.remove('--active')
                    }
                    controlLabel.forEach(item => {
                        if (item.checked) {
                            x += 1;
                        }
                    })
                    if (x === 1) {
                        popupDelSpan.textContent = `${x} товар`;
                    } else if (x > 1 && x <= 4) {
                        popupDelSpan.textContent = `${x} товара`;
                    } else if (x >= 5) {
                        popupDelSpan.textContent = `${x} товарoв`;
                    }
                })

            })
        }
    }
    controlTableProduct();
    // удаление продукта  control table
    function controlTableDell() {
        let controlTableRow = document.querySelectorAll('.control__table-row');
        let popupDelBtnDell = document.querySelectorAll('.popupDel-btn-dell');
        if (controlTableRow) {
            popupDelBtnDell.forEach(item => {
                item.addEventListener('click', () => {
                    controlTableRow.forEach(item => {
                        if (item.classList.contains('--active')) {
                            item.remove()
                        }
                    })
                })
            })
        }
    }
    controlTableDell();

    // активация дополнительной вкладки
    function controlTabs(btnOpenTab, bookBark, tabAttr) {
        const tabBtn = document.querySelectorAll(`.${btnOpenTab}`);
        const tabItem = document.querySelectorAll(`.${bookBark}`);

        if (tabItem) {
            tabBtn.forEach((item) => {
                item.addEventListener('click', function () {
                    let tabId = item.getAttribute(tabAttr);
                    let currentTab = document.querySelector(tabId);
                    currentTab.classList.add('tabHidden');

                });
            });

        }


    }

    controlTabs('conrtol__change', 'cabinet__tab', 'data-controlTab');

    // боковые панели мобильная версия функционирование

    function mob(nameWrapp, nameBtn, btnClose) {
        let cabWrapp = document.querySelector(`.${nameWrapp}`);
        if (cabWrapp) {
            window.addEventListener("resize", function () {
                if (document.body.clientWidth < 998) {
                    cabWrapp.classList.add('mob-active');
                } else {
                    cabWrapp.classList.remove('mob-active');
                }
                let btnTab = document.querySelectorAll(`.${nameBtn}`);
                let mobActive = document.querySelector('.mob-active');
                if (btnTab && mobActive) {
                    btnTab.forEach(item => {
                        item.addEventListener('click', () => {
                            mobActive.classList.add('mob-active-tab')
                        })
                    })
                }
                let cabinetTabBtn = document.querySelectorAll(`.${btnClose}`);
                if (cabinetTabBtn) {
                    cabinetTabBtn.forEach(item => {
                        item.addEventListener('click', () => {
                            if (mobActive.classList.contains('mob-active-tab')) {
                                mobActive.classList.remove('mob-active-tab')
                            }

                        })
                    })
                }
            });
            if (document.body.clientWidth < 998) {
                cabWrapp.classList.add('mob-active');
            } else {
                cabWrapp.classList.remove('mob-active');
            }
            let btnTab = document.querySelectorAll(`.${nameBtn}`);
            let mobActive = document.querySelector('.mob-active');
            if (btnTab && mobActive) {
                btnTab.forEach(item => {
                    item.addEventListener('click', () => {
                        mobActive.classList.add('mob-active-tab')
                    })
                })
            }
            let cabinetTabBtn = document.querySelectorAll(`.${btnClose}`);
            if (cabinetTabBtn) {
                cabinetTabBtn.forEach(item => {
                    item.addEventListener('click', () => {
                        if (mobActive.classList.contains('mob-active-tab')) {
                            mobActive.classList.remove('mob-active-tab')
                        }

                    })
                })
            }
        }

    }
    mob('cabinet__wrapp', 'cabiner-btn', 'cabinet__tab-btn');
    mob('info__wrapp', 'info__sidebar-btn', 'info-block-close');

    // добовление выброных элементов фильт
    function fulterAdd() {
        let bntAdd = document.querySelector('.result-filter-footer-btn');
        let filtList = document.querySelectorAll('.result__checkbox');
        let blockFilter = document.querySelector('.result__filter-add-block');
        if (bntAdd && filtList) {
            bntAdd.addEventListener('click', () => {
                let resultCheck = document.querySelectorAll('.result__filter-check');
                if (resultCheck) {
                    resultCheck.forEach(item => {
                        item.remove();
                    })
                }
                filtList.forEach(item => {
                    if (item.checked) {
                        console.log(item.value)
                        let removeBtn = document.querySelector(`.result__filter-remove`);
                        b = document.createElement("DIV");
                        b.classList.add(`result__filter-check`);
                        b.innerHTML = `<span class="result__filter-name">${item.value}` +
                            '</span>' +
                            '<button class="result__filter-adress-dell" > ' +
                            ' <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                            ' <path' +
                            ' d="M5.99943 6.94273L10.1947 11.138L11.1375 10.1952L6.94224 5.99992L11.1375 1.80469L10.1947 0.861878L5.99943 5.05711L1.80414 0.861816L0.861328 1.80463L5.05662 5.99992L0.861328 10.1952L1.80414 11.138L5.99943 6.94273Z"' +
                            ' fill="white" />' +
                            ' </svg>' +
                            '</button>';
                        blockFilter.style.display = 'flex'
                        blockFilter.insertBefore(b, removeBtn);
                        // удаление добавленого элемента при нажатии на кнопку
                        removeBlock("result__filter-adress-dell", 'result__filter-check', 'result__filter-add-block', 'result__filter-remove');
                    }
                })
                if (document.querySelectorAll('.result__filter-check').length == 0) {
                    blockFilter.style.display = 'none'
                }
            })
        }
    }
    fulterAdd();
    // удаление футера у карты
    function dellFooterMap() {
        let resultMapRow = document.querySelectorAll('.resultMap-row');
        let resultMapFooter = document.querySelector('.resultMap__footer');
        let resultMapFooterAdd = document.querySelector('.resultMap-footer-add');
        if (resultMapFooter && resultMapFooterAdd) {
            if (document.body.clientWidth < 998) {
                resultMapRow.forEach(item => {
                    item.addEventListener('click', () => {
                        resultMapFooter.style.display = 'none';
                        resultMapFooterAdd.style.display = 'flex';
                    })
                })
                resultMapFooterAdd.addEventListener('click', () => {
                    resultMapFooter.style.display = 'block';
                    resultMapFooterAdd.style.display = 'none';
                })
            }
            window.addEventListener("resize", function () {
                resultMapFooter.style.display = 'block';
                if (document.body.clientWidth < 998) {
                    resultMapRow.forEach(item => {
                        item.addEventListener('click', () => {
                            resultMapFooter.style.display = 'none';
                            resultMapFooterAdd.style.display = 'flex';
                        })
                    })
                    resultMapFooterAdd.addEventListener('click', () => {
                        resultMapFooter.style.display = 'block';
                        resultMapFooterAdd.style.display = 'none';
                    })
                }
                else {
                    resultMapFooterAdd.style.display = 'none';
                    resultMapFooter.style.display = 'none';
                }
            })

        }

    }
    dellFooterMap();

    function openText() {
        let openBtn = document.querySelectorAll('.medic-cart-open');
        if (openBtn) {
            openBtn.forEach(item => {
                item.addEventListener('click', () => {
                    item.parentElement.classList.toggle('active');
                })
            })
        }
    }
    openText();
})


