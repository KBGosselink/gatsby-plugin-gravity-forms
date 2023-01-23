import React from "react";
import { valueToLowerCase } from "../../../utils/helpers";

const ProgressBar = (props) => {
    const { bgcolor, progress, pageNames, step, maxStep, bgCustom, colorCustom } = props; 
    return (
        <>
            <p className="gf_progressbar_title">
                Étape 
                <span className="gf_step_current_page"> {step} </span> 
                sur 
                <span className="gf_step_page_count"> {maxStep} </span>
                 { pageNames ? `- ${pageNames}` : null }
            </p>
            <div className={`gf_progressbar gf_progressbar_${valueToLowerCase(bgcolor)}`} aria-hidden="true">
                <div className={`gf_progressbar_percentage percentbar_${valueToLowerCase(bgcolor)} percentbar_${progress}`} style={{backgroundColor: bgCustom, color:colorCustom, width: progress + '%'}}>
                    <span>{`${progress}%`}</span>
                </div>
            </div>
        </>
    )
}

export default ProgressBar;