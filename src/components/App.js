import React from "react";
import { Button } from "../components/Button";

import "./App.scss";

class App extends React.Component {
    state = {
        quotes: [],
        currentQuote: {},
        isLoading: true,
        hasError: false
    };

    componentDidMount() {
        fetch(
            "https://gist.githubusercontent.com/draber06/8d8a83416fb5a785b8c529249a43c49c/raw/979fcd9ed0b24851ac4f0a0414773cc2919cf954/quotes.json"
            // "https://gist.githubusercontent.com/draber06/8d8a83416fb5a785b8c529249a43c49c/raw/979fcd9ed0b24851ac4f0a0414773cc19cf954/quotes.json"
        )
            .then(response => response.json())
            .then(({ quotes }) => {
                const quoteIndex = Math.floor(Math.random() * quotes.length);
                this.setState({
                    quotes,
                    currentQuote: quotes[quoteIndex],
                    isLoading: false,
                    hasError: false
                });
            })
            .catch(e => {
                this.setState({
                    isLoading: false,
                    hasError: true
                });
                console.log(this.state.isLoading);
            });
    }

    getNewQuote = () => {
        const state = this.state;
        let quoteIndex = Math.floor(Math.random() * state.quotes.length);

        // Protect from showing same quote
        if (state.quotes[quoteIndex].quote === state.currentQuote.quote) {
            quoteIndex = !quoteIndex ? ++quoteIndex : --quoteIndex;
        }

        this.setState({
            currentQuote: state.quotes[quoteIndex]
        });
    };

    renderQuote = () => {
        const state = this.state;
        if (state.isLoading) {
            return <>Loading</>;
        } else if (state.hasError) {
            return <>Oops! Something went wrong. Try to reload page.</>;
        }
        return (
            <>
                <div className="quote__text" id="text">
                    {state.currentQuote.quote}
                </div>
                <div className="quote__author" id="author">
                    -{state.currentQuote.author}
                </div>
            </>
        );
    };

    render() {
        return (
            <div className="wrapper">
                <div className="quote" id="quote-box">
                    {this.renderQuote()}
                    <div className="quote__buttons">
                        <div className="socials left">
                            <Button {...LinkProps} />
                        </div>
                        <div className="right">
                            <Button {...buttonProps} onClick={this.getNewQuote} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const buttonProps = {
    id: "new-quote",
    text: "New quote",
    className: "test asdfasdf"
};

const LinkProps = {
    href: "https://twitter.com/intent/tweet",
    id: "tweet-quote",
    text: <i className="fab fa-twitter" />
};

export default App;
