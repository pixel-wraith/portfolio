---
title: "I Made a Boo Boo Filling an Array"
description: "The other day I was chatting with a young developer and they mentioned how watching tutorials and..."
date: "2023-09-01"
tags: ["bug", "development", "javascript"]
slug: "i-made-a-boo-boo-filling-an-array"
published: true
devto_id: 1586809
---

The other day I was chatting with a young developer and they mentioned how watching tutorials and reading blog posts is hard for them because the author always seems to have their stuff together. They know exactly what to add, when to add it, how it's going to to work, etc. But when I try to build the same thing, I just run into issue after issue, it takes me 5x longer, and I just don't get how these people are able to work without encountering the issues I do.

Naturally, I responded by explaining that they only see the end result. 99 times out of 100 the creator ran into a bunch of issues while creating their content, but they only showed the stuff that worked after they solved them. This seemed to make sense to them, but something about the conversation stuck with me. 

After a few days I was struck with a bit of inspiration...what if I shared that mistakes and bugs are normal for *every developer?* And so here we are!

This is the start of a new series of posts where I'm going to share some of the boneheaded mistakes I've made while coding something. I hope it will shed some light on how things happen in the "real world", even for devs with years of experience. Hopefully I can teach a few things along the way, but in the end, I really just want to show that we all make mistakes in our code. Some of them will be laughably obvious, some of them might be complex...but they happen to everyone...from little ol' me to even the best devs in the world.

So with that, let me share with you a mistake I made just yesterday...

![Will Arnet saying "I've made a huge mistake".](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s1vab2dt84f2yeoqvaek.gif)


## The Premise
I'm currently working on a project using ThreeJS and I needed to add a bunch of cubes to my scene. (Don't worry if you don't know ThreeJS...you don't need to in order to follow along) Naturally, rather than adding them in manually, I used a for loop to create them automatically. Then, as I moved the camera around, I wanted to animate them once when the camera got close to each one. To do this, I needed to keep track of all my cubes, as well as a flag to indicate if they had been animated or not. I decided to use an array of objects that looked like this:

```typescript
interface ICube {
  /**
   * this is a ThreeJS thing. But you
   * can consider it like any other object
   * in Javascript for the sake of this
   * post.
   */
  mesh: THREE.Mesh;
  animated: boolean; 
}
```

I figured I would populate the array up front, and then just add the mesh (object) after it got created later. So I declared the array and populated it like this:

```typescript
const NUM_CUBES = 10;

const cubes: ICube[] = Array(NUM_CUBES).fill({
  mesh: null,
  animated: false,
})
```

So now I have an array of 10 cubes, and if I need more or less later, I can just change `NUM_CUBES`...easy peazie.

Later, after the scene had been created, I created the cubes, added them to the scene, and then added them to the array.

```typescript
const createCubes = () => {
  for (let i = 0; i < cubes.length; i++) {
    // ...create the cube in ThreeJS and add to scene

    cubes[i].mesh = mesh;
  }
}
```

Next, I worked on moving my camera around, and lastly I wanted to add the animation to the cubes when the camera came close to each one.

```typescript
const animate = () => {
  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];

    // skip this cube if it has already been animated.
    if (cube.animated) continue;
 
    if (camera.position.distanceTo(cube.position) < 10) {
      // animate
    
      // if animation complete
      cube.animated = true;
    }
  }
}
```

![A monkey pushing a laptop off a table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ipx0ka0yse6ftaqtq3qb.gif)

All done, time to test.

## Somethings Not Right

Immediately, something was wrong. The very first cube I came close to wouldn't animate. I double checked my logic and order of operations. Everything seemed okay. If I removed the conditional logic in the animate function, the animations worked.

Time for some logs...

...does the cube exist? Yep...
...is the cube already marked as animated? Nope...
...what's the distance between the camera and the cube? 30?! Interesting...the camera is right next to the cube, this value should be must less than that!
...what's the position of the camera? Okay, that looks correct...
...what's the position of the first cube? "z: 40"?! Well that's not right...the first cube is supposed to be at position 0...
...what's the position of the last cube? "z: 40"?! Hmm...they have the same position...that's definitely not right. In the scene they aren't displayed in the same position, so they're being rendered correctly. It must be something with my array...
...what are the positions of all cubes? "z: 40". "z: 40", "z: 40"...Weird...they shouldn't all be the same...maybe I messed up when I created the cube meshes...

