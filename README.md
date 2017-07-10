# HTML app to generate print-resolution artwork from canvas graphics at common paper sizes (A0 - A4)

__The goal__: To be able to draw cool things on an HTML canvas (2d or WebGL), then save down a high (print) resolution render at common paper sizes (A0-A5).

---

## Install and build

Ensure you've got [node/npm](https://nodejs.org/en/) installed.

#### 1.
```
npm install
```

#### 2.
```
npm run dev
```

---

## Usage

Edit the `artwork.js` file in `scripts/_artwork` to produce your artwork. You can view example setups for Canvas 2D, Three.JS 3D and a 2D shader (Three.JS) in `scripts/_example`. Open the app in your browser and follow the control panel on the left.

_Using Chrome is recommended for rendering and saving flexibility._

---

## Known issues

- When using a WebGL canvas I seem to be hitting a resolution limit at higher paper sizes (A0, A1, A2). Attempting to scale the pixel ratio up further leads to a blank white screen at these sizes.
- Selecting "To paper" for the "Artwork scaling" setting doesn't work well with WebGL examples. At some paper sizes it works, but at larger paper sizes it seems to hit a rendering limit, giving you a blank white result instead.

---

## To-do's

- Add Custom paper size controls
- Add saving of current config in local storage and restore upon reload. Include 'reset' link to set back to defaults.
- Hide paper colour and 'to paper' scaling options
