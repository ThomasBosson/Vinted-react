import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://thomas-vinted-api.herokuapp.com/offer/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-pic">
          <img src={data.product_image.secure_url} alt="profil pic" />
        </div>
        <div className="offer-details">
          <div>
            <span className="offer-price">{data.product_price} €</span>
            <ul className="offer-list">
              {data.product_details.map((e) => {
                // Object.keys renvoie un tableau contenant les keys de mon objet product_details suivi de leurs valeurs associées (dynamique)
                const keys = Object.keys(e);
                return (
                  <li>
                    <span className="offer-key">{keys[0]}</span>
                    <span className="offer-value">{e[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
            <div className="divider"></div>
            <div className="offer-name">
              <p>{data.product_name}</p>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;