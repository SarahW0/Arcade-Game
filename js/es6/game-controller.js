/*
 * This module file contains Helper class and GameController class
 *     - Helper class contains functions that help in assisting GameController class. It is a private class in this module
 *     - GameController class is the default export class to initialize the game and add event controllers
 * @exports GameController class
 * @author Sarah Wang
 * @version 1.0.0 2019-05-01
 */

import Enemy from "./enemy";
import Player from "./player";
import GameSettingWindow from "./game-setting-window";

class Helper {
  /**
   * @description set new values to CONFIG global object based on viewport sizes to make the game responsive
   * @param {boolean} easy - Game Level that the player chose
   *    - true: easy level
   *    - false: hard level
   */
  static initConfig(easy) {
    /**
     * @description Caculate the number of rows and coloumns that canvas should have, and the percentage that the canvas should *      be scaled down to based on viewport sizes
     * @param {boolean} easy - Game Level that the player chose
     * @return {Object} The number of rows, coloumns and scale of canvas caculated dynamically based on viewport sizes
     */

    const resetConfig = function(easy) {
      //For easy game mode on tab and desktop
      let result = { row: 6, col: 5, scale: 1 };

      //For small screen mobile
      if (window.innerHeight < 450 || window.innerWidth < 450) {
        result.scale = 0.5;
        result.row = Math.floor(
          (window.innerHeight - 50 - 88 * result.scale) / (83 * result.scale)
        );
        result.col = Math.floor(
          (window.innerWidth - 50) / (101 * result.scale)
        );

        //Make sure column is an odd number
        if (result.col % 2 === 0) result.col -= 1;

        //For easy game level, the maximum number of rows is 6
        if (easy && result.row > 6) {
          result.row = 6;
        }
      } else if (!easy) {
        //For hard game mode on tab and desktop
        let scale = (window.innerHeight - 100) / 1084;
        result.scale = scale > 1 ? 1 : scale.toFixed(2);
        //number of rows is 12
        result.row = 12;
        //the number of columns is 11 for horizontal screen
        result.col =
          window.innerHeight > window.innerWidth
            ? Math.floor((window.innerWidth - 100) / (83 * result.scale))
            : 11;
        if (result.col > 11) result.col = 11;
      }
      return result;
    };

    const cal = resetConfig(easy);

    CONFIG.NUM_ROWS = cal.row;
    CONFIG.NUM_COLS = cal.col;
    CONFIG.SCALE = cal.scale;
    CONFIG.CELL_WIDTH = 101 * cal.scale;
    CONFIG.CELL_HEIGHT = 83 * cal.scale;
    CONFIG.PLAYER_POS_Y_OFFSET = -40 * cal.scale;
    CONFIG.ENEMY_POS_Y_OFFSET = 60 * cal.scale;
    CONFIG.CANVAS_WIDTH = Math.floor(101 * cal.col * cal.scale);
    CONFIG.CANVAS_HEIGHT = Math.floor((cal.row * 83 + 88) * cal.scale);

    //easy game level with lower bug moving speed and hard level with fast moving speed
    if (easy) {
      CONFIG.MAX_SPEED = 500 * cal.scale;
    } else {
      CONFIG.MAX_SPEED = 800 * cal.scale;
    }
  }

  /**
   * @description Initialize allEnemies global array varialbe
   * @param {Number} number - number of enemies in the array
   *
   */
  static initEnemies(number) {
    //start position array
    const offset = [
      0,
      -100,
      -200,
      -300,
      -400,
      -500,
      -600,
      -700,
      -800,
      -900,
      -1000
    ];

    //create enemies with random start position and add them to the allEnemies array
    for (let i = 0; i < number; i++) {
      allEnemies.push(
        new Enemy(
          "images/enemy-bug.png",
          i,
          offset[Math.floor(Math.random() * 10)]
        )
      );
    }
  }
}

export default class GameController {
  /**
   * @description start the game
   *     This function is invoked when the application is loaded
   */
  static startGame() {
    /**
     * @description Showing the winning modal when the player is won
     */
    function winning() {
      gameSettingWindow.showWinModal(true);
    }

    //initialize the CONFIG global variable
    Helper.initConfig(true);

    //initialize the allEnemies global array
    Helper.initEnemies(CONFIG.NUM_ROWS - 3);

    //show game start modal
    const gameSettingWindow = new GameSettingWindow();
    gameSettingWindow.showWinModal(false);

    //create a new player with its starting position
    player = new Player(
      "images/char-boy.png",
      CONFIG.NUM_ROWS - 1,
      Math.floor(CONFIG.NUM_COLS / 2),
      winning
    );

    // listen for key presses and sends the keys to player.handleInput() method
    document.addEventListener("keyup", function(e) {
      var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      };

      //only respond key events when the game setting modal is closed
      if (!gameSettingWindow.isShown()) {
        player.handleInput(allowedKeys[e.keyCode]);
      }
    });

    // listen for click event on move left button and send it to player.handleInput() method to move player left
    document
      .querySelector(".control-btn-left")
      .addEventListener("click", function(e) {
        if (!gameSettingWindow.isShown()) {
          player.handleInput("left");
        }
      });

    // listen for click event on move right button and send it to player.handleInput() method to move player right
    document
      .querySelector(".control-btn-right")
      .addEventListener("click", function(e) {
        if (!gameSettingWindow.isShown()) {
          player.handleInput("right");
        }
      });

    // listen for click event on move up button and send it to player.handleInput() method to move player up
    document
      .querySelector(".control-btn-up")
      .addEventListener("click", function(e) {
        if (!gameSettingWindow.isShown()) {
          player.handleInput("up");
        }
      });

    // listen for click event on move down button and send it to player.handleInput() method to move player down
    document
      .querySelector(".control-btn-down")
      .addEventListener("click", function(e) {
        if (!gameSettingWindow.isShown()) {
          player.handleInput("down");
        }
      });

    // listen for click event of start game button in game setting modal window
    document
      .querySelector(".start-game")
      .addEventListener("click", function(e) {
        gameSettingWindow.closeWinModal(); //close the game setting modal window
      });

    //listen for click event of player sprites in game setting modal window to change player sprite
    document
      .querySelector(".control-menu-players")
      .addEventListener("click", function(e) {
        //if click on player sprite
        if (e.target.tagName === "IMG") {
          //unselect previously selected player
          gameSettingWindow.unSelectAllPlayers();

          //change the sprite of the player
          player.changeSprite(
            `images${e.target.src.substring(e.target.src.lastIndexOf("/"))}`
          );

          //set the sprite selected
          gameSettingWindow.setSelected(e.target.parentElement.parentElement);
        }
      });

    //listen for click event of game levels (easy or hard) in game setting modal window
    document
      .querySelector(".control-menu-level")
      .addEventListener("click", function(e) {
        if (e.target.tagName === "LABEL") {
          //empty allEnemies array
          allEnemies = [];

          //reset CONFIG global variable based on player's choice: easy or hard
          Helper.initConfig(e.target.textContent.toUpperCase() === "EASY");

          //set the new start postion for player
          player.setNewPosition(
            CONFIG.NUM_ROWS - 1,
            Math.floor(CONFIG.NUM_COLS / 2)
          );

          //Initialize allEnemies array based on new caculation
          Helper.initEnemies(CONFIG.NUM_ROWS - 3);
        }
      });
  }
}
