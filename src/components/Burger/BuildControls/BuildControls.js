import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls =[
    {label: 'Salad', type:'salad'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.addIngredient(ctrl.type)}
                removed={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
    </div>
);


export default buildControls;