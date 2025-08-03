// Main
(function ($) {
  'use strict';

  const theme = {

    init: () => {

      theme.goTo();
      theme.initSlider();
      theme.initMobileMenu();
      theme.initTabs();
      theme.initZipCodeForm();
      theme.initAccordion();
      theme.initRange();
      theme.initPlusMinusInput();
      theme.initPricingTabs();
      theme.initCalcTabs();
      theme.initVolumeInputs();
      theme.modalFormScripts();
      theme.openModal();
      theme.sendData();
      theme.submitForm();
    },

    modalFormScripts: () => {
      $( "#datepicker" ).datepicker({
        dateFormat: 'dd/mm/y',
      });

      let dateVal = '';
      let timeVal = '';

      $(document).on('click', '.js_go-to-form', function (e) {
        e.preventDefault();

        dateVal = $( "#datepicker" ).datepicker("getDate");
        timeVal = $('.js_timepicker').find('input:checked').val();


        if(!dateVal || !timeVal) {

          alert('Please choose all options')
          return;
        }

        $(this).closest('.modal-tab').removeClass('active').addClass('checked');
        theme.modalTabs(this);

      });

      $(document).on('click', '.js_go-to-prev', function (e) {
        e.preventDefault();

        theme.modalTabs(this);
      });

      $(document).on('click', '.js_go-to-details', function (e) {
        e.preventDefault();

        if(!$("#info-form").valid()) {
          alert('Please fill in all fields');
          return;
        }

        let info = `
             ${$('#info-form').find('input[name="firstName"]').val()} ${$('#info-form').find('input[name="lastName"]').val()}<br>
               ${$('#info-form').find('input[name="phone"]').val()}<br>
               ${$('#info-form').find('input[name="email"]').val()}<br>
        `
        $('.js_client-info').append(info);

        let date = $( "#datepicker" ).datepicker("getDate")
        let details = `
                    ${$.datepicker.formatDate("yy-mm-dd", date)}<br>
                    ${$('.js_timepicker').find('input:checked').val()}
        `
        $('.js_details').append(details);

        let address = `
                    ${$('#info-form').find('input[name="street"]').val()}<br>
                    ${$('#info-form').find('input[name="unit"]').val()}
        `
        $('.js_client-address').append(address);


        $(this).closest('.modal-tab').removeClass('active').addClass('checked');
        theme.modalTabs(this);
      });

      console.log(dateVal, timeVal)

    },

    sendData: () => {
      $(document).on('click', '.js_send-data', function (e){
        e.preventDefault();
        const loader =  $(this).closest('.modal').find('.js_loader');
        loader.addClass('active');

        setTimeout(function () {
          $('#formModal').removeClass('active');
          loader.removeClass('active');
          $('#successModal').addClass('active');
        }, 1500)
      });

    },

    submitForm: () => {
      $(document).on('click', '.js_submit-form', function (e){
        e.preventDefault();
        const loader =  $(this).closest('section').find('.js_loader');
        loader.addClass('active');

        setTimeout(function () {
          $('#formModal').removeClass('active');
          loader.removeClass('active');
        }, 1500)
      });
    },

    openModal: () => {
      $(document).on('click', '.js_open-modal', function (e) {
        e.preventDefault();

        if($(this).closest('.calc-tab').is("#calc-pricing")) {
          if(!$('.js_result-items').find('li').length) {
            $('#zipInfoModal').addClass('active');
            return;
          }
          $('.js_result-items').find('li').map(function () {

            let text = `
                <li>${$(this).find('.result-item-name').text()}</li>
            `;

            $('.js_order-items').append(text)
            $('.js_order-total').text($('.js_total').text())
          });
        } else {
          if(!$('.js_volume-inputs').find('input:checked').length) {
            $('#zipInfoModal').addClass('active');
            return;
          }
          let text = `
                <li>${$('.js_volume-inputs').find('input:checked').next('label').find('p span').text()}</li>
            `;

          $('.js_order-items').append(text)
          $('.js_order-total').text($('.js_volume-total').text())
        }

        let modal = $(this).attr('href');
        $(modal).addClass('active');
      });

      $(document).on('click', '.js_close-modal', function (e) {
        e.preventDefault();
        $(this).closest('.modal').removeClass('active');
      });
    },

    modalTabs: (btn) => {

      let tab = $(btn).attr('href');

      if(!$(tab).length) return;

      $('.modal-tab').removeClass('active');
      $('.modal-tab').find('.modal-tab-inner').slideUp();

      $(tab).addClass('active');
      $(tab).find('.modal-tab-inner').slideDown();
    },

    initCalcTabs: () => {
      $('.calc-tab').hide();

      if(localStorage.getItem('addressInfo')) {
        $('#calc-chooser').show();
      } else {
        $('#calc-form').show();
      }

      $(document).on('click', '.js_go-to-tab', function (e) {
        e.preventDefault();

        let tab = $(this).attr('data-tab');

        if(!tab) return;

        $('.calc-tab').hide();

        $(tab).fadeIn(225);
      });

      $(document).on('click', '.js_go-to-tab-chooser', function (e) {
        e.preventDefault();

        let tab = $(this).closest('.calc-tab').find('input:checked').val();

        if(!$(tab).length) return;

        $('.calc-tab').hide();

        $(tab).fadeIn(225);
      });
    },

    initPricingTabs: () =>  {
      // Get Data

      let mainData = [];

      $.getJSON( "../json/updated-pricing.json", function() {}).done((data) => {

        mainData = data;

        const groups = data.reduce((groups, item) => {
          const type = item.type;
          if (!groups[type]) {
            groups[type] = [];
          };

          groups[type].push({
            id: item.id,
            name: item.name,
            basePrice: item.basePrice,
            addOnPrice: item.addOnPrice,
          });
          return groups;
        }, {});

        const itemsArrays = Object.keys(groups).map((type) => {
          return {
            type: type,
            items: groups[type]
          };
        });

        // Create Tabs

        const linksWrap = $(document).find('.js_calc-links');
        const tabsWrap = $(document).find('.js_calc-tabs');

        if(!linksWrap || !tabsWrap) return;

        itemsArrays.map((i, index) => {
          let link = `<li data-active="#${i.type}" class=${index ? "" : "active" }>${i.type}</li>`
          linksWrap.append(link);

          let items = '';

          i.items.map((item, indexItem) => {
            if(indexItem > 10) return;
            items += `<span class="js_price-item" data-id="${item.id}" data-name="${item.name}" data-add-price="${item.addOnPrice}" data-base-price="${item.basePrice}">${item.name}</span>`
          });

          const tab = ` <div class="cost-tab" id="${i.type}">
                           <div class="cost-tab-list">
                                       ${items}         
                           </div>
                         </div>`
          tabsWrap.append(tab)
        });

        tabsWrap.find('.cost-tab:not(:first-of-type)').hide();

        theme.initSearch(mainData);
        theme.initSearchEvents(mainData);

        $('.calc-search-options').hide();
      });

      // Create Events

      $('.js_calc-links').on('click', 'li', function (e) {
        e.preventDefault();

        const tabs = $('.js_calc-tabs').find('.cost-tab');
        const tab = $($(this).attr('data-active'));

        $('.js_calc-links li').removeClass('active');
        $(this).addClass('active');

        tabs.hide();
        tab.fadeIn(225);
      });

      $(document).on('click', '.js_price-item', function (e) {
        e.preventDefault();

        let id = $('.js_result-items').find(`[data-id = ${$(this).attr('data-id')}]`);

        if(id.length) {
          $(id).find('.plus').click();

          return;
        }

        const item = `<li class="result-item" data-id="${$(this).attr('data-id')}" data-add-price="${$(this).attr('data-add-price')}" data-base-price="${$(this).attr('data-base-price')}">
                        <a href="" class="result-item-remove">
                           <img src="img/svg/fi-rr-cross-circle.svg" alt="">
                        </a>
                        <span  class="result-item-name">${$(this).attr('data-name')}</span>
                           <div class="number">
                               <span class="plus">
                                   <span>+</span>
                               </span>
                               <input type="text" value="1"/>
                               <span class="minus">
                                  <span>-</span>
                              </span>
                           </div>
                       </li>
        `

        $('.js_result-items').append(item);

        theme.countTotal();
      });

      $('.js_result-items').on('click', '.result-item-remove', function (e) {
        e.preventDefault();
        $(this).closest('.result-item').remove();

        theme.countTotal();
      });

      $('.js_clear-all').on('click', function (e) {
        e.preventDefault();
        $('.js_result-items').find('.result-item').remove();

        theme.countTotal();
      });

    },

    initVolumeInputs: () => {
      $('.js_volume-inputs').on('change', 'input', function () {
        const val = $('.js_volume-inputs').find('input:checked').val();
        $('.js_volume-total').text(val);
      });
    },

    initSearch: (data) => {
      const searchOptions = $(document).find('.js_options-list');
      if(!searchOptions.length) return;

      searchOptions.html('');

      data.map(item => {
        searchOptions.append(`<li class="js_price-item" data-id="${item.id}" data-name="${item.name}" data-add-price="${item.addOnPrice}" data-base-price="${item.basePrice}">${item.name}</li>`)
      });
    },

    initSearchEvents: (data) => {
      $(document).on('keyup', '.js_search', function () {
        const val = $(this).val();

        val ? $('.calc-search-options').show() : $('.calc-search-options').hide();

        const filteredData = data.filter(item => {
          return item.name.includes(val);
        });

        theme.initSearch(filteredData);
      });
    },

    initPlusMinusInput: () => {
      $(document).on('click', '.minus', function () {
        const $input = $(this).parent().find('input');
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();

        theme.countTotal();

        return false;
      });

      $(document).on('click', '.plus', function () {
        const $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();

        theme.countTotal();

        return false;
      });
    },

    countTotal: () => {
      let total = 0;
      let addonPrices = [];
      let maxPrice = 0;
      let maxIndex = 0;
      let i = 0;

      $('.js_result-items').find('.result-item').map(function() {
        let price = +$(this).attr('data-base-price');
        let addPrice = +$(this).attr('data-add-price');

        for(let j = 0; j < $(this).find('input').val(); j++) {
          addonPrices[i] = addPrice;

          if (price > maxPrice) {
            maxPrice = price;
            maxIndex = i;
          }

          i++;
        }
      });

      addonPrices[maxIndex] = 0;

      total = addonPrices.reduce((accumulator, currentValue) => accumulator + currentValue, maxPrice);

      $('.js_total').text(total);
    },

    initRange: () => {
      const slider = document.getElementById("range");

      if(!slider) return;

      const min = slider.min;
      const max = slider.max;
      const value = slider.value;
      const textWrap = $("#rangeValue");
      textWrap.text((+slider.value).toLocaleString());

      slider.style.background = `linear-gradient(to right, #72A53B 0%, #72A53B ${(value-min)/(max-min)*100}%, white ${(value-min)/(max-min)*100}%, white 100%)`

      slider.oninput = function() {
        textWrap.text((+this.value).toLocaleString());
        this.style.background = `linear-gradient(to right, #72A53B 0%, #72A53B ${(this.value-this.min)/(this.max-this.min)*100}%, white ${(this.value-this.min)/(this.max-this.min)*100}%, white 100%)`
      };
    },

    initAccordion: () => {
      $('.js_question').removeClass('active');
      $('.js_question').find('.question-inner').slideUp();

      $(document).on('click', '.js_question', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).find('.question-inner').slideToggle();
      });

      $(document).on('click', '.question-inner', function(e) {
        e.stopPropagation();
      });
    },

    findLocation: (value) => {
      $.getJSON( "../json/filtered-uszip.json", function() {
      }).done(function(data) {
        if(data.find(i => i.zip === value || i.city === value )) {
          localStorage.setItem('addressInfo', JSON.stringify(data.find(i => i.zip === value|| i.city === value)));
          $('.js_form-text').text(JSON.parse(localStorage.getItem('addressInfo')).city)
          $('#zipFoundModal').addClass('active');
          if($('#calc-chooser').length) {
            $('.calc-tab').hide();
            $('#calc-chooser').show();
          }
        } else {
          $('#zipNotFoundModal').addClass('active');
        }
      }).fail(function() {
        $('.js_find-zip-btn').attr('disabled', false);
        console.log( "error" );
      }).always(function() {
        $('.js_find-zip-btn').attr('disabled', false);
        console.log( "complete" );
      });
    },

    initZipCodeForm: () => {
      if(localStorage.getItem('addressInfo')) {
        $('.js_form-text').text(JSON.parse(localStorage.getItem('addressInfo')).city)
      }
      $(document).on('click', '.js_find-zip-btn', function(e) {
        e.preventDefault();
        $(this).attr('disabled', true);

        const input = $(this).closest('.js_find-zip-form').find('input');
        const value = input.val();

        if(value.length < 5) {
          input.stop(true, true).effect('shake', { times: 3 }, 300);
          $(this).attr('disabled', false);
          return;
        }
        $(this).closest('.js_find-zip-form').find('input').val('');
        theme.findLocation(value);
      });
    },

    initTabs: () => {
      if (!$(document).find('.js_tabs-nav').length) return;

      $('.js_tabs-content').find('.tab:not(:eq(0))').hide();
      $('.js_tabs-nav li:eq(0)').addClass("active");

      $('.js_tabs-nav').on('click','li',function (e) {
        e.preventDefault();

        const tabs = $('.js_tabs-content .tab');
        const tab = $($(this).attr('data-tab'));

        $('.js_tabs-nav li').removeClass('active');
        $(this).addClass('active');

        tabs.hide();
        tab.fadeIn(225);
      });
    },

    initMobileMenu: () => {
      $(document).on('click', '.arrow-link', function(e){
        // console.log(e.target)
        // e.preventDefault();
        const sub = $(this).find('.submenu-wrap');
        if(sub.hasClass('active')) {
          sub.slideUp();
          sub.removeClass('active');
        } else {
          sub.slideDown();
          sub.addClass('active');
        }
      });

      $(document).on('click', '.js_open-nav', function(e){
        e.preventDefault();
        $(this).toggleClass('active')
        $('.js_mobile-nav').toggleClass('is-opened');
        // $('body').toggleClass('is-overflowed');
      });
    },

    initSlider: () => {
      Fancybox.bind('[data-fancybox="gallery"]', {
        //
      });

      $('#reviews-slider').slick({
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        centerPadding: '24px',
        prevArrow: `<button class="slick-arrow slick-prev" type="button">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.83075 24.0002C6.96236 24.0009 7.09282 23.9757 7.21466 23.9259C7.33649 23.8762 7.44731 23.8028 7.54075 23.7102L15.7107 15.5402C16.1764 15.0757 16.5458 14.524 16.7979 13.9165C17.0499 13.3091 17.1797 12.6578 17.1797 12.0002C17.1797 11.3425 17.0499 10.6913 16.7979 10.0838C16.5458 9.47639 16.1764 8.92463 15.7107 8.46017L7.54075 0.290185C7.44751 0.196947 7.33682 0.122986 7.215 0.0725256C7.09318 0.0220653 6.96261 -0.00390625 6.83075 -0.00390625C6.69889 -0.00390625 6.56832 0.0220653 6.4465 0.0725256C6.32468 0.122986 6.21399 0.196947 6.12075 0.290185C6.02751 0.383423 5.95355 0.494114 5.90309 0.615935C5.85263 0.737757 5.82666 0.868325 5.82666 1.00018C5.82666 1.13204 5.85263 1.26261 5.90309 1.38443C5.95355 1.50625 6.02751 1.61694 6.12075 1.71018L14.2907 9.88017C14.8526 10.4427 15.1681 11.2052 15.1681 12.0002C15.1681 12.7952 14.8526 13.5577 14.2907 14.1202L6.12075 22.2902C6.02702 22.3831 5.95263 22.4937 5.90186 22.6156C5.85109 22.7374 5.82495 22.8681 5.82495 23.0002C5.82495 23.1322 5.85109 23.2629 5.90186 23.3847C5.95263 23.5066 6.02702 23.6172 6.12075 23.7102C6.21419 23.8028 6.325 23.8762 6.44684 23.9259C6.56868 23.9757 6.69914 24.0009 6.83075 24.0002Z" fill="white"/>
                        </svg>
                      </button>`,
        nextArrow: `<button class="slick-arrow slick-next" type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.83075 24.0002C6.96236 24.0009 7.09282 23.9757 7.21466 23.9259C7.33649 23.8762 7.44731 23.8028 7.54075 23.7102L15.7107 15.5402C16.1764 15.0757 16.5458 14.524 16.7979 13.9165C17.0499 13.3091 17.1797 12.6578 17.1797 12.0002C17.1797 11.3425 17.0499 10.6913 16.7979 10.0838C16.5458 9.47639 16.1764 8.92463 15.7107 8.46017L7.54075 0.290185C7.44751 0.196947 7.33682 0.122986 7.215 0.0725256C7.09318 0.0220653 6.96261 -0.00390625 6.83075 -0.00390625C6.69889 -0.00390625 6.56832 0.0220653 6.4465 0.0725256C6.32468 0.122986 6.21399 0.196947 6.12075 0.290185C6.02751 0.383423 5.95355 0.494114 5.90309 0.615935C5.85263 0.737757 5.82666 0.868325 5.82666 1.00018C5.82666 1.13204 5.85263 1.26261 5.90309 1.38443C5.95355 1.50625 6.02751 1.61694 6.12075 1.71018L14.2907 9.88017C14.8526 10.4427 15.1681 11.2052 15.1681 12.0002C15.1681 12.7952 14.8526 13.5577 14.2907 14.1202L6.12075 22.2902C6.02702 22.3831 5.95263 22.4937 5.90186 22.6156C5.85109 22.7374 5.82495 22.8681 5.82495 23.0002C5.82495 23.1322 5.85109 23.2629 5.90186 23.3847C5.95263 23.5066 6.02702 23.6172 6.12075 23.7102C6.21419 23.8028 6.325 23.8762 6.44684 23.9259C6.56868 23.9757 6.69914 24.0009 6.83075 24.0002Z" fill="white"/>
                        </svg>
                    </button>`,
        responsive: [
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '0',
              arrows: false,
            }
          },
        ]
      });
      $('#gallery-slider').slick({
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        centerPadding: '24px',
        prevArrow: `<button class="slick-arrow slick-prev" type="button">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.83075 24.0002C6.96236 24.0009 7.09282 23.9757 7.21466 23.9259C7.33649 23.8762 7.44731 23.8028 7.54075 23.7102L15.7107 15.5402C16.1764 15.0757 16.5458 14.524 16.7979 13.9165C17.0499 13.3091 17.1797 12.6578 17.1797 12.0002C17.1797 11.3425 17.0499 10.6913 16.7979 10.0838C16.5458 9.47639 16.1764 8.92463 15.7107 8.46017L7.54075 0.290185C7.44751 0.196947 7.33682 0.122986 7.215 0.0725256C7.09318 0.0220653 6.96261 -0.00390625 6.83075 -0.00390625C6.69889 -0.00390625 6.56832 0.0220653 6.4465 0.0725256C6.32468 0.122986 6.21399 0.196947 6.12075 0.290185C6.02751 0.383423 5.95355 0.494114 5.90309 0.615935C5.85263 0.737757 5.82666 0.868325 5.82666 1.00018C5.82666 1.13204 5.85263 1.26261 5.90309 1.38443C5.95355 1.50625 6.02751 1.61694 6.12075 1.71018L14.2907 9.88017C14.8526 10.4427 15.1681 11.2052 15.1681 12.0002C15.1681 12.7952 14.8526 13.5577 14.2907 14.1202L6.12075 22.2902C6.02702 22.3831 5.95263 22.4937 5.90186 22.6156C5.85109 22.7374 5.82495 22.8681 5.82495 23.0002C5.82495 23.1322 5.85109 23.2629 5.90186 23.3847C5.95263 23.5066 6.02702 23.6172 6.12075 23.7102C6.21419 23.8028 6.325 23.8762 6.44684 23.9259C6.56868 23.9757 6.69914 24.0009 6.83075 24.0002Z" fill="white"/>
                        </svg>
                      </button>`,
        nextArrow: `<button class="slick-arrow slick-next" type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.83075 24.0002C6.96236 24.0009 7.09282 23.9757 7.21466 23.9259C7.33649 23.8762 7.44731 23.8028 7.54075 23.7102L15.7107 15.5402C16.1764 15.0757 16.5458 14.524 16.7979 13.9165C17.0499 13.3091 17.1797 12.6578 17.1797 12.0002C17.1797 11.3425 17.0499 10.6913 16.7979 10.0838C16.5458 9.47639 16.1764 8.92463 15.7107 8.46017L7.54075 0.290185C7.44751 0.196947 7.33682 0.122986 7.215 0.0725256C7.09318 0.0220653 6.96261 -0.00390625 6.83075 -0.00390625C6.69889 -0.00390625 6.56832 0.0220653 6.4465 0.0725256C6.32468 0.122986 6.21399 0.196947 6.12075 0.290185C6.02751 0.383423 5.95355 0.494114 5.90309 0.615935C5.85263 0.737757 5.82666 0.868325 5.82666 1.00018C5.82666 1.13204 5.85263 1.26261 5.90309 1.38443C5.95355 1.50625 6.02751 1.61694 6.12075 1.71018L14.2907 9.88017C14.8526 10.4427 15.1681 11.2052 15.1681 12.0002C15.1681 12.7952 14.8526 13.5577 14.2907 14.1202L6.12075 22.2902C6.02702 22.3831 5.95263 22.4937 5.90186 22.6156C5.85109 22.7374 5.82495 22.8681 5.82495 23.0002C5.82495 23.1322 5.85109 23.2629 5.90186 23.3847C5.95263 23.5066 6.02702 23.6172 6.12075 23.7102C6.21419 23.8028 6.325 23.8762 6.44684 23.9259C6.56868 23.9757 6.69914 24.0009 6.83075 24.0002Z" fill="white"/>
                        </svg>
                    </button>`,
        responsive: [
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '0',
              arrows: false,
            }
          },
        ]
      });
    },

    goTo: () => {

      $(document).on('click', '.js_go-btn', function(e){
        e.preventDefault();
        let anchor = $(document).find('.js_scroll-wrap');
        $('.js_scroll-wrap').animate({
          scrollTop: $(anchor).height()
        }, 500);
      });

      $(document).on('click', '.js_goTo-vertical', function(e){
        e.preventDefault();
        let anchor = $(document).find('.js_scroll-wrap');
        $('.js_scroll-wrap').animate({
          scrollLeft: $(anchor).width()
        }, 500);
      });
    }
  };

  $(document).ready(function(){
    theme.init();
  });

  $(window).on('load', function(){

  });

  $(window).on('resize', function(){

  });

})(jQuery);
