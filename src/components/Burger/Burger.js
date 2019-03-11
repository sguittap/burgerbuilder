import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) =>{
    //transform an object of key value pairs into burger ingredients
    let transformedIngredients = Object.keys(props.ingredients).map(ingredientkey => {
        return[...Array(props.ingredients[ingredientkey])].map((_, i) => {
            return <BurgerIngredient key={ingredientkey + i} type = {ingredientkey}/>
        });
    }).reduce((arr,el) => {
        return arr.concat(el)
    }, [] );
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>please add ingredients!</p>
    }
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;