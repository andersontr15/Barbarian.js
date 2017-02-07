(function(window) {
	'use strict';
	 var components = [];
	 var controllers = [];
	 var bindings = [];
	 var interpolationMatches = ['{', '}'];
	 var Barbarian = function() {
	 	return {
	 		// custom interpolation method 
	 		interpolate: function(controller) {
	 			var hasBinding = function(element) {
	 				return element.textContent.indexOf(interpolationMatches[0]) > -1 && element.textContent.indexOf(interpolationMatches[1]) > -1
	 			}
	 			var startPoint = Array.from(document.querySelectorAll('[barbarian-controller =' + controller.name + ']'));
	 			startPoint.forEach(function(c) {
		 				if(c !== null) {
		 					// lets bind some properties!
		 				var children = Array.from(c.children);

		 				// loop through node list and interpolate 
		 				children.forEach(function(child) {
		 					if(hasBinding(child) === true) {
		 						var value = child.textContent.slice(1, child.textContent.lastIndexOf('}'));
		 						if(value !== null && controller.properties.hasOwnProperty(value)) {
		 							child.textContent = controller.properties[value];
		 						}
		 					}
		 				});
	 				}
	 			})
	 		},
	 		makeController: function(name, properties) {
	 			var controller = {
	 				name: name,
	 				properties: properties
	 			};
	 			controllers.push(controller);
	 			this.interpolate(controller);
	 		},
	 		makeComponent: function(object) {
	 			const name = object.name;
	 			const text = object.text;
	 			const selector = object.selector;
	 			const bindTo = object.bindTo;
	 			const properties = object.properties;

	 			var element = document.createElement(selector);
	 			element.textContent = text;
	 			for(var prop in properties) {
	 				element.setAttribute('data-' + prop, properties[prop])
	 			}
	 			var elementToBindTo = document.querySelector(bindTo);

	 			elementToBindTo.appendChild(element);
	 			components.push({
	 				name: name,
	 				text: text,
	 				selector: selector,
	 				bindTo: bindTo,
	 				properties: properties,
	 				element: element
	 			});
	 			return element;
	 		}
	 	};
	 } 
	 window.Barbarian = Barbarian;
}(window));
