/*
 *GameSettingWindow module file
 *   - GameSettingWindow class is designed to control the game setting modal window
 * @exports GameSettingWindow class
 * @author Sarah Wang
 * @version 1.0.0 2019-05-01
 */
export default class GameSettingWindow {
  //constructor function
  constructor() {
    this.modal = document.querySelector(".modal-window");
    this.winElement = document.querySelector(".win-panel");
  }

  /**
   * @description show the game setting modal window
   * @param {boolean} winning
   *    - true: show "YOU WIN" message on the window
   *    - false: not to show "YOU WIN" message on the window
   */
  showWinModal(winning) {
    if (winning) {
      this.winElement.style.display = "block";
    }

    this.modal.style.display = "flex";

    //for the devices with smaller screen size, scale down the modal window to 60%
    if (window.innerHeight < 500 || window.innerWidth < 500) {
      this.modal.style.transform = "scale(0.6)";
    } else {
      this.modal.style.transform = "none";
    }
  }

  /**
   * @description close the game setting modal window
   */
  closeWinModal() {
    this.modal.style.display = "none";
  }

  /**
   * @description test if the game setting modal window is open
   * @return {boolean}  return true if the window is showing up, otherwise return false
   */
  isShown() {
    return this.modal.style.display == "none" ? false : true;
  }

  /**
   * @description Remove selected attribute from the selected player
   *     This function is invoked when player selects a different sprite image in the game setting modal window
   */
  unSelectAllPlayers() {
    const selectedPlayer = document.querySelector(".player[data-selected]");
    selectedPlayer.removeAttribute("data-selected");
  }

  /**
   * @description Add selected attribute to the player
   * @param {HTMLDivElement} el- player element
   */
  setSelected(el) {
    el.setAttribute("data-selected", "");
  }
}
