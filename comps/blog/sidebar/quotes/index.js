import style from "./index.module.scss";
import { useEffect,useState } from "react";
import quoteRequest from "../../../../utils/axios/quotes";
import {FaQuoteLeft, FaQuoteRight} from "react-icons/fa";
const RandomQuote = () => {
    



const [quote,setQuote] = useState(null);
const [isLaoding, setLoading] = useState(false);
const generateQuote = async ()  => {
    setLoading(true);
    try {
        const res = await quoteRequest.get("/random?&maxLength=125");
        setQuote(res.data);
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
 
};
useEffect(() => {
generateQuote();
},[]);

    return quote  && ( <div className={style.quotes_container}> 
    <div className={style.quote_text_container}>
    <p className={style.quote_text}>
         <FaQuoteLeft className={style.quotes}/>{quote.content}<FaQuoteRight className={style.quotes}/>
        </p>
        <h1 className={style.quote_author}>- {quote.author}</h1>
    </div>
   
       
        
        <div className={style.quote_btn_container}>
           <button className={style.quote_btn} onClick={generateQuote} disabled={isLaoding} style={{cursor: isLaoding && "not-allowed"}}>
            Get A Quote
           </button>
        </div>
        
    </div>);
};

export default RandomQuote;