*back in createCubes()*

...what's the position of each mesh before it gets added to the array? "z: 0", "z: 3", "z: 6"...that looks correct.
...what does the array look like after each mesh has been set?

```typescript
// first iteration
cubes: [
  { ..., z: 0 }
]

// second iteration 
cubes: [
  { ..., z: 3 },
  { ..., z: 3 }
]

// third iteration 
cubes: [
  { ..., z: 6 },
  { ..., z: 6 },
  { ..., z: 6 }
]
```

![Ben from Parks and Recreation thinking at a desk, then someone holds a lightbulb over his head and turns it on. Ben gestures as though he has just figured something out.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uysbdevyp5monesc4n0s.gif)

There it is! When the mesh is being set, it's changing all the objects...that usually means a reference issue.

### :information_source: Storing by Reference
In Javascript, objects are stored in a variable by reference. Meaning that the objects data is stored in memory, and a reference to that address in memory is stored in the variable.

Let's say we assign an object to a variable, and then assign the value of that variable to another variable

```typescript
const myObject = { x: 123, y: 456 };

const myOtherObject = myObject;
```

In this scenario, both `myObject` and `myOtherObject` refer to the same address in memory. The actual data has not been duplicated. The data still lives in one place in memory. So if we use `myObject` to change the value of `x`.

```typescript
myObject.x = 789;
```

The data in memory gets updated. Then if we use `myOtherObject` to read the data, it reference the same address in memory that was just updated...

```typescript
console.log(myOtherObject.x); // 789
```

![An animated cat spreading it's arms and the words "The More You Know" appear over it's head.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1cw2esxg4kqlrcx79iyo.gif)


So all the objects in my array are referring to the same object in memory. But why?

## The Boo Boo
It all goes back to when I declared my cubes array...

```typescript
const cubes: ICube[] = Array(NUM_CUBES).fill({
  mesh: null,
  animated: false,
});
```

The object that was passed into `.fill()` is only created once in memory, and the address for that object in memory is then applied to each element in my array. So just like in the example above, if one of the elements are used to update the data in memory, they all read that same data

```typescript
// first element is updated
cubes[0].mesh.position.z = 999;

// second element reads the same data in memory, so it was too!
console.log(cubes[1].mesh.position.z) // 999;
``` 

I hadn't thought through this enough in the beginning, and just assumed that `.fill()` would apply a new object to each element in the array.

![Jason Momoa posing adorably with the words "Oopsie Daisy" displayed.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vjifm94izvogchea066n.gif)

## The Solution
Now that I know the problem, the solution was pretty simple...

I changed the instantiation of the cubes array to just be an empty array...

```typescript
const cubes: ICube[] = [];
```

Then inside `createCubes()`, when each cube is created, I push a new object to the array.

```typescript
const createCubes = () => {
  for (let i = 0; i < cubes.length; i++) {
    // ...create the cube in ThreeJS and add to scene

    cubes.push({ mesh, animated: false });
  }
}
```

Now, a new object is created in memory each time, and every element in the array is now unique. No more referencing the same address in memory.

I tested again and BAM! Each cube animated on it's own when the camera came close to it! 

![Carlton Banks from Fresh Prince of Bel-Air doing his happy dance.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/90lvswas1fgsk8f2r96y.gif)


## Conclusion

Even though storing by value and reference is something we (hopefully) learn early on in the fundamentals of Javascript, I still overlooked it.

If you caught the issue right away, way to go, that's awesome! If not, no worries...neither did I. But it's okay! I learned something in the process, and will know to keep an eye out for it in the future.

I hope this shows that even after years of writing code, you can still make simple mistakes. You're still going to learn new things that perhaps others learned a long time ago. It's expected. It's normal. And most importantly, it's okay.

Thank you for allowing me share my mistake with you. Until next time, Happy Hacking!
