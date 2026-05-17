---
title: "A Halloween Horror Story - The Missing CTA"
description: "👻 Happy Halloween!!! 🎃    In honor of this spooky time of year, I thought I'd share one of my..."
date: "2023-10-31"
tags: ["webdev", "bug", "css"]
slug: "a-halloween-horror-story-the-missing-cta"
published: true
devto_id: 1652166
---

👻 Happy Halloween!!! 🎃

![A cute kitten poking it's head over a counter and then meowing, with the words "Happy Halloween" displayed](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7upbj2pmywoudkjkcdnu.gif)

In honor of this spooky time of year, I thought I'd share one of my developer horror stories with you.

Several years ago, I was working as an Optimization Engineer at a local agency where I was responsible for building A/B tests and experiments for our enterprise level clients. Basically I would write small scripts to modify a client's site in some way. Then we would drop the script onto the client's production site using tools like Adobe Target or Optimizely where we could control audience targeting, traffic disbursement, etc. We would then monitor the impact of the changes compared to their existing site (the experiment's control) to identify optimizations they could make.

For one of these tests, I was tasked with updating a page on the client's Single Page Application (SPA). There were several changes being made, but one of them was to move the CTA (Call To Action) to a different location on one of their pages. The changes were easy enough to implement and we pushed the test out as a rush job to meet the client's deadline because they had a big sale coming up. The test got deployed with no issues and I moved onto my next test for another client.

2 days later, I got a message that our test was tanking the client's sales 📉 and that we needed to investigate why right away. I looked over the code...everything looked good. I looked over the UI changes on their site...everything was in place, exactly how the designs had intended. I sent it over to the QA person to get another pair of eyes on it. After a few hours, they got back to me and reported that the Checkout button on the final page of the user checkout flow was missing in our test, and there was no way for user's to complete their orders.

![Michael Scott from The Office cringing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/llrnuomt0jdfa155jj41.gif)

Once they pointed this out, it was easy to figure out what had happened. You see, with Single Page Applications, the page's HTML that exists outside the SPA's root node doesn't change very often after it's loaded (there are some exceptions to this, but those are beyond the scope of this post). So when we drop third-party scripts and styles onto the page, they remain there for the life of that page. 

What had happened was I had used CSS to hide the original CTA on the page we were testing, but the CSS selector I had used also matched the selector of the Checkout button in the checkout flow. Because my CSS wasn't scoped in any way, it was being applied to ALL pages of the site. This wasn't abnormal, we had to deal with this all the time. We normally could over specify the selector, and everything was fine. It wasn't uncommon for us to write selectors like 

```css
.message-container div > div.message-wrapper > div:nth-child(2) > button.primary { ... }
```

to target specific elements on an already rendered page, which is what I had done here. But even with the over specificity of my selector, I had still managed to target other buttons on other pages. Because of this, user's were unable to submit their orders, which obviously impacted revenue for those 2 days 😬...

Moral of the story...we all mess up! Sometimes those mistakes are small...sometimes they're really big. So if/when you find yourself having made a mistake, just know you're not alone.

Also, do everything in your power to keep testing and QA from being skipped just because there's a rushed deadline. The cost of bugs can often be greater than the cost to run tests and complete QA.

What are some of your developer horror stories stories?!
