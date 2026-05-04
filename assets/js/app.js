
        document.addEventListener('DOMContentLoaded', function() {
            var fullscreenBtn = document.getElementById('btn-fullscreen');
            var gameFrame = document.getElementById('game-iframe');
            
            if (fullscreenBtn && gameFrame) {
                fullscreenBtn.addEventListener('click', function() {
                    if (gameFrame.requestFullscreen) {
                        gameFrame.requestFullscreen();
                    } else if (gameFrame.webkitRequestFullscreen) {
                        gameFrame.webkitRequestFullscreen();
                    } else if (gameFrame.msRequestFullscreen) {
                        gameFrame.msRequestFullscreen();
                    } else {
                        gameFrame.classList.toggle('pseudo-fullscreen');
                        if (gameFrame.classList.contains('pseudo-fullscreen')) {
                            fullscreenBtn.innerHTML = '&#10006; Exit Fullscreen';
                        } else {
                            fullscreenBtn.innerHTML = '&#10021; Fullscreen';
                        }
                    }
                });

                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && gameFrame.classList.contains('pseudo-fullscreen')) {
                        gameFrame.classList.remove('pseudo-fullscreen');
                        fullscreenBtn.innerHTML = '&#10021; Fullscreen';
                    }
                });
            }

            var dropBtn = document.querySelector('.dropbtn');
            if (dropBtn) {
                dropBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !expanded);
                });
            }

            function fixGrid() {
                var grids = document.querySelectorAll('.grid-container:not(.category-grid)');
                grids.forEach(function(grid) {
                    var cards = Array.from(grid.querySelectorAll('.app-box'));
                    if (cards.length === 0) return;
                    
                    cards.forEach(function(c) { c.style.display = ''; });
                    
                    var firstTop = cards[0].offsetTop;
                    var cols = 0;
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i].offsetTop === firstTop) {
                            cols++;
                        } else {
                            break;
                        }
                    }
                    
                    var leftovers = cards.length % cols;
                    if (leftovers > 0 && cards.length > cols) {
                        for (var j = cards.length - leftovers; j < cards.length; j++) {
                            cards[j].style.display = 'none';
                        }
                    }
                });
            }
            
            fixGrid();
            var resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(fixGrid, 100);
            });
        });
    