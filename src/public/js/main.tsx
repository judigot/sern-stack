/*************************************************************************
 * DON'T MIX NODE.JS AND WEB JAVASCRIPT (WEBPACK CAN'T BUNDLE SEQUELIZE) *
 *************************************************************************/

import Person from "Modules/Person";


import "styles/main.scss";

var jude = new Person("Jude", "Francis");
var personName = jude.getFullName();

alert(personName);
