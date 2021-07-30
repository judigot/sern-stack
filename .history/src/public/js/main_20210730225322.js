/*************************************************************************
 * DON'T MIX NODE.JS AND WEB JAVASCRIPT (WEBPACK CAN'T BUNDLE SEQUELIZE) *
 *************************************************************************/

import Person from "app/Classes/Person";

import Database from "./app/Classes/Database";
const db = new Database();

var jude = new Person("Jude", "Francis");
var personName = jude.getFullName();

alert(personName);

db.connect();