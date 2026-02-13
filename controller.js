import {lost, InGame, pauseGame,  gameover, ResetGame, jump, down, left, right} from "./script.js"

window.addEventListener("gamepadconnected", e => gamepadAPI.connect(e));
window.addEventListener("gamepaddisconnected", e => gamepadAPI.disconnect(e));

 export const ControllerEvents = () =>{
    gamepadAPI.update();
  if (!gamepadAPI.controller) return;
  if(gamepadAPI.buttonPressed("Back")) ResetGame();
  if(lost) return;
    console.log(gamepadAPI.buttonsCache.toString())
  if (gamepadAPI.buttonPressed("Start")) pauseGame();
    if (!InGame) return;
  if (gamepadAPI.axesStatus[1] < -0.4 || gamepadAPI.buttonPressed("A")) jump();
  if (gamepadAPI.axesStatus[1] > 0.4) down();
  if (gamepadAPI.axesStatus[0] > 0.4) right();
  if (gamepadAPI.axesStatus[0] < -0.4) left();
}

const gamepadAPI = {
  buttonsStatus: [],
  buttonsCache: [],
  axesStatus: [],
  controller: null,
  turbo: false,

  buttons: [
    "A","B","X","Y",
    "LB","RB","LT","RT",
    "Back","Start",
    "LeftStickPress","RightStickPress",
    "DPad-Up","DPad-Down","DPad-Left","DPad-Right",
    "Home"
  ],

  connect(evt) {
    gamepadAPI.controller = evt.gamepad;
    gamepadAPI.turbo = true;
    console.log("Gamepad connected.");
  },
  disconnect(evt) {
    gamepadAPI.turbo = false;
    delete gamepadAPI.controller;
    console.log("Gamepad disconnected.");
  },
  update() {
  const pads = navigator.getGamepads();
  gamepadAPI.controller = pads[0];

    gamepadAPI.buttonsCache = [];
    for (let k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
      gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
    }
    gamepadAPI.buttonsStatus = [];
    const c = gamepadAPI.controller || {};
    const pressed = [];
    if (c.buttons) {
      for (let b = 0; b < c.buttons.length; b++) {
        if (c.buttons[b].pressed) {
          pressed.push(gamepadAPI.buttons[b]);
        }
      }
    }
    const axes = [];
    if (c.axes) {
      for (const ax of c.axes) {
        axes.push(Number(ax.toFixed(2)));
      }
    }
    gamepadAPI.axesStatus = axes;
    gamepadAPI.buttonsStatus = pressed;
    return pressed;
  },
  buttonPressed(button, hold=false) {
    let newPress = gamepadAPI.buttonsStatus.includes(button);
    if (!hold && gamepadAPI.buttonsCache.includes(button)) 
      newPress = false;
    return newPress;
  }
};
