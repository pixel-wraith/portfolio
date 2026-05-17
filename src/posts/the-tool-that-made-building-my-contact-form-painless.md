---
title: "The Tool That Made Building My Contact Form Painless"
description: "Over the years I've built many email solutions that were simply meant to send emails to myself...."
date: "2023-08-21"
tags: ["valtown", "javascript", "tutorial", "email"]
slug: "the-tool-that-made-building-my-contact-form-painless"
published: true
devto_id: 1574833
---

Over the years I've built many email solutions that were simply meant to send emails to myself. Whether it be for notifying myself of errors, users reporting bugs, requests for information, or just general contact, the process was always relatively the same, and I always wished there was a simpler solution. Turns out, there IS one! 

I first heard about it on [Syntax](https://syntax.fm/show/640/supper-club-val-town-with-steve-krouse), and then again on [JS Party](https://changelog.com/jsparty/287). With it being featured on 2 of my fav podcasts, I thought I should give it a look, and boy was I glad I did!

What is this amazing solution you ask? Well it's a nifty little tool called [Val Town](https://www.val.town/).

Val Town is a website where you can write, run, and deploy small snippets of Javascript or Typescript, which are called Vals. If you're familiar with GitHub Gists, you can think of these very much the same, except Vals can be run and hosted like an API! I'll show an example of this a little later.

Immediately after signing up, right there in their intro tutorial was the answer to my woes. A simple, built in function for sending yourself an email!

![Ron Swanson tearing up, saying "It's so beautiful."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j47d9zg3843qtd58fzzz.gif)

As luck would have it, I'm currently in the middle of rebuilding my portfolio site, and naturally I need a "Get in Touch" section. I wasn't really looking forward to building this functionality out again, so of course I HAD to give this new tool a try. Turns out, it's pretty awesome! And that's what this post is going to be about.

I'm going to show just how easy Val Town was to set up and implement with an external project. I built my solution in SvelteKit, but since this can all be implemented across any stack, I'm going to try and make it as agnostic as I can. But since I do have to choose a language to write it in, I'm going to show this to you in Javascript.

-----

## Overview
Let's first have a look at what we are going to build.

![A simple flow chart with 4 nodes connected by arrows representing data passing back and forth between them. The Client node connects to the API node, indicating these 2 nodes will communicate with one another. The API and Val Town nodes are also connected, indicating they will also communicate with one another. Lastly, the Val Town node is connected to a node labelled "You" representing Val Town sending an email to yourself.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/blltqti2rsyhsjrse253.png)

As you can see, we're going to create a very simple flow where our Client is going to be able to send data to our own API. The API will then send the data to Val Town where it will be emailed to yourself. Val Town will then send a response to the API letting it know if it was successful or not. The API will then relay this information back to the Client to let the user know.

We're going to start in Val Town where we'll create our Val. Then we'll move into our API which will receive some form data, parse it, and send it to Val Town. Lastly, we'll build a simple form that will submit data to our API.


Now that we know what we are going to be building, let's hop in the car and head over to [Val Town](https://www.val.town/)!


## Welcome to Val Town!
If you haven't already, go ahead and create your Val Town account. Make sure you use the email address that you want to send emails to. I also recommend going through their short tutorial to get a sense of how stuff works.

Now, go to [Home](https://www.val.town/). You may already see a few Vals displayed here if you did the tutorial, but you can ignore them for now. Next to your avatar in the top right of the window click "New Val", which should open a modal that looks like this:

![The new Val modal on Val town](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oqdx9p9gf7mqp6ibc9po.png)

This is where we're going to write our first bit of Javascript to handle emailing ourselves. Our code will need to take 2 parameters, which are both strings, `subject` and `html`. `subject` will be the subject of the email being sent, and `html` will be the (HTML optional) body of the email. We'll then use the built in function to send an email to ourselves, and lastly respond with the status.

```javascript
function sendEmail(subject, html) {
  try {
    console.email({ html, subject });
    return Response.json({ status: "ok" });
  } catch (err) {
    return Response.json({ status: "error", error: err.message });
  }
}
```

Now click `Run`.

You should now see your Val displayed at the top of your list of Vals on your homepage.

![Seth Meyers saying "Boom, easy as that."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oymieipy1fis0oaj5t45.gif)

I want to point out a couple of things in the header of your new Val...

![The header of a Val as displayed on the Val Town homepage](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wi4bj9sl06h2gs7feeia.png)

1. Notice the name of the Val has been appended to your @username. This is how you will reference the Val later.

2. Next to the Val name you should see a version (v0). If you edit the Val and then click `Save`, Val Town will automatically create a new version of your Val for you. If you click on this version number, a dropdown will appear that will let you pick from past versions if you ever want to revert back.

3. Next, you should see a lock icon? This means your Val is currently private. So right now only you and your other Vals can access it. If you click this icon, you'll be presented with options to `Unlist` it, or make it `Public`. For this tutorial, I recommend keeping it set to private.

4. Then all the way to the right of the Val header, you should see an options menu button (it has three horizontal dots). If you press this, you'll be presented with a dropdown that has a whole bunch of options. I want to draw your attention to the `Endpoints` option. If you hover over this, you'll see another menu appear that will let you copy either a run or express fetch. I point this out because we will make use of this in a later step.

But that's it! Your Val is now set up and ready to use! Simple, right?!

We'll come back to Val Town in the next section when we need to get our API key and to copy the fetch request code. But for now, let's move on to the API.


## The API
To keep things fairly general, I'm going to set up a very simple API here using [ExpressJS](https://expressjs.com/).

Let's start by setting up the new project. I'll call mine "email-yo-self".

(ℹ️ *If you'd rather just look at the project code without reading through the following setup, you can find it [here](https://github.com/iamthe-Wraith/email-yo-self)*);

- create the project directory by running `mkdir email-yo-self && cd email-yo-self`
- initialize the project with npm defaults by running `npm init -y`
- initialize the version control system (VCS) by running `git init`
- we don't want all the files to be tracked by git, so create a new ".gitignore" file and add the following content to it:
```
node_modules
.env
```

- install the required dependencies by running `npm i express dotenv body-parser`
  - `express` for the api
  - `dotenv` to inject the environment variables
  - `body-parser` to parse incoming request bodies
- install nodemon as a dev dependency to restart the script when you save changes by running `npm i -D nodemon`
- create a new `.env` file in the root of the project and add the following contents to it:
```
PORT=80 # or whatever port you wish to use
VAL_TOWN_API_TOKEN=
```

- lastly, add the following start script to the `package.json`
```json
{
  ...
  "scripts": {
    "start": "nodemon index.js",
    ...
  },
  ...
}
```

🗒️ *In a normal project, there should be more setup, such as adding linting with eslint, and/or testing using something like Jest. But we're going to skip that here to keep things short.*

Alright, time to write some code.

There are a couple steps here, and we'll take them 1 at a time.

First, let's set up our base express app, with a single endpoint we'll use to test that everything's running okay...

```javascript
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/status', (req, res) => {
  res
    .status(200)
    .json({ status: 'ok' });
});

app.listen(process.env.PORT, () => {
  console.log(`express app listening on port ${process.env.PORT}`);
});
```

Alright, let's test that our API is working as expected. In your terminal, run `npm start`, then visit `http://localhost:80` in your browser where you should see `{status: "ok"}` printed.

### The POST Request
Awesome! Our API is up and running. Now let's add the POST route that will handle receiving some form data.

```javascript
app.post('/', async (req, res) => {
  const { subject, body } = req.body;

  if (!subject) {
    return res
      .status(422)
      .json({ error: 'A subject is required.' });
  }

  if (!body) {
    return res
      .status(422)
      .json({ error: 'A message body is required.' });
  }

  res
    .status(200)
    .json({ message: 'Everything looks good so far...' });
});
```

🗒️ *For production, you will want to perform additional validation on the `subject` and `body` values to make sure the user isn't trying to send you malicious content. This is beyond the scope of this post, but there are many tools out there that can help with this, like [sanitize-html](https://www.npmjs.com/package/sanitize-html) for example.*

Now that we have more than a simple GET request, we're going to need something more to test our new endpoint. I personally prefer to use Postman. So we'll add the request to Postman and test that everything is working.

![Screenshot of a Postman HTTP Request having been made with a url of http://localhost:80/, with body parameters: subject set to "this is just a test...", and body set to "this is just a test message...". The response is a JSON object with property: message set to "Everything looks good so far..."](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xj5cbdq2elrghgdugni5.png)

Great! Our POST endpoint is receiving the form data successfully. We're finally ready to make our request to Val Town.

First, go ahead and replace the 200 response we were using for testing with an empty `try...catch` block. Your endpoint should look like this...

```javascript
app.post('/', async (req, res) => {
  const { subject, body } = req.body;

  if (!subject) {
    return res
      .status(422)
      .json({ error: 'A subject is required.' });
  }

  if (!body) {
    return res
      .status(422)
      .json({ error: 'A message body is required.' });
  }

  try {

  } catch (err) {

  }
});
```

Now, if you recall, earlier I mentioned the privacy setting on the Val we created. Since we left it as Private, we have to provide an API Token in order to access it. Lucky for us, Val Town makes this super easy.

Go back to your Val Town homepage and click your username in the upper right of the window. In the dropdown that appears, click "API tokens".

![The Val Town user menu expanded with "API tokens" highlighted](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vaqc5imnh7l8h95x17g8.png)

This will take you to another page where you should see at least 1 token already created for you. If you don't see one (it will look something like this: `abcd1234-a123-123a-456b-123ab45c67de` (<- this is just an example and is not a real token)) just click the "New" button and a new token will be generated for you.

Copy the token and paste it inside your .env file as the value for the `VAL_TOWN_API_TOKEN` environment variable we added earlier.

Your .env file should now look something like this...

```
PORT=80
VAL_TOWN_API_TOKEN=abcd1234-a123-123a-456b-123ab45c67de
```

Next, let's add the fetch request to our code. Remember the more options menu in the header of your Val that I pointed out earlier? Go back there, hover over the "Endpoints" option and click "Copy run fetch".

![The Val options menu expanded with the Endpoints > Copy run fetch option highlighted](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h8fwwkay97oomvghtvgf.png)

Go back to the POST endpoint inside the index.js file, paste the fetch request into your `try` block.

### 🚨 IMPORTANT 🚨
Take a look at the code you just pasted. Notice there's a token included in it. THIS NEEDS TO BE REMOVED! To do this, update your `headers` object so it looks like this...

```javascript
...
headers: { Authorization: `Bearer ${process.env.VAL_TOWN_API_TOKEN}` },
...
```

Next, if the request is successful, we'll want to send a success response. So just below the fetch request, add the following:

```javascript
return res
  .status(200)
  .send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <p>Your email was sent successfully!
      </body>
    </html>`);
```

We also need to make sure to handle any errors, so inside the empty catch block, add something like this...

```javascript
console.log(err);
return res
  .status(500)
  .json({ error: 'Well this is awkward. Something seems to be have gone wrong while sending your email. Please try again later.' });
```

Your endpoint should now look like this...

```javascript
app.post('/', async (req, res) => {
  const { subject, body } = req.body;

  if (!subject) {
    return res
      .status(422)
      .json({ error: 'A subject is required.' });
  }

  if (!body) {
    return res
      .status(422)
      .json({ error: 'A message body is required.' });
  }

  try {
    await fetch("https://api.val.town/v1/run/jakelundberg.sendEmail", {
      method: "POST",
      body: JSON.stringify({args: [subject, body]}),
      headers: { Authorization: `Bearer ${process.env.VAL_TOWN_API_TOKEN}` },
    });

    return res
      .status(200)
      .send(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
            <p>Your email was sent successfully!
          </body>
        </html>`);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Well this is awkward. Something seems to be have gone wrong while sending your email. Please try again later.' });
  }
});
```

Lastly, let's test the endpoint! You'll need to restart your script (if you haven't already) since you made changes to your .env file. Once you've done that, resubmit your request in Postman (or whatever tool you are using).

If everything was successful, not only should you have gotten a successful response, but after a moment or 2, you should also receive an email from yourself!!!

And that's it! Our POST request is done!

## The Client
The client for this project is going to be kept very simple, using plain ol' HTML.

We already have our server set up, so we're just going to create an endpoint that will deliver our form to the browser.

```javascript
app.get('/', (req, res) => {
  res
    .status(200)
    .send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <form method="post">
            <div>
              <label for="subject">Subject</label>
              <input type="text" name="subject" id="subject" />
            </div>

            <div>
              <label for="body">Body</label>
              <textarea name="body" id="body"></textarea>
            </div>

            <button>Send</button>
          </form>
        </body>
      </html>`);
});
```

Now, if you visit `http://localhost:80` in your browser, you should see the barebones form. And if you fill it out and submit it, you should receive an email in just a moment or 2!

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0r1btqaym0wmtwyry2us.gif)

## Conclusion
Let's recap everything we just did.

We created a Val in Val Town that handled sending ourselves an email using their built in `console.email` function. We then created an API that was able to send data to that Val. Lastly we added an HTML form to kick the whole process off!

You can find all the code we wrote in the associated [GitHub repo](https://github.com/iamthe-Wraith/email-yo-self)!

I hope this post sheds a little light on how amazing Val Town is, and how you can do some pretty impressive stuff with a very small amount of code!

Thanks for taking the time to discover something new with me, and until next time, Happy Hacking!
