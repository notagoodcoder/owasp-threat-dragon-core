'use strict';

var _ = require('lodash');

function ThreatReport($scope, $location, $routeParams, $timeout, dialogs, common, datacontext, threatengine, diagramming, threatmodellocator) {
    var vm = this;
    var controllerId = 'ThreatReport';
    var getLogFn = common.logger.getLogFn;
    var log = getLogFn(controllerId);
    var logError = getLogFn(controllerId, 'error');
    var scope = $scope;
    var severityOrder = ['low', 'medium', 'high'];
    var statusOrder = ['mitigated', 'open'];

    vm.title = 'Threat Model Report';
    vm.dirty = false;
    vm.graph = diagramming.newGraph();
    vm.currentDiagram = {};
    vm.diagramId = $routeParams.diagramId;
    vm.activateTab = activateTab;
    vm.editThreat = editThreat;
    vm.onAddNewThreat = onAddNewThreat;
    vm.reportElements = [];
    vm.sortKey = '';
    vm.reverse = false;
    vm.sort = sort;

    activate();

    function activate() {
        common.activateController([], controllerId)
            .then(function () {
                log('Activated Threat Model Report View');
                initialise();
            });
    }

    function initialise() {
        var threatModelLocation = threatmodellocator.getModelLocation($routeParams);

        datacontext.load(threatModelLocation, false).then(function (threatModel) {
                onGetThreatModelDiagram(threatModel.detail.diagrams[vm.diagramId]);
            },
            onError);

        function onGetThreatModelDiagram(data) {

            if (!_.isUndefined(data.diagramJson)) {
                vm.graph.initialise(data.diagramJson);
            }
            $timeout(function() {
                document.getElementById("defaultTab").click();
                vm.sort('name');
            });
        }

        function onError(error) {
            logError(error);
        }
    }

    function getScopedNonFlowOrBoundaryElements() {
        return vm.graph.getCells().filter(function(element) {
            return !isBoundaryElement(element) && !element.outOfScope;
        });
    }

    function activateTab(event, tabID) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabID).style.display = "block";
        event.target.className += " active";
    }

    function editThreat(threat) {
        $location.search('threat', threat.id);
        dialogs.confirm('diagrams/ThreatEditPane.html', save, function () { return { heading: 'Edit Threat', threat: threat, editing: true }; }, onCancel);
    }

    function onAddNewThreat(element) {
        var newThreat = { status: 'Open', severity: 'Medium' };
        dialogs.confirm('diagrams/ThreatEditPane.html', function () {addThreat(element, newThreat);}, function () { return { heading: 'New Threat', threat: newThreat, editing: true }; }, onCancel);
    }

    function addThreat(element, threat) {
        if (!element.threats) {
            element.threats = [];
        }
        element.threats.push(threat);
        save();
    }

    function save() {
        var diagramData = { diagramJson: { cells: vm.graph.getCells() } };
        datacontext.saveThreatModelDiagram(vm.diagramId, diagramData).then(onSave());
    }

    function onSave() {
        var oldKey = vm.sortKey;
        vm.sortKey = ''; //Change sort key to avoid reversing order
        vm.sort(oldKey);
        log('Saved Changes');
    }

    function onCancel() {
        log('Cancelled');
    }

    function isBoundaryElement(element) {
        return element.attributes.type === 'tm.Boundary';
    }

    function sort(sortKey) {
        updateSortKeyAndOrder(sortKey);
        if (vm.sortKey === 'name') {
            sortReportElementsByElementProperty();
        }
        else if (vm.sortKey === 'status') {
            sortReportElementsByThreatProperty(statusOrder);
        }
        else if (vm.sortKey === 'severity') {
            sortReportElementsByThreatProperty(severityOrder);
        }
        else if (vm.sortKey !== '') {
            sortReportElementsByThreatProperty();
        }
    }

    function sortReportElementsByElementProperty() {
        var elements = getScopedNonFlowOrBoundaryElements();
        sortArray(elements);
        if (vm.reverse && !isEmptyArray(elements)) {
            elements.reverse();
        }
        vm.reportElements = elements;
    }

    function sortReportElementsByThreatProperty(sortOrder) {
        var elements = getScopedNonFlowOrBoundaryElements();
        elements.forEach(function (element) {
            sortArray(element.threats, sortOrder);
            if (vm.reverse && !isEmptyArray(element.threats)) {
                element.threats.reverse();
            }
        });
        elements.sort(function(a, b) {
            if (isEmptyArray(a.threats)) {
                if (isEmptyArray(b.threats)) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
            if (isEmptyArray(b.threats)) {
                if (isEmptyArray(a.threats)) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
            var x;
            var y;
            if (sortOrder) {
                x = sortOrder.indexOf(a.threats[0][vm.sortKey].toLowerCase());
                y = sortOrder.indexOf(b.threats[0][vm.sortKey].toLowerCase());
            }
            else {
                x = a.threats[0][vm.sortKey].toLowerCase();
                y = b.threats[0][vm.sortKey].toLowerCase();
            }
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        if (vm.reverse && !isEmptyArray(elements)) {
            elements.reverse();
        }
        vm.reportElements = elements;
    }

    function sortArray(array, sortOrder) {
        if (isEmptyArray(array)) {
            return;
        }
        array.sort(function(a, b) {
            var x;
            var y;
            if (sortOrder) {
                x = sortOrder.indexOf(a[vm.sortKey].toLowerCase());
                y = sortOrder.indexOf(b[vm.sortKey].toLowerCase());
            }
            else {
                x = a[vm.sortKey].toLowerCase();
                y = b[vm.sortKey].toLowerCase();
            }
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }

    function updateSortKeyAndOrder(sortKey) {
        if (vm.sortKey === sortKey) { // If the key is the same, reverse the order
            vm.reverse = !vm.reverse; //if true make it false and vice versa
        }
        vm.sortKey = sortKey;
    }

    function isEmptyArray(array) {
        return (!array || array.length <= 0);
    }
}
module.exports = ThreatReport;
