/**
* jQuery Showhide plugin
* (с) Cuprum, http://cuprum.name
*/

(function( $, window, document, undefined ) {
	'use strict';

	var pluginName = 'showHide',
		defaults = {
			cookieName : ( window.location.host + window.location.pathname ).replace( /\//g, '-' ),
			visible : false,
			time : 400,
			clickElem : null,
			clickElemClassVisible : 'visible',
			clickElemClassHidden : 'hidden',
			foldElem : null,
			cookieExpires : 30,
			cookiePath : '/'
		},
		counter = 0;

	function storeElsPos( elsLength, visible ) {
		var i,
			arr = [],
			item = visible ? 1 : 0;

		for ( i = 0; i < elsLength; i++ ) {
			arr.push( item );
		}

		return arr;
	}

	function Plugin( element, options, i, counter ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options );
		this.i = i;
		this.init( counter );
	}

	Plugin.prototype = {
		init : function( counter ) {
			var opts = this.options,
				block = $( this.element ),
				clickable = opts.clickElem ? block.find( opts.clickElem ) : block.find( '> :first-child' ),
				foldable = opts.foldElem ? block.find( opts.foldElem ) : block.find( '> :nth-child(2)' ),
				indx = this.i;

			clickable.on('click', function ( e ) {
				e.preventDefault();

				var cookieValue = $.cookie( opts.cookieName + counter );

				if ( navigator.cookieEnabled ) {
					if ( foldable.is( ':hidden' ) ) {
						cookieValue[ indx ] = 1;
						foldable
							.stop( false, true )
							.slideDown( opts.time );
					} else {
						cookieValue[ indx ] = 0;
						foldable
							.stop( false, true )
							.slideUp( opts.time );
					}
					$.cookie( opts.cookieName + counter, cookieValue, {expires: opts.cookieExpires, path: opts.cookiePath} );
				} else {
					foldable.slideToggle( opts.time );
				}
				clickable.toggleClass( opts.clickElemClassHidden + ' ' + opts.clickElemClassVisible );
			});
		}
	};

	$.fn[ pluginName ] = function( options ) {
		if ( !options || !options.cookieName ) {
			counter++;
		} else {
			counter = '';
		}

		var i,
			opts = $.extend( {}, defaults, options ),
			cookie = $.cookie( opts.cookieName + counter ),
			cookieLength = !!cookie && cookie.length,
			elsLength = this.length,
			elsPos = storeElsPos( elsLength, opts.visible ),
			clickable = opts.clickElem ? this.find( opts.clickElem ) : this.find( '> :first-child' ),
			foldable = opts.foldElem ? this.find( opts.foldElem ) : this.find( '> :nth-child(2)' ),
			locateEls = function( flag ) {
				if ( flag ) {
					$( foldable[ i ] ).show();
					$( clickable[ i ] ).addClass( opts.clickElemClassVisible );
				} else {
					$( foldable[ i ] ).hide();
					$( clickable[ i ] ).addClass( opts.clickElemClassHidden );
				}
			};

		if ( !cookie ) {
			if ( !opts.visible ) {
				foldable.hide();
				clickable.addClass( opts.clickElemClassHidden );
			} else {
				clickable.addClass( opts.clickElemClassVisible );
			}
			$.cookie( opts.cookieName + counter, elsPos, {expires: opts.cookieExpires, path: opts.cookiePath} );
		} else if ( elsLength === cookieLength ) {
			for ( i = 0; i < elsLength; i++ ) {
				locateEls( cookie[ i ] );
			}
		} else {
			for ( i = 0; i < elsLength; i++ ) {
				if ( i < cookieLength ) {
					locateEls( cookie[ i ] );
				} else {
					locateEls( opts.visible );
					cookie[ i ] = opts.visible ? 1 : 0;
				}
			}
			if ( cookieLength > elsLength ) {
				cookie.length = elsLength;
			}
			$.cookie( opts.cookieName + counter, cookie, {expires: opts.cookieExpires, path: opts.cookiePath} );
		}

		return this.each( function ( i ) {
			if ( !$.data( this, 'plugin_' + pluginName ) ) {
				$.data( this, 'plugin_' + pluginName, new Plugin( this, options, i, counter ));
			}
		});
	};

})( jQuery, window, document );