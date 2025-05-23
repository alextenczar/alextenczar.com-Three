'use client'

const Options = (props) => {

    return (
        <div className='options-container'>
            <span className="text-base text-neutral-500">{props.tempLabel}</span>
            <div className='flex flex-row'>
                <button aria-label="F" className='!lg:text-4xl !text-2xl !font-extrabold' onClick={() => {
                    localStorage.setItem("tempUnit", "f")
                    location.reload()
                    document.body.classList.remove('menu-open');
                    props.setMenuState(false)
                }}><span>°F</span></button>
                &nbsp;<button aria-label="C" className='!lg:text-4xl !text-2xl !font-extrabold' onClick={() => {
                    localStorage.setItem("tempUnit", "c")
                    location.reload()
                    document.body.classList.remove('menu-open');
                    props.setMenuState(false)
                }}><span>°C</span></button>
            </div>

            <span className="text-base text-neutral-500">{props.timeLabel}</span>
            <div className='flex flex-row'>

                <button aria-label="12hr" className='!lg:text-4xl !text-2xl !font-extrabold' onClick={() => {
                    localStorage.setItem("timeFormat", '12hr')
                    location.reload()
                    document.body.classList.remove('menu-open');
                    props.setMenuState(false)
                }}><span>12hr</span></button>&nbsp;<button aria-label="24hr" className='!lg:text-4xl !text-2xl !font-extrabold' onClick={() => {
                    localStorage.setItem("timeFormat", '24hr')
                    location.reload()
                    document.body.classList.remove('menu-open');
                    props.setMenuState(false)
                }}>
                    <span>24hr</span></button>
            </div>

        </div >
    );
};

export default Options;