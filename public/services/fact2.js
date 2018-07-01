app2.factory('fact2',($http,$q)=>{
    const object = {
        getProducts(){
            var pr = $q.defer();
            var url="/products";
            $http.get(url).then(success,fail);
            function success(data){
                return pr.resolve(data);
            }
            function fail(err){
                return pr.reject(err);
            }
return pr.promise;
        }
//         ,searchProds(value){
//             // console.log(value," --value");
//             var pr = $q.defer();
//             var url="/search/"+value;
//             $http.get(url).then(success,fail);
//             function success(data){
//                 return pr.resolve(data);
//             }
//             function fail(err){
//                 return pr.reject(err);
//             }
// return pr.promise;
//         }
    };
    return object;
});