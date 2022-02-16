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