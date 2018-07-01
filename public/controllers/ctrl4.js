app2.controller('ctrl4',function($scope,fact4){
// $scope.oh="Yes";
$scope.recievedsearch=false;
    $scope.sortsearch='relevance';
    $scope.getSearched=()=>{
        // console.log("calaled search",$scope.searched);
    var pr = fact4.searchProds($scope.searched);
    pr.then(success,fail);
    function success(data){
        console.log("mila kya",data.data);
        $scope.searchprods=data.data.data;
        $scope.recievedsearch=true;
    }
    function fail(err){
        console.log("ERROR IS"+err);
    }
}
});