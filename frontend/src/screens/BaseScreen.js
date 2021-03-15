import { PureComponent } from "react";
import Navbar from "../components/Navbar/Navbar";

class BaseScreen extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <div className="content-wrap">
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default BaseScreen;
