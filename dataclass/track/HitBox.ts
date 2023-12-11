import { Color } from "pixi.js";
import { Dimension } from "../position/Dimension";
import { PositionAware } from "../position/PositionAware";
import { Vector } from "../position/Vector";

interface HitboxState {
  handleColors(): Color;
  handleAnimation(): void;
}

/**
 * Define the DefaultState class that implements the HitboxState interface
 */
export class DefaultState implements HitboxState {
  hitbox: Hitbox;

  constructor(hitbox: Hitbox) {
    this.hitbox = hitbox;
  }

  handleColors(): Color {
    return this.hitbox.color;
  }

  handleAnimation(): void {
    return;
  }
}

/**
 * Define the HitState class that implements the HitboxState interface
 */
export class HitState implements HitboxState {
  hitbox: Hitbox;

  constructor(hitbox: Hitbox) {
    this.hitbox = hitbox;
  }

  handleColors(): Color {
    return new Color("lightgreen");
  }

  // Set the width of the hitbox to create a 'pulsing' animation
  handleAnimation(): void {
    setTimeout(() => {
      this.hitbox.transitionTo(new DefaultState(this.hitbox));
    }, 250);
  }
}

/**
 * Define the MissedState class that implements the HitboxState interface
 */
export class MissedState implements HitboxState {
  hitbox: Hitbox;

  constructor(hitbox: Hitbox) {
    this.hitbox = hitbox;
  }

  handleColors(): Color {
    return new Color("red");
  }

  // After an interval of 275ms, transition from the MissedState to the DefaultState
  handleAnimation(): void {
    // setTimeout(() => {
    //   this.hitbox.transitionTo(new DefaultState(this.hitbox));
    // }, 275);

    // Define the initial width, final width and the increment value of the hitbox border
    const initialWidth = 3;
    const finalWidth = 7;
    const increment = 0.5;

    // Initialize the borderWidth and increasing boolean
    let borderWidth = initialWidth;
    let increasing = true;

    // Start the pulse animation using setInterval
    const pulseAnimation = setInterval(() => {
      // Update the hitbox border width
      this.hitbox.borderWidth = borderWidth;

      if (increasing) {
        // If increasing is true, increment the borderWidth
        borderWidth += increment;

        // Check if the borderWidth has reached the final width
        if (borderWidth > finalWidth) {
          borderWidth = finalWidth;
          increasing = false;
        }
      } else {
        // If increasing is false, decrement the borderWidth
        borderWidth -= increment;

        // Check if the borderWidth has reached the initial width
        if (borderWidth < initialWidth) {
          borderWidth = initialWidth;
          increasing = true;
        }
      }
    }, 7);

    // After a timeout of 250ms, transition to the default state and clear the pulse animation interval
    setTimeout(() => {
      this.hitbox.transitionTo(new DefaultState(this.hitbox));
      clearInterval(pulseAnimation);
    }, 250);
  }
}

export class Hitbox extends PositionAware {
  state: HitboxState;
  color: Color;
  borderWidth: number;

  constructor(position: Vector, dimension: Dimension, color: Color) {
    super(position, dimension);
    this.color = color;
    this.state = new DefaultState(this);
    this.borderWidth = 3;
  }

  /**
   * Delegate requestColors to the current state
   */
  requestColors(): Color {
    return this.state.handleColors();
  }

  /**
   * Delegate requestAnimation to the current state
   */
  requestAnimation(): void {
    return this.state.handleAnimation();
  }

  /**
   * Method to transition to another state
   * @param state
   */
  transitionTo(state: HitboxState): void {
    this.state = state;
  }
}
