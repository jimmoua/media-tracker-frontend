import React from 'react'

function Hero() {
    return (
        <section className="hero is-primary is-medium">
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-menu">
                            <div className="navbar-end">
                                <span className="navbar-item">
                                    <a className="button is-primary is-inverted">
                                        <span className="icon">
                                            <i className="fab fa-github"></i>
                                        </span>
                                        <span>Download</span>
                                      </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="hero-body">
                <p className="title">Media Tracker</p>
                <p className="subtitle">Tracking your favorite shows and comics...</p>
            </div>
        </section>
    )
}

export default Hero;