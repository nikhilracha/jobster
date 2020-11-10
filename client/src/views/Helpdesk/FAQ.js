import Header from '../../components/Header/Header';
import FAQList from './FAQ/FAQList';
import Footer from '../../components/Footer/Footer';


function FAQ() {
    return (
        <div>
            <Header
                brand="JOBSTER"
                color="transparent"
            />
            <FAQList />
            <Footer />
        </div>
    );
}

export default FAQ;
