app2.factory('fact3',function($http,$q){
    var object = {
        getProd(id){
            var pr = $q.defer();
            var url = '/product/'+id;
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