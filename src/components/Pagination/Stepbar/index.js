import React from "react";

const classNameRenderer = (step, maxStep, key) => {
    var classRender = "gf_step";
    if(key === 1)
    {
        classRender = classRender + " gf_step_first";
    } else if( key === maxStep) {
        classRender = classRender + " gf_step_last";
    }

    if(key === step){
        classRender = classRender + " gf_step_active"
    } else if(key < step) {
        classRender = classRender + " gf_step_completed"
        if(key === step - 1){
            classRender = classRender + " gf_step_previous"
        }
    } else {
        classRender = classRender + " gf_step_pending"
        if(key === step + 1){
            classRender = classRender + " gf_step_next"
        }
    }
    return classRender
}

const Stepbar = (props) => {
    const { step, stepFields } = props;
    return (
        <div id="gf_page_steps" className="gf_page_steps">
            {
                stepFields.pageNames.map( (pageName, key) => (
                    <div key={key} id={`gf_step_1_${key}`} className={classNameRenderer(step,stepFields.pageNames.length, key+1)}>
                        <span className="gf_step_number">{key+1}</span>
                        <span className="gf_step_label">{pageName}</span>
                    </div>
                )
                
                )

            }
        </div>
    )
};

export default Stepbar;
