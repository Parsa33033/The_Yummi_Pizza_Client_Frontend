import {WithTranslation, withTranslation} from "react-i18next";
import * as React from "react";
import {RefObject} from "react";
import {connect} from "react-redux";
import {AppState} from "../states/app_state";
import {AuthenticationState} from "../states/authentication_state";

interface HeaderProps {
    menuSectionRef: RefObject<HTMLDivElement>,
    aboutUsRef: RefObject<HTMLDivElement>,
    contactUsRef: RefObject<HTMLDivElement>,
    signinRef: RefObject<HTMLDivElement>,
    signupRef: RefObject<HTMLDivElement>
}

class Header extends React.Component<WithTranslation & HeaderProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {

    slideToMenuSection = () => {
        if (this.props.menuSectionRef.current)
            this.props.menuSectionRef.current.scrollIntoView({behavior: "smooth"})
    }

    slideToContactUs = () => {
        if (this.props.contactUsRef.current)
            this.props.contactUsRef.current.scrollIntoView({behavior: "smooth"})
    }

    slideToAboutUs = () => {
        if (this.props.aboutUsRef.current)
            this.props.aboutUsRef.current.scrollIntoView({behavior: "smooth"})
    }

    loginAppear = () => {
        if (this.props.signinRef.current)
            this.props.signinRef.current.setAttribute("style", "display:block;position: fixed; top: 0; right: 0; left: 0; bottom: 0;");
    }

    registrationAppear = () => {
        if (this.props.signupRef.current)
            this.props.signupRef.current.setAttribute("style", "display:block;position: fixed; top: 0; right: 0; left: 0; bottom: 0;");

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
                     id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html"><span className="flaticon-pizza-1 mr-1"></span>Pizza<br/>
                            <small>Delicous</small></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"><a style={{cursor: "pointer"}} href="/" className="nav-link">Home</a></li>
                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToMenuSection}>Menu</a></li>
                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToAboutUs}>About</a></li>
                                <li className="nav-item border-right"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.slideToContactUs}>Contact</a></li>

                                {
                                    this.props.authentication.authenticated == false ?
                                        <div>
                                            <ul className="navbar-nav ml-auto">
                                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.loginAppear}>Login</a></li>
                                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" onClick={this.registrationAppear} >Register</a></li>
                                            </ul>
                                        </div>
                                    :
                                    <div/>

                                }


                                <li className="nav-item"><a style={{cursor: "pointer"}} className="nav-link" ><i
                                    className="fas fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state: any) : AppState => {
    // return {
    //     id_token: state.authentication.id_token,
    //     authenticated: state.authentication.authenticated
    // }
    return {
        userState: state.userState,
        authentication: state.authentication
    }
}

const mapDispatchToProps = () => {
    return {
        doNone: () => {}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Header))