import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Employees from "./Contact/pages/Employees/Employees";


function Contact() {
    return (
        <div>
            <Header
                brand="JOBSTER"
                color="transparent"
            />
            <Employees />
            <Footer />
        </div>
    );
}

export default Contact;