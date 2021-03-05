import HeaderWithout from '../Home/components/Header/HeaderWithout';
import Footer from "../../components/Footer/Footer";
import Employees from "./Contact/pages/Employees/Employees";


function Contact() {
    return (
        <div>
            <HeaderWithout />
            <Employees />
            <Footer />
        </div>
    );
}

export default Contact;