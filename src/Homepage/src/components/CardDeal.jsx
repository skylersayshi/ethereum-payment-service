import { card2 } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Powerful UI <br className="sm:block hidden" /> at every
        corner.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Our mission is to demystify the idea of making payments with crypto, and we plan to do this by providing the best user experience we can. 
      </p>

      {/* <Button styles={`mt-10`} /> */}
    </div>

    <div className={layout.sectionImg}>
      <img src={card2} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
