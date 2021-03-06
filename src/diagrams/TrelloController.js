'use strict';

var _ = require('lodash');
function TrelloController($scope, $window, common) {

    var TRELLO = require("trello");
    var key = 'ad45511c1d9c9c7290bbf4d51da60443';
    var token = 'dfc6c26108d630efc07d9f23f9bed1f1c109f27b6ac0933afe0deb369ab2db5b';
    var trello = new TRELLO(key, token);
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn('TrelloController');
    $scope.isTrelloActive = false;
    $scope.boards = [];
    $scope.ourLists = [];
    $scope.shortUrl = "";
    $scope.toggle = function () {
        $scope.isTrelloActive = !$scope.isTrelloActive;
    };
    $scope.getBoards = function() {
        trello.getBoards('me', function (error, boards) {
            if (error) {
                log("Could Not Get Boards: ", error);
            } else {
                log("found " + boards.length + " boards");
                $scope.boards = boards;
                $scope.getLists();
            }
        });
    };

    $scope.getLists=function getLists(){
        for (var i=0; i<$scope.boards.length; i++){
            $scope.getListsWithBoardId($scope.boards[i].id, i);
        }
    };

    $scope.getListsWithBoardId = function getListsWithBoardId(boardId, index){
        trello.getListsOnBoard(boardId, function(error, lists){
            if (error) {
                log("Could Not Get Boards: ", error);
            } else {
                log("found " + lists.length + " lists on board:"+boardId);
                $scope.boards[index].lists = lists;
            }
        });
    };

    $scope.$watch('threatEditForm.boardInput', function(newVal, oldVal){
        if(newVal!=oldVal) {
            if (newVal && newVal.id) {
                log("new value had id: " + newVal);
                $scope.getListsFromDictionary(newVal.id);
                $scope.shortUrl = newVal.shortUrl;
            }
        }
    }, true);

    $scope.getListsFromDictionary = function getListsFromDictionary(boardId){
        for (var i=0; i<$scope.boards.length; i++) {
            if($scope.boards[i].id == boardId){
                $scope.ourLists = $scope.boards[i].lists;
                log("Found Lists: " + $scope.ourLists);
                break;
            }
        }
    };

    $scope.addCard = function (cardName, cardDescription, listId){
        log("List ID: "+listId);
        if(cardName==""  || !listId){
            log("Card Error: undefined parameters");
            return;
        }else{
            trello.addCard(cardName, cardDescription, listId, function (error, cardAdded) {
                if (error) {
                    log("Could Not Add Card: "+ error);
                } else if(cardAdded) {
                    log("Card added: " + cardAdded.name);
                    $scope.toggle();
                    $scope.$apply();
                }
            });
        }
    };

    $scope.goToBoard = function () {
        $window.open($scope.shortUrl);
    };

}module.exports = TrelloController;
