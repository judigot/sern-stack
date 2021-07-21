// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/scss/bootstrap-utilities.scss';
// import 'bootstrap/scss/_modal.scss';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';

// import $ from "jquery";
// var $ = require('jquery');

// const { JSDOM } = require("jsdom");
// const { window } = new JSDOM("");
// const $ = require("jquery")(window);

// $(document).ready(function () {
//     $('#exampleModal').modal('show');
// });

var Person = require("../app/Classes/Person.ts");
var Database = require("../app/Classes/Database.ts");

var DB = new Database();
var jude = new Person("Jude", "Francis");
var personName = jude.getFullName();

alert(personName);
alert(DB.helloWorld());
