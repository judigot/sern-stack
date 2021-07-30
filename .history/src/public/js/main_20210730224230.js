/*************************************************************************
 * DON'T MIX NODE.JS AND WEB JAVASCRIPT (WEBPACK CAN'T BUNDLE SEQUELIZE) *
 *************************************************************************/

import Person from "app/Classes/Person";

var jude = new Person("Jude", "Francis");
var personName = jude.helloWorld();

alert(personName);
