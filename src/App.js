import './App.css';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './Components/Footer'
import Label from './Components/Label';

function App() {

  const [display, setDisplay] = useState(25 * 60)
  const [breakLength, setBreakLength] = useState(5 * 60)
  const [sessionLength, setSessionLength] = useState(25 * 60)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)

  const audio = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
  
  let audioElement = useRef(null)

  useEffect(() => {
    if(display <= 0){
      setOnBreak(true);
      playSound();
    } else if(!timerOn && display === breakLength){
      setOnBreak(false)
    }
    console.log('test')
  }, [display, onBreak, timerOn, breakLength, sessionLength])

  const playSound = () => {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  const formatDate = (time) => {
    const minutes = Math.floor(time/60)
    const seconds = time % 60 
    return (
      (minutes < 10 ? '0' + minutes : minutes) + 
      ':' +  
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  const formatDateLength = (time) => {
    return time / 60
  }

  const updateTime = (amount, type) => {
    if(type === 'break'){
      if((breakLength <= 60 && amount < 0) ||  breakLength >= 60 * 60){
        return;
      }
      setBreakLength((prev) => prev + amount)
    } else {
      if((sessionLength <= 60 && amount < 0) || sessionLength >= 60 * 60){
        return;
      }
      setSessionLength((prev) => prev + amount)
      if(!timerOn){
        setDisplay(sessionLength + amount)
      }
    }
  }

  const handleReset = () => {
    clearInterval(localStorage.getItem('interval-id'));
    setDisplay(25 * 60);
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    audioElement.pause();
    audioElement.current = 0;
    setTimerOn(false);
    setOnBreak(false);
  }


  const handleControl = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

      if(!timerOn){
        let interval = setInterval(() => {
          date = new Date().getTime();
          if(date > nextDate){
            setDisplay((prev) =>{
              if(prev <= 0 && !onBreakVariable){
                onBreakVariable= true;
                return breakLength;
              } else if(prev <= 0 && onBreakVariable){
                onBreakVariable=false;
                setOnBreak(false)
                return sessionLength;
              } 
              return prev - 1;
            });
            nextDate += second; 
          }
        }, 30);
        localStorage.clear();
        localStorage.setItem('interval-id', interval)
      }
    if(timerOn){
      clearInterval(localStorage.getItem('interval-id'));
    }
    setTimerOn(!timerOn)
  }

 
  return (
    <div className='main'>
      <div className="main--container">
        <div className='display'>
          <div className='control--section'>
            <Label 
            id={'break-label'}
            title={'BREAK LENGTH'}
            type={'break'}
            updateTime={updateTime}
            time={formatDateLength(breakLength)}
            increment={'break-increment'}
            decrement={'break-decrement'}
            name={'break-length'}
            />
            <Label
            id={'session-label'}
            title={'SESSION LENGTH'}
            type={'session'}
            updateTime={updateTime}
            time={formatDateLength(sessionLength)}
            increment={'session-increment'}
            decrement={'session-decrement'}
            name={'session-length'}
            />
          </div>
          <div className='count--section'>
          <h3 id='timer-label' className='count--title'>{onBreak ? 'Break' : 'Session'}</h3>
              <div className='count--display'>
                <span id='time-left' className='numbers'>{formatDate(display)}</span>
              </div>
            <div className='buttons'>
              <button className='btn1'
              id='start_stop'
              onClick={handleControl}
              >
              {timerOn ? 
                <i className="bi bi-pause control--icon1"></i>
                : 
                <i className="bi bi-play control--icon1"></i>
              }
              </button>
              <button className='btn1'
              id='reset'
              onClick={handleReset}
              >
                <i className="bi bi-arrow-clockwise control--icon2"></i>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <audio ref={el => audioElement = el} src={audio} id='beep' />
    </div>
  );
}

export default App;
