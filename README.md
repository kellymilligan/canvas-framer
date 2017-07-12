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

_Using Chrome is recommended for rendering and saving stability._

---

## To-do's

- Fix controls panel layout wrapping
- Add webkit scrollbar styling
- Add saving of current config render counter in local storage and restore upon reload. Include 'reset' link to set back to defaults.
- Add Custom paper size inputs
- Add paper size preset options to cover wider range of sizes
- Hide paper colour control
- Hide scaling type control
- Update colour palette
- Update codebase to use latest template
- Refactor into VueJS app to abstract fiddly connection logic
- Branch into 'Screen Framer' for moving artwork at 720p, 1080p, 1440p, 4K and custom screen sizes

---

## Known issues

- When trying to render a very high resolution (A2+) WebGL scene with a THREE.PerspectiveCamera the result is blank white. I assume there's a hard rendering limit being reached at this size. The problem doesn't seem to affect the THREE.OrthographicCamera, I can get 2D shaders to work at A0.