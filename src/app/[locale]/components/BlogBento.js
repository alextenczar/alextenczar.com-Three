'use client';

import React from 'react';
import { useEffect } from 'react';
import '../blogbento.scss';

export default function BlogBento(props) {
    useEffect(() => {
        var container = document.getElementById('animate');
        var emoji = ['', '🗒️', '💭', '✍️', '✨', '🫠', '🤔', '😵‍💫', '👨‍💻', '😃', '🧐', '💻', '📷', '📸', '🖥️', '⌨️', '💾', '📱', '💿', '📀', '💡', '📝', '📓', '📁', '📔', '🗑️', '✏️', '🖊️', '🤨', '😮‍💨', '😶'];
        var circles = [];

        // Tighter horizontal and vertical ranges
        const horizontalSpread = 80; // was 300/400/600, now 80

        // Generate horizontalOffsets dynamically using horizontalSpread
        const horizontalOffsets = [];
        for (let i = -3; i <= 3; i++) {
            horizontalOffsets.push(i * horizontalSpread);
        }
        const verticalSpread = 300; // was 300, now 120

        for (var i = 0; i < 2; i++) {
            horizontalOffsets.forEach(offset => {
                // alternate vertical direction for variety
                const ySpread = (offset % 2 === 0) ? verticalSpread : -verticalSpread;
                addCircle(i * 150, [10 + offset, ySpread], emoji[Math.floor(Math.random() * emoji.length)]);
            });
        }

        function addCircle(delay, range, color) {
            setTimeout(function () {
                var c = new Circle(
                    range[0] + Math.random() * range[1],
                    80 + Math.random() * 4,
                    color,
                    {
                        x: -0.15 + Math.random() * 0.3,
                        y: 1 + Math.random() * 1
                    },
                    range
                );
                circles.push(c);
            }, delay);
        }

        function Circle(x, y, c, v, range) {
            var _this = this;
            this.x = x;
            this.y = y;
            this.color = c;
            this.v = v;
            this.range = range;
            this.element = document.createElement('span');
            this.element.style.opacity = 0;
            this.element.style.position = 'absolute';
            this.element.style.fontSize = '26px';
            this.element.style.color = 'hsl(' + (Math.random() * 360 | 0) + ',80%,50%)';
            this.element.innerHTML = c;
            container.appendChild(this.element);

            this.update = function () {
                if (_this.y > 300) { // was 800, now 300 for tighter vertical bounds
                    _this.y = 80 + Math.random() * 4;
                    _this.x = _this.range[0] + Math.random() * _this.range[1];
                }
                _this.y += _this.v.y;
                _this.x += _this.v.x;
                this.element.style.opacity = 1;
                this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
                this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
                this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
            };
        }

        function animate() {
            for (var i in circles) {
                circles[i].update();
            }
            requestAnimationFrame(animate);
        }

        animate();

    }, []);


    return (

        <div className='bento observe-scroll blog-bento row-span-1 max-md:min-h-64 flex flex-col'>
            <h2 className='text-4xl font-bold'>{props.title}</h2>
            <h3 className='text-lg text-neutral-500'>{props.subtitle}</h3>
            <div id="container">
                <span className='thought-cloud'>💭</span>
                <div id="animate"></div>
            </div>
        </div>
    );
};

