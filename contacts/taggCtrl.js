/**
 * Created by Kukku on 5/29/2016.
 */
var app = angular.module('taggApp', []);
app.controller('myCtrl', function($scope,$http,$window,$timeout) {
    console.info("Controller reporting");
    var url="http://localhost:3000";
    var screenWidth = $window.innerWidth;
    if (screenWidth < 768) {
        $scope.mobileMode = true;
    }else{
        document.body.style.zoom = "90%"
    }
 $scope.closeSideMenu=function(){
        var myElement= document.getElementById('sidepanel_btn');
        $timeout(function() {
            angular.element(myElement).triggerHandler('click');
        }, 0);
    }
   $scope.greetUser = function(){
        var myDate = new Date();
        var hrs = myDate.getHours();

        var greet;

      /*  if (hrs < 12){

            greet = 'Good Morning';
            _toastr("Welcome Guest, Good Morning","top-right","info",false);
        }
        else if (hrs >= 12 && hrs <= 17){

            greet = 'Good Afternoon';
            _toastr("Welcome Guest, Good Afternoon","top-right","info",false);
        }
        else if (hrs >= 17 && hrs <= 24){

            greet = 'Good Evening';
            _toastr("Welcome Guest,Good Evening","top-right","info",false);
        }
*/
    }

    $scope.newsLetter=function(newsletter_email){ 
var emailID = newsletter_email;

$http({
	url: "subscribe/mail.php",
		method: "POST",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: $.param({user_id:emailID})
	}).success(function(data, status, headers, config) {
		$scope.data = data;
	}).error(function(data, status, headers, config) {
		$scope.status = status;
});
        $scope.thankYou = true;
    }


    $scope.next=function(){
        angular.element('.fa fa-angle-right').click();
    }

    $scope.getNews = function(){
        $http.get("/contacts").success(function(data){
            console.log("Got News");
            $scope.taggNews = data;
            console.log(data)
        })
    }
    $scope.addNews=function(addNews){
        console.log($scope.newsEnter)
        var dataformat = {
            newsEntry:$scope.newsEnter+"",
        }
        $http.post('/contacts',dataformat).success(function (){
            $scope.getNews();
        })
    }

    $scope.editNews = function(id,action){
        if(action=='delete'){
            $http.delete('/contacts/'+id).success(function (){
                $scope.getNews();
            })
        }else{

            $http.get('/contacts/'+id).success(function (data){
                $scope.info = data;
                $scope.newsEnter = data.newsEntry;
            })
        }

    }
    $scope.updateNews = function(id,action){
        var dataformat = {
            newsEntry:$scope.newsEnter+"",
        }
        $http.put('/contacts/'+$scope.info._id,dataformat).success(function (data){
         $scope.getNews();
        })

    }

    $scope.getNews();

 $scope.toggleTabs = function(image){
        if(!image){
            $scope.showVideo = true;
            $('#photoTab').removeClass('active');
            $('#videoTab').addClass('active');


           $('#images').addClass('hidden');
            $('#videos1').removeClass(' hidden');
            $('#images').removeClass('in active');
            $('#videos1').addClass('in active');

        }else{
            $scope.showVideo = false;
            
            $('#videoTab').removeClass('active');
            $('#photoTab').addClass('active');

            $('#videos1').addClass('hidden');

            $('#videos1').removeClass('in active');
            $('#images').removeClass(' hidden');
            $('#images').addClass('in active');
        }
    }
});