angular.module('wallethubApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/item.html',
    "<div class=\"jumbotron\"> <h2>{{item.name}}</h2> <p>Email : {{item.data.email}}</p> <p>Phone: {{item.data.phone}}</p> <button type=\"button\" class=\"btn btn-default info\" ng-click=\"clickInfo()\">Rate this person</button> </div>"
  );


  $templateCache.put('views/list.html',
    "<div ui-view class=\"jumbotrom\"></div> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4>Persona Selection</h4> <div class=\"btn-group\" role=\"group\" aria-label=\"...\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"clickAlign('name')\" id=\"orderByName\">Name</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"clickAlign('pos')\" id=\"orderByPos\">Position</button> </div> <label class=\"pull-right\"> <span class=\"glyphicon glyphicon-search\"></span> <input ng-model=\"searchText\"> </label> </div> <div class=\"panel-body\"> <div class=\"list-group\"> <button type=\"button\" ng-repeat=\"d in shareData.allData | orderBy:by | filter:searchText\" class=\"list-group-item\" ng-click=\"gotoItem(d.pos)\"> <span class=\"badge\">{{(d.pos)}}</span> <label>{{d.name}}</label> </button> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Hello Wallethub!</h1> <h3> This is the Everton Melo's test. </h3> <p>I hope you analize it with a lot of love <span class=\"glyphicon glyphicon-heart\"></span></p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/list\">Start!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>About Test</h4> <p> You can check all test requirements clicking in <a href=\"#/list\">Persona selection</a>. As a good boss there you will be able to give your opnion about the note and deserve salary of a employee . After you can fill your phone number and a suposed barcode where you can use any characters. </p> <h4>Tools</h4> <p>In this test I have used Yeoman to scaffolding the project. All dependencies are in Bower and you can run this project with Grunt.</p> <h4>The only thing that missing.</h4> <p> As I didn't use any accets I have not used require.js and I hope that it won't be a bad thing in my test application. </p> </div>"
  );


  $templateCache.put('views/person.html',
    "<div class=\"container\"> <button type=\"button\" class=\"btn btn-default pull-left info\" ng-click=\"backClick()\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button> <div class=\"jumbotron\"> <h2>{{person.name}}</h2> <p>Email : {{person.data.email}}</p> <p>Phone: {{person.data.phone}}</p> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4>Notes</h4> </div> <div class=\"panel-body\"> <table class=\"table table-bordered\"> <thead> <tr> <th>your rate</th> <th>rate 1</th> <th>rate 2</th> <th>Total</th> </tr> </thead> <tbody> <tr> <td><input type=\"number\" ng-model=\"yourRate\" ng-change=\"validInputRate()\" class=\"codeInput\"></td> <td><label>{{person.data.rate1}}</label></td> <td><label>{{person.data.rate2}}</label></td> <td><input type=\"number\" ng-model=\"total\" ng-change=\"validInputTotal()\" class=\"codeInput\"></td> </tr> </tbody> </table> <table class=\"table table-bordered\"> <tbody> <tr> <th><label>deserved salary</label></th> <th><input type=\"text\" ng-model=\"salary\" format-currency placeholder=\"$$$\" class=\"codeInput\"></th> </tr> <tr> <th><label>Your phone: </label></th> <th><input type=\"text\" ng-model=\"phonenumber\" format-phone placeholder=\"(xxx)xxx-xxxx\" class=\"codeInput\"></th> </tr> </tbody> </table> <table class=\"table table-bordered\"> <thead> <tr><label>supposed barcode</label></tr> </thead> <tbody> <tr> <th> <input type=\"text\" maxlength=\"maxLen\" placeholder=\"xxxxx\" ng-change=\"changingInput('code1')\" ng-model=\"code1\" id=\"code1\" class=\"codeInput\"> </th> <th> <input type=\"text\" maxlength=\"maxLen\" placeholder=\"xxxxx\" ng-change=\"changingInput('code2')\" ng-model=\"code2\" id=\"code2\" class=\"codeInput\"> </th> <th> <input type=\"text\" maxlength=\"maxLen\" placeholder=\"xxxxx\" ng-change=\"changingInput('code3')\" ng-model=\"code3\" id=\"code3\" class=\"codeInput\"> </th> </tr> </tbody> </table> </div> </div> </div>"
  );

}]);
