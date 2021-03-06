Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.headers.common['Accept'] = 'application/json';

const App = Vue.extend({
    data: function () {
        return {
            apiUrl: 'https://blog.r-c.im',
            site: {
                title: 'Project RC',
                subtitle: '#include <stdrc.h>',
                author: 'Richard Chien'
            },
            bootstrapTheme: 'yeti'
        }
    }
});

App.component('sidebar-content', {
    template: '<div class="panel panel-primary">\n  <div class="panel-body">\n    <h4>\n      Richard Chien<br>\n      <small>richardchien</small>\n    </h4>\n    <p>GitHub: <a href="http://github.com/richardchien">richardchien</a></p>\n    <p>Telegram: <a href="https://telegram.me/richardchien">@richardchien</a></p>\n    <p>这里是我的博客，欢迎你的来访，我会在这里写一些技术笔记和感想。</p>\n    <p>除非特别说明，文章均默认采用\n      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"\n         target="_blank">CC BY-SA 4.0 协议</a>。\n    </p>\n  </div>\n</div>\n<div class="panel panel-primary">\n  <div class="panel-body">\n    <h4>\n      友情链接<br>\n      <small>friend links</small>\n    </h4>\n    <ul>\n      <li><a href="http://tong-kuo.tumblr.com/">Tong Kuo</a></li>\n      <li><a href="https://www.puteulanus.com/">创世神域</a></li>\n      <li><a href="https://blog.ntzyz.io/">namespace ntzyz;</a></li>\n      <li><a href="http://www.orangejoy.moe/">404 Not Found.</a></li>\n      <li><a href="https://muguang.me/">暮光博客</a></li>\n    </ul>\n  </div>\n</div>\n<div class="panel panel-primary">\n  <div class="panel-body">\n    <h4>\n      歌单<br>\n      <small>song list</small>\n    </h4>\n    <div id="music-player-container"></div>\n    <p>喜欢？收藏完整歌单：<a href="http://music.163.com/#/m/playlist?id=87165194">欢快年轻积极向上的英文歌</a>。</p>\n  </div>\n</div>'
});

const BaseComponent = Vue.extend({
    data: function () {
        return {
            apiUrl: this.$router.app.apiUrl,
            ok: false,
            page: null
        }
    },
    computed: {
        site: {
            get: function () {
                return this.$router.app.site;
            },
            set: function (site) {
                this.$router.app.site = site;
            }
        }
    },
    route: {
        data: function (transition) {
            return this.$http.get(this.apiUrl + transition.to.path)
                .then(function (response) {
                    const json = response.json();
                    this.ok = json.ok;
                    if (json.ok) {
                        this.site = json.site;
                        this.page = json.page;
                    }
                    document.title = this.documentTitle();
                });
        }
    },
    methods: {
        formatDate: function (date) {
            const d = new Date(date);
            return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getUTCDate();
        },
        documentTitle: function () {
            return this.site.title;
        }
    },
    ready: function () {
        handleReady();
        this.$watch('$loadingRouteData', function (newVal, oldVal) {
            if (oldVal === true && newVal === false) {
                handleLoadedAll();
            }
        })
    },
    beforeDestroy: function () {
        handleBeforeDestroy();
    }
});
