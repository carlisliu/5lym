/**
 * Created by Carlis on 3/21/15.
 */
var express = require('express'),
    router = express.Router(),
    Article = require('../proxy').Article,
    User = require('../proxy').User,
    Category = require('../proxy').Category,
    moment = require('moment'),
    config = require('../config'),
    Common = require('../proxy').Common;

/*Articles Home Page*/
router.get('/', function (req, res, next) {
    var currentPage = req.query.page || 1, pageSize = config.page.pageSize, paginationSize = config.page.paginationSize;
    Article.getArticleCount(function (err, count) {
        if (currentPage * pageSize > count) {
            currentPage = 1;
        }
        Article.pagination(currentPage, pageSize, function (err, articles) {
            if (err) {
                res.render('redirect', {title: '模块正在建设中..'});
            } else {
                articles && articles.forEach(function (content, index) {
                    if (!index) {
                        articles[index].figure = '/figures/007.jpg';
                    }
                    if (content.content && content.content.length > 400) {
                        articles[index].content = content.content.substring(0, 400) + '...';
                    }
                    articles[index].create_date = moment(content.create_at).format('YYYY-MM-DD');
                });
                var data = { title: '文章首页--刘雨萌博客' };
                data.articles = articles;
                data.totalPageRecord = articles.length || 0;
                data.paginationHtml = function (currentPage, pageSize, paginationSize, totalSize) {
                    var result = '', firstPage, lastPage, i;
                    if (!totalSize) {
                        return result;
                    }
                    firstPage = 1;
                    lastPage = totalSize % pageSize ? (Math.floor(totalSize / pageSize) + 1) : Math.floor(totalSize / pageSize);
                    if (currentPage > lastPage) {
                        currentPage = firstPage;
                    }
                    if (currentPage <= paginationSize) {
                        if (lastPage < paginationSize) {
                            paginationSize = lastPage
                        }
                        for (i = 0; i < paginationSize; i++) {
                            if (currentPage == (i + 1)) {
                                result += '<b>' + currentPage + '</b>';
                            } else {
                                result += '<a href="/articles?page=' + (i + 1) + '">' + (i + 1) + '</a>';
                            }
                        }
                        if (lastPage > paginationSize) {
                            result += '<a href="/articles?page=' + (paginationSize + 1) + '">' + '>' + '</a>';
                            result += '<a href="/articles?page=' + lastPage + '">' + '>>' + '</a>';
                        }
                    } else {
                        if (currentPage - 2 > 1) {
                            result = '<a href="/articles?page=' + firstPage + '">' + '<<' + '</a>' + '<a href="/articles?page=' + (currentPage - 1) + '">' + '<' + '</a>';
                        }
                        for (i = currentPage - 2; i < Math.min(lastPage + 1, currentPage + 3); i++) {
                            if (currentPage == i) {
                                result += '<b>' + currentPage + '</b>';
                            } else {
                                result += '<a href="/articles?page=' + i + '">' + i + '</a>';
                            }
                        }
                        if (lastPage - currentPage > 2) {
                            result += '<a href="/articles?page=' + (currentPage + 3) + '">' + '>' + '</a>';
                            result += '<a href="/articles?page=' + lastPage + '">' + '>>' + '</a>';
                        }
                    }
                    return result;
                }(currentPage, pageSize, paginationSize, data.totalPageRecord);
                Category.findAllCategories(function (err, categories) {
                    var categoryMap = {};
                    categories.forEach(function (content) {
                        categoryMap[content.category_id] = content.category_name;
                    });
                    var articles = data.articles || [];
                    articles.forEach(function (content, index) {
                        content.category_name = categoryMap[content.category_id] || '未分类';
                    });
                    data.me = Common.getCommonData().me;
                    res.render('article_index', data);
                });
            }
        });
    });

});

/* GET article by articleId */
router.get('/:id', function (req, res, next) {
    var articleId = req.params['id'];
    Article.getArticleById(articleId, function (err, article) {
        Article.updateReviewTimes(article, function (err, updArticle) {
            if (err) {
                console.log("error occurs when update article's review times.");
            } else {
                console.log('article has been updated, review times is ' + updArticle.review_times);
            }
        });
        article.create_date = moment(article.create_at).format('YYYY-MM-DD');
        res.render('article_detail', {article: article, title: (article.title || '') + '-刘雨萌博客', me: Common.getCommonData().me});
    });
});

router.get('/get/adjacent.html', function (req, res, next) {
    var articleId = req.query['id'];
    if (!articleId) {
        res.json({'test': 'Carlis Liu'});
        return;
    }
    Article.getArticleById(articleId, function (err, article) {
        if (err) {
            res.json(null);
        } else {
            var date = article.create_at;
            Article.getAdjacentArticles(date, function (err, preOne, nextOne) {
                var data = {};
                if (preOne) {
                    data.pre = preOne;
                }
                if (nextOne) {
                    data.next = nextOne;
                }
                res.json(data);
            });
        }
    });
});

router.get('/admin/create', function (req, res, next) {
    res.render('create_article');
});

router.post('/add', function (req, res, next) {
    var title, content;
    title = req.body['title'];
    content = req.body['content'];
    if (title && content) {
        User.getUserById('carlisliu', function (err, user) {
            user = user || {};
            Article.saveArticle({
                title: title,
                content: content,
                category_id: '1',
                author_id: user.login_name
            }, function (err, article) {
                console.log(article);
                if (err) {
                    res.end('Saved Error: ' + title);
                }
                res.send('保存成功 ' + article.title);
            });
        });
    } else {
        res.redirect('/articles/add?err=no%20data');
    }
});

router.get('/get/latest.html', function (req, res, next) {
    Article.findLatestArticles(function (error, articles) {
        var data = {};
        if (error) {
            data.status = 'error';
            //data.msg = error.toString();
        } else {
            data.status = 'success';
            data.articles = articles;
        }
        res.json(data);
    })
});

router.get('/get/recommend.html', function (req, res, next) {
    Article.findRecommendArticles(function (error, articles) {
        var data = {};
        if (error) {
            data.status = 'error';
            //data.msg = error.toString();
        } else {
            data.status = 'success';
            data.articles = articles;
        }
        res.json(data);
    })
});

module.exports = router;
