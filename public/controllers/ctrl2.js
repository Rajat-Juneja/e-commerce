app2.controller('ctrl2',function($scope,fact2){
    // $scope.rating='2.5';
    $scope.recievedall=false;
    $scope.sort='relevance';
    var pr = fact2.getProducts();
    pr.then(success,fail);
    function success(data){
        console.log(data);
        $scope.prods=data.data.data;
        $scope.recievedall=true;
        $scope.recievedsearch=false;
    }
    function fail(err){
        console.log("ERROR IS"+err);
    }

    $scope.goTo=()=>{
        location.href='http://localhost:1234/products.html#/products/search/'+$scope.searched;
    };

//     $scope.getSearched=()=>{
//         // console.log("calaled search",$scope.searched);
//     var pr = fact2.searchProds($scope.searched);
//     pr.then(success,fail);
//     function success(data){
//         console.log("mila kya",data.data);
//         $scope.produs=data.data.data;
//         $scope.recievedsearch=true;
//         $scope.recievedall=false;
//     }
//     function fail(err){
//         console.log("ERROR IS"+err);
//     }
// }
});