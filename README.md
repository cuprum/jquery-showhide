#jQuery Showhide Plugin
Плагин предназначен для отображения/скрытия элементов по клику и запоминания текущего состояния.
Примеры работы можно посмотреть на [демо-странице](http://cuprum.github.io/jquery-showhide/).

##Подключение
Помимо библиотеки [jQuery](http://jquery.com/) необходимо обязательно подключить плагин [jquery.cookie](https://github.com/carhartl/jquery-cookie).

	<script src="jquery-2.0.0.min.js"></script>
	<script src="jquery.cookie.js"></script>
	<script src="jquery.showhide.js"></script>

##Вызов плагина
Перед запуском плагина требуется однократно включить поддержку JSON

	$.cookie.json = true;

вызов без параметров

	$(function () {
		$('blocks').showHide();
	});

или вызов с определенными параметрами

	$(function () {
		$('blocks').showHide({
				cookieName: 'cookie-1',
				clickElem: '.control',
				visible: true,
				time: 0
		});
	});
где `'blocks'` - представляет собой селектор jQuery; с его помощью на странице отбираются блоки, для которых будет действовать плагин.

##Параметры
Все параметры являются необязательными. В таблице приведены первоначальные значения, получаемые при вызове плагина без параметров.

Параметр | Описание | Значение по умолчанию
--- | --- | ---
**cookieName** | Имя куки | `'URL текущей страницы (имя хоста + путь)'`
**cookieExpires** | Время жизни куки, дней | `30`
**cookiePath** | Путь относительно домена | `'/'`
**visible** | Первоначальная видимость разворачиваемого элемента | `false`
**time** | Время анимации разворачиваемого элемента, мс. | `400`
**clickElem** | Выбор элемента, на котором будет отслеживаться клик. Поиск идет внутри селектора `'blocks'` | `'> :first-child'`
**foldElem** | Выбор элемента, который будет появляться/исчезать по клику. Поиск идет внутри селектора `'blocks'` | `'> :nth-child(2)'`
**clickElemClassVisible** | Устанавливает класс для **clickElem**, когда **foldElem** показан | `'visible'`
**clickElemClassHidden** | Устанавливает класс для **clickElem**, когда **foldElem** скрыт | `'hidden'`

##Демо
http://cuprum.github.io/jquery-showhide/
