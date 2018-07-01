app2.factory('fact4',($http,$q)=>{
    var object = {
        searchProds(value){
            // console.log(value," --value");
            var pr = $q.defer();
            var url="/search/"+value;
            $http.get(url).then(success,fail);
            function success(data){
                return pr.resolve(data);
            }
            function fail(err){
                return pr.reject(err);
            }
return pr.promise;
        }
    };

    return object;
});