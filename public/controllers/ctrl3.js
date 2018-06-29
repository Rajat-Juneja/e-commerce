app2.controller('ctrl3',function($scope,$routeParams,fact3){
    $scope.count=1;
    $scope.recieved=false;
    $scope.product_id=$routeParams.id;

    var pr = fact3.getProd($scope.product_id);
    pr.then(success,fail);
    function success(data){
        $scope.pr=data.data.data;
        $scope.recieved=true;
        $scope.action="/product/"+$scope.pr._id+"/avail";
        // console.log($scope.action);
        // console.log(data);
    }
    function fail(err){
        console.log(err);
    };
    $scope.countOver=false;
        $scope.checkCount=(available)=>{
        // console.log(available);
        if($scope.count<=1){
            $scope.count=1;
        }
        if($scope.count<=available){
            $scope.countOver=false;
        }
        if($scope.count>available){
            $scope.countOver=true;
        }
    };

    $scope.checkAvailAndBook=()=>{
        // console.log($scope.count);
        $scope.prof={};
        $scope.prof.available=$scope.count;
        console.log($scope.prof);
        var pr2 = fact3.changeAvail($scope.count,$scope.product_id,$scope.prof,$scope.action);
        pr2.then(success,fail);
        function success(data){
            console.log("Daata"+JSON.stringify(data));
        }
        function fail(err){
            console.log("Err",err);
        }

        // Reduce the availability from ordered
        // Add to the db ordered products, with phone number
    }

    // $scope.productid=$
});