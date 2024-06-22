import React, { Component } from "react";
import Cookies from "js-cookie";

export class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      this.setState({ isLoggedIn: true });
    }

    if (accessToken) {
      (function (d, m) {
        var kommunicateSettings = {
          appId: "30dd35031753e84906dbb0ee29ec0e54d",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }

  render() {
    return <div></div>;
  }
}

export default Chatbot;
