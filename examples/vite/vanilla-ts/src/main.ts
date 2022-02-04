import "loadelayed/css/style.css";
import "loadelayed/css/spinner.css";

import "@/assets/style.pcss";

import Loadelayed from "loadelayed";

Loadelayed.setDefaultShowOptions({
  full: false,
  spinner: {
    position: "center",
  },
});

// DEMO 1
const loadelayedDemo1 = new Loadelayed(
  document.querySelector<HTMLElement>(".demo1")
);
setInterval(() => {
  loadelayedDemo1.show({ full: true, spinner: { position: "top" } });
  setTimeout(() => {
    loadelayedDemo1.hide();
  }, 2000);
}, 6000);

// DEMO 2
const loadelayedDemo2 = new Loadelayed(
  document.querySelector(".demo2") as HTMLElement
);
loadelayedDemo2.show({ spinner: { position: "left" } });
setInterval(() => {
  loadelayedDemo2.show({ spinner: { position: "left" } });
  setTimeout(() => {
    loadelayedDemo2.hide();
  }, 2500);
}, 3500);

// DEMO 3
const loadelayedDemo3 = new Loadelayed(
  document.querySelector(".demo3") as HTMLElement
);
loadelayedDemo3.show({ spinner: { position: "bottom" } });
setInterval(() => {
  loadelayedDemo3.show({ spinner: { position: "bottom" } });
  setTimeout(() => {
    loadelayedDemo3.hide();
  }, 3000);
}, 4000);
