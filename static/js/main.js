
        document.addEventListener('DOMContentLoaded', function() {
            var btnFullscreen = document.getElementById('btn-fullscreen');
            var frameWrap = document.getElementById('frame-wrapper');
            var gameIframe = document.getElementById('game-iframe');
            var closeFsBtn = document.querySelector('.fs-close-btn');
            
            function stopGame() {
                if (gameIframe) {
                    var src = gameIframe.src;
                    gameIframe.src = '';
                    gameIframe.src = src;
                }
            }

            if (btnFullscreen && frameWrap) {
                btnFullscreen.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'fullscreen_click', { 'event_category': 'Engagement' });
                    }
                    if (frameWrap.requestFullscreen) {
                        frameWrap.requestFullscreen();
                    } else if (frameWrap.webkitRequestFullscreen) {
                        frameWrap.webkitRequestFullscreen();
                    } else {
                        frameWrap.classList.toggle('pseudo-fullscreen');
                        if (frameWrap.classList.contains('pseudo-fullscreen')) {
                            btnFullscreen.innerHTML = '&#10006; Exit Fullscreen';
                        } else {
                            btnFullscreen.innerHTML = '&#10021; Fullscreen';
                            stopGame();
                        }
                    }
                });

                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && frameWrap.classList.contains('pseudo-fullscreen')) {
                        frameWrap.classList.remove('pseudo-fullscreen');
                        btnFullscreen.innerHTML = '&#10021; Fullscreen';
                        stopGame();
                    }
                });
            }
            
            if (closeFsBtn && frameWrap) {
                closeFsBtn.addEventListener('click', function() {
                    if (document.fullscreenElement || document.webkitFullscreenElement) {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        }
                    }
                    frameWrap.classList.remove('pseudo-fullscreen');
                    if (btnFullscreen) {
                        btnFullscreen.innerHTML = '&#10021; Fullscreen';
                    }
                    stopGame();
                });
            }

            var navTrigger = document.querySelector('.nav-trigger');
            var navList = document.querySelector('.nav-list');
            if (navTrigger && navList) {
                navTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.classList.toggle('is-active');
                    navList.classList.toggle('show-menu');
                    var expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !expanded);
                });
            }

            var dropBtn = document.querySelector('.dropbtn');
            var dropdown = document.querySelector('.dropdown');
            if (dropBtn && dropdown) {
                dropBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('is-expanded');
                    var expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !expanded);
                });
            }

            
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('isvisible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                var animElements = document.querySelectorAll('.scrollfade');
                animElements.forEach(function(el) {
                    observer.observe(el);
                });
            } else {
                var fallbackElements = document.querySelectorAll('.scrollfade');
                fallbackElements.forEach(function(el) {
                    el.classList.add('isvisible');
                });
            }
        

            var gameCards = document.querySelectorAll('.appbox a');
            gameCards.forEach(function(card) {
                card.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'play_game', { 'event_category': 'Clicks', 'event_label': this.getAttribute('title') || 'Game Card' });
                    }
                });
            });

            var startTime = new Date();
            window.addEventListener('beforeunload', function() {
                var timeSpent = Math.floor((new Date() - startTime) / 1000);
                if (typeof gtag !== 'undefined' && timeSpent > 5) {
                    gtag('event', 'time_on_page', { 'event_category': 'Engagement', 'value': timeSpent });
                }
            });
        });
    