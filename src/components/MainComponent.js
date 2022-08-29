import React, { Component } from 'react';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import Contact from './ContactComponent.js';
import About from './AboutComponent.js';
import DishDetail from './DishdetailComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponents.js';
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


class Main extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   dishes: DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS
    // };
  }


  render() { 

    const HomePage = () => {
      return(
          <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

  const DishWithId = ({match}) => {
    return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    

    return (
        <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />} />
          <Route path='/aboutus' component={() => <About leaders={this.props.leaders} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer />
        </div>
    );
    }
}
export default withRouter(connect(mapStateToProps)(Main));

