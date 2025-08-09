// Main
(function ($) {
  'use strict';
	
  window.$ = $;

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
      theme.initSmoothAnchors();
      theme.initFiles();
    },
    
    files: [],
    
    updateFiles: () => {
        const dt = new DataTransfer();
        const gallery = $('.contact-gallery');
        gallery.empty();
        theme.files.forEach(file => {
           const html = '<div class="contact-gallery-item"><img src="" /><button type="button"><img src="/wp-content/themes/junkraider/img/svg/close.svg"></button></div>';
           const item = $(html);
           item.children('img').attr('src', URL.createObjectURL(file));
           item.find('button').click(() => {
              const index = theme.files.indexOf(file);
              if(index !== -1) {
                  theme.files.splice(index, 1);
                  theme.updateFiles();
              }
           });
           gallery.append(item);
           dt.items.add(file);
        });
        $('[name="files[]"]').each((_, f) => f.files = dt.files);
        const addHtml = '<div class="contact-gallery-add contact-gallery-item"><img src="/wp-content/themes/junkraider/img/svg/fi-rr-plus.svg"></div>';
        const add = $(addHtml);
        add.click(e => $(e.target).closest('.form-container').find('.ff').click());
        gallery.append(add);
    },
    
    initFiles: () => {
        theme.files = [];
        $('.ff').change(e => {
            for(let i = 0; i < e.target.files.length; ++i) {
                const file = e.target.files[i];
                if(!theme.files.some(f => f.name === file.name && f.size === file.size)) {
                    theme.files.push(file);
                }
            }
            e.target.value = '';
            theme.updateFiles();
        });
        
        var form = $('.wpcf7');

        form.find('form').submit(() => {
            form.each((_, f) => $(f).closest('.form-container').find('.js_loader').addClass('active'));
        });
 
        form.on('wpcf7submit wpcf7invalid wpcf7spam wpcf7mailsent wpcf7mailfailed', function(event) {
            form.each((_, f) => $(f).closest('.form-container').find('.js_loader').removeClass('active'));
        });
        
        form.on('wpcf7mailsent', function(event) {
            theme.files = [];
            theme.updateFiles();
        });

        $('.wpcf7-multilinefile[name="files[]"]').remove();
        
        theme.updateFiles();
        
    },

    initSmoothAnchors: () => {
      const anchors = document.querySelectorAll('a[href*="#"]')

      for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()

          const blockID = anchor.getAttribute('href').substr(1)

          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        })
      }
    },

    modalFormScripts: () => {
      $("#datepicker").datepicker({
        minDate: 0,
        dateFormat: 'dd/mm/y',
        beforeShowDay: function(date) {
            var day = date.getDay();
            return [(day !== 0), ''];
        }
      });

      let dateVal = '';
      let timeVal = '';

      $(document).on('click', '.js_go-to-form', function (e) {
        e.preventDefault();

        dateVal = $("#datepicker").datepicker("getDate");
        timeVal = $('.js_timepicker').find('input:checked').val();


        if (!dateVal || !timeVal) {
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

        const form = $("#info-form");

        if (!form.valid()) {
          return;
        }


        let info = `
             ${form.find('input[name="firstName"]').val()} ${form.find('input[name="lastName"]').val()}<br>
               ${form.find('input[name="phone"]').val()}<br>
               ${form.find('input[name="email"]').val()}<br>
        `
        $('.js_client-info').empty().append(info);

        let date = $("#datepicker").datepicker("getDate")
        let details = `
                    ${$.datepicker.formatDate("mm/dd/yy", date)}<br>
                    ${$('.js_timepicker').find('input:checked').val()}
        `
        $('.js_details').empty().append(details);

        let address = `
                ${form.find('input[name="street"]').val()}<br>
                ${form.find('input[name="city"]').val()}, ${form.find('input[name="state"]').val()} ${form.find('input[name="zip"]').val()}<br>
                ${form.find('input[name="unit"]').val()}
        `
        $('.js_client-address').empty().append(address);

        $(this).closest('.modal-tab').removeClass('active').addClass('checked');
        theme.modalTabs(this);
      });

      console.log(dateVal, timeVal)

    },

    sendData: () => {
      $(document).on('click', '.js_send-data', function (e) {
        e.preventDefault();
        const loader = $(this).closest('.modal').find('.js_loader');
        loader.addClass('active');

        setTimeout(function () {
          $('#formModal').removeClass('active');
          loader.removeClass('active');
          $('#successModal').addClass('active');
        }, 1500)
      });

    },

    submitForm: () => {
      $(document).on('click', '.js_submit-form', function (e) {

        if ($(this).parents('.modal').length) {

          const form = $("#info-form");
          let date = $("#datepicker").datepicker("getDate");

          const value = {
            firstname: form.find('input[name="firstName"]').val(),
            lastname: form.find('input[name="lastName"]').val(),
            phone: form.find('input[name="phone"]').val(),
            email: form.find('input[name="email"]').val(),
            date: $.datepicker.formatDate("mm/dd/yy", date),
            time: $('.js_timepicker').find('input:checked').val(),
            street: form.find('input[name="street"]').val(),
            city: form.find('input[name="city"]').val(),
            state: form.find('input[name="state"]').val(),
            zip: form.find('input[name="zip"]').val(),
            unit: form.find('input[name="unit"]').val(),
            price: theme.price || '-',
            items: form.find('input[name="items"]').val(),
          };

          const wpcf = $(this).parents('.modal').find('.wpcf7-form');
          Object.keys(value).forEach(k => wpcf.find(`[name="${k}"]`).val(value[k]));
          wpcf.find('.wpcf7-submit').click();

          console.log(value);

        } else {

          const form = $(this).parents('form');

          if (!form.valid()) {
            return;
          }

          const value = {
            fullname: form.find('input[name="fullName"]').val(),
            phone: form.find('input[name="phone"]').val(),
            email: form.find('input[name="email"]').val(),
            city: form.find('input[name="city"]').val(),
            state: form.find('input[name="state"]').val(),
            zip: form.find('input[name="zip"]').val(),
            amount: $('#rangeValue').text(),
          };

          const wpcf = $(this).parents('.main-form').find('.wpcf7-form');
          Object.keys(value).forEach(k => wpcf.find(`[name="${k}"]`).val(value[k]));
          wpcf.find('.wpcf7-submit').click();

          console.log(value);

        }

        e.preventDefault();
        const loader = $(this).closest('.js_form').find('.js_loader');
        loader.addClass('active');

        setTimeout(function () {
          $('#formModal').removeClass('active');
          loader.removeClass('active');
          $('#successModal').addClass('active');
        }, 1500)
      });
    },

    order: [],
    price: '',

    openModal: () => {
      $(document).on('click', '.js_open-modal', function (e) {
        e.preventDefault();

        theme.order = [];

        if ($(this).closest('.calc-tab').is("#calc-pricing")) {

          if (!$('.js_result-items').find('li').length) {
            $('#zipInfoModal').addClass('active');
            return;
          }

          theme.price = $('.js_total').text();

          $('.js_order-total').text($('.js_total').text());
          $('.js_order-items').empty();

          $('.js_result-items').find('li').map(function () {
            let text = `<li>${$(this).find('.result-item-name').text()}</li>`;
            theme.order.push($(this).find('.result-item-name').text());
            $('.js_order-items').append(text);
          });
        } else {

          if (!$('.js_volume-inputs').find('input:checked').length) {
            $('#zipInfoModal').addClass('active');
            return;
          }

          let text = `<li>${$('.js_volume-inputs').find('input:checked').next('label').find('p span').text()}</li>`;
          theme.order.push($('.js_volume-inputs').find('input:checked').next('label').find('p span').text());
          theme.price = $('.js_volume-total').text();

          $('.js_order-items').append(text)
          $('.js_order-total').text($('.js_volume-total').text())
        }

        let modal = $(this).attr('href');
        $(modal).addClass('active');
        $('#formModal .order').hide();

		$('#formModal [name="items"]').val(theme.order.join(', ') || '-');
		$('#formModal [name="items"]').parent().css('display', theme.order.length ? 'none' : 'inherit');

      });

      $(document).on('click', '.js_close-modal', function (e) {
        e.preventDefault();
        $(this).closest('.modal').removeClass('active');
      });
    },

    modalTabs: (btn) => {

      let tab = $(btn).attr('href');

      if (!$(tab).length) return;

      $('.modal-tab').removeClass('active');
      $('.modal-tab').find('.modal-tab-inner').slideUp();

      $(tab).addClass('active');
      $(tab).find('.modal-tab-inner').slideDown();
    },

    initCalcTabs: () => {
      $('.calc-tab').hide();

      if (localStorage.getItem('addressInfo')) {
        $('#calc-chooser').show();
      } else {
        $('#calc-form').show();
      }

      $(document).on('click', '.js_go-to-tab', function (e) {
        e.preventDefault();

        let tab = $(this).attr('data-tab');

        if (!tab) return;

        $('.calc-tab').hide();

        $(tab).fadeIn(225);
      });

      $(document).on('click', '.js_go-to-tab-chooser', function (e) {
        e.preventDefault();

        let tab = $(this).closest('.calc-tab').find('input:checked').val();

        if (tab === '#calc-book') {
          $('#formModal').addClass('active');
          $('#formModal .order').hide();
        } else {
          if (!$(tab).length) return;
          $('.calc-tab').hide();
          $(tab).fadeIn(225);
        }
      });
    },

    initPricingTabs: () => {
      // Get Data

      let mainData = [];

      ((data) => {

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

        if (!linksWrap || !tabsWrap) return;

        itemsArrays.map((i, index) => {
          let link = `<li data-active="#${i.type}" class=${index ? "" : "active"}>${i.type}</li>`
          linksWrap.append(link);

          let items = '';

          i.items.map((item, indexItem) => {
            if (indexItem > 10) return;
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
      })(updatedPricing);

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

        if (id.length) {
          $(id).find('.plus').click();

          return;
        }

        const item = `<li class="result-item" data-id="${$(this).attr('data-id')}" data-add-price="${$(this).attr('data-add-price')}" data-base-price="${$(this).attr('data-base-price')}">
                        <a href="" class="result-item-remove">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1911_45276)"><path d="M15.9999 7.99982C15.8124 7.81235 15.5581 7.70703 15.2929 7.70703C15.0278 7.70703 14.7735 7.81235 14.5859 7.99982L11.9999 10.5858L9.41395 7.99982C9.22534 7.81766 8.97274 7.71687 8.71055 7.71914C8.44835 7.72142 8.19754 7.82659 8.01213 8.012C7.82672 8.19741 7.72155 8.44822 7.71928 8.71042C7.717 8.97261 7.81779 9.22522 7.99995 9.41382L10.5859 11.9998L7.99995 14.5858C7.81779 14.7744 7.717 15.027 7.71928 15.2892C7.72155 15.5514 7.82672 15.8022 8.01213 15.9876C8.19754 16.173 8.44835 16.2782 8.71055 16.2805C8.97274 16.2828 9.22534 16.182 9.41395 15.9998L11.9999 13.4138L14.5859 15.9998C14.7745 16.182 15.0271 16.2828 15.2893 16.2805C15.5515 16.2782 15.8023 16.173 15.9878 15.9876C16.1732 15.8022 16.2783 15.5514 16.2806 15.2892C16.2829 15.027 16.1821 14.7744 15.9999 14.5858L13.4139 11.9998L15.9999 9.41382C16.1874 9.22629 16.2927 8.97198 16.2927 8.70682C16.2927 8.44165 16.1874 8.18735 15.9999 7.99982Z" fill="#FF4040"/><path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0V0ZM12 22C10.0222 22 8.08879 21.4135 6.4443 20.3147C4.79981 19.2159 3.51809 17.6541 2.76121 15.8268C2.00433 13.9996 1.8063 11.9889 2.19215 10.0491C2.578 8.10929 3.53041 6.32746 4.92894 4.92893C6.32746 3.53041 8.10929 2.578 10.0491 2.19215C11.9889 1.8063 13.9996 2.00433 15.8268 2.7612C17.6541 3.51808 19.2159 4.79981 20.3147 6.4443C21.4135 8.08879 22 10.0222 22 12C21.9971 14.6513 20.9426 17.1931 19.0679 19.0679C17.1931 20.9426 14.6513 21.9971 12 22Z" fill="#FF4040"/></g><defs><clipPath id="clip0_1911_45276"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
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
        $('.js_calc-result').addClass('active')

        theme.countTotal();
      });

      $('.js_result-items').on('click', '.result-item-remove', function (e) {
        e.preventDefault();
        $(this).closest('.result-item').remove();

        $('.js_result-items').find('.result-item').length ? $('.js_calc-result').addClass('active') : $('.js_calc-result').removeClass('active');

        theme.countTotal();
      });

      $('.js_clear-all').on('click', function (e) {
        e.preventDefault();
        $('.js_result-items').find('.result-item').remove();

        $('.js_calc-result').removeClass('active');

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
      if (!searchOptions.length) return;

      searchOptions.html('');

      data.map(item => {
        searchOptions.append(`<li class="js_price-item" data-id="${item.id}" data-name="${item.name}" data-add-price="${item.addOnPrice}" data-base-price="${item.basePrice}">${item.name}</li>`)
      });
    },

    initSearchEvents: (data) => {
      $(document).on('keyup', '.js_search', function () {
        const val = ($(this).val()||'').toLowerCase();

        val ? $('.calc-search-options').show() : $('.calc-search-options').hide();

        const filteredData = data.filter(item => {
          return item.name.toLowerCase().includes(val);
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

      $('.js_result-items').find('.result-item').map(function () {
        let price = +$(this).attr('data-base-price');
        let addPrice = +$(this).attr('data-add-price');

        for (let j = 0; j < $(this).find('input').val(); j++) {
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

      if (!slider) return;

      const min = slider.min;
      const max = slider.max;
      const value = slider.value;
      const textWrap = $("#rangeValue");
      textWrap.text((+slider.value).toLocaleString());

      slider.style.background = `linear-gradient(to right, #72A53B 0%, #72A53B ${(value - min) / (max - min) * 100}%, white ${(value - min) / (max - min) * 100}%, white 100%)`

      slider.oninput = function () {
        textWrap.text((+this.value).toLocaleString());
        this.style.background = `linear-gradient(to right, #72A53B 0%, #72A53B ${(this.value - this.min) / (this.max - this.min) * 100}%, white ${(this.value - this.min) / (this.max - this.min) * 100}%, white 100%)`
      };
    },

    initAccordion: () => {
      $('.js_question').removeClass('active');
      $('.js_question').find('.question-inner').slideUp();

      $(document).on('click', '.js_question', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).find('.question-inner').slideToggle();
      });

      $(document).on('click', '.question-inner', function (e) {
        e.stopPropagation();
      });
    },

    findLocation: (value) => {

      $('.js_find-zip-btn').attr('disabled', false);

      (function (data) {
        if (data.find(i => i.zip === value || i.city === value)) {
          localStorage.setItem('addressInfo', JSON.stringify(data.find(i => i.zip === value || i.city === value)));
          $('.js_form-text').text(JSON.parse(localStorage.getItem('addressInfo')).city)
          $('#zipFoundModal').addClass('active');
          if ($('#calc-chooser').length) {
            $('.calc-tab').hide();
            $('#calc-chooser').show();
          }
        } else {
          $('#zipNotFoundModal').addClass('active');
        }
      })(filteredZip);
    },

    initZipCodeForm: () => {
      if (localStorage.getItem('addressInfo')) {
        $('.js_form-text').text(JSON.parse(localStorage.getItem('addressInfo')).city)
      }
      $(document).on('click', '.js_find-zip-btn', function (e) {
        e.preventDefault();
        $(this).attr('disabled', true);

        const input = $(this).closest('.js_find-zip-form').find('input');
        const value = input.val();

        if (value.length < 5) {
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

      $('.js_tabs-nav').on('click', 'li', function (e) {
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
      $(document).on('click', '.arrow-link', function (e) {
        // console.log(e.target)
        // e.preventDefault();
        const sub = $(this).find('.submenu-wrap');
        if (sub.hasClass('active')) {
          sub.slideUp();
          sub.removeClass('active');
        } else {
          sub.slideDown();
          sub.addClass('active');
        }
      });

      $(document).on('click', '.js_open-nav', function (e) {
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

      $(document).on('click', '.js_go-btn', function (e) {
        e.preventDefault();
        let anchor = $(document).find('.js_scroll-wrap');
        $('.js_scroll-wrap').animate({
          scrollTop: $(anchor).height()
        }, 500);
      });

      $(document).on('click', '.js_goTo-vertical', function (e) {
        e.preventDefault();
        let anchor = $(document).find('.js_scroll-wrap');
        $('.js_scroll-wrap').animate({
          scrollLeft: $(anchor).width()
        }, 500);
      });
    }
  };

  $(document).ready(function () {
    theme.init();
  });

  $(window).on('load', function () {

  });

  $(window).on('resize', function () {

  });

  const updatedPricing = [
    {
      "id": 1,
      "name": "Couch (3-seater)",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 2,
      "name": "Coffee Table",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Furniture"
    },
    {
      "id": 3,
      "name": "Dining Table",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 4,
      "name": "Patio Table",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 5,
      "name": "Patio Chair",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 6,
      "name": "Mattress",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Furniture"
    },
    {
      "id": 7,
      "name": "Boxspring",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Furniture"
    },
    {
      "id": 8,
      "name": "Dresser",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Furniture"
    },
    {
      "id": 9,
      "name": "Recliner",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 10,
      "name": "Side Table",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 11,
      "name": "Dining Room Chair",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 12,
      "name": "Oversized Chair",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 13,
      "name": "Small Sectional (4 seater)",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 14,
      "name": "Standard Sectional (5 seater)",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Furniture"
    },
    {
      "id": 15,
      "name": "Large Sectional (6 seater)",
      "basePrice": 250,
      "addOnPrice": 90,
      "type": "Furniture"
    },
    {
      "id": 16,
      "name": "XL Sectional (7+ seater)",
      "basePrice": 300,
      "addOnPrice": 115,
      "type": "Furniture"
    },
    {
      "id": 17,
      "name": "Coffee Table",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 18,
      "name": "End Table",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 19,
      "name": "Rocking Chair",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 20,
      "name": "Small Armoire",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 21,
      "name": "Standard Armoire",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Furniture"
    },
    {
      "id": 22,
      "name": "Large Armoire",
      "basePrice": 250,
      "addOnPrice": 90,
      "type": "Furniture"
    },
    {
      "id": 23,
      "name": "XL Armoire",
      "basePrice": 300,
      "addOnPrice": 115,
      "type": "Furniture"
    },
    {
      "id": 24,
      "name": "Small Entertainment Center",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 25,
      "name": "Standard Entertainment Center",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Furniture"
    },
    {
      "id": 26,
      "name": "Large Entertainment Center",
      "basePrice": 250,
      "addOnPrice": 90,
      "type": "Furniture"
    },
    {
      "id": 27,
      "name": "XL Entertainment Center",
      "basePrice": 300,
      "addOnPrice": 115,
      "type": "Furniture"
    },
    {
      "id": 28,
      "name": "Adjustable Bed Base",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 29,
      "name": "Small Aquarium",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 30,
      "name": "Medium Aquarium",
      "basePrice": 185,
      "addOnPrice": 30,
      "type": "Furniture"
    },
    {
      "id": 31,
      "name": "Large Aquarium",
      "basePrice": 225,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 32,
      "name": "XL Aquarium",
      "basePrice": 250,
      "addOnPrice": 75,
      "type": "Furniture"
    },
    {
      "id": 33,
      "name": "Small Area Rug (Up to 6x9)",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 34,
      "name": "Medium Area Rug (Up to 12x14)",
      "basePrice": 185,
      "addOnPrice": 25,
      "type": "Furniture"
    },
    {
      "id": 35,
      "name": "Large Area Rug (Over 12x14)",
      "basePrice": 225,
      "addOnPrice": 40,
      "type": "Furniture"
    },
    {
      "id": 36,
      "name": "Loveseat",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 37,
      "name": "Bathtub (Cast Iron) ",
      "basePrice": 299,
      "addOnPrice": 200,
      "type": "Furniture"
    },
    {
      "id": 38,
      "name": "Bathtub (Porcelain)",
      "basePrice": 225,
      "addOnPrice": 150,
      "type": "Furniture"
    },
    {
      "id": 39,
      "name": "Bathtub (Fiberglass) ",
      "basePrice": 185,
      "addOnPrice": 125,
      "type": "Furniture"
    },
    {
      "id": 40,
      "name": "Bed Frame",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 41,
      "name": "Small Bookshelf",
      "basePrice": 150,
      "addOnPrice": 20,
      "type": "Furniture"
    },
    {
      "id": 42,
      "name": "Standard Bookshelf",
      "basePrice": 185,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 43,
      "name": "Large Bookshelf",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Furniture"
    },
    {
      "id": 44,
      "name": "XL Bookshelf",
      "basePrice": 225,
      "addOnPrice": 90,
      "type": "Furniture"
    },
    {
      "id": 45,
      "name": "Bike",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 46,
      "name": "Bench",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Furniture"
    },
    {
      "id": 47,
      "name": "Small Cabinet",
      "basePrice": 150,
      "addOnPrice": 20,
      "type": "Furniture"
    },
    {
      "id": 48,
      "name": "Standard Cabinet",
      "basePrice": 199,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 49,
      "name": "Large Cabinet",
      "basePrice": 255,
      "addOnPrice": 75,
      "type": "Furniture"
    },
    {
      "id": 50,
      "name": "XL Cabinet",
      "basePrice": 250,
      "addOnPrice": 90,
      "type": "Furniture"
    },
    {
      "id": 51,
      "name": "Chaise Lounge",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 52,
      "name": "Chest",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 53,
      "name": "Small China Cabinet",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 54,
      "name": "Standard China Cabinet",
      "basePrice": 199,
      "addOnPrice": 60,
      "type": "Furniture"
    },
    {
      "id": 55,
      "name": "Large China Cabinet",
      "basePrice": 225,
      "addOnPrice": 70,
      "type": "Furniture"
    },
    {
      "id": 56,
      "name": "Daybed",
      "basePrice": 150,
      "addOnPrice": 60,
      "type": "Furniture"
    },
    {
      "id": 57,
      "name": "Grandfather Clock",
      "basePrice": 199,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 58,
      "name": "Small Desk",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Furniture"
    },
    {
      "id": 59,
      "name": "Standard Desk (L Shaped)",
      "basePrice": 199,
      "addOnPrice": 60,
      "type": "Furniture"
    },
    {
      "id": 60,
      "name": "Large Desk ",
      "basePrice": 250,
      "addOnPrice": 70,
      "type": "Furniture"
    },
    {
      "id": 61,
      "name": "Small File Cabinet",
      "basePrice": 150,
      "addOnPrice": 20,
      "type": "Furniture"
    },
    {
      "id": 62,
      "name": "Large File Cabinet",
      "basePrice": 125,
      "addOnPrice": 60,
      "type": "Furniture"
    },
    {
      "id": 63,
      "name": "XL Large File Cabinet",
      "basePrice": 250,
      "addOnPrice": 70,
      "type": "Furniture"
    },
    {
      "id": 64,
      "name": "Standard Upright Piano",
      "basePrice": 249,
      "addOnPrice": 249,
      "type": "Furniture"
    },
    {
      "id": 65,
      "name": "Large Upright Piano",
      "basePrice": 349,
      "addOnPrice": 299,
      "type": "Furniture"
    },
    {
      "id": 66,
      "name": "Baby Grand Piano ",
      "basePrice": 399,
      "addOnPrice": 349,
      "type": "Furniture"
    },
    {
      "id": 67,
      "name": "Grand Piano",
      "basePrice": 499,
      "addOnPrice": 399,
      "type": "Furniture"
    },
    {
      "id": 68,
      "name": "TV",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Electronics"
    },
    {
      "id": 69,
      "name": "Large TV",
      "basePrice": 199,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 70,
      "name": "XL TV",
      "basePrice": 225,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 71,
      "name": "Washing Machine",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 72,
      "name": "Dryer",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 73,
      "name": "Refrigerator",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 74,
      "name": "Small Treadmill",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 75,
      "name": "Standard Treadmill",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Electronics"
    },
    {
      "id": 76,
      "name": "Large Treadmill",
      "basePrice": 250,
      "addOnPrice": 90,
      "type": "Electronics"
    },
    {
      "id": 77,
      "name": "Small AC Unit",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 78,
      "name": "Large AC Unit",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Electronics"
    },
    {
      "id": 79,
      "name": "Standard Freezer",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 80,
      "name": "Large Freezer",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Electronics"
    },
    {
      "id": 81,
      "name": "Commercial Freezer",
      "basePrice": 299,
      "addOnPrice": 200,
      "type": "Electronics"
    },
    {
      "id": 82,
      "name": "Standard Refrigerator",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 83,
      "name": "Large Refrigerator",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Electronics"
    },
    {
      "id": 84,
      "name": "Commercial Refrigerator",
      "basePrice": 299,
      "addOnPrice": 200,
      "type": "Electronics"
    },
    {
      "id": 85,
      "name": "Microwave",
      "basePrice": 150,
      "addOnPrice": 20,
      "type": "Electronics"
    },
    {
      "id": 86,
      "name": "Dishwasher",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 87,
      "name": "Small Ice Maker",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 88,
      "name": "Commercial Ice Maker",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Electronics"
    },
    {
      "id": 89,
      "name": "Small Vending Machine",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 90,
      "name": "Large Vendine Machine",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Electronics"
    },
    {
      "id": 91,
      "name": "XL Vendine Machine",
      "basePrice": 250,
      "addOnPrice": 110,
      "type": "Electronics"
    },
    {
      "id": 92,
      "name": "Standard Elliptical ",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Electronics"
    },
    {
      "id": 93,
      "name": "Commercial Elliptical",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Electronics"
    },
    {
      "id": 94,
      "name": "Exercise Bike ",
      "basePrice": 150,
      "addOnPrice": 20,
      "type": "Electronics"
    },
    {
      "id": 95,
      "name": "Small Home Gym",
      "basePrice": 150,
      "addOnPrice": 40,
      "type": "Electronics"
    },
    {
      "id": 96,
      "name": "Medium Home Gym",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Electronics"
    },
    {
      "id": 97,
      "name": "Large Home Gym",
      "basePrice": 299,
      "addOnPrice": 139,
      "type": "Electronics"
    },
    {
      "id": 98,
      "name": "Basketball Goal",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Outdoor"
    },
    {
      "id": 99,
      "name": "Small Hot Tub",
      "basePrice": 299,
      "addOnPrice": 200,
      "type": "Outdoor"
    },
    {
      "id": 100,
      "name": "Standard Hot Tub",
      "basePrice": 399,
      "addOnPrice": 299,
      "type": "Outdoor"
    },
    {
      "id": 101,
      "name": "Large Hot Tub",
      "basePrice": 499,
      "addOnPrice": 399,
      "type": "Outdoor"
    },
    {
      "id": 102,
      "name": "Small Above Ground Pool (Disassembled)",
      "basePrice": 150,
      "addOnPrice": 45,
      "type": "Outdoor"
    },
    {
      "id": 103,
      "name": "Large Above Ground Pool (Disassembled)",
      "basePrice": 250,
      "addOnPrice": 150,
      "type": "Outdoor"
    },
    {
      "id": 104,
      "name": "XL Above Ground Ppol (Disassembled)",
      "basePrice": 350,
      "addOnPrice": 200,
      "type": "Outdoor"
    },
    {
      "id": 105,
      "name": "Push Lawnmower",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Outdoor"
    },
    {
      "id": 106,
      "name": "Riding Lawnmower",
      "basePrice": 199,
      "addOnPrice": 75,
      "type": "Outdoor"
    },
    {
      "id": 107,
      "name": "Small Grill",
      "basePrice": 150,
      "addOnPrice": 45,
      "type": "Outdoor"
    },
    {
      "id": 108,
      "name": "Small Shed (Disassembled)",
      "basePrice": 250,
      "addOnPrice": 149,
      "type": "Outdoor"
    },
    {
      "id": 109,
      "name": "Medium Shed (Disassembled",
      "basePrice": 350,
      "addOnPrice": 399,
      "type": "Outdoor"
    },
    {
      "id": 110,
      "name": "Large Shed (Disassembled)",
      "basePrice": 450,
      "addOnPrice": 699,
      "type": "Outdoor"
    },
    {
      "id": 111,
      "name": "Trampoline (Disassembled)",
      "basePrice": 185,
      "addOnPrice": 95,
      "type": "Outdoor"
    },
    {
      "id": 112,
      "name": "Deck Box",
      "basePrice": 150,
      "addOnPrice": 20,
      "type": "Outdoor"
    },
    {
      "id": 113,
      "name": "Small Fountain",
      "basePrice": 150,
      "addOnPrice": 50,
      "type": "Outdoor"
    },
    {
      "id": 114,
      "name": "Medium Fountain",
      "basePrice": 199,
      "addOnPrice": 70,
      "type": "Outdoor"
    },
    {
      "id": 115,
      "name": "Large Fountain",
      "basePrice": 250,
      "addOnPrice": 110,
      "type": "Outdoor"
    },
    {
      "id": 116,
      "name": "Small Planter Box/Pot",
      "basePrice": 150,
      "addOnPrice": 10,
      "type": "Outdoor"
    },
    {
      "id": 117,
      "name": "Medium Planter Box/Pot",
      "basePrice": 185,
      "addOnPrice": 30,
      "type": "Outdoor"
    },
    {
      "id": 118,
      "name": "Large Planter Box/Pot",
      "basePrice": 225,
      "addOnPrice": 70,
      "type": "Outdoor"
    },
    {
      "id": 119,
      "name": "Misc Item",
      "basePrice": "Base Price",
      "addOnPrice": "Notes",
      "type": "Miscellaneous"
    },
    {
      "id": 120,
      "name": "Cardboard Boxes",
      "basePrice": 150,
      "addOnPrice": 7,
      "type": "Miscellaneous"
    },
    {
      "id": 121,
      "name": "Books, DVD's, CD's",
      "basePrice": 150,
      "addOnPrice": 7,
      "type": "Miscellaneous"
    },
    {
      "id": 122,
      "name": "Trash Bag (Standard or Contractor)",
      "basePrice": 150,
      "addOnPrice": 7,
      "type": "Miscellaneous"
    },
    {
      "id": 123,
      "name": "Small Unlisted Item",
      "basePrice": 150,
      "addOnPrice": 30,
      "type": "Miscellaneous"
    },
    {
      "id": 124,
      "name": "Medium Unlisted Item",
      "basePrice": 185,
      "addOnPrice": 70,
      "type": "Miscellaneous"
    },
    {
      "id": 125,
      "name": "Large Unlisted Item",
      "basePrice": 250,
      "addOnPrice": 140,
      "type": "Miscellaneous"
    }
  ];

  const filteredZip = [
    {
      "zip": "27006",
      "city": "Advance"
    },
    {
      "zip": "27007",
      "city": "Ararat"
    },
    {
      "zip": "27009",
      "city": "Belews Creek"
    },
    {
      "zip": "27011",
      "city": "Boonville"
    },
    {
      "zip": "27012",
      "city": "Clemmons"
    },
    {
      "zip": "27013",
      "city": "Cleveland"
    },
    {
      "zip": "27014",
      "city": "Cooleemee"
    },
    {
      "zip": "27016",
      "city": "Danbury"
    },
    {
      "zip": "27017",
      "city": "Dobson"
    },
    {
      "zip": "27018",
      "city": "East Bend"
    },
    {
      "zip": "27019",
      "city": "Germanton"
    },
    {
      "zip": "27020",
      "city": "Hamptonville"
    },
    {
      "zip": "27021",
      "city": "King"
    },
    {
      "zip": "27022",
      "city": "Lawsonville"
    },
    {
      "zip": "27023",
      "city": "Lewisville"
    },
    {
      "zip": "27024",
      "city": "Lowgap"
    },
    {
      "zip": "27025",
      "city": "Madison"
    },
    {
      "zip": "27027",
      "city": "Mayodan"
    },
    {
      "zip": "27028",
      "city": "Mocksville"
    },
    {
      "zip": "27030",
      "city": "Mount Airy"
    },
    {
      "zip": "27040",
      "city": "Pfafftown"
    },
    {
      "zip": "27041",
      "city": "Pilot Mountain"
    },
    {
      "zip": "27042",
      "city": "Pine Hall"
    },
    {
      "zip": "27043",
      "city": "Pinnacle"
    },
    {
      "zip": "27045",
      "city": "Rural Hall"
    },
    {
      "zip": "27046",
      "city": "Sandy Ridge"
    },
    {
      "zip": "27047",
      "city": "Siloam"
    },
    {
      "zip": "27048",
      "city": "Stoneville"
    },
    {
      "zip": "27050",
      "city": "Tobaccoville"
    },
    {
      "zip": "27051",
      "city": "Walkertown"
    },
    {
      "zip": "27052",
      "city": "Walnut Cove"
    },
    {
      "zip": "27053",
      "city": "Westfield"
    },
    {
      "zip": "27054",
      "city": "Woodleaf"
    },
    {
      "zip": "27055",
      "city": "Yadkinville"
    },
    {
      "zip": "27101",
      "city": "Winston Salem"
    },
    {
      "zip": "27103",
      "city": "Winston Salem"
    },
    {
      "zip": "27104",
      "city": "Winston Salem"
    },
    {
      "zip": "27105",
      "city": "Winston Salem"
    },
    {
      "zip": "27106",
      "city": "Winston Salem"
    },
    {
      "zip": "27107",
      "city": "Winston Salem"
    },
    {
      "zip": "27109",
      "city": "Winston Salem"
    },
    {
      "zip": "27110",
      "city": "Winston Salem"
    },
    {
      "zip": "27127",
      "city": "Winston Salem"
    },
    {
      "zip": "27201",
      "city": "Alamance"
    },
    {
      "zip": "27202",
      "city": "Altamahaw"
    },
    {
      "zip": "27203",
      "city": "Asheboro"
    },
    {
      "zip": "27205",
      "city": "Asheboro"
    },
    {
      "zip": "27207",
      "city": "Bear Creek"
    },
    {
      "zip": "27208",
      "city": "Bennett"
    },
    {
      "zip": "27209",
      "city": "Biscoe"
    },
    {
      "zip": "27212",
      "city": "Blanch"
    },
    {
      "zip": "27213",
      "city": "Bonlee"
    },
    {
      "zip": "27214",
      "city": "Browns Summit"
    },
    {
      "zip": "27215",
      "city": "Burlington"
    },
    {
      "zip": "27217",
      "city": "Burlington"
    },
    {
      "zip": "27229",
      "city": "Candor"
    },
    {
      "zip": "27231",
      "city": "Cedar Grove"
    },
    {
      "zip": "27233",
      "city": "Climax"
    },
    {
      "zip": "27235",
      "city": "Colfax"
    },
    {
      "zip": "27239",
      "city": "Denton"
    },
    {
      "zip": "27242",
      "city": "Eagle Springs"
    },
    {
      "zip": "27243",
      "city": "Efland"
    },
    {
      "zip": "27244",
      "city": "Elon"
    },
    {
      "zip": "27247",
      "city": "Ether"
    },
    {
      "zip": "27248",
      "city": "Franklinville"
    },
    {
      "zip": "27249",
      "city": "Gibsonville"
    },
    {
      "zip": "27252",
      "city": "Goldston"
    },
    {
      "zip": "27253",
      "city": "Graham"
    },
    {
      "zip": "27256",
      "city": "Gulf"
    },
    {
      "zip": "27258",
      "city": "Haw River"
    },
    {
      "zip": "27259",
      "city": "Highfalls"
    },
    {
      "zip": "27260",
      "city": "High Point"
    },
    {
      "zip": "27262",
      "city": "High Point"
    },
    {
      "zip": "27263",
      "city": "High Point"
    },
    {
      "zip": "27265",
      "city": "High Point"
    },
    {
      "zip": "27268",
      "city": "High Point"
    },
    {
      "zip": "27278",
      "city": "Hillsborough"
    },
    {
      "zip": "27281",
      "city": "Jackson Springs"
    },
    {
      "zip": "27282",
      "city": "Jamestown"
    },
    {
      "zip": "27283",
      "city": "Julian"
    },
    {
      "zip": "27284",
      "city": "Kernersville"
    },
    {
      "zip": "27288",
      "city": "Eden"
    },
    {
      "zip": "27291",
      "city": "Leasburg"
    },
    {
      "zip": "27292",
      "city": "Lexington"
    },
    {
      "zip": "27295",
      "city": "Lexington"
    },
    {
      "zip": "27298",
      "city": "Liberty"
    },
    {
      "zip": "27299",
      "city": "Linwood"
    },
    {
      "zip": "27301",
      "city": "McLeansville"
    },
    {
      "zip": "27302",
      "city": "Mebane"
    },
    {
      "zip": "27305",
      "city": "Milton"
    },
    {
      "zip": "27306",
      "city": "Mount Gilead"
    },
    {
      "zip": "27310",
      "city": "Oak Ridge"
    },
    {
      "zip": "27311",
      "city": "Pelham"
    },
    {
      "zip": "27312",
      "city": "Pittsboro"
    },
    {
      "zip": "27313",
      "city": "Pleasant Garden"
    },
    {
      "zip": "27314",
      "city": "Prospect Hill"
    },
    {
      "zip": "27315",
      "city": "Providence"
    },
    {
      "zip": "27316",
      "city": "Ramseur"
    },
    {
      "zip": "27317",
      "city": "Randleman"
    },
    {
      "zip": "27320",
      "city": "Reidsville"
    },
    {
      "zip": "27325",
      "city": "Robbins"
    },
    {
      "zip": "27326",
      "city": "Ruffin"
    },
    {
      "zip": "27330",
      "city": "Sanford"
    },
    {
      "zip": "27332",
      "city": "Sanford"
    },
    {
      "zip": "27340",
      "city": "Saxapahaw"
    },
    {
      "zip": "27341",
      "city": "Seagrove"
    },
    {
      "zip": "27342",
      "city": "Sedalia"
    },
    {
      "zip": "27343",
      "city": "Semora"
    },
    {
      "zip": "27344",
      "city": "Siler City"
    },
    {
      "zip": "27349",
      "city": "Snow Camp"
    },
    {
      "zip": "27350",
      "city": "Sophia"
    },
    {
      "zip": "27351",
      "city": "Southmont"
    },
    {
      "zip": "27355",
      "city": "Staley"
    },
    {
      "zip": "27356",
      "city": "Star"
    },
    {
      "zip": "27357",
      "city": "Stokesdale"
    },
    {
      "zip": "27358",
      "city": "Summerfield"
    },
    {
      "zip": "27360",
      "city": "Thomasville"
    },
    {
      "zip": "27370",
      "city": "Trinity"
    },
    {
      "zip": "27371",
      "city": "Troy"
    },
    {
      "zip": "27374",
      "city": "Welcome"
    },
    {
      "zip": "27376",
      "city": "West End"
    },
    {
      "zip": "27377",
      "city": "Whitsett"
    },
    {
      "zip": "27379",
      "city": "Yanceyville"
    },
    {
      "zip": "27401",
      "city": "Greensboro"
    },
    {
      "zip": "27403",
      "city": "Greensboro"
    },
    {
      "zip": "27405",
      "city": "Greensboro"
    },
    {
      "zip": "27406",
      "city": "Greensboro"
    },
    {
      "zip": "27407",
      "city": "Greensboro"
    },
    {
      "zip": "27408",
      "city": "Greensboro"
    },
    {
      "zip": "27409",
      "city": "Greensboro"
    },
    {
      "zip": "27410",
      "city": "Greensboro"
    },
    {
      "zip": "27411",
      "city": "Greensboro"
    },
    {
      "zip": "27412",
      "city": "Greensboro"
    },
    {
      "zip": "27455",
      "city": "Greensboro"
    },
    {
      "zip": "27501",
      "city": "Angier"
    },
    {
      "zip": "27502",
      "city": "Apex"
    },
    {
      "zip": "27503",
      "city": "Bahama"
    },
    {
      "zip": "27504",
      "city": "Benson"
    },
    {
      "zip": "27505",
      "city": "Broadway"
    },
    {
      "zip": "27506",
      "city": "Buies Creek"
    },
    {
      "zip": "27507",
      "city": "Bullock"
    },
    {
      "zip": "27508",
      "city": "Bunn"
    },
    {
      "zip": "27509",
      "city": "Butner"
    },
    {
      "zip": "27510",
      "city": "Carrboro"
    },
    {
      "zip": "27511",
      "city": "Cary"
    },
    {
      "zip": "27513",
      "city": "Cary"
    },
    {
      "zip": "27514",
      "city": "Chapel Hill"
    },
    {
      "zip": "27516",
      "city": "Chapel Hill"
    },
    {
      "zip": "27517",
      "city": "Chapel Hill"
    },
    {
      "zip": "27518",
      "city": "Cary"
    },
    {
      "zip": "27519",
      "city": "Cary"
    },
    {
      "zip": "27520",
      "city": "Clayton"
    },
    {
      "zip": "27521",
      "city": "Coats"
    },
    {
      "zip": "27522",
      "city": "Creedmoor"
    },
    {
      "zip": "27523",
      "city": "Apex"
    },
    {
      "zip": "27524",
      "city": "Four Oaks"
    },
    {
      "zip": "27525",
      "city": "Franklinton"
    },
    {
      "zip": "27526",
      "city": "Fuquay Varina"
    },
    {
      "zip": "27527",
      "city": "Clayton"
    },
    {
      "zip": "27529",
      "city": "Garner"
    },
    {
      "zip": "27530",
      "city": "Goldsboro"
    },
    {
      "zip": "27531",
      "city": "Goldsboro"
    },
    {
      "zip": "27533",
      "city": "Goldsboro"
    },
    {
      "zip": "27534",
      "city": "Goldsboro"
    },
    {
      "zip": "27536",
      "city": "Henderson"
    },
    {
      "zip": "27537",
      "city": "Henderson"
    },
    {
      "zip": "27539",
      "city": "Apex"
    },
    {
      "zip": "27540",
      "city": "Holly Springs"
    },
    {
      "zip": "27541",
      "city": "Hurdle Mills"
    },
    {
      "zip": "27542",
      "city": "Kenly"
    },
    {
      "zip": "27544",
      "city": "Kittrell"
    },
    {
      "zip": "27545",
      "city": "Knightdale"
    },
    {
      "zip": "27546",
      "city": "Lillington"
    },
    {
      "zip": "27549",
      "city": "Louisburg"
    },
    {
      "zip": "27551",
      "city": "Macon"
    },
    {
      "zip": "27553",
      "city": "Manson"
    },
    {
      "zip": "27555",
      "city": "Micro"
    },
    {
      "zip": "27556",
      "city": "Middleburg"
    },
    {
      "zip": "27557",
      "city": "Middlesex"
    },
    {
      "zip": "27559",
      "city": "Moncure"
    },
    {
      "zip": "27560",
      "city": "Morrisville"
    },
    {
      "zip": "27562",
      "city": "New Hill"
    },
    {
      "zip": "27563",
      "city": "Norlina"
    },
    {
      "zip": "27565",
      "city": "Oxford"
    },
    {
      "zip": "27568",
      "city": "Pine Level"
    },
    {
      "zip": "27569",
      "city": "Princeton"
    },
    {
      "zip": "27570",
      "city": "Ridgeway"
    },
    {
      "zip": "27571",
      "city": "Rolesville"
    },
    {
      "zip": "27572",
      "city": "Rougemont"
    },
    {
      "zip": "27573",
      "city": "Roxboro"
    },
    {
      "zip": "27574",
      "city": "Roxboro"
    },
    {
      "zip": "27576",
      "city": "Selma"
    },
    {
      "zip": "27577",
      "city": "Smithfield"
    },
    {
      "zip": "27581",
      "city": "Stem"
    },
    {
      "zip": "27582",
      "city": "Stovall"
    },
    {
      "zip": "27583",
      "city": "Timberlake"
    },
    {
      "zip": "27584",
      "city": "Townsville"
    },
    {
      "zip": "27587",
      "city": "Wake Forest"
    },
    {
      "zip": "27589",
      "city": "Warrenton"
    },
    {
      "zip": "27591",
      "city": "Wendell"
    },
    {
      "zip": "27592",
      "city": "Willow Spring"
    },
    {
      "zip": "27593",
      "city": "Wilsons Mills"
    },
    {
      "zip": "27594",
      "city": "Wise"
    },
    {
      "zip": "27596",
      "city": "Youngsville"
    },
    {
      "zip": "27597",
      "city": "Zebulon"
    },
    {
      "zip": "27599",
      "city": "Chapel Hill"
    },
    {
      "zip": "27601",
      "city": "Raleigh"
    },
    {
      "zip": "27603",
      "city": "Raleigh"
    },
    {
      "zip": "27604",
      "city": "Raleigh"
    },
    {
      "zip": "27605",
      "city": "Raleigh"
    },
    {
      "zip": "27606",
      "city": "Raleigh"
    },
    {
      "zip": "27607",
      "city": "Raleigh"
    },
    {
      "zip": "27608",
      "city": "Raleigh"
    },
    {
      "zip": "27609",
      "city": "Raleigh"
    },
    {
      "zip": "27610",
      "city": "Raleigh"
    },
    {
      "zip": "27612",
      "city": "Raleigh"
    },
    {
      "zip": "27613",
      "city": "Raleigh"
    },
    {
      "zip": "27614",
      "city": "Raleigh"
    },
    {
      "zip": "27615",
      "city": "Raleigh"
    },
    {
      "zip": "27616",
      "city": "Raleigh"
    },
    {
      "zip": "27617",
      "city": "Raleigh"
    },
    {
      "zip": "27695",
      "city": "Raleigh"
    },
    {
      "zip": "27697",
      "city": "Raleigh"
    },
    {
      "zip": "27701",
      "city": "Durham"
    },
    {
      "zip": "27703",
      "city": "Durham"
    },
    {
      "zip": "27704",
      "city": "Durham"
    },
    {
      "zip": "27705",
      "city": "Durham"
    },
    {
      "zip": "27707",
      "city": "Durham"
    },
    {
      "zip": "27708",
      "city": "Durham"
    },
    {
      "zip": "27709",
      "city": "Durham"
    },
    {
      "zip": "27712",
      "city": "Durham"
    },
    {
      "zip": "27713",
      "city": "Durham"
    },
    {
      "zip": "27801",
      "city": "Rocky Mount"
    },
    {
      "zip": "27803",
      "city": "Rocky Mount"
    },
    {
      "zip": "27804",
      "city": "Rocky Mount"
    },
    {
      "zip": "27805",
      "city": "Aulander"
    },
    {
      "zip": "27806",
      "city": "Aurora"
    },
    {
      "zip": "27807",
      "city": "Bailey"
    },
    {
      "zip": "27808",
      "city": "Bath"
    },
    {
      "zip": "27809",
      "city": "Battleboro"
    },
    {
      "zip": "27810",
      "city": "Belhaven"
    },
    {
      "zip": "27812",
      "city": "Bethel"
    },
    {
      "zip": "27813",
      "city": "Black Creek"
    },
    {
      "zip": "27814",
      "city": "Blounts Creek"
    },
    {
      "zip": "27815",
      "city": "Rocky Mount"
    },
    {
      "zip": "27816",
      "city": "Castalia"
    },
    {
      "zip": "27817",
      "city": "Chocowinity"
    },
    {
      "zip": "27818",
      "city": "Como"
    },
    {
      "zip": "27819",
      "city": "Conetoe"
    },
    {
      "zip": "27820",
      "city": "Conway"
    },
    {
      "zip": "27821",
      "city": "Edward"
    },
    {
      "zip": "27822",
      "city": "Elm City"
    },
    {
      "zip": "27823",
      "city": "Enfield"
    },
    {
      "zip": "27824",
      "city": "Engelhard"
    },
    {
      "zip": "27825",
      "city": "Everetts"
    },
    {
      "zip": "27826",
      "city": "Fairfield"
    },
    {
      "zip": "27827",
      "city": "Falkland"
    },
    {
      "zip": "27828",
      "city": "Farmville"
    },
    {
      "zip": "27829",
      "city": "Fountain"
    },
    {
      "zip": "27830",
      "city": "Fremont"
    },
    {
      "zip": "27831",
      "city": "Garysburg"
    },
    {
      "zip": "27832",
      "city": "Gaston"
    },
    {
      "zip": "27834",
      "city": "Greenville"
    },
    {
      "zip": "27837",
      "city": "Grimesland"
    },
    {
      "zip": "27839",
      "city": "Halifax"
    },
    {
      "zip": "27840",
      "city": "Hamilton"
    },
    {
      "zip": "27841",
      "city": "Hassell"
    },
    {
      "zip": "27842",
      "city": "Henrico"
    },
    {
      "zip": "27843",
      "city": "Hobgood"
    },
    {
      "zip": "27844",
      "city": "Hollister"
    },
    {
      "zip": "27845",
      "city": "Jackson"
    },
    {
      "zip": "27846",
      "city": "Jamesville"
    },
    {
      "zip": "27847",
      "city": "Kelford"
    },
    {
      "zip": "27849",
      "city": "Lewiston Woodville"
    },
    {
      "zip": "27850",
      "city": "Littleton"
    },
    {
      "zip": "27851",
      "city": "Lucama"
    },
    {
      "zip": "27852",
      "city": "Macclesfield"
    },
    {
      "zip": "27853",
      "city": "Margarettsville"
    },
    {
      "zip": "27855",
      "city": "Murfreesboro"
    },
    {
      "zip": "27856",
      "city": "Nashville"
    },
    {
      "zip": "27857",
      "city": "Oak City"
    },
    {
      "zip": "27858",
      "city": "Greenville"
    },
    {
      "zip": "27860",
      "city": "Pantego"
    },
    {
      "zip": "27861",
      "city": "Parmele"
    },
    {
      "zip": "27862",
      "city": "Pendleton"
    },
    {
      "zip": "27863",
      "city": "Pikeville"
    },
    {
      "zip": "27864",
      "city": "Pinetops"
    },
    {
      "zip": "27865",
      "city": "Pinetown"
    },
    {
      "zip": "27866",
      "city": "Pleasant Hill"
    },
    {
      "zip": "27869",
      "city": "Rich Square"
    },
    {
      "zip": "27870",
      "city": "Roanoke Rapids"
    },
    {
      "zip": "27871",
      "city": "Robersonville"
    },
    {
      "zip": "27872",
      "city": "Roxobel"
    },
    {
      "zip": "27873",
      "city": "Saratoga"
    },
    {
      "zip": "27874",
      "city": "Scotland Neck"
    },
    {
      "zip": "27875",
      "city": "Scranton"
    },
    {
      "zip": "27876",
      "city": "Seaboard"
    },
    {
      "zip": "27877",
      "city": "Severn"
    },
    {
      "zip": "27878",
      "city": "Sharpsburg"
    },
    {
      "zip": "27879",
      "city": "Simpson"
    },
    {
      "zip": "27880",
      "city": "Sims"
    },
    {
      "zip": "27881",
      "city": "Speed"
    },
    {
      "zip": "27882",
      "city": "Spring Hope"
    },
    {
      "zip": "27883",
      "city": "Stantonsburg"
    },
    {
      "zip": "27884",
      "city": "Stokes"
    },
    {
      "zip": "27885",
      "city": "Swanquarter"
    },
    {
      "zip": "27886",
      "city": "Tarboro"
    },
    {
      "zip": "27888",
      "city": "Walstonburg"
    },
    {
      "zip": "27889",
      "city": "Washington"
    },
    {
      "zip": "27890",
      "city": "Weldon"
    },
    {
      "zip": "27891",
      "city": "Whitakers"
    },
    {
      "zip": "27892",
      "city": "Williamston"
    },
    {
      "zip": "27893",
      "city": "Wilson"
    },
    {
      "zip": "27896",
      "city": "Wilson"
    },
    {
      "zip": "27897",
      "city": "Woodland"
    },
    {
      "zip": "27909",
      "city": "Elizabeth City"
    },
    {
      "zip": "27910",
      "city": "Ahoskie"
    },
    {
      "zip": "27915",
      "city": "Avon"
    },
    {
      "zip": "27916",
      "city": "Aydlett"
    },
    {
      "zip": "27917",
      "city": "Barco"
    },
    {
      "zip": "27919",
      "city": "Belvidere"
    },
    {
      "zip": "27920",
      "city": "Buxton"
    },
    {
      "zip": "27921",
      "city": "Camden"
    },
    {
      "zip": "27922",
      "city": "Cofield"
    },
    {
      "zip": "27923",
      "city": "Coinjock"
    },
    {
      "zip": "27924",
      "city": "Colerain"
    },
    {
      "zip": "27925",
      "city": "Columbia"
    },
    {
      "zip": "27926",
      "city": "Corapeake"
    },
    {
      "zip": "27927",
      "city": "Corolla"
    },
    {
      "zip": "27928",
      "city": "Creswell"
    },
    {
      "zip": "27929",
      "city": "Currituck"
    },
    {
      "zip": "27932",
      "city": "Edenton"
    },
    {
      "zip": "27935",
      "city": "Eure"
    },
    {
      "zip": "27936",
      "city": "Frisco"
    },
    {
      "zip": "27937",
      "city": "Gates"
    },
    {
      "zip": "27938",
      "city": "Gatesville"
    },
    {
      "zip": "27939",
      "city": "Grandy"
    },
    {
      "zip": "27941",
      "city": "Harbinger"
    },
    {
      "zip": "27942",
      "city": "Harrellsville"
    },
    {
      "zip": "27943",
      "city": "Hatteras"
    },
    {
      "zip": "27944",
      "city": "Hertford"
    },
    {
      "zip": "27946",
      "city": "Hobbsville"
    },
    {
      "zip": "27947",
      "city": "Jarvisburg"
    },
    {
      "zip": "27948",
      "city": "Kill Devil Hills"
    },
    {
      "zip": "27949",
      "city": "Kitty Hawk"
    },
    {
      "zip": "27950",
      "city": "Knotts Island"
    },
    {
      "zip": "27953",
      "city": "Manns Harbor"
    },
    {
      "zip": "27954",
      "city": "Manteo"
    },
    {
      "zip": "27956",
      "city": "Maple"
    },
    {
      "zip": "27957",
      "city": "Merry Hill"
    },
    {
      "zip": "27958",
      "city": "Moyock"
    },
    {
      "zip": "27959",
      "city": "Nags Head"
    },
    {
      "zip": "27960",
      "city": "Ocracoke"
    },
    {
      "zip": "27962",
      "city": "Plymouth"
    },
    {
      "zip": "27964",
      "city": "Point Harbor"
    },
    {
      "zip": "27965",
      "city": "Poplar Branch"
    },
    {
      "zip": "27966",
      "city": "Powells Point"
    },
    {
      "zip": "27967",
      "city": "Powellsville"
    },
    {
      "zip": "27968",
      "city": "Rodanthe"
    },
    {
      "zip": "27969",
      "city": "Roduco"
    },
    {
      "zip": "27970",
      "city": "Roper"
    },
    {
      "zip": "27972",
      "city": "Salvo"
    },
    {
      "zip": "27973",
      "city": "Shawboro"
    },
    {
      "zip": "27974",
      "city": "Shiloh"
    },
    {
      "zip": "27976",
      "city": "South Mills"
    },
    {
      "zip": "27978",
      "city": "Stumpy Point"
    },
    {
      "zip": "27979",
      "city": "Sunbury"
    },
    {
      "zip": "27980",
      "city": "Tyner"
    },
    {
      "zip": "27981",
      "city": "Wanchese"
    },
    {
      "zip": "27982",
      "city": "Waves"
    },
    {
      "zip": "27983",
      "city": "Windsor"
    },
    {
      "zip": "27985",
      "city": "Winfall"
    },
    {
      "zip": "27986",
      "city": "Winton"
    },
    {
      "zip": "28001",
      "city": "Albemarle"
    },
    {
      "zip": "28006",
      "city": "Alexis"
    },
    {
      "zip": "28007",
      "city": "Ansonville"
    },
    {
      "zip": "28009",
      "city": "Badin"
    },
    {
      "zip": "28012",
      "city": "Belmont"
    },
    {
      "zip": "28016",
      "city": "Bessemer City"
    },
    {
      "zip": "28017",
      "city": "Boiling Springs"
    },
    {
      "zip": "28018",
      "city": "Bostic"
    },
    {
      "zip": "28019",
      "city": "Caroleen"
    },
    {
      "zip": "28020",
      "city": "Casar"
    },
    {
      "zip": "28021",
      "city": "Cherryville"
    },
    {
      "zip": "28023",
      "city": "China Grove"
    },
    {
      "zip": "28024",
      "city": "Cliffside"
    },
    {
      "zip": "28025",
      "city": "Concord"
    },
    {
      "zip": "28027",
      "city": "Concord"
    },
    {
      "zip": "28031",
      "city": "Cornelius"
    },
    {
      "zip": "28032",
      "city": "Cramerton"
    },
    {
      "zip": "28033",
      "city": "Crouse"
    },
    {
      "zip": "28034",
      "city": "Dallas"
    },
    {
      "zip": "28036",
      "city": "Davidson"
    },
    {
      "zip": "28037",
      "city": "Denver"
    },
    {
      "zip": "28039",
      "city": "East Spencer"
    },
    {
      "zip": "28040",
      "city": "Ellenboro"
    },
    {
      "zip": "28041",
      "city": "Faith"
    },
    {
      "zip": "28042",
      "city": "Fallston"
    },
    {
      "zip": "28043",
      "city": "Forest City"
    },
    {
      "zip": "28052",
      "city": "Gastonia"
    },
    {
      "zip": "28054",
      "city": "Gastonia"
    },
    {
      "zip": "28056",
      "city": "Gastonia"
    },
    {
      "zip": "28071",
      "city": "Gold Hill"
    },
    {
      "zip": "28072",
      "city": "Granite Quarry"
    },
    {
      "zip": "28073",
      "city": "Grover"
    },
    {
      "zip": "28074",
      "city": "Harris"
    },
    {
      "zip": "28075",
      "city": "Harrisburg"
    },
    {
      "zip": "28076",
      "city": "Henrietta"
    },
    {
      "zip": "28077",
      "city": "High Shoals"
    },
    {
      "zip": "28078",
      "city": "Huntersville"
    },
    {
      "zip": "28079",
      "city": "Indian Trail"
    },
    {
      "zip": "28080",
      "city": "Iron Station"
    },
    {
      "zip": "28081",
      "city": "Kannapolis"
    },
    {
      "zip": "28083",
      "city": "Kannapolis"
    },
    {
      "zip": "28086",
      "city": "Kings Mountain"
    },
    {
      "zip": "28088",
      "city": "Landis"
    },
    {
      "zip": "28089",
      "city": "Lattimore"
    },
    {
      "zip": "28090",
      "city": "Lawndale"
    },
    {
      "zip": "28091",
      "city": "Lilesville"
    },
    {
      "zip": "28092",
      "city": "Lincolnton"
    },
    {
      "zip": "28097",
      "city": "Locust"
    },
    {
      "zip": "28098",
      "city": "Lowell"
    },
    {
      "zip": "28101",
      "city": "McAdenville"
    },
    {
      "zip": "28102",
      "city": "McFarlan"
    },
    {
      "zip": "28103",
      "city": "Marshville"
    },
    {
      "zip": "28104",
      "city": "Matthews"
    },
    {
      "zip": "28105",
      "city": "Matthews"
    },
    {
      "zip": "28107",
      "city": "Midland"
    },
    {
      "zip": "28108",
      "city": "Mineral Springs"
    },
    {
      "zip": "28109",
      "city": "Misenheimer"
    },
    {
      "zip": "28110",
      "city": "Monroe"
    },
    {
      "zip": "28112",
      "city": "Monroe"
    },
    {
      "zip": "28114",
      "city": "Mooresboro"
    },
    {
      "zip": "28115",
      "city": "Mooresville"
    },
    {
      "zip": "28117",
      "city": "Mooresville"
    },
    {
      "zip": "28119",
      "city": "Morven"
    },
    {
      "zip": "28120",
      "city": "Mount Holly"
    },
    {
      "zip": "28124",
      "city": "Mount Pleasant"
    },
    {
      "zip": "28125",
      "city": "Mount Ulla"
    },
    {
      "zip": "28127",
      "city": "New London"
    },
    {
      "zip": "28128",
      "city": "Norwood"
    },
    {
      "zip": "28129",
      "city": "Oakboro"
    },
    {
      "zip": "28133",
      "city": "Peachland"
    },
    {
      "zip": "28134",
      "city": "Pineville"
    },
    {
      "zip": "28135",
      "city": "Polkton"
    },
    {
      "zip": "28136",
      "city": "Polkville"
    },
    {
      "zip": "28137",
      "city": "Richfield"
    },
    {
      "zip": "28138",
      "city": "Rockwell"
    },
    {
      "zip": "28139",
      "city": "Rutherfordton"
    },
    {
      "zip": "28144",
      "city": "Salisbury"
    },
    {
      "zip": "28146",
      "city": "Salisbury"
    },
    {
      "zip": "28147",
      "city": "Salisbury"
    },
    {
      "zip": "28150",
      "city": "Shelby"
    },
    {
      "zip": "28152",
      "city": "Shelby"
    },
    {
      "zip": "28159",
      "city": "Spencer"
    },
    {
      "zip": "28160",
      "city": "Spindale"
    },
    {
      "zip": "28163",
      "city": "Stanfield"
    },
    {
      "zip": "28164",
      "city": "Stanley"
    },
    {
      "zip": "28166",
      "city": "Troutman"
    },
    {
      "zip": "28167",
      "city": "Union Mills"
    },
    {
      "zip": "28168",
      "city": "Vale"
    },
    {
      "zip": "28169",
      "city": "Waco"
    },
    {
      "zip": "28170",
      "city": "Wadesboro"
    },
    {
      "zip": "28173",
      "city": "Waxhaw"
    },
    {
      "zip": "28174",
      "city": "Wingate"
    },
    {
      "zip": "28202",
      "city": "Charlotte"
    },
    {
      "zip": "28203",
      "city": "Charlotte"
    },
    {
      "zip": "28204",
      "city": "Charlotte"
    },
    {
      "zip": "28205",
      "city": "Charlotte"
    },
    {
      "zip": "28206",
      "city": "Charlotte"
    },
    {
      "zip": "28207",
      "city": "Charlotte"
    },
    {
      "zip": "28208",
      "city": "Charlotte"
    },
    {
      "zip": "28209",
      "city": "Charlotte"
    },
    {
      "zip": "28210",
      "city": "Charlotte"
    },
    {
      "zip": "28211",
      "city": "Charlotte"
    },
    {
      "zip": "28212",
      "city": "Charlotte"
    },
    {
      "zip": "28213",
      "city": "Charlotte"
    },
    {
      "zip": "28214",
      "city": "Charlotte"
    },
    {
      "zip": "28215",
      "city": "Charlotte"
    },
    {
      "zip": "28216",
      "city": "Charlotte"
    },
    {
      "zip": "28217",
      "city": "Charlotte"
    },
    {
      "zip": "28223",
      "city": "Charlotte"
    },
    {
      "zip": "28226",
      "city": "Charlotte"
    },
    {
      "zip": "28227",
      "city": "Charlotte"
    },
    {
      "zip": "28244",
      "city": "Charlotte"
    },
    {
      "zip": "28262",
      "city": "Charlotte"
    },
    {
      "zip": "28269",
      "city": "Charlotte"
    },
    {
      "zip": "28270",
      "city": "Charlotte"
    },
    {
      "zip": "28273",
      "city": "Charlotte"
    },
    {
      "zip": "28274",
      "city": "Charlotte"
    },
    {
      "zip": "28277",
      "city": "Charlotte"
    },
    {
      "zip": "28278",
      "city": "Charlotte"
    },
    {
      "zip": "28280",
      "city": "Charlotte"
    },
    {
      "zip": "28282",
      "city": "Charlotte"
    },
    {
      "zip": "28301",
      "city": "Fayetteville"
    },
    {
      "zip": "28303",
      "city": "Fayetteville"
    },
    {
      "zip": "28304",
      "city": "Fayetteville"
    },
    {
      "zip": "28305",
      "city": "Fayetteville"
    },
    {
      "zip": "28306",
      "city": "Fayetteville"
    },
    {
      "zip": "28307",
      "city": "Fort Bragg"
    },
    {
      "zip": "28308",
      "city": "Pope Army Airfield"
    },
    {
      "zip": "28310",
      "city": "Fort Bragg"
    },
    {
      "zip": "28311",
      "city": "Fayetteville"
    },
    {
      "zip": "28312",
      "city": "Fayetteville"
    },
    {
      "zip": "28314",
      "city": "Fayetteville"
    },
    {
      "zip": "28315",
      "city": "Aberdeen"
    },
    {
      "zip": "28318",
      "city": "Autryville"
    },
    {
      "zip": "28320",
      "city": "Bladenboro"
    },
    {
      "zip": "28323",
      "city": "Bunnlevel"
    },
    {
      "zip": "28325",
      "city": "Calypso"
    },
    {
      "zip": "28326",
      "city": "Cameron"
    },
    {
      "zip": "28327",
      "city": "Carthage"
    },
    {
      "zip": "28328",
      "city": "Clinton"
    },
    {
      "zip": "28330",
      "city": "Cordova"
    },
    {
      "zip": "28331",
      "city": "Cumberland"
    },
    {
      "zip": "28332",
      "city": "Dublin"
    },
    {
      "zip": "28333",
      "city": "Dudley"
    },
    {
      "zip": "28334",
      "city": "Dunn"
    },
    {
      "zip": "28337",
      "city": "Elizabethtown"
    },
    {
      "zip": "28338",
      "city": "Ellerbe"
    },
    {
      "zip": "28339",
      "city": "Erwin"
    },
    {
      "zip": "28340",
      "city": "Fairmont"
    },
    {
      "zip": "28341",
      "city": "Faison"
    },
    {
      "zip": "28342",
      "city": "Falcon"
    },
    {
      "zip": "28343",
      "city": "Gibson"
    },
    {
      "zip": "28344",
      "city": "Godwin"
    },
    {
      "zip": "28345",
      "city": "Hamlet"
    },
    {
      "zip": "28347",
      "city": "Hoffman"
    },
    {
      "zip": "28348",
      "city": "Hope Mills"
    },
    {
      "zip": "28349",
      "city": "Kenansville"
    },
    {
      "zip": "28350",
      "city": "Lakeview"
    },
    {
      "zip": "28351",
      "city": "Laurel Hill"
    },
    {
      "zip": "28352",
      "city": "Laurinburg"
    },
    {
      "zip": "28355",
      "city": "Lemon Springs"
    },
    {
      "zip": "28356",
      "city": "Linden"
    },
    {
      "zip": "28357",
      "city": "Lumber Bridge"
    },
    {
      "zip": "28358",
      "city": "Lumberton"
    },
    {
      "zip": "28359",
      "city": "Lumberton"
    },
    {
      "zip": "28360",
      "city": "Lumberton"
    },
    {
      "zip": "28362",
      "city": "Marietta"
    },
    {
      "zip": "28363",
      "city": "Marston"
    },
    {
      "zip": "28364",
      "city": "Maxton"
    },
    {
      "zip": "28365",
      "city": "Mount Olive"
    },
    {
      "zip": "28366",
      "city": "Newton Grove"
    },
    {
      "zip": "28367",
      "city": "Norman"
    },
    {
      "zip": "28368",
      "city": "Olivia"
    },
    {
      "zip": "28369",
      "city": "Orrum"
    },
    {
      "zip": "28371",
      "city": "Parkton"
    },
    {
      "zip": "28372",
      "city": "Pembroke"
    },
    {
      "zip": "28373",
      "city": "Pinebluff"
    },
    {
      "zip": "28374",
      "city": "Pinehurst"
    },
    {
      "zip": "28375",
      "city": "Proctorville"
    },
    {
      "zip": "28376",
      "city": "Raeford"
    },
    {
      "zip": "28377",
      "city": "Red Springs"
    },
    {
      "zip": "28378",
      "city": "Rex"
    },
    {
      "zip": "28379",
      "city": "Rockingham"
    },
    {
      "zip": "28382",
      "city": "Roseboro"
    },
    {
      "zip": "28383",
      "city": "Rowland"
    },
    {
      "zip": "28384",
      "city": "Saint Pauls"
    },
    {
      "zip": "28385",
      "city": "Salemburg"
    },
    {
      "zip": "28386",
      "city": "Shannon"
    },
    {
      "zip": "28387",
      "city": "Southern Pines"
    },
    {
      "zip": "28390",
      "city": "Spring Lake"
    },
    {
      "zip": "28391",
      "city": "Stedman"
    },
    {
      "zip": "28392",
      "city": "Tar Heel"
    },
    {
      "zip": "28393",
      "city": "Turkey"
    },
    {
      "zip": "28394",
      "city": "Vass"
    },
    {
      "zip": "28395",
      "city": "Wade"
    },
    {
      "zip": "28396",
      "city": "Wagram"
    },
    {
      "zip": "28398",
      "city": "Warsaw"
    },
    {
      "zip": "28399",
      "city": "White Oak"
    },
    {
      "zip": "28401",
      "city": "Wilmington"
    },
    {
      "zip": "28403",
      "city": "Wilmington"
    },
    {
      "zip": "28405",
      "city": "Wilmington"
    },
    {
      "zip": "28409",
      "city": "Wilmington"
    },
    {
      "zip": "28411",
      "city": "Wilmington"
    },
    {
      "zip": "28412",
      "city": "Wilmington"
    },
    {
      "zip": "28420",
      "city": "Ash"
    },
    {
      "zip": "28421",
      "city": "Atkinson"
    },
    {
      "zip": "28422",
      "city": "Bolivia"
    },
    {
      "zip": "28423",
      "city": "Bolton"
    },
    {
      "zip": "28424",
      "city": "Brunswick"
    },
    {
      "zip": "28425",
      "city": "Burgaw"
    },
    {
      "zip": "28428",
      "city": "Carolina Beach"
    },
    {
      "zip": "28429",
      "city": "Castle Hayne"
    },
    {
      "zip": "28430",
      "city": "Cerro Gordo"
    },
    {
      "zip": "28431",
      "city": "Chadbourn"
    },
    {
      "zip": "28432",
      "city": "Clarendon"
    },
    {
      "zip": "28433",
      "city": "Clarkton"
    },
    {
      "zip": "28434",
      "city": "Council"
    },
    {
      "zip": "28435",
      "city": "Currie"
    },
    {
      "zip": "28436",
      "city": "Delco"
    },
    {
      "zip": "28438",
      "city": "Evergreen"
    },
    {
      "zip": "28439",
      "city": "Fair Bluff"
    },
    {
      "zip": "28441",
      "city": "Garland"
    },
    {
      "zip": "28442",
      "city": "Hallsboro"
    },
    {
      "zip": "28443",
      "city": "Hampstead"
    },
    {
      "zip": "28444",
      "city": "Harrells"
    },
    {
      "zip": "28445",
      "city": "Holly Ridge"
    },
    {
      "zip": "28447",
      "city": "Ivanhoe"
    },
    {
      "zip": "28448",
      "city": "Kelly"
    },
    {
      "zip": "28449",
      "city": "Kure Beach"
    },
    {
      "zip": "28450",
      "city": "Lake Waccamaw"
    },
    {
      "zip": "28451",
      "city": "Leland"
    },
    {
      "zip": "28452",
      "city": "Longwood"
    },
    {
      "zip": "28453",
      "city": "Magnolia"
    },
    {
      "zip": "28454",
      "city": "Maple Hill"
    },
    {
      "zip": "28455",
      "city": "Nakina"
    },
    {
      "zip": "28456",
      "city": "Riegelwood"
    },
    {
      "zip": "28457",
      "city": "Rocky Point"
    },
    {
      "zip": "28458",
      "city": "Rose Hill"
    },
    {
      "zip": "28460",
      "city": "Sneads Ferry"
    },
    {
      "zip": "28461",
      "city": "Southport"
    },
    {
      "zip": "28462",
      "city": "Supply"
    },
    {
      "zip": "28463",
      "city": "Tabor City"
    },
    {
      "zip": "28464",
      "city": "Teachey"
    },
    {
      "zip": "28465",
      "city": "Oak Island"
    },
    {
      "zip": "28466",
      "city": "Wallace"
    },
    {
      "zip": "28467",
      "city": "Calabash"
    },
    {
      "zip": "28468",
      "city": "Sunset Beach"
    },
    {
      "zip": "28469",
      "city": "Ocean Isle Beach"
    },
    {
      "zip": "28470",
      "city": "Shallotte"
    },
    {
      "zip": "28472",
      "city": "Whiteville"
    },
    {
      "zip": "28478",
      "city": "Willard"
    },
    {
      "zip": "28479",
      "city": "Winnabow"
    },
    {
      "zip": "28480",
      "city": "Wrightsville Beach"
    },
    {
      "zip": "28501",
      "city": "Kinston"
    },
    {
      "zip": "28504",
      "city": "Kinston"
    },
    {
      "zip": "28508",
      "city": "Albertson"
    },
    {
      "zip": "28509",
      "city": "Alliance"
    },
    {
      "zip": "28510",
      "city": "Arapahoe"
    },
    {
      "zip": "28511",
      "city": "Atlantic"
    },
    {
      "zip": "28512",
      "city": "Atlantic Beach"
    },
    {
      "zip": "28513",
      "city": "Ayden"
    },
    {
      "zip": "28515",
      "city": "Bayboro"
    },
    {
      "zip": "28516",
      "city": "Beaufort"
    },
    {
      "zip": "28518",
      "city": "Beulaville"
    },
    {
      "zip": "28519",
      "city": "Bridgeton"
    },
    {
      "zip": "28520",
      "city": "Cedar Island"
    },
    {
      "zip": "28521",
      "city": "Chinquapin"
    },
    {
      "zip": "28523",
      "city": "Cove City"
    },
    {
      "zip": "28524",
      "city": "Davis"
    },
    {
      "zip": "28525",
      "city": "Deep Run"
    },
    {
      "zip": "28526",
      "city": "Dover"
    },
    {
      "zip": "28527",
      "city": "Ernul"
    },
    {
      "zip": "28528",
      "city": "Gloucester"
    },
    {
      "zip": "28529",
      "city": "Grantsboro"
    },
    {
      "zip": "28530",
      "city": "Grifton"
    },
    {
      "zip": "28531",
      "city": "Harkers Island"
    },
    {
      "zip": "28532",
      "city": "Havelock"
    },
    {
      "zip": "28533",
      "city": "Cherry Point"
    },
    {
      "zip": "28537",
      "city": "Hobucken"
    },
    {
      "zip": "28538",
      "city": "Hookerton"
    },
    {
      "zip": "28539",
      "city": "Hubert"
    },
    {
      "zip": "28540",
      "city": "Jacksonville"
    },
    {
      "zip": "28542",
      "city": "Camp Lejeune"
    },
    {
      "zip": "28543",
      "city": "Tarawa Terrace"
    },
    {
      "zip": "28544",
      "city": "Midway Park"
    },
    {
      "zip": "28546",
      "city": "Jacksonville"
    },
    {
      "zip": "28547",
      "city": "Camp Lejeune"
    },
    {
      "zip": "28551",
      "city": "La Grange"
    },
    {
      "zip": "28552",
      "city": "Lowland"
    },
    {
      "zip": "28553",
      "city": "Marshallberg"
    },
    {
      "zip": "28554",
      "city": "Maury"
    },
    {
      "zip": "28555",
      "city": "Maysville"
    },
    {
      "zip": "28556",
      "city": "Merritt"
    },
    {
      "zip": "28557",
      "city": "Morehead City"
    },
    {
      "zip": "28560",
      "city": "New Bern"
    },
    {
      "zip": "28562",
      "city": "New Bern"
    },
    {
      "zip": "28570",
      "city": "Newport"
    },
    {
      "zip": "28571",
      "city": "Oriental"
    },
    {
      "zip": "28572",
      "city": "Pink Hill"
    },
    {
      "zip": "28573",
      "city": "Pollocksville"
    },
    {
      "zip": "28574",
      "city": "Richlands"
    },
    {
      "zip": "28575",
      "city": "Salter Path"
    },
    {
      "zip": "28577",
      "city": "Sealevel"
    },
    {
      "zip": "28578",
      "city": "Seven Springs"
    },
    {
      "zip": "28579",
      "city": "Smyrna"
    },
    {
      "zip": "28580",
      "city": "Snow Hill"
    },
    {
      "zip": "28581",
      "city": "Stacy"
    },
    {
      "zip": "28582",
      "city": "Stella"
    },
    {
      "zip": "28584",
      "city": "Swansboro"
    },
    {
      "zip": "28585",
      "city": "Trenton"
    },
    {
      "zip": "28586",
      "city": "Vanceboro"
    },
    {
      "zip": "28587",
      "city": "Vandemere"
    },
    {
      "zip": "28589",
      "city": "Williston"
    },
    {
      "zip": "28590",
      "city": "Winterville"
    },
    {
      "zip": "28594",
      "city": "Emerald Isle"
    },
    {
      "zip": "28601",
      "city": "Hickory"
    },
    {
      "zip": "28602",
      "city": "Hickory"
    },
    {
      "zip": "28604",
      "city": "Banner Elk"
    },
    {
      "zip": "28605",
      "city": "Blowing Rock"
    },
    {
      "zip": "28606",
      "city": "Boomer"
    },
    {
      "zip": "28607",
      "city": "Boone"
    },
    {
      "zip": "28609",
      "city": "Catawba"
    },
    {
      "zip": "28610",
      "city": "Claremont"
    },
    {
      "zip": "28611",
      "city": "Collettsville"
    },
    {
      "zip": "28612",
      "city": "Connelly Springs"
    },
    {
      "zip": "28613",
      "city": "Conover"
    },
    {
      "zip": "28615",
      "city": "Creston"
    },
    {
      "zip": "28616",
      "city": "Crossnore"
    },
    {
      "zip": "28617",
      "city": "Crumpler"
    },
    {
      "zip": "28618",
      "city": "Deep Gap"
    },
    {
      "zip": "28619",
      "city": "Drexel"
    },
    {
      "zip": "28621",
      "city": "Elkin"
    },
    {
      "zip": "28622",
      "city": "Elk Park"
    },
    {
      "zip": "28623",
      "city": "Ennice"
    },
    {
      "zip": "28624",
      "city": "Ferguson"
    },
    {
      "zip": "28625",
      "city": "Statesville"
    },
    {
      "zip": "28626",
      "city": "Fleetwood"
    },
    {
      "zip": "28627",
      "city": "Glade Valley"
    },
    {
      "zip": "28628",
      "city": "Glen Alpine"
    },
    {
      "zip": "28629",
      "city": "Glendale Springs"
    },
    {
      "zip": "28630",
      "city": "Granite Falls"
    },
    {
      "zip": "28631",
      "city": "Grassy Creek"
    },
    {
      "zip": "28634",
      "city": "Harmony"
    },
    {
      "zip": "28635",
      "city": "Hays"
    },
    {
      "zip": "28636",
      "city": "Hiddenite"
    },
    {
      "zip": "28637",
      "city": "Hildebran"
    },
    {
      "zip": "28638",
      "city": "Hudson"
    },
    {
      "zip": "28640",
      "city": "Jefferson"
    },
    {
      "zip": "28641",
      "city": "Jonas Ridge"
    },
    {
      "zip": "28642",
      "city": "Jonesville"
    },
    {
      "zip": "28643",
      "city": "Lansing"
    },
    {
      "zip": "28644",
      "city": "Laurel Springs"
    },
    {
      "zip": "28645",
      "city": "Lenoir"
    },
    {
      "zip": "28646",
      "city": "Linville"
    },
    {
      "zip": "28649",
      "city": "McGrady"
    },
    {
      "zip": "28650",
      "city": "Maiden"
    },
    {
      "zip": "28651",
      "city": "Millers Creek"
    },
    {
      "zip": "28652",
      "city": "Minneapolis"
    },
    {
      "zip": "28653",
      "city": "Montezuma"
    },
    {
      "zip": "28654",
      "city": "Moravian Falls"
    },
    {
      "zip": "28655",
      "city": "Morganton"
    },
    {
      "zip": "28657",
      "city": "Newland"
    },
    {
      "zip": "28658",
      "city": "Newton"
    },
    {
      "zip": "28659",
      "city": "North Wilkesboro"
    },
    {
      "zip": "28660",
      "city": "Olin"
    },
    {
      "zip": "28662",
      "city": "Pineola"
    },
    {
      "zip": "28663",
      "city": "Piney Creek"
    },
    {
      "zip": "28664",
      "city": "Plumtree"
    },
    {
      "zip": "28665",
      "city": "Purlear"
    },
    {
      "zip": "28666",
      "city": "Icard"
    },
    {
      "zip": "28667",
      "city": "Rhodhiss"
    },
    {
      "zip": "28668",
      "city": "Roaring Gap"
    },
    {
      "zip": "28669",
      "city": "Roaring River"
    },
    {
      "zip": "28670",
      "city": "Ronda"
    },
    {
      "zip": "28671",
      "city": "Rutherford College"
    },
    {
      "zip": "28672",
      "city": "Scottville"
    },
    {
      "zip": "28673",
      "city": "Sherrills Ford"
    },
    {
      "zip": "28675",
      "city": "Sparta"
    },
    {
      "zip": "28676",
      "city": "State Road"
    },
    {
      "zip": "28677",
      "city": "Statesville"
    },
    {
      "zip": "28678",
      "city": "Stony Point"
    },
    {
      "zip": "28679",
      "city": "Sugar Grove"
    },
    {
      "zip": "28681",
      "city": "Taylorsville"
    },
    {
      "zip": "28682",
      "city": "Terrell"
    },
    {
      "zip": "28683",
      "city": "Thurmond"
    },
    {
      "zip": "28684",
      "city": "Todd"
    },
    {
      "zip": "28685",
      "city": "Traphill"
    },
    {
      "zip": "28689",
      "city": "Union Grove"
    },
    {
      "zip": "28690",
      "city": "Valdese"
    },
    {
      "zip": "28692",
      "city": "Vilas"
    },
    {
      "zip": "28693",
      "city": "Warrensville"
    },
    {
      "zip": "28694",
      "city": "West Jefferson"
    },
    {
      "zip": "28697",
      "city": "Wilkesboro"
    },
    {
      "zip": "28698",
      "city": "Zionville"
    },
    {
      "zip": "28701",
      "city": "Alexander"
    },
    {
      "zip": "28702",
      "city": "Almond"
    },
    {
      "zip": "28704",
      "city": "Arden"
    },
    {
      "zip": "28705",
      "city": "Bakersville"
    },
    {
      "zip": "28707",
      "city": "Balsam"
    },
    {
      "zip": "28708",
      "city": "Balsam Grove"
    },
    {
      "zip": "28709",
      "city": "Barnardsville"
    },
    {
      "zip": "28710",
      "city": "Bat Cave"
    },
    {
      "zip": "28711",
      "city": "Black Mountain"
    },
    {
      "zip": "28712",
      "city": "Brevard"
    },
    {
      "zip": "28713",
      "city": "Bryson City"
    },
    {
      "zip": "28714",
      "city": "Burnsville"
    },
    {
      "zip": "28715",
      "city": "Candler"
    },
    {
      "zip": "28716",
      "city": "Canton"
    },
    {
      "zip": "28717",
      "city": "Cashiers"
    },
    {
      "zip": "28718",
      "city": "Cedar Mountain"
    },
    {
      "zip": "28719",
      "city": "Cherokee"
    },
    {
      "zip": "28720",
      "city": "Chimney Rock"
    },
    {
      "zip": "28721",
      "city": "Clyde"
    },
    {
      "zip": "28722",
      "city": "Columbus"
    },
    {
      "zip": "28723",
      "city": "Cullowhee"
    },
    {
      "zip": "28725",
      "city": "Dillsboro"
    },
    {
      "zip": "28726",
      "city": "East Flat Rock"
    },
    {
      "zip": "28729",
      "city": "Etowah"
    },
    {
      "zip": "28730",
      "city": "Fairview"
    },
    {
      "zip": "28731",
      "city": "Flat Rock"
    },
    {
      "zip": "28732",
      "city": "Fletcher"
    },
    {
      "zip": "28733",
      "city": "Fontana Dam"
    },
    {
      "zip": "28734",
      "city": "Franklin"
    },
    {
      "zip": "28735",
      "city": "Gerton"
    },
    {
      "zip": "28736",
      "city": "Glenville"
    },
    {
      "zip": "28739",
      "city": "Hendersonville"
    },
    {
      "zip": "28740",
      "city": "Green Mountain"
    },
    {
      "zip": "28741",
      "city": "Highlands"
    },
    {
      "zip": "28742",
      "city": "Horse Shoe"
    },
    {
      "zip": "28743",
      "city": "Hot Springs"
    },
    {
      "zip": "28745",
      "city": "Lake Junaluska"
    },
    {
      "zip": "28746",
      "city": "Lake Lure"
    },
    {
      "zip": "28747",
      "city": "Lake Toxaway"
    },
    {
      "zip": "28748",
      "city": "Leicester"
    },
    {
      "zip": "28749",
      "city": "Little Switzerland"
    },
    {
      "zip": "28751",
      "city": "Maggie Valley"
    },
    {
      "zip": "28752",
      "city": "Marion"
    },
    {
      "zip": "28753",
      "city": "Marshall"
    },
    {
      "zip": "28754",
      "city": "Mars Hill"
    },
    {
      "zip": "28755",
      "city": "Micaville"
    },
    {
      "zip": "28756",
      "city": "Mill Spring"
    },
    {
      "zip": "28757",
      "city": "Montreat"
    },
    {
      "zip": "28758",
      "city": "Mountain Home"
    },
    {
      "zip": "28759",
      "city": "Mills River"
    },
    {
      "zip": "28761",
      "city": "Nebo"
    },
    {
      "zip": "28762",
      "city": "Old Fort"
    },
    {
      "zip": "28763",
      "city": "Otto"
    },
    {
      "zip": "28766",
      "city": "Penrose"
    },
    {
      "zip": "28768",
      "city": "Pisgah Forest"
    },
    {
      "zip": "28770",
      "city": "Ridgecrest"
    },
    {
      "zip": "28771",
      "city": "Robbinsville"
    },
    {
      "zip": "28772",
      "city": "Rosman"
    },
    {
      "zip": "28773",
      "city": "Saluda"
    },
    {
      "zip": "28774",
      "city": "Sapphire"
    },
    {
      "zip": "28775",
      "city": "Scaly Mountain"
    },
    {
      "zip": "28777",
      "city": "Spruce Pine"
    },
    {
      "zip": "28778",
      "city": "Swannanoa"
    },
    {
      "zip": "28779",
      "city": "Sylva"
    },
    {
      "zip": "28781",
      "city": "Topton"
    },
    {
      "zip": "28782",
      "city": "Tryon"
    },
    {
      "zip": "28783",
      "city": "Tuckasegee"
    },
    {
      "zip": "28785",
      "city": "Waynesville"
    },
    {
      "zip": "28786",
      "city": "Waynesville"
    },
    {
      "zip": "28787",
      "city": "Weaverville"
    },
    {
      "zip": "28788",
      "city": "Webster"
    },
    {
      "zip": "28789",
      "city": "Whittier"
    },
    {
      "zip": "28790",
      "city": "Zirconia"
    },
    {
      "zip": "28791",
      "city": "Hendersonville"
    },
    {
      "zip": "28792",
      "city": "Hendersonville"
    },
    {
      "zip": "28801",
      "city": "Asheville"
    },
    {
      "zip": "28803",
      "city": "Asheville"
    },
    {
      "zip": "28804",
      "city": "Asheville"
    },
    {
      "zip": "28805",
      "city": "Asheville"
    },
    {
      "zip": "28806",
      "city": "Asheville"
    },
    {
      "zip": "28901",
      "city": "Andrews"
    },
    {
      "zip": "28902",
      "city": "Brasstown"
    },
    {
      "zip": "28904",
      "city": "Hayesville"
    },
    {
      "zip": "28905",
      "city": "Marble"
    },
    {
      "zip": "28906",
      "city": "Murphy"
    },
    {
      "zip": "28909",
      "city": "Warne"
    }
  ];


})(jQuery);
