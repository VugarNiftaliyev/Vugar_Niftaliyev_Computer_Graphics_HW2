# CSCI 2408: Computer Graphics - Assignment 2

- CRN: 30019
- Summer 2023
- Assignment 2
- **Deadline:** 30 Jun 23:00
- **Student Name Surname ID:** NEEDS TO BE UPDATED

---

Your goal is to understand camera/projections in WebGL and render multiple objects. This knowledge you will apply to your team project.

## Constraints, notes, etc. POINTS WILL BE DEDUCTED FOR NOT FOLLOWING THESE RULES.
- See blackboard course content/recordings for tutorials.
- Each solved task should be built upon the previous one. It means that, after completing each task, you should copy both files (`index.html` and `app.js`) to the next folder and update them. The code and program logic should be interrelated among tasks.
- You cannot use any additional libraries.
- You should not use vector functions (`vec2()`) of `MV.js` libary. We are obviously not talking about the `vec()` functions of the GL Shader Language. Inside shaders it is fine to use them. Unlike assignment 1, you CAN use `flatten()` this time.
- You can copy small code snippets (~%10 of you code) from internet or textbook website but you should put the URL of the snippet and explain which modifications have been made (if any).
- You should comment your code whenever you feel necessary. But do not overuse commenting. Function and variable names should be self-explanatory in most cases.
- You SHOULD use a version-control system called `git` and make reasonable commits after each important milestone. If you have never used git, make sure to go through this [quick tutorial](https://www.youtube.com/watch?v=USjZcfj8yxE). 
- Grading will be based on whether the code achieves the purpose, is readable, whether all conditions mentioned in this file are followed. Untidy code may or may not affect grading.
- You should submit your code to the blackboard in a compressed `.zip` format with the title **STUDENTNAME_SURNAME_ID_assignment2.zip**. Late submissions won't be accepted.

---


## task_01 [1 point]

Understand `lookAt()` function. The following keyboard events should trigger your camera:

- T (when 'T' key is pressed): Camera should give you top-side view.
- L: Camera should give you left-side view.
- F: Camera should give you front-side view.
- D: Should rotate the camera (not object) clockwise by some degree (theta).
- A: Should rotate the camera counter-clockwise.


## task_02 [3 points]

Copy paste the code from `task_01`.

You will apply orthographic projection. You will make use of `ortho()` function of `MV.js` library. 

You should pass projection matrix to shader. Choose an appropriate clipping volume by giving values for `left`, `right`, `bottom`, `ytop`, `near`, `far`. 

Eliminate `vertices = scale(0.5, vertices)` (~line 64) in your app.js. Your cube face will now be the whole canvas size. By correctly changing the clipping (viewing) volume get the previous view of the cube.

- I: Camera should give you isometric view.
- W: Camera should zoom in (by changing clipping volume)
- S: Camera should zoom out

> NOTE: the variable name `ytop` is used instead of `top` in order to avoid confusion with javascript window object's `top`.


## task_03 [2 points]

Copy paste the code from `task_02`. Use perspective projection (`perspective(fovy, apect, near, far)`). Note that _far > near > 0_.

Achieve isometric view. Notice the difference of isometric view between orthogonal and perspective projections. Modify zoom-in/zoom-out function to suit perspective view (your W/S key events should work).

> NOTE: You may add `vertices = scale(0.5, vertices)` again for testing purposes, but you should eliminate it eventually.


## task_04 [4 points]

Copy paste the code from `task_03`. Put another same-sized cube to the screen with a **different z location**. Do not change the vertices of the first cube. Vertices of your second cube could be, for example, following:

```js
let vertices2 = [
    3, -1, -1,
    3, 1, -1,
    5, 1, -1,
    5, -1, -1,
    3, -1, -3,
    3, 1, -3,
    5, 1, -3,
    5, -1, -3,
];
```

- O: Should switch to orthographic view
- P: Should switch to perspective view

Notice how your cubes change in size when changing view. In othographic projection both cubes should seem of the same size, when perspective, the second cube that is farther, will seem smaller.

> HINT: It would be great if you wrote a seperate function, such as `generateCube(vertices) { }`, which will eventually render the cube on the vertex locations. In that way you can add as many cubes as you wish, wherever you wish.