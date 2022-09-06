import './Label.css'


export default function Label({ title, time, updateTime, type, id, decrement, increment, name }) {
  return (
      <div id={id} className='break--label'>
          <span className='session--title'>{title}</span>
          <div className='control--length'>
            <button className='btn2'
             onClick={() => updateTime(60, type)}
             id={increment}
             >
            <i className="bi bi-arrow-up arrow--icon"></i>
            </button>
            <span id={name} className='number'>{time}</span>
            <button className='btn2'
              onClick={() => updateTime(-60, type)}
              id={decrement}
            >
            <i className="bi bi-arrow-down arrow--icon"></i>
            </button>
          </div>
      </div> 
  )
}