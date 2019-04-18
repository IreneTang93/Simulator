/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      var data = {
        "head":{},
        "body":{"parking_id":1}
      };

      var status1 = "Available";
      var status2 = "Occupied";

      self.statusWord = ko.observable("Available");
      self.gainParkingStatus = ko.observable(false);

      // $(document).ready(function() {
          // heartbeat(3000);


      function heartbeat(interval){
        $(document).ready(function() {
          setInterval(function(){
            $.ajax({
              url : "http://39.104.81.6:8000/api/v1.0/parking/ping?parking_id=1",
              type : "GET",
              headers: {
                Accept: "application/json"
              },
              success : function(result) {
                console.log("success");
                if(result.body.parking_status===true){
                  self.statusWord(status2);
                  $('#parkingStatus').removeClass("fontcolor-green");
                  $('#parkingStatus').addClass("fontcolor-red");
                }else{
                  self.statusWord(status1);
                  $('#parkingStatus').removeClass("fontcolor-red");
                  $('#parkingStatus').addClass("fontcolor-green");
                }
              },
              error:function(e){
                console.log("responseText: " + e.responseText);
                if(e.status==200){
                  var response = JSON.parse(e.responseText);
                  if(response.body.parking_status){
                    self.gainParkingStatus(true);
                  }else{
                    self.gainParkingStatus(false);
                  }
                }else{
                  $(".notice").html('Error:'+e);
                }
              }
            });
          },interval);
        });
      } 

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
