'use strict';

// Set Array prototype on NodeList for forEach() support
// https://gist.github.com/paulirish/12fb951a8b893a454b32#gistcomment-1474959
NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * @param {object} options Object containing configuration overrides
 */
const Frbypasslinks = function({
		selector: selector = '.js-fr-bypasslinks'
	} = {}) {


	//	CONSTANTS
	const doc = document;


	//	SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window)) return;


	//	SETUP
	// get bypass links NodeList
	const container = doc.querySelector(selector);

	//	TEMP
	let currTarget = null;


	//	ACTIONS
	function _addFocusability (link) {
		//	get target element
		let id = link.getAttribute('href').slice(1);
		let target = doc.getElementById(id);
		//	set tabindex to allow focus
		target.setAttribute('tabindex', -1);
	}
	function _removeFocusability (link) {
		//	get target element
		let id = link.getAttribute('href').slice(1);
		let target = doc.getElementById(id);
		//	remove ability to focus (stops user highlighting element on click)
		target.removeAttribute('tabindex');
	}
	function destroy () {
		//	get all bypass links
		const links = container.querySelectorAll('a');
		//	loop through each bypass link and remove event bindings
		links.forEach(link => {
			_unbindPointerClick(link)
			_addFocusability(link);
		});
		if (currTarget) _unbindTargetBlur(currTarget);
	}


	//	EVENTS
	function _eventPointerClick (e) {
		//	get target element
		let id = e.target.getAttribute('href').slice(1);
		let target = doc.getElementById(id);
		//	set tabindex to allow focus
		target.setAttribute('tabindex', -1);
		target.focus();
		//	save target reference
		currTarget = target;
		//	bind blur event on target
		_bindTargetBlur(target);
	}
	function _eventTargetBlur (e) {
		//	remove ability to focus (stops user highlighting element on click)
		e.target.removeAttribute('tabindex');
		//	remove target reference
		currTarget = null;
		//	unbind blur event
		_unbindTargetBlur(e.target);
	}


	//	BIND EVENTS
	function _bindPointerClick (link) {
		//	bind interaction event
		link.addEventListener('click', _eventPointerClick);
	}
	function _bindTargetBlur (target) {
		//	bind blur event on target element
		target.addEventListener('blur', _eventTargetBlur);
	}


	//	UNBIND EVENTS
	function _unbindPointerClick (link) {
		//	unbind interaction event
		link.removeEventListener('click', _eventPointerClick);
	}
	function _unbindTargetBlur (target) {
		//	unbind blur event on target element
		target.removeEventListener('blur', _eventTargetBlur);
	}


	//	INIT
	function init () {
		//	detect if bypass links exist in the document
		if (!container) return;
		//	get all bypass links
		const links = container.querySelectorAll('a');
		//	loop through each bypass link
		links.forEach(link => {
			_bindPointerClick(link);
			_removeFocusability(link);
		});
	}
	init();


	// REVEAL API
	return {
		init,
		destroy
	}
}


// module exports
export default Frbypasslinks;