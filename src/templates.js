angular.module('templates', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('diagrams/confirmReloadOnDirty.html',
    '﻿<div>\n' +
    '    <div class="modal-header">\n' +
    '        <h3>Are you sure?</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        Your diagram has unsaved changes and if you reload they will be lost!\n' +
    '        Press \'Cancel\' to keep the unsaved changes, or press \'Reload\' to reload the diagram and lose the unsaved changes.\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button class="btn btn-default" ng-click="onOK()">Reload</button>\n' +
    '        <button class="btn btn-primary" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('diagrams/diagrameditor.html',
    '﻿<div data-ng-controller="diagram as vm" class="container-fluid diagram-container">\n' +
    '    <div ng-show="!vm.errored">\n' +
    '        <div class="col-lg-2">\n' +
    '            <!--Diagram stencil-->\n' +
    '            <uib-accordion close-others="true">\n' +
    '                <div uib-accordion-group is-open="vm.viewStencil">\n' +
    '                    <uib-accordion-heading>\n' +
    '                        Edit diagram <i class="pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': vm.viewStencil, \'glyphicon-chevron-right\': !vm.viewStencil}"></i>\n' +
    '                    </uib-accordion-heading>\n' +
    '                    <div style="overflow-y:scroll; height: 550px">\n' +
    '                        <div ng-repeat="stencil in vm.stencils">\n' +
    '                            <div style="height: 120px">\n' +
    '                                <tmt-stencil class="stencil" shape="stencil.shape" padding="15" scale="0.9" action="stencil.action()" />\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!--Threat pane-->\n' +
    '                <div uib-accordion-group is-open="vm.viewThreats">\n' +
    '                    <uib-accordion-heading>\n' +
    '                        Edit threats <i class="pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': vm.viewThreats, \'glyphicon-chevron-right\': !vm.viewThreats}"></i>\n' +
    '                    </uib-accordion-heading>\n' +
    '                    <div ng-if="vm.selected">\n' +
    '                        <div ng-if="!vm.selected.outOfScope">\n' +
    '                            <tmt-element-threats threats="vm.selected.threats" save="vm.edit()" />\n' +
    '                        </div>\n' +
    '                        <div ng-if="vm.selected.outOfScope">\n' +
    '                            <em>The selected element is out of scope</em>\n' +
    '                        </div>                       \n' +
    '                    </div>\n' +
    '                    <div ng-if="!vm.selected">\n' +
    '                        <em>Select an element in the diagram to see or edit its threats</em>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <a class="btn btn-primary center-block" ng-click="vm.generateThreatsForEmptyNodesAndViewReport()" role="button">View Threat Report</a>\n' +
    '            </uib-accordion>\n' +
    '        </div>\n' +
    '        <!--Diagram area-->\n' +
    '        <div class="col-lg-8">\n' +
    '            <div class="panel panel-default">\n' +
    '                <div ng-if="!vm.diagram.title" class="panel-heading panel-title">\n' +
    '                    <span>Loading...</span>\n' +
    '                </div>\n' +
    '                <div ng-if="vm.diagram.title" class="panel-heading panel-title">\n' +
    '                    <span editable-text="vm.diagram.title" onaftersave="vm.save()" e-form="diagramTitleInput" e-required e-placeholder="Diagram title">{{ vm.diagram.title }}</span>\n' +
    '                    <span class="pull-right glyphicon glyphicon-edit" ng-click="diagramTitleInput.$show()" ng-hide="diagramTitleInput.$visible"></span>\n' +
    '                </div>\n' +
    '                <div class="panel-body">\n' +
    '                    <form name="diagramEditToolBar">\n' +
    '                        <div class="col-md-12">\n' +
    '                            <div class="btn-group pull-left" role="group">\n' +
    '                                <a class="btn btn-default" href="#/threatmodel/{{vm.getThreatModelPath()}}" role="button" data-toggle="tooltip" data-placement="top" title="Cancel Edit">\n' +
    '                                    <span class="glyphicon glyphicon-remove"></span>\n' +
    '                                </a>\n' +
    '                                <button class="btn btn-default" type="button" ng-disabled="vm.currentZoomLevel == vm.maxZoom"  data-toggle="tooltip" ng-click="vm.zoomIn()" data-placement="top" title="Zoom in">\n' +
    '                                    <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>\n' +
    '                                </button>\n' +
    '                                <button class="btn btn-default" type="button" ng-disabled="vm.currentZoomLevel == -vm.maxZoom" data-toggle="tooltip" ng-click="vm.zoomOut()" data-placement="top" title="Zoom out">\n' +
    '                                    <span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span>\n' +
    '                                </button>\n' +
    '                                <button class="btn btn-default" type="button" data-toggle="tooltip" ng-click="vm.clear()" data-placement="top" title="Delete All Elements From This Diagram">\n' +
    '                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>\n' +
    '                                </button>\n' +
    '                                <button class="btn btn-default" ng-disabled="!vm.dirty" type="button" data-toggle="tooltip" ng-click="vm.reload()" data-placement="top" title="Discard Changes And Reopen Diagram">\n' +
    '                                    <span class="fa fa-undo" aria-hidden="true"></span>\n' +
    '                                </button>\n' +
    '                                <button class="btn btn-default" ng-disabled="vm.selected == null || vm.selected.outOfScope" type="button" data-toggle="tooltip" ng-click="vm.generateThreats()" data-placement="top" title="Suggest threats for the selected element">\n' +
    '                                    <span class="glyphicon glyphicon-flash" aria-hidden="true"></span>\n' +
    '                                </button>\n' +
    '                                <button class="btn btn-default" ng-disabled="!vm.dirty" type="button" data-toggle="tooltip" ng-click="vm.save()" data-placement="top" title="Save This Diagram">\n' +
    '                                    <span class="glyphicon glyphicon-save" aria-hidden="true"></span>\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </form>\n' +
    '                    <div class="tmt-diagram-container">\n' +
    '                        <tmt-diagram graph="vm.graph" select="vm.select(element)" new-flow="vm.newFlow(source, target)" initialise-graph="vm.initialise(diagram)" height="600" width="800" grid-size="1" interactive="true"></tmt-diagram>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!--Element properties-->\n' +
    '        <div class="col-lg-2">\n' +
    '            <div class="panel panel-default">\n' +
    '                <div class="panel-heading panel-title">Properties</div>\n' +
    '                <div class="panel-body">\n' +
    '                    <div ng-if="vm.selected && vm.selected.attributes.type != \'tm.Boundary\' ">\n' +
    '                        <tmt-element-properties edit=" vm.edit()" selected="vm.selected" element-type="{{vm.selected.attributes.type}}"></tmt-element-properties>\n' +
    '                    </div>\n' +
    '                    <div ng-if="!vm.selected || vm.selected.attributes.type === \'tm.Boundary\'">\n' +
    '                        <em>Select an element in the diagram to see or edit its properties</em>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--Error content-->\n' +
    '    <div ng-show="vm.errored">\n' +
    '        <div class="jumbotron">\n' +
    '            <h1>oooops!</h1>\n' +
    '            <p>\n' +
    '                It looks like you tried to edit a threat model diagram that doesn\'t exist. Maybe you typed the\n' +
    '                address wrong? Or if you clicked a link to get here, the diagram might have been\n' +
    '                deleted since you made the link <span class="fa fa-frown-o"></span>\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                <a href="#">Take me home</a>\n' +
    '            </p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="vm.generatingThreats">\n' +
    '        <div class="spinner"></div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('diagrams/ElementPropertiesPane.html',
    '﻿<form name="elementPropertiesEditForm">\n' +
    '    <div>\n' +
    '        <div class="form-group">\n' +
    '            <label>Name</label>\n' +
    '            <input name="nameInput" class="form-control" type="text" ng-model="selected.name" ng-change="edit()" placeholder="Element name" />\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="checkbox">\n' +
    '        <label>\n' +
    '            <input name="checkboxOutOfScope" type="checkbox" ng-model="selected.outOfScope" ng-change="edit()" /> Out of scope\n' +
    '        </label>\n' +
    '    </div>\n' +
    '    <div class="form-group">\n' +
    '        <label>Reason for out of scope</label>\n' +
    '        <textarea name="textareaReasonOutOfScope" ng-disabled="!selected.outOfScope" rows="4" class="form-control" type="text" ng-model="selected.reasonOutOfScope" ng-change="edit()" placeholder="Reason for out of scope"></textarea>\n' +
    '    </div>\n' +
    '    <div ng-show="elementType === \'tm.Process\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForProcess" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForProcess = false" checked /> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedProcess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedProcess" ng-change="edit()" ng-init="selected.isEncryptedProcess = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForProcess" ng-if="selected.isEncryptedProcess">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option></option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguageProcess" ng-change="edit()" ng-init="selected.programmingLanguageProcess = false" checked /> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="checkboxProgrammingLanguageProcess" ng-if="selected.programmingLanguageProcess">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsWebApplication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isAWebApplication" ng-change="edit()" ng-init="selected.isAWebApplication = false" checked/> Web Application\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsANetworkSwitch" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isANetworkSwitch" ng-change="edit()" ng-init="selected.isANetworkSwitch = false" checked/> Network Switch\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsRoutingProcess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isARoutingProcess" ng-change="edit()" ng-init="selected.isARoutingProcess = false" checked/> Network Router or Gateway\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsWirelessAccessProcess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isAWirelessAccessProcess" ng-change="edit()" ng-init="selected.isAWirelessAccessProcess = false" checked/> Wireless Access Point\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsConfigurationProcess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isAConfigurationProcess" ng-change="edit()" ng-init="selected.isAConfigurationProcess = false" checked/> Configuration Server (Free-Radius, DHCP, Cert Management, etc.)\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsIPSecHostProcess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isAIPSecHostProcess" ng-change="edit()" ng-init="selected.isAIPSecHostProcess = false" checked/> IPSec Host\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationProcess" ng-change="edit()" ng-init="selected.providesAuthenticationProcess = false" checked /> Provides Authentication\n' +
    '            </label>\n' +
    '            <select ng-if="selected.providesAuthenticationProcess">\n' +
    '                <option value="ldap">LDAP</option>\n' +
    '                <option value="kerberos">Kerberos</option>\n' +
    '                <option value="oauth2">Oauth 2</option>\n' +
    '                <option value="saml">Saml</option>\n' +
    '                <option value="radius">Radius</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogProcess" ng-change="edit()" ng-init="selected.isALogProcess = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUsesExternalResources" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.usesExternalResourcesProcess" ng-change="edit()" ng-init="selected.usesExternalResourcesProcess = false" checked/> Uses External Resources\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUsesResourcesDirectly" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.usesResourcesDirectlyProcess" ng-change="edit()" ng-init="selected.usesResourcesDirectlyProcess = false" checked/> Directly Uses Resources\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidatesCert" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesCertProcess" ng-change="edit()" ng-init="selected.validatesCertProcess = false" checked/> Validates Certificate\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxLocalAccess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.localAccessProcess" ng-change="edit()" ng-init="selected.localAccessProcess = false" checked/> Has Local Access to File(s)\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputProcess" ng-change="edit()" ng-init="selected.validatesInputProcess = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateXML" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validateXMLProcess" ng-change="edit()" ng-init="selected.validateXMLProcess = false" checked/> Validates XML Schema\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUserInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.userInputProcess" ng-change="edit()" ng-init="selected.userInputProcess = false" checked/> Accepts User Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxThirdParty" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.thirdPartyProcess" ng-change="edit()" ng-init="selected.thirdPartyProcess = false" checked/> Uses Third Party Libraries\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-show="elementType === \'tm.Actor\'">\n' +
    '\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationActor" ng-change="edit()" ng-init="selected.providesAuthenticationActor = false" checked /> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '            <select id = "authType" ng-if="selected.providesAuthenticationActor">\n' +
    '                <option value="ldap">LDAP</option>\n' +
    '                <option value="kerberos">Kerberos</option>\n' +
    '                <option value="oauth2">Oauth 2</option>\n' +
    '                <option value="saml">Saml</option>\n' +
    '                <option value="radius">Radius</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedActor" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedActor" ng-change="edit()" ng-init="selected.isEncryptedActor = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForActor" ng-if="selected.isEncryptedActor">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsClientEHealthDevice" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.clientEHealthDevice" ng-change="edit()" ng-init="selected.clientEHealthDevice = false" checked/> Client eHealth Device\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsMobileDevice" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.mobileDevice" ng-change="edit()" ng-init="selected.mobileDevice = false" checked/> Mobile Device\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsDesktopDevice" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.desktopDevice" ng-change="edit()" ng-init="selected.desktopDevice = false" checked/> Desktop Device\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresHealthDataLocally" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesHealthDataLocally" ng-change="edit()" ng-init="selected.storesHealthDataLocally = false" checked/> Stores Health Data Locally\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxForwardsHealthDataCloud" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.forwardsHealthDataCloud" ng-change="edit()" ng-init="selected.forwardsHealthDataCloud = false" checked/> Forwards Health Data to Cloud\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForActor" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForActor = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-show="elementType === \'tm.Store\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationStore" ng-change="edit()" ng-init="selected.providesAuthenticationStore = false" checked /> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxRemoteMedicalRecordStorage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.remoteMedicalRecordStorageStore" ng-change="edit()" ng-init="selected.remoteMedicalRecordStorageStore = false" checked/> Remote Storage of Medical Records\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogStore" ng-change="edit()" ng-init="selected.isALogStore = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresCredentials" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesCredentialsStore" ng-change="edit()" ng-init="selected.storesCredentialsStore = false" checked/> Stores Credentials\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedStore" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedStore" ng-change="edit()" ng-init="selected.isEncryptedStore = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForStore" ng-if="selected.isEncryptedStore">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsSigned" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isSignedStore" ng-change="edit()" ng-init="selected.isSignedStore = false" checked/> Is Signed\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUsesExternalResources" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.usesExternalResourcesStore" ng-change="edit()" ng-init="selected.usesExternalResourcesStore = false" checked/> Uses External Resources\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUsesResourcesDirectly" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.usesResourcesDirectlyStore" ng-change="edit()" ng-init="selected.usesResourcesDirectlyStore = false" checked/> Directly Uses Resources\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidatesCert" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesCertStore" ng-change="edit()" ng-init="selected.validatesCertStore = false" checked/> Validates Certificate\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxLocalAccess" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.localAccessStore" ng-change="edit()" ng-init="selected.localAccessStore = false" checked/> Has Local Access to File(s)\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidatesInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputStore" ng-change="edit()" ng-init="selected.validatesInputStore = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUserInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.userInputStore" ng-change="edit()" ng-init="selected.userInputStore = false" checked/> Accepts User Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxThirdParty" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.thirdPartyStore" ng-change="edit()" ng-init="selected.thirdPartyStore = false" checked/> Uses Third Party Libraries\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForStore" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForStore = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="elementType === \'tm.Flow\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedFlow" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedFlow" ng-change="edit()" ng-init="selected.isEncryptedFlow = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForFlow" ng-if="selected.isEncryptedFlow">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsPublicNetwork" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isPublicNetwork" ng-change="edit()" ng-init="selected.isPublicNetwork = false" checked/> Link Over Public Network\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxBluetoothInterface" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.bluetoothInterface" ng-change="edit()" ng-init="selected.bluetoothInterface = false" checked/> Bluetooth Interface Link\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxWiFiInterface" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.wifiInterface" ng-change="edit()" ng-init="selected.wifiInterface = false" checked/> Wi-Fi Interface Link\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxCellularInterface" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.cellularInterface" ng-change="edit()" ng-init="selected.cellularInterface = false" checked/> Cellular Interface Link\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxTLS" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.usesTLS" ng-change="edit()" ng-init="selected.usesTLS = false" checked/> Uses TLS\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-show="elementType === \'tm.MobilePhone\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationMobilePhone" ng-change="edit()" ng-init="selected.providesAuthenticationMobilePhone = false" checked /> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedMobilePhone" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedMobilePhone" ng-change="edit()" ng-init="selected.isEncryptedMobilePhone = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForMobilePhone" ng-if="selected.isEncryptedMobilePhone">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguageMobilePhone" ng-change="edit()" ng-init="selected.programmingLanguageMobilePhone = false" checked/> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="checkboxProgrammingLanguageMobilePhone" ng-if="selected.programmingLanguageMobilePhone">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxHasPasswordPolicy" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.hasPasswordPolicyMobilePhone" ng-change="edit()" ng-init="selected.hasPasswordPolicyMobilePhone = false" checked/> Has a password Policy?\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxSanitizesInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.inputSanitizationMobilePhone" ng-change="edit()" ng-init="selected.inputSanitizationMobilePhone = false" checked/> Is input sanitized?\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresMedicalRecords" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesMedicalRecordsMobilePhone" ng-change="edit()" ng-init="selected.storesMedicalRecordsMobilePhone = false" checked/> Stores personal health information (PHI).\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresPI" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesPIMobilePhone" ng-change="edit()" ng-init="selected.storesPIMobilePhone = false" checked/> Stores personal information (PI).\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxUserInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.userInputMobilePhone" ng-change="edit()" ng-init="selected.userInputMobilePhone = false" checked/> Accepts User Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputMobilePhone" ng-change="edit()" ng-init="selected.validatesInputMobilePhone = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForMobilePhone" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForMobilePhone = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="elementType === \'tm.SmartWatch\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationSmartWatch" ng-change="edit()" ng-init="selected.providesAuthenticationSmartWatch = false" checked/> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogSmartWatch" ng-change="edit()" ng-init="selected.isALogSmartWatch = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidatesInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputSmartWatch" ng-change="edit()" ng-init="selected.validatesInputSmartWatch = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresCredentials" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesCredentialsSmartWatch" ng-change="edit()" ng-init="selected.storesCredentialsSmartWatch = false" checked/> Stores Credentials\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedSmartWatch" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedSmartWatch" ng-change="edit()"  ng-init="selected.isEncryptedSmartWatch = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForSmartWatch" ng-if="selected.isEncryptedSmartWatch">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguageSmartWatch" ng-change="edit()" ng-init="selected.programmingLanguageSmartWatch = false" checked/> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="checkboxProgrammingLanguageforSmartWatch" ng-if="selected.programmingLanguageSmartWatch">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsSigned" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isSignedSmartWatch" ng-change="edit()"  ng-init="selected.isSignedSmartWatch = false" checked/> Is Signed\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxRemoteMedicalRecordStorage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.remoteMedicalRecordStorageSmartWatch" ng-change="edit()"  ng-init="selected.remoteMedicalRecordStorageSmartWatch = false" checked/> Remote Storage of Medical Records\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForSmartWatch" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForSmartWatch = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="elementType === \'tm.Laptop\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationLaptop" ng-change="edit()" ng-init="selected.providesAuthenticationLaptop = false" checked /> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogLaptop" ng-change="edit()" ng-init="selected.isALogLaptop = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresCredentials" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesCredentialsLaptop" ng-change="edit()" ng-init="selected.storesCredentialsLaptop = false" checked/> Stores Credentials\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputLaptop" ng-change="edit()" ng-init="selected.validatesInputLaptop = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedLaptop" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedLaptop" ng-change="edit()" ng-init="selected.isEncryptedLaptop = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForLaptop" ng-if="selected.isEncryptedLaptop">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguageLaptop" ng-change="edit()" ng-init="selected.programmingLanguageLaptop = false" checked/> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="" ng-if="selected.programmingLanguageLaptop">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsSigned" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isSignedLaptop" ng-change="edit()" ng-init="selected.isSignedLaptop = false" checked/> Is Signed\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxRemoteMedicalRecordStorage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.remoteMedicalRecordStorageLaptop" ng-change="edit()" ng-init="selected.remoteMedicalRecordStorageLaptop = false" checked/> Remote Storage of Medical Records\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForLaptop" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForLaptop = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="elementType === \'tm.Tablet\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationTablet" ng-change="edit()" ng-init="selected.providesAuthenticationTablet = false" checked/> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputTablet" ng-change="edit()" ng-init="selected.validatesInputTablet = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogTablet" ng-change="edit()" ng-init="selected.isALogTablet = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresCredentials" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesCredentialsTablet" ng-change="edit()" ng-init="selected.storesCredentialsTablet = false" checked/> Stores Credentials\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedTablet" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedTablet" ng-change="edit()" ng-init="selected.isEncryptedTablet = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForTablet" ng-if="selected.isEncryptedTablet">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguageTablet" ng-change="edit()" ng-init="selected.programmingLanguageTablet = false" checked/> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="checkboxProgrammingLanguageforTablet" ng-if="selected.programmingLanguageTablet">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsSigned" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isSignedTablet" ng-change="edit()" ng-init="selected.isSignedTablet = false" checked/> Is Signed\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxRemoteMedicalRecordStorage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.remoteMedicalRecordStorageTablet" ng-change="edit()" ng-init="selected.remoteMedicalRecordStorageTablet = false" checked/> Remote Storage of Medical Records\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForTablet" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForTablet = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="elementType === \'tm.Electrocardiogram\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationElectrocardiogram" ng-change="edit()" ng-init="selected.providesAuthenticationElectrocardiogram = false" checked/> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputElectrocardiogram" ng-change="edit()" ng-init="selected.validatesInputElectrocardiogram = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogElectrocardiogram" ng-change="edit()" ng-init="selected.isALogElectrocardiogram = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresCredentials" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesCredentialsElectrocardiogram" ng-change="edit()" ng-init="selected.storesCredentialsElectrocardiogram = false" checked/> Stores Credentials\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedElectrocardiogram" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedElectrocardiogram" ng-change="edit()" ng-init="selected.isEncryptedElectrocardiogram = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForElectrocardiogram" ng-if="selected.isEncryptedElectrocardiogram">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguageElectrocardiogram" ng-change="edit()" ng-init="selected.programmingLanguageElectrocardiogram = false" checked/> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="checkboxProgrammingLanguageforElectrocardiogram" ng-if="selected.programmingLanguageElectrocardiogram">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsSigned" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isSignedElectrocardiogram" ng-change="edit()"  ng-init="selected.isSignedElectrocardiogram = false" checked/> Is Signed\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxRemoteMedicalRecordStorage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.remoteMedicalRecordStorageElectrocardiogram" ng-change="edit()" ng-init="selected.remoteMedicalRecordStorageElectrocardiogram = false" checked/> Remote Storage of Medical Records\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForElectrocardiogram" ng-change="edit()" placeholder="Privilege level" ng-init="selected.privilegeLevelForElectrocardiogram = false" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="elementType === \'tm.Pacemaker\'">\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProvidesAuthentication" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.providesAuthenticationPacemaker" ng-change="edit()" ng-init="selected.providesAuthenticationPacemaker = false" checked/> Implements or Uses Authentication Mechanism\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsALog" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isALogPacemaker" ng-change="edit()" ng-init="selected.isALogPacemaker = false" checked/>Stores Event Logs\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxValidateInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.validatesInputPacemaker" ng-change="edit()" ng-init="selected.validatesInputPacemaker = false" checked/> Validates Input\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxStoresCredentials" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.storesCredentialsPacemaker" ng-change="edit()" ng-init="selected.storesCredentialsPacemaker = false" checked/> Stores Credentials\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsEncryptedPacemaker" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isEncryptedPacemaker" ng-change="edit()" ng-init="selected.isEncryptedPacemaker = false" checked/> Is Encrypted\n' +
    '            </label>\n' +
    '            <select id ="encryptionTypeForPacemaker" ng-if="selected.isEncryptedPacemaker">\n' +
    '                <option value="des" selected>DES</option>\n' +
    '                <option value="tripleDes">Triple DES</option>\n' +
    '                <option value="tripleDes3Key">TRIPLE_DES_3KEY</option>\n' +
    '                <option value="rc2">RC2</option>\n' +
    '                <option value="rc4">RC4</option>\n' +
    '                <option value="128rc4">128-bit RC4</option>\n' +
    '                <option value="desx">DESX</option>\n' +
    '                <option value="128aes">128-bit AES</option>\n' +
    '                <option value="192aes">192-bit AES</option>\n' +
    '                <option value="256aes">256-bit AES</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxProgrammingLanguage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.programmingLanguagePacemaker" ng-change="edit()" ng-init="selected.programmingLanguagePacemaker = false" checked/> Programming Language\n' +
    '            </label>\n' +
    '            <select id ="checkboxProgrammingLanguageforPacemaker" ng-if="selected.programmingLanguagePacemaker">\n' +
    '                <option value="c" selected>C</option>\n' +
    '                <option value="c++">C++</option>\n' +
    '                <option value="c#">c#</option>\n' +
    '                <option value="python">Python</option>\n' +
    '                <option value="java">Java</option>\n' +
    '                <option value="assembly">Assembly</option>\n' +
    '                <option value="objectivec">Objective C</option>\n' +
    '                <option value="swift">Swift</option>\n' +
    '                <option value="ruby">Ruby</option>\n' +
    '                <option value="php">PHP</option>\n' +
    '                <option value="html">HTML</option>\n' +
    '                <option value="jsp">JSP</option>\n' +
    '                <option value="juel">Juel</option>\n' +
    '                <option value="spring">Spring</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxIsSigned" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.isSignedPacemaker" ng-change="edit()" ng-init="selected.isSignedPacemaker = false" checked/> Is Signed\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '                <input name="checkboxRemoteMedicalRecordStorage" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.remoteMedicalRecordStoragePacemaker" ng-change="edit()" ng-init="selected.remoteMedicalRecordStoragePacemaker = false" checked/> Remote Storage of Medical Records\n' +
    '            </label>\n' +
    '        </div>\n' +
    '        <div class="checkbox">\n' +
    '            <label>\n' +
    '            <input name="privilegeLevelInput" ng-disabled="selected.outOfScope" type="checkbox" ng-model="selected.privilegeLevelForPacemaker" ng-change="edit()" ng-init="selected.privilegeLevelForPacemaker = false" placeholder="Privilege level" checked/> Uses Privilege Levels\n' +
    '            </label>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</form>\n' +
    '')
  $templateCache.put('diagrams/modalAccept.html',
    '﻿<button class="btn btn-primary" ng-disabled="parameter.editing && (!threatEditForm.$dirty || !threatEditForm.$valid)" ng-click="onAction()">\n' +
    '    Accept\n' +
    '</button>')
  $templateCache.put('diagrams/modalIgnore.html',
    '﻿<button class="btn btn-default" ng-click="onAction()">\n' +
    '    Ignore\n' +
    '</button>')
  $templateCache.put('diagrams/NewExamplePane.html',
    '<div>\n' +
    '    <div class="modal-header">\n' +
    '        <h3>{{parameter.heading}}</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form name="newExampleForm">\n' +
    '            <div class="form-group">\n' +
    '                <label>Programming language</label>\n' +
    '                <select name="languageInput" class="form-control" ng-required="true" ng-model="parameter.example.language.highlightAlias">\n' +
    '                    <option ng-repeat="supportedLanguage in parameter.supportedLanguages" value="{{supportedLanguage.highlightAlias}}">{{supportedLanguage.name}}</option>\n' +
    '                </select>\n' +
    '                <div ng-show="!newExampleForm.languageInput.$valid && newExampleForm.languageInput.$dirty">\n' +
    '                    <p>\n' +
    '                    <div class="alert alert-danger" role="alert">\n' +
    '                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n' +
    '                        <span class="sr-only">Error:</span>\n' +
    '                        The programming language cannot be empty.\n' +
    '                    </div>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label>Pre-text</label>\n' +
    '                <textarea name="preTextInput" ng-model="parameter.example.preText" class="form-control" rows="5" placeholder="Text(description/explanation) to place before the code"></textarea>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label>Code snippet</label>\n' +
    '                <textarea name="codeInput" ng-model="parameter.example.code" ng-required="true" class="form-control" rows="5" placeholder="The code snippet in the specified language"></textarea>\n' +
    '                <div ng-show="!newExampleForm.codeInput.$valid && newExampleForm.codeInput.$dirty">\n' +
    '                    <p>\n' +
    '                    <div class="alert alert-danger" role="alert">\n' +
    '                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n' +
    '                        <span class="sr-only">Error:</span>\n' +
    '                        The code snippet cannot be empty.\n' +
    '                    </div>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label>Post-text</label>\n' +
    '                <textarea name="postTextInput" ng-model="parameter.example.postText" class="form-control" rows="5" placeholder="Text(description/explanation) to place after the code"></textarea>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button class="btn btn-primary" ng-disabled="!newExampleForm.$dirty || !newExampleForm.$valid" ng-click="onOK()">Save</button>\n' +
    '        <button class="btn btn-default" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('diagrams/NewReferencePane.html',
    '<div>\n' +
    '    <div class="modal-header">\n' +
    '        <h3>{{parameter.heading}}</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form name="newReferenceForm">\n' +
    '            <div class="form-group">\n' +
    '                <label>Reference title</label>\n' +
    '                <textarea name="preTextInput" ng-model="parameter.reference.name" class="form-control" rows="5" placeholder="Reference title"></textarea>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label>Reference link</label>\n' +
    '                <input type="text" name="codeInput" ng-pattern="parameter.regex" ng-model="parameter.reference.link" ng-required="true" class="form-control" rows="5" placeholder="Link to the reference">\n' +
    '                <div ng-show="!newReferenceForm.codeInput.$valid && newReferenceForm.codeInput.$dirty">\n' +
    '                    <p>\n' +
    '                        <div class="alert alert-danger" role="alert">\n' +
    '                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n' +
    '                            <span class="sr-only">Error:</span>\n' +
    '                            Please provide a valid link.\n' +
    '                        </div>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button class="btn btn-primary" ng-disabled="!newReferenceForm.$dirty || !newReferenceForm.$valid" ng-click="onOK()">Save Reference</button>\n' +
    '        <button class="btn btn-default" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('diagrams/ThreatEditPane.html',
    '﻿<div data-ng-controller="TrelloController as tc" data-ng-init="getBoards()">\n' +
    '    <div class="modal-header">\n' +
    '        <img class="trelloLogo" name="trelloLogo" src="public/content/images/trello-mark-blue.png" alt="Add To Trello" ng-click="toggle()">\n' +
    '        <h3>{{parameter.heading}}<span class="pull-right" ng-if="parameter.threatTotal"> ({{parameter.threatIndex}} of {{parameter.threatTotal}})</span></h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form name="threatEditForm" >\n' +
    '            <div class="form-group">\n' +
    '                <label ng-if="!isTrelloActive">Title</label><label ng-if="isTrelloActive">Card Title</label>\n' +
    '                <input name="titleInput" class="form-control" ng-required="true" type="text" ng-model="parameter.threat.title" placeholder="A short title for the threat" />\n' +
    '                <div ng-show="!threatEditForm.titleInput.$valid && threatEditForm.titleInput.$dirty">\n' +
    '                    <p>\n' +
    '                        <div ng-if="!isTrelloActive" class="alert alert-danger" role="alert">\n' +
    '                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n' +
    '                            <span class="sr-only">Error:</span>\n' +
    '                            The threat title cannot be empty.\n' +
    '                        </div>\n' +
    '                        <div ng-if="isTrelloActive" class="alert alert-danger" role="alert">\n' +
    '                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n' +
    '                            <span class="sr-only">Error:</span>\n' +
    '                            The card title cannot be empty.\n' +
    '                        </div>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div ng-if="isTrelloActive" class="form-group">\n' +
    '                <label>Board</label>\n' +
    '                <select name="boardInput" class="form-control" ng-required="true"  ng-model="threatEditForm.boardInput" ng-options="board.name for board in boards">\n' +
    '                </select>\n' +
    '                <button class="btn btn-primary ng-pristine" ng-disabled="!threatEditForm.boardInput.id" ng-click="goToBoard()">Go To Board</button>\n' +
    '            </div>\n' +
    '            <div ng-if="isTrelloActive" class="form-group">\n' +
    '                <label>List</label>\n' +
    '                <select ng-disabled="!threatEditForm.boardInput.id" name="listInput" class="form-control" ng-required="true" ng-model="threatEditForm.listInput">\n' +
    '                    <option ng-repeat="list in ourLists" value="{{list.id}}">{{list.name}}</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label>STRIDE threat type</label>\n' +
    '                <select name="typeInput" class="form-control" ng-required="true" ng-model="parameter.threat.type">\n' +
    '                    <option selected>Spoofing</option>\n' +
    '                    <option>Tampering</option>\n' +
    '                    <option>Repudiation</option>\n' +
    '                    <option>Information disclosure</option>\n' +
    '                    <option>Denial of service</option>\n' +
    '                    <option>Elevation of privilege</option>\n' +
    '                </select>\n' +
    '                <div ng-show="!threatEditForm.typeInput.$valid && threatEditForm.typeInput.$dirty">\n' +
    '                    <p>\n' +
    '                        <div class="alert alert-danger" role="alert">\n' +
    '                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n' +
    '                            <span class="sr-only">Error:</span>\n' +
    '                            The threat type cannot be empty.\n' +
    '                        </div>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group pull-left">\n' +
    '                <label>Threat status</label>\n' +
    '                <div>\n' +
    '                    <div class="btn-group" name="statusInput">\n' +
    '                        <label class="btn btn-primary" name="statusInputOpen" ng-model="parameter.threat.status" uib-btn-radio="\'Open\'">Open</label>\n' +
    '                        <label class="btn btn-primary" name="statusInputMitigated" ng-model="parameter.threat.status" uib-btn-radio="\'Mitigated\'">Mitigated</label>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group pull-right">\n' +
    '                <label>Severity</label>\n' +
    '                <div>\n' +
    '                    <div class="btn-group" required>\n' +
    '                        <label class="btn btn-default" ng-model="parameter.threat.severity" uib-btn-radio="\'High\'">High</label>\n' +
    '                        <label class="btn btn-default" ng-model="parameter.threat.severity" uib-btn-radio="\'Medium\'">Medium</label>\n' +
    '                        <label class="btn btn-default" ng-model="parameter.threat.severity" uib-btn-radio="\'Low\'">Low</label>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="clearfix"></div>\n' +
    '            <div class="form-group">\n' +
    '                <label ng-if="!isTrelloActive">Description</label><label ng-if="isTrelloActive">Card Description</label>\n' +
    '                <textarea name="descriptionInput" ng-model="parameter.threat.description" class="form-control" rows="5" placeholder="Detailed description of the threat"></textarea>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <label>Mitigations</label>\n' +
    '                <textarea name="mitigationInput" ng-model="parameter.threat.mitigation" class="form-control" rows="5" placeholder="Mitigations for the threat"></textarea>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <div class="form-group">\n' +
    '                    <div class="pull-left padFive">\n' +
    '                        <label>References</label>\n' +
    '                    </div>\n' +
    '                    <div class="pull-right">\n' +
    '                        <tmt-reference-editor references="parameter.threat.references"></tmt-reference-editor>\n' +
    '                    </div>\n' +
    '                    <div class="clearfix"></div>\n' +
    '                </div>\n' +
    '                <div class="form-control overflowY" style="height: 100px;">\n' +
    '                    <div name="referenceInput" ng-repeat="reference in parameter.threat.references">\n' +
    '                        <div class="form-group form-control" style="border: 1px solid gray;">\n' +
    '                            <a href="{{reference.link}}" target="_blank">{{reference.name}}</a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <div class="form-group">\n' +
    '                    <div class="pull-left padFive">\n' +
    '                        <label>Code Snippets</label>\n' +
    '                    </div>\n' +
    '                    <div class="pull-right">\n' +
    '                        <tmt-example-editor examples="parameter.threat.examples"></tmt-example-editor>\n' +
    '                    </div>\n' +
    '                    <div class="clearfix"></div>\n' +
    '                </div>\n' +
    '                <div class="form-control overflowY" style="height: 400px;">\n' +
    '                    <div ng-repeat="example in parameter.threat.examples">\n' +
    '                        <div style="border-radius: 25px; padding: 10px; margin: 10px; border: 1px solid gray;">\n' +
    '                            <label ng-if="example.language.name" style="color: #507eed">Language: {{example.language.name}}</label>\n' +
    '                            <label ng-if="!example.language.name" style="color: #507eed">Language: Plain Text</label>\n' +
    '                            <p ng-if="example.preText">{{example.preText}}</p>\n' +
    '                            <pre ng-if="example.code" class=" language-{{example.language.highlightAlias}} line-numbers">\n' +
    '                                <code tmt-prism-highlight class=" language-{{example.language.highlightAlias}}">{{example.code}}</code>\n' +
    '                            </pre>\n' +
    '                            <p ng-if="example.postText">{{example.postText}}</p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div ng-if="isTrelloActive" class="modal-footer">\n' +
    '        <button class="btn btn-primary" ng-click="addCard(threatEditForm.titleInput.$modelValue, threatEditForm.descriptionInput.$modelValue, threatEditForm.listInput)">Add To Board</button>\n' +
    '        <button class="btn btn-default" ng-click="toggle()">Cancel</button>\n' +
    '    </div>\n' +
    '    <div ng-if="parameter.editing && !isTrelloActive" class="modal-footer">\n' +
    '        <button class="btn btn-primary" ng-disabled="!threatEditForm.$dirty || !threatEditForm.$valid" ng-click="onOK()">Save</button>\n' +
    '        <button class="btn btn-default" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '    <div ng-if="!parameter.editing && !isTrelloActive" class="modal-footer">\n' +
    '        <span class="pull-left">\n' +
    '            <input type="checkbox" ng-model="applyToAll">\n' +
    '            Do this for all remaining threats \n' +
    '        </span>\n' +
    '        <tmt-modal-close action="onOK(applyToAll)" new-class="fade-left" template-url="diagrams/modalAccept.html"></tmt-modal-close>\n' +
    '        <tmt-modal-close action="onCancel(applyToAll)" new-class="fade-down" template-url="diagrams/modalIgnore.html"></tmt-modal-close>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('diagrams/ThreatSummaryPane.html',
    '﻿<ul id="threatSummaryPane" class="list-group">\n' +
    '    <li class="list-group-item" ng-repeat="threat in threats">\n' +
    '        <a id="editThreat{{$index}}" href="" ng-click="onEditThreat($index)" data-toggle="tooltip" data-placement="top" title="Edit {{threat.title}}">\n' +
    '            <div class="text-overflow"><small>{{threat.title}}</small></div>\n' +
    '        </a>\n' +
    '        <div>\n' +
    '            <small>{{threat.type}}</small>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[threat.status]" data-toggle="tooltip" data-placement="top" title="{{threat.status}}"></span>\n' +
    '            <span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[threat.severity]" data-toggle="tooltip" data-placement="top" title="{{threat.severity}}"></span>\n' +
    '            <span id="remove{{$index}}" class="pull-right glyphicon glyphicon-remove severity-high" ng-click="removeThreat($index)" data-toggle="tooltip" data-placement="top" title="Remove this threat"></span>\n' +
    '        </div>\n' +
    '    </li>\n' +
    '</ul> \n' +
    '<button id="buttonNewThreat" class="btn btn-link" ng-click="onNewThreat()">\n' +
    '    <span class="glyphicon glyphicon-plus"></span> Add a new threat...\n' +
    '</button>\n' +
    '')
  $templateCache.put('layout/pager.html',
    '<div class="clearfix" ng-if="canPrevious || canNext">\n' +
    '    <button ng-disabled="!canPrevious" class="pull-left btn btn-link" ng-click="previous()">Previous page</button>\n' +
    '    <button ng-disabled="!canNext" class="pull-right  btn btn-link" href="" ng-click="next()">Next page</button>\n' +
    '</div>\n' +
    '<div class="list-group">\n' +
    '    <a ng-repeat="item in items" ng-click="select({item: item})" class="list-group-item h4">{{item}}</a>\n' +
    '</div>\n' +
    '<div ng-if="(canPrevious || canNext) && items.length >= 10">\n' +
    '    <button ng-disabled="!canPrevious" class="pull-left btn btn-link" ng-click="previous()">Previous page</button>\n' +
    '    <button ng-disabled="!canNext" class="pull-right  btn btn-link" href="" ng-click="next()">Next page</button>\n' +
    '</div>\n' +
    '')
  $templateCache.put('layout/structuredExit.html',
    '﻿<div id="structuredExitModal">\n' +
    '    <div class="modal-header">\n' +
    '        <h3>Are you sure you want to leave this page?</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        You have unsaved changes and if you leave this page they will be lost!\n' +
    '        Press \'Cancel\' to stay where you are and keep the unsaved changes,\n' +
    '        or press \'Proceed\' to leave and lose the unsaved changes.\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button id="buttonOK" class="btn btn-default" ng-click="onOK()">Proceed</button>\n' +
    '        <button id="buttonCancel" class="btn btn-primary" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('report/confirmThreatAutoGeneration.html',
    '<div>\n' +
    '    <div class="modal-header">\n' +
    '        <h3>Are you sure?</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        Some nodes in your diagram do not have threats defined. Would you like to automatically generate for these nodes?\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        Press \'View Threat Report Without Modification\' to view the threat report without generating additional threats, or press \'Generate Threats and View Report\' to automatically generate threats for empty nodes before viewing the report.\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button class="btn btn-default" ng-click="onOK()">Generate Threats and View Report</button>\n' +
    '        <button class="btn btn-primary" ng-click="onCancel()">View Threat Report Without Modification</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('report/ThreatReport.html',
    '<div data-ng-controller="ThreatReport as vm" class="container-fluid diagram-container">\n' +
    '    <div class="tab">\n' +
    '        <button class="tablinks" id="defaultTab" ng-click="vm.activateTab($event, \'Threats\')">Threats</button>\n' +
    '        <button class="tablinks" ng-click="vm.activateTab($event, \'Countermeasures\')">Countermeasures</button>\n' +
    '        <button class="downloadButton" ng-click="vm.downloadAsPDF()"><i class="glyphicon glyphicon-download"></i> Download As PDF</button>\n' +
    '    </div>\n' +
    '    <div id="Threats" class="tabcontent">\n' +
    '        <table class="tg" style="width:100%">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>No.</th>\n' +
    '                    <th ng-click="vm.sort(\'name\')">COMPONENT\n' +
    '                        <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'name\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                    </th>\n' +
    '                    <th ng-click="vm.sort(\'title\')">TITLE\n' +
    '                        <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'title\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                    </th>\n' +
    '                    <th ng-click="vm.sort(\'type\')">THREAT TYPE\n' +
    '                        <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'type\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                    </th>\n' +
    '                    <th ng-click="vm.sort(\'description\')">DESCRIPTION\n' +
    '                        <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'description\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                    </th>\n' +
    '                    <th ng-click="vm.sort(\'status\')">STATUS\n' +
    '                        <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'status\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                    </th>\n' +
    '                    <th ng-click="vm.sort(\'severity\')">SEVERITY\n' +
    '                        <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'severity\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                    </th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody ng-repeat="element in vm.reportElements">\n' +
    '                <tr ng-if="$odd" class="odd" ng-click="vm.editThreat(element.threats[0])">\n' +
    '                    <td class="noHover" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()"><span>{{ $index }}</span></td>\n' +
    '                    <td class="noHover bottom-right-container" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()">\n' +
    '                        <div style="margin-right: 36px;">\n' +
    '                            <span>{{ element.name }}</span>\n' +
    '                        </div>\n' +
    '                        <div class="bottom-right">\n' +
    '                            <button class="btn btn-link" ng-click="vm.onAddNewThreat(element)" data-toggle="tooltip" data-placement="top" title="Add a new threat to this node">\n' +
    '                                <span class="glyphicon glyphicon-plus"></span>\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </td>\n' +
    '                    <td><span>{{element.threats[0].title}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].type}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].description}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[element.threats[0].status]">{{element.threats[0].status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[element.threats[0].severity]">{{element.threats[0].severity}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="$even" class="even" ng-click="vm.editThreat(element.threats[0])">\n' +
    '                    <td class="noHover" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()"><span>{{ $index }}</span></td>\n' +
    '                    <td class="noHover bottom-right-container" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()">\n' +
    '                        <div style="margin-right: 36px;">\n' +
    '                            <span>{{ element.name }}</span>\n' +
    '                        </div>\n' +
    '                        <div class="bottom-right">\n' +
    '                            <button class="btn btn-link" ng-click="vm.onAddNewThreat(element)" data-toggle="tooltip" data-placement="top" title="Add a new threat to this node">\n' +
    '                                <span class="glyphicon glyphicon-plus"></span>\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </td>\n' +
    '                    <td><span>{{element.threats[0].title}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].type}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].description}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[element.threats[0].status]">{{element.threats[0].status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[element.threats[0].severity]">{{element.threats[0].severity}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="threat in element.threats" ng-if="$index > 0 && $parent.$odd" class="odd" ng-click="vm.editThreat(element.threats[$index])">\n' +
    '                    <td><span>{{threat.title}}</span></td>\n' +
    '                    <td><span>{{threat.type}}</span></td>\n' +
    '                    <td><span>{{threat.description}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[threat.status]">{{threat.status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[threat.severity]">{{threat.severity}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="threat in element.threats" ng-if="$index > 0 && $parent.$even" class="even" ng-click="vm.editThreat(element.threats[$index])">\n' +
    '                    <td><span>{{threat.title}}</span></td>\n' +
    '                    <td><span>{{threat.type}}</span></td>\n' +
    '                    <td><span>{{threat.description}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[threat.status]">{{threat.status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[threat.severity]">{{threat.severity}}</span></td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    <div id="Countermeasures" class="tabcontent">\n' +
    '        <table class="tg" style="width:100%">\n' +
    '            <thead>\n' +
    '            <tr>\n' +
    '                <th>No.</th>\n' +
    '                <th ng-click="vm.sort(\'name\')">COMPONENT\n' +
    '                    <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'name\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                </th>\n' +
    '                <th ng-click="vm.sort(\'title\')">TITLE\n' +
    '                    <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'title\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                </th>\n' +
    '                <th ng-click="vm.sort(\'type\')">THREAT TYPE\n' +
    '                    <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'type\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                </th>\n' +
    '                <th ng-click="vm.sort(\'mitigation\')">MITIGATION\n' +
    '                    <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'mitigation\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                </th>\n' +
    '                <th ng-click="vm.sort(\'status\')">STATUS\n' +
    '                    <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'status\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                </th>\n' +
    '                <th ng-click="vm.sort(\'severity\')">SEVERITY\n' +
    '                    <span class="glyphicon sort-icon" ng-show="vm.sortKey==\'severity\'" ng-class="{\'glyphicon-chevron-up\':!vm.reverse,\'glyphicon-chevron-down\':vm.reverse}"></span>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '            </thead>\n' +
    '            <tbody ng-repeat="element in vm.reportElements">\n' +
    '                <tr ng-if="$odd" class="odd" ng-click="vm.editThreat(element.threats[0])">\n' +
    '                    <td class="noHover" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()"><span>{{ $index }}</span></td>\n' +
    '                    <td class="noHover bottom-right-container" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()">\n' +
    '                        <div style="margin-right: 36px;">\n' +
    '                            <span>{{ element.name }}</span>\n' +
    '                        </div>\n' +
    '                        <div class="bottom-right">\n' +
    '                            <button class="btn btn-link" ng-click="vm.onAddNewThreat(element)" data-toggle="tooltip" data-placement="top" title="Add a new threat to this node">\n' +
    '                                <span class="glyphicon glyphicon-plus"></span>\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </td>\n' +
    '                    <td><span>{{element.threats[0].title}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].type}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].mitigation}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[element.threats[0].status]">{{element.threats[0].status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[element.threats[0].severity]">{{element.threats[0].severity}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-if="$even" class="even" ng-click="vm.editThreat(element.threats[0])">\n' +
    '                    <td class="noHover" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()"><span>{{ $index }}</span></td>\n' +
    '                    <td class="noHover bottom-right-container" rowspan="{{element.threats.length > 0 ? element.threats.length : 1}}" ng-click="$event.stopPropagation()">\n' +
    '                        <div style="margin-right: 36px;">\n' +
    '                            <span>{{ element.name }}</span>\n' +
    '                        </div>\n' +
    '                        <div class="bottom-right">\n' +
    '                            <button class="btn btn-link" ng-click="vm.onAddNewThreat(element)" data-toggle="tooltip" data-placement="top" title="Add a new threat to this node">\n' +
    '                                <span class="glyphicon glyphicon-plus"></span>\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </td>\n' +
    '                    <td><span>{{element.threats[0].title}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].type}}</span></td>\n' +
    '                    <td><span>{{element.threats[0].mitigation}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[element.threats[0].status]">{{element.threats[0].status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[element.threats[0].severity]">{{element.threats[0].severity}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="threat in element.threats" ng-if="$index > 0 && $parent.$odd" class="odd" ng-click="vm.editThreat(element.threats[$index])">\n' +
    '                    <td><span>{{threat.title}}</span></td>\n' +
    '                    <td><span>{{threat.type}}</span></td>\n' +
    '                    <td><span>{{threat.mitigation}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[threat.status]">{{threat.status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[threat.severity]">{{threat.severity}}</span></td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="threat in element.threats" ng-if="$index > 0 && $parent.$even" class="even" ng-click="vm.editThreat(element.threats[$index])">\n' +
    '                    <td><span>{{threat.title}}</span></td>\n' +
    '                    <td><span>{{threat.type}}</span></td>\n' +
    '                    <td><span>{{threat.mitigation}}</span></td>\n' +
    '                    <td><span ng-class="{Open:\'severity-high fa fa-exclamation-triangle\', Mitigated:\'severity-low fa fa-check\'}[threat.status]">{{threat.status}}</span></td>\n' +
    '                    <td><span ng-class="{Low:\'fa fa-circle severity-low\', Medium:\'fa fa-circle severity-medium\', High:\'fa fa-circle severity-high\'}[threat.severity]">{{threat.severity}}</span></td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('threatmodels/confirmDelete.html',
    '<div>\n' +
    '    <div class="modal-header">\n' +
    '        <h3>Are you sure?</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        You are about to delete this threat model. It cannot be undone!\n' +
    '        Press Cancel to keep the threat model, or press OK to delete the threat model.\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button class="btn btn-default" ng-click="onOK()">OK</button>\n' +
    '        <button class="btn btn-primary" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('threatmodels/confirmReloadOnDirty.html',
    '﻿<div>\n' +
    '    <div class="modal-header">\n' +
    '        <h3>Are you sure?</h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        Your threat model has unsaved changes and if you reload they will be lost!\n' +
    '        Press Cancel to keep the unsaved changes, or press OK to reload the threat model and lose the unsaved changes.\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button class="btn btn-default" ng-click="onOK()">OK</button>\n' +
    '        <button class="btn btn-primary" ng-click="onCancel()">Cancel</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '')
  $templateCache.put('threatmodels/threatmodeldetail.html',
    '﻿<div data-ng-controller="threatmodel as vm" class="container-fluid">\n' +
    '    <div ng-if="!vm.threatModel.summary && !vm.errored">\n' +
    '        <p class="h3 text-center">Your threat model is loading...</p>\n' +
    '        <div class="spinner"></div>\n' +
    '    </div>\n' +
    '    <div ng-if="!vm.errored && vm.threatModel.summary">\n' +
    '        <div class="panel panel-default">\n' +
    '            <div class="panel-heading panel-title">\n' +
    '                <a href="#/threatmodel/edit/{{vm.threatModelPath()}}"><h4>{{vm.threatModel.summary.title}}</h4></a>\n' +
    '            </div>\n' +
    '            <div class="panel-body">\n' +
    '                <div class="col-md-2">\n' +
    '                    <div><strong>Owner: </strong></div>\n' +
    '                    <div>{{vm.threatModel.summary.owner}}</div>\n' +
    '                </div>\n' +
    '                <div class="col-md-2">\n' +
    '                    <div><strong>Reviewer: </strong></div>\n' +
    '                    <div>{{vm.threatModel.detail.reviewer}}</div>\n' +
    '                </div>\n' +
    '                <div class="col-md-8">\n' +
    '                    <div><strong>Contributors: </strong></div>\n' +
    '                    <div>\n' +
    '                        <span ng-repeat="contributor in vm.threatModel.detail.contributors"> {{contributor.name}}<span ng-show=" ! $last ">;</span></span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="panel panel-default">\n' +
    '            <div class="panel-heading panel-title">\n' +
    '                <h4>High level system description</h4>\n' +
    '            </div>\n' +
    '            <div class="panel-body">\n' +
    '                <div class="col-md-12">{{vm.threatModel.summary.description}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="panel-body">\n' +
    '            <div ng-repeat-start="diagram in vm.threatModel.detail.diagrams">\n' +
    '                <div class="col-md-3">\n' +
    '                    <div class="panel panel-default">\n' +
    '                        <div class="panel-heading panel-title">\n' +
    '                            <a href="#/threatmodel/{{vm.threatModelPath()}}/diagram/{{diagram.id}}"><h6>{{diagram.title}}</h6></a>\n' +
    '                        </div>\n' +
    '                        <div class="panel-body">\n' +
    '                            <a href="#/threatmodel/{{vm.threatModelPath()}}/diagram/{{diagram.id}}">\n' +
    '                                <img ng-src="{{diagram.thumbnail}}" class="img-thumbnail center-block" alt="Thumbnail of {{diagram.title}}" />\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div ng-if="(($index+1) % 4) == 0" class="clearfix visible-lg-block"></div>\n' +
    '            <div ng-repeat-end ng-hide></div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-12">\n' +
    '                <div class="btn-group pull-right" role="group">\n' +
    '                    <a class="btn btn-primary" href="#/threatmodel/edit/{{vm.threatModelPath()}}" \n' +
    '                    role="button" data-toggle="tooltip" data-placement="top" title="Edit This Threat Model">\n' +
    '                        <span class="glyphicon glyphicon-edit"></span> Edit\n' +
    '                    </a>\n' +
    '                    <button class="btn btn-default" role="button" ng-click="vm.deleteModel()" data-toggle="tooltip" data-placement="top" title="Delete This Threat Model">\n' +
    '                        <span class="glyphicon glyphicon-remove"></span>  Delete\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="vm.errored">\n' +
    '        <div class="jumbotron">\n' +
    '            <h1>oooops!</h1>\n' +
    '            <p>\n' +
    '                It looks like you tried to view an invalid threat model. Maybe you typed the\n' +
    '                address wrong? Or if you clicked a link to get here, the threat model might have been\n' +
    '                deleted since you made the link <span class="fa fa-frown-o"></span>\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                <a href="#">Take me home</a>\n' +
    '            </p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>')
  $templateCache.put('threatmodels/threatmodeledit.html',
    '﻿<div data-ng-controller="threatmodel as vm" class="container-fluid">\n' +
    '    <div ng-if="!vm.threatModel.summary && !vm.errored && !vm.isNewModel">\n' +
    '        <p class="h3 text-center">Your threat model is loading...</p>\n' +
    '        <div class="spinner"></div>\n' +
    '    </div>\n' +
    '    <div class="panel panel-default" ng-if="vm.threatModel.summary">\n' +
    '        <!--heading-->\n' +
    '        <div class="panel panel-heading">\n' +
    '            <h4>Editing: {{vm.threatModel.summary.title}}</h4>\n' +
    '        </div>\n' +
    '        <div class="panel panel-body">\n' +
    '            <form name="vm.threatModelEditForm">\n' +
    '                <!--title-->\n' +
    '                <div class="form-group col-md-12">\n' +
    '                    <label>Title</label>\n' +
    '                    <input name="threatModelTitle" class="form-control" type="text" ng-model="vm.threatModel.summary.title" ng-required="true"\n' +
    '                        placeholder="Threat model title" />\n' +
    '                    <div ng-show="vm.threatModelEditForm.threatModelTitle.$dirty && !vm.threatModelEditForm.threatModelTitle.$valid">\n' +
    '                        <p>\n' +
    '                            <div class="alert alert-danger" role="alert">\n' +
    '                                <span class="fa fa-exclamation-triangle" aria-hidden="true"></span>\n' +
    '                                <span class="sr-only">Error:</span> The threat model title cannot be empty.\n' +
    '                            </div>\n' +
    '                        </p>\n' +
    '                    </div>\n' +
    '                    <div ng-show="vm.willMoveThreatModel({model: vm.threatModelEditForm.threatModelTitle.$viewValue}) && !vm.isNewModel()">                      \n' +
    '                        <p>\n' +
    '                            <div class="alert alert-info" role="alert">\n' +
    '                                <span class="fa fa-info-circle" aria-hidden="true"></span>\n' +
    '                                <span class="sr-only">Warning:</span> Changing the model title will delete the old model\n' +
    '                                and create a new one to replace it.\n' +
    '                            </div>\n' +
    '                        </p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!--Owner-->\n' +
    '                <div class="form-group col-md-6">\n' +
    '                    <label>Owner</label>\n' +
    '                    <input class="form-control" type="text" ng-model="vm.threatModel.summary.owner" placeholder="The owner of the threat model"\n' +
    '                    />\n' +
    '                </div>\n' +
    '                <!--reviewer-->\n' +
    '                <div class="form-group col-md-6">\n' +
    '                    <label>Reviewer</label>\n' +
    '                    <input class="form-control" type="text" ng-model="vm.threatModel.detail.reviewer" placeholder="The reviewer of the threat model"\n' +
    '                    />\n' +
    '                </div>\n' +
    '                <!--description-->\n' +
    '                <div class="form-group col-md-12">\n' +
    '                    <label>High level system description</label>\n' +
    '                    <textarea rows="5" class="form-control" ng-model="vm.threatModel.summary.description" placeholder="A high level description of the system"></textarea>\n' +
    '                </div>\n' +
    '                <!--contributors-->\n' +
    '                <div class="form-group col-md-12">\n' +
    '                    <label>Contributors</label>\n' +
    '                    <div ng-repeat="contributor in vm.threatModel.detail.contributors" ng-form="contributorSubForm">\n' +
    '                        <div class="col-md-6">\n' +
    '                            <p>\n' +
    '                                <div class="input-group">\n' +
    '                                    <input name="contributorName" class="form-control" type="text" ng-model="contributor.name" required placeholder="The name of a contributor to the threat model"\n' +
    '                                    />\n' +
    '                                    <span class="input-group-btn">\n' +
    '                                        <button class="btn btn-default" data-toggle="tooltip" ng-click="vm.removeContributor($index)" data-placement="top" title="Remove This Contributor" aria-hidden="true" type="button">\n' +
    '                                            <span class="glyphicon glyphicon-remove"></span>                                    Remove\n' +
    '                                    </button>\n' +
    '                                    </span>\n' +
    '                                </div>\n' +
    '                            </p>\n' +
    '                            <div ng-show="contributorSubForm.contributorName.$dirty && !contributorSubForm.contributorName.$valid">\n' +
    '                                <p>\n' +
    '                                    <div class="alert alert-danger" role="alert">\n' +
    '                                        <span class="fa fa-exclamation-triangle" aria-hidden="true"></span>\n' +
    '                                        <span class="sr-only">Error:</span> The contributor name cannot be empty.\n' +
    '                                    </div>\n' +
    '                                </p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div ng-repeat-end>\n' +
    '                        <div class="col-md-6">\n' +
    '                            <p>\n' +
    '                                <div class="input-group" ng-show="vm.addingContributor">\n' +
    '                                    <input class="form-control" name="newContributorNameInput" type="text" ng-model="vm.newContributor" placeholder="The name of a contributor"\n' +
    '                                    />\n' +
    '                                    <span class="input-group-btn">\n' +
    '                                        <button class="btn btn-default" ng-disabled="vm.newContributor.length == 0" data-toggle="tooltip" ng-click="vm.addContributor()" data-placement="top" title="Add this contributor" aria-hidden="true" type="button">\n' +
    '                                            <span class="glyphicon glyphicon-plus"></span>                                    Add\n' +
    '                                    </button>\n' +
    '                                    </span>\n' +
    '                                    <span class="input-group-btn">\n' +
    '                                        <button class="btn btn-link" data-toggle="tooltip" ng-click="vm.cancelAddingContributor()" data-placement="top" title="Cancel adding this contributor" aria-hidden="true" type="button">\n' +
    '                                            <span class="glyphicon glyphicon-remove"></span>                                    Cancel\n' +
    '                                    </button>\n' +
    '                                    </span>\n' +
    '                                </div>\n' +
    '                                <div ng-hide="vm.addingContributor">\n' +
    '                                    <button class="btn btn-link" ng-click="vm.startAddingContributor()">\n' +
    '                                        <span class="glyphicon glyphicon-plus"></span> Add a new contributor...\n' +
    '                                    </button>\n' +
    '                                </div>\n' +
    '                            </p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!--diagrams-->\n' +
    '                <div class="form-group col-md-12">\n' +
    '                    <label>Diagrams</label>\n' +
    '                    <div ng-repeat="diagram in vm.threatModel.detail.diagrams" ng-form="diagramSubForm">\n' +
    '                        <div class="col-md-6">\n' +
    '                            <p>\n' +
    '                                <div class="input-group">\n' +
    '                                    <input name="diagramTitle" class="form-control" type="text" ng-model="diagram.title" required placeholder="Diagram title"\n' +
    '                                    />\n' +
    '                                    <span class="input-group-btn">\n' +
    '                                        <button class="btn btn-default" data-toggle="tooltip" ng-click="vm.removeDiagram($index)" data-placement="top" title="Remove This Diagram" aria-hidden="true" type="button">\n' +
    '                                            <span class="glyphicon glyphicon-remove"></span>                                    Remove\n' +
    '                                    </button>\n' +
    '                                    </span>\n' +
    '                                </div>\n' +
    '                            </p>\n' +
    '                            <div ng-show="diagramSubForm.diagramTitle.$dirty && !diagramSubForm.diagramTitle.$valid">\n' +
    '                                <p>\n' +
    '                                    <div class="alert alert-danger" role="alert">\n' +
    '                                        <span class="fa fa-exclamation-triangle" aria-hidden="true"></span>\n' +
    '                                        <span class="sr-only">Error:</span> The diagram title cannot be empty.\n' +
    '                                    </div>\n' +
    '                                </p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div ng-repeat-end>\n' +
    '                        <div class="col-md-6">\n' +
    '                            <p>\n' +
    '                                <div class="input-group" ng-show="vm.addingDiagram">\n' +
    '                                    <input class="form-control" type="text" ng-model="vm.newDiagram.title" placeholder="Diagram title" />\n' +
    '                                    <span class="input-group-btn">\n' +
    '                                        <button class="btn btn-default" ng-disabled="vm.newDiagram.title.length == 0" data-toggle="tooltip" ng-click="vm.addDiagram()" data-placement="top" title="Add this diagram" aria-hidden="true" type="button">\n' +
    '                                            <span class="glyphicon glyphicon-plus"></span>                                    Add\n' +
    '                                    </button>\n' +
    '                                    </span>\n' +
    '                                    <span class="input-group-btn">\n' +
    '                                        <button class="btn btn-link" data-toggle="tooltip" ng-click="vm.cancelAddingDiagram()" data-placement="top" title="Cancel adding this diagram" aria-hidden="true" type="button">\n' +
    '                                            <span class="glyphicon glyphicon-remove"></span>                                    Cancel\n' +
    '                                    </button>\n' +
    '                                    </span>\n' +
    '                                </div>\n' +
    '                                <div ng-hide="vm.addingDiagram">\n' +
    '                                    <button class="btn btn-link" ng-click="vm.startAddingDiagram()">\n' +
    '                                        <span class="glyphicon glyphicon-plus"></span> Add a new diagram...\n' +
    '                                    </button>\n' +
    '                                </div>\n' +
    '                            </p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!--buttons-->\n' +
    '                <div class="col-md-3 col-md-offset-9">\n' +
    '                    <div class="btn-group pull-right" role="group">\n' +
    '                        <button class="btn btn-default" ng-click="vm.cancel()" data-toggle="tooltip" data-placement="top" title="Cancel Editing"\n' +
    '                            type="button">\n' +
    '                            <span class="glyphicon glyphicon-remove"></span> Cancel\n' +
    '                        </button>\n' +
    '                        <button class="btn btn-default" ng-disabled="!vm.dirty" ng-click="vm.reload()" data-toggle="tooltip" data-placement="top"\n' +
    '                            title="Reset Form" type="button">\n' +
    '                            <span class="fa fa-undo"></span> Reload\n' +
    '                        </button>\n' +
    '                        <button class="btn btn-primary" ng-disabled="!vm.dirty || !vm.threatModelEditForm.$valid" ng-click="vm.isNewModel() ? vm.create() : vm.save()"\n' +
    '                            data-toggle="tooltip" data-placement="top" title="Save Changes" type="button">\n' +
    '                            <span class="glyphicon glyphicon-save"></span> Save\n' +
    '                        </button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <!--oops-->\n' +
    '    <div ng-if="vm.errored">\n' +
    '        <div class="jumbotron">\n' +
    '            <h1>oooops!</h1>\n' +
    '            <p>\n' +
    '                It looks like you tried to edit an invalid threat model. Maybe you typed the address wrong? Or if you clicked a link to get\n' +
    '                here, the threat model might have been deleted since you made the link <span class="fa fa-frown-o"></span>\n' +
    '            </p>\n' +
    '            <p>\n' +
    '                <a href="#/">Take me home</a>\n' +
    '            </p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>')

  }]);
