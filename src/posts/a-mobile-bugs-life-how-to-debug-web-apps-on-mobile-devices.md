---
title: "A (Mobile) Bug's Life - How to Debug Web Apps on Mobile Devices"
description: "If only bugs in our code were as cute and adorable as those little rascals in A Bugs Life!    We've..."
date: "2023-08-25"
tags: ["webdev", "testing", "mobile"]
slug: "a-mobile-bugs-life-how-to-debug-web-apps-on-mobile-devices"
published: true
devto_id: 1580071
---

If only bugs in our code were as cute and adorable as those little rascals in A Bugs Life!

![Cute, fat caterpillar from A Bugs Life pretending to be a bumblebee](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4xgakrtzgkuptsuyo61l.gif)

We've all been there. You've spent hours working on your web app. Everything looks and works great on your computer. You take the time to test on different browsers, and use the built in dev tools to check dozens of device sizes. All look good. We're ready to move forward.

Maybe you have a staging environment you can deploy to in order to run tests in a production-like environment. Maybe you don't and you just have to roll the dice and deploy straight to production.

Then, the alarms start going off...something's not working.

![Caterpillar from A Bugs Life screaming](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j5kvlozqcjrg1u0t0qay.gif)

You check the logs and see a bunch of errors all pointing to mobile devices. You grab your phone, punch in the url, and sure enough, your app isn't working as it should...there's a bug...and not a cute one just learning to fly. How can this be? You tested your code thoroughly on your computer using [Device Mode](https://developer.chrome.com/docs/devtools/device-mode/). Why are we seeing these errors now?

## The Downside of Device Mode
As helpful as it is, Device Mode on desktop browsers is not a perfect comparison to browsers on mobile devices...it's merely an approximation. It would be impossible for every browser to load and simulate perfectly replicated environments of every different device out there, running on different hardware, with different configurations and managed in different ways. So Device Mode, while still very useful, is really just giving you an educated guess of how your app will look on different devices.

In this post, I'm going to share some other convenient methods for testing your web app on mobile devices that will provide more accurate results than just relying on Device Mode alone. A when we're through, hopefully they will help you get rid of those mean grasshoppers...I mean bugs.

![A mean grasshopper from A Bugs Life looking down](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/78mityx6cs18bizju0a0.gif)

## Local Hosting
Did you know that many bundlers come with support for hosting your web app from your own computer so it can be accessed on your local network? It's true! Tools like Vite, Webpack, and Parcel can be configured to host your development server so you can view the app in the browser of any device connected to your local network. They even do this with hot module reloading (HMR) so you can change your code and see it immediately on those devices!

Let's see how we can set this up in these tools...

### Vite
I'm a huge fan of Vite, and use it exclusively for my personal projects at this point. If you haven't checked it out yet, I HIGHLY recommend it!

Anyways, to access your dev server on your local network with Vite all you have to do is use the `--host` parameter when starting up your development server.

```
npm run dev -- --host
```

After running this, you should then see some output like this in your terminal:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.110:5173/
```

Now connect your phone to the same network, open a browser, go to the address labelled "Network", and Boom, you can view the app! You can even make changes to your code, and they'll immediately appear on your phone!

### Parcel
By default, Parcel listens on all hosts. So you just have to start up the dev server like you normally would...no changes needed!

```
parcel <target>
```

After a moment, you should see some output like this in your terminal:

```
Server running at http://localhost:1234
```

Even though it's not printed out, you can replace `localhost` with your local IP address and be able to view the app.

In my case, my local IP address is `192.168.1.110`. So if I go to my phone, open a browser and enter `http://192.168.1.110:1234`...Pow! I can see my app! How cool is that?!

### Webpack
As with many things, Webpack requires a little extra configuration to host your dev server and make it accessible on your local network. But it's still pretty easy.

In your `webpack.config.js` file, you'll need to add a couple properties to your `devServer` configuration.

*webpack.config.js*
```javascript
module.exports = {
	...
	devServer: {
		host: '0.0.0.0',
		port: 1234,
		...
	},
	...
};
```

You can see here, I've two properties:
- `host` - Setting this to `0.0.0.0` makes the server accessible externally, outside of "localhost".
- `port` - This can be set to whatever port you want to use for development. Commonly used ones are `1234`, `3000` and `8080`.

Now if you start up the development server:

```
webpack serve 
```

You should then see some output like this in your terminal:

```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:1234/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.1.110:1234/
<i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:1234/
```

Once again, grab your phone, open the browser, and go to `http://192.168.1.110:1234/` (being sure to replace my IP address with your own). Kapow! You can now see your app on your phone!

These are just a few of the tools that are being used out there, but hopefully you can see how powerful this kind of setup can be! Without lots of complicated connections or deployments you can easily see how your web app runs on actual mobile devices, severely reducing the risk of those surprise production issues.


![Flik from a A Bugs Life floating on a dandilion seed, smiling](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bvurnqnzsjauxk5eh90u.gif)

But you may have noticed that you don't have access to your normal dev tools when viewing your app on your phone. In the next couple of sections, we'll take a look at some ways you can.

## Web Inspector on iOS
We can view our web app on our iPhone, but what if there's an issue and we need to troubleshoot? Luckily, iOS devices come with a built in way to connect to your Mac and use the developer tools just like you would on a desktop browser. The tool is called Web Inspector, and it's pretty awesome!

🚧 This does require you to have an Apple ID, an iOS device (iPhone or iPad), a Mac computer, and a USB cable to connect the iOS device to the Mac. Both devices also need to be signed in with the same Apple ID.

Web Inspector isn't enabled by default, so let's start from the beginning and get everything enabled and setup.

### Enabling Up Web Inspector
On your iOS device, go to `Settings` > `Safari` > `Advanced`, find the `Web Inspector` setting, and switch the toggle to on (it should be green when you're done).

That's it, your iOS device is almost ready to connect.

### Enabling the Develop Menu on Your Mac
Next, you need to enable the develop menu in Safari on your Mac. 

Open up Safari, go to the `Safari menu` > `Preferences` > `Advanced` and check the checkbox that says `Show Develop menu in menu bar`.

Close the Preferences window.

Now confirm you see a `Develop` menu option at the top of your window when Safari is active.

### Connecting
Time to connect your iOS device and your Mac with the USB cable.

*Sadly, this does not work over WiFi.* 😢

You may need to grant access on your iOS device.

Now, on the iOS device, open Safari and go to your web app. (Even though the connection to your Mac won't work over WiFi, you CAN still visit your app in the same way you did in the previous section. If this is not an option, you can also visit the publicly hosted version (ie. staging or production).)

Now that you're on the web app, go back to your Mac, open the `Develop` menu and look for the name of your iOS device (it should be toward the top). Hover over the name to open up a second menu, and in the new menu, under the `Safari` section, select the option with the name of your web app.

Once you select it, the menus should disappear, and a Safari dev tools window should appear. You should now be able to interact with the web app on your phone in the exact same way you would from the desktop Safari browser, including viewing the console, looking over all the network calls, and inspecting the page's HTML!

How cool is that?!

![Rolly Pollies from A Bugs Life hanging from strings and laughing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nvwnsgln2gn6ywrzo4tc.gif)

## Remote debugging on Android
Need to test your web app on an Android device? Not a problem! We're able to connect Android devices to our computers, and interact with them using any Chromium browser! If you aren't sure if you have a Chromium browser, Chrome, Edge, Arc, and Brave are popular choices.

🚧 This does require you to have an Android device, a computer with a Chromium browser installed, and a USB cable that can connect your Android device to your computer.

### Enable Developer Options on Android
Before we can connect our Android device, we first have to enable developer options on it. This will vary based on what device you have. Luckily, Google provides instructions for this, which you can find [here](https://developer.android.com/studio/debug/dev-options).

Once developer options are enabled, open them up and select `Enable USB Debugging`.

That's it!

### Enabling USB Device Discoverability in Chromium
Next, we need to make sure that your Chromium browser can discover USB devices.

Open up the browser on your computer, and go to `chrome://inspect#devices`. (Don't worry if you aren't using Chrome. This address will work on all Chromium browsers, and after pressing enter, you'll notice the URL automatically changes based on the browser you're using.)

If it's not already, check the checkbox labelled `Discover USB Devices`.

All done! But be sure to keep this window open...you'll need it in the next steps.

### Connecting
Time to connect your Android Device to your computer with the USB cable.

You may need to grant access on your Android device.

After a moment, you should see the name of your device show up in your computer's browser. If you do, your desktop browser's DevTools have successfully connected to your Android device.

(*If you don't see your device show up, you can view troubleshooting tips [here](https://developer.chrome.com/docs/devtools/remote-debugging/#troubleshooting)*)

Now open Chrome on your Android device.

Back on your computer, just beneath the name of your device, you should see the version of Chrome it's using, along with an input where you can enter a URL.

Enter the URL of your web app (even though the connection to your computer requires a USB connection, and won't work over WiFi, you CAN still visit your app on your local network in the same way you did in the section above) and then click `Open`.

A new section should appear just below the Chromium version. In this section, click `Inspect`.

A new window should appear with the DevTools open. You can now interact with the browser on your Android device the exact same way you would from the desktop browser, including viewing the console, looking over all the network calls, and inspecting the page's HTML!

![Bugs from A Bugs Life celegrating](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3c2rczeuulwai7mok0pc.gif)

## Debugging Without a Physical Device
Although the best testing is done on the physical device your app is going to run on, sometimes we don't have access to one. Lucky for us, there are lots tools out there that can help with this. Some are free (or at least have a free tier), but others do cost some money. But all are worth looking into to see which ones will suite your needs best.

- [BrowserStack](https://www.browserstack.com/)
- [LambdaTest](https://www.lambdatest.com/)
- [Browserling](https://www.browserling.com/)
- [TestCafe Studio](https://testcafe.io/)
- [Datadog Automated Browser Tests](https://www.datadoghq.com/dg/apm/synthetics/browser-tests/)


## Conclusion
It can be really frustrating and confusing when bugs happen on mobile web apps, especially when they don't happen on your desktop...but it doesn't have to be. 

In this post, we learned how to host your web app locally, without complex deployments and configurations. Doing this enables you to visit the app on any device connected to your local network, even while it's currently being worked on.

We also learned how to dig deeper into mobile issues by using your browser's dev tools to access your mobile browser, regardless if you're using iOS or Android.

Lastly, I shared a few tools with you that are great for testing web apps when you don't have access to the physical mobile devices.

I hope this has helped to make your debugging efforts easier, and your dev experience a little better. Thank you for learning something new with me, and until next time, Happy Hacking!

![Flick from A Bugs Life waving goodbye and then crashing into a rock](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0668as49lafsvtr3lbrk.gif)
