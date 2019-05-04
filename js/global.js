/*
 * The file declares all the global varialbes for this app
 * @author Sarah Wang
 * @version 1.0.0 2019-05-01
 */

/**
 * @global Array to save all the enemy objects
 */
let allEnemies = [];

/**
 * @global Player Object
 */
let player;

/**
 * @global System configuration for canvas, player and enemies
 */
const CONFIG = {
  NUM_ROWS: 6, //default number of rows on canvas
  NUM_COLS: 5, //default number of columns on canvas
  CELL_WIDTH: 101, //default block width on canvas
  CELL_HEIGHT: 83, //default block height on canvas
  CANVAS_WIDTH: 505, //default canvas width
  CANVAS_HEIGHT: 606, //default canvas height
  PLAYER_POS_Y_OFFSET: -40, //default position offset for player on canvas
  ENEMY_POS_Y_OFFSET: 60, //default position offset for enemies on canvas
  MAX_SPEED: 500, //default moving speed of enemies
  SCALE: 1 //default canvas scale
};
