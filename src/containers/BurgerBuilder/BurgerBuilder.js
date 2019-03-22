import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/action'



class BurgerBuilder extends Component{
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount(){
        // axios.get('https://burgerbuilder-eb532.firebaseio.com/ingredients.json')
        // .then(res => {
        //     this.setState({ingredients: res.data})
        // })
        // .catch(error =>{
        //     this.setState({error: true})
        // })
    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, el) =>{
                return sum + el;
            },0);
            this.setState({purchasable:sum > 0});
    };   

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        };
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString,
        })
    };

    render(){
        const disabledInfo ={
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.props.price}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}  
                ingredients={this.props.ings}/>
        };
        
        if(this.state.loading){
            orderSummary= <Spinner/>
        };

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

//redux
const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice,
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingsName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingsName}),
        onIngredientRemoved: (ingsName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingsName})

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));