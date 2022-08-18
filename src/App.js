import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './Components/Footer'
import alarm from './alarm.mp3'
import Label from './Components/Label';

function App() {

  const [display, setDisplay] = useState(25 * 60)
  const [breakLength, setBreakLength] = useState(5 * 60)
  const [sessionLength, setSessionLength] = useState(25 * 60)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const [sound, setSound] = useState(
    new Audio(alarm)
    )
    
  const playSound = () => {
    sound.currentTime = 0;
    sound.play();
  };
    
  useEffect(() => {
    if(display <= 0){
      setOnBreak(true);
      playSound();
    } else if(!timerOn && display === breakLength){
      setOnBreak(false)
    }
  }, [display, onBreak, timerOn, breakLength, sessionLength])

  const formatDate = (time) => {
    const minutes = Math.floor(time/60)
    const seconds = time % 60 
    return (
      (minutes < 10 ? '0' + minutes : minutes) + 
      ':' +  
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  const updateTime = (amount, type) => {
    if(type === 'break'){
      if(breakLength <= 60 && amount < 0){
        return
      }
      setBreakLength((prev) => prev + amount)
    } else {
      if(sessionLength <= 60 && amount < 0){
        return
      }
      setSessionLength((prev) => prev + amount)
      if(!timerOn){
        setDisplay(display + amount)
      }
    }
  }

  const handleReset = () => {
    setBreakLength(5 * 60)
    setSessionLength(25 * 60)
    setDisplay(25 * 60)
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
    setTimerOn(prev => !prev)
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
            time={formatDate(breakLength)}
            increment={'break-increment'}
            decrement={'break-decrement'}
            />
            <Label
            id={'session-label'}
            title={'SESSION LENGTH'}
            type={'session'}
            updateTime={updateTime}
            time={formatDate(sessionLength)}
            increment={'session-increment'}
            decrement={'session-decrement'}
            />
          </div>
          <div className='count--section'>
          <h3 id='timer-label' className='count--title'>{onBreak ? 'BREAK TIME' : 'SESSION TIME'}</h3>
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
    </div>
  );
}

export default App;
