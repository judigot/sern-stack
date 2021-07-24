import Database from "app/Classes/Database";
import Person from "app/Classes/Person";

var DB = new Database();
var jude = new Person("Jude", "Francis");
var personName = jude.getFullName();

alert(personName);
var QuickLog = `${DB.helloWorld()}`; document.body.appendChild(Object.assign(document.createElement("div"), { textContent: QuickLog })).style.cssText = "filter: invert(0%); color: black !important; background-color: #FFF000; font: bold 25px Comic Sans MS; box-shadow: 0px 0px 5px 1px white; padding: 5px; border: 3px solid black; border-radius: 10px; top: 10px; left: 10px; position: absolute;";

