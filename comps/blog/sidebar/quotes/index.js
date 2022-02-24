import style from "./index.module.scss";
import { useState } from "react";
import quoteRequest from "../../../../utils/axios/quotes";
import {FaQuoteLeft, FaQuoteRight} from "react-icons/fa";
const RandomQuote = () => {
    
const [quote,setQuote] = useState("There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.");
const [isLaoding, setLoading] = useState(false);
const generateQuote = async ()  => {
    setLoading(true);
    try {
        const res = await quoteRequest.get("/random?tags=technology&maxLength=150");
        setQuote(res.data);
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
 
};

    return <div className={style.quotes_container}> 
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
        
    </div>;
};

export default RandomQuote;