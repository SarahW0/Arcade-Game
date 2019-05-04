/*
 * Player module file
 *    - The player starts at center of the bottom path
 *    - The player's sprite can be changed
 *    - The player can be moved by arrow keys on keyboard or control buttons at the right bottom of screen by clicking or touching
 *    - The game is won when the player reaches the water
 * @exports Player class
 * @author Sarah Wang
 * @version 1.0.0 2019-05-01
 */
export default class Player {
  /**
   * @description Constructor function
   * @param {String} imgURL - The file name of the player image
   * @param {Number} row - The starting row of the player
   * @param {Number} col - The starting column of the player
   * @param {Function} winF - The callback function called when the player wins the game
   */
  constructor(imgURL, row, col, winF) {
    this.sprite = imgURL;
    this.setNewPosition(row, col);
    this.controllerWinningFunc = winF;
    this.reset();
  }

  /**
   * @description Set the position of the player
   * @param {Number} newRow - The starting row of the player
   * @param {Number} newCol - The starting column of the player
   */
  setNewPosition(newRow, newCol) {
    this.startRow = newRow;
    this.startCol = newCol;
    this.reset();
  }

  /**
   * @description Caculate player's physical pixel position based on the logical position, row and column
   */
  reset() {
    this.x = this.startCol * CONFIG.CELL_WIDTH;
    this.y = this.startRow * CONFIG.CELL_HEIGHT + CONFIG.PLAYER_POS_Y_OFFSET;
  }

  /**
   * @description required by game engine
   */
  update() {}

  /**
   * @description Reset Player's sprite
   * @param {String} imgURL - The file name of the player image
   */
  changeSprite(imgURL) {
    this.sprite = imgURL;
  }

  /**
   * @description Draw the player on the screen. Invoked by game engine
   */
  render() {
    const playerImage = Resources.get(this.sprite);

    //image should be scaled along with the canvas
    ctx.drawImage(
      playerImage,
      this.x,
      this.y,
      playerImage.width * CONFIG.SCALE,
      playerImage.height * CONFIG.SCALE
    );

    //When the game is won, move the player back to the starting block and invoke controller's function
    if (this.isWinning()) {
      this.reset();
      this.controllerWinningFunc();
    }
  }

  /**
   * @description test if the game is won
   * @return {boolean}  return true if the game is won, otherwise return false
   */
  isWinning() {
    if (this.y < 0) return true;
    return false;
  }

  /**
   * @description Handle player's move events
   * @return {String}  key - moving direction string "left", "right", "up", and "down"
   */
  handleInput(key) {
    if (key == "left" && Math.floor(this.x) > 0) {
      this.x -= CONFIG.CELL_WIDTH;
    }

    if (key == "up" && Math.floor(this.y) > 0) {
      this.y -= CONFIG.CELL_HEIGHT;
    }

    if (key == "right" && this.x + CONFIG.CELL_WIDTH < CONFIG.CANVAS_WIDTH) {
      this.x += CONFIG.CELL_WIDTH;
    }
    const bottomPos =
      this.startRow * CONFIG.CELL_HEIGHT + CONFIG.PLAYER_POS_Y_OFFSET;
    if (key == "down" && this.y < bottomPos) {
      this.y += CONFIG.CELL_HEIGHT;
    }
  }
}
