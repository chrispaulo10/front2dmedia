import React, {useState, useRef} from 'react';

export default function Accordion(props){

    const[active, setActive] = useState("");
    const[height, setHeight] = useState("0px");
    const[rotate, setRotate] = useState("accordion__icon");

    const content = useRef(null);

    function toggleAccordion(){
        setActive(active === "" ? "active" : "");
        setHeight(active === "active" ? "0px" : `${content.current.scrollHeight}px`);
        setRotate(active === "active" ? "accordion__icon" : "accordion__icon rotate")
    }

    return(
        <div className="mb-3">
            <div className={`accordion ${active}`} onClick={toggleAccordion}>
                <div className="category">
                    {props.category} &nbsp;
                <i className={`fas fa-chevron-right ${rotate}`}></i>
                </div>
            </div>

            <div ref={content} style={{maxHeight:`${height}`}} className="accordion__content">
                {props.content}
            </div>
        </div>
    );

}