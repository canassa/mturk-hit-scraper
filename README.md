# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

```javascript
(function(d) {
    localStorage['username'] = d.querySelector('a[href="/account"]').text;

    // Remove CSS
    document.querySelector('link').remove();

    // Load Font Awesome
    var fa = d.createElement('link');
    fa.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
    fa.rel = 'stylesheet'
    d.getElementsByTagName('head')[0].appendChild(fa);

    // Add Vue.js anchor
    document.body.innerHTML = '<div id="app"></div>';

    // Loads Vue.js
    var script = d.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://rawgit.com/canassa/mturk-hit-scraper/master/dist/build.js';
    d.getElementsByTagName('head')[0].appendChild(script);
}(document));
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
