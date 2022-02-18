//= components/jquery.min.js
//= components/jquery.magnific-popup.min.js
//= components/jquery.mCustomScrollbar.js
//= components/slick.min.js
//= components/jquery.maskedinput.min.js
$(function () {

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


    autocomplete("myInput", medicines);
    autocomplete("header-place", countries);


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
    $('.popup-content').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade'
    });

    //popup close 
    function closePopup() {
        let popupClose = document.querySelectorAll('.popup-close');
        if (popupClose) {
            popupClose.forEach((item) => {
                item.addEventListener('click', () => {
                    $.magnificPopup.close();
                })
            })
        }

    }
    closePopup();
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
    // стилизация скролла
    $(".basket-body").mCustomScrollbar({

    });

    // открытие боковое панели
    function openPanel(openBtn, openBox, closeBtn) {
        let btnOpen = document.querySelector(`.${openBtn}`);
        let boxOpen = document.querySelector(`.${openBox}`);
        let btnClose = document.querySelector(`.${closeBtn}`);
        let body = document.querySelector('body');
        let backgroundFon = document.querySelector('.background-fon');
        if (btnOpen && boxOpen) {
            btnOpen.addEventListener('click', () => {

                if (!boxOpen.classList.contains('active')) {
                    boxOpen.classList.add('active');
                    backgroundFon.classList.add('active');
                    body.classList.add('stop');
                }
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
    openPanel('header-btn-basket', 'basket', 'basket-close')

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
})