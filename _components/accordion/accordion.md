---
filename: accordion
title: Accordion
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.js
links:
  - title: WAI ARIA Authoring Practices - Accordion
    url: https://www.w3.org/TR/wai-aria-practices/#accordion
  - title: Open Ajax Alliance - Tab Panel Accordion
    url: http://www.oaa-accessibility.org/examplep/accordian1/
---

Accordions leverage a lot of similar conventions to tab interfaces, in that they progressively disclose portions of content to the user.

Accordion components themselves can be considered `tablist`s, and declared so on their parent container. Depending on whether multiple or single panels can be expanded at one time, we can set the container's `aria-multiselectable` attribute to true or false.

To effectively progressively enhance sections of content into an accordion widget, we can start our with pairs of headings and content containers. As headings themselves aren't interactive and can't receive focus, we have the option of programatically nesting a button element within them, or managing focus and roles ourselves. This component chooses to do that latter using `tabindex` and `aria-controls` attributes, with the help of common `id`s on headers and panels. The script that supports the interactions, should also manage header `aria-selected` and `aria-expanded` states.

Panels that are inactive can be hidden using `tabindex="-1"` and `aria-hidden="true"`. This ensures only the active content is focusable at any given time.

Arrow keys can be used to navigate between header items, and Spacebar or Enter keypresses with toggle active `tabpanel`s. If `aria-multiselectable="false"` is set, then sibling panels should close and be hidden appropriately.

There is more work to do on this particular component to manage alternative keybindings (Home, End, PageUp/Down), as per the WAI-ARIA spec.

##Usage

Accordions rely on header and panel pairs, wrapped in a single container.

~~~ html
<div class="fr-accordion js-fr-accordion">
	<h2 id="accordion-header-1" class="fr-accordion__header">...</h2>	
	<div id="accordion-panel-1" class="fr-accordion__panel">
		...
	</div>
	<h2 id="accordion-header-2" class="fr-accordion__header">...</h2>	
	<div id="accordion-panel-2" class="fr-accordion__panel">
		...
	</div>
	<h2 id="accordion-header-3" class="fr-accordion__header">...</h2>	
	<div id="accordion-panel-3" class="fr-accordion__panel">
		...
	</div>
</div>
~~~

Assign the function invocation to a variable.

~~~ js
var myAccordion = Fraccordion();
~~~

###Methods

~~~ js
// remove all bindings and attributes when no longer needed
myAccordion.destroy();

// re-initialise as needed
myAccordion.init();
~~~

###Options

~~~ js
var myAccordion = Fraccordion({
	selector: '.js-fr-accordion',
	// outer container selector, hook for JS init() method
	
	headerSelector: '.fr-accordion__header',
	// accordion header elements converted to focusable, togglable elements

	headerIdPrefix: 'accordion-header',
	// use header id on element to tie each accordion panel to its header
	// see panelIdPrefix

	panelSelector: '.fr-accordion__panel',
	// accordion panel elements to expand/collapse
	
	panelIdPrefix: 'accordion-panel',
	// use panel id on element to tie each accordion header to its panel
	// see headerIdPrefix
	
	firstPanelsOpenByDefault: true, 
	// if set to false, all accordion panels will be closed on init()
	
	multiselectable: true, 
	// if set to false, each accordion instance will only allow a single panel to be open at a time
	
	readyClass: 'has-fr-accordion'
	// class name that will be added to <html> as accordion is initialised
	
});
~~~