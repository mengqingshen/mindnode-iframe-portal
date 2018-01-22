# mindnode-iframe-server
The url shared by mindnote can't be accesed within iframe, so let's build a server to proxy the link.

## why?
If you are a user of mindnode, you may occur problem when you try to show your mindnode in your own website by iframe. The reason is that the response header x-frame-options was set. How to solve the problem? Well, it's pretty easy. You can offer a proxy server in which change the response header, so the brwser won't block your mindnode in iframe anymore. And that's what the project is doing.

## how?
If you already have a running server, you can simply fork this project. Then change the config in `ecosystem.json` just like this

```javascript
{
  "apps": [
    {
      "name": "mindnode-iframe-portal",
      "script": "src/app.js",
      "env": {
        "COMMON_VARIABLE": true
      },
      "env_production": {
        "NODE_ENV": "production",
        "PORT": "9000"
      },
      "instances": 3
    }
  ],
  "deploy": {
    "production": {
      "user": "saber",
      "host": ["47.93.14.9"], // 1. replace it with your own IP
      "port": "2012", // 2. replace it with your own ssh port
      "ref": "origin/master",
      "repo": "https://github.com/mengqingshen/mindnode-iframe-portal.git", // 3. replace it with your own git responsitry
      "path": "/www/mindnode.mengqingshen.com", // 4. replace it with your own path in your server
      "ssh_options": "StrictHostKeyChecking=no",
      "post-deploy": "npm install --registry=https://registry.npm.taobao.org && pm2 startOrRestart ecosystem.json --env production",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

Then go with(assuming you already know how to offer a server with nodejs.)

```bash
yarn run setup
yarn run deploy
```

Well, you may don't have a server like I do. Luckly, I have running it on my server. So you can simply chage the hostname of your mindnode link to `mindnode.mengqingshen`. Then you can put the link in any iframe you want. Cheers! 🍻

Well, no guaranty in performance and reliability thourgh.
