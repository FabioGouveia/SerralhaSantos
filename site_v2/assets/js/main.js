"use strict";

class StorageHelper{

    static getLocalValue(key){
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem(key))
                return localStorage.getItem(key);
            else
                return null;
        }
    }

    static setLocalValue(key, value){
        if (typeof (Storage) !== "undefined")
            return localStorage.setItem(key, value);
    }

    static clearLocalValue(key){
        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem(key))
            localStorage.removeItem(key);
        }
    }

    static clearAllLocalValues(){
        if (typeof (Storage) !== "undefined")
            localStorage.clear();
    }
}

class CookieHelper{

    static setCookie(cookieName, cookieValue) {
        document.cookie = cookieName + "=" + cookieValue;
    }

    static getCookieValue(cookieName){
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    static cookieExists(cookieName) {
        let cookieValue = CookieHelper.getCookieValue(cookieName);
        return cookieValue != null;
    }
}

class Aplication{

    constructor(){
        this.initializeMainFunctionalities();
        this.initializeConsentCookieHandler();
    }

    initializeConsentCookieHandler(){

        if(StorageHelper.getLocalValue("privacy_aproved") != null && StorageHelper.getLocalValue("privacy_aproved") == "true")
            window['ga-disable-UA-168241363-1'] = false;
        else
            window['ga-disable-UA-168241363-1'] = true;

        $("#accept-cookies-consent-btn").click(() => {

            let accepted = $("#consent-googleLLC-cookies-input").prop('checked');
            if(accepted){
                StorageHelper.setLocalValue("privacy_aproved", "true");
                window['ga-disable-UA-168241363-1'] = false;
                window.dataLayer = window.dataLayer || [];
                function analytics(){dataLayer.push(arguments);}
                analytics('js', new Date());
                analytics('config', 'UA-168241363-1');
            }else
                StorageHelper.setLocalValue("privacy_aproved", "false");

            $("#cookies-configuration-modal").modal("hide");
            $("#privacy-notification").addClass("d-none");
        });

        window.dataLayer = window.dataLayer || [];
        function analytics(){dataLayer.push(arguments);}
        analytics('js', new Date());
        analytics('config', 'UA-168241363-1');
    }

    initializeMainFunctionalities(){
        // Smooth scrolling using jQuery easing
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && this.hostname == this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                scrollTop: (target.offset().top - 72)
                }, 1000, "easeInOutExpo");
                return false;
            }
            }
        });

        // Closes responsive menu when a scroll trigger link is clicked
        $('.js-scroll-trigger').click(() => {
            $('.navbar-collapse').collapse('hide');
        });

        // Activate scrollspy to add active class to navbar items on scroll
        $('body').scrollspy({
            target: '#mainNav',
            offset: 75
        });

        // Collapse Navbar
        let navbarCollapse = () => {
            if($("#mainNav").offset() != undefined)
                if ($("#mainNav").offset().top > 100){
					$("#mainNav").addClass("navbar-scrolled");
					
					$("#mainLogo").removeClass("d-none");
					$("#mainLogoWhite").addClass("d-none");
				}  
                else{
					$("#mainNav").removeClass("navbar-scrolled");
					$("#mainLogoWhite").removeClass("d-none");
					$("#mainLogo").addClass("d-none");
				}    
        }

        // Collapse navbar now if page is not at top
        navbarCollapse();
        // Collapse the navbar when page is scrolled
        $(window).scroll(navbarCollapse);

        // Magnific popup calls
        $('#portfolio').magnificPopup({
            delegate: 'a',
            type: 'image',
            tClose: 'Fechar (Esc)', // Alt text on close button
            tLoading: 'A carregar imagem #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
            tPrev: 'Anterior', // Alt text on left arrow
            tNext: 'Próximo', // Alt text on right arrow
            tCounter: '%curr% de %total%' // Markup for "1 of 7" counter
            },
            image: {
            tError: '<a href="%url%">A imagem #%curr%</a> não pode ser carregada.'
            }
        });
    }
}

// Verify consent cookies before document load
if(StorageHelper.getLocalValue("privacy_aproved") == null)
  $("#privacy-notification").removeClass("d-none");

// initialize Application after document loaded
(() => {new Aplication();})();