app2.controller('ctrl4',function($scope,fact4){
// $scope.oh="Yes";
$scope.recievedsearch=false;
    $scope.sortsearch='relevance';
    // console.log(location.href);
    var searching = location.href.split("/");
    // console.log(search);
    // console.log(search.length);
    var search = searching[searching.length-1];
    console.log(search);
    $scope.getSearched=()=>{
        // console.log("calaled search",$scope.searched);
    var pr = fact4.searchProds(search);
    pr.then(success,fail);
    function success(data){
        // console.log("mila kya",data.data);
        $scope.searchprods=data.data.data;
        $scope.recievedsearch=true;
    }
    function fail(err){
        console.log("ERROR IS"+err);
    }
}
$scope.getSearched();
});