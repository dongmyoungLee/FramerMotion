import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
 
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255,255,255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 100px;

`;

const box = {
  entry : (back:boolean) => (
    {
      x: back ? - 500 : 500,
      opacity: 0,
      scale: 0,
    }
  ),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration : 1
    }
  },
  exit : (back:boolean) => (
    {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration : 1
      }
    }
  )
}

function App() {
  const [visible, setVisible] = useState(1)
  const [back, setBack] = useState(false)

  const nextPlease = () => {
    setBack(false)
    setVisible(prev => prev === 10 ? 10 : prev+ 1)
  }
  const prevPlease = () => {
    setBack(true)
    setVisible(prev => prev === 1 ? 10 : prev - 1)
  }
  return (
    //exitBeforeEnter 이전 다음 동시 이벤트 진행 막기
    <Wrapper>
      <AnimatePresence custom={back} >
        <Box custom={back} variants={box} initial="entry" animate="center" exit="exit" key={visible}>{visible}</Box>
        {/* element의 key 를 바꿔주는것만으로 element가 사라졋다고 생각함. 그리고 사라졌다고 인식이되면 exit animation이 실행이됨. */}
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  )
}

export default App;
