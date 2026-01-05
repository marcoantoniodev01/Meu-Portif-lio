document.addEventListener('DOMContentLoaded', function () {

            var main = new Splide('#main-slider', {
                type: 'fade',
                pagination: false,
                arrows: true,
                autoHeight: true, // ✅ importante
            });

            var thumbnails = new Splide('#thumbnail-slider', {
                rewind: true,
                arrows: false,
                fixedWidth: 130,
                fixedHeight: 78,
                isNavigation: true,
                gap: 10,
                focus: 'left',
                pagination: false,
                cover: true,
                dragMinThreshold: {
                    mouse: 4,
                    touch: 10,
                },
                breakpoints: {
                    640: {
                        fixedWidth: 110,
                        fixedHeight: 58,
                    },

                    500: {
                        fixedWidth: 100,
                        fixedHeight: 48,
                    }
                },
            });

            main.sync(thumbnails);
            main.mount();
            thumbnails.mount();

        });