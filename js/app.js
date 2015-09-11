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
                    characteristic.characteristic.push( {
                        "name" : $scope.choices[k].name,
                        "value" : thisValue
                    });
                }
                allSquares.square.push({
                    "row" : i,
                    "col" : j,
                   "characteristic" : characteristic.characteristic
                });
            }
        }


        var x2js = new X2JS();

        var outerScope = {
            rows: $scope.obj.row,
            cols: $scope.obj.col,
            squares: allSquares};

        var outestScope = {file: outerScope};

        var xmlAsStr = x2js.json2xml_str(outestScope);

        $scope.xmlResult = xmlAsStr;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    $scope.add = function () {

    }

    $scope.choices = [{id: 'choice1'}];

    $scope.addNewChoice = function () {
        var newItemNo = $scope.choices.length + 1;
        $scope.choices.push({'id': 'choice' + newItemNo});
    };

    $scope.removeChoice = function () {
        var lastItem = $scope.choices.length - 1;
        $scope.choices.splice(lastItem);
    };

    $scope.randomCharacteristic = function () {

    }


    $scope.init = function () {
        $scope.pageTitle = "Cell Society XML Generator";
        $scope.obj = new Object();
    }

    $scope.init();
})