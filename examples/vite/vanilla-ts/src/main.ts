import "loadelayed/css/style.css";
import "loadelayed/css/spinner.css";

import "@/assets/style.pcss";

import loadelayed from "loadelayed";

const demo1 = document.querySelector(".demo1") as HTMLElement;
const demo2 = document.querySelector(".demo2") as HTMLElement;
const demo3 = document.querySelector(".demo3") as HTMLElement;

// DEMO 1
setTimeout(() => {
  loadelayed.show(demo1);
  setInterval(() => {
    loadelayed.hide(demo1);
  }, 2000);
}, 3000);

// DEMO 2
setTimeout(() => {
  loadelayed.show(demo2, {
    full: true,
    spinnerPosition: "top",
  });
  setInterval(() => {
    loadelayed.hide(demo2);
  }, 2000);
}, 4000);

// DEMO 3
setTimeout(() => {
  loadelayed.show(demo3, {
    hideContent: false,
  });
  setInterval(() => {
    loadelayed.hide(demo2);
  }, 2000);
}, 5000);
