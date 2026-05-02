import React, { Component } from 'react'

export default class ClassCounter extends Component {

    state = { count: 0 };

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "tan", padding: 10, margin: 10, border: "3px solid white", borderRadius: 10 }}>
                <p><b>Class_Based_Counter</b></p>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        )
    }
}
