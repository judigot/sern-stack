import Database from "app/Classes/Database";
import Person from "app/Classes/Person";

var DB = new Database();
var jude = new Person("Jude", "Francis");
var personName = jude.getFullName();

alert(personName);
alert(DB.helloWorld());
