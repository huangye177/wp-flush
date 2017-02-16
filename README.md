## Welcome to WP-Flush

It allows you to flush your wordpress! :-p

Notice: it will create a lot of pressure on your WP server, so, be gentle :-p

##### How-to

1. Edit your configuration in config.properties, such as WP server address, user credential, and the number of news posts you wanna generate each time.

2. npm i

3. node index.js

That's it!

##### Results Output

4. generated post links will be printed into a output.txt for your review.

#### Known Problem

1. Only tested in NodeJS 7, and I love ES6... (is it an issue?)

2. It takes some time to execute even only to post a few posts, this is because I simply extract 10000+ from HN first and is too lazy to adjust the behaviour, for now...

3. If many posts generated, TIMEOUT exception can be seen. Not sure whether it is app problem or protection of my WP server (would be awesome for them! :-)

4. The output.txt may have missing or duplicate records, need to sync the file I/O.