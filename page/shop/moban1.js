/**
 * Created by DHUser on 2016/12/14.
 */
var menu=["秒杀","优惠券","闪购","拍卖","服装城","兔吧超市","生鲜","全球购","兔吧金融"];
var myApp = angular.module("myApp",["ui.router","myfooter","myheader","mytop","myInterceptor","mymenu","mygg","mypubu","mylist"]);
/*myApp.factory('myInterceptor', ['$log', function($log) {
    $log.debug('$log is here to show you that this is a regular factory with injection');
    var myInterceptor = {};
    return myInterceptor;
}]);*/
myApp.directive('expander', function() {
    return expander;
}).directive('expander1', function() {
    return expander1;
}).directive('accordion', function() {
    return accordion;
});
var moban = function ($scope, $http, $stateParams,$rootScope,$state) {
    var settings = {
        trigger:'hover',
        title:'',
        content:'<img src="../../image/my/1.jpg" width="115px" height="80px"/>',
        width:120,
        multi:false,
        closeable:false,
        style:'',
        padding:false
    };
    var settings1 = {
        trigger:'hover',
        title:'',
        content:'<br><img src="../../image/my/1.jpg" width="200px" height="150px"/>',
        width:"60rem",
        height:"15rem",
        multi:false,
        closeable:false,
        style:'position:fix,top:50%,left:30%;overflow:auto',
        padding:false
    };
    $('div.show-pop').webuiPopover('destroy').webuiPopover(settings);
    $('div.show-pop1').webuiPopover('destroy').webuiPopover(settings1);
    $scope.title = '点击展开';
    $scope.text = '这里是内部的内容。';
    $scope.expanders = [{
        title : 'Click me to expand',
        text : 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title : 'Click this',
        text : 'I am even better text than you have seen previously'
    }, {
        title : 'Test',
        text : 'haha'
    }];
    this.links=[];
    $scope.links=[];
    for(var i=0;i<9;i++){
        var tmp ={name:menu[i],href:i,id:'m'+i};//uisref
        this.links.push(tmp);
        $scope.links.push(tmp);
    }
    $scope.id=1;
    $scope.id1=2;
    $scope.id2=3;
    console.log("moban");
    $scope.show=function(menuid){
        $('#'+menuid).dropdown({justify: '#'+menuid});
    };
};
var mobanf = function ($scope,$state,$http) {
    var id = $state.params.id;
    $('img.lazy').lazyload({
        effect : 'fadeIn'
    });
    console.log("mobanf id="+id);
    $http.get("xx/yy.html").success(function(data){
        console.log("handle success!");
    }).error(function(err){
        alert("请求结束，处理异常！错误代码："+err.status+","+err.statusText);
    });
    $http.get("data.json").success(function(data){
        console.log("handle success!"+data);
    }).error(function(err){
        console.log("请求结束，处理异常！错误代码："+err.status+","+err.statusText);
    });
    $scope.name="chenyb"+id;
    //$('#menu').css("display","none");
    $scope.hidden = function(){
        $('#menu').css("display","none");
    }
    if(id==null){
        id=1;
    }else{
        id=parseInt(id);
    }
    if(id>6){
        $scope.id = id%7+1;
        $scope.id1 = id%7+2;
        $scope.id2 = id%7+3 ;
    }else {
        $scope.id = id;
        $scope.id1 = id + 1;
        $scope.id2 = id + 2;
    }
}
myApp.controller("mycontroller",moban);
myApp.run(['$rootScope',function ($rootScope) {

    //路由开始切换
    /**
     * args[0]: 事件
     * args[1]: 要切换的路由
     * args[2]: 第一次进入该方法,没有当前路由,为undefined
     */
    $rootScope.$on('$routeChangeStart',function (event,next,current) {
        console.log([event,next,current]);
    });

    //路由切换成功
    /**
     * args[0]: 事件
     * args[1]: 当前的路由
     * args[2]: 上一个路由,第一次进入该方法,没有上一个路由,为undefined
     */
    $rootScope.$on('$routeChangeSuccess',function (event,current,previous) {
        console.log([event,current,previous]);
    });

    //路由切换失败(比如resolve中有错误等待),都会导致路由切换失败
    $rootScope.$on('$routeChangeError',function (event,msg) {
        console.log([event,msg]);
    });

    //当$location.path发生变化或者$location.url发生变化时触发
    $rootScope.$on('$locationChangeStart',function (event,msg) {
        console.log([event,msg]);
    });

    //当且仅当path或url变化成功后触发
    $rootScope.$on('$locationChangeSuccess',function (event,msg) {
        console.log([event,msg]);
    });

}])
myApp.config(['$stateProvider', '$urlRouterProvider',"$httpProvider","$locationProvider",
    function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {
       $httpProvider.interceptors.push('myInterceptor');
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix = '!';
      /*
        $httpProvider.interceptors.push('authInterceptor');*/
        $stateProvider.state("moban",{
            url:"/index",
            abstract:true,
            controller:moban,
            controllerAs:'moban',
            templateUrl:"minfor.html"
        }).state("toPage",{
            url:"toPage",
            params:{id:null},
            views:{
                "gg":{
                url:"toPage",///{id} 都可以，{id}的方式uri会发生变化
                params:{id:null},
                controller:mobanf,
                controllerAs:"mobanf",
                templateUrl:"minfor.html"
                }
            }
        });
        $urlRouterProvider.otherwise("/toPage");
    }
]).component('myApp', {
    template: '<div class="app"><div ui-view>1231</div></div>',
    restrict: 'E'
})/*.factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
    var state;
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            console.log("send request!");
            if ($cookies.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookies.get('token');
            }
            return config;
        },
        // Intercept 401s and redirect you to login
        responseError: function (response) {
            if (response.status === 401) {
                console.log("hand request!"+response.status)
                (state || (state = $injector.get('$state'))).go('login');
                // remove any stale tokens
                $cookies.remove('token');
                return $q.reject(response);
            }else {
                console.log("handle request!"+response.status)
                return $q.reject(response);
            }
        }
    }
    })*/;