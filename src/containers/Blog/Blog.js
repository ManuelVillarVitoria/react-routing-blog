import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';

//Only we import NewPost when we use the 'const asyncNewPost' in somewhere
//This method is fine when we want load the routes of components just we need it.
const asyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                    to="/posts/" 
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: "#fa293f",
                                        textDecoration: 'underline'
                                    }}
                                    >Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Posts</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={ () => <h1>Home</h1> }/>
                <Route path="/" render={ () => <h1>Home2</h1> }/>*/}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={asyncNewPost} /> : null}
                    <Route path="/posts/" exact component={Posts} />
                    <Route render={() => <h1>Not Found</h1>} />
                     {/*<Redirect from="/" to="/posts" />*/}
                    {/*<Route path="/" exact component={Posts} />*/}
                </Switch>
            </div>    
        );
    }
}

export default Blog;