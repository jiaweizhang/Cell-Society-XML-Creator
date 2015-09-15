var app = angular.module('myApp', []);

app.controller('mainController', function ($scope) {

    $scope.submit = function () {
        /*var allSquares = new Array();
        for (var i = 0; i < $scope.obj.row; i++) {
            for (var j = 0; j < $scope.obj.col; j++) {
                console.log(i, j);
                var charArray = new Array();
                //var thisSquare = new Object();
                for (var k = 0; k < $scope.choices.length; k++) {
                    var thisSquare = {};
                    thisSquare.characteristic = {};
                    thisSquare.characteristic.name = $scope.choices[k].name;
                    thisSquare.characteristic.type = $scope.choices[k].type;
                    if (thisSquare.type == 'int') {
                        thisSquare.characteristic.value = getRandomInt($scope.choices[k].min, $scope.choices[k].max);
                    }
                    charArray.push(thisSquare.characteristic);
                }
                console.log(charArray);
                allSquares.push(charArray);
                //console.log(allSquares);
            }
        }
        var squares = new Object();
        $scope.obj.squares = squares;
        $scope.obj.squares.square = allSquares;
        // Create x2js instance with default config

        var outerScope = new Object();
        outerScope.xml = $scope.obj;*/

        var allSquares = {square:[]};

        for (var i = 0; i < $scope.obj.row; i++) {
            for (var j = 0; j < $scope.obj.col; j++) {
                var characteristic = {characteristic:[]};
                for (var k=0; k<$scope.choices.length; k++) {
                    var thisValue;
                    if ($scope.choices[k].type == 'int') {
                        thisValue = getRandomInt($scope.choices[k].min, $scope.choices[k].max);
                    } else if ($scope.choices[k].type == 'double') {
                        thisValue = getRandomArbitrary($scope.choices[k].min, $scope.choices[k].max);
                    }
                    characteristic.characteristic.push({
                        "name": $scope.choices[k].name,
                        "value": thisValue
                    });
                }
                allSquares.square.push({
                    "row" : i,
                    "col" : j,
                   "characteristic" : characteristic.characteristic
                });
            }
        }
        for (var i=0; i<$scope.globalChoices.length; i++) {
            console.log($scope.globalChoices[i].globalcharname, $scope.globalChoices[i].value);
        }
        //console.log($scope.globalChoices);


        var x2js = new X2JS();

        var allGlobalChars = {chars:[]};

        for (var m=0; m<$scope.globalChoices.length; m++) {
            var globalcharname = $scope.globalChoices[m].globalcharname;
            var value = $scope.globalChoices[m].value;
            allGlobalChars.chars.push({
                "name": globalcharname,
                "value": value
            });
        }

        var outerScope = {
            global: allGlobalChars,
            rows: $scope.obj.row,
            cols: $scope.obj.col,
            squares: allSquares};

        var outestScope = {file: outerScope};

        var xmlAsStr = x2js.json2xml_str(outestScope);

        $scope.xmlResult = xmlAsStr;
    }

    function getRandomInt(min, max) {
        min = parseInt(min);
        max = parseInt(max);
        console.log(Math.floor(Math.random() * (max - min + 1)) + min);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArbitrary(min, max) {
        min = parseDouble(min);
        max = parseDouble(max);
        return Math.random() * (max - min) + min;
    }

    $scope.add = function () {

    }

    $scope.choices = [{id: 'choice1'}];
    $scope.globalChoices = [{row: 'global1'}];

    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length + 1;
        $scope.choices.push({'id': 'choice' + newItemNo});
    };

    $scope.removeChoice = function () {
        var lastItem = $scope.choices.length - 1;
        $scope.choices.splice(lastItem);
    };

    $scope.addNewGlobalChoice = function () {
        var newItemNo = $scope.globalChoices.length + 1;
        $scope.globalChoices.push({'id': 'global' + newItemNo});
    };

    $scope.removeGlobalChoice = function () {
        var lastItem = $scope.globalChoices.length - 1;
        $scope.globalChoices.splice(lastItem);
    };

    $scope.randomCharacteristic = function () {

    }


    $scope.init = function () {
        $scope.pageTitle = "Cell Society XML Generator";
        $scope.obj = new Object();
    }

    $scope.init();
})