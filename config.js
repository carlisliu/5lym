/**
 * Created by carlis on 2/20/15.
 */

var config = {
//    db: 'mongodb://{username}:{password}@127.0.0.1/carlis_blog_prod',
    db: 'mongodb://127.0.0.1/carlis_blog_prod',
    db_name: 'carlis_blog_prod',
    username: 'root',
    password: 'root',
    page: {
        pageSize: 10,
        paginationSize: 5
    },
    title: "Carlis Liu's blog",
    catchphrase: 'Chance favors only the prepared mind',
    verification: '874u73ef109mf03mc9'
};
module.exports = config;