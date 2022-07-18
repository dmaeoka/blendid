import Alpine from 'alpinejs'
import './modules'

window.Alpine = Alpine

Alpine.start()

// Burger menus
document.addEventListener('DOMContentLoaded', function() {
	// open
	const burger = document.querySelectorAll('.navbar-burger');
	const menu = document.querySelectorAll('.navbar-menu');

	if (burger.length && menu.length) {
		for (let i = 0; i < burger.length; i++) {
			burger[i].addEventListener('click', function() {
				for (let j = 0; j < menu.length; j++) {
					menu[j].classList.toggle('hidden');
				}
			});
		}
	}

	// close
	const close = document.querySelectorAll('.navbar-close');
	const backdrop = document.querySelectorAll('.navbar-backdrop');

	if (close.length) {
		for (let i = 0; i < close.length; i++) {
			close[i].addEventListener('click', function() {
				for (let j = 0; j < menu.length; j++) {
					menu[j].classList.toggle('hidden');
				}
			});
		}
	}

	if (backdrop.length) {
		for (let i = 0; i < backdrop.length; i++) {
			backdrop[i].addEventListener('click', function() {
				for (let j = 0; j < menu.length; j++) {
					menu[j].classList.toggle('hidden');
				}
			});
		}
	}

	!function() {
		let t = window.driftt = window.drift = window.driftt || [];
		if (!t.init) {
			if (t.invoked) return void(window.console && console.error && console.error('Drift snippet included twice.'));
			t.invoked = !0, t.methods = ['identify', 'config', 'track', 'reset', 'debug', 'show', 'ping', 'page', 'hide', 'off', 'on'],
				t.factory = function(e) {
					return function() {
						let n = Array.prototype.slice.call(arguments);
						return n.unshift(e), t.push(n), t;
					};
				}, t.methods.forEach(function(e) {
					t[e] = t.factory(e);
				}), t.load = function(t) {
					let e = 3e5,
						n = Math.ceil(new Date() / e) * e,
						o = document.createElement('script');
					o.type = 'text/javascript', o.async = !0, o.crossorigin = 'anonymous', o.src = 'https://js.driftt.com/include/' + n + '/' + t + '.js';
					let i = document.getElementsByTagName('script')[0];
					i.parentNode.insertBefore(o, i);
				};
		}
	}();

	window.drift.SNIPPET_VERSION = '0.3.1';
	window.drift.load('7ue5h7spdg35');
	window.drift.on('ready', (api) => {
		api.widget.hide()
		// show the widget when you receive a message
		window.drift.on('message', () => {
			api.widget.show()
		})
		// hide the widget when you close the chat
		window.drift.on('chatClose', () => {
			api.widget.hide()
		})
	});

	const tl = window.gsap.timeline({
		defaults: {
			duration: 1,
			ease: 'power1.inOut'
		},
		scrollTrigger: {
			trigger: '.illustrations',
			start: 'center center',
			end: 'bottom top',
			scrub: true,
			pin: true
		}
	});

	tl.from('#robot', {
		opacity: 0,
		y: innerHeight * 1.125
	})
	.from('#tv', {
		opacity: 0,
		y: innerHeight * 1.125
	}, '-=.5')

	// .from('.midsole', {
	// 	y: innerHeight * 1.5
	// })
	// .from('.outsole', {
	// 	y: innerHeight * 1.5
	// });
});
