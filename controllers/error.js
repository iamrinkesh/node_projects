exports.get404 = (req, res, next) => { //if path not found then need to through page not found 404 error
    // res.status(404).send('<h1>404 Not Found</h1>');
    // res.status(404).sendFile(path.join(rootDir,'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page not found!', path: ''});
}