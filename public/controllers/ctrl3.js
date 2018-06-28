app2.controller('ctrl3',function($scope,$routeParams,fact3){
    $scope.count=1;
    // console.log($routeParams);
    $scope.product_id=$routeParams.id;
    var pr = fact3.getProd($scope.product_id);
    pr.then(success,fail);
    function success(data){
        $scope.pr=data.data.data;
        console.log(data);
    }
    function fail(err){
        console.log(err);
    }

    // $scope.productid=$
});