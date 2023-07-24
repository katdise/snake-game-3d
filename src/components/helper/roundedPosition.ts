import {Vector3, Vector3Tuple} from "three";

export function floorVector ([x,y,z]: Vector3Tuple) {
  return new Vector3(Math.floor(x)+0.5,y,Math.floor(z)+0.5);
}