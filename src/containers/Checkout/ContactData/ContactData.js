import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Pickle Rick',
                address: {
                    street: '123 cherryTree Ln',
                    zip: '123456',
                    country: 'USA',
                },
                email: 'squanch@squanch.com'
            },
            deliveryMethod: 'portal drop'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false})
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false})
            });
    };

    render (){
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                <input className={classes.Input} type='text' name='zip' placeholder='Zip Code'/>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        };

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact info.</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;