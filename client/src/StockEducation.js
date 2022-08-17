import styled from "styled-components";


const StockEducation = () => {

    return <Wrapper>
        <No3><Hh2 href="https://www.udemy.com/topic/stock-trading/" >
            What is stock trading
        </Hh2>
        <>The stock market refers to public markets that exist for issuing, buying, and selling stocks that trade on stock exchanges. Stocks represent fractional ownership in a company. The stock market is where traders buy and sell stocks. The stock market serves two important purposes. For companies, it provides a means to acquire capital as a way to fund and expand their business. For stock traders, it provides an opportunity to share in the profits of publicly traded companies. In the U.S., there are multiple regional stock exchanges, while most other countries maintain a single stock exchange. Stock trading is the activity of buying and selling shares of publicly traded companies with the goal of securing a profit or loss.</>

        </No3>
        <No1><Hh2 href="https://www.investopedia.com/articles/basics/06/invest1000.asp" >How to Start Investing in Stocks: A Beginner's Guide</Hh2><>By CHAD LANGAGER Updated March 14, 2022</>
        <>Investing is a way to set aside money while you are busy with life and have that money work for you so that you can fully reap the rewards of your labor in the future. Legendary investor Warren Buffett defines investing as “the process of laying out money now in the expectation of receiving more money in the future.”
1
 The goal of investing is to put your money to work in one or more types of investment vehicles in the hopes of growing your money over time.</>
        </No1>
        <No2><Hh2>HowToDayTrade - ROSS CAMERON</Hh2>
        <h2>WHY DO MOST TRADERS FAIL</h2>
        <>If you are considering a career as a day trader, you cannot ignore the statistics that show only 
1 in 10 traders will be able to make a living at it. I am not saying this to discourage you from 
trading. We are going to talk about the reasons why most traders fail so you can avoid making 
those same mistakes. I believe failure is an option, one that is often chosen without the trader 
realizing it. Just as failure is an option, so is success, if you make the right decisions. Most traders 
that I have seen fail were unable to follow simple rules of risk management. We will be discussing 
the rules of risk management in the next chapter, but let us first talk about the reason why it is 
so difficult to follow the rules. Trading becomes extremely emotional when we are faced with 
losses and even wins. Being a day trader puts you in the unique position of having to experience 
a financial loss every single day. On a good day, you will win more than you lose and end the day 
with a net profit. But, even on the best days there will still typically be at least a few losing trades. 
There is no such thing as a strategy or a trader who is 100% successful on every trade they take. 
The best traders may be profitable every month out of the year, but it would be unreasonable 
and statistically improbable to expect 100% accuracy. Even investors who make billions of dollars 
have losing investments. This means you will have to face loss and become comfortable with it. 
The traders I have known who have failed were never able to cope with loss. They allowed the 
fear of loss to guide their trading decisions</>
        </No2>
        
        </Wrapper>
};
const Hh2=styled.a`
font-size:28px;
text-decoration: none;
`;

const No1=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const No2=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const No3=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const Wrapper=styled.div`
padding: 50px 200px;
display: flex;
flex-direction: column;
justify-content: space-around;
height: 80vh;
/* border: 2px solid red; */
`;


export default StockEducation;