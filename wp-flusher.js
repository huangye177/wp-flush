'use strict';
var _ = require('lodash');
var fs = require('fs');
var WPAPI = require('wpapi');
var hn = require('hacker-news-api');
var propReader = require('properties-reader');

const LINK_FILE = 'output.txt';

var properties = propReader('config.properties');
var wp = new WPAPI({
    endpoint: properties.get('wp.url') + '/wp-json',
    username: properties.get('wp.user'),
    password: properties.get('wp.password')
});

class WpFlusher {
    constructor() {
    }

    flush() {
        console.log('Getting and posting', parseInt(properties.get('count.post.per.generate')), 'articles to flush to your wordpress :-p');
        hn.ask_hn().recent((error, data) => {
            if (error) throw error;

            let news = _.get(data, 'hits');
            _.times(parseInt(properties.get('count.post.per.generate')), () => {
                let newsPost = _.sample(news);
                this.post(newsPost.title, newsPost.story_text);
            });

            console.log('Done!!');
        });
    }

    post(title, content) {
        wp.posts().create({
            title: title,
            content: content,
            status: 'publish'
        }).then((response) => {
            fs.writeFileSync(LINK_FILE, response.link + '\n',  {'flag':'a'}, (err) => {
                if (err) {
                    return console.error('Write link file error: ', err);
                }
            });
        }).catch((err) => {
            console.log('WP Post error: ', err);
        });
    }
}

module.exports = new WpFlusher();