import {Canvas} from '@react-three/fiber'
import {OrbitControls, Text} from '@react-three/drei'
import {Snake} from "./Snake";
import {Apple} from "./Apple";
import {floorVector} from "./helper/roundedPosition";
import {useState} from "react";
import {MathUtils, Vector2} from "three";
import {useInterval} from "./helper/useInterval";
import {useKey} from "rooks";

const GRID_SIZE = 10

const generateRandomApple = (gridSize: number) => {
  return new Vector2(
    MathUtils.randInt(-gridSize / 2, gridSize / 2),
    MathUtils.randInt(-gridSize / 2, gridSize / 2),
  )
}
export const GameCanvas = () => {
  const [direction, setDirection] = useState(new Vector2(-1, 0));
  const [apple, setApple] = useState(generateRandomApple(GRID_SIZE));
  const [appleCount, setAppleCount] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(700);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([
    new Vector2(1, 0),
    new Vector2(2, 0),
    new Vector2(3, 0)
  ])

  useInterval(() => {
    const newHead = new Vector2().copy(snake[0]).add(direction);
    const newSnake = [newHead, ...snake];

    snake.forEach((vec) => {
      if (newHead.equals(vec)) {
        setGameOver(true)
      }
    })

    if (newHead.equals(apple)) {
      const newApple = generateRandomApple(GRID_SIZE);
      setApple(newApple)
      setAppleCount(appleCount + 1)
      setGameSpeed(gameSpeed * .9)
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }, gameOver ? null : gameSpeed)

  useKey('KeyW', () => {
    if (direction.x === 0) setDirection(new Vector2(1, 0))
  })
  useKey('KeyA', () => {
    if (direction.y === 0) setDirection(new Vector2(0, -1))
  })
  useKey('KeyS', () => {
    if (direction.x === 0) setDirection(new Vector2(-1, 0))
  })
  useKey('KeyD', () => {
    if (direction.y === 0) setDirection(new Vector2(0, 1))
  })

  return (
    <Canvas>
      <gridHelper args={[GRID_SIZE, GRID_SIZE, 'red']}/>
      <OrbitControls/>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <Apple position={floorVector([apple.x, .5, apple.y])}/>
      <Snake snake={snake}/>
      <Text font={'/Roboto-Medium.ttf'} color='black' rotation={[-Math.PI / 2, 0, 0]}>
        {appleCount}
      </Text>
    </Canvas>
  )
}