$(function () {
	// Проверка браузера
	if (!supportsCssVars()) {
		$('body').html('<div style="text-align: center; padding: 30px; font-family: Arial, sans-serif;">Ваш браузер устарел рекомендуем обновить его до последней версии<br> или использовать другой более современный</div>')
	}


	// Анимированное появление страницы
	$('body').addClass('show')


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll())


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 99-99-999')

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function () {
		$(this).next().find('.input, textarea').focus()
	})

	// Выбор файла
	$('body').on('change', '.form input[type=file]', function (e) {
		$(this).next().find('.path').text($(this).val())
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function (e) {
		e.preventDefault()

		let modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			firstClick = false

			if ($(window).width() < 1024) {
				$('body').css('cursor', 'default')
			}
		} else {
			$('.mini_modal_link').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			firstClick = true

			if ($(window).width() < 1024) {
				$('body').css('cursor', 'pointer')
			}
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function (e) {
		if (!firstClick && $(e.target).closest('.mini_modal').length == 0) {
			$('.mini_modal, .mini_modal_link').removeClass('active')

			if ($(window).width() < 1024) {
				$('body').css('cursor', 'default')
			}
		}

		firstClick = false
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close', function (e) {
		e.preventDefault()

		$('.mini_modal, .mini_modal_link').removeClass('active')

		if ($(window).width() < 1024) {
			$('body').css('cursor', 'default')
		}

		firstClick = false
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.touch = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en': {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}


	// Всплывающие окна
	$('body').on('click', '.modal_link', function (e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src: $(this).attr('href'),
			type: 'inline'
		})
	})

	// Закрытие всплывающего окна по произвольной кнопке
	$('body').on('click', '.modal .close', function (e) {
		e.preventDefault()

		$.fancybox.close(true)
	})


	// Увеличение картинки
	$('.fancy_img').fancybox()


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')
		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let minimum = parseFloat(input.data('minimum'))
		let step = parseFloat(input.data('step'))

		if (inputVal > minimum) {
			input.val(inputVal - step)
		}

		if ($(this).closest('.product_info')) {
			let price = $(this).closest('.product_info').find('.price').data('price')
			let totalPrice = price * (inputVal - step)

			$('.product_info .info .price .total .count').text(inputVal - step)
			$('.product_info .info .price .total .val').text(totalPrice)
		}
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')
		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let maximum = parseFloat(input.data('maximum'))
		let step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)
		}

		if ($(this).closest('.product_info')) {
			let price = $(this).closest('.product_info').find('.price').data('price')
			let totalPrice = price * (inputVal + step)

			$('.product_info .info .price .total .count').text(inputVal + step)
			$('.product_info .info .price .total .val').text(totalPrice)
		}
	})


	$('body').on('keydown', '.product_info .amount .input', function () {
		var _self = $(this)
		var price = $(this).closest('.product_info').find('.price').data('price')

		setTimeout(function () {
			$('.product_info .info .price .total .count').text(_self.val())
			$('.product_info .info .price .total .val').text(price * parseInt(_self.val()))
		}, 10)
	})


	// Аккордион
	$('body').on('click', '.accordion .item .title', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.accordion')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			parent.find('.item .title').removeClass('active')
			parent.find('.item .data').slideUp(300)

			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs button', function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				$activeTabContent = $(activeTab),
				level = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab = $('.tabs button[data-content=' + locationHash + ']'),
			$activeTabContent = $(locationHash),
			$parent = $activeTab.closest('.tabs_container'),
			level = $activeTab.data('level')

		$parent.find('.tabs:first button').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Моб. меню
	$('body').on('click', 'header .mob_menu_link', function (e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')

			$('header .links, header .menu').fadeOut(200)
		} else {
			$(this).addClass('active')

			$('header .links, header .menu').fadeIn(300)
		}
	})

	if (is_touch_device()) {
		$('header .menu .item > a.sub_link').addClass('touch_link')

		$('body').on('click', 'header .menu .item > a.touch_link', function (e) {
			if ($(this).next().css('visibility') == 'hidden') {
				e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')
			}
		})
	}
})



// Вспомогательные функции
function setHeight(className) {
	let maxheight = 0
	let object = $(className)

	object.each(function () {
		let elHeight = $(this).innerHeight()

		if (elHeight > maxheight) {
			maxheight = elHeight
		}
	})

	object.innerHeight(maxheight)
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
	let div = document.createElement('div')
	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'
	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}


var supportsCssVars = function () {
	var s = document.createElement('style'),
		support

	s.innerHTML = ":root { --tmp-var: bold; }"
	document.head.appendChild(s)
	support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
	s.parentNode.removeChild(s)

	return support
}