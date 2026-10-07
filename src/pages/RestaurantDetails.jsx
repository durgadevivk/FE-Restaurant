
// pages/RestaurantDetails.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getRestaurantById } from "../services/restaurantService";
import { getRestaurantReviews } from "../services/reviewService";

import RestaurantHero from "../components/restaurant/RestaurantHero";
import RestaurantInfo from "../components/restaurant/RestaurantInfo";
import RestaurantMenu from "../components/restaurant/RestaurantMenu";
import ReservationForm from "../components/restaurant/ReservationForm";
import RestaurantReviews from "../components/restaurant/RestaurantReviews";

const RestaurantDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurantById(id);
      setRestaurant(data.restaurant || data);
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await getRestaurantReviews(id);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useEffect(() => {
    fetchRestaurant();
    fetchReviews();
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading restaurant...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8">

        <RestaurantHero restaurant={restaurant} />

        <RestaurantInfo restaurant={restaurant} />

        <RestaurantMenu menu={restaurant.menu} />

        <ReservationForm
          restaurant={restaurant}
          restaurantId={id}
          user={user}
        />

        <RestaurantReviews
          restaurantId={id}
          reviews={reviews}
          setReviews={setReviews}
          user={user}
          fetchReviews={fetchReviews}
        />

      </div>
    </div>
  );
};

export default RestaurantDetails;
