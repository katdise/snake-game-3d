import {MeshProps} from "@react-three/fiber";
import {Box, RoundedBox, useTexture} from "@react-three/drei";
import {MeshPhongMaterial, MeshPhysicalMaterial, Vector2} from "three";
import {floorVector} from "./helper/roundedPosition";

interface SnakePieceProps extends Pick<MeshProps, 'position'> {
  color: string;
}

const snakeHeadMaterial = new MeshPhysicalMaterial({color: 'yellow'})
// const snakeBodyMaterial = new MeshPhongMaterial({color: 'green', specular: 'yellow', reflectivity: 0.5})


export const Snake = ({snake}: {snake: Vector2[]}) => {


  return (
    <>
      {snake.map(({x,y}, i)=>{
          return (
            <SnakeBody position={floorVector([x, .5, y])} color={i > 0 ? 'green': 'yellow'} />
          )
        }
      )}
    </>
  );
};

const SnakeHead = ({position}: SnakePieceProps) => {
  const map = useTexture('/snake-map.jpg')

  return(
    <RoundedBox position={position}>
      <meshPhongMaterial color={'yellow'} specular='green' reflectivity={0.5} map={map}/>
    </RoundedBox>
  )
}

const SnakeBody = ({position, color}: SnakePieceProps) => {
  const map = useTexture('/snake-map.jpg')

  return (
    <RoundedBox position={position}>
      <meshPhongMaterial color={color} specular='yellow' reflectivity={0.5} map={map}/>
    </RoundedBox>
  )
}
