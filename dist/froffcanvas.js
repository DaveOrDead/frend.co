(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Froffcanvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var elemSelector = {};
var elemToggle = {};
var namespace = 'froffcanvas';

var Froffcanvas = function Froffcanvas() {
	var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-offcanvas' : arguments[0];
	var toggle = arguments.length <= 1 || arguments[1] === undefined ? '.js-fr-offcanvas-toggle' : arguments[1];

	elemSelector = document.querySelector(selector);
	elemToggle = document.querySelector(toggle);

	function init() {
		bindPointer();
	}

	//	Add event bindings
	function bindPointer() {
		elemToggle.addEventListener('click', eventPointer);
	}
	function bindDocumentKey() {
		document.addEventListener('keyup', eventDocumentKey);
	}
	function bindDocumentClick() {
		document.addEventListener('click', eventDocumentClick);
	}

	//	Remove event bindings
	function unbindDocumentKey() {
		document.removeEventListener('keyup', eventDocumentKey);
	}
	function unbindDocumentClick() {
		document.removeEventListener('click', eventDocumentClick);
	}

	//	Event handlers
	function eventPointer() {
		if (elemSelector.getAttribute('aria-hidden') == 'false') {
			hideOffcanvas();
		} else {
			showOffcanvas();
		}
	}
	function eventDocumentKey(e) {
		//	esc key
		if (e.keyCode === 27) hideOffcanvas();
	}
	function eventDocumentClick(e) {
		//	check if target is offcanvas or child of
		var isOffcanvas = e.target == elemSelector;
		var childOfOffcanvas = checkParent(e.target, elemSelector);
		if (!isOffcanvas && !childOfOffcanvas) hideOffcanvas();
	}

	//	Toggle component
	function showOffcanvas() {
		//	undo aria-hidden, add focus
		elemSelector.setAttribute('aria-hidden', false);
		elemSelector.setAttribute('tabindex', 0);
		elemSelector.focus();
		//	bind document close events
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		setTimeout(bindDocumentKey, 0); // this isn't working for enter, works for space though. WTF.
		setTimeout(bindDocumentClick, 0);
	}
	function hideOffcanvas() {
		//	set aria-hidden, remove focus
		elemSelector.setAttribute('aria-hidden', true);
		elemSelector.setAttribute('tabindex', -1);
		elemSelector.blur();
		//	unbind document close events
		unbindDocumentKey();
		unbindDocumentClick();
	}

	//	DOM utils
	function checkParent(elem, parent) {
		var parentNode = elem.parentNode;
		while (parentNode != null) {
			if (parentNode == parent) return true;
			parentNode = parentNode.parentNode;
		}
		return false;
	}

	//	Run
	if (elemSelector) init();
};

// module exports
exports.default = Froffcanvas;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy9vZmZjYW52YXMvb2ZmY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7OztBQUdiLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDOztBQUdoQyxJQUFJLFdBQVcsR0FBRyxTQUFkLFdBQVcsR0FBK0U7S0FBbkUsUUFBUSx5REFBRyxrQkFBa0I7S0FBRSxNQUFNLHlEQUFHLHlCQUF5Qjs7QUFHM0YsYUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsV0FBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRzVDLFVBQVMsSUFBSSxHQUFHO0FBQ2YsYUFBVyxFQUFFLENBQUM7RUFDZDs7O0FBQUEsQUFJRCxVQUFTLFdBQVcsR0FBRztBQUN0QixZQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0VBQ25EO0FBQ0QsVUFBUyxlQUFlLEdBQUc7QUFDMUIsVUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3JEO0FBQ0QsVUFBUyxpQkFBaUIsR0FBRztBQUM1QixVQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7RUFDdkQ7OztBQUFBLEFBSUQsVUFBUyxpQkFBaUIsR0FBRztBQUM1QixVQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7RUFDeEQ7QUFDRCxVQUFTLG1CQUFtQixHQUFHO0FBQzlCLFVBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztFQUMxRDs7O0FBQUEsQUFJRCxVQUFTLFlBQVksR0FBRztBQUN2QixNQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxFQUFFO0FBQ3hELGdCQUFhLEVBQUUsQ0FBQztHQUNoQixNQUFNO0FBQ04sZ0JBQWEsRUFBRSxDQUFDO0dBQ2hCO0VBQ0Q7QUFDRCxVQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBRTs7QUFFNUIsTUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQztFQUN0QztBQUNELFVBQVMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFOztBQUU5QixNQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQztBQUMzQyxNQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzNELE1BQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsQ0FBQztFQUN2RDs7O0FBQUEsQUFJRCxVQUFTLGFBQWEsR0FBRzs7QUFFeEIsY0FBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDaEQsY0FBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsY0FBWSxDQUFDLEtBQUssRUFBRTs7O0FBQUMsQUFHckIsWUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7QUFBQyxBQUMvQixZQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDakM7QUFDRCxVQUFTLGFBQWEsR0FBRzs7QUFFeEIsY0FBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0MsY0FBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxjQUFZLENBQUMsSUFBSSxFQUFFOztBQUFDLEFBRXBCLG1CQUFpQixFQUFFLENBQUM7QUFDcEIscUJBQW1CLEVBQUUsQ0FBQztFQUN0Qjs7O0FBQUEsQUFJRCxVQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2xDLE1BQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDakMsU0FBTyxVQUFVLElBQUksSUFBSSxFQUFFO0FBQzFCLE9BQUksVUFBVSxJQUFJLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQztBQUN0QyxhQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztHQUNuQztBQUNELFNBQU8sS0FBSyxDQUFDO0VBQ2I7OztBQUFBLEFBSUQsS0FBSSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDekI7OztBQUFBLGtCQUljLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmxldCBlbGVtU2VsZWN0b3IgPSB7fTtcbmxldCBlbGVtVG9nZ2xlID0ge307XG5jb25zdCBuYW1lc3BhY2UgPSAnZnJvZmZjYW52YXMnO1xuXG5cbmxldCBGcm9mZmNhbnZhcyA9IGZ1bmN0aW9uKHNlbGVjdG9yID0gJy5qcy1mci1vZmZjYW52YXMnLCB0b2dnbGUgPSAnLmpzLWZyLW9mZmNhbnZhcy10b2dnbGUnKSB7XG5cblxuXHRlbGVtU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblx0ZWxlbVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlKTtcblxuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0YmluZFBvaW50ZXIoKTtcblx0fVxuXG5cblx0Ly9cdEFkZCBldmVudCBiaW5kaW5nc1xuXHRmdW5jdGlvbiBiaW5kUG9pbnRlcigpIHtcblx0XHRlbGVtVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRQb2ludGVyKTtcblx0fVxuXHRmdW5jdGlvbiBiaW5kRG9jdW1lbnRLZXkoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudERvY3VtZW50S2V5KTtcblx0fVxuXHRmdW5jdGlvbiBiaW5kRG9jdW1lbnRDbGljaygpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50RG9jdW1lbnRDbGljayk7XG5cdH1cblxuXG5cdC8vXHRSZW1vdmUgZXZlbnQgYmluZGluZ3Ncblx0ZnVuY3Rpb24gdW5iaW5kRG9jdW1lbnRLZXkoKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudERvY3VtZW50S2V5KTtcblx0fVxuXHRmdW5jdGlvbiB1bmJpbmREb2N1bWVudENsaWNrKCkge1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnREb2N1bWVudENsaWNrKTtcblx0fVxuXG5cblx0Ly9cdEV2ZW50IGhhbmRsZXJzXG5cdGZ1bmN0aW9uIGV2ZW50UG9pbnRlcigpIHtcblx0XHRpZiAoZWxlbVNlbGVjdG9yLmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSA9PSAnZmFsc2UnKSB7XG5cdFx0XHRoaWRlT2ZmY2FudmFzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNob3dPZmZjYW52YXMoKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZXZlbnREb2N1bWVudEtleShlKSB7XG5cdFx0Ly9cdGVzYyBrZXlcblx0XHRpZiAoZS5rZXlDb2RlID09PSAyNykgaGlkZU9mZmNhbnZhcygpO1xuXHR9XG5cdGZ1bmN0aW9uIGV2ZW50RG9jdW1lbnRDbGljayhlKSB7XG5cdFx0Ly9cdGNoZWNrIGlmIHRhcmdldCBpcyBvZmZjYW52YXMgb3IgY2hpbGQgb2Zcblx0XHRsZXQgaXNPZmZjYW52YXMgPSBlLnRhcmdldCA9PSBlbGVtU2VsZWN0b3I7XG5cdFx0bGV0IGNoaWxkT2ZPZmZjYW52YXMgPSBjaGVja1BhcmVudChlLnRhcmdldCwgZWxlbVNlbGVjdG9yKTtcblx0XHRpZiAoIWlzT2ZmY2FudmFzICYmICFjaGlsZE9mT2ZmY2FudmFzKSBoaWRlT2ZmY2FudmFzKCk7XG5cdH1cblxuXG5cdC8vXHRUb2dnbGUgY29tcG9uZW50XG5cdGZ1bmN0aW9uIHNob3dPZmZjYW52YXMoKSB7XG5cdFx0Ly9cdHVuZG8gYXJpYS1oaWRkZW4sIGFkZCBmb2N1c1xuXHRcdGVsZW1TZWxlY3Rvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuXHRcdGVsZW1TZWxlY3Rvci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG5cdFx0ZWxlbVNlbGVjdG9yLmZvY3VzKCk7XG5cdFx0Ly9cdGJpbmQgZG9jdW1lbnQgY2xvc2UgZXZlbnRzXG5cdFx0Ly9cdHdyYXBwZWQgaW4gc2V0VGltZW91dCB0byBkZWxheSBiaW5kaW5nIHVudGlsIHByZXZpb3VzIHJlbmRlcmluZyBoYXMgY29tcGxldGVkXG5cdFx0c2V0VGltZW91dChiaW5kRG9jdW1lbnRLZXksIDApOyAvLyB0aGlzIGlzbid0IHdvcmtpbmcgZm9yIGVudGVyLCB3b3JrcyBmb3Igc3BhY2UgdGhvdWdoLiBXVEYuXG5cdFx0c2V0VGltZW91dChiaW5kRG9jdW1lbnRDbGljaywgMCk7XG5cdH1cblx0ZnVuY3Rpb24gaGlkZU9mZmNhbnZhcygpIHtcblx0XHQvL1x0c2V0IGFyaWEtaGlkZGVuLCByZW1vdmUgZm9jdXNcblx0XHRlbGVtU2VsZWN0b3Iuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHRcdGVsZW1TZWxlY3Rvci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuXHRcdGVsZW1TZWxlY3Rvci5ibHVyKCk7XG5cdFx0Ly9cdHVuYmluZCBkb2N1bWVudCBjbG9zZSBldmVudHNcblx0XHR1bmJpbmREb2N1bWVudEtleSgpO1xuXHRcdHVuYmluZERvY3VtZW50Q2xpY2soKTtcblx0fVxuXG5cblx0Ly9cdERPTSB1dGlsc1xuXHRmdW5jdGlvbiBjaGVja1BhcmVudChlbGVtLCBwYXJlbnQpIHtcblx0XHRsZXQgcGFyZW50Tm9kZSA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHR3aGlsZSAocGFyZW50Tm9kZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAocGFyZW50Tm9kZSA9PSBwYXJlbnQpIHJldHVybiB0cnVlO1xuXHRcdFx0cGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblxuXHQvL1x0UnVuXG5cdGlmIChlbGVtU2VsZWN0b3IpIGluaXQoKTtcbn1cblxuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgRnJvZmZjYW52YXM7XG4iXX0=