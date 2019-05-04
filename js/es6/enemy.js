/*
 * Enemy module file
 *    - Enemies in this game are the bugs moving on the paved block at varying speed.
 *    - The number of enemies are caculated dynamically based on screen size and game level that player selected.
 *    - Once the enemy passes the right side of canvas, it will be put back to the at starting X position but on the path randomly picked
 * @exports Enemy class
 * @author Sarah Wang
 * @version 1.0.0 2019-05-01
 */
export default class Enemy {
  /**
   * @description Constructor function
   * @param {String} imgURL - The file name of the enemy image
   * @param {Number} startRow - The path this enemy is on
   * @param {Number} x - The starting position on the path
   */
  constructor(imgURL, startRow, x) {
    this.sprite = imgURL;
    this.x = x;
    this.y = CONFIG.ENEMY_POS_Y_OFFSET + CONFIG.CELL_HEIGHT * startRow;
  }

  /**
   * @description Reset the position of the enemy
   * @param {Number} row - The path this enemy is on
   */
  reset(row) {
    this.x = -100;
    this.y = CONFIG.ENEMY_POS_Y_OFFSET + CONFIG.CELL_HEIGHT * row;
  }

  /**
   * @description test if the enemy is collided with the player
   * @return {boolean}  return true if the enemy collides with the player, otherwise return false
   */
  isCollided() {
    if (
      player.x < this.x + 60 * CONFIG.SCALE &&
      player.x > this.x - 60 * CONFIG.SCALE &&
      player.y < this.y + 50 * CONFIG.SCALE &&
      player.y > this.y - 50 * CONFIG.SCALE
    ) {
      return true;
    }
    return false;
  }

  /**
   * @description Update the enemy's position. Invoked by game engine
   * @param {Number} dt - a time delta between ticks. Multipling any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
   */
  update(dt) {
    //Random moving distance
    const random =
      Math.floor(Math.random() * CONFIG.MAX_SPEED) +
      Math.floor(Math.random() * 100);

    //Set new position
    this.x += random * dt;

    //Test if the enemy moved out of the canvas. If true, the enemy will be placed at the starting point but on a randomly selected path
    if (this.x > CONFIG.CANVAS_WIDTH) {
      this.x = -100;
      this.reset(Math.floor(Math.random() * (CONFIG.NUM_ROWS - 3)));
    }

    //if the enemy collides with the player, The player will move back to the starting block
    if (this.isCollided()) player.reset();
  }

  /**
   * @description Draw the enemy on the screen. Invoked by game engine
   */
  render() {
    const enemyImage = Resources.get(this.sprite);

    //image should be scaled along with the canvas
    ctx.drawImage(
      enemyImage,
      this.x,
      this.y,
      enemyImage.width * CONFIG.SCALE,
      enemyImage.height * CONFIG.SCALE
    );
  }
}
