/*************************************************************************
 * DON'T MIX NODE.JS AND WEB JAVASCRIPT (WEBPACK CAN'T BUNDLE SEQUELIZE) *
 *************************************************************************/

import Person from "Classes/Person";

import { Component as ParentComponent } from "components/react";

import "styles/main.scss";

ParentComponent("root");

var jude = new Person("Jude", "Francis");
var personName = jude.getFullName();

alert(personName);
